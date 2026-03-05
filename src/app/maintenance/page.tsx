import React from 'react'
import Image from 'next/image'

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-[#f4fdf8] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-[#e2ece5]">
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-[#1e5631] rounded-full flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-[#114b24] mb-4">Under Maintenance</h1>
                <p className="text-gray-600 font-medium leading-relaxed">
                    We are currently performing some system upgrades to improve our booking experience.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Please check back soon. Sorry for any inconvenience caused!
                    </p>
                </div>
            </div>
        </div>
    )
}
