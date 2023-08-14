import { Router } from "express";
import { connectDB } from "../db/connection";

export const root = Router()

root.use('/', async (req, res) => {
  await connectDB()

  res.send('Cuak API, Hello debuggers')
})

