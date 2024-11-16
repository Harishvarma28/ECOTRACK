# app.py
from flask import Flask, jsonify, request
from app.routes.user_routes import user_bp
from app.routes.recycling_collection_router import recycling_bp  # Register the recycling collection blueprint
from flask_cors import CORS
import jwt
import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')   # Replace with a secure key

# Middleware for token verification
@app.before_request
def check_token():
    if request.method == 'OPTIONS':
        return
    
    exempt_routes = ['user.login','user.change_password']
    if request.endpoint in exempt_routes:
        return

    token = request.headers.get('Authorization')
    if not token or not token.startswith("Bearer "):
        return jsonify({'error': 'Authorization token missing or malformed'}), 401

    token = token.split(" ")[1]

    try:
        jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError as e:
        print(f"Invalid token error: {str(e)}")  # Log the error for debugging
        return jsonify({'error': 'Invalid token'}), 401



# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(recycling_bp)

if __name__ == '__main__':
    app.run(debug=True)


# -- Table for Recycling Collection
# CREATE TABLE recycling_collection (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     collection_date DATE,
#     food_waste_weight DECIMAL,
#     aluminum_weight DECIMAL,
#     plastic_weight DECIMAL,
#     glass_weight DECIMAL,
#     other_waste_weight DECIMAL
# );

# -- Table for Recycling Revenue
# -- Table for Recycling Revenue
# CREATE TABLE recycling_revenue (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     revenue_date DATE,
#     sales_amount DECIMAL,
#     materials_sold VARCHAR(255),
#     buyer VARCHAR(255),
#     material_type VARCHAR(255), -- Added subcategory for material type
#     sale_date DATE               -- Added sale_date field
# );


# -- Table for Landfill Expense
# CREATE TABLE landfill_expense (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     landfill_date DATE,             -- Changed from expense_date to landfill_date
#     weight DECIMAL,                 -- Added weight column for weight in lbs.
#     expense_amount DECIMAL,         -- Changed from expense_amount to expense for the amount in US$
#     landfill_hauler VARCHAR(255)    -- Changed from landfill_location to landfill/hauler for company name
# );

