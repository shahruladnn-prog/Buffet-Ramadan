import { getRamadanAvailability } from "./actions";
import { BookingForm } from "./booking-form";
import { format, addDays } from "date-fns";

// Generate the remaining Ramadan dates (March 3 - March 18, 2026)
export const generateRamadanDates = (availabilityMap: Record<string, any> | null) => {
    const dates = []
    const startDate = new Date(2026, 2, 3) // March 3, 2026
    const endDate = new Date(2026, 2, 18) // March 18, 2026
    let currentDate = startDate
    let day = 13 // March 3 is 13th Day of Ramadan

    while (currentDate <= endDate) {
        const dateString = format(currentDate, "yyyy-MM-dd")
        let pax = 0;
        let emptyCaps: number[] = [];

        if (availabilityMap && availabilityMap[dateString] !== undefined) {
            if (typeof availabilityMap[dateString] === 'object') {
                pax = availabilityMap[dateString].totalLeft || 0;
                emptyCaps = availabilityMap[dateString].emptyCaps || [];
            } else {
                pax = availabilityMap[dateString];
            }
        } else if (!availabilityMap) {
            pax = 600 - (day * 23) % 400
        }

        dates.push({
            date: new Date(currentDate),
            ramadanDay: day,
            remainingPax: pax,
            emptyCaps: emptyCaps
        })
        currentDate = addDays(currentDate, 1)
        day++
    }
    return dates
}

// Ensure the actual exported page is a Server Component to fetch data
export default async function BookingPage() {
    // 1. Await live availability with the 30-sec ISR caching
    const availabilityMap = await getRamadanAvailability();

    // 2. Generate dates with live data
    const dynamicDates = generateRamadanDates(availabilityMap);

    return <BookingForm ramadanDates={dynamicDates} />;
}
