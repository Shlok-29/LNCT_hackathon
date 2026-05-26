import sys
import subprocess

def install_and_run():
    try:
        from rembg import remove
        from PIL import Image
    except ImportError:
        print("Installing rembg, please wait...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "pillow", "onnxruntime"])
        from rembg import remove
        from PIL import Image

    print("Removing background...")
    input_path = "public/logo.png"
    output_path = "public/logo-nobg.png"
    
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_data = i.read()
            output_data = remove(input_data)
            o.write(output_data)
            
    print("Background removed successfully.")

if __name__ == "__main__":
    install_and_run()
