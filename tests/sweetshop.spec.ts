import { test, expect } from '@playwright/test';

test.describe('Sweet Shop – 5 Simple Tests', () => {

  // TC01 – Navigation + URL assertion
  test('TC01 - Navigate to Sweets page', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await page.click('text=Sweets');
    await expect(page).toHaveURL(/\/sweets/);
  });

  // TC02 – Button interaction + locator assertion
  test('TC02 - Add to Basket increases basket counter', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await expect(page.locator('text=0 Basket')).toBeVisible();
    await page.locator('text=Add to Basket').first().click();
    await expect(page.locator('text=1 Basket')).toBeVisible();
  });

  // TC03 – Multiple add to basket
  test('TC03 - Add same product twice and verify in basket', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await page.locator('text=Add to Basket').first().click();
    await page.locator('text=Add to Basket').first().click();
    await page.click('text=Basket');
    await expect(page.locator('text=Your Basket 2')).toBeVisible();
  });

  // TC04 – Form + submit + validation (FORM TEST)
  test('TC04 - Empty checkout form shows validation errors', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/basket');
    await page.click('text=Continue to checkout');
    await expect(page.locator('text=Valid first name is required.')).toBeVisible();
    await expect(page.locator('text=Zip code required.')).toBeVisible();
  });

  // TC05 – Negative test (wrong input)
  test('TC05 - Invalid email login shows error', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/login');
    await page.fill('input[type="email"]', 'wrong-email');
    await page.fill('input[type="password"]', '123456');
    await page.click('text=Login');
    await expect(page.locator('text=Please enter a valid email address.')).toBeVisible();
  });

});
