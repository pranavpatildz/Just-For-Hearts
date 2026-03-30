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

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-[#F8FAFC] px-4 py-14 text-center md:px-8 md:py-20 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl"
        >
          Refund Policy
        </motion.h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base">Last updated: April 05, 2025</p>
      </section>

      <motion.section
        className="mx-auto max-w-4xl space-y-8 rounded-[2rem] bg-white px-6 py-10 text-sm leading-relaxed text-slate-700 shadow-md md:px-8 md:py-12 md:text-base"
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
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-teal-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            1. Acceptance of Terms
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            By accessing or using the VERIT instant health advice service (the "Service"), you
            agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to
            these Terms, you may not use the Service.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-teal-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            2. Description of Service
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            VERIT is a platform that connects users with certified doctors and specialists for
            real-time health consultations and advice on a pay-per-use basis. The Service allows
            users to book consultations for a fixed duration, communicate with medical
            professionals, and receive personalized health insights. VERIT offers access to
            professionals with expertise in various health areas, including cardiology, diabetes,
            weight management, and nutrition.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-teal-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            3. User Accounts and Registration
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Eligibility:</strong> By
            registering for an account, you represent and warrant that you are at least 18 years
            of age and have the legal capacity to enter into these Terms.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Account Creation:</strong>{" "}
            To use certain features of the Service, you may need to create an account. You agree
            to provide accurate, current, and complete information during the registration process
            and to update your information as necessary to keep it accurate, current, and complete.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Account Security:</strong>{" "}
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account. You agree to notify us immediately of
            any unauthorized access to or use of your account. We will not be liable for any loss
            or damage arising from your failure to comply with this provision.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Account Termination:</strong>{" "}
            We reserve the right to suspend or terminate your account at any time, with or without
            cause and without prior notice.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            4. Consultations and Advice
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Nature of Advice:</strong>{" "}
            The advice provided by medical professionals through the Service is for informational
            and guidance purposes only and should not be considered a substitute for in-person
            consultation, diagnosis, or treatment by a qualified healthcare professional.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">No Doctor-Patient Relationship:</strong>{" "}
            Your use of the Service does not create a direct doctor-patient relationship between
            you and VERIT or any of the medical professionals providing consultations.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Limitations of Online Consultations:</strong>{" "}
            Online consultations have limitations compared to in-person examinations. Medical
            professionals providing consultations through the Service may not have access to all the
            information that would be available during an in-person visit.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">User Responsibility:</strong>{" "}
            You are solely responsible for the information you provide during consultations and for
            your reliance on any advice received through the Service. Always consult with your
            primary care physician or other qualified healthcare provider for any medical concerns
            or before making any decisions related to your health or treatment.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Emergency Situations:</strong>{" "}
            VERIT is not intended for use in medical emergencies. If you are experiencing a medical
            emergency, please call your local emergency number or go to the nearest emergency room.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Booking a Consultation:</strong>{" "}
            Upon payment of the applicable fee for a 10-minute or 15-minute consultation, you will
            be connected with a medical expert based on your selected health concern.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            5. Payment Terms
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Pay-Per-Use Service:</strong>{" "}
            VERIT operates on a one-time pay-per-use model. You will be charged a fee for each
            consultation you book based on the selected duration.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Consultation Durations and Fees:</strong>{" "}
            We currently offer consultations in the following durations with the corresponding fees
            (all fees are in Indian Rupees - INR):
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}>10-Minute Consultation: ?99 INR</motion.li>
            <motion.li variants={itemVariants}>15-Minute Consultation: ?129 INR</motion.li>
          </motion.ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We reserve the right to modify these fees at any time, and we will notify you of any
            changes prior to your booking.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Booking and Payment:</strong>{" "}
            To book a consultation, you will need to select the desired duration and make the full
            payment of the applicable fee in advance. Your consultation will be confirmed only upon
            successful payment.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Payment Methods:</strong>{" "}
            We accept payments through [Specify Accepted Payment Methods, e.g., credit cards, debit
            cards, net banking, UPI]. By providing your payment information, you represent and
            warrant that you are authorized to use the selected payment method.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Commencement of Consultation:</strong>{" "}
            The consultation will commence at the scheduled time. It is your responsibility to be
            available at the scheduled time.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Ending the Consultation:</strong>{" "}
            The consultation will automatically end after the selected duration (10 or 15 minutes),
            regardless of whether you or the medical expert ends the call.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">No Refunds for Used Time:</strong>{" "}
            Once a consultation has commenced, no refunds will be provided for the used duration,
            even if the consultation ends early due to technical issues on your end or if you
            choose to end it prematurely.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Technical Issues on VERIT's End:</strong>{" "}
            In the event of significant technical issues on VERIT's end that prevent the
            consultation from taking place or severely disrupt it, we will, at our sole discretion,
            offer you a rescheduling of the consultation or a credit for a future consultation of
            the same duration.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Late Arrival by Medical Expert:</strong>{" "}
            While we strive for punctuality, if a medical expert is significantly late for the
            scheduled consultation, we will make reasonable efforts to extend the consultation
            duration or offer you a rescheduling option.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">No Guarantee of Resolution:</strong>{" "}
            We do not guarantee that a single consultation will resolve your health concern. You may
            need multiple consultations or follow-up care with a healthcare professional.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Taxes:</strong> All fees
            are inclusive of applicable taxes unless otherwise stated.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Currency:</strong> All
            transactions are processed in Indian Rupees (INR).
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            6. Intellectual Property Rights
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Service Content:</strong>{" "}
            The Service and its content, including but not limited to text, graphics, images,
            logos, and software, are owned by or licensed to VERIT and are protected by copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">User Content:</strong>{" "}
            You retain ownership of any content you submit or upload to the Service (if
            applicable). However, by submitting or uploading content, you grant VERIT a
            non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and sublicensable
            right to use, reproduce, modify, adapt, publish, translate, create derivative works
            from, distribute, and display such content in connection with the Service.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            <strong className="font-semibold text-gray-900 tracking-tight">Restrictions:</strong>{" "}
            You may not reproduce, modify, distribute, display, or create derivative works from any
            part of the Service or its content without our express written consent.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            7. User Responsibilities
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">You agree to:</p>
          <motion.ul className="list-disc pl-6 space-y-2 mt-3 text-gray-700" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={listVariants} transition={{ duration: 0.6 }}>
            <motion.li variants={itemVariants}>Comply with these Terms and our Acceptable Use Policy and Privacy Policy.</motion.li>
            <motion.li variants={itemVariants}>Provide accurate and truthful information when using the Service.</motion.li>
            <motion.li variants={itemVariants}>Use the Service only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the Service.</motion.li>
            <motion.li variants={itemVariants}>Be responsible for obtaining and maintaining all necessary equipment and internet access required to use the Service.</motion.li>
          </motion.ul>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            8. Disclaimer of Warranties
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF
            ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES
            ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. VERIT DOES NOT WARRANT THAT THE
            SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS OR ERRORS
            WILL BE CORRECTED. WE MAKE NO WARRANTIES REGARDING THE QUALIFICATIONS, EXPERTISE, OR
            OPINIONS OF THE MEDICAL PROFESSIONALS PROVIDING CONSULTATIONS THROUGH THE SERVICE.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            9. Limitation of Liability
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VERIT, ITS
            AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            (INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, DATA, USE, GOODWILL, OR
            OTHER INTANGIBLE LOSSES) ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR
            INABILITY TO ACCESS OR USE, THE SERVICE, ANY CONTENT ON THE SERVICE, OR ANY ADVICE OR
            INFORMATION RECEIVED THROUGH THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT
            (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF VERIT HAS BEEN ADVISED OF
            THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT
            OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO
            US FOR THE SPECIFIC CONSULTATION GIVING RISE TO THE LIABILITY.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            10. Indemnification
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless VERIT, its affiliates, officers,
            directors, employees, agents, licensors, and service providers from and against any and
            all claims, liabilities, damages, losses, costs, and expenses (including reasonable
            attorneys' fees) arising out of or relating to your breach of these Terms, your use of
            the Service, or your violation of any law or the rights of a third party.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            11. Governing Law and Jurisdiction
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of India,
            without regard to its conflict of law principles. Any dispute arising out of or
            relating to these Terms or the Service shall be subject to the exclusive jurisdiction of
            the courts located in Pimpri-Chinchwad, Maharashtra, India.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            12. Termination
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may terminate these Terms at any time, with or without cause and without prior
            notice. Upon termination, your right to access and use the Service will immediately
            cease. All provisions of these Terms that by their nature should survive termination
            shall survive termination, including but not limited to the disclaimers of warranties,
            limitations of liability, indemnification obligations, and governing law provisions.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            13. Entire Agreement
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            These Terms, together with our Privacy Policy and Acceptable Use Policy, constitute the
            entire agreement between you and VERIT regarding your access to and use of the Service
            and supersede all prior or contemporaneous communications and proposals, whether oral
            or written.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            14. Amendments
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may update these Terms from time to time. We will notify you of any material changes
            by posting the new Terms on the Website or through other reasonable means. Your
            continued use of the Service after the effective date of any changes constitutes your
            acceptance of the revised Terms.
          </p>
        </div>

        <div>
          <motion.h2 {...headingTransition} className="mt-10 border-l-4 border-cyan-600 pl-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            15. Contact Us
          </motion.h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            If you have any questions or concerns about these Terms, please contact us at: +91
            94229 91576
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
