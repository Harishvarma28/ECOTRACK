from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv



load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)

    # Register blueprints
    from .routes.user_routes import user_bp
    app.register_blueprint(user_bp, url_prefix='/api/users')

    return app
