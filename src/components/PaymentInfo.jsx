import React from "react";

const PaymentInfo = ({ rate, amount }) => {
  const calculateActualPayment = () => {
    // 这里是根据 rate 和 amount 计算实际支付费用的逻辑
    // 返回计算后的实际支付费用
    return `$ ${10}`;
  };
  const actualPayment = calculateActualPayment();
  return (
    <div className="mt-4 ml-14">
      <p className="text-lg text-gray-700">
        The actual fee paid is:
        <span className="text-2xl text-indigo-600 font-bold ml-2">
          {actualPayment}
        </span>
      </p>
      <p className="text-gray-600 mt-2">
        When you click the "OK" button, you will pay the actual fee on-chain.
      </p>
    </div>
  );
};

export default PaymentInfo;
