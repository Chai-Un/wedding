import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

const navItems = [
  { name: "HOME", href: "home" },
  { name: "SCHEDULE", href: "schedule" },
  { name: "VENUE", href: "venue" },
  { name: "GALLERY", href: "gallery" },
  { name: "RSVP", href: "rsvp" },
  { name: "FAQs", href: "faqs" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on a gallery detail page
  const isGalleryDetailPage = location.pathname.startsWith('/gallery/');

  const handleNavigation = (id: string) => {
    // If we're on a gallery detail page, navigate home first
    if (isGalleryDetailPage) {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Direct scroll on homepage
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (isGalleryDetailPage) {
      navigate('/');
    } else {
      const element = document.getElementById('home');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#e8dcc8]/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Initials */}
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-serif text-[#5a6e4a] hover:text-[#4a5e3a] transition-colors cursor-pointer italic"
          >
            <img src={logo} alt="Hoàng & Ngân Wedding" className="h-10 w-10 object-contain inline-block mr-2" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="text-xs font-medium text-[#5a6e4a] hover:text-[#4a5e3a] transition-colors cursor-pointer tracking-wider"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-[#5a6e4a]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#e8dcc8] border-t border-[#5a6e4a]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-[#5a6e4a] hover:text-[#4a5e3a] hover:bg-[#d4c5ad]/30 rounded-md transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
