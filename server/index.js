const express = require('express');
const cors = require('cors');
const {connect}  = require('mongoose');
const upload = require('express-fileupload');
require('dotenv').config();

// Route handlers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorMiddleware } = require('./middleware/errorMiddleware');

const port = process.env.port || 5000;

const app = express();

// Automatically parse data
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

// Link the server side with the client side safely
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Routes error handlers
app.use(notFound);
app.use(errorMiddleware);

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
})
  .then(app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(error => console.log(error));