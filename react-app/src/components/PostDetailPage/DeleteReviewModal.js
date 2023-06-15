import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal"

const DeleteReviewModal = ({reviewId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deleteBtn = async (e) => {
        e.preventDefault()

        await dispatch(deleteReview(reviewId));
        closeModal()
    }


    return (
       <div className="delete-post-house">
            <h2>Are you sure you want to delete your review?</h2>
            <button onClick={deleteBtn}>Yes (delete my review)</button>
            <button onClick={() => closeModal()}>No (don't delete)</button>
        </div>
    )
}


export default DeleteReviewModal
