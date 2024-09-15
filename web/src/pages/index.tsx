import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type Receipt = {
  id: string;
  date: string;
  owner: string;
  merchant: string;
  amount: number;
  category: string;
};

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-700",
  Transportation: "bg-blue-100 text-blue-700",
  Education: "bg-yellow-100 text-yellow-700",
  Technology: "bg-purple-100 text-purple-700",
};

const fetchReceipts = async (): Promise<Receipt[]> => {
  const response = await fetch("http://localhost:9090/receipts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Receipt[]>;
};

export default function ReceiptListView() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: receipts,
    isLoading,
    error,
  } = useQuery<Receipt[], Error>({
    queryKey: ["receipts"],
    queryFn: fetchReceipts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div className="p-2">An error has occurred: {error.message}</div>;

  const filteredReceipts =
    receipts?.filter(
      (receipt) =>
        receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.category.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello Alice, here are your receipts.
        </h1>
      </div>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search receipts..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200" role="list">
          {filteredReceipts.map((receipt) => (
            <Link
              key={receipt.id}
              to={`/receipts/${receipt.id}`}
              className="block"
            >
              <li
                className="p-4 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out cursor-pointer"
                tabIndex={0}
                role="listitem"
              >
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {receipt.merchant}
                      </p>
                      <p className="text-xs text-gray-500">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      className={`${categoryColors[receipt.category]} text-xs font-medium px-2 py-1`}
                    >
                      {receipt.category}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">
                      ${receipt.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
