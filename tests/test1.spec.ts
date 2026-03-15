import { test, expect, Locator } from '@playwright/test';

test.beforeEach('navigate to app', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
})

test('dragByPosition', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Drag & Drop').click();
  const dragElement = page.getByText('Drag Me');
  const box = await dragElement.boundingBox();
  const x = box?.x! + box?.width! / 2;
  const y = box?.y! + box?.height! / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 200, y + 395);
  await page.mouse.up();
});

test('dragAndDrop', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Drag & Drop').click();
  await page.getByText('Drag Position').click();
  const card = await page.locator('div.draggable-column')
  const item = await card.filter({ hasText: 'Mobile Charger' })
  await item.dragTo(page.locator('div.drop-column').filter({ hasText: 'Mobile Accessories' }))
});

test('dragMultipleItem', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Drag & Drop').click();
  await page.getByText('Drag Multiple').click();
  const item1 = await page.getByText('Mobile Cover');
  const item2 = await page.getByText('Mobile Charger');
  await item1.click();
  await item2.click();
  const target = page.locator('.drop-column').filter({ hasText: 'Mobile Accessories' });
  await item1.dragTo(target)
  await item2.dragTo(target)
});

test('Mouse Over Icon', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Drag & Drop').click();
  await page.getByText('Mouse Hover').click();
  await page.locator('#demoUI img').nth(1).hover();
  await expect(page.getByText('Password should contain atleast one uppercase')).toBeVisible();
});

test('Mouse Over Image', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Mouse Hover').click();
  await page.getByText('Image').click();
  const Image = await page.locator('[alt="order placed"]');
  await Image.hover();
  const tooltip = await Image.getAttribute('title');
  expect(tooltip).toEqual('Order Placed Image')
});

test('Mouse Over Rating', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Mouse Hover').click();
  await page.getByText('Ratings').click();
  await page.locator('section', { hasText: 'Rate this product' }).locator('label').nth(2).click();
  await expect(page.getByText('Your Rating is 3')).toBeVisible();
});

test('Mouse Over Tab', async ({ page }) => {
  await page.getByText('Mouse Actions').click();
  await page.getByText('Mouse Hover').click();
  await page.locator('[href="/ui/mouseHover/tab?sublist=3"]').click();
  const items = await page.locator('article .flex').getByRole('listitem');
  console.log(await items.count())
});



