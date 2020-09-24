import React, { Component } from 'react'

interface IState {
  page: string
}

export default class ShootBoard extends Component<{}, IState> {
  state = {
    page: '射手榜'
  }

  render() {
    const { page } = this.state
    return (
      <>
        <p>this is {page} page</p>
      </>
    )
  }
}
