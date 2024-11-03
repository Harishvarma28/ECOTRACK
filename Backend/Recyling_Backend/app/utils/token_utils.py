import jwt
import datetime
import os

def create_token(data, expires_in):
    """Generates a JWT token with the given data and expiration."""
    try:
        # Check if SECRET_KEY is set
        secret_key = os.getenv('SECRET_KEY')
        if not secret_key:
            raise ValueError("Secret key is not set in environment variables.")
        
        # Create the token payload
        payload = {
            'data': data,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=expires_in),
            'iat': datetime.datetime.now(datetime.timezone.utc)  # Optional: issued at time
        }
        
        # Encode the token
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token
    except Exception as e:
        print(f"Error creating token: {str(e)}")
        return None  # Or raise an exception based on your error handling strategy
