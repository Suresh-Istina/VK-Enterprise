import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import SignUpForm from "../SignUpForm";

//testing if the componenet is working correctly when user enters all the fields correctly
// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ msg: "Success message" }),
    ok: true,
  })
);

describe("SignUpForm Integration", () => {
  it("should submit form data and display success message", async () => {
    // Mock the alert function
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    const { getByLabelText, getByText } = render(
      <Router>
        <SignUpForm />
      </Router>
    );
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const nicInput = getByLabelText("NIC");
    const mobileInput = getByLabelText("Mobile");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");
    const submitButton = getByText("Sign Up");

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "Mary Anne" } });
    fireEvent.change(emailInput, { target: { value: "mary@gmail.com" } });
    fireEvent.change(nicInput, { target: { value: "123456789V" } });
    fireEvent.change(mobileInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "123" },
    });

    // Click the submit button
    fireEvent.click(submitButton);

    // Wait for alert to be called
    await waitFor(() => expect(mockAlert).toHaveBeenCalled());

    // Assert that the alert message is correct
    expect(mockAlert).toHaveBeenCalledWith("Success message");

    // Restore the original alert function
    mockAlert.mockRestore();
  });
});
