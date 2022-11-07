const express = require("express");
const { Show } = require("../models/index");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// GET request
router.get("/", async (req, res) => {
  const findShow = await Show.findAll();
  res.json(findShow);
});

// GET request by using ID params
router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

// add a show to the Show model
router.post(
  "/",
  [
    check("title").not().isEmpty().trim(),
    check("genre").not().isEmpty().trim(),
    check("raiting").not().isEmpty().trim(),
    check("status").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const addShow = await Show.create(req.body);
      res.json(await Show.findAll());
    } else {
      res.json({ error: errors });
    }
  }
);

//Return shows with a specific genre
router.get("/:id/genres/:genre", async (req, res) => {
  const getGenre = await Show.findAll({
    where: {
      genre: req.params.genre,
    },
  });
  res.json(getGenre);
});

// Updating rating on a specific show
router.put(
  "/:id/watched",
  [check("rating").not().isEmpty().trim()],
  async (req, res) => {
    const updateRating = await Show.update(
      {
        where: {
          id: req.params.id,
        },
      },
      {
        rating: req.body.rating,
      }
    );
    res.json(updateRating);
  }
);

// updating the status of a certain show
router.put("/:id", async (req, res) => {
  const updateStatus = await Show.update(
    {
      where: {
        id: req.params.id,
      },
    },
    {
      status: req.params.status,
    }
  );
  res.json(updateStatus);
});

router.delete("/:id", async (req, res) => {
  const deletedShow = await Show.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(await Show.findAll()); //send back full list of books with the change
});

module.exports = router;
