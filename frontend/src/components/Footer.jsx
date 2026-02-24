import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Security", href: "#security" },
        { label: "About", href: "#about" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Press", href: "#press" },
        { label: "Newsroom", href: "#newsroom" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "Help Center", href: "#help" },
        { label: "API Reference", href: "#api" },
        { label: "Community", href: "#community" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "#facebook", label: "Facebook" },
    { icon: FiTwitter, href: "#twitter", label: "Twitter" },
    { icon: FiInstagram, href: "#instagram", label: "Instagram" },
    { icon: FiLinkedin, href: "#linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-dark-900 dark:bg-black text-gray-300 dark:text-gray-400">
      {/* Main Footer */}
      <div className="container-max container-padding py-16 md:py-24">
        {/* Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="font-bold text-white">SmartEdu</h3>
                <p className="text-xs text-gray-500">Learning Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Empowering students with smart learning tools and expert guidance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <FiPhone className="w-4 h-4" />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <FiMail className="w-4 h-4" />
                <span>support@smartedu.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {currentYear} SmartEdu. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
              Cookie Policy
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;