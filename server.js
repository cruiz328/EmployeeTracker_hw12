
   
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001; 
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api', apiRoutes);


db.connect(err => {
    if (err) throw err;
    console.log('Database connected');

    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
});