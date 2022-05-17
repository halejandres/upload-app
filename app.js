const express = require('express');
const fileUpload = require('express-fileupload');

const conexion = require('./helpers/mysql-config');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/', (req, res) => {
    let sampleFile = ''; 
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No se enviaron archivos');
    }

    sampleFile = req.files.archivo;

    //name, data, size, mimetype
    let sql = `INSERT INTO file(name, data, size, mimetype) VALUES(?, ?, ?, ?)`;
      conexion.query(sql, [req.files.archivo.name, req.files.archivo.data, req.files.archivo.size, req.files.archivo.mimetype], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      res.json(results);
    });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM file WHERE id = ?`;
      conexion.query(sql, [id], (error, results, fields) => {
      if(error){
         res.send(error);
      }
      
      res.setHeader('Content-Disposition', `attachment; filename="${results[0].name}"`);
      res.setHeader('Content-Type', results[0].mimetype)
      res.send(results[0].data);
    });
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});