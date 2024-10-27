# app/models/user.py

from app.utils.db_utils import fetch_data

class User:
    @staticmethod
    def get_all_users():
        query = "SELECT * FROM users"
        return fetch_data(query)
