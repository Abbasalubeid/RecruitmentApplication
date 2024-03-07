import sys
import psycopg2
import random
import string
import smtplib
from email.mime.text import MIMEText

def send_email(receiver_email, token, domain):
    """Send an email to the specified email address with the given token.

    :param receiver_email: Email address to send the email to.
    :param token: Token to include in the email.
    """
    sender_email = 'your_email@example.com'  # Update with your email address
    smtp_server = 'smtp.example.com'  # Update with your SMTP server address
    domain_name = domain.split('.')[0]
    subject = f'Finish setting up your account for {domain_name}'
    body = f'Please follow this link to finish setting up your account: {domain}/migration?token={token}'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    with smtplib.SMTP(smtp_server) as server:
        server.sendmail(sender_email, receiver_email, msg.as_string())

def main(database_url, domain):
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        
        cursor.execute("SELECT p.email, m.token FROM person AS p JOIN migration_token AS m ON p.person_id = m.person_id WHERE p.role_id = 2;")
        
        rows = cursor.fetchall()
        
        for row in rows:
            email, token = row
            #send_email(email, token) <--- Uncomment for live version
            print(f"Email sent to {email}: {domain}/migration?token={token}")
        
        cursor.close()
        connection.close()
        
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python program.py <database_url> <domain>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
