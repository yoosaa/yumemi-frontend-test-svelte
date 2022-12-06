import * as echarts from 'echarts'

export const createParam = items => {
  let param = ''
  if (items.length === 1) {
    param = `prefCode=${items[0]}`
  } else {
    param = `prefCode=${items[0]}&addArea=`
    for (let i = 1; i < items.length; i++) {
      param += i === 1 ? `${items[i]}_` : `,${items[i]}_`
    }
  }
  return param
}


export class handleEcharts {
  constructor () {
    this.options = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      dataZoom: {
        show: true,
        start: 0,
        end: 100
      },
      xAxis: {
        data: [],
        name: '年',
        nameTextStyle: {
          fontSize: 8,
          fontWeight: 'bold'
        },
        axisLabel: {
          fontSize: 10,
          fontWeight: 'bold'
        }
      },
      yAxis: {
        name: '千人',
        nameTextStyle: {
          fontSize: 8,
          fontWeight: 'bold'
        },
        axisLabel: {
          fontSize: 9,
          fontWeight: 'bold',
          formatter: function (value) {
            return value / 1000
          }
        }
      },
      series: [
        {
          data: [],
          type: 'line',
          areaStyle: {
            color: '#0DC5C1'
          }
        }
      ]
    }
  }

  init (area) {
    return echarts.init(area).setOption(this.options)
  }

  reRender (chart) {
    chart.resize()
  }
}