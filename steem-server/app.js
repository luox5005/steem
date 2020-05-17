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
		day: row.day,
		gamename: row.gamename,
		message: row.message,
		id: row.id,
	}
}

function rowToObject1(row){
        return {
                id: row.id,
		style: row.style
        }
}

app.get('/games/:gamename',(request, response) => {
        const query = 'SELECT *  FROM memory WHERE gamename = ?';
        const params = [request.params.gamename];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        games: rows.map(rowToObject),
                });
        });
});

app.post('/games', (request,response) => {
	const query = 'INSERT INTO memory(year, month, day, gamename, message, id) VALUES(?,?,?,?,?,?)';
	const params = [request.body.year, request.body.month, request.body.day, request.body.gamename, request.body.message, request.body.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId,
		});
	});
});

app.patch('/games/:id', (request,response) => {
        const query = 'UPDATE memory SET year = ?, month = ?, day = ?, gamename = ?, message = ? WHERE id = ?';
        const params = [request.body.year, request.body.month, request.body.day, request.body.gamename, request.body.message, request.params.id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});

app.get('/tags',(request, response) => {
        const query = 'SELECT id, style FROM tag';
        connection.query(query, (error, rows) => {
                response.send({
                        ok: true,
                        tags: rows.map(rowToObject1),
                });
        });
});

app.post('/tags', (request,response) => {
        const query = 'INSERT INTO tag(id, style) VALUES(?,?)';
        const params = [request.body.id, request.body.style];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                        id: result.insertId,
                });
        });
});

app.patch('/tags', (request,response) => {
        const query = 'UPDATE tag SET style = ? WHERE id = ?';
        const params = [request.body.style, request.params.id];
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
