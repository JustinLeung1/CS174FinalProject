# CS174 Final Project

## Pictures of the application
### Login
![Login](photos/login.png?raw=true"login.png")
### Login Fail
![Login Fail](photos/login-fail.png?raw=true"login-fail.png")
### Sign Up
![Sign up](photos/signup.png?raw=true"signup.png")
### Sign Up Fail
![Sign up Fail](photos/signup-fail.png?raw=true"signup-fail.png")
### Home Page
![Index](photos/index.png?raw=true"index.png")

---

## How to Run
1. Set up mySQL Server
    - Database name should be `CS174`
    - Run `Setup.sql` file
    - Config file is found in `services/config.js`
2. Install NPM and Node.js
3. CD into directory and run `npm i`
4. Run `npm start`
---

## Assignent Parameter and How I accomplished them
- User Authentication
    - This is done through mySQL server with the bCrypt node library which handles all our hashing and salting
- Password Management
- Sessions and Cookies
    - This is done through express sessions which allows us to keep track of certain things like our user name. We query the results with the saved email in our session
- Keeping track of tasks
    - Tasks are saved using a foreign key to the users table
    - We update the status of tables using a form for each task and a submit to post the correct route
    - Tasks' status are kept in the table as `0 = Not Started` || `1 = In progress` || `2 = Completed`    
---