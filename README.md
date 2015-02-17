# my-todos
A "full stack" review project

## Objective
This repo is meant to help you "connect the dots" between back end, server side development with Mongo/mongoose and front end Angular development.

### Step 1: Model your Data
Clone the project, and check out the dummy data that populates the bare bones Angular app. This should give you an idea of what data we need to model on the server side.

Create the following models:

#### User
Our app will be a simple todo list for an authenticated user. We'll need to have a User model that represents a single user in our app. This model will need fields like email, password, and any other fields that could make our users unique.

* Use a `.pre('save'` option to encrypt user passwords prior to saving using bcrypt.
* Create a `comparePassword` schema method that will allow for easy comparison of user-supplied password attempts.

#### Todo
This represents a single todo item. It should have some sort of title or description as well as a status. You could also want to add in some timestamp fields for tracking *when* it was completed. Also, make sure the schema includes a reference to the `User` model. We *could* embed todos as a field in `User`, but then it makes the API for getting todos, PUTting todos all linked to the user. Separating the two make sense in the context of what we want to do. Todos are not just a subfield or property of `User`, they are a model/collection all their own, so let's treat them as such.

### Step 2: Create Auth logic
Because no one can really get todo items without a user context (we don't want a global todo list), we need to write the auth logic. We could do this a few different ways, but let's use Passport.

#### Install and configure passport-local
* Make sure you implement `serializeUser` and `deserializeUser`, even if you're using the basic defaults of those methods.
* Configure a LocalStrategy in your code. Keep in mind, if you used `email` as your User field that the user will provide in order to log in, you'll need to tell LocalStrategy that your `usernameField` is actually `email`, like so:

```javascript
passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, 
	function(username, password, done) {
		//find user here
	});
}));
```

* As the main configuration for LocalStrategy, you'll need to do a User lookup and return `done`. Make sure you 1) find the user by email, and 2) compare the password provided with the stored hashed password. If you have a valid user after these checks, pass it into the `done` function.
* Create an `/api/auth` endpoint that will simply use your local passport implementation. Have it return a 200 if it succeeds.
* Create an `/api/register` endpoint that saves a new user identified by email and password into the db. Make sure you don't duplicate users.

### Step 2: Create the API
Let's create the server-side code that will power our todo app. 

We'll want some basic CRUD routes for our app:

**Note: make sure the user is authenticated when you write these endpoints. You might write an `isAuthed` middleware function to make this easier.**

#### /api/todos
* **GET** Retrieve a list of todos for the current user
* **POST** Add a new todo for the current user

#### /api/todos/:id
* **PUT** Modify a todo item

#### /api/profile
* **GET** Get the current user's profile

Test all your endpoints with Postman thoroughly before moving on to the next step.

### Step 3: Bring it all together

With our API functioning, we just need to connect our front end to our back end.

#### Complete the services.
Right now, the todo and profile services are just serving dummy data. Make sure each service call is pointing to the corresponding API endpoint.

#### Wire up the controllers.
Have each controller, where applicable, call the Services so that the data being fetched, updated, and added all work as expected.

### Go Beyond
Notice that our app doesn't really work very well when we're logged out. We just get 403 codes under the hood and don't do anything about it. We can use a cool feature of angular called HTTP interceptors to globally catch all "unauthed" messages and subsequently redirect the user to the login page. Something like this should do the trick:

```javascript
//in your app.js config, after the routing part
$httpProvider.interceptors.push(function($location) {
	return {
		responseError: function(response) {
			if (response.status === 403) {
				$location.path('/auth');
			}
		}
	}
});
```

* Also, tackle making the User Profile page editable, so a user can edit his/her information.
* How could you make the navigation links customize themselves based on if the user is logged in or not? For example, instead of saying "Profile" it could say "Log in" if the user isn't currently logged in. 
