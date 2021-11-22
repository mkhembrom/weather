import React, { createContext, useReducer } from 'react';
import { searchReducer } from './searchReducer';

export const SearchContext = createContext();

const initialState = {
    itemList: [],
};

export const SearchContextProvider = (props) => {

    const [history, dispatch] = useReducer(searchReducer, initialState);

    return (
        <SearchContext.Provider value={{ history, dispatch }}>
            {props.children}
        </SearchContext.Provider>
    );
}