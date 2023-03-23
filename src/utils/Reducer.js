import React from "react";

export const initialState = {
    cartItems: []
}

export const reducer = (state, action) =>{

    switch (action.type){
        case 'ADD_TO_CART':      
            const itemIndex = state.cartItems.findIndex(item =>
                item._id === action.payload._id
            );
         
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
              }else{
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                console.log(state.cartItems)    
              }
        case 'REMOVE_FROM_CART':
          const newCartItems = state.cartItems.filter(item => 
            item._id !== action.payload._id 
          )
          state.cartItems = newCartItems;
        default:
            return state;
    }
}
