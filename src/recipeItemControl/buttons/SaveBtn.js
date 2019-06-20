import React from 'react';

export default class SaveButton extends React.Component {

    renderButton = () => {
      const {unvisible, handler} = this.props
  
      if(!unvisible) {
        return <button onClick={handler}>Save</button>
      } else {
        return null
      }
    }
  
    render() {
      return (
        <React.Fragment>
          {this.renderButton()}
        </React.Fragment>
      )
    }
    
  }
  