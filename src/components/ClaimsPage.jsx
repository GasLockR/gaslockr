import React from "react";

const ClaimsPage = () => {
  const policies = [
    {
      id: 1,
      insuredAddress: "0xAbC12345dEf67890GhI12345jKl67890",
      policyType: "7 Days",
      amount: 0.1,
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
      amount: 0.3,
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
      amount: 1,
      fluctuation: 15,
      status: "Active",
      targetGasPrice: 100,
      purchaseDate: "2023-03-01",
      endDate: "2023-03-08",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Your Claims</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-center">
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Insured Address
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Policy Type
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Purchase Date
            </th>
            <th className="py-4 px-12 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              End Date
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Amount
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Target Gas Price
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Fluctuation
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Status
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Claim
            </th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr className="text-center" key={policy.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="hover:text-[#4e46dc]"
                  onClick={() => {
                    navigator.clipboard.writeText(policy.insuredAddress);
                  }}
                >
                  {`${policy.insuredAddress.slice(
                    0,
                    4
                  )}...${policy.insuredAddress.slice(-4)}`}
                </button>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.policyType}
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.purchaseDate}
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.endDate}
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.amount} ETH
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.targetGasPrice} Gwei
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.fluctuation}%
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                {policy.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`${
                    policy.status === "Active"
                      ? "bg-indigo-600"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white font-semibold py-2 px-4 rounded`}
                  disabled={policy.status !== "Active"}
                >
                  Claim
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsPage;
