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
export const Income = () => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [income, setIncome] = useState({});
  useEffect(() => {
    fetchData();
  }, [open, openAdd]);
  const fetchData = async () => {
    const allIncomes = await axios.get("http://127.0.0.1:8080/home/getIncome");
    console.log(allIncomes.data);
    setIncomes(
      allIncomes.data.map((income) => {
        return { ...income, id: income._id };
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
              setIncome(params.row);
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
                `http://127.0.0.1:8080/home/deleteIncome/${params.row._id}`
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
    setIncome((prevFormData) => ({
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
          setIncome({
            title: "",
            amount: "",
            category: "",
            description: "",
            date: "",
          });
          setOpenAdd(true);
        }}
      >
        Add Income
      </Button>
      <DataGrid rows={incomes} columns={columns} autoHeight={true} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <input
            type="text"
            name="title"
            value={income.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            value={income.amount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="date"
            value={income.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            value={income.category}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            value={income.description}
            onChange={handleInputChange}
          />
          <br></br>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            onClick={async () => {
              await axios.put(
                "http://127.0.0.1:8080/home/updateIncome",
                income
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
            value={income.title}
            onChange={handleInputChange}
          />
          <input
            placeholder="Amount"
            type="number"
            name="amount"
            value={income.amount}
            onChange={handleInputChange}
          />
          <input
            placeholder="Date"
            type="text"
            name="date"
            value={income.date}
            onChange={handleInputChange}
          />
          <input
            placeholder="Category"
            type="text"
            name="category"
            value={income.category}
            onChange={handleInputChange}
          />
          <input
            placeholder="Description"
            type="text"
            name="description"
            value={income.description}
            onChange={handleInputChange}
          />
          <br></br>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            onClick={async () => {
              await axios.post("http://127.0.0.1:8080/home/addIncome", income);
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
