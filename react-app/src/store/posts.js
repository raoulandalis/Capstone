//actions
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'

//action creators
const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const addPost = (post) => {
    return {
        type: CREATE_POST,
        post
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

export const createPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: post
    });

    if (response.ok) {
        const {resPost} = await response.json();
        dispatch(addPost(resPost))
        return resPost
    } else {
        const data = await response.json()
        if (data.errors) {
            return data
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
        case CREATE_POST:
            newState = {...state};
            newState[action.post.id] = action.post
            return newState;
        default:
            return state;
    }
}


export default postsReducer
