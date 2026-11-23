import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

export class BaseMethods {
    readonly inputBox: Locator;
    readonly pageHeading: Locator;
    readonly continueBtn: Locator;
    readonly dayInputBox: Locator;
    readonly monthInputBox: Locator;
    readonly yearInputBox: Locator;
    readonly errorMsg: Locator;
    readonly skipToContentLink: Locator;

    constructor(public readonly page: Page) {
        this.inputBox = page.getByRole('textbox');
        this.pageHeading = page.getByRole('heading', { level: 1 });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.dayInputBox = page.getByRole('textbox', { name: 'Day', exact: true });
        this.monthInputBox = page.getByRole('textbox', { name: 'Month', exact: true });
        this.yearInputBox = page.getByRole('textbox', { name: 'Year', exact: true });
        // GOV.UK error summary is rendered inside role="alert"; each error is a link to the invalid field
        this.errorMsg = page.getByRole('alert').getByRole('link');
        this.skipToContentLink = page.getByRole('link', { name: 'Skip to main content' });
    }

    async goToBaseUrl() {
        await this.page.goto('');
    }

    async goToPageViaUrl(baseUrl: string, path: string) {
        const url = `${baseUrl}${path}`;
        await this.page.goto(url);
    }

    async clickBtn(btnTitle: string) {
        await this.page.getByRole('button', { name: btnTitle }).click();
    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async clickLink(linkText: string) {
        await this.page.getByRole('link', { name: linkText }).click();
    }

    /**
     * Returns the answer cell from the "Your answers" summary list for a given question.
     */
    answerFor(question: string): Locator {
        return this.page
            .locator('.govuk-summary-list__row')
            .filter({ has: this.page.getByRole('term').filter({ hasText: question }) })
            .getByRole('definition')
            .first();
    }

    async changeAnswer(question: string) {
        await this.page.getByRole('link', { name: `Change ${question}` }).click();
    }

    async selectRadioBtn(radioBtnTitle: string) {
        await this.page.getByRole('radio', { name: radioBtnTitle, exact: true }).check();
    }

    async typeIntoInput(inputValue: string) {
        await this.inputBox.fill(inputValue);
        await expect(this.inputBox).toHaveValue(inputValue);
    }

    async assertPageHeadingText(headingText: string) {
        await expect(this.pageHeading).toHaveText(headingText);
    }

    async assertPageHeadingContainsText(headingText: string) {
        await expect(this.pageHeading).toContainText(headingText);
    }

    async assertTextContains(locator: Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }

    async inputDate(date: string) {
        // Date is expected in DD/MM/YYYY format
        const [day, month, year] = date.split('/');

        await this.dayInputBox.fill(day);
        await expect(this.dayInputBox).toHaveValue(day);
        await this.monthInputBox.fill(month);
        await expect(this.monthInputBox).toHaveValue(month);
        await this.yearInputBox.fill(year);
        await expect(this.yearInputBox).toHaveValue(year);
    }

    async assertErrorMessageVisible(error: string) {
        await expect(this.errorMsg).toHaveText(error);
    }

    /**
     * Presses a keyboard key. Uses Playwright key names, e.g. 'Tab', 'Enter', 'ArrowDown'.
     */
    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    async elementIsVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async elementIsFocused(locator: Locator) {
        await expect(locator).toBeFocused();
    }

    async assertNoAccessibilityViolations() {
        const pageName = (await this.pageHeading.innerText()).trim();
        const results = await new AxeBuilder({ page: this.page }).withTags(WCAG_TAGS).analyze();

        const violations = results.violations.map(
            (v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} element(s)) - ${v.helpUrl}`,
        );
        // Full axe output (failing HTML, selectors, fix suggestions) for debugging
        await test.info().attach(`axe details - ${pageName}`, {
            body: JSON.stringify(results.violations, null, 2),
            contentType: 'application/json',
        });

        expect(violations, `Accessibility violations on "${pageName}"`).toEqual([]);
    }
}
