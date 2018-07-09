import { FontSize, FontWeight, HorizontalAlignment, TextColor } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
export class TextBlockElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.text = json.text;
            this.color = EnumUtils.getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default);
            this.horizontalAlignment =
                EnumUtils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = EnumUtils.getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default);
            this.weight = EnumUtils.getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default);
            this.wrap = json.wrap || false;
        }
    }
    getStyleConfig() {
        return {
            color: this.color,
            horizontalAlignment: this.horizontalAlignment,
            isSubtle: this.isSubtle,
            fontSize: this.size,
            fontWeight: this.weight,
            wrap: this.wrap,
            spacing: this.spacing,
        };
    }
    getTypeName() {
        return ContentElementType.TextBlock;
    }
    getRequiredProperties() {
        return ['text'];
    }
}