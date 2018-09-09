import * as React from 'react';
import { LabelInput } from '../../Components/Inputs/LabelInput';
import { NumberUtils } from '../../Utils/NumberUtils';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class PeoplePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.onContactLabelRemove = (index) => {
            if (this.state.selected && NumberUtils.isInRange(index, 0, this.state.selected.length - 1)) {
                this.props.model.onRemoveContact(this.state.selected[index].Address);
            }
        };
        this.onBlur = () => {
            this.setState({
                inputFocused: false
            }, () => {
                const { model } = this.props;
                if (model) {
                    let callback = model.context.blurHandler;
                    if (callback) {
                        callback();
                    }
                }
            });
        };
        this.onFocus = () => {
            this.setState({
                inputFocused: true
            }, () => {
                const { model } = this.props;
                if (model) {
                    let callback = model.context.focusHandler;
                    if (callback) {
                        callback();
                    }
                }
            });
        };
        this.onRequestSuggestion = (input) => {
            this.setState({
                value: input,
            }, () => {
                const { model } = this.props;
                if (model.onInput) {
                    model.onInput(this.state.value);
                }
            });
        };
        this.onSuggestionReady = (card) => {
            this.setState({
                suggestionCard: card,
            });
        };
        this.onStoreUpdate = (value) => {
            console.log(value);
            this.setState({
                selected: JSON.parse(value),
                value: '',
            });
        };
        const { model } = this.props;
        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            model.onSuggestionReady = this.onSuggestionReady;
            this.state = {
                value: '',
                inputFocused: false,
                selected: [],
                suggestionCard: undefined,
            };
        }
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    setState(state, callback) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(LabelInput, { placeholder: model.placeholder, value: this.state.value, focused: this.state.inputFocused, labels: this.labels, suggestionView: ContentFactory.createElement(this.state.suggestionCard, 0, theme), onRequestSuggestion: this.onRequestSuggestion, onFocus: this.onFocus, onBlur: this.onBlur, onLabelRemove: this.onContactLabelRemove }));
    }
    get labels() {
        return this.state.selected.map((contact) => {
            return {
                title: contact.Name
            };
        });
    }
}