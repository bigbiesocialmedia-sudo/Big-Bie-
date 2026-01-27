import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Legal Information - Big Bie Innerwear';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Big Bie legal information including Terms and Conditions, Privacy Policy, Shipping & Delivery, and Refund Policy.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Big Bie legal information including Terms and Conditions, Privacy Policy, Shipping & Delivery, and Refund Policy.';
            document.head.appendChild(meta);
        }

        // Scroll to section if hash exists
        if (window.location.hash) {
            setTimeout(() => {
                const element = document.getElementById(window.location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32">
                <div className="container mx-auto px-6 max-w-5xl py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-12">Legal Information</h1>

                    {/* Quick Navigation */}
                    <div className="bg-gray-100 p-6 rounded-lg mb-12">
                        <h2 className="text-xl font-bold text-black mb-4">Quick Navigation</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            <a href="#terms" className="text-[#F4C430] hover:underline">→ Terms and Conditions</a>
                            <a href="#privacy" className="text-[#F4C430] hover:underline">→ Privacy Policy</a>
                            <a href="#shipping" className="text-[#F4C430] hover:underline">→ Shipping & Delivery</a>
                            <a href="#refund" className="text-[#F4C430] hover:underline">→ Refund Policy</a>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <section id="terms" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-[#F4C430] pb-3">Terms and Conditions</h2>
                        <p className="text-sm text-gray-600 mb-6">Last Updated: January 2026</p>

                        <div className="space-y-6 text-gray-700">
                            <p>
                                Welcome to Big Bie. These Terms and Conditions ("Terms") govern your use of our website and the purchase of products from Big Bie. By accessing or using our website, you agree to be bound by these Terms.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">1. Acceptance of Terms</h3>
                            <p>
                                By using this website, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not use our website.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">2. Products and Services</h3>
                            <p>
                                All products displayed on our website are subject to availability. We reserve the right to discontinue any product at any time. Prices and specifications are subject to change without notice.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">3. Orders and Payment</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All orders are subject to acceptance and availability.</li>
                                <li>We reserve the right to refuse or cancel any order for any reason.</li>
                                <li>Payment must be made in full at the time of ordering.</li>
                                <li>We accept payments through secure payment gateways.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">4. Intellectual Property</h3>
                            <p>
                                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Big Bie and is protected by copyright and intellectual property laws.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">5. User Conduct</h3>
                            <p>You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use the website for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Transmit any viruses or malicious code</li>
                                <li>Interfere with the proper functioning of the website</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">6. Limitation of Liability</h3>
                            <p>
                                Big Bie shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our website or products.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">7. Governing Law</h3>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">8. Contact Information</h3>
                            <p>
                                For questions regarding these Terms, please contact us at:<br />
                                Email: legal@bigbie.com<br />
                                Phone: +91 831-0306547
                            </p>
                        </div>
                    </section>

                    {/* Privacy Policy */}
                    <section id="privacy" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-[#F4C430] pb-3">Privacy Policy</h2>
                        <p className="text-sm text-gray-600 mb-6">Last Updated: January 2026</p>

                        <div className="space-y-6 text-gray-700">
                            <p>
                                Big Bie ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">1. Information We Collect</h3>
                            <p>We collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping addresses</li>
                                <li><strong>Payment Information:</strong> Credit/debit card details (processed securely through payment gateways)</li>
                                <li><strong>Technical Information:</strong> IP address, browser type, device information, cookies</li>
                                <li><strong>Usage Information:</strong> Pages visited, time spent, navigation patterns</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">2. How We Use Your Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To process and fulfill your orders</li>
                                <li>To communicate with you about your orders and inquiries</li>
                                <li>To improve our website and services</li>
                                <li>To send promotional emails (with your consent)</li>
                                <li>To prevent fraud and ensure security</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">3. Information Sharing</h3>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. We may share information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Service providers who assist in operating our website and processing orders</li>
                                <li>Payment processors for secure transaction processing</li>
                                <li>Law enforcement when required by law</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">4. Data Security</h3>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">5. Your Rights</h3>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">6. Cookies</h3>
                            <p>
                                We use cookies to enhance your browsing experience. You can control cookies through your browser settings, but disabling them may affect website functionality.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">7. Contact Us</h3>
                            <p>
                                For privacy-related inquiries, contact us at:<br />
                                Email: privacy@bigbie.com<br />
                                Phone: +91 831-0306547
                            </p>
                        </div>
                    </section>

                    {/* Shipping & Delivery */}
                    <section id="shipping" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-[#F4C430] pb-3">Shipping & Delivery Policy</h2>
                        <p className="text-sm text-gray-600 mb-6">Last Updated: January 2026</p>

                        <div className="space-y-6 text-gray-700">
                            <h3 className="text-xl font-bold text-black mt-6">1. Shipping Areas</h3>
                            <p>
                                We currently ship to all serviceable locations within India. International shipping is not available at this time.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">2. Delivery Timeline</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Standard Delivery:</strong> 5-7 business days from order confirmation</li>
                                <li><strong>Express Delivery:</strong> 2-3 business days (where available)</li>
                                <li>Delivery times may vary based on location and courier availability</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">3. Shipping Charges</h3>
                            <p>
                                Shipping charges are calculated based on order value, weight, and delivery location. Applicable charges will be displayed at checkout.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">4. Order Processing</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Orders are processed within 24-48 hours of confirmation</li>
                                <li>You will receive tracking information via email and SMS once shipped</li>
                                <li>Orders placed on weekends/holidays will be processed on the next business day</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">5. Delivery Confirmation</h3>
                            <p>
                                A signature may be required upon delivery. If you are unavailable, the courier will attempt redelivery or leave a notification for pickup.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">6. Damaged or Lost Shipments</h3>
                            <p>
                                If your order arrives damaged or does not arrive, please contact us immediately at:<br />
                                Email: support@bigbie.com<br />
                                Phone: +91 831-0306547
                            </p>
                        </div>
                    </section>

                    {/* Refund Policy */}
                    <section id="refund" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-[#F4C430] pb-3">Refund Policy</h2>
                        <p className="text-sm text-gray-600 mb-6">Last Updated: January 2026</p>

                        <div className="space-y-6 text-gray-700">
                            <h3 className="text-xl font-bold text-black mt-6">1. Return Eligibility</h3>
                            <p>
                                Returns are accepted within 7 days of delivery for the following reasons:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Defective or damaged products</li>
                                <li>Wrong product delivered</li>
                                <li>Size or fit issues</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">2. Non-Returnable Items</h3>
                            <p>The following items cannot be returned for hygiene reasons:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Innerwear that has been worn, washed, or tags removed</li>
                                <li>Products purchased during final sale or clearance</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">3. Return Process</h3>
                            <p>To initiate a return:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact our customer service within 7 days of delivery</li>
                                <li>Provide order number and reason for return</li>
                                <li>Pack the product in original packaging with all tags attached</li>
                                <li>Ship the product to the provided return address</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">4. Refund Processing</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Refunds are processed within 7-10 business days of receiving the returned item</li>
                                <li>Refunds will be credited to the original payment method</li>
                                <li>Shipping charges are non-refundable unless the item is defective</li>
                            </ul>

                            <h3 className="text-xl font-bold text-black mt-6">5. Exchanges</h3>
                            <p>
                                We offer exchanges for size or color variations subject to availability. Contact customer service to arrange an exchange.
                            </p>

                            <h3 className="text-xl font-bold text-black mt-6">6. Contact for Returns</h3>
                            <p>
                                For return requests or questions:<br />
                                Email: returns@bigbie.com<br />
                                Phone: +91 831-0306547<br />
                                Address: Big Bie, Bangalore, Karnataka, India
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LegalPage;
