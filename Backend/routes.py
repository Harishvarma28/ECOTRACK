from flask import Blueprint, request, jsonify
from db import mysql  # Import mysql from db.py
from utils import hash_password, verify_password

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not username or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    # Check if the email already exists
    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute("SELECT email FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({'message': 'Email already registered'}), 400
            
            # Hash the password
            password_hash = hash_password(password)

            cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                           (username, email, password_hash))
            mysql.connection.commit()
            return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Error registering user', 'error': str(e)}), 500

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
            result = cursor.fetchone()

        if result and verify_password(password, result[0]):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'message': 'Error during login', 'error': str(e)}), 500
