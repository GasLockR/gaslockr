import React, { useState } from "react";
import { Modal, Spin, message } from "antd";
import ExpectedReturnsChart from "./ExpectedReturnsChart";
import PaymentInfo from "./PaymentInfo";
import useWeb3Provider from "./hooks/useWeb3Provider";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

const PricingSections = ({ level }) => {
  const pricingPlans = [
    {
      title: "7 Days",
      subTitle: "Quick coverage",
      price: level === "normal" ? "$10" : "$20",
      maxCoverage: "10,00",
      minFluctuation: "5%",
      features: [
        "Flexible coverage",
        "Affordable rate",
        "Instant protection",
        "Easy claims process",
        "Fast transaction",
      ],
    },
    {
      title: "15 Days",
      subTitle: "Balanced plan",
      price: level === "normal" ? "$30" : "$60",
      maxCoverage: "10,000",
      minFluctuation: "10%",
      popular: true,
      features: [
        "Best value",
        "Comprehensive coverage",
        "Extended protection",
        "Priority support",
        "Gas price assurance",
      ],
    },
    {
      title: "30 Days",
      subTitle: "Complete protection",
      price: level === "normal" ? "$100" : "$200",
      maxCoverage: "20,000",
      minFluctuation: "25%",
      features: [
        "Maximum protection",
        "Long-term coverage",
        "Expert assistance",
        "Advanced features",
        "Proactive monitoring",
      ],
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chartData, setChartData] = useState({ rate: [], amount: [] });
  const [actualPaymentData, setActualPaymentData] = useState({
    rate: 0,
    amount: 0,
  });
  const [coverage, setCoverage] = useState(BigNumber.from(0));
  const [orderType, setOrderType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [claimlevel, setClaimLevel] = useState(0);

  const { provider, signer, contract } = useWeb3Provider();

  const handleGetStarted = (plan) => {
    if (level === "normal") {
      // Normal level behavior
      setClaimLevel(0);
      console.log(`Get started with ${plan.title} - Normal Level`);
    } else if (level === "advanced") {
      // Advanced level behavior
      setClaimLevel(1);
      console.log(`Get started with ${plan.title} - Advanced Level`);
    }

    switch (plan.title) {
      case "7 Days":
        setOrderType(0);
        break;
      case "15 Days":
        setOrderType(1);
        break;
      case "30 Days":
        setOrderType(2);
        break;
      default:
        break;
    }

    setChartData({
      rate: [
        "0%",
        "1%",
        "3%",
        "5%",
        "10%",
        "15%",
        "20%",
        "25%",
        "30%",
        "35%",
        "40%",
      ],
      amount: [0, 0, 0, 5, 10, 15, 20, 20, 20, 20, 20],
    });

    // setActualPaymentData({ rate, amount });

    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    setIsLoading(true);
    try {
      const address = await signer.getAddress();
      const getValue = await contract.calcuValue(orderType, claimlevel);
      console.log(getValue.toNumber(), "claimlevel");
      console.log(address, orderType, claimlevel);
      const tx = await contract.deposit(
        address,
        // orderType 决定买的那个保险，分别为7d,15d,30d
        orderType,
        // claimlevel 决定买的是normal 还是 advance
        claimlevel,
        { value: getValue }
      );
      await tx.wait();
      setIsLoading(false);
      setIsModalVisible(false);
      message.success("Deposit transaction successful!");
    } catch (error) {
      console.error("Error in deposit transaction:", error);
      setIsLoading(false);
      message.error("Deposit transaction failed.");
    }

    // TODO: payment = coverage * rate
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose your insurance
          </p>
          <p className="mt-4 max-w-4xl text-xl text-gray-500 lg:mx-auto">
            Our insurance plans offer the best protection against gas price
            fluctuations, ensuring you can always execute your transactions with
            peace of mind. Secure your assets and save money by choosing the
            plan that suits your needs.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap justify-center">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="w-full lg:w-1/3 px-4">
                <div className="shadow-lg rounded-lg bg-white p-6">
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex justify-center items-center">
                    <p className="text-center mr-2 text-gray-500">
                      {plan.subTitle}
                    </p>
                    {plan.popular && (
                      <span className="inline-block bg-black text-gold-500 text-[#efc457]  px-2 py-1 text-xs font-semibold rounded-md">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-5xl font-bold text-indigo-600">
                      {plan.price}
                    </span>
                  </div>

                  {/* max coverage */}
                  {/* min fluctuation */}
                  <div className="text-center mt-6">
                    Max Coverage:
                    <span className="ml-2 font-semibold text-indigo-600">
                      {plan.maxCoverage} ETH
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    Min Fluctuation:
                    <span className="ml-2 font-semibold text-indigo-600">
                      {plan.minFluctuation}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4 text-center">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-gray-600">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleGetStarted(plan)}
                    className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        title="Expected Returns"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okButtonProps={{ style: { color: "#1F2937" } }}
        cancelButtonProps={{ style: { color: "#1F2937" } }}
      >
        <Spin spinning={isLoading} tip="Processing transaction...">
          <PaymentInfo
            rate={actualPaymentData.rate}
            amount={actualPaymentData.amount}
          />
          <ExpectedReturnsChart
            rateData={chartData.rate}
            amountData={chartData.amount}
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default PricingSections;
