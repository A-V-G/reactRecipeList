import React from 'react'

export default class AddNewRecipeItem extends React.Component {
    render() {
        return (
            <div className="recipe-item__add">
                <button onClick={this.props.handler}>Add new recipe</button>
            </div>
        )
    }
}
