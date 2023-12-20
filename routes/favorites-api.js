/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const favs = require("../db/queries/favourites");

router.post("/:id", (req, res) => {
  const feedId = req.body.feedId;
  // const userId = req.body.userId;  // TODO : make sure req.body has userID
  const userId = 1;  // TODO: remove this hard-coded userId =1, onnce req.body has userId

  const favourite = {
    itemId: feedId,
    userId: userId,
  };
  console.log("favourite: with itemId, userId");
  console.log(favourite);
  favs
    .addFavourite(favourite)
    .then(() => {
      console.log("Marked the feed successfully! ");
      res.send({ message: 1 });
    })
    .catch((error) => {
      console.error("Error marking the feed. ", error);
    });
});

router.delete("/:id", (req, res) => {
  console.log("ping coming");
  const favId = req.params.id;
  console.log(favId);
  try {
    favs.deleteFavourite(favId);
  } catch (error) {
    console.error("Error deleting the item: ", error);
    res.status(500).json({ success: false });
  }
});
module.exports = router;
