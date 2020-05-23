handlePlantRequest = (req, res, db) => {
  const {user} = req.params;

  db('plants')
    .select('*')
    .where({
      username: `${user}`
    })
    .then(results => res.json(results))

}

module.exports = {
  handlePlantRequest
}

