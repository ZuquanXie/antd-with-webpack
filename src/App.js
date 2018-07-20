import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './App.less'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      appName: 'AntDesign-With-Webpack',
      version: 'beta 1.0',
      description: '一个使用webpack动态加载Ant-design组件的范例333'
    }
  }
  render () {
    const lyyProps = {
      className: 'lyy',
      style: {
        width: 376,
        height: 379
      }
    };
    const { appName, version, description } = this.state;
    return (
      <Row>
        <Col sapn={24}>
          <h3>{appName}</h3>
        </Col>
        <Col sapn={24}>
          <p>{version}</p>
        </Col>
        <Col>
          <p>{description}</p>
        </Col>
        <Col span={12}>
          <div {...lyyProps} />
        </Col>
      </Row>
    )
  }
}

export default App
