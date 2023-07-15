import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { NavLink, useHistory } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./FeedPage.css"


const FeedLanding = () => {

    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const history = useHistory()

    //slice state
    const [term, setTerm] = useState('')
    const [searched, setSearched] = useState(false)


    const search = posts.filter(post => {
        const postName = post.name.toLowerCase()
        const postGenre = post.genre.toLowerCase()

        return postName.includes(term.toLowerCase()) || postGenre.includes(term.toLowerCase())
    })


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
            <input
                style={{
                    width: '70vw',
                    height: '50px',
                    borderRadius: '10px 10px 10px 10px',
                    marginTop: '10px',
                    border: 'none',
                    outline: 'none',
                    paddingLeft: '30px',
                    marginLeft: '10%',
                    borderTop: '4px solid rgb(183, 178, 36)',
                    borderLeft: '4px solid rgb(183, 178, 36)',
                    borderRight: '4px solid rgb(183, 178, 36)',
                    borderBottom: '4px solid rgb(183, 178, 36)'
                }}
                type="text"
                value={term}
                placeholder='Search movie or genre...'
                onChange={(e) => {
                    setTerm(e.target.value);
                    setSearched(false);
                }}
            />

            {/* <i class="fa-solid fa-magnifying-glass" onClick={() => { setSearched(true) }} style={{ fontSize: '25px', color: 'black', marginRight: '10px', backgroundColor: 'white', padding: '8px 10px 17px', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}></i> */}
            {term ? (
                <div className={searched ? 'search-posts' : 'search-hidden-feed'} style={{ position: 'absolute'}}>
                    {search.map((term) => (
                        <div className="search-bar-item" onClick={() => history.push(`/posts/${term.id}`)}>{term.name}</div>
                    ))}
                </div>
            ) : null
            }
            <div className='feed-landing-house'>
                {posts.reverse().map(post => {
                    return (
                        <>
                            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <div key={post.id} className="post-tiles">
                                    <img id="feed-img" src={post.post_image} style={{ height: '400px', width: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://i.imgur.com/paTs3e4.png" }}></img>
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
