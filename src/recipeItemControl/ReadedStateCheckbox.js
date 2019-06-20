import React from 'react'

export default class ReadeStateCheckbox extends React.Component {

    renderCheckboxes = () => {
        const {unvisible, handler, checkedState} = this.props
        if(unvisible) return null;
        return <input type="checkbox"  checked={checkedState} onChange={handler} className="recipe-item__readed"/>
    }

    render() {
        return (
            <React.Fragment>
                {this.renderCheckboxes()}
            </React.Fragment>
        )
    }
}