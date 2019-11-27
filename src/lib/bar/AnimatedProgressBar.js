
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Animated
} from 'react-native';

import ProgressBar from './ProgressBar'

const AnimProgressBar = Animated.createAnimatedComponent(ProgressBar);

export default class AnimatedProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.startAnimate(this.props.progress)
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps != this.props && nextProps.progress != this.props.progress) {
            this.startAnimate(nextProps.progress)
        }
    }

    setProgress = (progress) => {
        this.startAnimate(progress)
    }

    startAnimate(progress) {
        let prog = progress > 1 ? 1 : progress

        Animated.timing(this.state.progress, {
            toValue: prog,
            duration: 500
        }).start();
    }

    render() {
        const { progress, ...other } = this.props;

        return (
            <AnimProgressBar
                {...other}
                progress={this.state.progress}
            />
        )
    }
}