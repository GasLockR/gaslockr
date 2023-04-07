import React from "react";
import { Table, Button, Space } from "antd";

const AdvanceClaims = () => {
  const policies = [
    {
      id: 1,
      insuredAddress: "0xAbC12345dEf67890GhI12345jKl67890",
      policyType: "7 Days",
      maxCoverage: 0.1,
      fluctuation: 5,
      status: "Active",
      targetGasPrice: 150,
      purchaseDate: "2023-03-01",
      endDate: "2023-03-08",
    },
    {
      id: 2,
      insuredAddress: "0xAbC12345dEf67890GhI12345jKl67899",
      policyType: "15 Days",
      maxCoverage: 0.3,
      fluctuation: 10,
      status: "Expired",
      targetGasPrice: 120,
      purchaseDate: "2023-03-01",
      endDate: "2023-03-08",
    },
    {
      id: 3,
      insuredAddress: "0xAbC12345dEf67890GhI12345jKl67888",
      policyType: "30 Days",
      maxCoverage: 1,
      fluctuation: 15,
      status: "Active",
      targetGasPrice: 100,
      purchaseDate: "2023-03-01",
      endDate: "2023-03-08",
    },
  ];

  const columns = [
    {
      title: "Insured Address",
      dataIndex: "insuredAddress",
      key: "insuredAddress",
      render: (text) => (
        <Button
          type="link"
          onClick={() => {
            navigator.clipboard.writeText(text);
          }}
        >
          {`${text.slice(0, 4)}...${text.slice(-4)}`}
        </Button>
      ),
    },
    {
      title: "Policy Type",
      dataIndex: "policyType",
      key: "policyType",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    // advanced amount remove, add a column of real-time coverage
    {
      title: "Max Coverage",
      dataIndex: "maxCoverage",
      key: "maxCoverage",
      render: (text) => `${text} ETH`,
    },
    {
      title: "Target Gas Price",
      dataIndex: "targetGasPrice",
      key: "targetGasPrice",
      render: (text) => `${text} Gwei`,
    },
    {
      title: "Fluctuation",
      dataIndex: "fluctuation",
      key: "fluctuation",
      render: (text) => `${text}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Claim",
      key: "claim",
      render: (_, record) => (
        <Space size="middle">
          {/* input address/ block.number */}
          <Button disabled={record.status !== "Active"}>Claim</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Advance Claims</h1>
      <Table columns={columns} dataSource={policies} rowKey="id" />
    </div>
  );
};

export default AdvanceClaims;
