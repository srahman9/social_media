const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbuserData) => {
        if (!dbuserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbuserData);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbuserData) => res.json(dbuserData))
      .catch((err) => res.json(err));
  },

  //create friend
  createFriend({ body, params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // delete user
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbuserData) => res.json(dbuserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
