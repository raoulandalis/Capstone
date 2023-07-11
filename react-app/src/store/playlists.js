//actions
const GET_PLAYLISTS = 'playlists/GET_PLAYLISTS'


//action creators
const getPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    }
}


//thunk action creators
export const getAllPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/playlists')

    if (response.ok) {
        const data = await response.json();
        console.log("thunk data================", data)
        dispatch(getPlaylists(data))
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
const playlistsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PLAYLISTS:
            newState = { ...action.playlists };
            return newState;
        default:
            return state;
    }
}


export default playlistsReducer
