import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Menu, X } from 'lucide-react';

const navItems = [
	{ name: 'Trang chủ', href: 'home' },
	{ name: 'LỜI MỜI | RSVP', href: 'rsvp' },
	{ name: 'Chương Trình', href: 'schedule' },
	{ name: 'Hành trình yêu', href: 'our-story' },
	{ name: 'Thư viện ảnh', href: 'gallery' },

	// { name: 'HOME', href: 'home' },
	// { name: 'INVITATION | RSVP', href: 'rsvp' },
	// { name: 'TIMELINE', href: 'schedule' },
	// { name: 'OUR JOURNEY', href: 'our-story' },
	// { name: 'GALLERY', href: 'gallery' },
];

interface NavigationProps {
	overlay?: boolean; // If true, uses transparent overlay style. If false, uses solid background.
}

export default function Navigation({ overlay = false }: NavigationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

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
				duration: 100,
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
		? `fixed top-0 left-0 right-0 z-50 p-2 md:py-5 md:px-6 transition-all duration-300 ${
				isScrolled ? 'bg-black/30 backdrop-blur-md' : ''
			}`
		: 'fixed top-0 left-0 right-0 bg-[#e8dcc8]/95 backdrop-blur-sm shadow-sm z-50';

	const buttonClasses = overlay
		? 'text-[1em] md:text-[1.125em] lg:text-[1.25em] font-light text-white/80 hover:text-white active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase'
		: 'text-[0.625em] md:text-[0.75em] lg:text-[0.875em] font-medium text-white/80 hover:text-white active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase';

	const mobileButtonClasses = overlay
		? 'text-white hover:bg-white/10 p-2 rounded-md transition-colors'
		: 'text-[#5a6e4a] hover:bg-[#5a6e4a]/10 p-2 rounded-md transition-colors';

	const mobileMenuClasses = overlay
		? 'md:hidden mt-4 bg-black/50 backdrop-blur-sm rounded-lg'
		: 'md:hidden bg-[#e8dcc8] border-t border-[#5a6e4a]/20';

	const mobileItemClasses = overlay
		? 'block w-full text-left px-3 py-2 text-[0.75em] md:text-[0.875em] font-light text-white hover:bg-white/10 rounded-md transition-colors'
		: 'block w-full text-left px-3 py-2 text-[0.875em] md:text-[1em] font-medium text-[#5a6e4a] hover:text-[#4a5e3a] hover:bg-[#d4c5ad]/30 rounded-md transition-colors';

	return (
		<nav className={navClasses}>
			<div className="w-full md:w-[80vw] mx-auto">
				<div
					className={
						overlay
							? 'flex items-center justify-center'
							: 'flex items-center justify-center h-16'
					}
				>
					{/* Desktop Navigation - Centered */}
					<div className="hidden md:flex items-center md:space-x-12 lg:space-x-18">
						{navItems.map((item) => (
							<button
								key={item.href}
								onClick={() => handleNavigation(item.href)}
								className={buttonClasses}
							>
								{item.name}
							</button>
						))}
					</div>

					{/* Mobile menu button */}
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
								{item.name}
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
