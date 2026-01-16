import React from "react";

const ContactUs = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ fontFamily: "Gilroy-Regular" }}
    >
      <section className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700 mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <a
                href="mailto:support@tedxnerist.com"
                className="text-blue-600 hover:underline"
              >
                support@tedxnerist.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <a
                href="tel:+91882207864"
                className="text-blue-600 hover:underline"
              >
                +91 88220 78464
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p>
                Silver jubilee hall, NERIST
                <br />
                Itanagar, AP, 791109
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Business Hours</h3>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.018267921977!2d93.73825807544681!3d27.12423457652173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3743ff771f0446b5%3A0x14fa96c700366cf5!2sNERIST%20Auditorium!5e0!3m2!1sen!2sin!4v1743936802339!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Have questions? Reach out to us anytime — we're happy to help!
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
