import express from "express";
const router = express.Router();

import {
  index,
  show,
  store,
  storeComments,
  modify,
} from "../controllers/apartmentController.js";
//Rotte

// Index - Read all
router.get("/", index);

// Show - Read one -
router.get("/:id", show);

//Store - Create
router.post("/", store);

// Store - Create review
router.post("/:id/comments", storeComments);

//Update - Update  totale
router.patch("/:id", modify);


//export router
export default router;
