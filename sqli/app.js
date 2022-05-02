const express = require('express')
const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.post('/login', (req, res) => {
    const maliciousUserInput = req.body.user;
    connectNExecuteQuery(maliciousUserInput, res);
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const connectNExecuteQuery = (userQuery, nodeRes) => {
    const { Pool } = require('pg')

    const pool = new Pool({
        user: 'admin',
        host: 'host.docker.internal',
        database: 'postgres',
        password: '112',
        port: 5432,
    })

    pool.connect((err, client, done) => {
        if (err) throw err
        const input = 'SELECT * FROM public.\"Users\" WHERE \"Username\" = \'' + userQuery + '\'';
        client.query(input, (err, res) => {
            done()
            if (err) {
                console.log(err.stack)
            } else {
                return nodeRes.json(res.rows);
            }
        })
    })

};