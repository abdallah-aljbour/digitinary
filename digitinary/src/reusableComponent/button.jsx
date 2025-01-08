import React from "react";

const Button = ({
  children,
  className = "",
  as: Component = "button", // to accept links or any other element
  type = "button", // button type (default is 'button')
  disabled = false, // whether button is disabled
  onClick, // onClick handler
  ...props // Any other props passed to the button (e.g. 'href' for Link)
}) => {
  return (
    <Component
      type={Component === "button" ? type : undefined} // Set the 'type' if it’s a <button>
      disabled={disabled} // Apply disabled status
      onClick={disabled ? undefined : onClick} // Disable onClick when disabled
      className={className} // Custom styling via className
      {...props} // Spread any other props onto the component (like 'to' for Link)
    >
      {children} {/* Render content inside the button */}
    </Component>
  );
};

export default Button;

