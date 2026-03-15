import { test, expect } from '@playwright/test';
import fs from 'fs';

test.beforeEach('Navigate to application', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');
})

test('Handle popup prompt and confirm', async ({ page }) => {
  await page.getByText('Popups').click();
  await page.getByText('Javascript').click();
  await expect(page.getByText('Purchased Items')).toBeVisible();
  await page.getByRole('link', { name: 'Prompt' }).click();
  const row = await page.getByRole('row', { name: 'Levis Shirt' });
  const selectRow = await row.locator('input[type="checkbox"]');
  await selectRow.click();
  page.on('dialog', dialog => dialog.accept('Test'));
  await page.locator('#deleteButton').click();
  expect(row).not.toBeVisible();
});

test('Hidden Division', async ({ page }) => {
  await page.getByText('Popups').click();
  await page.getByText('Hidden division').click();
  await page.getByRole('button', { name: 'Add Customer' }).click()
  const form = await page.locator('article form').filter({ hasText: 'Create a customer' })
  await form.locator('#customerName').fill('Vinayak');
  await form.locator('#customerEmail').fill('Test@gmail.com');
  await form.locator('#prod').selectOption('Mobile');
  await form.locator('#message').fill('Test Message By VP');
  await form.getByText('Submit').click();

  await expect(form.getByRole('row', { name: 'Vinayak' })).toBeHidden()
});

test('Browser Window', async ({ page, context }) => {
  await page.getByText('Popups').click();
  await page.getByText('Browser Windows').click();
  const item = await page.locator('div').filter({ hasText: 'Watches' })
  await item.getByText('view more').first().click()
  const newTabPromise = await context.waitForEvent('page')
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveTitle(/Luxury Watch/)
});

test('Multiple Windows', async ({ page, context }) => {
  await page.getByText('Popups').click();
  await page.getByText('Browser Windows').click();
  await page.getByText('Multiple Windows', { exact: true }).click();
  await page.getByText('Shop Now').click();
  const pages = await context.pages();
  for (let page of pages) {
    const title = await page.title()
    console.log(title)
    await expect(page).toHaveTitle(title)
    page.close()
  }
});

test('Multiple tab', async ({ page, context }) => {
  await page.getByText('Popups').click();
  await page.getByText('Browser Windows').click();
  await page.getByText('Multiple Tabs', { exact: true }).click();
  await page.getByText('Shop Now').click();
  const pages = await context.pages();
  for (let page of pages) {
    const title = await page.title()
    console.log(title)
    await expect(page).toHaveTitle(title)
    page.close()
  }
});

test('Authentication', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "admin",
      password: "admin"
    }
  })
  const page = await context.newPage();
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');
  await page.getByText('Popups').click();
  await page.getByText('Authentication').click();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator('#AuthLink').click()
  ])
  await newPage.waitForLoadState();
  await expect(newPage.getByRole('heading')).toHaveText('Basic Auth')
});

test('File Uploads default', async ({ page }) => {
  await page.getByText('Popups').click();
  await page.getByText('File Uploads').click();
  await page.setInputFiles('input[type="File"]','./data/sample.pdf')
});

test('File Uploads custom', async ({ page }) => {
  await page.getByText('Popups').click();
  await page.getByText('File Uploads').click();
  await page.getByText('Custom Button',{exact : true}).click();
  
  const [filechooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      await page.getByText('Upload File',{exact:true}).click()
  ])
  await filechooser.setFiles('./data/sample.pdf')
});

test('File Uploads multiple', async ({ page }) => {
  await page.getByText('Popups').click();
  await page.getByText('File Uploads').click();
  await page.getByText('Multiple select',{exact : true}).click();
  
  await page.setInputFiles('input[type="file"]',["./data/sample.pdf"])
});

test('Browser notifications', async ({ browser }) => {
  const context = await browser.newContext({
    permissions : ['notifications']
  })
  const page = await context.newPage();
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
  await page.getByText('Popups').click();
  await page.getByText('Notifications').click();
  await page.locator('#browNotButton').click();
  await page.getByText('Notification Title').isVisible();
});

test('download',async({page})=>{
  await page.getByText('Popups').click();
  await page.locator('[href="/ui/download"]').click();
  await page.locator('#writeArea').fill('Test message');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#downloadButton').click();
  const download = await downloadPromise;
  await download.saveAs('./data/vp.txt')
  await expect(fs.existsSync('./data/vp.txt')).toBeTruthy();
})

