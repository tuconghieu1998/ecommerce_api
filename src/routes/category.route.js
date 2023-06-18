import express from "express";
import {
  getCategories,
  getCategoryById,
  updateCategoryDetails,
  createCategory,
  deleteCategoryById
} from "../controllers/category.controller.js";

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id/update-details', updateCategoryDetails);
router.post('/create', createCategory);
router.delete('/:id/delete', deleteCategoryById);

export default router;