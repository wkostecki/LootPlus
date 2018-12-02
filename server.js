const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sqlite = require('sqlite');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser'); 
const uniqid = require('uniqid');
const lootboxFile = require('./static_files/scripts/lootbox.js');  

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(__dirname + '/static_files'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const saltRounds = 10;
const dbPromise = sqlite.open('./database.db'); 

/* CREATES TABLES IF THEY DON'T EXIST
dbPromise.then(async (db) => {
    await db.run('CREATE TABLE IF NOT EXISTS forum ( id  PRIMARY KEY, author STRING, message STRING );');
    await db.run('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, email STRING, passwordHash STRING );');
    await db.run('CREATE TABLE IF NOT EXISTS sessions ( id INTEGER PRIMARY KEY, userid INTEGER, sessionToken STRING );');
});*/

const authorize = async (req, res, next) => {
    //const { sessionToken } = req.cookies;
    const db = await dbPromise;
    const sessionToken = req.cookies.sessionToken;
    if(!sessionToken) {
        next();
        return;
    };
    const user = await db.get('SELECT users.username, users.loadSave, users.id as id FROM sessions LEFT JOIN users ON sessions.userid = users.id WHERE sessionToken=?', sessionToken);
    if(!user) {
        next();
        return;
    };
    req.user = user;
    next();
    return;
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('please log in');
        return;
    }
    next();
};

app.use(authorize);

app.get('/login', async (req, res) => {
    const user = req.user; 
    res.render('index', { user, typeForm: 'login' });
});

app.get('/register', async (req, res) => {
    const user = req.user; 
    res.render('index', { user, typeForm: 'register' });
});

app.get('/', (req, res) => {
    const user = req.user;
    if (user)
    {
        res.render('index', { user });
        return; 
    }
    res.render('index'); 
});

app.get('/game', (req, res) => {
    const user = req.user;
    res.render('game', { user });
    console.log("Game Page Accessed");  
});

app.get('/about', (req, res) => { 
    const user = req.user;
    res.render('about', { user }); 
});

app.get('/news', (req, res) => { 
    const user = req.user;
    res.render('news', { user }); 
});

app.get('/team', (req, res) => { 
    const user = req.user;
    res.render('team', { user });  
});

app.get('/messageboard', async (req, res) => { 
    const user = req.user;
    const db = await dbPromise;
    const posts = await db.all('SELECT users.username, forum.id, forum.likedBy, forum.likes, forum.content, forum.time FROM forum JOIN users ON forum.userid=users.id ORDER BY forum.time DESC;');
    res.render('messageboard', { user, posts });
});

app.get('/swag', (req, res) => {
    const user = req.user;
    res.render('swag', { user });
});

app.post('/post', requireAuth, async (req, res) => {
    const db = await dbPromise;
    const uniquePostID = await uniqid();
    var messageTime = Math.round((new Date()).getTime() / 1000); 
    await db.run('INSERT INTO forum (id, userid, likes, likedBy, content, time) VALUES (?, ?, ?, ?, ?, ?)', uniquePostID, req.user.id, 0, "nolikes", req.body.message, messageTime);
    res.redirect('/messageboard');
});

app.post('/register', async (req, res) => {
    const db = await dbPromise;
    const userEmail = await db.get('SELECT * FROM users WHERE email=?', req.body.email);
    if (userEmail) {
        res.render('index', { registerError: 'Account Already Exists', typeForm: 'register'});
        console.log('\nemail taken\n'); 
        return;
    }
    const userName = await db.get('SELECT * FROM users WHERE username=?', req.body.username);
    if (userName) {
        res.render('index', { registerError: 'Account Already Exists', typeForm: 'register'});
        console.log('\nusername taken\n'); 
        return;
    }
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    const uniqueID = await uniqid(); 
    
    await db.run('INSERT INTO users (id, email, username, passwordHash)  VALUES (?, ?, ?, ?);', uniqueID, req.body.email, req.body.username, passwordHash);
    
    const newUser = await db.get('SELECT id, username FROM users WHERE username=?', req.body.username);
    const sessionToken = uuidv4();
    const uniqueSessionID = await uniqid(); 
    
    await db.run('INSERT INTO sessions (id, userid, sessionToken) VALUES (?, ?, ?);', uniqueSessionID, newUser.id, sessionToken);

    res.cookie('sessionToken', sessionToken);
    console.log('\nAccount Registered\n');
    res.redirect('/');
});

app.post('/login', async (req, res) => { 
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE username=?', req.body.username);
    if (!user) {  
        //console.log("\nincorrect username\n");
        res.render('index', { loginError: 'Wrong Username and Password', typeForm: 'login'});
        return;
    }

    const passwordMatches = await bcrypt.compare(req.body.password, user.passwordHash);

    if (passwordMatches) {
        const sessionToken = uuidv4();
        const uniqueSessionID = await uniqid(); 
        await db.run('INSERT INTO sessions (id, userid, sessionToken) VALUES (?, ?, ?);', uniqueSessionID, user.id, sessionToken);  
        res.cookie('sessionToken', sessionToken);
        console.log("\nSigned In\n"); 
        res.redirect('/'); 
    } else {
        //console.log("\nincorrect password\n");
        res.render('index', { loginError: 'Wrong Username and Password', typeForm: 'login'});   
    }
}); 

app.get('/like/:postid', requireAuth, async (req, res) => {
    const db = await dbPromise;
    const likedPostID = req.params.postid;
    const user = req.user;
    let post = await db.all('SELECT * FROM forum WHERE id=?', likedPostID);
    console.log(post);
    let likedBy = post[0].likedBy;
    if (likedBy == "nolikes")
    {            
        post[0].likes += 1;
        await db.run('UPDATE forum SET likes=? WHERE id=?', post[0].likes, likedPostID);
        likedBy = user.id;
        await db.run('UPDATE forum SET likedBy=? WHERE id=?', likedBy, likedPostID);
    } 
    else
    {
        var found = 0; 
        var likedByArray = likedBy.split('|||');
        for (var i = 0; i < likedByArray.length; i++)
        {
            if (user.id == likedByArray[i])
            {
                found = 1; 
            }
        }

        if (found == 0)
        {
            post[0].likes += 1;
            await db.run('UPDATE forum SET likes=? WHERE id=?', post[0].likes, likedPostID);
            likedBy += "|||" + user.id;
            await db.run('UPDATE forum SET likedBy=? WHERE id=?', likedBy, likedPostID);
        }
    } 
    res.render('messageboard');
});

app.get('/game/:saveString', requireAuth, async (req, res) => {
    const db = await dbPromise; 
    const saveString = req.params.saveString;
    const user = req.user; 
    console.log("User ID: " + user.id); 
    console.log("Save String " + saveString);
    if (user) {
        console.log("Accessing Database"); 
        await db.run('UPDATE users SET loadSave=? WHERE id=?', saveString, user.id).then(console.log("Complete:"));
    }
    else
    {
        console.log("User Not Logged In"); 
    }
    res.render('game');  
}); 

app.get('/logout', async (req, res) => {
    const db = await dbPromise;
    res.cookie('sessionToken', '', { maxAge: 0 });
    await db.run('DELETE FROM sessions WHERE sessionToken=?', req.cookies.sessionToken);
    res.redirect('/');
});

app.get('/databasedump', async (req, res) => {
    const db = await dbPromise;
    const tables = await db.all('SELECT name FROM sqlite_master WHERE type="table"');
    const users = await db.all('SELECT * FROM users');
    const forum = await db.all('SELECT * FROM forum');
    const sessions = await db.all('SELECT * FROM sessions');
    res.json({
        tables,
        users,
        forum,
        sessions
    }); 
}); 

app.use((req, res) => {
    res.status(404).send('file not found');
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000/');
});
