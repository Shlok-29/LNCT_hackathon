import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

class EvaluationRequest(BaseModel):
    quiz_score: int
    total_questions: int
    assignment_text: str
    user_savings: Optional[float] = 0
    user_salary: Optional[float] = 0
    video_title: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

@app.post("/api/evaluate")
async def evaluate_user(data: EvaluationRequest):
    if not client:
        return {
            "suggestion": "AI Engine is in demo mode (API Key missing). Based on your score of {}/{} and your goals, I recommend starting with a diversified Index Fund and building a 6-month emergency buffer.".format(data.quiz_score, data.total_questions),
            "type": "Low-Risk Index Funds"
        }

    try:
        prompt = f"""
        Act as a professional financial advisor.
        User just finished watching a video titled: "{data.video_title}".
        Quiz Score: {data.quiz_score}/{data.total_questions}
        User's Financial Goal/Assignment: "{data.assignment_text}"
        User's Current Savings: ₹{data.user_savings}
        User's Monthly Salary: ₹{data.user_salary}
        
        Based on this data:
        1. Evaluate their understanding of the topic.
        2. Suggest a specific type of investment (e.g., Equity, Debt, Gold, ELSS, Mutual Funds).
        3. Provide 3 actionable steps.
        
        Keep the response professional, encouraging, and concise (max 150 words).
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional financial advisor for the platform FinCash. You provide perfectly logical answers about the platform and general financial advice."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300
        )
        
        return {
            "suggestion": response.choices[0].message.content,
            "type": "OpenAI Personalized Recommendation"
        }
    except Exception as e:
        print(f"Error in evaluate_user: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_with_mentor(data: ChatRequest):
    if not client:
        return {"response": "I'm currently in demo mode. How can I help you with your finances today?"}
    
    try:
        messages = [
            {"role": "system", "content": "You are a professional financial advisor for the platform FinCash. You provide perfectly logical answers about the platform and general financial advice. Be concise and professional."}
        ]
        # Append history if available
        if data.history:
            messages.extend(data.history)
        
        # Append current message
        messages.append({"role": "user", "content": data.message})

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=500
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        print(f"Error in chat_with_mentor: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "FinCash AI Backend (OpenAI) is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
