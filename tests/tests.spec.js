/* eslint-disable @stylistic/semi */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('invalidUrl', async ({ page }) => {
  await page.getByRole('textbox', { name: 'url' }).click();
  await page.getByRole('textbox', { name: 'url' }).fill('asd');
  await page.getByRole('button', { name: 'add' }).click();
  await expect(page.getByRole('main')).toContainText('Ссылка должна быть валидным URL');
});

test('validUrl', async ({ page }) => {
  await page.getByRole('textbox', { name: 'url' }).click();
  await page.getByRole('textbox', { name: 'url' }).fill('https://lorem-rss.hexlet.app/feed');
  await page.getByRole('button', { name: 'add' }).click();
  await expect(page.getByRole('main')).toContainText('RSS успешно загружен');
  await expect(page.getByRole('heading', { name: 'Посты' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Фиды' })).toBeVisible();
  await page.getByRole('listitem').filter({ visible: true }).first().getByRole('button')
    .click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
});
