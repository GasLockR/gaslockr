import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Modal, Input, Form } from "antd";
import useWeb3Provider from "../hooks/useWeb3Provider";

const NormalClaims = () => {
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
    // normal amount -> max coverage
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
          <Button
            disabled={record.status !== "Active"}
            onClick={() => handleClaim(record.insuredAddress)}
          >
            Claim
          </Button>
        </Space>
      ),
    },
  ];

  const { provider, signer, contract } = useWeb3Provider();
  const [policiesData, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const [form] = Form.useForm();

  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    txHash: "",
    amount: "",
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!signer || !contract) return;

  //     setLoading(true);

  //     try {
  //       const address = await signer.getAddress();
  //       const userOrderData = await contract.userOrder(address);

  //       // 将userOrderData转换为与表格兼容的格式
  //       const formattedData = [
  //         {
  //           id: 1,
  //           insuredAddress: address,
  //           policyType: "7 Days",
  //           maxCoverage: userOrderData.maxValue,
  //           fluctuation: userOrderData.triggerValue,
  //           // 其他属性...
  //         },
  //       ];

  //       setPolicies(formattedData);
  //       message.success("Data fetched successfully!");
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       message.error("Error fetching data. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [signer, contract]);

  const handleClaimModalCancel = () => {
    setClaimModalVisible(false);
  };

  const handleClaimModalConfirm = async () => {
    setClaimLoading(true);
    try {
      const values = await form.validateFields();
      console.log("Claim form data:", values);

      // 如果验证通过，关闭模态框并执行其他操作
      handleClaimModalCancel();
    } catch (error) {
      console.error("Form validation failed:", error);
    }

    console.log(claimFormData);
    // setClaimLoading(false);
    // setClaimModalVisible(false);
  };

  const handleClaim = () => {
    setClaimModalVisible(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Normal Claims</h1>
      <Table
        columns={columns}
        dataSource={policies}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="Claim Information"
        open={claimModalVisible}
        onCancel={handleClaimModalCancel}
        footer={[
          <Button key="cancel" onClick={handleClaimModalCancel}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleClaimModalConfirm}
            className=" bg-indigo-600 text-white rounded-md font-semibold"
          >
            Confirm
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={claimFormData}
          onValuesChange={(_, values) => setClaimFormData(values)}
        >
          <Form.Item
            label="Transaction Hash"
            name="txHash"
            rules={[
              { required: true, message: "Please input transaction hash!" },
            ]}
          >
            <Input placeholder="Enter transaction hash" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <Input placeholder="Enter amount" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NormalClaims;
