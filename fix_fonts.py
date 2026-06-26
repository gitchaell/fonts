import re
import urllib.request
import os

with open('google-fonts.css', 'r') as f:
    css_content = f.read()

blocks = re.split(r'@font-face\s*\{', css_content)[1:]

os.makedirs('public/fonts', exist_ok=True)
new_css_content = ""

counts = {}
downloaded_urls = set()

for block in blocks:
    family_match = re.search(r'font-family:\s*"([^"]+)"', block)
    style_match = re.search(r'font-style:\s*([^;]+)', block)
    weight_match = re.search(r'font-weight:\s*([\d\s]+)', block)
    url_match = re.search(r'url\((https://[^)]+)\)', block)

    if family_match and style_match and weight_match and url_match:
        family = family_match.group(1).replace(' ', '')
        style = style_match.group(1).strip()
        weight_str = weight_match.group(1).strip()
        # Some blocks have multiple weights like "400 700", just replace space with hyphen
        weight = weight_str.replace(' ', '-')
        url = url_match.group(1)

        # Determine base filename for the font variant
        key = f"{family}-{style}-{weight}"
        counts[key] = counts.get(key, 0) + 1

        # Add index to differentiate files that map to same variant
        filename = f"{key}-{counts[key]}.woff2"

        if url not in downloaded_urls:
            print(f"Downloading {filename}...")
            try:
                urllib.request.urlretrieve(url, f"public/fonts/{filename}")
                downloaded_urls.add(url)
            except Exception as e:
                print(f"Failed to download {url}: {e}")

        new_block = block.replace(url, f"/fonts/{filename}")
        new_css_content += "@font-face {" + new_block

with open('src/styles/fonts.css', 'w') as f:
    f.write(new_css_content)

print("Done")
