import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const FindCustomer = () => {
  const [customers, setCustomers] = useState([]);

  // Function to fetch customers data from the server
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(" http://localhost:5000/customers", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="emp-bg">
      <p>Customer Details</p>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>NIC</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.nic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindCustomer;
