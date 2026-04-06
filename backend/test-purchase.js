const axios = require('axios');

async function run() {
    try {
        const response = await axios.post('http://localhost:3000/api/tickets/purchase', {
            name: "Test Name",
            email: `test${Date.now()}@example.com`,
            contactNumber: "9876543210",
            address: "123 Test St",
        });
        console.log("Success:", Object.keys(response.data));
        console.log("paymentLinkUrl:", response.data.paymentLinkUrl);
    } catch (e) {
        console.error("Error:", e.response?.data || e.message);
    }
}

run();
