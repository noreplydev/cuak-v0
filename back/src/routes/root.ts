import { Router } from "express";
import { connectDB } from "../db/connection";
import _200 from "../lib/http";

export const root = Router()

root.use('/', async (req, res) => {
  await connectDB()

  return _200(res, "CuakDb API, hello debuggers.")
})

