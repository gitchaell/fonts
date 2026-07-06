from playwright.sync_api import sync_playwright
import time

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:4321")
        time.sleep(2)

        # Take screenshot of the initial state
        page.screenshot(path="favorites_initial.png")
        print("Screenshot saved to favorites_initial.png")

        # Find the 3rd font item (Geist Sans) and favorite it
        font_items = page.locator(".font-item")

        # Let's get the 3rd item's favorite button
        fav_btn = font_items.nth(2).locator(".favorite-btn")
        fav_btn.click()
        time.sleep(1)

        # Take a screenshot after favoriting
        page.screenshot(path="favorites_after_click.png")
        print("Screenshot saved to favorites_after_click.png")

        browser.close()
except Exception as e:
    print(f"Error: {e}")
