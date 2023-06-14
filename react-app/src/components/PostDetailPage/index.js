import { useParams, useHistory } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import OpenModalButton from '../OpenModalButton';

const PostDetailPage = () => {

    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)

    const post = posts[postId]

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!post) return null

    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Post Detail Page...</h2>
        {user &&
            <button onClick={() => history.push(`/posts/${postId}/update`)}>Update Post</button>
        }
        <div className="post-detail-house" style={{display:'flex', justifyContent:'center', gap: '50px', marginTop: '50px'}}>
            <div>
                <img src={post.post_image} style={{height: '500px'}}></img>
            </div>
            <div>
                <h1>{post.name}</h1>
                <h3>{post.genre}</h3>
                <h2>{post.description}</h2>
            </div>
        </div>
        </>
    )
}

export default PostDetailPage
