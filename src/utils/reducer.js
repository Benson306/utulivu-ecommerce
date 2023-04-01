export const initialState = {
    total: 0,
    products: [],
    deliveryCounty: null,
    pickupPoint: null
}

const reducer = (state, action) =>{
    const { type, payload } = action;

    switch(type){
        case "ADD_TO_CART":
            return {
                ...state,
                products: payload.products
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                products: payload.products
            }
        case "UPDATE_PRICE":
            return {
                ...state,
                total: payload.total
            };
        case "ADD_DELIVERY_COUNTY":
            let countyState = {
                ...state,
                deliveryCounty: payload.deliveryCounty
            }
            //localStorage.setItem('state', JSON.stringify(countyState));
            return countyState;
        case "ADD_PICKUP_POINT":
            let pickupState = {
                ...state,
                pickupPoint: payload.pickupPoint
            }
            //localStorage.setItem('state', JSON.stringify(pickupState));
            return pickupState;
        case "CLEAR_STATE":
            return {
                total: 0,
                products: [],
                deliveryCounty: null,
                pickupPoint: null
            }
        default:
            throw new Error(`No case for type ${type} found in reducer`)
    }
}


export default reducer;