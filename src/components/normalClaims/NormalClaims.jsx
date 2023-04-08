import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Modal, Input, Form } from "antd";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { useCalculateAmount } from "../hooks/useCalculateAmount";
import _ from "lodash";
import moment from "moment";

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
    // {
    //   title: "Insured Address",
    //   dataIndex: "insuredAddress",
    //   key: "insuredAddress",
    //   render: (text) => (
    //     <Button
    //       type="link"
    //       onClick={() => {
    //         navigator.clipboard.writeText(text);
    //       }}
    //     >
    //       {`${text.slice(0, 4)}...${text.slice(-4)}`}
    //     </Button>
    //   ),
    // },
    {
      title: "Policy Type",
      dataIndex: "policyType",
      key: "policyType",
    },
    {
      title: "Max Coverage",
      dataIndex: "maxCoverage",
      key: "maxCoverage",
      render: (text) => `${text} ETH`,
    },
    {
      title: "Min Fluctuation",
      dataIndex: "minFluctuation",
      key: "minFluctuation",
      render: (text) => `${text}%`,
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
            onClick={() =>
              handleClaim(record.insuredAddress, record.policyType)
            }
          >
            Claim
          </Button>
        </Space>
      ),
    },
  ];

  const { provider, signer, contract } = useWeb3Provider();
  const [policiesData, setPolicies] = useState();
  const [loading, setLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [confirLoading, setConfirLoading] = useState(false);
  const { calculateAmount, result, error } = useCalculateAmount();

  const [selectedUserAddress, setSelectedUserAddress] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState(null);

  const [form] = Form.useForm();

  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    txHash: "",
    amount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!signer || !contract) return;

      setLoading(true);

      try {
        const address = await signer.getAddress();
        const userOrderData = await contract.userOrder(address);
        console.log(userOrderData, "userOrderData");

        // id: 1,
        // insuredAddress: address,
        // policyType通过Type的0，1，2确定，0是7 Days，1是15 Days，2是30Days
        // maxCoverage通过maxValue判断
        // minFluctuation根据policyType决定
        // triggerGasPrice通过triggerValue决定
        // purchaseDate通过startTime确定
        // endDate通过endTime确定
        // status通过isExpired判断
        const formattedData = formatUserOrderData(address, userOrderData);
        console.log(formattedData, "formattedData");

        if (formattedData) {
          setPolicies([formattedData]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [signer, contract]);

  const formatUserOrderData = (address, userOrderData) => {
    const policyTypes = ["7 Days", "15 Days", "30 Days"];
    const payment = [1000, 2000, 5000];

    const {
      Type,
      maxValue,
      triggerValue,
      startTime,
      endTime,
      isExpired,
      exists,
      Level,
    } = userOrderData;

    if (Level === 1) {
      return;
    }

    if (exists === false) {
      return;
    }

    return {
      id: 1,
      // insuredAddress: address,
      policyType: policyTypes[Type],
      maxCoverage: payment[Type],
      minFluctuation: Type === 0 ? 5 : Type === 1 ? 10 : 15,
      triggerGasPrice: triggerValue.toNumber(),
      purchaseDate: moment(_.toNumber(startTime) * 1000).format("YYYY-MM-DD"),
      endDate: moment(_.toNumber(endTime) * 1000).format("YYYY-MM-DD"),
      status: isExpired ? "Expired" : "Active",
    };
  };

  const handleClaimModalCancel = () => {
    setClaimModalVisible(false);
  };

  const handleClaimModalConfirm = async () => {
    setConfirLoading(true);
    try {
      const txHash = await form.validateFields();
      const userAddress = localStorage.getItem("walletAddress");
      const orderType = selectedOrderType;
      console.log(txHash.txHash, userAddress, orderType);

      await calculateAmount(userAddress, txHash.txHash, orderType);

      setConfirLoading(false);
      handleClaimModalCancel();
      message.success("Claim successfully!");
    } catch (error) {
      console.error("Form validation failed:", error);
      setConfirLoading(false);
      handleClaimModalCancel();
      message.error("Claim Error. Please try again.");
    }
  };

  const handleClaim = (userAddress, orderType) => {
    setSelectedUserAddress(userAddress);

    setSelectedOrderType(1);
    setClaimModalVisible(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Normal Claims</h1>
      <Table
        columns={columns}
        dataSource={policiesData}
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
            loading={confirLoading}
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
        </Form>
      </Modal>
    </div>
  );
};

export default NormalClaims;
