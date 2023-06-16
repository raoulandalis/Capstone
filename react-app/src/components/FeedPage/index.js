import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink } from "react-router-dom";


const FeedLanding = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <>
        <h2>Feed Landing</h2>
        <div className='post-landing-house'>
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


export default FeedLanding
