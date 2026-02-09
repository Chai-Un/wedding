import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
	{ nameKey: 'nav.home', href: 'home' },
	{ nameKey: 'nav.invitation', href: 'rsvp' },
	{ nameKey: 'nav.schedule', href: 'schedule' },
	{ nameKey: 'nav.ourStory', href: 'our-story' },
	{ nameKey: 'nav.gallery', href: 'gallery' },
];

interface NavigationProps {
	overlay?: boolean; // If true, uses transparent overlay style. If false, uses solid background.
}

export default function Navigation({ overlay = false }: NavigationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();

	// Check if we're on a gallery detail page
	const isGalleryDetailPage = location.pathname.startsWith('/gallery/');

	// Track scroll position for background change
	useEffect(() => {
		if (!overlay) return;

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [overlay]);

	const handleNavigation = (id: string) => {
		// close mobile menu immediately
		setIsOpen(false);

		// helper to invoke react-scroll scroller
		const doScroll = () => {
			scroller.scrollTo(id, {
				duration: 500,
				smooth: true,
				offset: -70, // account for fixed nav height
			});
		};

		// If we're on a gallery detail page, navigate home first then scroll
		if (isGalleryDetailPage) {
			navigate('/');
			// small delay to allow route change / DOM mount
			setTimeout(doScroll, 150);
			return;
		}

		// Direct scroll on homepage
		doScroll();
	};

	// Conditional styling based on overlay prop
	const navClasses = overlay
		? `fixed top-0 left-0 right-0 z-50 p-2 md:py-10 md:px-6 transition-all duration-300 ${
				isScrolled ? 'md:!py-5 bg-black/30 backdrop-blur-md' : ''
			}`
		: 'fixed top-0 left-0 right-0 bg-[#e8dcc8]/95 backdrop-blur-sm shadow-sm z-50 py-4 md:py-6';

	const buttonClasses = overlay
		? 'text-sm md:text-base lg:text-xl font-light text-white/80 hover:text-white active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase'
		: 'text-sm md:text-base lg:text-xl font-medium text-white/80 hover:text-white active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase';

	const mobileButtonClasses = overlay
		? 'text-white hover:bg-white/10 p-2 rounded-md transition-colors'
		: 'text-[#5a6e4a] hover:bg-[#5a6e4a]/10 p-2 rounded-md transition-colors';

	const mobileMenuClasses = overlay
		? 'md:hidden mt-4 bg-[#d6c1a0]/20 backdrop-blur-sm rounded-lg'
		: 'md:hidden bg-[#e8dcc8] border-t border-[#5a6e4a]/20';

	const mobileItemClasses = overlay
		? 'block w-full text-left px-3 py-2 text-[0.75em] md:text-[0.875em] font-light text-white hover:bg-white/10 rounded-md transition-colors uppercase font-hoangngan7'
		: 'block w-full text-left px-3 py-2 text-[0.875em] md:text-[1em] font-medium text-[#5a6e4a] hover:text-[#4a5e3a] hover:bg-[#d4c5ad]/30 rounded-md transition-colors uppercase font-hoangngan7';

	return (
		<nav className={navClasses}>
			<div className="w-full md:w-[90vw] mx-auto">
				<div
					className={
						overlay
							? 'flex items-center justify-center'
							: 'flex items-center justify-center h-16'
					}
				>
					{/* Desktop Navigation - Centered */}
					<div className="hidden md:flex items-center md:space-x-7 lg:space-x-12">
						{navItems.map((item) => (
							<button
								key={item.href}
								onClick={() => handleNavigation(item.href)}
								className={buttonClasses}
							>
								{t(item.nameKey)}
							</button>
						))}
					</div>

					{/* Language Switcher - Left */}
					<div className="md:absolute md:top-1/2 md:right-2 md:transform md:-translate-y-1/2">
						<LanguageSwitcher />
					</div>

					{/* Mobile menu button - Right */}
					<div className="md:hidden ml-auto">
						<button
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
							className={mobileButtonClasses}
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className={mobileMenuClasses}>
					<div className="px-4 py-3 space-y-2">
						{navItems.map((item) => (
							<button
								key={item.href}
								onClick={() => handleNavigation(item.href)}
								className={mobileItemClasses}
							>
								{t(item.nameKey)}
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
