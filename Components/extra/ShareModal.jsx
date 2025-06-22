"use client";

import {
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLink,
} from "react-icons/fa";

const ShareModal = ({
  isOpen,
  onClose,
  url,
}) => {
  if (!isOpen) return null;

  const shareLinks = [
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
      icon: FaTelegram,
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    },
    {
      icon: FaTwitter,
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      icon: FaFacebook,
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded mb-4">
          <input
            className="flex-1 bg-transparent outline-none"
            value={url}
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="hover:text-blue-500"
          >
            <FaLink />
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
