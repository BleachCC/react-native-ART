/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ART, ScrollView, TouchableHighlight } from 'react-native';

import AnimatedProgressBar from './src/lib/bar/AnimatedProgressBar';

import ProgressBar from './src/lib/bar/ProgressBar';

var {
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  Group, // 可容纳多个形状、文本和其他的分组
  Shape, // 形状定义，可填充
  Path, // 路径
  LinearGradient, // 渐变色
  Pattern, // 填充图片
  ClippingRectangle, // 剪辑
} = ART;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var progress = 0

export default class App extends Component {

  touch = (isAdd) => {
    progress = isAdd ? progress += 0.2 : progress -= 0.2

    this.refs.progressBar.setProgress(progress)
  }

  render() {
    //直线
    let zx_path = Path()
      .moveTo(10, 50)
      .lineTo(180, 50)
    //虚线  
    let xx_path = Path()
      .moveTo(10, 60)
      .lineTo(180, 60)
    //矩形
    let jx_path = Path()
      .moveTo(10, 70)
      .lineTo(180, 70)
      .lineTo(180, 100)
      .lineTo(10, 100)
      .close()
    //三角形
    let sjx_path = Path()
      .moveTo(100, 110)
      .lineTo(180, 140)
      .lineTo(10, 140)
      .close()
    //圆弧
    let yuanhu_path = Path()
      .moveTo(100, 150)
      .arc(0, 100, 50)
      .close()
    //圆形
    let yuanx_path = Path()
      .moveTo(100, 270)
      .arc(0, 100, 50)
      .arc(0, -100, 50)
    //扇形
    let shanx_path = Path()
      .moveTo(100, 450)
      .lineTo(100, 400)
      .arc(30, 80, 50)
      .close()
    //反弧
    let fanhu_path = Path()
      .moveTo(150, 550)
      .counterArc(-50, -30, 1)
      .close()
    //进度条背景
    let jdt_path = Path()
      .moveTo(50, 570)
      .lineTo(250, 570)
      .arc(0, 30, 1)
      .lineTo(50, 600)
      .arc(0, -30, 1)
    //进度条填充
    let progress = 0.5
    let jdtFill_path = Path()
      .moveTo(50, 572)
      .lineTo(50 + progress * 200, 572)
      .arc(0, 26, 1)
      .lineTo(50, 598)
      .arc(0, -26, 1)
    //渐变色
    let gradient = new LinearGradient(
      {
        '0': 'red',
        '1': 'purple'
      },
      '0', '0', '226', ''
    )
    return (
      <View style={styles.container}>
        <ScrollView>
          <Surface width={300} height={600} style={{ backgroundColor: 'white' }}>
            <Shape d={zx_path} stroke='#000000' strokeWidth={2} />
            <Shape d={xx_path} stroke='#000000' strokeWidth={2} strokeDash={[10, 5, 20, 5]} />
            <Shape d={jx_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={sjx_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={yuanhu_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={yuanx_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={shanx_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={fanhu_path} stroke='#000000' strokeWidth={2} fill='orange' strokeDash={[10, 5, 20, 5]} />
            <Shape d={jdt_path} fill='orange' />
            <Shape d={jdtFill_path} fill={gradient} />
          </Surface>

          <AnimatedProgressBar ref='progressBar' style={{ width: 200, height: 30, marginTop: 30 }} barColor='orange' isLinearGradient={true} fillColor='red' startColor='red' endColor='purple' bordWidth={2} progress={0.1} />

          <TouchableHighlight onPress={() => this.touch(true)} style={{ marginTop: 30, width: 60, height: 30 }}>
            <View style={{ backgroundColor: 'orange', width: 60, height: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>+</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.touch(false)} style={{ marginTop: 30, width: 60, height: 30 }} >
            <View style={{ backgroundColor: 'orange', width: 60, height: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>-</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
