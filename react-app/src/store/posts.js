//actions
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'posts/DE'

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

const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

const removePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
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
            console.log("store thunk===============================")
            return data
        }
    }
}

export const updatePost = (postId, post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/update`, {
        method: 'PUT',
        body: post
    })
    if (response.ok) {
        const {resPost} = await response.json()
        dispatch(editPost(resPost))
        return resPost
    } else {
        const data = await response.json()
        if (data.errors) {
            return data
        }
    }
}

export const deletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removePost(postId))
    }
}

//initial state
const initialState = {}

//reducer
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = { ...action.posts };
            return newState;
        case CREATE_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        case EDIT_POST:
            newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState[action.postId]
            return newState
        default:
            return state;
    }
}


export default postsReducer
