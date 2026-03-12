import { test, expect } from '@playwright/test';

test.beforeEach('Navigate to application', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByPlaceholder('Enter your name').fill('Vinayak');
  await page.getByPlaceholder('Enter Your Email').fill('Test@gamil.com')
  await page.locator('#password').pressSequentially('Test123')
  await page.getByRole('button', { name: 'Register' }).click()

  await expect(page.getByRole('status').first()).toHaveText('Registered successfully')
});

test('Mouse Action', async ({ page }) => {
  await page.getByText('Mouse Actions').click()
});

test('frames', async ({ page }) => {
  await page.getByText('Frames').click()
});

test('pop-ups', async ({ page }) => {
  await page.getByText('Popups').click()
});

test('Date & Time Picker', async ({ page }) => {
  await page.getByText('Date & Time Picker').click()
})
