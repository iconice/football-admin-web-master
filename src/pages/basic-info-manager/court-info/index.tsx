import React, { Component } from 'react'

interface IState {
  page: string
}

export default class CourtInfo extends Component<{}, IState> {
  state = {
    page: 'CourtInfo'
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
