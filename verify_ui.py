from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4321")
    page.wait_for_timeout(2000)

    # Change font size
    page.locator("#typo-size").fill("24")
    page.wait_for_timeout(500)

    # Check font features toggles to verify saving to local storage
    # Just click the first details
    details = page.locator("details").first
    if details.count() > 0:
        details.click()
        page.wait_for_timeout(500)
        # click first toggle
        toggle_label = details.locator("label").first
        if toggle_label.count() > 0:
            toggle_label.click()
            page.wait_for_timeout(500)

    # Click copy CSS button
    page.locator("#copy-css-btn").click()
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
