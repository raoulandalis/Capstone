import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts} from '../../store/posts';
import { getAllReviews } from "../../store/reviews";
import OpenModalButton from '../OpenModalButton'
import UpdatePost from "./UpdatePage";
import LoginFormModal from "../LoginFormModal";
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
    console.log("this is post ========================================", post)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
    }, [dispatch])

    if (!post) return null
    // if (!user) return null

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

    let postOwner;
    let userReviewsForPost

    if (user) {
        postOwner = post.user.id === user.id

        userReviewsForPost = reviews.find(review => (review.post_id == postId && review.user.id === user.id))
    }


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
        <div className="post-detail-house">
            <div className="side-bar">
            {postOwner &&
                <>

                <i class="fa-solid fa-file-pen" onClick={() => history.push(`/posts/${postId}/update`)} style={{cursor:'pointer', fontSize:"20px", marginLeft: '5px'}}></i>

                <OpenModalButton
                buttonText={<i class="fa-solid fa-trash" style={{fontSize:'20px'}}></i>}
                modalComponent={<DeletePostModal postId={postId}/>}
                />

                </>
            }
            </div>
            <div>
                <img src={post.post_image} style={{height: '500px', boxShadow: '5px 5px 5px grey'}}onError={(e) => {e.target.src="https://i.imgur.com/paTs3e4.png"}}></img>
            </div>
            <div className="details">
                <div className="top-name">

                {post.name.length < 25 ? (
                    <div className="title-and-circle">
                        <h1>{post.name}</h1>
                        <div className="progress-bar-wrapper">
                            <CircularProgressbar
                                value={percentage}
                                maxValue={5}
                                text={`${percentage.toFixed(0)}%`}
                                styles={buildStyles({
                                    textSize: '25px',
                                    pathColor: percentage <= 50 ? 'red' : (percentage > 50 && percentage < 80) ? 'green' : 'rgb(183, 178, 36)',
                                    textColor: percentage <= 50 ? 'red' : (percentage > 50 && percentage < 80) ? 'green' : 'rgb(183, 178, 36)'
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
                                    pathColor: percentage <= 50 ? 'red' : (percentage > 50 && percentage < 80) ? 'green' : 'rgb(183, 178, 36)',
                                    textColor: percentage <= 50 ? 'red' : (percentage > 50 && percentage < 80) ? 'green' : 'rgb(183, 178, 36)'
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
                        {user && review.user.id === user.id && (
                            <>
                            <OpenModalButton
                                buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                                modalComponent={<UpdateReviewModal reviewId={review.id} />}
                            />
                            <OpenModalButton
                                buttonText={<i class="fa-sharp fa-solid fa-trash"></i>}
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />
                            </>
                            )}

                        </>
                    )}
                })}
                </div>
                {!user ? (
                    <div id="p-review-btn">
                        <OpenModalButton
                            buttonText={'Post Review'}
                            modalComponent={<LoginFormModal />}
                        />
                    </div>
                    ) : (
                    <>
                {!postOwner && !userReviewsForPost && (
                    <div id="p-review-btn">
                        <OpenModalButton
                            buttonText={'Post Review'}
                            modalComponent={<CreateReviewModal postId={post.id} />}
                    />
                    </div>
                    )}
                    </>
                    )}

            </div>
        </div>
        </>
    )
}

export default PostDetailPage
