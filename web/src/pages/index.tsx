import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, SearchIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Receipt = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
};

const receipts: Receipt[] = [
  {
    id: "1",
    date: "2023-05-01",
    merchant: "Grocery Store",
    amount: 56.78,
    category: "Food",
  },
  {
    id: "2",
    date: "2023-05-03",
    merchant: "Gas Station",
    amount: 45.0,
    category: "Transportation",
  },
  {
    id: "3",
    date: "2023-05-05",
    merchant: "Bookstore",
    amount: 32.5,
    category: "Education",
  },
  {
    id: "4",
    date: "2023-05-07",
    merchant: "Restaurant",
    amount: 89.99,
    category: "Food",
  },
  {
    id: "5",
    date: "2023-05-10",
    merchant: "Electronics Store",
    amount: 299.99,
    category: "Technology",
  },
];

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-700",
  Transportation: "bg-blue-100 text-blue-700",
  Education: "bg-yellow-100 text-yellow-700",
  Technology: "bg-purple-100 text-purple-700",
};

export default function ReceiptListView() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Receipts</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Receipt
        </Button>
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
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-red-600"
                        aria-label="Delete receipt"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          // Handle delete action
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
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
