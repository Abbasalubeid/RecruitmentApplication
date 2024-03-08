## Project Description

This project was developed as part of a software architecture course. The primary goal was to facilitate the recruitment process for an amusement park that was expected to attract approximately 15,000 applications within two weeks. The project involved working with an existing database, which lacked data that needed addressing to meet the new system's requirements.

## Tech Stack

The application is built using [TypeScript](https://www.typescriptlang.org) and [SvelteKit](https://kit.svelte.dev) with a [PostgreSQL](https://www.postgresql.org) database. For more details on the tools, architecture type and more, visit our [GitHub Wiki](https://github.com/Abbasalubeid/RecruitmentApplication/wiki).

## Key Features

- **Data Migration**: Migration of existing data to the new system by handling of lacking data and encrypting existing passwords. In cases of lacking data, users are prompted to provide this data during their next login.
- **Secure User Authentication**: Utilizes JWT for session management and bcrypt for hashing passwords, ensuring secure access for both applicants and recruiters.
- **Authorization**: Access control logic and route protection are implemented using SvelteKit's [handle hook](https://kit.svelte.dev/docs/hooks) in [hooks.server](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/hooks.server.ts) to ensure appropriate content based on user roles.
- **Application Submission**: Applicants can submit detailed applications through an intuitive multi-step form.
- **Application Management**: Recruiters can efficiently manage applications, with functionalities to view, sort, and update application statuses.
- **Multi-language Support**: The system supports multiple languages and allows for easy addition of new languages through automated localisation scripts.

## Folder Structure following the Model-View-Presenter pattern

```
src
├── lib # Shared libraries, utilities, configurations
│ ├── locales # Localization resources
│ ├── metadata # Route metadata for authorization
│ ├── server/ # Server-side utilities, including singleton Prisma client for DB interactions
│ ├── stores # Svelte stores for state management, includes a user store for managing user state
│ ├── util # Contains utility functions, global validator and error handler.
├── models # Model layer containing business logic
├── presenters # Presenter layer with components fetching data, using models, and rendering views
└── views # View layer with reusable UI components
└── routes # Application routes and API endpoints
│ ├── api # RESTful API routes to interact with the database
```

## Usage

Before you begin, ensure you have [Node.js](https://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org)

### 1. Clone the Project

Begin by cloning the repository and navigating into the project directory:

```bash
git clone https://github.com/Abbasalubeid/RecruitmentApplication.git
cd RecruitmentApplication
```

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 3. Database Initialization

Open the PostgreSQL command line tool and create a database

```bash

CREATE DATABASE your_database_name;
```

### 4. Environment Setup

Create a `.env` file based on the [example.env](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/example.env) provided in this repository:

```bash
cp example.env .env
```

Make sure to change the .env file to match your local database.

### 5. Prisma Integration

Synchronize your database schema with Prisma and generate the client by running:

```bash
npx prisma db push
npx prisma generate
```

### 6. Start the Application

Launch the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

## Scripts

The [/scripts](https://github.com/Abbasalubeid/RecruitmentApplication/tree/main/scripts) directory contains utility scripts used in the development process:

- [token-generator.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/token-generator.py): Generates unique tokens for users which is cruical for the data migration process.
- [email-token.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/email-token.py): Sends emails to every applicant with a link to the **/migration** page with their unique migration token.
- [add-new-lang.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/add-new-lang.py): Simplifies the process of adding new languages to the application. Running this script automatically updates the locale configurations, making the new desired language immediately available in the app.
- [translate-new-competence-names.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/translate-new-competence-names.py): Automates the translation of new competence names from the databse into the current supported languages using Google Translate.
- [encrypt-passwords.js](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/encrypt-passwords.js): Encrypts existing plaintext passwords in the database, ensuring users with pre-existing accounts can log in after the implementation of the encryption feature.

To run the Python scripts, ensure you have the necessary dependencies installed:

```bash
pip install googletrans==3.1.0a0 psycopg2==2.9.9 python-dotenv==1.0.1
```

## Localization with `t` Function

The `t` function from `svelte-i18n` is used to display localized text in the app. To use it properly, follow these steps:

1. **Import `t`** in your Svelte component:

   ```javascript
   import { t } from 'svelte-i18n';
   ```

2. **Use `t`** in your markup to refer to localized strings:
   ```svelte
   <p>{$t('key')}</p>
   ```
   Replace `'key'` with the corresponding key in your JSON language files.

### Adding New Entries

1. Add a new key-value pair in `src/lib/locales/en.json`:
   ```json
   "welcome": "Welcome"
   ```
2. For other languages (e.g., `sv.json`), add the translated entry:
   ```json
   "welcome": "Välkommen"
   ```
3. Use the new key in your components:
   ```svelte
   <p>{$t('welcome')}</p>
   ```

## Adding a New Language

You can add new languages either manually or using the provided script.

#### Manually:

1. **Create Language File**: In `src/lib/locales`, create a new JSON file for the language (e.g., `fr.json`).

2. **Add Translations**: Populate this file with key-value pairs for translations, use [en.json](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/lib/locales/en.json) as a reference for the keys that need to be translated.

3. **Update `localeConfig`**: In `src/lib/locales/localeConfig.ts`, import and add your new language:

   ```javascript
   import en from './en.json';
   import fr from './fr.json';

   export const locales = {
   	en: en,
   	fr: fr
   };
   ```

4. The new language should now be usable as the [+layout.ts](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/routes/%2Blayout.ts) file load the locales dynamically from `src/lib/locales/`.

#### Using the Script:

Run the [add-new-lang.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/add-new-lang.py) script to automate the process of adding a new language. This script will:

1. Copy all keys from [en.json](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/lib/locales/en.json).
2. Translate their values into the new language.
3. Create a new language file in the `src/lib/locales` directory.
4. Update `localeConfig.ts` to include the new language.

To use the script, execute the following command:

```bash
python scripts/add-new-lang.py
```

After running the command, you will be prompted to enter the target language code (e.g., 'fr' for French).

**Note**

When using the [add-new-lang.py](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/scripts/add-new-lang.py) script, ensure the [en.json](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/lib/locales/en.json) file is updated with all necessary keys, as the script generates the new language file based on [en.json](https://github.com/Abbasalubeid/RecruitmentApplication/blob/main/src/lib/locales/en.json)'s key-value pairs.
