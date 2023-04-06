import React, { useState } from "react";
import { Tabs } from "antd";
import PricingSections from "./PricingSections";

const { TabPane } = Tabs;

const InsuranceTabs = () => {
  const [activeKey, setActiveKey] = useState("normal");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="my-10 flex justify-center">
      <Tabs activeKey={activeKey} onChange={handleTabChange} centered>
        <TabPane key="normal" tab="Normal Level">
          <PricingSections level="normal" />
        </TabPane>
        <TabPane key="advanced" tab="Advanced Level">
          <PricingSections level="advanced" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InsuranceTabs;
