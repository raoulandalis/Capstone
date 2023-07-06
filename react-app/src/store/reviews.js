//actions
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


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

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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


export const updateReview = (reviewId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/update`, {
        method: 'PUT',
        body: review
    })
    if (response.ok) {
        const { resReview } = await response.json();
        dispatch(editReview(resReview))
        return resReview
    } else {
        const data = await response.json()
        if (data.errors) {
            return data
        }
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeReview(reviewId))
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
        case EDIT_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.reviewId]
            return newState
        default:
            return state;
    }
}

export default reviewReducer;
