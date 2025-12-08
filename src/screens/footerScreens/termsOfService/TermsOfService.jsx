import React from 'react';
import './style.css';

const TermsOfService = () => {
    return (
        <div className="terms-page">
            <div className="terms-container">
                <h1 className="terms-title">Terms of <span className="highlight">Service</span></h1>
                <p className="last-updated">Last updated: December 8, 2025</p>

                <div className="terms-content">
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the TasteNow website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2>2. Use of Service</h2>
                        <p>
                            You must create an account to use certain features of our service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                        </p>
                        <ul>
                            <li>You are responsible for safeguarding your password.</li>
                            <li>You agree not to disclose your password to any third party.</li>
                            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Orders and Payments</h2>
                        <p>
                            When you place an order through TasteNow, you are offering to purchase products from our restaurant partners.
                        </p>
                        <ul>
                            <li>All orders are subject to acceptance and availability.</li>
                            <li>Prices listed on the website are subject to change without notice.</li>
                            <li>Payment must be made at the time of ordering via the methods available on the site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Intellectual Property</h2>
                        <p>
                            The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of TasteNow and its licensors.
                        </p>
                    </section>

                    <section>
                        <h2>5. Limitation of Liability</h2>
                        <p>
                            In no event shall TasteNow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>

                    <section>
                        <h2>6. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;