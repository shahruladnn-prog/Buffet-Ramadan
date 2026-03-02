async function test() {
    const CHIP_SECRET_KEY = "1ae7VS666txUFAr9-dmK7qb1zH5McoihFCgKc20LGLpG7RZpgvYOrtadwwQl_ZLVkTEFoUw02wj_gsTlxU0ksA==";
    const CHIP_BRAND_ID = "38675dc8-983d-4b93-84bd-6c9bef48150d";

    const payload = {
        success_redirect: `http://localhost:3011/success`,
        failure_redirect: `http://localhost:3011/cancel`,
        cancel_redirect: `http://localhost:3011/cancel`,
        creator_agent: "RSVP Booking System",
        reference: `BKA-${Date.now()}`,
        send_receipt: true,
        client: {
            email: "test@example.com",
            phone: "0123456789",
            full_name: "Test Name",
        },
        purchase: {
            timezone: "Asia/Kuala_Lumpur",
            currency: "MYR",
            products: [
                {
                    name: `Table Reservation - 2026-03-03`,
                    price: 15600,
                    quantity: 1,
                    tax_percent: 6, // Testing 6.00%
                }
            ],
        },
        brand_id: CHIP_BRAND_ID,
    };

    const response = await fetch("https://gate.chip-in.asia/api/v1/purchases/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CHIP_SECRET_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

test();
