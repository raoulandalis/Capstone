import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import { useModal } from '../../context/Modal'
import './PostLandingPage.css'

const NewPostForm = () => {
    const dispatch = useDispatch();
    const posts =useSelector(state => state.posts);
    // const user = useSelector(state.session.user)
    const {closeModal} = useModal();

    //state slices
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [post_image, setPostImage] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (!description) error.description = "Description is required"
        if (!genre) error.genre = "Genre is required"
        if (!post_image) error.post_image = "Image is required"
        if (!rating) error.rating = "Rating is required"
        setErrors(error)
    }, [name, description, genre, post_image, rating])

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("genre", genre)
        formData.append("post_image", post_image)
        formData.append("rating", rating)

        //error handling here
        if (!Object.values(errors).length) {
            const data = await dispatch(createPost(formData));
            closeModal()
        }

        setName('')
        setDescription('')
        setGenre('')
        setPostImage('')
        setRating('')
        setSubmitted(false)
    }

    if (!posts) return null

    return (
        <>
        <h2>New Post Modal</h2>
        <div className='post-form-house'>
            <form id="p-form" onSubmit={submitForm}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Genre:
                    <input type="text" name="genre" onChange={(e) => setGenre(e.target.value)}/>
                </label>
                <label>
                    Description:
                    <textarea type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Image Link:
                    <input type="text" name="image" onChange={(e) => setPostImage(e.target.value)}/>
                </label>
                <label>
                    Rating:
                    <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/>
                </label>
                <button>POST</button>
            </form>
            </div>
        </>
    )
}

export default NewPostForm
