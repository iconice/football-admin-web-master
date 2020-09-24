import React, { Component } from 'react'

interface IState {
  page: string
}

export default class WorkSpace extends Component<{}, IState> {
  state = {
    page: 'WorkSpace'
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
