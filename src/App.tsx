import './App.css'
import { ConfigProvider, App as AntdApp } from 'antd'
import Router from './routes'

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <Router></Router>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
