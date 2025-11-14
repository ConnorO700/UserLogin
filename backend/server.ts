import express from 'express';
import cors from 'cors';
import users from './routes/users.ts'
import logger from './middleware/logger.ts';
import notFound from './middleware/notFound.ts';
import errorHandler from './middleware/error.ts';

export interface ProcessEnv {
    [key: string]: string | undefined
}
const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/api/users', users)


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port:${port}`));