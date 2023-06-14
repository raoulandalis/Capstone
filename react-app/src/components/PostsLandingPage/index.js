import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import NewPostModal from './NewPostPage'
import './PostLandingPage.css'


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    // WAIT
    if (!posts) return null


    return (
        <>
        <div className="top-landing">
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Post Landing Page...</h2>
        {user &&
            <button onClick={() => history.push("/create")}>New Post</button>
        }
        </div>
        <div className='landing-house'>
            {posts.map(post => {
                return (
                    <>
                    <NavLink to={`/posts/${post.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div key={post.id} className="post-tiles">
                            <img src={post.post_image} style={{height: '300px', width: '100%', objectFit:'cover'}}></img>
                            <h2>{post.name} - {post.rating} Stars</h2>
                            <h3>{post.genre}</h3>
                            <p>{post.description}</p>
                            <p>Posted by {post.user.username}</p>
                        </div>
                    </NavLink>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default PostsLanding
