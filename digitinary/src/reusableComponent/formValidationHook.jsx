import { useState } from 'react';

const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(
    Object.keys(initialState).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  // Updated validateField function to handle array or single rule
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return "";

    // Handle both array of rules and single rule
    const ruleArray = Array.isArray(rules) ? rules : [rules];
    
    for (const rule of ruleArray) {
      const errorMessage = rule(value, name);
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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(fieldName => {
      const errorMessage = validateField(fieldName, formData[fieldName]);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
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
    validateForm
  };
};

export default useFormValidation;