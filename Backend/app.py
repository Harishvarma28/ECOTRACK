from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from db import mysql  # Import mysql from db.py

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)  
    app.config.from_object(Config)

    # Initialize MySQL with the app
    mysql.init_app(app)

    # Define a root route
    @app.route('/')
    def home():
        return jsonify({'message': 'Welcome to the User Authentication API!'})

    # Import and register blueprints here to avoid circular import issues
    from routes import auth_blueprint  # Import inside the function
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app

# Create the Flask app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
