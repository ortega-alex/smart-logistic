import expres from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = expres();

app.use(morgan('dev'));
app.use(cors());
app.use(expres.json());

export default app;
