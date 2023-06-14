import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPosts} from '../../store/posts';
import './PostLandingPage.css'


const PostsLanding = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    console.log('========================== posts', posts)

    //WAIT
    // if (!posts) return null


    return (
        <>
        <h2 style={{display: 'flex', justifyContent: 'center'}}>Post Landing Page...</h2>
        <div className='landing-house'>
            {posts.map(post => {
                return (
                    <div key={post.id} className="post-tiles">
                        <img src={post.post_image} style={{height: '300px', width: '200px', objectFit:'cover'}}></img>
                        <h2>{post.name}</h2>
                        <h3>{post.genre}</h3>
                        <p>{post.description}</p>
                        <p>Posted by {post.user.username}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default PostsLanding
