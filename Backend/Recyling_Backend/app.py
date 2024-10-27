# app.py
from flask import Flask
from app.routes.user_routes import user_bp
from app.routes.recycling_collection_router import recycling_bp  # Import the new recycling blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(recycling_bp)  # Register the recycling collection blueprint

if __name__ == '__main__':
    app.run(debug=True)
