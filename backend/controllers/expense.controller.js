import { Expense } from "../models/expense.model.js";
export const addExpense=async(req,res)=>{
    try{
        const{description,amount,category}=req.body;
        const userId=req.id;
        if(!description || !amount ||!category ){
            return res.status(400).json({
                message:"All fields are require vikas",
                success:false
            })
          }
       const expense=await Expense.create({
        description,
        amount,
        category,
        userId
       })
       return res.status(200).json({
        message:"New expense Added",
        expense,
        success:true
    })

    }
    catch(err){
        return res.status(400).json({
            message:"Ntwork err",
            success:false
    })
}
}
export const getAllExpense = async (req, res) => {
    try {
        const userId = req.id; // Get logged-in user ID

        let category = req.query.category || "";
        let done = req.query.done || ""; // Fix query parameter for done

        const query = { userId }; // Filter by userId

        if (category.toLowerCase() !== "all") {
            query.category = { $regex: category, $options: 'i' }; // Fix typo in `$options`
        }

        if (done.toLowerCase() === "done") {
            query.done = true;
        } else if (done.toLowerCase() === "undone") {
            query.done = false; // Filter for expenses marked as pending
        }

        const expenses = await Expense.find(query);

        if (!expenses.length) {
            return res.status(404).json({
                message: "No expenses found",
                success: false
            });
        }

        return res.status(200).json({
            expenses,
            success: true
        });

    } catch (err) {
        console.error("Error fetching expenses:", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const markAsDoneOrUndone=async(req,res)=>{
    try{
        const expenseId=req.params.id;
        const done=req.body;
        const expense=await Expense.findByIdAndUpdate(expenseId,done,{new:true});
        if(!expense){
            return res.status(404).json({
                message:" Expense not  found",
                success:false
            })

        }
        return res.status(200).json({
            message:`Expense marked as ${expense.done?'done':'undone'}.`,
            success:true
        })

    }catch(err){
        console.log(err);
    }
}
export const removExpense=async(req,res)=>{
    try{
    const expenseId=req.params.id;
    await Expense.findByIdAndDelete(expenseId);
    return res.status(200).json({
        message:"Expense removed",
        success:true
    })

    }
    catch(err){
        console.log(err);
    }
}
export const updateExpense=async(req,res)=>{
    try{
        const{description,amount,category}=req.body;
        const expenseId=req.params.id;
        const updateData={description,amount,category}
        const expense=await Expense.findByIdAndUpdate(expenseId,updateData,{new:true});
        return res.status(200).json({
            message:"Expense upDated",
            expense,
            success:true
        })

    }
    catch(err){
        console.log(err);
    }
}