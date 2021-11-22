export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SEARCH_KEY':
            return {
                itemList: [
                    ...state.itemList,
                    {
                        id: new Date().valueOf(),
                        data: action.payload,
                    }
                ]
            };
        case 'REMOVE_SEARCH_KEY':
            const items = state.itemList.filter(item => item.id !== action.payload);
            return { itemList: items };
        default:
            return state;
    }
}