import React from 'react';
import Aux from '../../../hoc/Auxiliary.js';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style={{textTransfrom: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });

  return(
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>with only ${props.price}</p>
      <p>Continue to checkout?</p>
    </Aux>
  );
}

export default orderSummary;
