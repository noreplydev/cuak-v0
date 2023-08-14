import { Router } from "express";

export const root = Router()

root.use('/', (req, res) => {
  res.send('Cuak API, Hello debuggers')
})

