//setup data layer

import { createContext, useContext, useReducer } from 'react';

//track of the basket

export const StateContext = createContext();

//provider

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
