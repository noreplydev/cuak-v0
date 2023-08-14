import { connect } from "mongoose";

export async function connectDB() {
  await connect(process.env.DB_URL as string)
    .then(() => {
      console.log('[DB] ✓ Succesfully connected to cuakDB')
    })
    .catch(() => {
      console.error('[DB] ✗ Something went wrong connecting to cuakDB')
    })

  return
}