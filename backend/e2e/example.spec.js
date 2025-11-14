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

test('VisitKaggle',async({page})=>{
    await page.goto('http://localhost:5000')
    await page.getByText('Indian Case Law Evaluation Corpus (ICLEC)').click()
    const href = await page.getByRole('link', { name: 'Visit Kaggle' }).getAttribute('href');
    expect(href).toBe('https://www.kaggle.com/datasets/hrithikraj2537/indian-case-law-evaluation-corpus-iclec')
})


test('VisitHuggingface',async({page})=>{
    await page.goto('http://localhost:5000')
    await page.getByText('ICLEC - NLP Ready Dataset').click()
    const href = await page.getByRole('link', { name: 'Visit Huggingface' }).getAttribute('href');
    expect(href).toBe('https://huggingface.co/datasets/HRITHIKRAJ2537H/ICLEC')
})

test('BM25 CLERC Index Files',async({page})=>{
    await page.goto('http://localhost:5000')
    await page.getByText('BM25 CLERC Index Files').click()
    const href = await page.getByRole('link', { name: 'Visit Huggingface' }).getAttribute('href');
    expect(href).toBe('https://huggingface.co/HRITHIKRAJ2537H/bm25-clerc-pyserini')
})

test('Git hub repo',async({page})=>{
    await page.goto('http://localhost:5000')
    await page.getByText('CasePulse GitHub Repository').click()
    const href = await page.getByRole('link', { name: 'Visit GitHub' }).getAttribute('href');
    expect(href).toBe('https://github.com/kmitofficial/CasePulse-G474-PS25.git')
})

