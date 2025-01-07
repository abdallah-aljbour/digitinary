// import React from "react";

// const Button = ({
//   children,
//   variant = "default",
//   size = "medium",
//   disabled = false,
//   className = "",
//   onClick,
//   type = "button",
// }) => {
//   // Base styles
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

//   // Variant styles
//   const variants = {
//     default: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
//     primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
//     secondary:
//       "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-900",
//     danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
//     outline:
//       "border-2 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-900",
//     ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-900",
//   };

//   // Size styles
//   const sizes = {
//     small: "px-3 py-1.5 text-sm",
//     medium: "px-4 py-2 text-base",
//     large: "px-6 py-3 text-lg",
//   };

//   // Disabled styles
//   const disabledStyles = disabled
//     ? "opacity-50 cursor-not-allowed"
//     : "cursor-pointer";

//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
//       onClick={disabled ? undefined : onClick}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
import React from "react";

const Button = ({
  children,
  className = "",
  as: Component = "button", //to accept links
  type = "button",
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <Component
      type={Component === "button" ? type : undefined}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
