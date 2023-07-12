from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField, DateField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, ValidationError

def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 100 or len(text) < 5:
        raise ValidationError('Post must be between 5 and 2,000 characters')

class PlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(message="Name is required"), text_length])
    post_ids = SelectMultipleField("Posts", coerce=int, choices=[], validators=[DataRequired(message="Posts are required")])
    created_at = DateField("Date")
    submit = SubmitField("Submit")

class PlaylistPostForm(FlaskForm):
    playlist_id = IntegerField("Playlist", validators=[DataRequired(message="Playlist is required")])
    post_ids = IntegerField("Posts", validators=[DataRequired(message="Posts are required")])
    submit = SubmitField("Submit")
