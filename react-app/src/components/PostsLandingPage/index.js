import { useEffect, useState } from 'react';
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


    //slice state
    const [term, setTerm] = useState('')
    const [searched, setSearched] = useState(false)


    const search = posts.filter(post =>{
        const postName = post.name.toLowerCase()
        const postGenre = post.genre.toLowerCase()

        return postName.includes(term.toLowerCase()) || postGenre.includes(term.toLowerCase())})



    useEffect(() => {
        dispatch(getAllPosts())
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
                <div style={{display: 'flex', gap: '20px'}}>
                    <h2>Unleash Your Inner Critic.</h2>
                        <a href="https://github.com/raoulandalis" target="_blank">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style={{height: '25px', marginTop: '5px'}}/>
                        </a>
                        <a href="https://www.linkedin.com/in/raoul-andalis/" target="_blank">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg" style={{height: '25px', marginTop: '5px'}}/>
                        </a>
                </div>
                <input
                style={{width: '70vw', height: '50px', borderRadius:'10px 0 0 10px', marginTop: '10px', border: 'none', outline: 'none', paddingLeft: '30px'}}
                type="text"
                value={term}
                placeholder='Search movie or genre...'
                onChange={(e) => {
                    setTerm(e.target.value)
                    setSearched(false)
                }}
                />
                <i class="fa-solid fa-magnifying-glass" onClick={() =>{setSearched(true)}} style={{fontSize: '25px', color: 'black', marginRight: '10px', backgroundColor: 'white', padding: '8px 10px 17px', borderRadius:'0 10px 10px 0', cursor:'pointer'}}></i>

            </div>
            {term ? (
            <div className={searched ? 'search-posts' : 'search-hidden'}>
                {search.map((term) => (
                    <div className="search-bar-item" onClick={() => history.push(`/posts/${term.id}`)}>{term.name}</div>
                ))}
            </div>
            ) : null
            }
            </div>
        </div>
        <h2 id="pl-message">Trending</h2>
        <div className='post-landing-house'>
            <Carousel infiniteLoop={true} responsive={responsive}>
                {posts.filter(post => post.rating > 3).map((post) => (
                <div key={post.id} className="post-tiles">
                    <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src={post.post_image} style={{ height: '400px', width: '100%', objectFit: 'cover', borderRadius: '5px'}} onError={(e) => {e.target.src="https://i.imgur.com/paTs3e4.png"}}></img>
                        <h2>{post.name}</h2>
                        <h3>{post.user.first_name}'s Rating {starRating(post.rating)}</h3>
                        <h4>{post.genre}</h4>
                        <p>Posted by {post.user.username}</p>
                    </NavLink>
                </div>
                ))}
            </Carousel>
        </div>
        </>
        )
}

export default PostsLanding
