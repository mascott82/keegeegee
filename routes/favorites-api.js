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
  const userId = req.session.userId;

  if (userId === undefined || userId === null) {
    res.send({ message: 0 });
  } else {
    const favourite = {
      itemId: feedId,
      userId: userId,
    };

    favs
      .addFavourite(favourite)
      .then(() => {
        res.send({ message: 1 });
      })
      .catch((error) => {
        console.error("Error marking the feed. ", error);
      });
  }

});

router.delete("/:id", (req, res) => {
  const favId = req.params.id;
  try {
    favs.deleteFavourite(favId);
  } catch (error) {
    console.error("Error deleting the item: ", error);
    res.status(500).json({ success: false });
  }
});
module.exports = router;
