"use client";
import * as React from "react";

function Footer() {
  return (
    <div className="px-6 py-6 w-full text-white bg-black text-sm">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-wrap justify-between gap-6">
          {/* Left Side - Logo & Description */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <img src="/logo_wl.webp" alt="TEDx NERIST" className="w-36 h-8" />
            </div>
            <p className="mt-4 text-xs leading-5">
              An independently organized event showcasing transformative ideas,
              inspiring performances, and vibrant community dialogue. Licensed
              by TED.
            </p>

            {/* Map Section */}
            <div className="mt-4 ">
              <iframe
                title="TEDx NERIST Location"
                className="w-full h-40 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.0182671765815!2d93.73606939678953!3d27.124234600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3743ff771f0446b5%3A0x14fa96c700366cf5!2sNERIST%20Auditorium!5e0!3m2!1sen!2sin!4v1742853582482!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-wrap gap-6 text-xs w-full md:w-auto">
            <div>
              <h3 className="font-semibold mb-2">Follow TEDxNERIST</h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/tedxnerist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="/icons/facebook.svg"
                      alt="Facebook"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/tedxnerist/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
                <a
                  href="https://instagram.com/tedxnerist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="/icons/instagram.svg"
                      alt="Instagram"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
                <a
                  href="https://twitter.com/tedxnerist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src="/icons/twitter.svg"
                      alt="Twitter"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
              </div>
              <p className="mt-4 font-semibold">Call us</p>
              <p>
                +91 88220 78464 <br></br>{" "}
              </p>
            </div>

            {/* Programs & Community - Side by Side on PC, Stacked on Phone */}
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="w-full md:w-1/2">
                <h3 className="font-semibold mb-2 ">Programs</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="https://www.ted.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TEDx
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-fellows"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Fellows
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ed.ted.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Ed
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-translators"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Translators
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-institute"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Institute
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.audaciousproject.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      The Audacious Project
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-courses"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-at-work"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED@Work
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="font-semibold mb-2">Community</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="https://www.ted.com/speakers"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Speakers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/participate/organize-a-local-tedx-event"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Organizers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/about/programs-initiatives/ted-translators"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Translators
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ted.com/speakers"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Speakers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://community.ted.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TED Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white pt-4 text-xs text-center">
          <p>
            © TEDxNERIST. This independently organized TEDx event operates under
            a license granted by TED.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/policy">
              <span>Privacy Policy</span>
            </a>
            <a href="/refund">
              <span>Refund</span>
            </a>
            <a href="/term">
              <span>Terms</span>
            </a>
            <a href="/contact">
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
