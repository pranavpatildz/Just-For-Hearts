import Image from "next/image";
import Link from "next/link";

type AuthSplitLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkHref: string;
};

export default function AuthSplitLayout({
  title,
  description,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkHref,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="hidden w-1/2 flex-col justify-between bg-[#F3F4F6] p-10 md:flex">
            <div>
              <Image
                src="/images/logo.png"
                alt="JFH Logo"
                width={48}
                height={48}
                className="mb-6 w-12"
              />

              <h2 className="text-2xl font-bold leading-snug text-[#0B1B2B]">
                Welcome to <br /> Just For Hearts.
              </h2>

              <p className="mt-4 text-sm text-gray-500">
                Your personal gateway to expert health consultations and smart
                disease management.
              </p>
            </div>

            <p className="mt-10 text-xs text-gray-400">
              Trusted by 10,000+ Patients
            </p>
          </div>

          <div className="w-full p-8 md:w-1/2 md:p-10">
            <h1 className="text-2xl font-bold text-[#0B1B2B]">{title}</h1>

            <p className="mb-6 mt-1 text-sm text-gray-500">{description}</p>

            {children}

            <p className="mt-6 text-center text-xs text-gray-500">
              {footerPrompt}{" "}
              <Link
                href={footerLinkHref}
                className="cursor-pointer font-medium text-red-500"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
