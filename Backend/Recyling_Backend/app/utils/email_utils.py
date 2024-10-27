import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, body):
    from_email = "skinthiyaz9581@gmail.com"  # Replace with your email
    from_password = "nzod lzxg kzar eyog"  # Replace with your app password if using 2FA

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Enable security
            server.login(from_email, from_password)  # Log in to your email account
            server.send_message(msg)  # Send the email
            print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
    return True
