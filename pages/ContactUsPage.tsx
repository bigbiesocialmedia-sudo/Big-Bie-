import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

const ContactUsPage: React.FC = () => {
    const { systemSettings } = useAdmin();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        document.title = 'Contact Us - Big Bie Innerwear | Get in Touch';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Contact Big Bie for inquiries, support, or feedback. We are here to help you with all your innerwear needs. Call, email, or visit us today.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Contact Big Bie for inquiries, support, or feedback. We are here to help you with all your innerwear needs. Call, email, or visit us today.';
            document.head.appendChild(meta);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Get WhatsApp number from settings (Prioritize Official Number for Inquiries)
        const whatsappNumber = systemSettings?.officialNumber || systemSettings?.whatsappNumber || '';

        if (!whatsappNumber) {
            alert('WhatsApp number is not configured. Please contact the administrator.');
            return;
        }

        // Create WhatsApp message
        const message = `*Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not provided'}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Create WhatsApp URL
        const cleanPhone = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32">
                <div className="container mx-auto px-6 max-w-5xl py-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Contact Us</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Have questions or need assistance? We're here to help! Reach out to us through any of the
                            following channels, and our team will get back to you as soon as possible.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 my-6">
                            {/* Contact Information */}
                            <div className="bg-[#F4C430]/10 p-4 rounded-lg">
                                <h2 className="text-3xl font-bold text-black mb-4">Get in Touch</h2>

                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-2">📞 Customer Care</h3>
                                        <p className="text-gray-700 text-lg">+91 831-0306547</p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-2">📧 Email</h3>
                                        <p className="text-gray-700">
                                            <a href="mailto:customercare@bigbie.com" className="text-[#F4C430] hover:underline">
                                                customercare@bigbie.com
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-2">📍 Visit Us</h3>
                                        <p className="text-gray-700">
                                            Big Bie,<br />
                                            Bengaluru, Karnataka,<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-3xl font-bold text-black mb-4">Send a Message</h2>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 focus:border-[#F4C430] focus:outline-none rounded"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 focus:border-[#F4C430] focus:outline-none rounded"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 focus:border-[#F4C430] focus:outline-none rounded"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 focus:border-[#F4C430] focus:outline-none rounded"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 focus:border-[#F4C430] focus:outline-none rounded resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-2 bg-[#F4C430] text-black font-semibold hover:bg-[#F4C430]/80 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ContactUsPage;
