import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import './RecipeItem.css';
import { fchmodSync } from 'fs';

import DeleteButton from './recipeItemControl/buttons/DeleteBtn';
import SaveButton from './recipeItemControl/buttons/SaveBtn';
import EditButton from './recipeItemControl/buttons/EditBtn';
import AddNewRecipeItem from './recipeItemControl/buttons/AddNewRecipeBtn';
import ReadeStateCheckbox from './recipeItemControl/ReadedStateCheckbox';


const defaultRecipe = [
  {title: 'салат', ingridients: 'огурец, зелень, помидорыб майлнез'},
  {title: 'суп', ingridients: 'картошка, курица, лук, лавровый лист, вода, моркова'},
]

class App extends React.Component {
  state = {defaultRecipe: defaultRecipe, filterReaded: null}

  onAddNewRecipe = () => {
    let newRecipes = [...this.state.defaultRecipe]
    let newTemplate = {title: '', ingridients: '', edited: true}

    newRecipes.push(newTemplate)
    this.setState({defaultRecipe: newRecipes})
  }

  onFilterRead = () => {
    this.setState({filterReaded: !this.state.filterReaded})
  }

  renderListRecieps = () => {
    return this.state.defaultRecipe.map((el, idx) => {
      return <RecipeItem title={el.title} ingridients={el.ingridients} edited={!!el.edited} key={`${el.title}${el.idx}`} filter={this.state.filterReaded}/>
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="recipe-list">
            <FilterUnreadedRecipe handler={this.onFilterRead}/>
            <AddNewRecipeItem handler={this.onAddNewRecipe}/>
            {this.renderListRecieps()}
          </div>
        </header>
      </div>
    );
  }
}


class FilterUnreadedRecipe extends React.Component {
  render() {
    return (
      <div className="recipe-item__add">
        <button onClick={this.props.handler}>Show/Hide Unread</button>
      </div>
    )
  }
}


class RecipeItem extends React.Component {
  state = {readed: this.props.readed, edited: this.props.edited, deleted: null, title: this.props.title, ingridients: this.props.ingridients } ;

  onEdit = () =>  {
    this.setState({edited: !this.state.edited})
  }

  onSave = () => {
    const newRecipeTitle = document.getElementById("recipe-title").value
    const newRecipeText = document.getElementById("recipe-content").value
    this.setState({edited: !this.state.edited, title: newRecipeTitle, ingridients: newRecipeText})
  }

  onDelete = () => {
    this.setState({deleted: true})
  }

  onReaded = () => {
    this.setState({readed: !this.state.readed})
  }

  renderRecipeItem = () => {
    const {readed, edited, deleted, title, ingridients} = this.state
    const filterReaded = this.props.filter

    if(readed && filterReaded ) return null

    if(readed && !deleted) {
      return <React.Fragment>
              <ReadeStateCheckbox handler={this.onReaded} checkedState={this.state.readed}/>
              <strike><h2>{title}</h2></strike>
              <DeleteButton handler={this.onDelete} />
            </React.Fragment>
    }
    if(edited && !deleted) {
      return <React.Fragment>
              <ReadeStateCheckbox handler={this.onReaded} checkedState={this.state.readed}/>
              <div className="recipe-item__edit-fields">
                <textarea  placeholder="add title" id="recipe-title">{title}</textarea>
                <textarea placeholder="add ingridients" id="recipe-content">{ingridients}</textarea>
              </div>
              <SaveButton handler={this.onSave}/>
              <DeleteButton handler={this.onDelete}/>
            </React.Fragment>
    } 
    if(deleted) {
      return null;
    }

    return <React.Fragment>
              <ReadeStateCheckbox handler={this.onReaded} checkedState={this.state.readed}/>
              <div>
                <h2>{title}</h2>
                <p>{ingridients}</p>
              </div>
              <EditButton handler={this.onEdit}/>
              <DeleteButton handler={this.onDelete} />
            </React.Fragment>
  }

  render() {
    return (
      <div className="recipe-item">
        {this.renderRecipeItem()}
      </div>
    )
  }
}


export default App;
