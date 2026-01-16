import React from "react";

const TermAndCondition = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white leading-relaxed">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600">
        Terms of Service
      </h1>

      <p className="mb-8 text-lg">
        This website is operated by <strong>TEDxNERIST</strong>. Throughout the
        site, the terms “we”, “us” and “our” refer to TEDxNERIST. TEDxNERIST
        offers this website, including all information, tools, and services
        available from this site to you, the user, conditioned upon your
        acceptance of all terms, conditions, policies, and notices stated here.
      </p>

      {[
        {
          title: "SECTION 1 - ONLINE STORE TERMS",
          content:
            "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence...",
        },
        {
          title: "SECTION 2 - GENERAL CONDITIONS",
          content:
            "We reserve the right to refuse service to anyone for any reason at any time...",
        },
        {
          title:
            "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
          content:
            "We are not responsible if information made available on this site is not accurate, complete or current...",
        },
        {
          title: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
          content:
            "Prices for our products are subject to change without notice...",
        },
        {
          title: "SECTION 5 - PRODUCTS OR SERVICES",
          content:
            "Certain products or services may be available exclusively online through the website...",
        },
        {
          title: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
          content:
            "We reserve the right to refuse any order you place with us...",
        },
        {
          title: "SECTION 7 - OPTIONAL TOOLS",
          content:
            "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input...",
        },
        {
          title: "SECTION 8 - THIRD-PARTY LINKS",
          content:
            "Certain content, products and services available via our Service may include materials from third-parties...",
        },
        {
          title: "SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
          content:
            "If, at our request, you send certain specific submissions (for example contest entries)...",
        },
        {
          title: "SECTION 10 - PERSONAL INFORMATION",
          content:
            "Your submission of personal information through the store is governed by our Privacy Policy.",
        },
        {
          title: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS",
          content:
            "Occasionally there may be information on our site or in the Service that contains typographical errors...",
        },
        {
          title: "SECTION 12 - PROHIBITED USES",
          content:
            "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content...",
        },
        {
          title:
            "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
          content:
            "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free...",
        },
        {
          title: "SECTION 14 - INDEMNIFICATION",
          content:
            "You agree to indemnify, defend and hold harmless TEDxNERIST and our parent, subsidiaries, affiliates...",
        },
        {
          title: "SECTION 15 - SEVERABILITY",
          content:
            "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable...",
        },
        {
          title: "SECTION 16 - TERMINATION",
          content:
            "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes...",
        },
        {
          title: "SECTION 17 - ENTIRE AGREEMENT",
          content:
            "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision...",
        },
        {
          title: "SECTION 18 - GOVERNING LAW",
          content:
            "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India and jurisdiction of Jaipur, Rajasthan.",
        },
        {
          title: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
          content:
            "You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website tedxnerist.com. It is your responsibility to check our website periodically for changes.",
        },
        {
          title: "SECTION 20 - CONTACT INFORMATION",
          content:
            "Questions about the Terms of Service should be sent to us at support@tedxnerist.com.",
        },
      ].map(({ title, content }, idx) => (
        <div
          key={idx}
          className="mb-10"
          style={{ fontFamily: "Gilroy-Regular" }}
        >
          <h2
            className="text-2xl font-bold text-red-500 mb-2"
            style={{ fontFamily: "Gilroy-Regular" }}
          >
            {title}
          </h2>
          <p className=" text-white" style={{ fontFamily: "Gilroy-Regular" }}>
            {content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TermAndCondition;
