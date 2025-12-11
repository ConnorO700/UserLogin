import express from 'express';
import cors from 'cors';
import login from './routes/login.mts'
import users from './routes/users.mts';
import logger from './middleware/logger.mts';
import notFound from './middleware/notFound.mts';
import errorHandler from './middleware/error.mts';
import bearerToken from 'express-bearer-token';
import db from './MongoDB.mjs'

const app = express();
const port = process.env.PORT;

db();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(logger);

app.use('/api', login);

app.use('/api/users', users)

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port:${port}`));