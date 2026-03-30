import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 py-12 md:grid-cols-[1fr_auto_1fr] md:px-8 md:py-16 lg:px-16">
          <div className="text-left md:justify-self-start">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-white">About the Founder</h3>
            <div className="space-y-2 text-sm leading-relaxed text-slate-300 md:text-base">
              <div className="flex items-center justify-start gap-2 font-semibold">
                <span>Dr. Ravindra L. Kulkarni</span>
                <a
                  href="https://www.linkedin.com/in/drravindrakulkarni/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-base"
                  aria-label="Founder LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
              <p>MD, DNB, FSCAI (Cardiology)</p>
              <p>Sr. Consultant Physician & Cardiologist</p>
              <p className="pt-2">Founder & CEO, Just For Hearts</p>
              <p>An Initiative for Healthy Life</p>
            </div>
          </div>

          <div className="text-center md:justify-self-center">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-white">Legal</h3>
            <div className="space-y-2 text-sm text-slate-300 md:text-base">
              <a href="/terms-conditions" className="block hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/refund-policy" className="block hover:text-white transition-colors">
                Refund Policy
              </a>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-xl text-slate-400">
              <a
                href="https://www.facebook.com/JustForHearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="cursor-pointer transition duration-200 hover:text-teal-500" />
              </a>
              <a
                href="https://www.instagram.com/justforhearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="cursor-pointer transition duration-200 hover:text-teal-400" />
              </a>
              <a
                href="https://www.youtube.com/c/JustForHearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="cursor-pointer transition duration-200 hover:text-teal-400" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919422989425&text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="cursor-pointer transition duration-200 hover:text-teal-500" />
              </a>
              <a
                href="https://www.linkedin.com/company/just-for-hearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="cursor-pointer transition duration-200 hover:text-teal-400" />
              </a>
              <a
                href="https://www.google.com/maps/place/Just+For+Hearts/@18.6129325,73.7841827,1045m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2beb56443c08f:0xed6d83746e7c1253!8m2!3d18.6129325!4d73.786763!16s%2Fg%2F11b7kcqnwd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                <FaMapMarkerAlt className="cursor-pointer transition duration-200 hover:text-teal-400" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right flex flex-col items-center md:items-end md:justify-self-end">
            <Image
              src="/images/logo.png"
              alt="Just For Hearts"
              width={80}
              height={80}
              className="h-14 w-auto mb-4"
            />
            <p className="text-center text-sm leading-relaxed text-slate-300 md:text-right md:text-base">
              JFH is designed by clinicians with 20+ years experience and trusted by over 50,000
              patients. It&rsquo;s your wellness partner &ndash; fast, affordable, and always there.
            </p>
          </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="w-full px-6 py-6 text-center text-sm text-slate-400">
          Copyright &copy; 2025 Just For Hearts Healthcare Private Limited. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}


