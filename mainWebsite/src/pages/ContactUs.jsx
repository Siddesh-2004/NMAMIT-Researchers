import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:ml-64 pt-16 lg:pt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: '#001F3F' }}
        >
          Contact Us
        </h1>

        {/* Introductory Paragraph */}
        <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
          If you have any questions, feedback, or need assistance regarding the Research Submission Portal, please reach out to us through the details below.
        </p>

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="w-6 h-6" style={{ color: '#001F3F' }} />
              </div>
              <div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: '#001F3F' }}
                >
                  Email
                </h3>
                <a
                  href="mailto:researchportal@university.edu"
                  className="text-gray-700 hover:text-[#001F3F] transition-colors"
                >
                  researchportal@university.edu
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Phone className="w-6 h-6" style={{ color: '#001F3F' }} />
              </div>
              <div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: '#001F3F' }}
                >
                  Phone
                </h3>
                <a
                  href="tel:+919876543210"
                  className="text-gray-700 hover:text-[#001F3F] transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="w-6 h-6" style={{ color: '#001F3F' }} />
              </div>
              <div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: '#001F3F' }}
                >
                  Address
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Research Department, XYZ University<br />
                  Mangalore, Karnataka, India – 575001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            We typically respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}