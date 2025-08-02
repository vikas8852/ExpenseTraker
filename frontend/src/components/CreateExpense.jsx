// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem,  SelectTrigger, SelectValue } from './ui/select'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '@/redux/expenseSlice'

//import { baseUrl } from '@/Urls'

const CreateExpense = () => {
const [formData,setFormData]=useState({
    description:"",
    amount:"",
    category:"",
})
const[loading,setLoading]=useState(false);
const[isopen ,setIsOpen]=useState(false);
const dispatch=useDispatch();
const expenses = useSelector((store) => store.expense.expenses);

const changeEventHandler=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
         ...prevData,
         [name]:value,
    }))
}
const changeCategoryHandler=(value)=>{
    setFormData((prevData)=>({
        ...prevData,
        category:value
   }))
}
const submitHandler= async(e)=>{
    e.preventDefault()
    console.log(formData)
    try{
     setLoading(true);
     const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/expense/add`,formData,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
     });
     if(res.data.success){
        dispatch(setExpenses([...expenses,res.data.expense]))
        toast.success(res.data.message);
        setIsOpen(false);
     }
    }
    catch(error){
        console.log(error)
          toast.error(error.response.data.message);
    }
    finally{
      
        setLoading(false);
    }

}
  return (
    <Dialog 
    open={isopen} 
    onOpenChange={(state) => {
      setIsOpen(state);
      if (state) {
        setFormData({ description: "", amount: "", category: "" }); // Reset form when opening
      }
    }}
  >
      <DialogTrigger asChild>
        <Button onClick={()=>setIsOpen(true)} variant="outline">Add New Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
          Create expense here and click add when you&apos;are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="description"
             placeholder="Description"
              className="col-span-3"
              name="description"
              value={formData.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
            Amount
            </Label>
            <Input
              id="amount"
             placeholder="xxx in ₹"
              className="col-span-3"
              name="amount"
              value={formData.amount}
              onChange={changeEventHandler}
            />
          </div>
          <Select onValueChange={changeCategoryHandler}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value="Rent">Rent</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Salary">Salary</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Others">Others</SelectItem>
       
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
        <DialogFooter>
        {
            loading?<Button className='w-full my-4'>
                <Loader2 className='mr-2 h-4 animate-spin'/>
                Please wait
            </Button>:<Button type="submit">Add</Button>
        }
          
        </DialogFooter>
        </form>
       
      
      </DialogContent>
    </Dialog>
  )
}

export default CreateExpense
