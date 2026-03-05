"use client"

import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

export function Footer() {
    const [isPolicyOpen, setIsPolicyOpen] = useState(false)

    return (
        <>
            <footer className="bg-[#0d1f12] text-gray-300 mt-16">
                <div className="container max-w-6xl mx-auto px-6 py-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Brand Column */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Image src="/ggp-logo.png" alt="Gopeng Glamping Park Logo" width={52} height={52} className="object-contain drop-shadow-lg" />
                                <div>
                                    <p className="text-white font-bold text-sm leading-tight">Glamping Park Travel</p>
                                    <p className="text-white font-bold text-sm leading-tight">and Tour Sdn Bhd</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                (201901028420) (1337749-X)
                            </p>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Your gateway to nature. Experience the perfect blend of adventure and serenity in Gopeng, Perak.
                            </p>
                            <div className="flex gap-3 mt-2">
                                <a href="https://www.facebook.com/gopengglampingpark" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-[#f39c12]/30 hover:text-[#f39c12] transition-colors">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href="https://www.instagram.com/gopengglampingpark" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-[#f39c12]/30 hover:text-[#f39c12] transition-colors">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://twitter.com/gopengglampingpark" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-[#f39c12]/30 hover:text-[#f39c12] transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Menu Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-5 border-b border-white/10 pb-2">Menu</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="https://buffet.gopengglampingpark.com" className="hover:text-[#f39c12] transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.gopengglampingpark.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f39c12] transition-colors">
                                        Accommodation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Information Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-5 border-b border-white/10 pb-2">Information</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <button onClick={() => setIsPolicyOpen(true)} className="hover:text-[#f39c12] transition-colors text-left">
                                        General Policies & Terms
                                    </button>
                                </li>
                                <li>
                                    <a href="mailto:booking@gopengglampingpark.com" className="hover:text-[#f39c12] transition-colors">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Sales Office Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-5 border-b border-white/10 pb-2">Sales Office</h4>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-[#f39c12] shrink-0 mt-0.5" />
                                    <span>Lot 10846 Jalan Besar Kg Chulek,<br />31600 Gopeng, Perak.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#f39c12] shrink-0" />
                                    <a href="tel:+60132408857" className="hover:text-[#f39c12] transition-colors font-bold text-white">+60 13-240 8857</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#f39c12] shrink-0" />
                                    <a href="mailto:booking@gopengglampingpark.com" className="hover:text-[#f39c12] transition-colors break-all">
                                        booking@gopengglampingpark.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                        <p>© 2026 Gopeng Glamping Park. All Rights Reserved.</p>
                        <p className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                            Official Website
                        </p>
                    </div>
                </div>
            </footer>

            {/* General Policies Modal */}
            <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
                <DialogContent className="sm:max-w-2xl bg-white rounded-3xl p-0 overflow-hidden max-h-[85vh]">
                    <div className="bg-[#114b24] px-6 py-5 flex items-center gap-3">
                        <Image src="/ggp-logo.png" alt="GGP Logo" width={36} height={36} className="object-contain" />
                        <DialogTitle className="text-white font-bold text-lg">General Policies & Terms</DialogTitle>
                    </div>
                    <div className="overflow-y-auto px-6 py-6 space-y-6 text-sm text-gray-700">

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">📋 Booking & Reservation</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>All bookings are subject to availability on the selected date.</li>
                                <li>A minimum of 3 payable guests (Adults / Kids / Senior) is required per booking.</li>
                                <li>Full payment is required at the time of booking to confirm your reservation.</li>
                                <li>Tables are assigned based on the total number of payable guests only.</li>
                                <li>Table numbers will be emailed to you upon successful payment confirmation.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">👶 FOC Kanak-Kanak (Children Aged 5 & Below)</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>Children aged 5 years and below dine free of charge (FOC).</li>
                                <li>FOC children do not receive a dedicated table slot — seating is subject to availability.</li>
                                <li>Chairs for FOC children are provided based on availability and at management's discretion.</li>
                                <li>Ratio: 1 FOC child (with seat) per 2 paying adults.</li>
                                <li>A second FOC child requiring a seat must be registered as a Paid Kids (RM28).</li>
                                <li>Up to 2 FOC children who do not require a seat (held in lap or stroller) are permitted per booking regardless of adult count.</li>
                                <li>Strollers are allowed but must not obstruct walkways or dining areas.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">👴 Senior Citizen / OKU</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>Senior citizens (60 years and above) and OKU guests are charged at Kids price (RM28).</li>
                                <li>A table slot is allocated for every Senior / OKU registered.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">💳 Payment & Refund Policy</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>All prices are inclusive of 6% SST.</li>
                                <li>Payment is processed securely via Chip-in Asia payment gateway.</li>
                                <li>All sales are final. No refunds will be issued for no-shows or cancellations.</li>
                                <li>In the event of force majeure or management cancellation, a full refund or rescheduling will be offered.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">🍽️ Dining Experience</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>Buffet operates from Iftar time until closing. Please arrive on time.</li>
                                <li>Guests are encouraged to pre-inform management of any dietary requirements or allergies.</li>
                                <li>Management reserves the right to refuse service to guests who are disruptive or disrespectful.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">🚗 Parking</h3>
                            <ul className="list-disc list-inside space-y-1 leading-relaxed">
                                <li>Parking is available at designated areas within the premises.</li>
                                <li>Management is not responsible for any loss or damage to vehicles parked on the premises.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-[#114b24] text-base mb-2">📞 Contact</h3>
                            <p>For enquiries, please contact us at:</p>
                            <p className="mt-1"><strong>Phone:</strong> +60 13-240 8857</p>
                            <p><strong>Email:</strong> booking@gopengglampingpark.com</p>
                        </section>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
