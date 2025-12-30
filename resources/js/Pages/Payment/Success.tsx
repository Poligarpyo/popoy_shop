import MainLayout from "@/Components/Layout/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle } from "lucide-react";

interface SuccessProps {
    reference?: string;
}

const Success = ({ reference }: SuccessProps) => {
    return (
        <MainLayout>
            <Head title="Payment Success" />
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <div className="flex items-center justify-center w-20 h-20
                    mx-auto mb-6 rounded-full bg-green-800">
                        <CheckCircle />
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-gray-800">
                        Payment Successful!
                    </h1>
                    {reference}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
                        >
                            Continue Shopping
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                            Back to Home
                        </Link>
                    </div>

                </div>
            </div>
        </MainLayout>


    )
}

export default Success