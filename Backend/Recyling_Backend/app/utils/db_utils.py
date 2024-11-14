# app/utils/db_utils.py

import mysql.connector
from app.config import Config

def get_db_connection():
    connection = mysql.connector.connect(
        host=Config.DB_CONFIG['host'],
        user=Config.DB_CONFIG['user'],
        password=Config.DB_CONFIG['password'],
        database=Config.DB_CONFIG['database'],
        port=Config.DB_CONFIG['port']
    )
    return connection

def execute_query(query, params=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, params)
        
        # If it's an INSERT query, return the last inserted ID
        if query.strip().upper().startswith('INSERT'):
            connection.commit()
            return cursor.lastrowid
        
        # If it's a SELECT query, return all results
        elif query.strip().upper().startswith('SELECT'):
            result = cursor.fetchall()  # Fetch all rows from the result set
            return result
        
        # For DELETE or UPDATE queries, return a success indicator
        elif query.strip().upper().startswith(('DELETE', 'UPDATE')):
            connection.commit()
            return cursor.rowcount > 0  # Return True if rows were affected
        
        # For other types of queries (e.g., DROP, CREATE)
        connection.commit()
        return True
    
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return None
    finally:
        cursor.close()
        connection.close()


def fetch_one(query, params=None):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        return cursor.fetchone()
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return None
    finally:
        cursor.close()
        connection.close()
def fetch_all(query, params=None):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        return cursor.fetchall()  # Fetches all rows for SELECT queries
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return []
    finally:
        cursor.close()
        connection.close()