from flask import Blueprint, request, jsonify
from app.utils.db_utils import execute_query, fetch_one
from app.utils.email_utils import send_email
from passlib.context import CryptContext
import random

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

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Fetch user from database
    user = fetch_one("SELECT * FROM users WHERE email = %s", (email,))
    if user:
        if pwd_context.verify(password, user['password']):
            return jsonify({"message": "Login successful", "user": user}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        return jsonify({"error": "User not found"}), 404

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