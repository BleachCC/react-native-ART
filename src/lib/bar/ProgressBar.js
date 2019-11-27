
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ART
} from 'react-native';

var {
    Surface,
    Group,
    Shape,
    LinearGradient,
    Path,
} = ART;

export default class ProgressBar extends Component {

    static defaultProps = {
        barColor: 'white',           //背景色
        fillColor: 'orange',         //进度条颜色
        isLinearGradient: false,     //是否是渐变色
        startColor: 'transparent',   //渐变开始颜色
        endColor: 'transparent',     //渐变结束颜色
        bordWidth: 0,                //边框宽度
        progress: 0                  //进度值
    };

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            linearGradient: null,
            backGroundPath: null,
            fillPath: null
        }
    }

    componentDidMount() {
        this.setState({
            linearGradient: this.getLinearGradient(),
            backGroundPath: this.getBackGroundPath(),
            fillPath: this.getFillPath()
        })
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.progress != this.props.progress) {
            this.setState({
                progress: nextProps.progress,
                fillPath: this.getFillPath()
            })
        }
    }

    //渐变色
    getLinearGradient = () => {
        const { startColor, endColor, style, bordWidth, isLinearGradient, fillColor } = this.props

        if (!isLinearGradient) return fillColor

        let bw = (bordWidth < 0 || bordWidth >= style.height) ? 0 : bordWidth

        let colorW = style.width - bw * 2

        return (
            new LinearGradient({
                '0': startColor,
                '1': endColor
            },
                '0', '0', colorW, ''
            )
        )
    }

    //背景path
    getBackGroundPath = () => {
        const { style } = this.props

        return (
            new Path()
                .moveTo(style.height / 2, 0)
                .lineTo(style.width - style.height / 2, 0)
                .arc(0, style.height, 1)
                .lineTo(style.height / 2, style.height)
                .arc(0, -style.height, 1)
        )
    }

    //填充path
    getFillPath = () => {
        const { style, bordWidth, progress } = this.props;

        let bw = (bordWidth < 0 || bordWidth >= style.height) ? 0 : bordWidth

        if (progress <= 0) return new Path()

        let prog = progress > 1 ? 1 : progress

        return (
            new Path()
                .moveTo(style.height / 2, bw)
                .lineTo(style.height / 2 + prog * (style.width - style.height), bw)
                .arc(0, style.height - bw * 2, 1)
                .lineTo(style.height / 2, style.height - bw)
                .arc(0, -(style.height - bw * 2), 1)
        )
    }

    render() {
        const { barColor, style } = this.props;
        return (
            <View {...this.props}>
                <Surface width={style.width} height={style.height} style={{ backgroundColor: 'transparent' }}>
                    <Group>
                        <Shape
                            d={this.state.backGroundPath}
                            fill={barColor}
                        />
                        <Shape
                            d={this.state.fillPath}
                            fill={this.state.linearGradient}
                        />
                    </Group>
                </Surface>
            </View>
        )
    }

}