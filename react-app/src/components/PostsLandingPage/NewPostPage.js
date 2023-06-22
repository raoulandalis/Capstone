import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { createPost } from '../../store/posts';
import StarRatings from 'react-star-ratings';
import './NewPostPage.css'

const NewPostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const posts = useSelector(state => state.posts);
    // const user = useSelector(state.session.user)

    //state slices
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [post_image, setPostImage] = useState('')
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (name.length < 5 || name.length > 50) error.name = "Name must be between 5 and 50 characters"
        if (!description) error.description = "Description is required"
        if (!genre) error.genre = "Genre is required"
        if (genre.length < 5 || genre.length > 50) error.genre = "Genre must be between 5 and 50 characters"
        if (!post_image) error.post_image = "Image is required"
        if (!post_image.match(/\.(jpg|jpeg|png)$/)) error.post_image = 'Image must end in .jpg, .jpeg, or .png'
        if (!rating) error.rating = "Rating is required"
        setErrors(error)
    }, [name, description, genre, post_image, rating])

    const submitForm = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if(Object.keys(errors).length) return;

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("genre", genre)
        formData.append("post_image", post_image)
        formData.append("rating", rating)


        const data = await dispatch(createPost(formData));

        if (data.errors) {
            return setErrors(data.errors)
        }

        if (submitted && errors) {
            setErrors('')
        }

        setName('')
        setDescription('')
        setGenre('')
        setPostImage('')
        setRating(0)
        setSubmitted(false)

        history.push(`/posts/${data.id}`)
    }

    if (!posts) return null

    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Share a New Film!</h2>
        <div className='post-form-house'>
            <form id="p-form" onSubmit={submitForm}>
                <label className="form-label">
                    Name
                    {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </label>
                <label className="form-label">
                    Genre
                    {errors.genre && submitted && < p style={{ color: "red" }}>{errors.genre}</p>}
                    <input type="text" name="genre" onChange={(e) => setGenre(e.target.value)}/>
                </label>
                <label className="form-label">
                    Description
                    {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                    <textarea style={{resize: 'none'}} rows="5" type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label className="form-label">
                    Image Link
                    {errors.post_image && submitted && < p style={{ color: "red" }}>{errors.post_image}</p>}
                    <input type="text" name="image" onChange={(e) => setPostImage(e.target.value)}/>
                </label>
                <label className="form-label">
                {errors.rating && submitted && <p style={{ color: 'red' }}>{errors.rating}</p>}
                    <StarRatings
                    className="star-ratings"
                    rating={rating}
                    starRatedColor="rgb(183, 178, 36)"
                    changeRating={value => setRating(value)}
                    numberOfStars={5}
                    name="rating"
                />
                </label>

                <button id="post-btn">POST</button>
            </form>
            </div>
        </>
    )
}

export default NewPostForm
