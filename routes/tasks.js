const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://jppachar:737637@ds151993.mlab.com:51993/mytasklist', ['tasks']);

// Obtener todas las Tasks
router.get('/tasks', (req, res, next) => {
  db.tasks.find((err, tasks) => {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

// Obtener solo una Task
router.get('/task/:id', (req, res, next) => {
  db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)}, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

// Guardar una Task
router.post('/task', (req, res, next) => {
  let task = req.body;
  if (!task.title || (task.isDone + '')) {
    res.status(400);
    res.json({
      "error": "Error en los datos"
    });
  } else {
    db.tasks.save(task, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Eliminar Task
router.delete('/task/:id', (req, res, next) => {
  db.tasks.remove({_id: mongojs.ObjectID(req.params.id)}, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

// Actualizar Task
router.put('/task/:id', (req, res, next) => {
  let task = req.body;
  let updTask = {};

  if (task.isDone) {
    updTask.isDone = task.isDone;
  }

  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.json({
      "error": "Error en los datos"
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectID(req.params.id)},updTask, {}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

module.exports = router;