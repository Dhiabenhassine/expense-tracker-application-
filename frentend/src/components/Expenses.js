import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const Expenses = () => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({});
  useEffect(() => {
    fetchData();
  }, [open, openAdd]);
  const fetchData = async () => {
    const allExpenses = await axios.get(
      "http://127.0.0.1:8080/home/getExpense"
    );
    console.log(allExpenses.data);
    setExpenses(
      allExpenses.data.map((expense) => {
        return { ...expense, id: expense._id };
      })
    );
  };
  const columns = [
    { field: "title", headerName: "Title", width: 180 },
    { field: "amount", headerName: "Amount", width: 180 },
    { field: "date", headerName: "Date", width: 180 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            onClick={() => {
              setExpense(params.row);
              setOpen(true);
            }}
          >
            Update
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="error"
            onClick={async () => {
              await axios.delete(
                `http://127.0.0.1:8080/home/deleteExpense/${params.row._id}`
              );
              fetchData();
            }}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setExpense((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Typography paragraph>
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={() => {
          setExpense({
            title: "",
            amount: "",
            category: "",
            description: "",
            date: "",
          });
          setOpenAdd(true);
        }}
      >
        Add Expense
      </Button>
      <DataGrid rows={expenses} columns={columns} autoHeight={true} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <input
            type="text"
            name="title"
            value={expense.title}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="amount"
            value={expense.amount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="date"
            value={expense.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleInputChange}
          />
          <br></br>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            onClick={async () => {
              await axios.put(
                "http://127.0.0.1:8080/home/updateExpense",
                expense
              );
              setOpen(false);
            }}
          >
            Update
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
        </Box>
      </Modal>
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box sx={style}>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={expense.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="date"
            value={expense.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleInputChange}
          />
          <br></br>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            onClick={async () => {
              await axios.post(
                "http://127.0.0.1:8080/home/addExpense",
                expense
              );
              setOpenAdd(false);
            }}
          >
            Add
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="error"
            onClick={() => setOpenAdd(false)}
          >
            cancel
          </Button>
        </Box>
      </Modal>
    </Typography>
  );
};
