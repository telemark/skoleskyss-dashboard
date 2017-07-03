'use strict'

import React from 'react'
import Panel from 'muicss/lib/react/panel'
const getData = require('../lib/get-data')

export default class Status extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: false
    }
    this.tick = this.tick.bind(this)
  }

  async componentDidMount () {
    const data = await getData(this.props.source)
    this.setState({data: data})
    this.timer = setInterval(this.tick, parseInt(this.props.refresh || '1', 10) * 1000 * 60)
  }

  async tick () {
    const data = await getData(this.props.source)
    this.setState({data: data})
  }

  render () {
    return (
      <Panel>
        <h2>{this.props.title}</h2>
        <ul className='mui-list--unstyled'>
          {this.state.data ? <li className='mui--text-display4'>{this.state.data.antallTilskudd || 0}</li> : null}
        </ul>
      </Panel>
    )
  }
}
