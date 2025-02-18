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
router.get("/:slug", show);

//Store - Create
router.post("/", upload.single("file"), store);

// Store - Create review
router.post("/:slug/reviews", storereviews);

//Update - Update  totale
router.patch("/:slug", modify);


//export router
export default router;
