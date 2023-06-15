from flask import Blueprint, flash, request
from flask_login import login_required, current_user
from datetime import date
from ...models.db import db
from ...models.models import Review
from ...models.user import User
from ...forms.post_form import ReviewForm

reviews = Blueprint("reviews", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages



#get all reviews
@reviews.route("")
@login_required
def get_reviews():

    reviews = Review.query.all()

    review_list = [review.to_dict() for review in reviews]

    res = {}

    for review in review_list:
        review_id = review['id']
        res[review_id] = review

    return res


#create a review double check the route for this might put it in post route
# @reviews.route("", methods=['POST'])
