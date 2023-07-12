//actions
const GET_PLAYLISTS = 'playlists/GET_PLAYLISTS'
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'


//action creators
const getPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    }
}

const addPlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        playlist
    }
}

const removePlaylist = (playlistId) => {
    return {
        type: DELETE_PLAYLIST,
        playlistId
    }
}


//thunk action creators
export const getAllPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/playlists')

    if (response.ok) {
        const data = await response.json();
        dispatch(getPlaylists(data))
        return data
    } else {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const createPlaylist = (playlist) => async (dispatch) => {
    const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playlist)
    });
    if (response.ok) {
        const {resPlaylist} = await response.json();
        dispatch(addPlaylist(resPlaylist))
        return resPlaylist
    } else {
        const data = await response.json()
        if (data.errors) {
            return data
        }
    }
}

export const deletePlaylist = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removePlaylist(playlistId))
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
        case CREATE_PLAYLIST:
            newState = { ...state };
            newState[action.playlist.id] = action.playlist
            return newState
        case DELETE_PLAYLIST:
            newState = { ...state };
            delete newState[action.playlistId]
            return newState
        default:
            return state;
    }
}


export default playlistsReducer
