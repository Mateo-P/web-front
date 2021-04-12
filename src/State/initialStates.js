export const initialStates = {
    //RestaurantSide
    itemFormFields: [
        { label: 'Nombre', value: 'name', error: null },
        { label: 'Descripción', value: 'description', error: null },
        { label: 'Precio', value: 'price', error: null, currency: true }
    ],
    item: { options: [] },
    GrandParentCallback: null,
    user: null,
    restaurants: [],
    currentRestaurant: null,
    token: null,
    //DinerSide
    basket: [],
    selectedOptions: []
};

export default initialStates;
