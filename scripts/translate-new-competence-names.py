import json
import os
import psycopg2
from googletrans import Translator, LANGCODES
from dotenv import load_dotenv

def fetch_competence_names(database_url):
    """
    Connects to the database using the provided URL, executes a query to fetch all competence names,
    and returns them as a list.
    """
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        cursor.execute("SELECT name FROM competence;")
        competence_names = cursor.fetchall()  # Fetch all rows of the query result
        return [name[0] for name in competence_names]  # Extract and return competence names from fetched rows
    except Exception as error:
        print(f"Error while fetching competences from PostgreSQL: {error}")
    finally:
        cursor.close()
        connection.close()

def translate_text(text, dest_language):
    """
    Translates the provided text into the specified destination language using Google Translate.
    """
    translator = Translator()
    translation = translator.translate(text, dest=dest_language)
    return translation.text

def update_language_files(competence_names, locales_path='src/lib/locales/'):
    """
    Updates all JSON language files in the locales directory by adding any missing competence names
    and their translations.
    """
    for filename in os.listdir(locales_path):  # Iterate over all files in the locales directory
        if filename.endswith('.json'):
            lang_code = filename.split('.')[0]  # Extract language code from the filename
            if lang_code in LANGCODES.values():  # Check if the language code is valid
                filepath = os.path.join(locales_path, filename)  # Construct the full file path
                with open(filepath, 'r', encoding='utf-8') as file:
                    locale_data = json.load(file)

                updated = False
                for name in competence_names:
                    if name not in locale_data:  # Check if the competence name is missing in the JSON file
                        translated_name = translate_text(name, lang_code)
                        locale_data[name] = translated_name
                        updated = True  # Set the updated flag to True

                if updated:  # Check if the file was updated
                    with open(filepath, 'w', encoding='utf-8') as file:
                        json.dump(locale_data, file, ensure_ascii=False, indent=2)  # Write the updated locale data to the file
                        print(f"Updated '{filename}' with new competences.")
                else:
                     print(f"No updates required for '{filename}'. The file is already up to date.")

def main(database_url):
    """
    The main function that orchestrates fetching competence names from the database and updating language files.
    """
    competence_names = fetch_competence_names(database_url)
    update_language_files(competence_names)

if __name__ == "__main__":
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL:
        main(DATABASE_URL)
    else:
        print("DATABASE_URL is not set in .env file.")
