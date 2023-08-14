export default function _200(res: any, msg = 'Ok') {
  res.status(200)
  return res.json({
    "status": "200 OK",
    "msg": msg
  })
}