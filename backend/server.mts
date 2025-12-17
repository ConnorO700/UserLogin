import express from 'express';
import cors from 'cors';
import authRouter from './routes/AuthRouter.mjs'
import userRouter from './routes/UserRouter.mjs';
import logger from './middleware/Logger.mts';
import notFound from './middleware/NotFound.mts';
import errorHandler from './middleware/Error.mts';
import bearerToken from 'express-bearer-token';
import db from './MongoDB.mjs'

const app = express();
const port = process.env.PORT;

db();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(logger);

app.use('/api', authRouter);

app.use('/api/users', userRouter)

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port:${port}`));