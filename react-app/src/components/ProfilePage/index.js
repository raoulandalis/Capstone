import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink } from "react-router-dom";

//IMPORTANT: CLASSNAME FOR THIS PAGE IS CONNECTED TO FEED

const ProfilePage = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)

    const userPosts = posts.filter(post => post.user.id === user.id)

    console.log("======================================posts", userPosts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    return (
        <>
        <h2>Profile Page Landing</h2>
        <div className='post-landing-house'>
            {userPosts.map(post => {
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

export default ProfilePage
