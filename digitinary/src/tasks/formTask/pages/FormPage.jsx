import React, { useEffect } from "react";
import Button from "../../../reusableComponent/button";
import FormInput from "../../../reusableComponent/formInput";
import useFormValidation from "../../../reusableComponent/formValidationHook";
import { validationRules } from "../../../reusableComponent/validationRules";

const RegistrationForm = () => {
  // Initial state for the form fields (empty by default)
  const initialState = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    country: "",
    agreeToTerms: false,
  };

  // Validation rules applied to each form field
  const registrationValidationRules = {
    name: validationRules.name,
    email: validationRules.email,
    password: validationRules.password,
    phoneNumber: validationRules.phoneNumber,
    age: validationRules.age,
    country: validationRules.country,
  };

  // Hook to handle form validation and data updates
  const {
    formData,
    formErrors,
    handleChange,
    setFormData,
    hasErrors,
  } = useFormValidation(initialState, registrationValidationRules);

  // State to show the success or error message after form submission
  const [submitMessage, setSubmitMessage] = React.useState("");

  // useEffect hook to load saved data from localStorage (if exists)
  useEffect(() => {
    const loadSavedData = () => {
      const savedFormData = localStorage.getItem("registrationData");
      if (savedFormData) {
        try {
          // Parse and set the saved form data
          const parsedData = JSON.parse(savedFormData);
          setFormData(parsedData);
        } catch (error) {
          console.error("Error parsing saved form data:", error);
        }
      }
    };

    // Load saved data on component mount
    loadSavedData();
  }, [setFormData]);

  // Function to save form data to localStorage
  const saveToLocalStorage = (data) => {
    try {
      const existingData = localStorage.getItem("registrationSubmissions");
      let submissions = existingData ? JSON.parse(existingData) : [];

      // Push new submission data with the current date
      submissions.push({
        ...data,
        submissionDate: new Date().toISOString(),
      });

      // Save the updated submissions and form data to localStorage
      localStorage.setItem("registrationSubmissions", JSON.stringify(submissions));
      localStorage.setItem("registrationData", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (!hasErrors()) {
      const saved = saveToLocalStorage(formData);

      if (saved) {
        // If saving is successful, show a success message
        setSubmitMessage("Registration successful! Your information has been saved.");
        setFormData(initialState); // Reset form fields
      } else {
        // If there is an error saving the data, show an error message
        setSubmitMessage("Error saving your information. Please try again.");
      }
    }
  };

  // Options for the country select input
  const countries = [
    { value: "us", label: "Jordan" },
    { value: "uk", label: "KSA" },
    { value: "ca", label: "Syria" },
    { value: "au", label: "Lebia" },
    { value: "de", label: "USA" },
  ];

  // Determine if the form is valid (all fields are filled and no errors)
  const isFormValid = Object.values(formData).every((value) => value !== "") && !hasErrors();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>

      {/* Display a success or error message after form submission */}
      {submitMessage && (
        <div
          className={`mb-4 p-3 rounded ${
            submitMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

      {/* Input fields */}
      <FormInput
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={formErrors.name}
        required
      />

      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
        required
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
        required
      />

      <FormInput
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={formErrors.phoneNumber}
        required
      />

      <FormInput
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        error={formErrors.age}
        required
        min="18"
        max="65"
      />

      <FormInput
        label="Country"
        name="country"
        type="select"
        value={formData.country}
        onChange={handleChange}
        error={formErrors.country}
        required
        options={countries}
      />

      {/* The submit button stays visible but will be disabled until all fields are valid */}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={!isFormValid}  // Button is disabled if the form is not valid
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
