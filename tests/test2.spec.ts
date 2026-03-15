import { test, expect, Locator } from '@playwright/test';

test.beforeEach('Navigate to application', async ({ page }) => {
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
})

test('Date Picker', async ({ page }) => {
    await page.getByText('Date & Time Picker').click();
    await page.getByText('Date Picker').click();
    await page.locator('svg').first().click();
    await page.locator('[role="option"]').filter({ hasText: '16' }).click();
})

test('Table', async ({ page }) => {
    await page.getByText('Web Table').click();
    await expect(page.getByText('Purchased Items')).toBeVisible();

    const row = await page.getByRole('row', { name: 'Levis Shirt' })
    //specific cell data
    const cell = await row.locator('td').nth(0).textContent()
    expect(cell).toEqual('3.5 Star')

    //const cells: Locator[] = await row.locator('td').all();

    //All cell data
    const data = ['3.5 Star', '2', '23%', '896'];
    const cells = await row.locator('td').allTextContents();
    expect(cells).toEqual(data)

    //All data from one column
    const allPrice =  await page.locator('tbody tr td:nth-child(5)').allTextContents()
    for(let price of allPrice){
        console.log(price)
    }
});

test('Dynamic Table', async ({ page }) => {
  await page.getByText('Web Table').click();
  await page.getByText('Dynamic Web Table').click();
});
