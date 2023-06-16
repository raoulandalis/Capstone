import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom"
import { updateReview } from '../../store/reviews';
import { useModal } from "../../context/Modal"

const UpdateReviewModal = ({reviewId}) => {

    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)
    const { closeModal } = useModal()

    //state slices
    const [content, setContent] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const error = {}
        if (!content) error.content = "Review is required"
        if (!rating) error.rating = "Rating is required"
        setErrors(error)
    }, [content, rating])


    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData();
        formData.append("content", content)
        formData.append("rating", rating)

        // if (!Object.values(errors).length) {
        //     const data = await dispatch(updateReview(reviewId, formData))

        //     setContent('')
        //     setRating('')
        //     setSubmitted(false)
        //     closeModal()
        // }

        const data = await dispatch(updateReview(reviewId, formData))

        if (data.errors) {
            console.log("===================================", data.errors)
            return setErrors(data.errors)
        }

        if (submitted && errors) {
            setErrors('')
        }

        setContent('')
        setRating('')
        setSubmitted(false)
        closeModal()
    }

    if (!reviews) return null

    return (
        <>
        <h2>Update Review Modal</h2>
        <div className="review-form-house">
            <form onSubmit={submitForm} style={{display: 'flex', flexDirection:'column'}}>
                <label>
                    {errors.content && submitted && < p style={{ color: "red" }}>{errors.content}</p>}
                    <textarea
                        value={content}
                        placeholder="Write a review..."
                        required
                        onChange={(e) => setContent(e.target.value)}
                        minLength={5}
                    />
                </label>
                <label>
                    Rating:
                    {errors.rating && submitted && < p style={{ color: "red" }}>{errors.rating}</p>}
                    <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/>
                </label>
                <button>POST</button>
            </form>
        </div>
        </>
    )
}

export default UpdateReviewModal
