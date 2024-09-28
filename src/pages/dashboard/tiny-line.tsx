import { TinyLine } from '@antv/g2plot'
import type { TinyLineOptions } from '@antv/g2plot'
import { useLayoutEffect, useRef } from 'react'

const DemoTinyLine = () => {
  const container = useRef(null)

  useLayoutEffect(() => {
    const data = [
      264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
    ]
    const tinyLine = new TinyLine(container.current!, {
      height: 50,
      autoFit: true,
      data,
      smooth: true,
      color: '#ffffff',
      // guideLine: [
      //   {
      //     type: 'mean',
      //     text: {
      //       position: 'start',
      //       content: '平均值',
      //       style: {
      //         stroke: 'white',
      //         lineWidth: 2,
      //       },
      //     },
      //   },
      // ],
    } as TinyLineOptions)

    tinyLine.render()

    return () => {
      tinyLine.destroy()
    }
  }, [])

  return <div ref={container} className="w-full"></div>
}

export default DemoTinyLine
