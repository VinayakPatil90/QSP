import { test, expect, Locator } from '@playwright/test';

test.beforeEach('Navigate to application', async ({ page }) => {
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
})

// test('Date Picker', async ({ page }) => {
//     await page.getByText('Date & Time Picker').click();
//     await page.getByText('Date Picker').click();
//     await page.locator('svg').first().click();
//     await page.locator('[role="option"]').filter({ hasText: '16' }).click();
// })

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
    const allPrice = await page.locator('tbody tr td:nth-child(5)').allTextContents()
    for (let price of allPrice) {
        console.log(price)
    }
});

test('Dynamic Table', async ({ page }) => {
    await page.getByText('Web Table').click();
    await page.getByText('Dynamic Web Table').click();
    const row = await page.getByRole('row', { name: "Samsung Galaxy" })
    await row.locator('td').nth(4).locator('.cursor-pointer').click()

    const form = await page.locator('form aside')
    await form.locator('select[name="quantity"]').click()
    await page.locator('form aside select[name="quantity"]').selectOption('2');
    await form.locator('#updatebtn').click()
});

// test('Table Sort', async ({ page }) => {
//     await page.getByText('Web Table').click();
//     await page.getByText('Dynamic Web Table').click();
//     const header = await page.locator('thead tr')
//     const quantityColumn = await header.getByText("Quantity")
//     await quantityColumn.click()
//     const quantities = await page.locator('tbody tr td:nth-child(3)').allTextContents()
//     expect(quantities).toEqual(["2", "3", "5", "7"])
// })