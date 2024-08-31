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


## Conclusion:
```
```
### /login
| Server                                        | Client                                                           |
|-----------------------------------------------|------------------------------------------------------------------|
|                                               | AT = fetch("/login", body:{});                                   |
| RTs.push();                                   |                                                                  |
| res.cookie(RT);                               |                                                                  |
| res.json(AT);                                 |                                                                  |
|                                               | localStorage.setItem(AT);                                        |
### /refresh
| Server                                        | Client                                                           |
|-----------------------------------------------|------------------------------------------------------------------|
|                                               |  AT = fetch("/refresh", {credentials: "include"});               |
| RTs.includes(RT)                              |                                                                  |
| jwt.verify(req.cookie.RT, SECRET);            |                                                                  |
| res.json(AT);                                 |                                                                  |
|                                               | localStorage.setItem(AT);                                        |
### /logout
| Server                                        | Client                                                           |
|-----------------------------------------------|------------------------------------------------------------------|
|                                               |  fetch("/logout", {credentials: "include"})                      |
| RTs = RTs.filter(e => e !== req.cookie.RT);   |                                                                  |
| res.clearCookie(RT);                          |                                                                  |
|                                               | localStorage.removeItem(AT)                                      |
### /protected
| Server                                        | Client                                                           |
|-----------------------------------------------|------------------------------------------------------------------|
|                                               |  fetch("/protected", {headers: {Authorization: 'Bearer ${AT}'}}) |
| AT = req.headers.authorization.split(" ")[1]; |                                                                  |
| jwt.verify(AT, SECRET);                       |                                                                  |


