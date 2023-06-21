import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom"
import { updatePost } from '../../store/posts';
import StarRatings from 'react-star-ratings';
import '../PostsLandingPage/PostLandingPage.css'

const UpdatePost = () => {

    const { postId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()

    const posts = useSelector(state => state.posts);
    // const user = useSelector(state.session.user)

    const current_post = posts[postId]

    //state slices
    const [name, setName] = useState(current_post?.name || '')
    const [description, setDescription] = useState(current_post?.description || '')
    const [genre, setGenre] = useState(current_post?.genre || '')
    const [post_image, setPostImage] = useState(current_post?.post_image || '')
    const [rating, setRating] = useState(current_post?.rating || '')
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (name.length < 5 || name.length > 50) error.name = "Name must be between 5 and 50 characters"
        if (!description) error.description = "Description is required"
        if (!genre) error.genre = "Genre is required"
        if (genre.length < 5 || genre.length > 50) error.genre = "Name must be between 5 and 50 characters"
        if (!post_image) error.post_image = "Image is required"
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

        //error handling here
        // if (!Object.values(errors).length) {
        //     const data = await dispatch(updatePost(postId, formData));
        // }
        const data = await dispatch(updatePost(postId, formData));


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
        setRating('')
        setSubmitted(false)

        history.push(`/posts/${data.id}`)
    }

    if (!posts) return null


    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Revamp the Reels!</h2>
        <div className='post-form-house'>
            <form id="p-form" onSubmit={submitForm}>
                <label className="form-label">
                    Name
                    {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label className="form-label">
                    Genre
                    {errors.genre && submitted && < p style={{ color: "red" }}>{errors.genre}</p>}
                    <input type="text" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
                </label>
                <label className="form-label">
                    Description
                    {errors.description && submitted && < p style={{ color: "red" }}>{errors.description}</p>}
                    <textarea style={{resize: 'none'}} rows="5" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label className="form-label">
                    Image Link
                    {errors.post_image && submitted && < p style={{ color: "red" }}>{errors.post_image}</p>}
                    <input type="text" name="image" value={post_image} onChange={(e) => setPostImage(e.target.value)}/>
                </label>
                <label className="form-label">
                {errors.rating && submitted && <p style={{ color: 'red' }}>{errors.rating}</p>}
                    <StarRatings
                    rating={+rating}
                    starRatedColor="rgb(183, 178, 36)"
                    changeRating={value => setRating(value)}
                    numberOfStars={5}
                    name="rating"
                />
                </label>
                <button id="post-btn">Update</button>
            </form>
            </div>
        </>
    )
}

export default UpdatePost
