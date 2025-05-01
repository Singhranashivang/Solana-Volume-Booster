import * as React from "react";

export interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ title, description, duration = 3000 }) => {
  return (
    <div className="bg-black text-white p-4 rounded-md shadow-md">
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
};
