const handlePlantAddRequest = (req, res, db) => {
  const {user} = req.params;
  const {
    plantSpecies,
    plantNickname,
    plantHouseLoc,
    plantBoughtLoc,
    plantPrice,
    plantPriceCurr,
  } = req.body;

  db('plants')
    .max('plantid')
    .where({
      username: `${user}` 
    })
    .first()
    .returning(`max`)
    .then(result => {

      const sqlInsert = {
        plantspecies: `${plantSpecies}`,
        plantnickname: `${plantNickname}`,
        planthouseloc: `${plantHouseLoc}`,
        plantboughtloc: `${plantBoughtLoc}`,
        plantprice: `${plantPrice}`,
        plantpricecurr: `${plantPriceCurr}`,
        username: `${user}`
      }

      db.transaction(trx => {
        if (result.max === null) {
          trx('plants')
            .insert({...sqlInsert, plantid: '0'})
            .then(trx.commit)
            .catch(trx.rollback)
        } else {
          trx('plants')
            .insert({...sqlInsert, plantid: parseInt(result.max + 1)})
            .then(trx.commit)
            .catch(trx.rollback)
        }
      })
        .then(() => {
          res.status(200).json('plant added')
        })
        .catch(error => {
          res.status(400).json('plant not added - something went wrong')
          console.error(error)
        })
    })
};


module.exports = {
  handlePlantAddRequest
}
