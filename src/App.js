import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import './App.less'

class App extends Component {
  render () {
    const lyyProps = {
      className: 'lyy',
      style: {
        width: 376,
        height: 379
      }
    };
    return (
      <Row>
        <Col span={12}>
          <div {...lyyProps} />
        </Col>
      </Row>
    )
  }
}

export default App
