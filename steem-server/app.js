const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
	return {
		year: row.year,
		month: row.month,
		developer: row.developer,
		message: row.message,
	}
}

app.get('/games/:developer',(request, response) => {
        const query = 'SELECT year, month, developer, message, id FROM memory WHERE developer = ?';
        const params = [request.params.developer];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        games: rows.map(rowToObject),
                });
        });
});

app.post('/games', (request,response) => {
	const query = 'INSERT INTO memory(year, month, developer, message) VALUES(?,?,?,?)';
	const params = [request.body.year, request.body.month, request.body.developer, request.body.message];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId,
		});
	});
});

app.patch('/games/:id', (request,response) => {
        const query = 'UPDATE memory SET year = ?, month = ?, developer = ?, message = ? WHERE id = ?';
        const params = [request.body.year, request.body.month, request.body.developer, request.body.message, request.params.id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});

const port=3443;
app.listen(port,()=>{
  console.log(`We are live on port ${port}!`);
});
