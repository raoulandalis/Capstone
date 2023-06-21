import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./FeedPage.css"


const FeedLanding = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))

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


    return (
        <>
        <div className='feed-landing-house'>
            {posts.reverse().map(post => {
                return (
                    <>
                    <NavLink to={`/posts/${post.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div key={post.id} className="post-tiles">
                            <img id="feed-img" src={post.post_image} style={{height: '400px', width: '100%', objectFit:'cover'}}></img>
                            <h2>{post.name}</h2>
                            <h3>{post.user.first_name}'s Rating {starRating(post.rating)}</h3>
                            <h4>{post.genre}</h4>
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


export default FeedLanding
