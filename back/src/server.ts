import 'dotenv/config'

import express from 'express';
import { root } from './routes/root';

const app = express()

app.use('/', root)

app.listen(process.env.PORT, () => {
  console.log('[SERVER] Listening on localhost:3000')
})