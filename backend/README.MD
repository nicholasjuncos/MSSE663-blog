# MSSE663S8W1GroupProject Backend
Download and install Postman for easy testing.
Make sure you setup MongoDB with a database named "*recipe-book*"

## Commands to Run Development
```
cd backend/
npm install
npm run dev
```

### Postman User
##### Register
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/register" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. Under "Body", select "raw" and input json content with a username and password: e.g:
    ```json
    {
      "username": "testUser",
      "password": "Password"
    }
    ```
6. Click send. You're response should be a json object that includes username, id, password, and all used login tokens.
7. If you submit again with same username, response should state that Username already exists.

##### Login
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/login" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. Under "Body", select "raw" and input json existing username and password: e.g:
    ```json
    {
      "username": "testUser",
      "password": "Password"
    }
    ```
6. Click send. You're response should be a json object that includes username, id, password, and all used login tokens.
7. If you submit again, you will receive the same response except with a new token as well.
8. Failed logins will return error messages.

##### Test Login Tokens
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*GET*". Enter "http://localhost:3000/users/me" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive JSON object of user with username, id, password, and login tokens.

##### Test Logout for 1 token
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/logout" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive JSON object of user with username, id, password, and login tokens, EXCLUDING THE ONE YOU JUST ADDED TO AUTHORIZATION!


##### Test Logout for All tokens
1. Open up postman. Ensure that you have run "npm run dev" already.
2. Create new tab.
3. Select the Dropdown and select "*POST*". Enter "http://localhost:3000/users/logoutAll" as the url.
4. Under "Headers", add "Content-Type": "application/json".
5. You can leave body empty.
6. Click send. You're response should be a json object that states: "Not authorized to access these resources."
7. Copy one of the tokens from a previous User login response.
8. Click "Authorization", select "Bearer Token" as Type, and paste the previously copied token to the Token field.
9. Click send, should receive JSON object of user with username, id, password, and NO login tokens!
10. Any submissions to /logout, /logoutAll, and /me should now result in "Not authorized..." until login re-completed.
