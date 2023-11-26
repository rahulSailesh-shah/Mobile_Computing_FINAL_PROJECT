const express = require("express");
const { getEvents, getEvent } = require("../controllers/events");

const { protect } = require("../middleware/middleware");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);

module.exports = router;
