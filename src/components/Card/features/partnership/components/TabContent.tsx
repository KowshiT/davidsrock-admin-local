import React from "react";

interface TabContentProps {
  active: boolean;
  className?: string;
}

const TabContent: React.FC<TabContentProps> = (props) => {
  return (
    <div
      className={`tab-content ${props.className} ${
        props.active ? "active" : ""
      }`}
    >
      {/* Filter controls go here */}
    </div>
  );
};

export default TabContent;
