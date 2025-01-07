import { useState } from "react";

const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(
    Object.keys(initialState).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return "";

    for (const rule of rules) {
      const errorMessage = rule(value, formData);
      if (errorMessage) return errorMessage;
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const hasErrors = () =>
    Object.values(formErrors).some((error) => error !== "");

  return {
    formData,
    formErrors,
    handleChange,
    setFormData,
    setFormErrors,
    hasErrors,
  };
};

export default useFormValidation;
