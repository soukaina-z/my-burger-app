import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component{

  state = {
    ingredients:{
      salad: 0,
      bacon: 0,
      cheese :0,
      meat: 0
    },
    totalPrice: 5
  };

  addIngredientHanlder = (type) =>{
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
  };

  removeIngredientHanlder = (type) =>{
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] !== 0 ? this.state.ingredients[type] - 1 : 0;
    const updatedPrice = this.state.ingredients[type] !== 0 ? this.state.totalPrice - INGREDIENT_PRICES[type] : this.state.totalPrice;
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
  };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                  ingredientAdded = {this.addIngredientHanlder}
                  ingredientRemoved = {this.removeIngredientHanlder}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
