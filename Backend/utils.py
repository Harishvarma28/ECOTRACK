from bcrypt import hashpw, checkpw, gensalt

def hash_password(password):
    return hashpw(password.encode('utf-8'), gensalt())

def verify_password(password, password_hash):
    return checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
