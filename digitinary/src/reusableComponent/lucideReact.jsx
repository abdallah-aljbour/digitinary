import * as LucideIcons from "lucide-react";

const Icon = ({ name, color, size }) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
