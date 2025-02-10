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
import { Edit2, Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";
import { baseUrl } from "@/Urls";


export function ExpenseTable() {
  const expenses = useSelector((store) => store.expense.expenses); // ✅ Fix Redux state extraction
  const [localExpense,setLocalExpense]=useState([]);
  const[checkedItems,setCheckedItems]=useState({});

  console.log("Rendering Expenses:", expenses); // ✅ Debugging

  const handleCheckboxChange=async(expenseId)=>{
    const newStatus=!checkedItems[expenseId];
    try{
        const res=await axios.put(`${baseUrl}/api/v1/expense/${expenseId}/done`,
        {done:newStatus} ,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        if(res.data.success){
            toast.success(res.data.message);
            setCheckedItems((prevData)=>({
                ...prevData,
                [expenseId]:newStatus
            }));
            //optionally update the local state for expense id the entire object needs update
            setLocalExpense(localExpense.map(exp=>exp._id===expenseId?{...exp,done:newStatus}:exp))
        }


    }
    catch(err){
        console.log(err);
    }


          }


    useEffect(()=>{
        setLocalExpense(expenses)
    },[expenses]) 

    const totalAmount=localExpense.reduce((acc,expense)=>{
        if(!checkedItems[expense._id]){
            return acc+expense.amount
        }
        return acc
    },0);

   const removeExpenseHandler=async(expenseId)=>{
    try{
        const res=await axios.delete(`${baseUrl}/api/v1/expense/remove/${expenseId}`);
        if(res.data.success){
            toast.success(res.data.message);
            //update local state
            const filteredExpenses=localExpense.filter(expense=>expense._id !== expenseId);
            setLocalExpense(filteredExpenses)
        }

    }
    catch(err){
        console.log(err);
    }
   }

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
        {localExpense && localExpense.length > 0 ? ( // Handle empty state
            localExpense.map((expense) => (
            <TableRow key={expense._id}> 
             <TableCell className='font-medium'>{}
             <Checkbox 
                 checked ={expense.done}
               onCheckedChange={()=>handleCheckboxChange(expense._id)}
             />
             </TableCell>
              <TableCell className={expense.done?'line-through':' '}>{expense.description}</TableCell>
              <TableCell className={expense.done?'line-through':' '}>{expense.amount} ₹</TableCell>
              <TableCell className={expense.done?'line-through':' '}>{expense.category}</TableCell>
             <TableCell className={expense.done?'line-through':' '}>{expense.createdAt?.split("T")[0]}</TableCell>
             <TableCell >
                <div className='flex items-center justify-end gap-2'>
                <Button onClick={()=>removeExpenseHandler(expense._id)} size='icon' className='rounded-full border border-red-600 hover:border-transparent text-red-600 ' variant="outline"><Trash className="h-4 w-4"/></Button>
                {/* <Button size='icon' className='rounded-full border border-green-600 hover:border-transparent text-green-600 ' variant="outline"><Edit2 className="h-4 w-4"/></Button> */}
                <UpdateExpense expense={expense}/>
                </div>
             </TableCell>
             
            </TableRow>
            
          ))
          
        ) : (
          <TableRow>
            <TableCell colSpan="6" className="text-center">
            <div className="font-bold text-xl  text-amber-500"> Add your First Expenses</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className='font-bold text'>Total</TableCell>
          <TableCell className="text-right font-bold text-xl text-red-500">{totalAmount}₹</TableCell>
           </TableRow>
         </TableFooter>
    </Table>
  );
}

export default ExpenseTable;


