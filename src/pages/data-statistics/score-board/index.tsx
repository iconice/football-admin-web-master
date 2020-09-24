import React, { Component } from 'react'
import { Button } from 'antd'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'

interface IState {
  data: object[]
}

export default class ScoreBoard extends Component<{}, IState> {
  state = {
    data: [
      { name: '009魔王队', score: 18, turnNum: 9 },
      { name: '002黑暗队', score: 16, turnNum: 9 },
      { name: '007光明队', score: 16, turnNum: 8 },
      { name: '003梦之队', score: 14, turnNum: 9 },
      { name: '006雷霆队', score: 14, turnNum: 9 },
      { name: 'test', score: -5, turnNum: 9 }
    ]
  }

  componentDidMount() {}

  refresh = () => {
    this.setState({
      data: [
        { name: '009魔王队', score: 14, turnNum: 9 },
        { name: '002黑暗队', score: 12, turnNum: 9 },
        { name: '007光明队', score: 12, turnNum: 8 },
        { name: '003梦之队', score: 10, turnNum: 9 },
        { name: '006雷霆队', score: 8, turnNum: 9 }
      ]
    })
  }

  render() {
    const cols = {
      score: { alias: '积分', min: 5 },
      name: { alias: '球队名称' }
    }
    const { data } = this.state
    return (
      <>
        <Chart data={data} width={600} height={400} scale={cols}>
          <Axis name='name' title />
          <Axis
            name='score'
            title
            grid={{
              align: 'center',
              lineStyle: {
                stroke: 'cecece',
                lineDash: [4, 4]
              },
              alternateColor: ['#fff', '#eee'],
              // @ts-ignore
              hightLightZero: true,
              zeroLineStyle: {
                stroke: '#000',
                lineDash: [4, 4]
              }
            }}
          />
          {/* <Legend position='top' dy={-20} /> */}
          <Tooltip />
          <Geom
            type='interval'
            // adjust={['stack']}
            position='name*score'
            color='name'
          />
        </Chart>
        <Button onClick={this.refresh}>刷新</Button>
      </>
    )
  }
}
