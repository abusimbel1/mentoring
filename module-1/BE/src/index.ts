import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT = 3333;

const sayHello = () => console.log('Hello');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  sayHello();
  res.send('Hello!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
