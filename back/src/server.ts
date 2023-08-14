import express from 'express';
import { root } from './routes/root';

const app = express()

app.use('/', root)

app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})