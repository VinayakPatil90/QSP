import { test, expect } from '@playwright/test';

test('has logo', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('#qspiderLogo')).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');

  // Click the get started link.
  await page.getByPlaceholder('Enter your name').fill('Vinayak');
  await page.getByPlaceholder('Enter Your Email').fill('Test@gamil.com')
  await page.locator('#password').pressSequentially('Test123')
  await page.getByRole('button',{name:'Register'}).click()

  await expect(page.getByRole('status').first()).toHaveText('Registered successfully')
});

test('frames',async({page})=>{
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    await page.getByText('Frames').click()
})
test('pop-ups',async({page})=>{
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    await page.getByText('Popups').click()
})
