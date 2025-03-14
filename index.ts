import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import { countriesRouter } from './src/routes/countriesRoute';
import { holidaysRouter } from './src/routes/holidaysRoute';
import { handleErrors } from './src/handlers/errorHandler';
import { validateEnv } from './src/validators/urlValidator';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(holidaysRouter);
app.use(countriesRouter);

app.use(handleErrors);

startProgram();

function startProgram() {
    try {
        validateEnv();
        mongoose
            .connect(process.env.DB_CONNECTION_STRING!)
            .then(() => console.log('Connected to database.'));
        app.listen(port, () => {
            console.log(`Store app listening on port ${port}`);
        });
    } catch (error) {
        console.error(`Something went wrong...\n${error}`);
    }
}
