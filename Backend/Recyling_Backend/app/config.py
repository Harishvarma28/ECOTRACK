# app/config.py

from os import getenv
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

class Config:
    DB_CONFIG = {
        'host': getenv('DB_HOST'),
        'user': getenv('DB_USER'),
        'password': getenv('DB_PASSWORD'),
        'database': getenv('DB_NAME'),
        'port': getenv('DB_PORT', 3306),
    }
