import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the main framer bundle script
html = re.sub(r'<script[^>]*data-framer-bundle="main"[^>]*>.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

# Remove the Framer analytics/events script
html = re.sub(r'<script[^>]*src="https://events\.framer\.com[^>]*>.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

# Remove the framer init.mjs
html = re.sub(r'<script[^>]*>.*?https://framer\.com/edit/init\.mjs.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

# Let's also make sure to remove any remaining "framer_variant" inline script 
html = re.sub(r'<script[^>]*>.*?framer_variant.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

# Remove animator script
html = re.sub(r'<script[^>]*>.*?var animator.*?.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

# Remove __framer_disable_appear_effects_optimization__ script
html = re.sub(r'<script[^>]*>.*?__framer_disable_appear_effects_optimization__.*?</script>', '', html, flags=re.IGNORECASE|re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Framer scripts removed successfully.")
