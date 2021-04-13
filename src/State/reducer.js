import initialStates from './initialStates';
import { areItemsEqual } from 'shared/itemFunctions';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_REFETCH':
            return {
                ...state,
                GrandParentCallback: action.GrandParentCallback
            };
        case 'SET_RESTAURANTS':
            return {
                ...state,
                restaurants: action.restaurants
            };

        case 'SET_CURRENT_RESTAURANT':
            return {
                ...state,
                currentRestaurant: action.currentRestaurant
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'SET_ATRIBUTE_TO_ITEM':
            // eslint-disable-next-line no-case-declarations
            let value = action.value;
            // eslint-disable-next-line no-case-declarations
            let payload = action.payload;
            return {
                ...state,
                item: { ...state.item, [value]: payload }
            };

        case 'SET_CURRENT_ITEM':
            // eslint-disable-next-line no-case-declarations
            let editableItem = action.item;

            return {
                ...state,
                item: editableItem
            };

        case 'CLEAR_ITEM':
            return {
                ...state,
                item: initialStates.item,
                itemFormFields: initialStates.itemFormFields
            };
        case 'SET_FIELDS_ERRORS':
            return {
                ...state,
                itemFormFields: action.itemFormFields
            };
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
                selectedOptions: []
            };
        case 'SET_SELECTED_OPTIONS':
            // eslint-disable-next-line no-case-declarations
            let index = state.selectedOptions.findIndex(
                (option) => option.name === action.newOption.name
            );
            if (index == -1) {
                return {
                    ...state,
                    selectedOptions: [...state.selectedOptions, action.newOption]
                };
            } else {
                let newoptions = [...state.selectedOptions];
                newoptions[index] = action.newOption;
                return {
                    ...state,
                    selectedOptions: newoptions
                };
            }

        case 'REMOVE_FROM_BASKET':
            // eslint-disable-next-line no-case-declarations
            let newBasket = [...state.basket];
            // eslint-disable-next-line no-case-declarations
            let itemIndex = state.basket.findIndex((basketItem) =>
                areItemsEqual(basketItem, action.item)
            );

            if (itemIndex >= 0) {
                newBasket.splice(itemIndex, 1);
            }
            return { ...state, basket: newBasket };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: initialStates.basket
            };

        default:
            return state;
    }
}

export default reducer;
