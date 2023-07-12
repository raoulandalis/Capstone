import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deletePlaylist } from '../../store/playlists';
import {useModal} from "../../context/Modal"

const DeletePlaylistModal = ({playlistId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    console.log("this is playlistId", playlistId)

    const deleteBtn = async (e) => {
        e.preventDefault()

        await dispatch(deletePlaylist(playlistId));
        closeModal()
    }

    return (
        <div className="delete-post-house">
            <h2>Are you sure you want to delete your playlist?</h2>
            <button onClick={deleteBtn}>Yes (delete my playlist)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    )
}


export default DeletePlaylistModal
