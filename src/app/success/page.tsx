import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="bg-neutral-900 border border-emerald-900/50 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Pembayaran Berjaya!</h1>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                    Terima kasih. Tempahan Buffet Ramadan anda telah disahkan. Resit telah dihantar ke e-mel anda.
                </p>

                <Link
                    href="/"
                    className="inline-flex justify-center items-center w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                    Kembali ke Laman Utama
                </Link>
            </div>
        </div>
    );
}
