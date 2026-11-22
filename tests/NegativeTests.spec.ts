import { test } from '../helpers/Fixtures';
import { PATHS } from '../helpers/Paths';

test.describe('Negative tests to check error handling', () => {
    test('Error displays when the user tries to continue without selecting a radio btn', async ({
        baseMethods,
        baseURL,
    }) => {
        const pageHeading = 'Does the employee work irregular hours or for part of the year?';
        await baseMethods.goToPageViaUrl(baseURL!, PATHS[pageHeading]);
        await baseMethods.assertPageHeadingText(pageHeading);

        await baseMethods.clickContinue();

        await baseMethods.assertErrorMessageVisible('Please answer this question');
    });

    test('Error displays when user tries to enter more than 7 days worked per week', async ({
        baseMethods,
        baseURL,
        numDaysWorkedPerWeekPage,
    }) => {
        const pageHeading = 'Number of days worked per week?';
        await baseMethods.goToPageViaUrl(baseURL!, PATHS[pageHeading]);
        await baseMethods.assertPageHeadingText(pageHeading);

        await numDaysWorkedPerWeekPage.inputDaysWorked('8');
        await baseMethods.clickContinue();

        await baseMethods.assertErrorMessageVisible(
            'There are only 7 days in a week. Please check and enter a correct value.',
        );
    });
});
