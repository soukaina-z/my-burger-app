import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalPrice: 5,
    purchasable: false,
    purchasing: false
  };

  updatePurchasable = (ingredients) =>{
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }) // this return an array of state values
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHanlder = (type) =>{
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHanlder = (type) =>{
    if(this.state.ingredients[type] <= 0){
      return;
    }
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    this.updatePurchasable(updatedIngredients);
  };

  purchaseHandler = () =>{
    this.setState({purchasing: true});
  };

    render() {
      const disabledInfo = {...this.state.ingredients};
      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                  <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                  ingredientAdded = {this.addIngredientHanlder}
                  ingredientRemoved = {this.removeIngredientHanlder}
                  disabled = {disabledInfo}
                  price ={this.state.totalPrice}
                  canPurchase = {this.state.purchasable}
                  ordred = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
