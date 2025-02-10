import express from "express"
import { addExpense, getAllExpense, markAsDoneOrUndone, removExpense, updateExpense } from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router=express.Router();
router.route("/add").post(isAuthenticated,addExpense);
router.route("/getall").get(isAuthenticated,getAllExpense);
router.route("/remove/:id").delete(isAuthenticated,removExpense);
router.route("/update/:id").put(isAuthenticated,updateExpense);
router.route("/:id/done").put(isAuthenticated,markAsDoneOrUndone);

export default router;