from playwright.sync_api import sync_playwright
import time

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:4321")
        time.sleep(2)

        # Click the first block (The Art of Typography)
        page.click(".ce-header")
        time.sleep(1)

        # Click the plus button (toolbox)
        page.click(".ce-toolbar__plus")
        time.sleep(1)

        # Take screenshot of the toolbox
        page.screenshot(path="toolbar_final.png")
        print("Screenshot saved to toolbar_final.png")

        browser.close()
except Exception as e:
    print(e)
