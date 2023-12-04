import React, { useState } from "react";

interface TabHeaderProps {
  tabLabels: string[];
  onTabChange: (tabIndex: number) => void;
}

const TabHeader: React.FC<TabHeaderProps> = (props) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    props.onTabChange(tabIndex);
  };

  return (
    <div className="tab-header">
      {props.tabLabels.map((label, index) => (
        <div
          key={index}
          className={`tab-label ${index === activeTab ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
        >
          <span className="my-auto">{label}</span>
        </div>
      ))}
    </div>
  );
};
export default TabHeader;
