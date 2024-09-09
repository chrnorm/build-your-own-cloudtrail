import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, DownloadIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

type ReceiptDetail = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  imageUrl: string;
};

const receiptDetail: ReceiptDetail = {
  id: "1",
  date: "2023-05-01",
  merchant: "Grocery Store",
  amount: 56.78,
  category: "Food",
  imageUrl: "/placeholder.svg?height=800&width=600",
};

export default function ReceiptDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Receipts
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative aspect-[3/4] md:aspect-auto md:h-[calc(100vh-12rem)]">
            <img
              src={receiptDetail.imageUrl}
              alt={`Receipt from ${receiptDetail.merchant}`}
              className="object-contain"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">
                {receiptDetail.merchant}
              </h1>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {receiptDetail.date}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    ${receiptDetail.amount.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {receiptDetail.category}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Button className="w-full">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="destructive" className="w-full">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
