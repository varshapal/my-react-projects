import classes from "./Expense.module.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-slice";
import { themeActions } from "../store/theme-slice";

const Expense = () => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses);
  const total = useSelector((state) => state.expense.total);
  const show = useSelector((state) => state.expense.showData);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const [formData, setFormData] = useState({
    price: "",
    description: "",
    category: "Food",
  });
  const [expenseList, setExpenseList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [Id, setId] = useState(null);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const expenses = {
      price: formData.price,
      description: formData.description,
      category: formData.category,
    };

    const response = await fetch(
      "https://react-http-9242d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setFormData({ price: "", description: "", category: "Food" });

    // //get Data

    const getRequest = await fetch(
      "https://react-http-9242d-default-rtdb.firebaseio.com/expenses.json"
    );
    const getData = await getRequest.json();
    console.log("get", getData);

    dispatch(expenseActions.addExpense(expenses));
    dispatch(expenseActions.total(Number(formData.price)));
    dispatch(expenseActions.showData());
  };

  //theme handler

  const themeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  //download CSV file
  const downloadHandler = () => {
    const csvData = convertToCSV(expense);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const convertToCSV = (expense) => {
    console.log(expense);
    const headers = Object.keys(expense[0]).join(",");
    const rows = expense.map((obj) => Object.values(obj).join(",")).join("\n");
    return `${headers}\n${rows}`;
  };

  return (
    <section className={classes.expense}>
      <div
        className={isDarkTheme ? classes["dark-theme"] : classes["light-theme"]}
      >
        <form onSubmit={submitHandler}>
          <label>
            Expense
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={inputChangeHandler}
            />
          </label>
          <label>
            Expense Description
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={inputChangeHandler}
            />
          </label>
          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={inputChangeHandler}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="salary">Salary</option>
            </select>
          </label>
          <label>
            Total Expense: <span>{total}</span>
          </label>
          <button type="submit">Add Expense</button>
        </form>
        {total > 10000 && <button onClick={themeHandler}>Activate Premium</button>}
        <h3>Expense List</h3>
        <p>
          <strong>Price - Description - Category</strong>
        </p>

        {expense.map((item) => (
          <p key={item.id}>
            {item.price} - {item.description} - {item.category}
          </p>
        ))}

        {isDarkTheme && (
          <button onClick={downloadHandler}>Download CSV file</button>
        )}
      </div>
    </section>
  );
};

export default Expense;
