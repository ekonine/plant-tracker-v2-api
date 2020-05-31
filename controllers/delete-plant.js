const handlePlantDelete = (req, res, db) => {
  const {user, plantid} = req.params;

  db.transaction(trx => {
    trx('plants')
      .where({
        plantid: `${plantid}`,
        username: `${user}`
      })
      .del()
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .then(() => {
      res.status(200).json('plant deleted');
    })
    .catch(error => {
      res.status(400).json('plant not deleted - something went wrong');
      console.error(error);
    })
}
