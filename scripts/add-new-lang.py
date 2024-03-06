from googletrans import Translator, LANGUAGES
import json
import os

def translate_values(source_file, target_file, target_language):
    translator = Translator()

    # Load the source locale file
    with open(source_file, 'r', encoding='utf-8') as file:
        source_locale = json.load(file)

    translated_locale = {}

    # Iterate over the items in the source locale and translate the values
    for key, value in source_locale.items():
        # Translate the value and keep the key the same
        translated_text = translator.translate(value, dest=target_language).text
        translated_locale[key] = translated_text

    # Save the translated content to the target locale file
    with open(target_file, 'w', encoding='utf-8') as file:
        json.dump(translated_locale, file, ensure_ascii=False, indent=2)

    print(f"Translation completed, new file created: {target_file}")

def main():
    target_language = input("Enter the target language code (e.g., 'fr' for French): ").lower()

    if target_language not in LANGUAGES:
        print(f"Invalid language code: {target_language}.")
        return

    source_locale_file = 'src/lib/locales/en.json'
    target_locale_file = f'src/lib/locales/{target_language}.json'

    # Translate the values from the source file and save to the target file
    translate_values(source_locale_file, target_locale_file, target_language)

    # Update the locale configuration
    locale_config_file = 'src/lib/locales/localeConfig.ts'
    update_locale_config(target_language, locale_config_file)

def update_locale_config(target_language, locale_config_file):
    # Prepare the import line and the entry for the new locale
    new_locale_import_line = f"import {target_language} from './{target_language}.json';\n"
    new_locale_entry = f"  {target_language}: {target_language},\n"

    # Read the current content of the locale config file
    with open(locale_config_file, 'r', encoding='utf-8') as file:
        content = file.readlines()

    # Check if the new locale is already in the config file
    if new_locale_import_line not in content:
        # Insert the import line at the beginning of the file
        content.insert(1, new_locale_import_line)

        # Find the line where locales are exported and add the new entry
        for i, line in enumerate(content):
            if line.strip().startswith("export const locales = {"):
                content.insert(i + 1, new_locale_entry)
                break

        # Write the updated content back to the config file
        with open(locale_config_file, 'w', encoding='utf-8') as file:
            file.writelines(content)

        print(f"Locale configuration updated: {locale_config_file}")

if __name__ == "__main__":
    main()
