// const express = require('express'); 
// const fs = require('fs'); 
// const path = require('path');

// const app = express(); 
// const port = 3000; 

// // Ruta original que integra los datos del archivo JSON
// app.get('/comics', (req, res) => {
//   const existingComics = [
//     // Supongamos que este es el arreglo de cómics actual del backend
//     {
//       "title": "The Walking Dead",
//       "author": "Robert Kirkman",
//       "description": "A group of survivors navigating a post-apocalyptic world.",
//       "category": "Horror",
//       "date": "2003-10-08",
//       "url": "https://example.com/walkingdead.jpg"
//     }
//   ];

//   const filePath = path.join(__dirname, 'data.json');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error leyendo el archivo:', err);
//       return res.status(500).send('Error leyendo el archivo de cómics.');
//     }

//     try {
//       const comicsFromFile = JSON.parse(data);
//       const allComics = [...existingComics, ...comicsFromFile]; // Combina ambos arrays
//       res.json(allComics);
//     } catch (parseErr) {
//       console.error('Error parseando JSON:', parseErr);
//       res.status(500).send('Error parseando el archivo de cómics.');
//     }
//   });
// });

// // Inicia el servidor
// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });
