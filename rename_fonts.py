import re
import urllib.request
import os
import shutil

with open('google-fonts.css', 'r') as f:
    css_content = f.read()

blocks = re.split(r'@font-face\s*\{', css_content)[1:]

os.makedirs('public/fonts', exist_ok=True)
new_css_content = ""

counts = {}

for block in blocks:
    family_match = re.search(r'font-family:\s*"([^"]+)"', block)
    style_match = re.search(r'font-style:\s*([^;]+)', block)
    weight_match = re.search(r'font-weight:\s*([^;]+)', block)
    url_match = re.search(r'url\((https://[^)]+)\)', block)

    if family_match and style_match and weight_match and url_match:
        family = family_match.group(1).replace(' ', '')
        style = style_match.group(1).strip()
        weight = weight_match.group(1).strip()
        weight = weight.replace(' ', '-')
        url = url_match.group(1)

        key = f"{family}-{style}-{weight}"
        counts[key] = counts.get(key, 0) + 1

        filename = f"{key}-{counts[key]}.woff2"

        # We can just download it again, or since they are already downloaded to public/fonts/ using hash names,
        # we can just download again. It's fast.

        print(f"Downloading {url} to {filename}")
        urllib.request.urlretrieve(url, f"public/fonts/{filename}")

        new_block = block.replace(url, f"/fonts/{filename}")
        new_css_content += "@font-face {" + new_block

with open('src/styles/fonts.css', 'w') as f:
    f.write(new_css_content)

print("Done")
