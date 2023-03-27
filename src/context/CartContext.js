import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "../utils/reducer";

const CartContext =  createContext(initialState);

export const CartProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (product) =>{
        const updatedCart = state.products.concat(product);

        updatedPrice(updatedCart);

        dispatch({
            type:"ADD_TO_CART",
            payload: {
                products: updatedCart
            }
        })
    }

    const removeFromCart = (product) =>{
        const updatedCart = state.products.filter(currentProduct => 
            currentProduct._id !== product._id
        )

        updatedPrice(updatedCart);

        dispatch({
            type:"REMOVE_FROM_CART",
            payload: {
                products: updatedCart
            }
        })
    }

    const updatedPrice = (products) =>{
        let total = 0;

        products.forEach(product => total += Number(product.price))

        dispatch({
            type: "UPDATE_PRICE",
            payload: {
                total: total
            }
        })
    }

    const value = {
        total: state.total,
        products: state.products,
        addToCart,
        removeFromCart
    }

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}

const useCart = () =>{
    const context = useContext(CartContext);

    if (context === 'undefined'){
        throw new Error("useart must be used within CartContext")
    }

    return context;
}

export default useCart;