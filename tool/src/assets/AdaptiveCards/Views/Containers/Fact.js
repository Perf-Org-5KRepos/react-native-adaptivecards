import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class FactView extends React.Component {
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', theme, 'error');
        }
        return (React.createElement(View, { style: {
                flexDirection: 'row',
                alignSelf: 'stretch'
            } },
            React.createElement(Text, { accessible: true, style: {
                    color: StyleManager.getFactTitleColor(theme),
                    fontSize: StyleManager.factTitleFontSize,
                    fontWeight: StyleManager.factTitleFontWeight,
                    flexWrap: StyleManager.factTitleWrap,
                    marginRight: 16,
                } }, element.title),
            React.createElement(Text, { style: {
                    color: StyleManager.getFactValueColor(theme),
                    fontSize: StyleManager.factValueFontSize,
                    fontWeight: StyleManager.factValueFontWeight,
                    flexWrap: StyleManager.factValueWrap,
                    marginRight: 16,
                } }, element.value)));
    }
}