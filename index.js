const express = require('express');

let books = require('./bookList.js');

const app = express();

app.use(express.json());

app.get('/books', (req, res) => {
    res.send(books);
})

app.get('/books/:id', (req, res) => {
    const found = books.find(b => b.isbn === req.params.id);
    if (!found) return res.status(404).send('Book does not exist');

    res.send(found);
})

app.delete('/books/:id', (req, res) => {
    const found = books.find(b => b.isbn === req.params.id);
    if (!found) return res.status(404).send('Book does not exist');

    books = books.filter(b => b.isbn != req.params.id);

    res.status(200).send('Success');
})

app.post('/books', (req, res) => {
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
        authors: req.body.authors,
        categories: req.body.categories
    };

    const found = books.find(b => b.isbn === book.isbn);
    if (found) return res.status(404).send('Book already exist');

    books.push(book);
    res.status(200).send(book);
})

app.put('/books/:id', (req, res) => {
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
        authors: req.body.authors,
        categories: req.body.categories
    };

    const found = books.find(b => b.isbn === book.isbn);
    if (!found) return res.status(404).send('Book does not exist');

    const bookIndex = books.findIndex(b => b.isbn === book.isbn);

    books.splice(bookIndex, 1, book);

    res.status(200).send(book);
})


app.listen(3000, () => console.log('listening on port 3000'));
