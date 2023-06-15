//actions
const GET_REVIEWS = 'reviews/GET_REVIEWS'


//action creators
const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


//thunk action creators
export const getAllReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return data
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}


const initialState = {}
//reducer
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...action.reviews }
            return newState
        default:
            return state;
    }
}

export default reviewReducer;
