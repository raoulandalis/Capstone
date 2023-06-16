from flask import Blueprint, flash, request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Post, Review
from ...models.user import User
from ...forms.post_form import PostForm
from ...forms.post_form import ReviewForm

posts = Blueprint("posts", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# get all posts
@posts.route("")
# @login_required
def get_posts():

    posts = Post.query.all()

    post_list = [post.to_dict() for post in posts]

    res = {}

    for post in post_list:
        post_id = post['id']
        res[post_id] = post

    return res


# get single post may not need!!
# @posts.route("/<int:id>/")
# # @login_required
# def single_post(id):

#     post = Post.query.get(id)

#     return post.to_dict()


#create a post
@posts.route("", methods=["POST"])
@login_required
def create_posts():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)

        res = Post(
            name = form.data['name'],
            description = form.data['description'],
            genre = form.data['genre'],
            post_image = form.data['post_image'],
            rating = form.data['rating'],
            created_at = date.today(),
            user = selected_user
        )
        db.session.add(res)
        db.session.commit()
        return {'resPost': res.to_dict()}

    if form.errors:
        print("backend form=============================", validation_errors_to_error_messages(form.errors))
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
        return {'errors': form.errors}, 400


#update a post
@posts.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_post(id):

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        post = Post.query.get(id)
        post.name = form.data['name']
        post.description = form.data['description']
        post.genre = form.data['genre']
        post.post_image = form.data['post_image']
        post.rating = form.data['rating']
        post.created_at = date.today()

        db.session.commit()
        return {'resPost': post.to_dict()}

    if form.errors:
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
        return {'errors': form.errors}, 400


#delete a post
@posts.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {"res": "Successfully deleted"}



#create a review
@posts.route("/<int:id>/reviews", methods=['POST'])
@login_required
def post_review(id):
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        selected_user = User.query.get(current_user.id)
        res = Review(
            content = form.data['content'],
            rating = form.data['rating'],
            user = selected_user,
            post_id = id,
            created_at = date.today()
        )
        db.session.add(res)
        db.session.commit()
        return {"resReview": res.to_dict()}

    if form.errors:
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 400
        return {'errors': form.errors}, 400
