import {
    CREATE_PRICE,
    RETRIEVE_PRICES,
    UPDATE_PRICE,
    DELETE_PRICE
} from
"../actions/types";

const initialState = [];

const priceReducer = (prices = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case CREATE_PRICE:
            return [...prices, payload];

        case RETRIEVE_PRICES:
            return payload;

        case UPDATE_PRICE:
            return prices.map((price) => {
                if (price.id === payload.id) {
                    return {
                        ...price,
                        ...payload,
                    };
                } else {
                    return price;
                }
            });

        case DELETE_PRICE:
            return prices.filter((price) => price.id !== payload.id);

        default:
            return prices;
    }
}
 
export default priceReducer;