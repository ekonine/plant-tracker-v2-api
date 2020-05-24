const handlePlantRequest = (req, res, db) => {
  const {user} = req.params;

  db('plants')
    .select('*')
    .where({
      username: `${user}`
    })
    .then(results => res.json(results))

}

const handleIndPlantRequest = (req, res, db) => {
  const {user, plantid} = req.params;

  db('plants')
    .select('*')
    .where({
      username: `${user}`,
      plantid: `${plantid}`
    })
    .first()
    .then(results => res.json(results))

}

module.exports = {
  handlePlantRequest,
  handleIndPlantRequest
}

