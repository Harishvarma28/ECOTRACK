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
        
        # If it's a DELETE or UPDATE query, check how many rows are affected
        if query.strip().upper().startswith(('DELETE', 'UPDATE')):
            connection.commit()
            print(f"{cursor.rowcount} rows affected.")  # Debug print
            return cursor.rowcount > 0  # Return True if rows were affected
        
        # If it's an INSERT query
        if query.strip().upper().startswith('INSERT'):
            connection.commit()
            return cursor.lastrowid
        
        # If it's a SELECT query
        elif query.strip().upper().startswith('SELECT'):
            result = cursor.fetchall()
            return result
        
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



