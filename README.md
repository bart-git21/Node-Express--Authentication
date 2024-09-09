# Authentication

## Usage:

### localhost:7000
```
$ npm run start
```
#### Run with nodemon:
```
$ npm run dev
```


## Simplified http requests and response:
```
```
### POST /authentication
### Sign in
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               | AT = fetch("/authentication", body);         |
| RTs.push();                                   |                                              |
| res.cookie(RT);                               |                                              |
| res.json(AT);                                 |                                              |
|                                               | localStorage.setItem(AT);                    |
### GET /authentication
#### get new refresh token
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               | AT = fetch("/authentication", {credentials}) |
| RTs.includes(RT)                              |                                              |
| jwt.verify(req.cookie.RT, SECRET);            |                                              |
| res.json(AT);                                 |                                              |
|                                               | localStorage.setItem(AT);                    |
### DELETE /authentication
#### log out
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               |  fetch("/authentication", {credentials})     |
| RTs = RTs.filter(e => e !== req.cookie.RT);   |                                              |
| res.clearCookie(RT);                          |                                              |
|                                               | localStorage.removeItem(AT)                  |

### POST /users
#### create the new user
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               |  fetch("/protected", {Authorization})        |
| AT = req.headers.authorization.split(" ")[1]; |                                              |
| jwt.verify(AT, SECRET);                       |                                              |
### GET /users
#### get authenticated user
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               |  fetch("/protected", {Authorization})        |
| AT = req.headers.authorization.split(" ")[1]; |                                              |
| jwt.verify(AT, SECRET);                       |                                              |

### GET /admin
#### example of page with admin permissions
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               |  fetch("/protected", {Authorization})        |
| AT = req.headers.authorization.split(" ")[1]; |                                              |
| jwt.verify(AT, SECRET);                       |                                              |
### GET /moderator
#### example of page with admin or moderator permissions
| Server                                        | Client                                       |
|-----------------------------------------------|----------------------------------------------|
|                                               |  fetch("/protected", {Authorization})        |
| AT = req.headers.authorization.split(" ")[1]; |                                              |
| jwt.verify(AT, SECRET);                       |                                              |


