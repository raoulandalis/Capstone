import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { postReview } from "../../store/reviews";
import { useModal } from "../../context/Modal"
import StarRatings from 'react-star-ratings';

const NewReviewModal = ({postId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const reviews = useSelector(state => state.reviews)

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
        //     const data = await dispatch(postReview(postId, formData))

        //     setContent('')
        //     setRating('')
        //     setSubmitted(false)
        //     closeModal()
        // }

        const data = await dispatch(postReview(postId, formData))

        if (data.errors) {
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
        <i class="fa-regular fa-circle-xmark" style={{marginLeft:'380px', marginTop:'10px', cursor:'pointer'}} onClick={() => closeModal()}></i>
        <h2 style={{textAlign:"center", marginTop:'20px'}}>How was it?</h2>
        <div className="review-form-house">
            <form onSubmit={submitForm} style={{display: 'flex', flexDirection:'column'}}>
                <label>
                    {errors.content && submitted && < p style={{ color: "red" }}>{errors.content}</p>}
                    <textarea
                        rows='5'
                        style={{resize: 'none', marginBottom:'10px'}}
                        value={content}
                        placeholder="Write a review..."
                        required
                        onChange={(e) => setContent(e.target.value)}
                        minLength={5}
                    />
                </label>
                <label style={{marginBottom:'20px'}}>
                {errors.rating && submitted && <p style={{ color: 'red' }}>{errors.rating}</p>}
                    <StarRatings
                    rating={+rating}
                    starRatedColor="rgb(183, 178, 36)"
                    changeRating={value => setRating(value)}
                    numberOfStars={5}
                    name="rating"
                />
                </label>
                <button id="review-post-btn">POST</button>
            </form>
        </div>
        </>
    )
}


export default NewReviewModal
