import { test } from '../helpers/Fixtures';

test.describe('Accessibility tests', { tag: '@a11y' }, () => {
    test('Skip to content link receives focus and is visible when the Tab key is pressed', async ({ baseMethods }) => {
        await baseMethods.pressKey('Tab');

        await baseMethods.elementIsFocused(baseMethods.skipToContentLink);
        await baseMethods.elementIsVisible(baseMethods.skipToContentLink);
    });
});
