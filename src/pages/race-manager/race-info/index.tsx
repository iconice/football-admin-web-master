import React, { Component } from 'react'

interface IState {
  page: string
}

export default class RaceInfo extends Component<{}, IState> {
  state = {
    page: 'RaceInfo'
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
