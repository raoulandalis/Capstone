import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PostsLanding from "./components/PostsLandingPage";
import NewPostPage from "./components/PostsLandingPage/NewPostPage"
import PostDetailPage from "./components/PostDetailPage";
import UpdatePost from "./components/PostDetailPage/UpdatePage";
import FeedLanding from "./components/FeedPage";
import ProfilePageLanding from "./components/ProfilePage"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <PostsLanding />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create">
            <NewPostPage />
          </Route>
          <Route path="/profile">
            <ProfilePageLanding />
          </Route>
          <Route exact path="/posts">
            <FeedLanding />
          </Route>
          <Route path="/posts/:postId/update">
            <UpdatePost />
          </Route>
          <Route path="/posts/:postId">
            <PostDetailPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
