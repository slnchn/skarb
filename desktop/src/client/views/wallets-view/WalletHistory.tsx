import React from 'react';
import { useWhistory } from '../../queries/whistory-queries';

interface WalletHistoryProps {
  walletId: string;
}

const WalletHistory = ({ walletId }: WalletHistoryProps) => {
  const { data: whistoryList, isLoading, isError } = useWhistory(walletId);

  if (isLoading || !whistoryList) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="px-2 flex-grow">
      <h2 className="font-extrabold text-xl">Wallet History</h2>

      <div className="flex h-full">
        <div className="w-1/2 h-full flex-grow overflow-auto">
          <table className="w-full">
            <tr>
              <th className="p-1 text-sm border-2 border-black">ID</th>
              <th className="p-1 text-sm border-2 border-black">Amount</th>
              <th className="p-1 text-sm border-2 border-black">Date</th>
              {/* <th className="p-1 text-sm border-2 border-black">Controls</th> */}
            </tr>
            {whistoryList.map((whistory) => (
              <tr key={whistory.id}>
                <td className="p-1 text-sm text-center border-2 border-black">
                  {whistory.id}
                </td>
                <td className="p-1 text-sm text-center border-2 border-black">
                  {whistory.amount}
                </td>
                <td className="p-1 text-sm text-center border-2 border-black">
                  {whistory.date}
                </td>
                {/* <td className="p-1 text-sm text-center border-2 border-black">
                  <button>Delete</button>
                </td> */}
              </tr>
            ))}
          </table>
        </div>

        <div className="w-1/2 flex-grow"></div>
      </div>
    </div>
  );
};

export default WalletHistory;
