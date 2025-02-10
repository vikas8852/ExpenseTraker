import { setExpenses } from "@/redux/expenseSlice";
import { baseUrl } from "@/Urls";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { baseUrl } from "@/Urls";

const useGetExpenses = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((store) => store.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials = true;
        //console.log(`Fetching Expenses: Category=${category}, Done=${markAsDone}`); // ✅ API Debug

        const res = await axios.get(
          `${baseUrl}/api/v1/expense/getall?category=${category}&done=${markAsDone}`
        );

       // console.log("🚀 API Response:", res.data); // ✅ Debug API data

        if (res.data.success && res.data.expenses) {
          //  console.log("✅ Dispatching to Redux:", res.data.expenses);
            dispatch(setExpenses(res.data.expenses)); // Correct key "expenses"
          }
           else {
          console.log(" No expenses found.");
        }
      } catch (err) {
        console.error(" Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, [dispatch, category, markAsDone]); // ✅ Fix dependencies

  return null;
};

export default useGetExpenses;
