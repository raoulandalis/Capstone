from flask import Blueprint, flash, request
from flask_login import login_required, current_user
from datetime import date

reviews = Blueprint("reviews", __name__)
