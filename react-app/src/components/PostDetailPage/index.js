import { useParams, useHistory } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton'
import DeletePostModal from "./DeletePostModal";
import CreateReviewModal from "./CreateReviewModal"

const PostDetailPage = () => {

    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const single_review = useSelector(state => state.reviews)

    const post = posts[postId]
    console.log("posts=====================================================", posts)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
    }, [dispatch])

    console.log("reviews====================================================", reviews)

    if (!post) return null
    if (!user) return null

    const postOwner = post.user.id === user.id


    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Post Detail Page...</h2>
        {postOwner &&
            <>
            <button onClick={() => history.push(`/posts/${postId}/update`)}>Update Post</button>
            <OpenModalButton
                buttonText={'Delete Post'}
                modalComponent={<DeletePostModal postId={postId}/>}
            />
            </>
        }
        <div className="post-detail-house" style={{display:'flex', justifyContent:'center', gap: '50px', marginTop: '50px'}}>
            <div>
                <img src={post.post_image} style={{height: '500px'}}></img>
            </div>
            <div>
                <h1>{post.name}</h1>
                <h3>{post.genre}</h3>
                <h2>{post.description}</h2>
                <p>{post.user.first_name}'s Rating {post.rating} Stars</p>
                ------this is reviews------
                {reviews.map(review => {
                    if (review.post_id === post.id) {
                    return (
                        <>
                        <div>
                            <div>{review.rating} Stars</div>
                            <div>{review.content}</div>
                            <div>{review.user.username}</div>
                        </div>
                        </>
                    )}
                })}
                {/* add display logic here */}
                <OpenModalButton
                            buttonText={'Post Review'}
                            modalComponent={<CreateReviewModal postId={post.id}/>}
                        />
            </div>
        </div>
        </>
    )
}

export default PostDetailPage
