import React from "react";

export const DropMenu = ({ isOpen, children }) => {
  return (
    <div className="w-full min-h-14 absolute z-10 top-10 left-0  ">
      {children}
    </div>
  );
};
