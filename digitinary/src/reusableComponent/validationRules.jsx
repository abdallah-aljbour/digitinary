// validationRules.js
export const validationRules = {
  // Original rules
  name: [
    (value) => (!value.trim() ? "Name is required." : ""),
    (value) =>
      value.trim().length < 8 ? "Name must be at least 8 characters." : "",
  ],
  email: [
    (value) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailRegex.test(value) ? "Please enter a valid email." : "";
    },
  ],
  password: [
    (value) =>
      value.length < 6 ? "Password must be at least 6 characters long." : "",
    (value) =>
      !/[A-Z]/.test(value)
        ? "Password must contain at least one uppercase letter."
        : "",
    (value) =>
      !/[a-z]/.test(value)
        ? "Password must contain at least one lowercase letter."
        : "",
    (value) =>
      !/[0-9]/.test(value) ? "Password must contain at least one number." : "",
    (value) =>
      !/[!@#$%^&*(),.?":{}|<>]/.test(value)
        ? "Password must contain at least one special character."
        : "",
  ],

  // Added registration-specific rules
  phoneNumber: [
    (value) => (!value ? "Phone number is required" : ""),
    (value) => (!/^\d{10}$/.test(value) ? "Phone number must be exactly 10 digits" : ""),
  ],
  age: [
    (value) => (!value ? "Age is required" : ""),
    (value) => {
      const age = parseInt(value);
      return (isNaN(age) || age < 18 || age > 65) ? "Age must be between 18 and 65" : "";
    },
  ],
  country: [
    (value) => (!value ? "Please select a country" : ""),
  ],

  // Product-specific rules (keeping these for other use cases)
  title: [
    (value) => (!value.trim() ? "Title is required." : ""),
    (value) =>
      value.trim().length < 3 ? "Title must be at least 3 characters." : "",
  ],
  price: [
    (value) => (!value ? "Price is required." : ""),
    (value) => (isNaN(value) ? "Price must be a number." : ""),
    (value) => (Number(value) <= 0 ? "Price must be greater than 0." : ""),
    (value) =>
      Number(value) > 1000000 ? "Price cannot exceed 1,000,000." : "",
  ],
  description: [
    (value) => (!value.trim() ? "Description is required." : ""),
    (value) =>
      value.trim().length < 10
        ? "Description must be at least 10 characters."
        : "",
    (value) =>
      value.trim().length > 500
        ? "Description cannot exceed 500 characters."
        : "",
  ],
  imageUrl: [
    (value) => (!value.trim() ? "Image URL is required." : ""),
    (value) => {
      const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
      return !urlRegex.test(value)
        ? "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif, or .webp)"
        : "";
    },
  ],
};

