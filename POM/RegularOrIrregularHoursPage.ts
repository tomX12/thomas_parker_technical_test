import { BaseMethods } from './BaseMethods';

export class RegularOrIrregularHoursPage extends BaseMethods {
    public PageText = {
        PageHeading: 'Does the employee work irregular hours or for part of the year?',
    } as const;

    async selectWorksIrregularHours(option: 'Yes' | 'No') {
        await this.assertPageHeadingText(this.PageText.PageHeading);
        await this.selectRadioBtn(option);
    }
}
