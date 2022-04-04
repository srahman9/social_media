const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
} = require("../../controllers/thoughts-controller");

//Get thoughts

router.route("/").get(getAllThoughts);


router.route("/:userId").post(addThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
