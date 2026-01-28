const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/qrcode');
});

app.get('/qrcode', (req, res) => {
    res.render('form');
});


app.post('/qrcode', (req, res) => {
    const { url } = req.body;
    QRCode.toDataURL(url, (err, QRUrl) => {
        if (err) {
            res.send('something went wrong');
        }
        res.render('qr', { QRUrl });
    });
});

app.listen(3000, (req, res) => {
    console.log('server is running on port 3000');
});