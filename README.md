# Node.js(22.11.0) API

A clean and scalable Node.js API project built using:

- Express.js
- Knex.js (SQL query builder + migrations)
- MySQL
- ESLint (Flat Config)
- MVC folder structure

---

# 1. **Setup & Install Dependencies**

# Install Node Packages for Dev
npm install

# Install NPM on Prod
npm install --omit=dev
or
npm install --production

# Set .env file
Environment variables (create `.env`):

# 2. **Setting Up ESLint (Flat Config) And Prettier**
This project uses the new ESLint **Flat Config** system.

# VS Code Setup
install eslint extention.

Open: Ctrl + Shift + P → Open User Settings (JSON).
Add:
"eslint.experimental.useFlatConfig": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}

# Install Prettier from VS-Code
Prettier – Code Formatter

# 3. **Generating a Migration**
npx knex migrate:make create_users_table

# 4. **Start API**
npm run start

# 5. **Generate API DOCs**
npm run api-docs

# 6. **Generate run and Rollback Knex**
npx knex migrate:latest

npx knex migrate:rollback

# Need to Implements (06-12-25)
1.) Implement Activity Log dynamically*
2.) Implement EventLog Dynamically**
3.) Need to push the docs changes on github but manditory to show the git hub changes******
4.) Implement error log middleware***
5.) Implement Rate limit for particular APIs****
6.) Implement sanitize middleware*****
