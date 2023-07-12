import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '../../store/playlists';
import {useModal} from "../../context/Modal"
import {useHistory} from 'react-router-dom'


const CreatePlaylistModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const posts = Object.values(useSelector(state => state.posts))
    // const user = useSelector(state => state.session.user)

    const playlists = useSelector(state => state.playlists)

    //state slices
    const [name, setName] = useState('')
    const [selected, setSelected] = useState([])
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (name.length < 5 || name.length > 100) error.name = "Name must be between 5 and 100 characters"
        if (selected.length === 0) error.selected = "Please select at least 1 movie"
        setErrors(error)
    }, [name, selected])


    const handlePostCheckboxChange = (event) => {
        const postId = event.target.value;
        if (event.target.checked) {
          setSelected([...selected, +postId]);
        } else {
          const index = selected.indexOf(+postId);
          const arr = [...selected.slice(0, index), ...selected.slice(index + 1)];
          setSelected(arr);
        }
      };



    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.keys(errors).length > 0) {
            return;
          }

        const data = await dispatch(createPlaylist({'name': name, 'post_ids': selected}))

        if (data.errors) {
            return setErrors(data.errors)
        }

        if (submitted && errors) {
            setErrors('')
        }

        setName('')
        setSelected([])
        setSubmitted(false)
        closeModal()
    }

    return (
        <>
        <i className="fa-regular fa-circle-xmark" style={{ marginLeft: '380px', marginRight: '10px', marginTop: '10px', cursor: 'pointer' }} onClick={() => closeModal()}></i>
        <h2 style={{ textAlign: "center", marginTop: '20px' }}>New Playlist</h2>
            <div className='post-form-house' style={{paddingLeft:'15px', paddingRight: '15px'}}>
                <form onSubmit={submitForm}id="p-form" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className="form-label">
                    Name
                        {errors.name && submitted && < p style={{ color: "red" }}>{errors.name}</p>}
                        <input type="text" name="name" value={name} minLength={5} maxLength={100} placeholder="Give your playlist a name..." onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <div style={{ overflow: 'scroll', height: '200px' }}>
                        <label className="form-label">
                        Choose Movie:
                    <div className="checkbox-group">
                    {errors.selected && submitted && < p style={{ color: "red" }}>{errors.selected}</p>}
                        {posts.map(post => (
                            <div key={post.id}>
                                <input
                                    type="checkbox"
                                    name="post_ids"
                                    value={post.id}
                                    id={`post-${post.id}`}
                                    defaultChecked={selected.includes(post.id)}
                                    onChange={(e) => handlePostCheckboxChange(e)}
                                />
                                <label htmlFor={`post-${post.id}`}> {post.name}</label>
                                </div>
                                ))}
                            </div>
                        </label>
                    </div>
                    <button id="post-btn" style={{marginTop: '20px', marginBottom: '20px'}}>POST</button>
                </form>
            </div>
        </>

    )
}

export default CreatePlaylistModal
