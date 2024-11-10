from flask import Blueprint, request, jsonify
from app.utils.db_utils import execute_query, fetch_one,fetch_all
from app.utils.email_utils import send_email
from passlib.context import CryptContext
import random
import jwt
import os
from dotenv import load_dotenv
from app.utils.token_utils import create_token




# Load environment variables
load_dotenv()

# Create the user blueprint
user_bp = Blueprint('user', __name__)

# Create CryptContext for password verification
pwd_context = CryptContext(schemes=["scrypt"], deprecated="auto")

def generate_random_password(length=8):
    """Generates a random temporary password."""
    characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
    return ''.join(random.choice(characters) for _ in range(length))

@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    university = data.get('university')
    status = data.get('status', 'New User')  # Default status set to 'New User'
    role = data.get('role')

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    # Generate a random temporary password
    password = generate_random_password()
    # Hash the password using CryptContext
    hashed_password = pwd_context.hash(password)

    # SQL query to insert a new user
    query = """
        INSERT INTO users (name, email, university, status, role, password)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    user_id = execute_query(query, (name, email, university, status, role, hashed_password))

    if user_id:
        # Send email with the temporary password
        email_subject = "Welcome to Our Service"
        email_body = f"Hello {name}, your account has been created successfully! Your temporary password is: {password}"

        if not send_email(email, email_subject, email_body):
            return jsonify({"error": "Failed to send email"}), 500
            
        return jsonify({"message": "User added successfully", "user_id": user_id}), 201
    else:
        return jsonify({"error": "Failed to add user"}), 500

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    print(f"Login attempt for email: {email}")  # Debug print
    user = fetch_one("SELECT * FROM users WHERE email = %s", (email,))
    
    if user:
        print(f"User found: {user['email']}")  # Debug print
        if pwd_context.verify(password, user['password']):
            access_token = create_token(user['email'], expires_in=15)
            refresh_token = create_token(user['email'], expires_in=1440)
            username = user['name']  # Replace with actual username field
            role = user['role']  # Replace with actual role field
            user_id = user['id']
            status=user['status']
            return jsonify({'access_token': access_token, 'refresh_token': refresh_token,'role':role,'username':username,'userid':user_id,'status':status}), 200
        else:
            print("Invalid password")  # Debug print
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        print("User not found")  # Debug print
        return jsonify({"error": "Invalid credentials"}), 401



@user_bp.route('/refresh', methods=['POST'])
def refresh_token():
    refresh_token = request.headers.get('Authorization')  # Expecting the token in the Authorization header
    if not refresh_token:
        return jsonify({'error': 'Authorization token missing'}), 401  # Handle missing token

    try:
        decoded = jwt.decode(refresh_token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
        new_access_token = create_token(decoded['data'], expires_in=15)
        return jsonify({'access_token': new_access_token}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Refresh token expired, please log in again'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid refresh token'}), 401


@user_bp.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    print("Received data:", data)

    email = data.get('email')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not email or not new_password or not confirm_password:
        return jsonify({"error": "Email, new password, and confirm password are required"}), 400

    if new_password != confirm_password:
        return jsonify({"error": "New password and confirm password do not match"}), 400

    try:
        user = fetch_one("SELECT * FROM users WHERE email = %s", (email,))
        if not user:
            return jsonify({"error": "User not found"}), 404

        hashed_new_password = pwd_context.hash(new_password)
        query = "UPDATE users SET password = %s, status = 'Active' WHERE email = %s"
        result = execute_query(query, (hashed_new_password, email))

        if result is not None:
            return jsonify({"message": "Password changed successfully!"}), 200
        else:
            return jsonify({"error": "Failed to change password"}), 500

    except Exception as e:
        print("Error in change_password:", str(e))
        return jsonify({"error": "An internal error occurred", "details": str(e)}), 500
# def fetch_all(query, params=None):
#     with db_connection.cursor(dictionary=True) as cursor:
#         cursor.execute(query, params)
#         result = cursor.fetchall()  # Fetch all rows for SELECT queries
#         return result

@user_bp.route('/users', methods=['GET'])
def get_all_users():
    try:
        # Fetch all users from the database
        query = "SELECT * FROM users"
        users = fetch_all(query)  # Use the fetch_all function

        if users:
            return jsonify({"users": users}), 200
        else:
            return jsonify({"users": []}), 200

    except Exception as e:
        print("Error in get_all_users:", str(e))
        return jsonify({"error": "Failed to retrieve users", "details": str(e)}), 500

@user_bp.route('/users/edit', methods=['PUT'])
def update_user():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    university = data.get('university')
    status = data.get('status')
    role = data.get('role')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Update the user information in the database
    query = """
        UPDATE users SET name = %s, university = %s, status = %s, role = %s
        WHERE email = %s
    """
    result = execute_query(query, (name, university, status, role, email))

    if result is not None:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update user"}), 500

@user_bp.route('/users/delete', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # SQL query to delete a user by email
    query = "DELETE FROM users WHERE email = %s"
    result = execute_query(query, (email,))

    if result is not None:
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"error": "Failed to delete user"}), 500
