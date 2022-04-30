const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const session = require('express-session');
const passport = require('passport');
const blogRouter = require('./routes/blog')
const postRouter = require('./routes/posts');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

}));
app.use(passport.authenticate('session'));

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.set('views', './views')
app.set('view engine', 'ejs');


app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/login", authRouter)
app.use("/api/users", usersRouter);
app.use("/blog", blogRouter);
app.use("/post", postRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})