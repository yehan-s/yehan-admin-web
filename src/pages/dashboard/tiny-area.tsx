import { Tiny } from '@ant-design/plots'
// import { TinyArea } from '@ant-design/plots'

const DemoTinyArea = () => {
  const data = [0, 300, 438, 287, 309, 600, 900, 575, 563, 300, 200].map((value, index) => ({ value, index }))
  const config = {
    data,
    autoFit: true,
    shapeField: 'smooth',
    appendPadding: [0, -24, 0, -16],
    area: { fill: 'l(360) 1:rgba(98,0,234,0.65)  0.5:rgba(177,128,245,0.5)  0.5:rgba(177,128,245,0.5)' },
    line: { color: '#6200ea' },
    renderer: 'canvas',
  }
  return <Tiny.Area {...config} />
}

export default DemoTinyArea
