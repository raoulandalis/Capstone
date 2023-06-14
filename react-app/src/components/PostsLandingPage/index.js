import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import OpenModalButton from '../OpenModalButton';
import NewPostModal from './NewPostModal'
import './PostLandingPage.css'


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)


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
        <OpenModalButton
            buttonText={'NEW POST'}
            modalComponent={<NewPostModal/>}
        />
        }
        </div>
        <div className='landing-house'>
            {posts.map(post => {
                return (
                    <>
                    <div key={post.id} className="post-tiles">
                        <img src={post.post_image} style={{height: '300px', width: '100%', objectFit:'cover'}}></img>
                        <h2>{post.name} - {post.rating} Stars</h2>
                        <h3>{post.genre}</h3>
                        <p>{post.description}</p>
                        <p>Posted by {post.user.username}</p>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default PostsLanding
