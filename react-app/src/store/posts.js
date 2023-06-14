//actions
const GET_POSTS = 'posts/GET_POSTS'

//action creators
const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

//thunk action creators
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data))
        return data
    } else {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    }
}

//initial state
const initialState = {}

//reducer
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = {...action.posts};
            return newState;
        default:
            return state;
    }
}


export default postsReducer
