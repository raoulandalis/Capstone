import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../store/posts";
import { useModal } from "../../context/Modal"

const DeletePostModal = ({postId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deleteBtn = async (e) => {
        e.preventDefault()

        await dispatch(deletePost(postId));
        closeModal()
        history.push("/profile")
    }


    return (
        <div className="delete-post-house">
            <h2>Are you sure you want to delete your movie?</h2>
            <button onClick={deleteBtn}>Yes (delete my movie)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    )
}

export default DeletePostModal
