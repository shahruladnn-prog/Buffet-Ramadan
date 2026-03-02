import { revalidateTag } from "next/cache";

export async function getRamadanAvailability() {
    try {
        const url = process.env.GOOGLE_SCRIPT_URL;
        if (!url) return null;

        // Fetch the live availability from Google Sheets.
        // Next.js ISR (Incremental Static Regeneration) will cache this
        // for exactly 30 seconds to prevent hitting Google Script rate limits.
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "getAvailability" }),
            next: {
                revalidate: 30, // 30 seconds cache
                tags: ["availability"]
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch availability");
        }

        const data = await res.json();
        return data.availability || {};
    } catch (error) {
        console.error("Error fetching availability:", error);
        return null;
    }
}
