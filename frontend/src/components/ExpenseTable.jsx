/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";

export function ExpenseTable() {
  const expenses = useSelector((store) => store.expense.expenses);
  const [localExpense, setLocalExpense] = useState([]);

  console.log("Rendering Expenses:", expenses);

  const handleCheckboxChange = async (expenseId) => {
    const updatedExpense = localExpense.find((exp) => exp._id === expenseId);
    const newStatus = !updatedExpense.done;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setLocalExpense((prev) =>
          prev.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const totalAmount = localExpense.reduce((acc, expense) => {
    return !expense.done ? acc + expense.amount : acc;
  }, 0);

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/expense/remove/${expenseId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const filteredExpenses = localExpense.filter(
          (expense) => expense._id !== expenseId
        );
        setLocalExpense(filteredExpenses);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete expense");
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent Expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark As Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense && localExpense.length > 0 ? (
          localExpense.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={expense.done}
                  onCheckedChange={() => handleCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className={expense.done ? "line-through" : ""}>
                {expense.description}
              </TableCell>
              <TableCell className={expense.done ? "line-through" : ""}>
                {expense.amount} ₹
              </TableCell>
              <TableCell className={expense.done ? "line-through" : ""}>
                {expense.category}
              </TableCell>
              <TableCell className={expense.done ? "line-through" : ""}>
                {expense.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => removeExpenseHandler(expense._id)}
                    size="icon"
                    className="rounded-full border border-red-600 hover:border-transparent text-red-600"
                    variant="outline"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <UpdateExpense expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="6" className="text-center">
              <div className="font-bold text-xl text-amber-500">
                Add your First Expenses
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-xl text-red-500">
            {totalAmount} ₹
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ExpenseTable;
