const fs = require("fs")
const json = require("./config/country.json")

const res = json.map(e => e)

fs.writeFileSync("res.json", JSON.stringify(res))
