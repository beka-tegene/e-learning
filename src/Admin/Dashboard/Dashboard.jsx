import React, { useEffect, useState } from "react";
import LineCharts from "./LineChart";
import PieCharts from "./PieCharts";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserInstructorData } from "../../Store/Hooks/UserHook";
import { MdArrowUpward, MdDownload } from "react-icons/md";
import { back_base_url } from "../../util/config";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const [students, setStudents] = useState([]);
  const [payment, setPayment] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [timeRange, setTimeRange] = useState("Daily");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/users/getallusers?&role=user`
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getInstructor = useSelector(
    (state) => state.UserHook.OutputUsersInstructor
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInstructorData());
  }, [dispatch]);

  const [totalCourses, setTotalCourses] = useState(1);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {});
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}api/v1/users/getallusers?&role=tutorinstructor`);
        setTutor(data.totalInstructors);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          `${back_base_url}api/v1/contact/contacts`
        );
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${back_base_url}payment`);
        setPayment(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row?.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Work Email",
      selector: (row) => row?.workEmail,
      sortable: true,
    },
  ];

  const summaryData = [
    {
      title: "Students",
      number: students?.totalUsers,
      path: "/admin/student_list",
    },
    {
      title: "Teachers",
      number: getInstructor?.instructors?.length,
      path: "/admin/teacher_list",
    },
    {
      title: "Tutor",
      number: tutor,
      path: "/admin/tutor_list",
    },
    {
      title: "Courses",
      number: totalCourses,
      path: "/admin/course_list",
    },
    {
      title: "Amount",
      number: payment?.totalAmount,
      path: "/admin/transaction_list",
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Fetch data based on the selected time range
    // Implement your logic here
  };

  const PdfDocument = () => (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Dashboard Report</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          {summaryData.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.title}: {item.number}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Contacts</Text>
          {contacts.slice(0, 3).map((contact, index) => (
            <Text key={index} style={styles.text}>
              {contact.firstName} {contact.lastName} - {contact.workEmail}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div
      style={{
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "10px",
        height: "87vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => handleTimeRangeChange("Daily")}
            style={{
              padding: "4px 28px",
              borderRadius: "8px",
              background: timeRange === "Daily" ? "#0000FFC0" : "#EEEEEE",
              color: timeRange === "Daily" ? "white" : "black",
            }}
          >
            Daily
          </button>
          <button
            onClick={() => handleTimeRangeChange("Monthly")}
            style={{
              padding: "4px 28px",
              borderRadius: "8px",
              background: timeRange === "Monthly" ? "#0000FFC0" : "#EEEEEE",
              color: timeRange === "Monthly" ? "white" : "black",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => handleTimeRangeChange("Yearly")}
            style={{
              padding: "4px 28px",
              borderRadius: "8px",
              background: timeRange === "Yearly" ? "#0000FFC0" : "#EEEEEE",
              color: timeRange === "Yearly" ? "white" : "black",
            }}
          >
            Yearly
          </button>
        </div>
        <PDFDownloadLink document={<PdfDocument />} fileName="dashboard_report.pdf">
          {({ loading }) => (
            <button
              style={{
                padding: "4px 28px",
                background: "#00EE70",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                borderRadius: "8px",
                color: "white",
              }}
              disabled={loading}
            >
              <MdDownload />
              {loading ? "Loading..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div>
        <h5>Summary</h5>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
            height: "120px",
          }}
        >
          {summaryData.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#F1EDF7",
                padding: "15px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => navigate( item.path)}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {item.number}
                <span style={{ fontSize: "11px" }}>
                  {item.title === "Amount" ? " ETB" : "+"}
                </span>
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.title}</span>
                <span
                  style={{
                    background: "#62F8Ed",
                    padding: "0 5px",
                    fontSize: "11px",
                    borderRadius: "5px",
                  }}
                >
                  <MdArrowUpward style={{ fontSize: "14px" }} /> 10%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: !isMobile ? "2fr 1fr" : "",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", height: "45vh" }}
          >
            <h5>Report Summary</h5>
            <LineCharts timeRange={timeRange} />
          </div>
          <div>
            <h5>Report Summary</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                height: "45vh",
              }}
            >
              <PieCharts timeRange={timeRange} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Contact Table</h5>
        <DataTable
          columns={columns}
          data={contacts.slice(0, 3)}
          highlightOnHover
          responsive
          selectableRows
          selectableRowsHighlight
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
                borderBottomColor: "#f2f2f2",cursor:"pointer"
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default Dashboard;
