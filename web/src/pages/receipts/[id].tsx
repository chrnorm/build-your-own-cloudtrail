import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type ReceiptDetail = {
  id: string;
  date: string;
  owner: string;
  merchant: string;
  amount: number;
  category: string;
  imageUrl: string;
};

const fetchReceiptDetail = async (id: string): Promise<ReceiptDetail> => {
  const response = await fetch(`http://localhost:9090/receipts/${id}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

type ReceiptDownloadURL = {
  url: string;
};

const fetchReceiptDownloadURL = async (
  id: string,
): Promise<ReceiptDownloadURL> => {
  const response = await fetch(
    `http://localhost:9090/receipts/${id}/download-url`,
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export default function ReceiptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: receiptDetail,
    isLoading,
    error,
  } = useQuery<ReceiptDetail, Error>({
    queryKey: ["receipt", id],
    queryFn: () => fetchReceiptDetail(id!),
  });
  const {
    data: receiptDownloadURL,
    isLoading: downloadUrlIsLoading,
    error: downloadUrlError,
  } = useQuery<ReceiptDownloadURL, Error>({
    queryKey: ["receipt", id, "download-url"],
    queryFn: () => fetchReceiptDownloadURL(id!),
  });

  if (isLoading) return <div>Loading...</div>;

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

      <div className="grid gap-6 md:grid-cols-[1fr,3fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              {error != null ? (
                <div className="p-2 text-red-500">
                  An error has occurred: {error.message}
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-4">
                    {receiptDetail?.merchant}
                  </h1>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {receiptDetail?.date}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        ${receiptDetail?.amount.toFixed(2)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Category
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {receiptDetail?.category}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Owner
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {receiptDetail?.owner}
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0 relative aspect-[3/4] md:aspect-auto md:h-[calc(100vh-12rem)]">
            {downloadUrlError ? (
              <div className="p-2 text-red-500">
                An error has occurred: {downloadUrlError.message}
              </div>
            ) : (
              <img
                src={
                  receiptDownloadURL?.url ||
                  "/placeholder.svg?height=800&width=600"
                }
                alt={`Receipt from ${receiptDetail?.merchant}`}
                className="object-contain w-full h-full"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
