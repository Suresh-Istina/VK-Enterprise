import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./DashboardStyles.css";

const Dashboard = () => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [checkedInBookings, setCheckedInBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  const bookingsChartRef = useRef(null);
  const employeesChartRef = useRef(null);
  const customersChartRef = useRef(null);

  const fetchCurrentBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/booked/bookings", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentBookings(data);
      } else {
        console.error("Failed to fetch current bookings");
      }
    } catch (error) {
      console.error("Error fetching current bookings:", error);
    }
  };

  const fetchCheckedInBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:5000/checked-in/bookings",
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCheckedInBookings(data);
      } else {
        console.error("Failed to fetch checked-in bookings");
      }
    } catch (error) {
      console.error("Error fetching checked-in bookings:", error);
    }
  };

  const fetchCompletedBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/completed/bookings", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCompletedBookings(data);
      } else {
        console.error("Failed to fetch completed bookings");
      }
    } catch (error) {
      console.error("Error fetching completed bookings:", error);
    }
  };

  const fetchCustomerCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/customers", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomerCount(data.length);
      } else {
        console.error("Failed to fetch customer count");
      }
    } catch (error) {
      console.error("Error fetching customer count:", error);
    }
  };

  const fetchEmployeeCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/employees", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeeCount(data.length);
      } else {
        console.error("Failed to fetch employee count");
      }
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  useEffect(() => {
    fetchCurrentBookings();
    fetchCheckedInBookings();
    fetchCompletedBookings();
    fetchCustomerCount();
    fetchEmployeeCount();
  }, []);

  useEffect(() => {
    if (bookingsChartRef.current !== null) {
      const ctx = bookingsChartRef.current.getContext("2d");
      if (ctx) {
        if (bookingsChartRef.current.chart) {
          bookingsChartRef.current.chart.destroy();
        }
        bookingsChartRef.current.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Current Bookings",
              "Checked-In Bookings",
              "Completed Bookings",
            ],
            datasets: [
              {
                label: "Bookings",
                data: [
                  currentBookings.length,
                  checkedInBookings.length,
                  completedBookings.length,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [currentBookings, checkedInBookings, completedBookings]);

  useEffect(() => {
    if (employeesChartRef.current !== null) {
      const ctx = employeesChartRef.current.getContext("2d");
      if (ctx) {
        if (employeesChartRef.current.chart) {
          employeesChartRef.current.chart.destroy();
        }
        employeesChartRef.current.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Employees"],
            datasets: [
              {
                label: "Employees",
                data: [employeeCount],
                backgroundColor: ["rgba(75, 192, 192, 0.5)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [employeeCount]);

  useEffect(() => {
    if (customersChartRef.current !== null) {
      const ctx = customersChartRef.current.getContext("2d");
      if (ctx) {
        if (customersChartRef.current.chart) {
          customersChartRef.current.chart.destroy();
        }
        customersChartRef.current.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Customers"],
            datasets: [
              {
                label: "Customers",
                data: [customerCount],
                backgroundColor: ["rgba(153, 102, 255, 0.5)"],
                borderColor: ["rgba(153, 102, 255, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [customerCount]);

  return (
    <div className="admin-bg">
      <div className="admin-dashboard">
        <p className="admin-p">Admin Dashboard</p>
        <div className="card1-container">
          <div className="card1">
            <h3 className="admin-h3">Booking Summary</h3>
            <canvas
              ref={bookingsChartRef}
              id="bookings-chart"
              className="canvas-style"
            ></canvas>
          </div>
        </div>
        <div className="card1-container">
          <div className="card1">
            <h3 className="admin-h">Total Employees</h3>
            <canvas
              ref={employeesChartRef}
              id="employees-chart"
              className="canvas-style"
            ></canvas>
          </div>
          <div className="card1">
            <h3 className="admin-h">Total Customers</h3>
            <canvas
              ref={customersChartRef}
              id="customers-chart"
              className="canvas-style"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
