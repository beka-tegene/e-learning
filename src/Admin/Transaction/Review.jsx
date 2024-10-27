import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { back_base_url } from "../../util/config";

const Review = () => {
  const [payment, setPayment] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    response(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);
  const response = async (page, limit) => { 
    axios.defaults.withCredentials = true;
    await axios
      .get(`${back_base_url}payment?page=${page}&limit=${limit}`)
      .then((data) => {
        setPayment(data.data.payments);
        setTotalRows(data.data.totalPayments);
        console.log(data);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
    response(page, newPerPage);
  };
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row?.customerName,
      sortable: true,
      width:"160px"
    },
    {
      name: "Email",
      selector: (row) => row.emailAddress,
      sortable: true,
      width:"160px"
    },
    {
      name: "Course Name",
      selector: (row) =>
        row?.orderID?.orderItems[0]?.product === null
          ? ""
          : row?.orderID?.orderItems[0]?.product?.courseName?.slice(0 , 50),
      sortable: true,
      width:"300px"
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      sortable: true,
      width:"150px"
    },
    {
      name: "Amount",
      selector: (row) => row.amount + " ETB",
      sortable: true,
      width:"160px"
    },
  ];

  const filteredStudents = payment?.filter((student) =>
    student.customerName.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleRowClick =(row)=>{
    window.location.href = `/admin/transaction/${row._id}`
  }
  return (
    <div style={{ padding: "20px", height: "87vh", overflowY: "scroll" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: "0" }}>Transaction List</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              marginRight: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        highlightOnHover
        responsive
        selectableRows
        selectableRowsHighlight
        onRowClicked={handleRowClick}
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#f2f2f2",
            },
          },
          headCells: {
            style: {
              color: "#333",
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          rows: {
            style: {
              borderBottomColor: "#f2f2f2",
              cursor:"pointer"
            },
          },
        }}
      />
    </div>
  );
};

export default Review;
