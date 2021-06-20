import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT = 3333;

// eslint-disable-next-line no-console
const sayHello = () => console.log('Hello');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello!');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
