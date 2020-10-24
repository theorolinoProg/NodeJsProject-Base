import express from 'express';
const router = express.Router();
import userControllr from "../controllers/user.controller";

router.get("/", userControllr._getAll);
router.get("/:id", userControllr._getById);
router.put("/:id", userControllr._update);
router.delete("/:id", userControllr._delete);

module.exports = router;