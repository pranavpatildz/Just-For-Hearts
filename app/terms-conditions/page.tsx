"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const headingTransition = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-r from-green-100 via-emerald-100 to-green-50 py-14 md:py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold text-gray-800 font-[var(--font-playfair)]"
        >
          Terms &amp; Conditions
        </motion.h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base">Last updated: April 05, 2025</p>
      </section>

      <motion.section
        className="max-w-4xl mx-auto px-6 py-14 text-gray-700 leading-relaxed space-y-8 font-[var(--font-inter)] text-sm md:text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mt-3 text-gray-700 leading-relaxed">
          These Terms and Conditions govern your access to and use of the Just For Hearts digital
          healthcare platform and services provided through the website justforhearts.org. The
          platform provides information about cardiac rehabilitation programs, allows users to learn
          about heart-health services, consult with healthcare professionals, submit feedback, and
          access related healthcare resources. By accessing or using this Website and its services,
          you agree to comply with these Terms and Conditions.
        </p>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">
            Introduction and Commitment to Privacy
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            At VERIT, we are committed to protecting your privacy and ensuring the confidentiality
            of your personal and health-related information. This Privacy Policy is designed to
            inform you about our practices regarding the collection, use, and disclosure of your
            information. By using our Service, you consent to the practices described in this
            Privacy Policy.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">
            Information We Collect
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We collect different types of information from and about you, including:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Personal Information:</strong> This includes information that can be used to identify you, such as your name, date of birth, gender, contact information (email address, phone number, address), and payment information (if applicable).</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Health Information:</strong> This includes information about your health concerns, medical history, symptoms, lifestyle, and any other information you provide during consultations with our medical professionals. This also includes any notes or summaries created by the medical professionals during your consultations.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Usage Information:</strong> This includes information about how you use our Service, such as the date and time of your consultations, the topics you discuss, the features you use, and your interactions with the Website and App.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Device Information:</strong> This includes information about the device you use to access our Service, such as your IP address, device type, operating system, browser type, and unique device identifiers.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Cookies and Similar Technologies:</strong> We may use cookies, web beacons, and other similar technologies to collect information about your Browse activities on our Website and App. This helps us improve our Service and personalize your experience. You can manage your cookie preferences through your browser settings.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Information from Third Parties:</strong> We may receive information about you from third parties, such as payment processors or analytics providers.</motion.li>
          </motion.ul>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">How We Collect Information</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We collect your information in the following ways:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Directly from You:</strong> When you register for an account, book a consultation, communicate with our medical professionals or customer support, or otherwise interact with our Service.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Automatically:</strong> When you use our Website or App, certain information is collected automatically through cookies and similar technologies.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">From Medical Professionals:</strong> Our medical professionals may provide us with notes and summaries of your consultations for quality assurance, record-keeping, and to improve the Service.</motion.li>
          </motion.ul>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">How We Use Your Information</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We use your information for various purposes, including:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Providing the Service:</strong> To facilitate your consultations with medical professionals, provide you with health advice, and personalize your experience.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Payment Processing:</strong> To process your payments for the consultations you book.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Communication:</strong> To communicate with you about your consultations, account updates, service announcements, and promotional offers (with your consent).</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Improving the Service:</strong> To analyze usage patterns, identify areas for improvement, and develop new features and functionalities.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Personalization:</strong> To tailor the content and recommendations you see on our Service based on your health concerns and preferences.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Research and Development:</strong> To conduct research and development activities to improve healthcare outcomes and advance medical knowledge (in an anonymized and aggregated form where possible).</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Customer Support:</strong> To provide you with assistance and respond to your inquiries.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Security and Fraud Prevention:</strong> To protect the security and integrity of our Service and prevent fraudulent activities.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Quality Assurance:</strong> To monitor and improve the quality of consultations provided through our Service.</motion.li>
          </motion.ul>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Sharing Your Information</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We may share your information with the following categories of recipients:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Medical Professionals:</strong> We will share your relevant personal and health information with the medical professional you consult with through our Service to enable them to provide you with advice.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Payment Processors:</strong> We will share your payment information with third-party payment processors to facilitate the processing of your consultation fees.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Service Providers:</strong> We may engage third-party service providers to perform functions on our behalf, such as data analysis, email delivery, and hosting services. These providers will have access to your information only to the extent necessary to perform their services and are obligated to maintain its confidentiality.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Legal Compliance and Protection:</strong> We may disclose your information to law enforcement agencies, regulatory authorities, or other third parties if we believe it is necessary to comply with a legal obligation, protect our rights or property, or protect the safety of our users or the public.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Aggregated and Anonymized Data:</strong> We may share aggregated and anonymized data that does not directly identify you with third parties for research, analytics, and other purposes.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">With Your Consent:</strong> We may share your information with other third parties with your explicit consent.</motion.li>
          </motion.ul>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Data Security</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We take reasonable measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures include:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Encryption:</strong> Using industry-standard encryption technologies to protect your data during transmission.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Secure Storage:</strong> Storing your data on secure servers with restricted access.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Access Controls:</strong> Implementing access controls to limit who can access your personal information.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Regular Security Audits:</strong> Conducting regular security audits and vulnerability assessments to identify and address potential risks.</motion.li>
          </motion.ul>
          <p className="mt-3 text-gray-700 leading-relaxed">However, please note that no method of transmission over the internet or method of electronic storage is completely secure. Therefore, while we strive to protect your information, we cannot guarantee its absolute security.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Data Retention</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. This includes retaining your health information for a period necessary to comply with medical record-keeping requirements.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Your Rights and Choices</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">You have certain rights regarding your personal information, including:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Access:</strong> You may have the right to access the personal information we hold about you.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Correction:</strong> You may have the right to request that we correct any inaccurate or incomplete personal information we hold about you.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Deletion:</strong> You may have the right to request that we delete your personal information, subject to certain exceptions.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Objection to Processing:</strong> You may have the right to object to the processing of your personal information in certain circumstances.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Withdrawal of Consent:</strong> If we are processing your personal information based on your consent, you have the right to withdraw your consent at any time.</motion.li>
            <motion.li variants={itemVariants}><strong className="font-semibold text-gray-900 tracking-tight">Data Portability:</strong> You may have the right to receive your personal information in a structured, commonly used, and machine-readable format and to transmit it to another controller.</motion.li>
          </motion.ul>
          <p className="mt-3 text-gray-700 leading-relaxed">To exercise these rights, please contact us using the contact information provided below. We may require you to verify your identity before processing your request.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Children&apos;s Privacy</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">Our Service is not intended for children under the age of [Insert Minimum Age, e.g., 18]. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Links to Other Websites</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">Our Service may contain links to other websites that are not operated by us. We are not responsible for the privacy practices of these websites. We encourage you to review the privacy policies of any third-party websites you visit.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Changes to this Privacy Policy</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on the Website or through other reasonable means. Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Privacy Policy.</p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 font-[var(--font-playfair)] border-l-4 border-green-500 pl-3">Contact Us</motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at: +91 94229 91576</p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
