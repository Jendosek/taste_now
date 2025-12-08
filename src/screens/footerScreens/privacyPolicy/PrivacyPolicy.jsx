import React from 'react';
import './style.css';

const PrivacyPolicy = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <h1 className="policy-title">Privacy <span className="highlight">Policy</span></h1>
                <p className="last-updated">Last updated: December 8, 2025</p>

                <div className="policy-content">
                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to TasteNow. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit
                            our website (regardless of where you visit it from) and tell you about your privacy rights
                            and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul>
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>
                    </section>

                    <section>
                        <h2>5. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us via our <a href="/contact">Contact page</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;