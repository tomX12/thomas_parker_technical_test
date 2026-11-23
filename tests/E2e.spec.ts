import { test } from '../helpers/Fixtures';

test.describe('End to end tests', { tag: '@e2e' }, () => {
    test.beforeEach(async ({ baseMethods }) => {
        // Start a new calculation
        await baseMethods.clickBtn('Start now');
    });

    test(
        'Regular nine to five work pattern for a full year is entitled to 28 days holiday',
        { tag: '@a11y' },
        async ({
            baseMethods,
            regularOrIrregularHoursPage,
            holidayEntitlementBasisPage,
            doYouWantToWorkOutHolidayPage,
            numDaysWorkedPerWeekPage,
            infoBasedOnAnswersPage,
        }) => {
            // Does not work irregular hours
            await regularOrIrregularHoursPage.selectWorksIrregularHours('No');
            await baseMethods.assertNoAccessibilityViolations();
            await baseMethods.clickContinue();

            // Holiday entitlement is based on days worked per week
            await holidayEntitlementBasisPage.selectEntitlementBasis('days worked per week');
            await baseMethods.assertNoAccessibilityViolations();
            await baseMethods.clickContinue();

            // For a full leave year
            await doYouWantToWorkOutHolidayPage.selectWhatHolidayIsFor('for a full leave year');
            await baseMethods.assertNoAccessibilityViolations();
            await baseMethods.clickContinue();

            // Works 5 days per week
            await numDaysWorkedPerWeekPage.inputDaysWorked('5');
            await baseMethods.assertNoAccessibilityViolations();
            await baseMethods.clickContinue();

            // Details submitted for calculation
            await baseMethods.assertPageHeadingContainsText(infoBasedOnAnswersPage.PageText.PageHeading);
            await baseMethods.assertNoAccessibilityViolations();

            await infoBasedOnAnswersPage.assertSummaryText('28 days');
        },
    );

    test('Irregular shift worker for 6 months working 8 hours per shift in a 10 shift cycle', async ({
        baseMethods,
        regularOrIrregularHoursPage,
        whenDoesLeaveYearStartPage,
        holidayEntitlementBasisPage,
        doYouWantToWorkOutHolidayPage,
        infoBasedOnAnswersPage,
    }) => {
        // Works irregular hours
        await regularOrIrregularHoursPage.selectWorksIrregularHours('Yes');
        await baseMethods.clickContinue();

        // Leave year starts on 22/05/2022
        await baseMethods.assertPageHeadingText(whenDoesLeaveYearStartPage.PageText.PageHeading);
        await baseMethods.inputDate('22/05/2022');
        await baseMethods.clickContinue();

        // Holiday entitlement is based on shifts
        await holidayEntitlementBasisPage.selectEntitlementBasis('shifts');
        await baseMethods.clickContinue();

        // For someone starting and leaving part way through a leave year
        await doYouWantToWorkOutHolidayPage.selectWhatHolidayIsFor(
            'for someone starting and leaving part way through a leave year',
        );
        await baseMethods.clickContinue();

        // Employment start date
        await baseMethods.assertPageHeadingText('What was the employment start date?');
        await baseMethods.inputDate('22/05/2022');
        await baseMethods.clickContinue();

        // Employment end date
        await baseMethods.assertPageHeadingText('What was the employment end date?');
        await baseMethods.inputDate('22/12/2022');
        await baseMethods.clickContinue();

        // Hours per shift
        await baseMethods.assertPageHeadingText('How many hours in each shift?');
        await baseMethods.typeIntoInput('8');
        await baseMethods.clickContinue();

        // Shifts per shift pattern
        await baseMethods.assertPageHeadingText('How many shifts will be worked per shift pattern?');
        await baseMethods.typeIntoInput('10');
        await baseMethods.clickContinue();

        // Days in the shift pattern
        await baseMethods.assertPageHeadingText('How many days in the shift pattern?');
        await baseMethods.typeIntoInput('14');
        await baseMethods.clickContinue();

        await infoBasedOnAnswersPage.assertSummaryText('16.50 shifts');
    });
});
