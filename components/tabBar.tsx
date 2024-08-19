import React, { useState } from "react";

type Props = {
  tabBarOptions: {
    tabName: string;
    content: JSX.Element;
  }[];
};

const TabBar: React.FC<Props> = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <div className="inset-0 bg-white z-50">
        <div style={{ display: "flex", cursor: "pointer" }}>
          {props.tabBarOptions.map((option, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center w-full ${
                activeTab == index
                  ? "border-b-blue-500 border-b-2"
                  : "border-none"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm mb-2">{option.tabName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">{props.tabBarOptions[activeTab]?.content}</div>
    </div>
  );
};

export default TabBar;
