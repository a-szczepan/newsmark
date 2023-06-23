require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {getPaths} = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(getPaths());

const run = async () => {
	app.listen(process.env.DEV_PORT, () => console.log(`Server running on port ${process.env.DEV_PORT}`));
};

run();
