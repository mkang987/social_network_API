const { User, Thought } = require("../models");

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //get specific user by id
    getSpecificUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with ID found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
            )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with ID found' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with ID found' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Add a friend to user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
        .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user with ID found' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Remove a friend
    removeFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId  } },
            { runValidators: true, new: true }
        )
        .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user with ID found' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};