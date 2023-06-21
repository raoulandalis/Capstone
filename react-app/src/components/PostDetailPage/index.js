import { useParams, useHistory } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton'
import UpdatePost from "./UpdatePage";
import DeletePostModal from "./DeletePostModal";
import CreateReviewModal from "./CreateReviewModal"
import UpdateReviewModal from "./UpdateReview";
import DeleteReviewModal from "./DeleteReviewModal";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./PostDetailPage.css"

const PostDetailPage = () => {

    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const post = posts[postId]



    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
    }, [dispatch])

    if (!post) return null
    if (!user) return null

    const starRating = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i class="fa-sharp fa-solid fa-star" style={{color: '#b7b224'}}></i>)
            } else {
                stars.push(<i class="fa-regular fa-star" style={{color: '#b7b224'}}></i>)
            }
        }
        return stars
    }

    const postOwner = post.user.id === user.id
    const userReviewsForPost = reviews.find(review => (review.post_id == postId && review.user.id === user.id))


    //AVERAGE NUM LOGIC
    const allRatings = reviews.filter(review => review.post_id === +postId);

    const userRating = post.rating;

    const totalPostRating = allRatings.map(rating => rating.rating).reduce((acc, curr) => acc + curr, 0);

    const totalRating = userRating + totalPostRating;

    const avgRating = (totalRating / ((allRatings.length + 1) * 5)) * 100;

    //this will cap the rating to 100%
    const percentage = Math.min(avgRating, 100);



    return (
        <>
        {!postOwner && !userReviewsForPost && (
        <div>
            <OpenModalButton
                    buttonText={'Post Review'}
                    modalComponent={<CreateReviewModal postId={post.id}/>}
                />
        </div>)}
        {postOwner &&
            <>
            <button onClick={() => history.push(`/posts/${postId}/update`)}>Update Post</button>
            <OpenModalButton
                buttonText={'Delete Post'}
                modalComponent={<DeletePostModal postId={postId}/>}
            />
            </>
        }
        <div className="post-detail-house">
            <div>
                <img src={post.post_image} style={{height: '500px'}}></img>
            </div>
            <div className="details">
                <div className="top-name">

                {post.name.length < 30 ? (
                    <div className="title-and-circle">
                        <h1>{post.name}</h1>
                        <div className="progress-bar-wrapper">
                            <CircularProgressbar
                                value={percentage}
                                maxValue={5}
                                text={`${percentage.toFixed(0)}%`}
                                styles={buildStyles({
                                    textSize: '25px',
                                    pathColor: 'rgb(183, 178, 36)',
                                    textColor: 'rgb(183, 178, 36)'
                                    })}
                                />
                        </div>
                    </div>
                    ) : (
                    <div className="title-and-circle">
                        <h2>{post.name}</h2>
                        <div className="progress-bar-wrapper">
                            <CircularProgressbar
                                value={percentage}
                                maxValue={5}
                                text={`${percentage.toFixed(0)}%`}
                                styles={buildStyles({
                                    textSize: '25px',
                                    pathColor: 'rgb(183, 178, 36)',
                                    textColor: 'rgb(183, 178, 36)'
                                    })}
                                />
                        </div>
                    </div>
                    )}


                    <h3>{post.genre}</h3>
                    <p style={{marginTop:'5px'}}>{post.description}</p>
                </div>
                <h3 id="detail-reviews-word">Reviews</h3>
                <div className="detail-reviews">
                {reviews.map(review => {
                    if (review.post_id === post.id) {
                    return (
                        <>
                        <div>
                            <div style={{marginTop: '15px'}}>{starRating(review.rating)}</div>
                            <div style={{marginTop: '5px'}}>{review.content}</div>
                            <h4 style={{marginTop: '5px'}}>{review.user.username}</h4>
                        </div>
                        {review.user.id === user.id && (
                            <>
                            <OpenModalButton
                                buttonText={'Update'}
                                modalComponent={<UpdateReviewModal reviewId={review.id} />}
                            />
                            <OpenModalButton
                                buttonText={'Delete'}
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />
                            </>
                            )}

                        </>
                    )}
                })}
                </div>
            </div>
        </div>
        </>
    )
}

export default PostDetailPage
