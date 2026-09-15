import { Page } from '@playwright/test';

export class HomePageFeature {
    readonly #page: Page;

    constructor(page: Page) {
        this.#page = page;
    } 
    async navigateToHomePage() {
        await this.#page.goto('http://localhost:3000/');
    }
    async clickAnalyzeButton() {
        await this.#page.getByRole('button', { name: 'Analyze' }).click();
    }
    async clickClearButton() {
        await this.#page.getByRole('button', { name: 'Clear' }).click();
    }



}