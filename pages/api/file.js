//delete/fileName
//post//rename/fileName
//post//new/fileName
//post//pageNumber

import { getAllFileLists } from "../../lib/io"
export default function handler(req, res) {
  const f = Type[req.method]
  if (typeof f==="function") return f(req, res)
  return res.status(405).json({})
}

const Type = {
  ["DELETE"]: function handleMethodDelete() {

  },
  ["POST"]: function handleMethodPost() {

  },
  ["GET"]:async function handleMethodGet(req, res) {
    let { page } = req.query
    if (typeof page !== "undefined")
      page = parseInt(page)
    if (typeof page === "number") {
      let data = await getAllFileLists(page)
      return res.status(200).json(data)
    }
    return res.status(404).json({})
  }
}
