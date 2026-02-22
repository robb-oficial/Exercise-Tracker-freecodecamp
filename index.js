const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
//models
const User = require('./models/User');
const Exercise = require('./models/Exercise');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
})
//create new user
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await User.create({ username });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});
//create a new exercise for a user
app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User does not exist in the database");
    }
    let { description, duration, date } = req.body;
    date = new Date(date);
    if (isNaN(date.getTime())) {
      date = new Date();
    }
    const exercise = await Exercise.create({
      userId,
      date,
      duration: Number(duration),
      description
    });
    res.status(200).json({
      ...user._doc,
      date: exercise.date.toDateString(),
      duration: exercise.duration,
      description: exercise.description
    })
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

//logs for a single user
app.get('/api/users/:id/logs', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { from, to, limit } = req.query;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User does not exist in the database");
    }
    let exercises = await Exercise.find({ userId });
    const fromDate = new Date(from + "T00:00:00");
    const toDate = new Date(to + "T00:00:00");
    let isProcessed = false;
    if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
      //if both dates are valid
      exercises.forEach((exercise, i, thisArr) => {
        thisArr[i] = {
          description: exercise.description,
          duration: exercise.duration,
          date: new Date(exercise.date)
        }
      });
      exercises = exercises.filter((exercise) => exercise.date >= fromDate && exercise.date <= toDate);
      isProcessed = true;
    }
    if (!isProcessed) {
      exercises.forEach((exercise, i, thisArr) => {
        thisArr[i] = {
          description: exercise.description,
          duration: exercise.duration,
          date: new Date(exercise.date)
        }
      });
    }
    let log = [...exercises.map(exercise => {
      exercise.date = exercise.date.toDateString();
      return exercise;
    })];
    if (limit) {
      log = log.slice(0, limit);
    }
    res.status(200).json({
      _id: user.id,
      username: user.username,
      count: log.length,
      log
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

const listener = app.listen(process.env.PORT || 3000, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'fcc-excercise-tracker'
    });
  } catch (error) {
    console.log(error);
  }
  console.log('Your app is listening on port ' + listener.address().port)
})
