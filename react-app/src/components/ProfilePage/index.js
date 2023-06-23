import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import {getAllReviews} from '../../store/reviews'
import { NavLink } from "react-router-dom";
import "./ProfilePage.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)

    const reviews = Object.values(useSelector((state => state.reviews)))

    const userPosts = posts.filter(post => post.user.id === user.id)

    const reviewCount = reviews.filter(review => review.user.id === user.id)

    console.log(userPosts, "post========================================")
    console.log(reviewCount, "user reviews=======================================")



    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
    }, [dispatch])


    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        }
    }

    //TOTAL USER AVERAGE MATH

    const userPostsTotal = userPosts.reduce((total, post) => total + post.rating, 0)
    const userReviewTotal = reviewCount.map(review => review.rating).reduce((total, rating) => total + rating, 0)
    const totalRatingsCount = reviewCount.length + userPosts.length
    const totalRatings = userPostsTotal + userReviewTotal

    const avgRatings = totalRatings / totalRatingsCount
    const avgRatingsPercentage = (avgRatings / 5) * 100;
    const percentage = Math.min(avgRatingsPercentage, 100);


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


    return (
        <>
        <div className='profile-landing-house'>
            {userPosts.length === 0 ? (
            <h2>Let's go to the movies!</h2>
            ) : (
            <>
            <div className="user-info-house">
                <h1 className="banner-tags">{user.first_name} {user.last_name}</h1>
                <div className="progress-bar-pfp">
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
                    <span>Average Movie Score</span>
                </div>
                <h2 className="banner-tags">Stats</h2>
                <div className="stats-house">
                    <div>Total Watched
                        <div className="pfp-count">
                            <div>
                                <h2>{userPosts.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div>Total Ratings
                        <div className="pfp-count">
                            <h2>{userPosts.length + reviewCount.length}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Carousel infiniteLoop={true} responsive={responsive}>
                {userPosts.map(post => {
                return (
                    <NavLink
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                    key={post.id}
                    >
                    <div className="post-tiles">
                        <img
                            src={post.post_image}
                            style={{
                            height: '400px',
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                            }}
                            onError={e => {
                            e.target.src = "https://i.imgur.com/paTs3e4.png"
                            }}
                            alt="Post Image"
                        />
                    <h2>{post.name}</h2>
                    <h3>My Rating {starRating(post.rating)}</h3>
                    <h4>{post.genre}</h4>
                    <p>Posted by {post.user.username}</p>
                 </div>
                    </NavLink>
                )
            })}
            </Carousel>
            </>
            )}
        </div>
        </>

        )
}

export default ProfilePage
