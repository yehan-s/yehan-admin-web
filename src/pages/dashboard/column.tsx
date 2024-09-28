import { useState, useEffect } from 'react'
import { Column } from '@ant-design/plots'
import type { ColumnConfig } from '@ant-design/plots'

import { useGlobalStore } from '@/stores/global'

import columnDarkTheme from './theme/dark-column-theme.json'
import columnLightTheme from './theme/light-column-theme.json'

const DemoColumn = () => {
  const [data, setData] = useState([])

  const { darkMode } = useGlobalStore()

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/FLrTNDvlna/column-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.error(error)
      })
  }

  const config: ColumnConfig = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    height: 400,
    legend: {
      position: 'bottom',
    },
  }

  return <Column theme={darkMode ? columnDarkTheme : columnLightTheme} {...config} />
}

export default DemoColumn
