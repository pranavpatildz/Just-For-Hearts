"use client";

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  agreeContact: boolean;
  onAgreeContactChange: (checked: boolean) => void;
};

export default function ServiceCard({
  title,
  description,
  price,
  agreeContact,
  onAgreeContactChange,
}: ServiceCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-blue-700 font-semibold mt-3">{price}</p>
      <label className="mt-4 inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={agreeContact}
          onChange={(e) => onAgreeContactChange(e.target.checked)}
          className="rounded border-gray-300 text-red-500 focus:ring-red-400"
        />
        I agree to be contacted by staff.
      </label>
    </div>
  );
}
