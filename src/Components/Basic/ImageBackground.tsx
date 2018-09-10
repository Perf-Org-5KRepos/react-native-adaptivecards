import React from 'react';
import {
    Image,
    ImageStyle,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface IProps {
    url: string;
    flex?: number;
    resizeMode?: 'stretch' | 'repeat' | 'repeatHorizontally' | 'repeatVertically';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    onLoad?: (data: any) => void;
    onError?: (error: any) => void;
}

interface IState {
    ratio: number;
}

export class ImageBackground extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            ratio: 1,
        };
    }

    public componentDidMount() {
        const { url } = this.props;

        if (url) {
            Image.getSize(
                url,
                (width, height) => {
                    if (width > 0 && height > 0) {
                        this.setState({
                            ratio: width / height,
                        });
                    }
                },
                (error) => {
                    this.props.onError(error);
                }
            );
        }
    }

    public render() {
        return (
            <View
                style={[
                    {
                        flex: this.props.flex,
                        position: 'relative',
                        marginTop: this.props.marginTop,
                        marginRight: this.props.marginRight,
                        marginBottom: this.props.marginBottom,
                        marginLeft: this.props.marginLeft,
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft
                    }, this.props.containerStyle
                ]}
            >
                <Image
                    source={{ uri: this.props.url }}
                    style={[
                        StyleSheet.absoluteFill,
                        this.props.imageStyle
                    ]}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    resizeMethod='auto'
                    resizeMode={this.resizeMethod}
                />
                {this.props.children}
            </View>
        );
    }

    private onLoad = (data: any) => {
        if (this.props.onLoad) {
            this.props.onLoad(data);
        }
    }

    private onError = (error: any) => {
        if (this.props.onError) {
            this.props.onError(error);
        }
    }

    private get resizeMethod() {
        switch (this.props.resizeMode) {
            case 'repeat':
                return 'repeat';
            case 'stretch':
            default:
                if (this.state.ratio > 1) {
                    return 'contain';
                } else {
                    return 'cover';
                }
        }
    }
}
