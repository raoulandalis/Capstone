import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink, useHistory } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './PostLandingPage.css'


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        }
    }

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

    // WAIT
    if (!posts) return null


    return (
        <>
        <div className="top-landing">
        <div className="bottom-landing">
            <div className="welcome-text" style={{color:'white'}}>
                <h1 style={{fontSize:'60px'}}>Welcome.</h1>
                <h2>Unleash Your Inner Critic.</h2>
            </div>
            </div>
        </div>
        <h2 id="pl-message">Trending</h2>
        <div className='post-landing-house'>
            <Carousel infiniteLoop={true} responsive={responsive}>
                {posts.filter(post => post.rating > 3).map((post) => (
                <div key={post.id} className="post-tiles">
                    {user ? (
                    <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src={post.post_image} style={{ height: '400px', width: '100%', objectFit: 'cover' }}></img>
                        <h2>{post.name}</h2>
                        <h3>{post.user.first_name}'s Rating {starRating(post.rating)}</h3>
                        <h4>{post.genre}</h4>
                        <p>Posted by {post.user.username}</p>
                    </NavLink>
                    ) : (
                    <div style={{cursor: 'not-allowed'}}>
                        <img src={post.post_image} style={{ height: '400px', width: '100%', objectFit: 'cover' }}></img>
                        <h2>{post.name}</h2>
                        <h3>{post.user.first_name}'s Rating {starRating(post.rating)}</h3>
                        <h4>{post.genre}</h4>
                        <p>Posted by {post.user.username}</p>
                    </div>
                    )}
                </div>
                ))}
            </Carousel>
            </div>

            </>
        )
}

export default PostsLanding
