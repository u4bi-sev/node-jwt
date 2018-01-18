## node jwt

### server
```
npm install
npm start
```

### client(CORS)
```
http://127.0.0.1:5500/client/index.html
```

### API
| URL                       | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /user                     | POST   | token sign                |
| /token                    | POST   | verify token              |

> requirements
> * jsonwebtoken
> * restify
> * restify-cors-middleware
> * axios (client)