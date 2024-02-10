process.env.NODE_ENV = 'development';

const express = require('express'),
    app = express(),
    fs = require('fs');

const host = '192.168.0.105';
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let file = 'data.json';

if ((process.env.NODE_ENV = 'test'))
    file = 'data-test.json';

app.use((req, res, next) => {
    fs.readFile(file, (err, data) => {
        if (err)
            return res.status(500).send({
                message: 'Error while getting users',
            });

        req.data = JSON.parse(data);

        next();
    });
});

app.route('/api/users')
    .get((req, res) => {
            console.log(`get`)


        return res.status(200).send({ data: req.data });

    })
    .post((req, res) => {
            console.log(`post`)
            console.log(req.body)

            fs.writeFile(
                file,
                JSON.stringify(req.body),
                (err, response) => {
                    if (err)
                        return res.status(500).send({
                            message: 'Unable edit state',
                        });

                    return res
                        .status(200)
                        .send({ message: 'Data is updated' });
                }
            );

    })
  
app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);
