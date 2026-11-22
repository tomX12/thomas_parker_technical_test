import { BaseMethods } from './BaseMethods';

export class HolidayEntitlementBasisPage extends BaseMethods {
    public PageText = {
        PageHeading: 'Is the holiday entitlement based on:',
    } as const;

    async selectEntitlementBasis(option: string) {
        await this.assertPageHeadingText(this.PageText.PageHeading);
        await this.selectRadioBtn(option);
    }
}
