const config  = require('./model/config'),
      restify = require('restify'),
      corsMiddleware = require('restify-cors-middleware'),
      jwt = require('jsonwebtoken'),
      fs = require('fs');

/* cross origin http */
const cors = corsMiddleware( { origins: ['http://127.0.0.1:5500'] } );
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url     : config.hostname
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);
server.use((req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});


const users = {
        'u4bi' : 'token-asccesskey-u4bi',
        'rev' : 'token-asccesskey-rev',
        'admin123' : 'token-asccesskey-admin123'
      },
      secret = config.secret;


server.post('/user', (req, res) => {

    const { user, accesskey } = req.body;


    console.log('\nsecret:', secret, '\nuser:', user, '\naccesskey:', accesskey, '\nisAccess:', user && accesskey && users[user] === accesskey);


    if(user && accesskey && users[user] === accesskey) {
        // access
        jwt.sign(
            { user : user }, // payload
            secret,          // 서명
            {                // options
                algorithm: 'HS256',     /* default HS256 */
                expiresIn : 60,         /* 만료시간 exam 60, '2 days', '10h', '7d' */
                notBefore : 30,         /* 활성시작 시간 exam 60, '2 days', '10h', '7d' */
    
            },
            (err, token) => res.send({  isAccess : true, token : token })
        );
        //
    } else {
        res.send({ isAccess : false });
    }

});

server.listen(7778, () => console.log(server.name, server.url));