import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mt-20">{children}</div>;
};

export default Container;
