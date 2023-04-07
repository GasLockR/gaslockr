import React, { useState } from "react";
import { Modal } from "antd";
import ExpectedReturnsChart from "./ExpectedReturnsChart";
import PaymentInfo from "./PaymentInfo";

const PricingSections = ({ level }) => {
  const pricingPlans = [
    {
      title: "7 Days",
      subTitle: "Quick coverage",
      minPrice: "Min.",
      price: level === "normal" ? "$10" : "$20",
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
      minPrice: "Min.",
      price: level === "normal" ? "$30" : "$60",
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
      minPrice: "Min.",
      price: level === "normal" ? "$100" : "$200",
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

  const handleGetStarted = (plan) => {
    if (level === "normal") {
      // Normal level behavior
      console.log(`Get started with ${plan.title} - Normal Level`);
    } else if (level === "advanced") {
      // Advanced level behavior
      console.log(`Get started with ${plan.title} - Advanced Level`);
    }

    // You can calculate your rate and amount here based on the selected plan.
    // const rate = plan.price === "$10" ? 5 : plan.price === "$30" ? 10 : 15;
    // const amount = plan.price === "$10" ? 50 : plan.price === "$30" ? 100 : 200;

    // const rateData = Array.from({ length: 101 }, (_, i) => i);
    // const amountData = rateData.map((r) =>
    //   r >= rate ? amount * (r / 100) : 0
    // );

    // setChartData({ rate: rateData, amount: amountData });
    // setIsModalVisible(true);
    // Show modal with chart
    // You should replace these sample data with your actual data
    setChartData({
      rate: ["0%", "1%", "2%", "5%", "8%", "10%"],
      amount: [0, 5, 15, 30, 30, 30],
    });

    // setActualPaymentData({ rate, amount });

    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // TODO: 6 types; input:address/coverage/type

    // TODO: payment = coverage * rate
    
    setIsModalVisible(false);
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
                    <span className="text-xl font-bold text-gray-500">
                      {plan.minPrice}{" "}
                    </span>
                    <span className="text-5xl font-bold text-indigo-600">
                      {plan.price}
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
        <PaymentInfo
          rate={actualPaymentData.rate}
          amount={actualPaymentData.amount}
        />
        <ExpectedReturnsChart
          rateData={chartData.rate}
          amountData={chartData.amount}
        />
      </Modal>
    </div>
  );
};

export default PricingSections;
