from flask import Blueprint, flash, request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Playlist, PlaylistPost, Post
from ...models.user import User
from ...forms.playlist_form import PlaylistForm
from ...forms.playlist_form import PlaylistPostForm

playlists = Blueprint("playlists", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# get all playlists
@playlists.route("")
# @login_required
def get_playlists():
    playlists = Playlist.query.all()
    playlist_list = [playlist.to_dict() for playlist in playlists]

    playlist_posts = PlaylistPost.query.all()
    playlist_post_list = [playlist_post.to_dict() for playlist_post in playlist_posts]

    res = {}

    for playlist in playlist_list:
        playlist_id = playlist['id']
        res[playlist_id] = playlist
        res[playlist_id]['playlist_post'] = []

    #appends post's name to the empty array of playlist_posts

    for playlist_post in playlist_post_list:
        playlist_id = playlist_post['playlist_id']
        post_id = playlist_post['post_id']
        post = Post.query.get(post_id)
        if post:
            res[playlist_id]['playlist_post'].append(post.to_dict())

    return res


#create a playlist
@playlists.route("", methods=["POST"])
@login_required
def create_playlists():
    data = request.get_json()

    selected_user = User.query.get(current_user.id)

    res = Playlist(
            name = data['name'],
            created_at = date.today(),
            user = selected_user
        )
    db.session.add(res)
    db.session.commit()

    posts = []


    #adds posts to playlist
    post_ids = data['post_ids']
    for post_id in post_ids:
        post = Post.query.get(post_id)
        if post:
            posts.append(post.to_dict())
            playlist_post = PlaylistPost(
                playlist_id=res.id,
                post_id=post_id
            )
            db.session.add(playlist_post)

    db.session.commit()

    res_to = res.to_dict()
    res_to['playlist_post'] = posts


    return {'resPlaylist': res_to}
