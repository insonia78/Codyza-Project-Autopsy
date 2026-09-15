import { test, expect } from '@playwright/test';
import { HomePageFeature } from '../page-objects/feature/home-page-feature';

test.describe('Home Page Feature', () => {
    let homePageFeature: HomePageFeature;

    test.beforeEach(async ({ page }) => {
        homePageFeature = new HomePageFeature(page);
        await homePageFeature.navigateToHomePage();
    });

    test('should click analyze button', async () => {
        await homePageFeature.clickAnalyzeButton();
        // Add your assertions here
    });

    test('should click clear button', async () => {
        await homePageFeature.clickClearButton();
        // Add your assertions here
    });
});