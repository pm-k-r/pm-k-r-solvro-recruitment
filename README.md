## ⌛ About this branch

Welcome to the `after-deadline` branch of my repository.<br>
Refer to the README in the `main` branch to learn why this exists.<br>
The commits with the two modifications I mentioned there are marked with the following tags:<br>
*Added the missing endpoints* - **v1-fully-functional**<br>
*Filtering cocktails with multiple ingredients at once* - *not yet implemented*

## 🪄 Features

- ✔️ All the required entities, the database gets configured correctly (to my knowledge)
- ✔️ Creating, reading, updating, and deleting cocktails
- ✔️ Listing cocktails with pagination (`?page=[int]&limit=[int]`) and sorting (`?sort=[property]`), filtering (`?categoryId=[id]&ingredientId=[id]&hasAlcohol=[yes|no|maybe]`), and sort order (`?order=[asc|desc]`)
- ✔️ The cocktails' GET endpoints do correctly display the linked ingredients, the entity and response DTO are implemented
- ✅ **Endpoints for adding ingredients to cocktails, reading, updating, and removing them**
- ✔️ Full CRUD for ingredients (with paginated GET /ingredients)
- ✔️ Full CRUD for categories
- ✔️ Input validation in all requests bodies and query parameters
- ✔️ Almost fully REST compliant:
    - ✔️ The server stores no session data (statelessness)
    - ✔️ URIs represent the resources, not actions
    - ✔️ Usage of GET, POST, PATCH, and DELETE requests
    - ✔️ Manipulation through representations
    - ✔️ Self-descriptive messages (to my understanding)
    - ✔️ HATEOAS - responses are in JSON+HAL with `_links` and `_embedded` (scroll down for an example)
    - ✖️ The responses do NOT tell the client whether they are cacheable (I forgot)
- ✔️ Database diagram (scroll down)
- ➕ I tried to do everything as it should be done in NestJS and avoid antipatterns (I hope I succeeded)
- ➕ The code is not a total mess (hopefully)
- ➖ No users and authentication
- ➖ No automatic tests
- ➖ No generated documentation

## ⚙️ Running

Before running this project, you must set the required environment variables.<br>
Copy `.env.example`, rename to `.env`, modify the values to fit your environment and preferences.<br>
The project relies on access to a PostgreSQL database. See the next section.<br>
Running is nothing unusual:
```shell
npm install
npm run start
```

## 🐋 docker-compose.yml

For convenience, this repository includes a Docker Compose file that spins up a PostgreSQL instance.<br>
The included setup variables is compatible with the ones in `.env.example`.

## 💾 Database diagram

<img src="readme_resources/pm-k-r-database-diagram.png" alt="Database diagram">

ℹ️ *While the database tables and columns are formatted in snake_case (PostgreSQL convention), all representations in the API are formatted in camelCase.*

## 🌳 API endpoints

- GET /cocktails • Query parameters: `page=[int]`, `limit=[int]`, `sort=[property]`, `order=[asc|desc]`, `categoryId=[id]`, `ingredientId=[id]`, `hasAlcohol=[yes|no|maybe]`
- POST /cocktails
- GET /cocktails/\[id\]
- PATCH /cocktails/\[id\]
- DELETE /cocktails/\[id\]
- **GET /cocktails/\[id\]/ingredients**
- **POST /cocktails/\[id\]/ingredients**
- **GET /cocktails/\[id\]/ingredients/\[id\]**
- **PATCH /cocktails/\[id\]/ingredients/\[id\]**
- **DELETE /cocktails/\[id\]/ingredients/\[id\]**
- GET /categories
- POST /categories
- GET /categories/\[id\]
- PATCH /categories/\[id\]
- DELETE /categories/\[id\]
- GET /ingredients • Query parameters: `page=[int]`, `limit=[int]`, `isAlcohol=[yes|no|maybe]`
- POST /ingredients
- GET /ingredients/\[id\]
- PATCH /ingredients/\[id\]
- DELETE /ingredients/\[id\]

### Example API response:

<img src="readme_resources/cocktails-findone-endpoint-example.png">

## 🧠 Regarding AI

100% of the code was written by me. I only used AI for assistance in research of the framework and libraries.