# Todo Application

This project is a full-stack Todo application built with a React frontend and a Django backend. The frontend uses Vite for development and build processes, and Tailwind CSS for styling. The backend is powered by Django REST Framework and uses JWT for authentication.

## Table of Contents

- [Todo Application](#todo-application)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Running the Application](#running-the-application)
    - [Frontend](#frontend-2)
    - [Database](#database)
    - [Backend](#backend-2)
    - [Docker](#docker)
  - [API Endpoints](#api-endpoints)
  - [Frontend](#frontend-3)
  - [Backend](#backend-3)

## Project Structure

The project is divided into two main directories: `frontend` and `backend`.

### Frontend

The frontend is a React application bootstrapped with Vite.


### Backend

The backend is a Django application with Django REST Framework.


## Setup and Installation

### Prerequisites

- Node.js and npm
- Python and pip
- MySQL

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```sh
    python manage.py migrate
    ```

## Running the Application

### Frontend

To start the frontend development server, run:
```sh
npm run dev
```



### Database

MySQL
```sh
mysql -u root -p
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE todo_db;
CREATE TABLE todos_todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);
```

### Backend

To start the backend server, run:
```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```


### Docker

To run the application using Docker, make sure you have Docker installed and then run:
```sh
docker-compose up --build
```
Able to Contain the app but its not able to run the app due to database connections.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/register/` - Register a new user
- `POST /api/login/` - Login and obtain a JWT token
- `GET /api/todos/` - Retrieve a list of todos (requires authentication)
- `POST /api/todos/` - Create a new todo (requires authentication)
- `GET /api/todos/:id/` - Retrieve a specific todo (requires authentication)
- `PUT /api/todos/:id/` - Update a specific todo (requires authentication)
- `DELETE /api/todos/:id/` - Delete a specific todo (requires authentication)

## Frontend

The frontend is built with React and uses Axios for making API requests. The main components are:

- `AuthForm.jsx` - Handles user authentication (login and registration)
- `TodoList.jsx` - Displays the list of todos and allows adding, updating, and deleting todos

## Backend

The backend is built with Django and Django REST Framework. Key files include:

- `models.py` - Defines the `Todo` model
- `serializers.py` - Defines the serializers for the `Todo` and `User` models
- `views.py` - Defines the API views for handling CRUD operations on todos and user authentication
- `urls.py` - Defines the URL routes for the API endpoints