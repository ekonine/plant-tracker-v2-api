const handlePlantUpdate = (req, res, db) => {
  const {user, plantid} = req.params;
  const {
    plantSpecies,
    plantNickname,
    plantHouseLoc,
    plantBoughtLoc,
    plantPrice,
    plantPriceCurr,
  } = req.body;

  db.transaction(trx => {
    trx('plants')
      .update({
        plantspecies: `${plantSpecies}`,
        plantNickname: `${plantNickname}`,
        plantHouseloc: `${plantHouseLoc}`,
        plantBoughtLoc: `${plantBoughtLoc}`,
        plantPrice: `${plantPrice}`,
        plantPriceCurr: `${plantPriceCurr}`,
      })
      .where({
        plantid: `${plantid}`,
        username: `${user}`
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .then(() => {
      res.status(200).json('plant updated');
    })
    .catch(error => {
      res.status(400).json('plant not updated - something went wrong');
      console.error(error);
    })
} 

module.exports = {
  handlePlantUpdate
}
