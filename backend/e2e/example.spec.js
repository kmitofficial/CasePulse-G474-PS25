import {test,expect} from '@playwright/test'

test('hasTitle',async({page})=>{
    await page.goto('http://localhost:5000/')
    await expect(page).toHaveTitle(/CaseBridge/)
})

test('hasChatPage',async({page})=>{
    await page.goto('http://localhost:5000/')
    await page.getByRole('button', { name: 'Get Started' }).click()
    await expect(page).toHaveURL(/\/chat\//)

})