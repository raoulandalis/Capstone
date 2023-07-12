import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import {getAllReviews} from '../../store/reviews'
import { getAllPlaylists } from '../../store/playlists';
import { NavLink } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import CreatePlaylistModal from './CreatePlaylistModal';
import "./ProfilePage.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DeletePlaylistModal from './DeletePlaylistModal';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)

    const reviews = Object.values(useSelector((state => state.reviews)))

    const userPosts = posts.filter(post => post.user.id === user.id)

    const reviewCount = reviews.filter(review => review.user.id === user.id)


    //playlists
    const playlists = Object.values(useSelector(state => state.playlists))

    const user_playlist = playlists.filter(playlist => playlist.user.id === user.id)


    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllReviews())
        dispatch(getAllPlaylists())
    }, [dispatch])


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1400 },
          items: 4
        },
        largeDesktop: {
          breakpoint: { max: 1900, min: 1600 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1400, min: 1000 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 1000, min: 700 },
          items: 2
        },
        smallMobile: {
          breakpoint: { max: 700, min: 0 },
          items: 1
        }
      };

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
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src="https://i.imgur.com/4uyQ9a8.png" style={{borderRadius:'20px', boxShadow: '5px 5px 5px grey'}}></img>
            </div>
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

            <OpenModalButton
            buttonText={"Create Playlist"}
            modalComponent={<CreatePlaylistModal/>}
            />

            <h2 style={{marginBottom: '20px', marginTop: '20px', color:'grey'}}>My Movies</h2>
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

        {user_playlist.length === 0 ? (
            <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>Make a Playlist!</h2>
            ) : (
            user_playlist.map((playlist) => (
                <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginBottom: '20px', marginTop: '20px', marginRight: '10px', color: 'grey' }}>{playlist.name}</h2>
                <OpenModalButton
                buttonText={"Delete Playlist"}
                modalComponent={<DeletePlaylistModal playlistId={playlist.id}/>}
                />
                </div>
                <Carousel infiniteLoop={true} responsive={responsive}>
                    {playlist.playlist_post.map((post) => (
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
                            borderRadius: '5px',
                        }}
                            onError={(e) => {
                            e.target.src = 'https://i.imgur.com/paTs3e4.png';
                        }}
                            alt="Post Image"
                        />
                            <h2>{post.name}</h2>
                            <h3>My Rating {starRating(post.rating)}</h3>
                            <h4>{post.genre}</h4>
                            <p>Posted by {post.user.username}</p>
                            </div>
                        </NavLink>
                        ))}
                </Carousel>
                </>
                ))
            )}

        </div>
        </>

        )
}

export default ProfilePage
