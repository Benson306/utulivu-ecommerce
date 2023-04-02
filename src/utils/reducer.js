import AsyncStorage from "@react-native-async-storage/async-storage";

export const initialState = {
    total: 0,
    products: [],
    deliveryCounty: null,
    pickupPoint: null
}

const loadState = async () => {
    try {
      const storedState = await AsyncStorage.getItem('state');
      if (storedState !== null) {
        return JSON.parse(storedState);
      }
    } catch (e) {
      console.log(e);
    }
    return initialState;
  };


const reducer = (state, action) =>{
    const { type, payload } = action;

    switch(type){
        case "ADD_TO_CART":
            let addState =  {
                ...state,
                products: payload.products
            }
            AsyncStorage.setItem('state', JSON.stringify(addState));
            return addState;
        case "REMOVE_FROM_CART":
            let newState =  {
                ...state,
                products: payload.products
            }
            AsyncStorage.setItem('state', JSON.stringify(newState));
            return newState;
        case "UPDATE_PRICE":
            let updateState = {
                ...state,
                total: payload.total
            };
            AsyncStorage.setItem('state', JSON.stringify(updateState));
            return updateState;
        case "ADD_DELIVERY_COUNTY":
            let countyState = {
                ...state,
                deliveryCounty: payload.deliveryCounty
            }
            AsyncStorage.setItem('state', JSON.stringify(countyState));
            return countyState;
        case "ADD_PICKUP_POINT":
            let pickupState = {
                ...state,
                pickupPoint: payload.pickupPoint
            }
            AsyncStorage.setItem('state', JSON.stringify(pickupState));
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