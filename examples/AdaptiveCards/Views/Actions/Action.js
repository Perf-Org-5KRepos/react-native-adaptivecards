import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ActionView extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
            if (callback) {
                if (this.props.actionHooks) {
                    callback(...this.props.actionHooks);
                }
                else {
                    callback();
                }
            }
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', 'error');
        }
        return (React.createElement(Button, { flex: 1, title: this.title, color: StyleManager.getColor('accent', 'default', false), fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('bolder'), backgroundColor: StyleManager.getBackgroundColor('default'), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onPress, marginTop: StyleManager.actionDirection === 'vertically' ? this.spacing : 0, marginLeft: StyleManager.actionDirection === 'horizontal' ? this.spacing : 0, style: {
                borderLeftWidth: this.leftBorderWidth,
                borderLeftColor: StyleManager.separatorColor,
            } }));
    }
    get leftBorderWidth() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return 1;
        }
        return 0;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.actionSpacing;
        }
        return 0;
    }
    get title() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return '';
        }
        return this.props.element.title ? this.props.element.title.toLocaleUpperCase() : '';
    }
}