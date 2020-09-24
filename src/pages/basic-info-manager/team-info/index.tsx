import React, { Component } from 'react'

interface IState {
  page: string
}

export default class TeamInfo extends Component<{}, IState> {
  state = {
    page: 'TeamInfo'
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
