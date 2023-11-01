const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('view engine', 'ejs');


let blogs = [];

app.get('/', (req, res) => {
    res.render('main', { blogs });
});
55
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { title, content } = req.body;
    blogs.push({ title, content });
    res.redirect('/');
});

app.get('/allBlogs', (req, res) => {
    res.render('allBlogs', { blogs });
});

app.get('/allBlogs/:index', (req, res) => {
    const index = req.params.index;
    const blog = blogs[index];

    if (blog) {
        res.render('blogDetail', { blog });
    } else {
        res.redirect('/allBlogs');
    }
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
