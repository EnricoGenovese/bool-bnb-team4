import express from "express";

const router = express.Router();

import {
  index,
  indexCategories,
  indexHomePage,
  show,
  store,
  upload,
  storereviews,
  modify,
} from "../controllers/apartmentController.js";
//Rotte

// Index - Read all
router.get("/", index);
router.get("/categories", indexCategories)
router.get("/homepage", indexHomePage);


// Show - Read one -
router.get("/:id", show);

//Store - Create
router.post("/", upload.single("file"), store);

// Store - Create review
router.post("/:id/reviews", storereviews);

//Update - Update  totale
router.patch("/:id", modify);


//export router
export default router;
