import dotenv from "dotenv";
import Razorpay from "razorpay";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

async function run() {
    try {
        const paymentLink = await razorpay.paymentLink.create({
            amount: 100,
            currency: "INR",
            accept_partial: false,
            description: `TEDxNERIST Ticket - general`,
            customer: {
                name: "Test Name",
                email: "test@example.com",
                contact: "9876543210",
            },
            notify: {
                sms: false,
                email: false,
            },
            reminder_enable: false,
            callback_url: `http://localhost:5173/payment-success?ticket_raw_id=123`,
            callback_method: "get",
            notes: {
                ticket_id: "123"
            }
        });
        console.log("Success:", paymentLink.short_url);
    } catch (e) {
        console.error("Error creating payment link:", e);
    }
}

run();
