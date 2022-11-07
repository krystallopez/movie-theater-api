const express = require("express");
const { User, Show } = require("../models/index");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// getting all users from Users DB with endpoint
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

//getting specific user from User DB with parameters ID specifided in URL path
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json({ user });
});

//CRUD Ops on User DB

//adding a user to the DB
router.post(
  "/",
  [
    check("username").not().isEmpty().trim(),
    check("password").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const userToPost = await User.create(req.body);
      res.json(await User.findAll());
    } else {
      res.json({ error: errors });
    }
  }
);

//updating a user in the User DB
router.put(
  "/:id",
  [
    check("username").not().isEmpty().trim(),
    check("password").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateUser); //send back user data that was updated
  }
);

// Deleting a user in the User DB
router.delete("/:id", async (req, res) => {
  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(await User.findAll()); // send back full list of users with the changes
});

// getting the show watched by the user
router.get("/:userId/shows/", async (req, res) => {
  res.json(
    await User.findByPk(req.params.id, {
      include: { model: Show, as: "shows" },
    })
  );
});

//To update and add show to user
router.put("/:id/shows/:showId", async (req, res) => {
  const userRec = await User.findByPk(req.params.id);
  const showRec = await Show.findByPk(req.params.showId);
  await userRec.addShow(showRec);
  res.json(
    await User.findByPk(req.params.id, {
      include: { model: Show, as: "shows" },
    })
  );
});

module.exports = router;
