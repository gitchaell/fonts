import re
import urllib.request
import os

with open('google-fonts.css', 'r') as f:
    css_content = f.read()

urls = re.findall(r'url\((https://[^)]+)\)', css_content)

os.makedirs('public/fonts', exist_ok=True)

for i, url in enumerate(urls):
    filename = url.split('/')[-1]
    print(f"Downloading {filename}...")
    urllib.request.urlretrieve(url, f"public/fonts/{filename}")

    # Replace URL in CSS content
    css_content = css_content.replace(url, f"/fonts/{filename}")

with open('src/styles/fonts.css', 'w') as f:
    f.write(css_content)

print("Done")
