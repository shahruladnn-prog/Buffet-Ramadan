"use client"

import { useState, useEffect } from "react"
import { format, addDays } from "date-fns"
import { CalendarIcon, Users, AlertCircle, CheckCircle2, ChevronRight, Globe, Baby, X, User, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"
import Image from "next/image"

type Language = "ms" | "en"

const translations = {
    ms: {
        title: "BUFFET RAMADAN",
        subtitle: "Gopeng Glamping Park",
        description: "Tempah meja anda untuk pengalaman berbuka puasa yang tidak dapat dilupakan di bawah taburan bintang.",
        findTable: "Pilih Tarikh",
        selectDesc: "Pilih tarikh pilihan anda dan tetapkan jumlah tetamu. Masa berbuka puasa adalah tetap.",
        dateLabel: "Tarikh",
        adults: "Dewasa",
        kids: "Kanak-kanak",
        moreThan10: "Lebih dari 10",
        enterAmount: "Jumlah...",
        clear: "Batal",
        checkAvail: "Semak Kekosongan",
        checking: "Menyemak...",
        tableAvailable: "Kekosongan Ditemui",
        reservedFor: "Ditempah untuk:",
        totalAmount: "Jumlah Harga",
        changeDetails: "Tukar Butiran",
        proceedPayment: "Teruskan ke Pembayaran",
        missingInfo: "Maklumat Tidak Lengkap",
        missingInfoDesc: "Sila pilih tarikh dan pastikan jumlah tetamu adalah sah.",
        minPaxErr: "Kapasiti Meja Penuh",
        minPaxDesc: "Meja berdua telah penuh. Sila tempah meja untuk 4 dengan sekurang-kurangnya 3 tetamu.",
        selectPaxTitle: "Pilih bilangan orang",
        selectPaxPlaceholder: "Sila Pilih",
        ramadanDay: "Ramadan Ke",
        remainingPax: "pax tinggal",
        bookNow: "Pilih",
        focNote: "* Kanak-kanak 4 tahun dan ke bawah adalah Percuma (FOC) tetapi tiada tempat duduk khas disediakan.",
        weekdayPromoApplied: "✨ Promo Hari Biasa Terpakai! (Diskaun RM10/Dewasa)",
        viewMenu: "Lihat Menu",
        guestDetails: "Butiran Tetamu",
        nameLabel: "Nama Penuh",
        phoneLabel: "Nombor Telefon",
        emailLabel: "Alamat E-mel",
        nameErr: "Sila masukkan nama anda.",
        phoneErr: "Sila masukkan nombor telefon yang sah (contoh: 0123456789).",
        emailErr: "Sila masukkan alamat e-mel yang sah.",
    },
    en: {
        title: "RAMADAN BUFFET",
        subtitle: "Gopeng Glamping Park",
        description: "Reserve your table for an unforgettable iftar dining experience under the stars.",
        findTable: "Select a Date",
        selectDesc: "Select your preferred date and party size. Iftar time is fixed.",
        dateLabel: "Date",
        adults: "Adults",
        kids: "Kids (5-12 yo)",
        moreThan10: "More than 10",
        enterAmount: "Amount...",
        clear: "Clear",
        checkAvail: "Check Availability",
        checking: "Checking...",
        tableAvailable: "Availability Found",
        reservedFor: "Reserved for:",
        totalAmount: "Total Amount",
        changeDetails: "Change Details",
        proceedPayment: "Proceed to Payment",
        missingInfo: "Missing Information",
        missingInfoDesc: "Please select a date and ensure a valid number of guests.",
        minPaxErr: "Table Capacity Full",
        minPaxDesc: "Tables for 2 are no longer available. Please book a table for 4 with a minimum of 3 guests.",
        selectPaxTitle: "Select number of people",
        selectPaxPlaceholder: "Please Select",
        ramadanDay: "Day",
        remainingPax: "pax remaining",
        bookNow: "Select",
        focNote: "* Kids aged 4 and below are Free of Charge (FOC) but no designated seat is provided.",
        weekdayPromoApplied: "✨ Weekday Promo Applied! (RM10 off/Adult)",
        viewMenu: "View Menu",
        guestDetails: "Guest Details",
        nameLabel: "Full Name",
        phoneLabel: "Phone Number",
        emailLabel: "Email Address",
        nameErr: "Please enter your name.",
        phoneErr: "Please enter a valid phone number (e.g., 0123456789).",
        emailErr: "Please enter a valid email address.",
    }
}


export function BookingForm({ ramadanDates }: { ramadanDates: any[] }) {
    const [lang, setLang] = useState<Language>("ms")
    const t = translations[lang]

    const [date, setDate] = useState<Date | undefined>(undefined)
    const [adultSelect, setAdultSelect] = useState<string>("")
    const [adultCustom, setAdultCustom] = useState<string>("")
    const [kidSelect, setKidSelect] = useState<string>("")
    const [kidCustom, setKidCustom] = useState<string>("")
    const [guestName, setGuestName] = useState("")
    const [guestPhone, setGuestPhone] = useState("")
    const [guestEmail, setGuestEmail] = useState("")
    const [formErrors, setFormErrors] = useState<{ name?: string, phone?: string, email?: string }>({})
    const [isChecking, setIsChecking] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)
    const [availability, setAvailability] = useState<{
        available: boolean;
        adults: number;
        kids: number;
        totalAmount: number;
        hasDiscount: boolean;
    } | null>(null)

    const isWeekday = (dateToCheck: Date) => {
        const day = dateToCheck.getDay()
        return day >= 1 && day <= 4 // Monday(1) to Thursday(4)
    }

    const handleCheck = () => {
        if (!date) {
            toast.error(t.missingInfo, { description: t.missingInfoDesc })
            return
        }

        const adults = adultSelect === "custom" ? parseInt(adultCustom) || 0 : parseInt(adultSelect) || 0
        const kids = kidSelect === "custom" ? parseInt(kidCustom) || 0 : parseInt(kidSelect) || 0
        const totalPax = adults + kids

        if (totalPax < 3) {
            toast.error(t.minPaxErr, { description: t.minPaxDesc })
            return
        }

        const selectedDateObj = ramadanDates.find(d => d.date.getTime() === date.getTime())
        if (selectedDateObj && totalPax > selectedDateObj.remainingPax) {
            toast.error(lang === 'ms' ? "Kapasiti Tidak Mencukupi" : "Insufficient Capacity", {
                description: lang === 'ms'
                    ? `Maaf, hanya tinggal ${selectedDateObj.remainingPax} kekosongan untuk tarikh ini.`
                    : `Sorry, only ${selectedDateObj.remainingPax} seats remaining for this date.`
            })
            return
        }

        setIsChecking(true)

        setTimeout(() => {
            const isPromoDay = isWeekday(date)
            const adultPrice = isPromoDay ? 48 : 58
            const kidPrice = 28
            const totalAmount = (adults * adultPrice) + (kids * kidPrice)

            setAvailability({
                available: true,
                adults,
                kids,
                totalAmount,
                hasDiscount: isPromoDay && adults > 0
            })
            setIsChecking(false)
        }, 800)
    }

    const resetSelection = () => {
        setDate(undefined)
        setAdultSelect("")
        setAdultCustom("")
        setKidSelect("")
        setKidCustom("")
        setAvailability(null)
        setGuestName("")
        setGuestPhone("")
        setGuestEmail("")
        setFormErrors({})
    }

    const handleProceedPayment = async () => {
        // 1) Validate local inputs
        const errors: { name?: string, phone?: string, email?: string } = {}
        if (!guestName.trim()) errors.name = t.nameErr
        if (!guestPhone.trim() || guestPhone.length < 9) errors.phone = t.phoneErr
        if (!guestEmail.trim() || !guestEmail.includes("@")) errors.email = t.emailErr

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            toast.error(t.missingInfo, { description: "Sila lengkapkan butiran tetamu dengan betul." })
            return
        }

        setFormErrors({})
        setIsRedirecting(true)

        // 2) Build data payload & Call Next.js Server Route API
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: availability?.totalAmount,
                    client_name: guestName,
                    client_email: guestEmail,
                    client_phone: guestPhone,
                    booking_date: format(date as Date, "yyyy-MM-dd"),
                    adults: availability?.adults,
                    kids: availability?.kids,
                    table_size: (availability?.adults || 0) + (availability?.kids || 0),
                    language: lang
                })
            });

            const data = await response.json();

            if (data.checkoutUrl) {
                // Redirect the user to the Chip payment portal
                window.location.href = data.checkoutUrl;
            } else {
                toast.error("Ralat Pembayaran", { description: data.error || "Gagal menghubungi Chip API" });
                setIsRedirecting(false)
            }

        } catch (error) {
            console.error(error);
            toast.error("Ralat Rangkaian", { description: "Sila cuba sebentar lagi." });
            setIsRedirecting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f4fdf8]">
            {/* Background Hero */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-[#114b24] mb-8 overflow-hidden rounded-b-[40px] shadow-lg">
                <Image
                    src="/Banner.jpg"
                    alt="Ramadan Buffet Banner"
                    fill
                    className="object-cover opacity-80 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#114b24]/90 to-transparent" />
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                    <Button
                        variant={lang === "ms" ? "default" : "secondary"}
                        onClick={() => setLang("ms")}
                        className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm shadow-sm"
                    >
                        🇲🇾 BM
                    </Button>
                    <Button
                        variant={lang === "en" ? "default" : "secondary"}
                        onClick={() => setLang("en")}
                        className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm shadow-sm"
                    >
                        🇬🇧 EN
                    </Button>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#fdf5e6] tracking-tight mb-4 drop-shadow-md">
                        {t.title}
                    </h1>
                    <p className="text-xl text-[#f4fdf8] flex items-center gap-2 mb-2 font-medium">
                        <Globe className="w-5 h-5" />
                        {t.subtitle}
                    </p>
                    <p className="text-md md:text-lg text-white/90 max-w-xl mx-auto drop-shadow mb-6">
                        {t.description}
                    </p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#f39c12] hover:bg-[#d68910] text-[#114b24] font-bold px-8 shadow-xl border-2 border-white/20">
                                {t.viewMenu}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl p-0 border-0 bg-transparent shadow-none">
                            <DialogTitle className="sr-only">Menu Buffet</DialogTitle>
                            <DialogDescription className="sr-only">Menu hidangan berbuka puasa.</DialogDescription>
                            <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/Menu Buffet.jpg"
                                    alt="Menu Buffet Ramadan"
                                    fill
                                    className="object-contain bg-black/80 backdrop-blur-sm"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="container max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Date Grid Selection */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#e2ece5] shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-2xl text-[#114b24] flex items-center gap-2">
                                    <CalendarIcon className="w-6 h-6 text-[#f39c12]" />
                                    {t.findTable}
                                </h3>
                                <p className="text-gray-500 mt-1">{t.selectDesc}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {ramadanDates.map((d, i) => {
                                const isPromo = isWeekday(d.date)
                                return (
                                    <button
                                        key={i}
                                        disabled={d.remainingPax === 0}
                                        onClick={() => setDate(d.date)}
                                        className={cn(
                                            "relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 text-left overflow-hidden",
                                            date?.getTime() === d.date.getTime()
                                                ? "border-[#1e5631] bg-[#f4fdf8] shadow-md ring-2 ring-[#1e5631] ring-offset-2 scale-[1.02]"
                                                : "border-gray-200 bg-white hover:border-[#1e5631] hover:shadow-sm",
                                            d.remainingPax === 0 && "opacity-50 cursor-not-allowed grayscale"
                                        )}
                                    >
                                        {isPromo && (
                                            <div className="absolute top-0 right-0 bg-[#f39c12] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                                                {lang === 'ms' ? 'Diskaun RM10/dewasa' : 'RM10 Off/adult'}
                                            </div>
                                        )}
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 mt-2">
                                            {t.ramadanDay} {d.ramadanDay}
                                        </span>
                                        <span className="text-2xl font-extrabold text-[#114b24]">
                                            {format(d.date, "dd MMM")}
                                        </span>
                                        <span className="text-sm text-gray-500 font-medium mb-4">
                                            {format(d.date, "EEEE, yyyy")}
                                        </span>
                                        <div className="mt-auto flex items-center gap-1 text-xs font-bold text-[#1e5631] bg-[#e2ece5] px-2 py-1 rounded-md">
                                            <Users className="w-3 h-3" />
                                            {d.remainingPax} {t.remainingPax}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4">
                        <Card className="sticky top-6 border-[#e2ece5] shadow-xl rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md">
                            <div className="h-2 w-full bg-gradient-to-r from-[#114b24] via-[#1e5631] to-[#2e7d32]" />
                            <CardContent className="p-8">

                                {!availability ? (
                                    <div className="space-y-6">
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-[#e2ece5] text-[#114b24] rounded-xl">
                                                    <CalendarIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">{t.dateLabel}</p>
                                                    <p className="font-bold text-lg text-gray-900">
                                                        {date ? format(date, "dd MMM yyyy") : "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-green-100 shadow-md relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f39c12]" />
                                            <h4 className="font-bold text-xl text-[#114b24] border-b border-gray-100 pb-3 mb-2 flex items-center gap-2">
                                                <Users className="w-6 h-6 text-[#f39c12]" />
                                                {t.selectPaxTitle}
                                            </h4>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-2">
                                                {/* Adults Selector */}
                                                <div className="space-y-3">
                                                    <Label className="text-gray-800 font-bold">{t.adults}</Label>
                                                    <Select value={adultSelect} onValueChange={setAdultSelect}>
                                                        <SelectTrigger className="h-14 w-full border-2 border-[#e2ece5] bg-[#f8fafc] rounded-xl text-lg font-bold text-[#114b24] shadow-sm transition-all focus:ring-[#f39c12]">
                                                            <SelectValue placeholder={t.selectPaxPlaceholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                                <SelectItem key={n} value={n.toString()}>{n} pax (RM58)</SelectItem>
                                                            ))}
                                                            <SelectItem value="custom">{t.moreThan10}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {adultSelect === "custom" && (
                                                        <Input
                                                            type="number"
                                                            min="11"
                                                            placeholder={t.enterAmount}
                                                            value={adultCustom}
                                                            onChange={(e) => setAdultCustom(e.target.value)}
                                                            className="h-12 mt-2 rounded-xl bg-[#f8fafc] border-2 border-[#e2ece5] text-[#114b24] font-bold"
                                                        />
                                                    )}
                                                </div>

                                                {/* Kids Selector */}
                                                <div className="space-y-3">
                                                    <Label className="text-gray-800 font-bold flex items-center gap-1">
                                                        {t.kids} <Baby className="w-4 h-4 text-gray-400" />
                                                    </Label>
                                                    <Select value={kidSelect} onValueChange={setKidSelect}>
                                                        <SelectTrigger className="h-14 w-full border-2 border-[#e2ece5] bg-[#f8fafc] rounded-xl text-lg font-bold text-[#114b24] shadow-sm transition-all focus:ring-[#f39c12]">
                                                            <SelectValue placeholder={t.selectPaxPlaceholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                                <SelectItem key={n} value={n.toString()}>{n} pax (RM28)</SelectItem>
                                                            ))}
                                                            <SelectItem value="custom">{t.moreThan10}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {kidSelect === "custom" && (
                                                        <Input
                                                            type="number"
                                                            min="11"
                                                            placeholder={t.enterAmount}
                                                            value={kidCustom}
                                                            onChange={(e) => setKidCustom(e.target.value)}
                                                            className="h-12 mt-2 rounded-xl bg-[#f8fafc] border-2 border-[#e2ece5] text-[#114b24] font-bold"
                                                        />
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 italic font-medium leading-relaxed bg-gray-50 p-3 rounded-lg">
                                            {t.focNote}
                                        </div>

                                        <Button
                                            onClick={handleCheck}
                                            disabled={isChecking || !date}
                                            className="w-full h-14 text-lg font-bold bg-[#1e5631] hover:bg-[#114b24] text-white rounded-2xl shadow-lg transition-transform active:scale-95"
                                        >
                                            {isChecking ? t.checking : t.checkAvail}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex flex-col items-center justify-center p-6 bg-green-50/50 border border-green-100 rounded-3xl text-center">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-green-800 mb-1">{t.tableAvailable}</h3>
                                            <p className="text-green-600 font-medium">
                                                {date && format(date, "dd MMM yyyy")} • {availability.adults + availability.kids} Pax
                                            </p>
                                        </div>

                                        {availability.hasDiscount && (
                                            <div className="bg-[#fff1e6] border border-[#f39c12]/30 text-[#d68910] p-3 rounded-xl text-center font-bold text-sm shadow-sm animate-pulse">
                                                {t.weekdayPromoApplied}
                                            </div>
                                        )}

                                        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm overflow-hidden">
                                            <div className="p-4 flex justify-between items-center text-gray-600">
                                                <span className="font-medium">{t.adults} (x{availability.adults})</span>
                                                <span className="font-bold text-gray-900">
                                                    RM {availability.adults * (availability.hasDiscount ? 48 : 58)}
                                                </span>
                                            </div>
                                            {availability.kids > 0 && (
                                                <div className="p-4 flex justify-between items-center text-gray-600 bg-gray-50/30">
                                                    <span className="font-medium">{t.kids} (x{availability.kids})</span>
                                                    <span className="font-bold text-gray-900">
                                                        RM {availability.kids * 28}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="p-4 flex justify-between items-center text-gray-600 bg-gray-50/50 border-t border-gray-100">
                                                <span className="font-medium text-sm">SST (6%)</span>
                                                <span className="font-bold text-gray-900">
                                                    RM {(availability.totalAmount * 0.06).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="p-5 bg-gray-100 flex justify-between items-end border-t border-gray-200">
                                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t.totalAmount}</span>
                                                <span className="text-4xl font-extrabold text-[#114b24]">
                                                    <span className="text-2xl font-bold text-gray-400 mr-1">RM</span>
                                                    {(availability.totalAmount * 1.06).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Check if Guest Information Inputs */}
                                        <div className="mt-8 space-y-4 pt-4 border-t border-gray-100">
                                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                                <User className="w-5 h-5 text-gray-400" />
                                                {t.guestDetails}
                                            </h4>

                                            <div className="space-y-1">
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                    <Input
                                                        placeholder={t.nameLabel}
                                                        className={cn("pl-10 h-12 bg-[#f8fafc] border-2 border-[#e2ece5] text-[#114b24] font-bold rounded-xl", formErrors.name && "border-red-500 ring-red-500")}
                                                        value={guestName}
                                                        onChange={(e) => setGuestName(e.target.value)}
                                                    />
                                                </div>
                                                {formErrors.name && <p className="text-xs text-red-500 ml-1">{formErrors.name}</p>}
                                            </div>

                                            <div className="space-y-1">
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                    <Input
                                                        type="tel"
                                                        placeholder={t.phoneLabel}
                                                        className={cn("pl-10 h-12 bg-[#f8fafc] border-2 border-[#e2ece5] text-[#114b24] font-bold rounded-xl", formErrors.phone && "border-red-500 ring-red-500")}
                                                        value={guestPhone}
                                                        onChange={(e) => setGuestPhone(e.target.value)}
                                                    />
                                                </div>
                                                {formErrors.phone && <p className="text-xs text-red-500 ml-1">{formErrors.phone}</p>}
                                            </div>

                                            <div className="space-y-1">
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                    <Input
                                                        type="email"
                                                        placeholder={t.emailLabel}
                                                        className={cn("pl-10 h-12 bg-[#f8fafc] border-2 border-[#e2ece5] text-[#114b24] font-bold rounded-xl", formErrors.email && "border-red-500 ring-red-500")}
                                                        value={guestEmail}
                                                        onChange={(e) => setGuestEmail(e.target.value)}
                                                    />
                                                </div>
                                                {formErrors.email && <p className="text-xs text-red-500 ml-1">{formErrors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={resetSelection}
                                                className="h-14 px-6 rounded-2xl border-2 border-[#ffb3b3] text-[#ff0000] hover:bg-[#ffcccc] hover:text-[#cc0000] shrink-0 bg-[#ffe6e6] transition-colors"
                                            >
                                                <X className="w-8 h-8 font-black" strokeWidth={3} />
                                            </Button>
                                            <Button
                                                onClick={handleProceedPayment}
                                                disabled={isRedirecting}
                                                className="flex-1 h-14 text-lg font-bold bg-[#1e5631] hover:bg-[#114b24] text-white rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                {isRedirecting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span className="lang-ms">Sedang Menyambung...</span>
                                                        <span className="lang-en hidden">Connecting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {t.proceedPayment}
                                                        <ChevronRight className="w-5 h-5 opacity-70" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
