import { Page } from '@playwright/test';

export class HomePageFeature {
    readonly #page: Page;

    constructor(page: Page) {
        this.#page = page;
    } 
    async navigateToHomePage() {
        const url: string = process.env.NEXT_PUBLIC_PLAYWRIGHT_URL && process.env.NEXT_PUBLIC_PLAYWRIGHT_URL.length > 0
            ? process.env.NEXT_PUBLIC_PLAYWRIGHT_URL
            : '/';
        await this.#page.goto(url);
    }

    async clickAnalyzeButton() {
        await this.#page.getByRole('button', { name: 'Analyze' }).click();
    }
    async clickClearButton() {
        await this.#page.getByRole('button', { name: 'Clear' }).click();
    }



}