from .db import db, environment, SCHEMA, add_prefix_for_prod
import os


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    post_image = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date(), nullable=False)

    user = db.relationship('User', back_populates='posts')
    reviews = db.relationship('Review', back_populates='post', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, posted a new movie! {self.name}'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'genre': self.genre,
            'post_image': self.post_image,
            'rating': self.rating,
            'created_at': self.created_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email
            },
        }

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.Date(), nullable=False)

    post = db.relationship('Post', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def __repr__(self):
        return f'<User {self.user_id}, {self.user.username}, left a review on Post {self.post_id}!>'

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'post_id': self.post_id,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'email': self.user.email
            }
        }
