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
            res[playlist_id]['playlist_post'].append(post.name)

    return res
