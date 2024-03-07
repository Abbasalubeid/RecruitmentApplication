import sys
import psycopg2
import random
import string

def generate_random_string(length=16):
    """Generate a random string consisting of upper case-, lower case letters and numbers.

    :param length: Length of generated string (default 16 characters).
    :return: The generated string.
    """
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def main(database_url):
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        
        cursor.execute("SELECT person_id FROM person;")
        
        person_ids = cursor.fetchall()
        
        for person_id in person_ids:
            person_id = person_id[0]
            while True:
                token = generate_random_string()
                
                try:
                    cursor.execute("INSERT INTO migration_token (person_id, token) VALUES (%s, %s);", (person_id, token))
                    connection.commit()
                    print(f"Inserted person_id: {person_id}, token: {token}")
                    break
                except psycopg2.IntegrityError as e:
                    connection.rollback()
                    if "duplicate key value violates unique constraint" in str(e):
                        continue
                    else:
                        raise e
        
        cursor.close()
        connection.close()
        
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python program.py <database_url>")
        sys.exit(1)
    main(sys.argv[1])
