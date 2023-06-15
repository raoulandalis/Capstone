//actions
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';


//action creators
const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


const createReview = (review) => {
    return {
        type: POST_REVIEW,
        review
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


export const postReview = (postId, review) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/reviews`, {
        method: 'POST',
        body: review
    })

    if (response.ok) {
        const { resReview } = await response.json();
        dispatch(createReview(resReview))
        return resReview
    } else {
        const data = await response.json();
        if (data.errors) {
            return data
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
        case POST_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        default:
            return state;
    }
}

export default reviewReducer;
