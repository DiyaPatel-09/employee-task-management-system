require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes=require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/projects",projectRoutes);
app.use("/uploads",express.static("uploads"));


pool.connect()
  .then(() => {
    console.log('PostgreSQL Connected');
  })
  .catch((err) => {
    console.log(err.message);
  });


app.get('/', (req, res) => {
  res.send('Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});