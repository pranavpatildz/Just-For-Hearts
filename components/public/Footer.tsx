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
    <footer className="w-full bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Founder</h3>
            <div className="space-y-2 text-gray-800">
              <div className="flex items-center justify-center md:justify-start gap-2 font-semibold">
                <span>Dr. Ravindra L. Kulkarni</span>
                <a
                  href="https://www.linkedin.com/in/drravindrakulkarni/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black text-base"
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

          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Legal</h3>
            <div className="space-y-2 text-gray-600">
              <a href="#" className="block hover:text-black transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-black transition-colors">
                Refund Policy
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-5 mt-4 text-gray-500 text-xl">
              <a
                href="https://www.facebook.com/JustForHearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="transition duration-200 hover:text-blue-600 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/justforhearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="transition duration-200 hover:text-pink-500 cursor-pointer" />
              </a>
              <a
                href="https://www.youtube.com/c/JustForHearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="transition duration-200 hover:text-red-600 cursor-pointer" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919422989425&text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="transition duration-200 hover:text-green-500 cursor-pointer" />
              </a>
              <a
                href="https://www.linkedin.com/company/just-for-hearts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="transition duration-200 hover:text-blue-700 cursor-pointer" />
              </a>
              <a
                href="https://www.google.com/maps/place/Just+For+Hearts/@18.6129325,73.7841827,1045m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2beb56443c08f:0xed6d83746e7c1253!8m2!3d18.6129325!4d73.786763!16s%2Fg%2F11b7kcqnwd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                <FaMapMarkerAlt className="transition duration-200 hover:text-red-500 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="text-center">
            <Image
              src="/images/logo.png"
              alt="Just For Hearts"
              width={80}
              height={80}
              className="mx-auto w-20 h-auto"
            />
            <p className="text-gray-600 leading-relaxed mt-4">
              JFH is designed by clinicians with 20+ years experience and trusted by over 50,000
              patients. It&rsquo;s your wellness partner &ndash; fast, affordable, and always there.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          Copyright &copy; 2025 Just For Hearts Healthcare Private Limited. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
