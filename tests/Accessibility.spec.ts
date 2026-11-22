import { test } from '../helpers/Fixtures';

test.describe('Accessibility tests', () => {
    test('Skip to content header is visible when the tab button is used', async ({ baseMethods }) => {
        await baseMethods.pressKey('tab');

        await baseMethods.elementIsVisible(baseMethods.skipToContentBanner);
    });
});
