import { test } from '../helpers/Fixtures';
import { PATHS } from '../helpers/Paths';

test.describe('Navigation tests', () => {
    test('The user can start a new form', async ({ baseMethods, baseURL }) => {
        const pageHeading = 'Number of days worked per week?';
        await baseMethods.goToPageViaUrl(baseURL!, PATHS[pageHeading]);
        await baseMethods.assertPageHeadingText(pageHeading);

        await baseMethods.clickLink('Start again');

        await baseMethods.assertPageHeadingText('Calculate holiday entitlement');
    });

    test('User can change an answer', async ({ baseMethods, holidayEntitlementBasisPage }) => {
        // Answer a question
        await baseMethods.clickBtn('Start now');
        await baseMethods.assertPageHeadingText('Does the employee work irregular hours or for part of the year?');
        await baseMethods.selectRadioBtn('No');
        await baseMethods.clickContinue();
        await baseMethods.assertPageHeadingText(holidayEntitlementBasisPage.PageText.PageHeading);

        // Change the answer
        await baseMethods.assertTextContains(baseMethods.answer, 'No');
        await baseMethods.clickLink('Change');
        await baseMethods.selectRadioBtn('Yes');
        await baseMethods.clickContinue();

        await baseMethods.assertTextContains(baseMethods.answer, 'Yes');
    });
});
