import { test, expect } from '@playwright/test';


test('Navigate to application', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');
  await page.locator('#id')
});
