const Superhero = require('../models/superheroModel');
const express = require('express');

const router = express.Router();

// Obtener todos los superhéroes
router.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.findAll();
    res.json(superheroes);
  } catch (error) {
    console.error('Error al obtener los superhéroes:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los superhéroes' });
  }
});

// Crear un superhéroe
router.post('/', async (req, res) => {
  try {
    const superhero = await Superhero.create(req.body);
    res.json(superhero);
  } catch (error) {
    console.error('Error al crear el superhéroe:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el superhéroe' });
  }
});

// Obtener un superhéroe por su identificador
router.get('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findOne({ where: { id: req.params.id } });
    if (superhero) {
      res.json(superhero);
    } else {
      res.status(404).json({ error: 'Superhéroe no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el superhéroe:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el superhéroe' });
  }
});

// Actualizar un superhéroe
router.put('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findOne({ where: { id: req.params.id } });
    if (superhero) {
      await superhero.update(req.body);
      res.json(superhero);
    } else {
      res.status(404).json({ error: 'Superhéroe no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el superhéroe:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el superhéroe' });
  }
});

// Eliminar un superhéroe
router.delete('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findOne({ where: { id: req.params.id } });
    if (superhero) {
      await superhero.destroy();
      res.json({ message: 'Superhéroe eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Superhéroe no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el superhéroe:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el superhéroe' });
  }
});

//Buscar por nombre
router.get('/nombre/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const superheroes = await Superhero.findAll({
      where: { nombre: nombre }
    });
    res.json(superheroes);
  } catch (error) {
    console.error('Error al obtener los superhéroes:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los superhéroes' });
  }
});


module.exports = router;
