import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="bg-neutral-900 border border-orange-900/50 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-orange-500/10 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                    <AlertCircle className="w-8 h-8 text-orange-400" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Pembayaran Dibatalkan</h1>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                    Proses tempahan dan pembayaran anda telah dibatalkan atau tidak berjaya. Sila cuba lagi.
                </p>

                <Link
                    href="/"
                    className="inline-flex justify-center items-center w-full h-14 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl transition-all border border-neutral-700 hover:border-neutral-600"
                >
                    Kembali dan Cuba Lagi
                </Link>
            </div>
        </div>
    );
}
