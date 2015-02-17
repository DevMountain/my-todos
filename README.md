# my-todos
A "full stack" review project

## Objective
This repo is meant to help you "connect the dots" between back end, server side development with Mongo/mongoose and front end Angular development.

### Step 1: Model your Data
Clone the project, and check out the dummy data that populates the bare bones Angular app. This should give you an idea of what data we need to model on the server side.

Create the following models:

#### User
Our app will be a simple todo list for an authenticated user. We're going to practice authenticating with passport-local. We'll need to have a User model that represents a single user in our app. 

#### Todo
This represents a single todo item. It should have some sort of title or description as well as a status. You might also want to add in some timestamp fields for tracking *when* it was completed.

### Step 2: Create API
Let's create the server-side code that will power our todo app. 

We'll want some basic CRUD routes for our app:

#### /api/todos
* **GET** Retrieve a list of todos
* **POST** Add a new todo

#### /api/todos/:id
* **PUT** Modify an existing todo

#### /api/profile
* **GET** Get the current user's profile
