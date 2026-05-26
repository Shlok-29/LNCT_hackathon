import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Restore React main script if missing
if '<script type="module" src="/src/main.jsx"></script>' not in html:
    html = html.replace('<div id="root"></div>', '<div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>')

# 2. Replace Author names
html = re.sub(r'(?i)Illia Shytov', 'FinCash Team', html)

# 3. Replace Framer template references
html = re.sub(r'(?i)built on framer', 'Built for FinCash', html)
html = re.sub(r'(?i)modern framer template', 'modern React template', html)

# 4. Remove "Buy template" links
html = re.sub(r'<a[^>]*>(?:(?!<a).)*?buy template(?:(?!<a).)*?</a>', '', html, flags=re.IGNORECASE|re.DOTALL)

# 5. Any leftover "Framer" mentions (like <strong class="framer-text">Framer</strong>) -> "FinCash"
html = re.sub(r'>Framer<', '>FinCash<', html)
html = re.sub(r'>framer<', '>fincash<', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Footer fixes applied successfully.")
