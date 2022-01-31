const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')))

// path.join gets the absolute path from the root to this file and adds 'public' to it.


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// path.join does the same thing as the last example, but we use /views here because the default uses that and it is easier than changing it to something else.


app.get('/', (req,res) => {
    res.render('home.ejs');
})

app.get('/cats', (req,res) => {
    const cats = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5'];
    res.render('cats', {cats});
})

app.get('/r/:subreddit', (req,res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit', {...data});
    } else {
        res.render('notfound', { subreddit })
    }
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})