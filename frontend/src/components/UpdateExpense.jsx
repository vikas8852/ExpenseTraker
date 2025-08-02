/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent,  DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Edit2, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses, setSingleExpense } from '@/redux/expenseSlice'

//import { baseUrl } from '@/Urls'

const UpdateExpense = ({ expense }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const { expenses, singleExpense } = useSelector((store) => store.expense);

    const [formData, setFormData] = useState({
        description: singleExpense?.description || '',
        amount: singleExpense?.amount || '',
        category: singleExpense?.category || '',
    });

    useEffect(() => {
        if (singleExpense) {
            setFormData({
                description: singleExpense.description || '',
                amount: singleExpense.amount || '',
                category: singleExpense.category || '',
            });
        }
    }, [singleExpense]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Updating Expense:", formData);

        try {
            setLoading(true);
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/expense/update/${expense._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                // Update state with new expense data
                const updatedExpenses = expenses.map(exp => exp._id ===expense._id ? res.data.expense : exp);
                dispatch(setExpenses(updatedExpenses));

                toast.success(res.data.message);
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => {
                    dispatch(setSingleExpense(expense));
                    setIsOpen(true);
                }} size="icon" className='rounded-full border border-green-600 text-green-600 hover:border-transparent' variant="outline">
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Expense</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
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
                            <Label htmlFor="amount" className="text-right">Amount</Label>
                            <Input
                                id="amount"
                                placeholder="xxx in ₹"
                                className="col-span-3"
                                name="amount"
                                value={formData.amount}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <Select value={formData.category} onValueChange={changeCategoryHandler}>
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
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className='mr-2 h-4 animate-spin' /> : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateExpense;
