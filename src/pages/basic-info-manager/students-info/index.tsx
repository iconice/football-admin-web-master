import React, { Component } from 'react'

interface IState {
  page: string
}

export default class StudentsInfo extends Component<{}, IState> {
  state = {
    page: 'StudentsInfo'
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
