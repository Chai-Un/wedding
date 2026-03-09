import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';

const navItems = [
	{ nameKey: 'nav.home', href: 'home' },
	{ nameKey: 'nav.invitation', href: 'rsvp' },
	{ nameKey: 'nav.schedule', href: 'timeline' },
	{ nameKey: 'nav.ourStory', href: 'our-journey' },
	{ nameKey: 'nav.gallery', href: 'gallery' },
];

interface NavigationProps {
	overlay?: boolean; // If true, uses transparent overlay style. If false, uses solid background.
	alwaysShow?: boolean;
}

export default function Navigation({
	overlay = false,
	alwaysShow = false,
}: NavigationProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
	const galleryRef = useRef<HTMLDivElement>(null);
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

	// Auto-open mobile gallery submenu when on a gallery page
	useEffect(() => {
		if (location.pathname.startsWith('/gallery/')) {
			setMobileGalleryOpen(true);
		}
	}, [location.pathname]);

	// Close gallery dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				galleryRef.current &&
				!galleryRef.current.contains(e.target as Node)
			) {
				setGalleryOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleNavigation = (id: string) => {
		// close mobile menu immediately
		setIsOpen(false);

		// Calculate offset based on device and nav state
		const isMobile = window.innerWidth < 768;
		let scrollOffset: number;

		if (overlay) {
			// Overlay mode (homepage)
			scrollOffset = isMobile ? -20 : isScrolled ? -50 : -90;
		} else {
			// Solid mode (gallery pages)
			scrollOffset = isMobile ? -60 : -80;
		}

		// helper to invoke react-scroll scroller
		const doScroll = () => {
			scroller.scrollTo(id, {
				duration: 200,
				smooth: true,
				offset: scrollOffset,
			});
		};

		// If we're on a gallery detail page, navigate home first then scroll
		if (isGalleryDetailPage) {
			navigate('/home');
			// small delay to allow route change / DOM mount
			setTimeout(doScroll, 150);
			return;
		}

		// Direct scroll on homepage
		doScroll();
	};

	// Conditional styling based on overlay prop
	const navClasses = overlay
		? `fixed top-0 left-0 right-0 z-50 py-2 px-2 md:py-10 md:px-6 transition-all duration-300 ${
				isScrolled || alwaysShow
					? 'md:!py-5 bg-black/30 backdrop-blur-md'
					: ''
			}`
		: 'fixed top-0 left-0 right-0 bg-[#eee5d5]/95 backdrop-blur-sm shadow-sm z-50 py-3 md:py-6';

	const buttonClasses = overlay
		? 'text-sm md:text-base lg:text-xl font-light text-white hover:scale-105 active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase'
		: 'text-sm md:text-base lg:text-xl font-medium text-white hover:scale-105 active:text-white transition-colors tracking-wider cursor-pointer font-hoangngan7 uppercase';

	const mobileButtonClasses = overlay
		? 'text-white hover:bg-white/10 p-2 rounded-md transition-colors'
		: 'text-[#5a6e4a] hover:bg-[#5a6e4a]/10 p-2 rounded-md transition-colors';

	const mobileMenuClasses = overlay
		? 'md:hidden mt-4 bg-[#d6c1a0]/20 backdrop-blur-sm rounded-lg'
		: 'md:hidden bg-[#eee5d5] border-t border-[#5a6e4a]/20';

	const mobileItemClasses = overlay
		? 'block w-full text-left px-3 py-2 text-[0.75em] md:text-[0.875em] font-light text-white hover:bg-white/10 rounded-md transition-colors uppercase font-hoangngan7'
		: 'block w-full text-left px-3 py-2 text-[0.875em] md:text-[1em] font-medium text-[#5a6e4a] hover:text-[#4a5e3a] hover:bg-[#d4c5ad]/30 rounded-md transition-colors uppercase font-hoangngan7';

	return (
		<nav className={navClasses}>
			<div className="w-full md:w-[90vw] mx-auto md:ml-0 lg:mx-auto">
				<div
					className={
						overlay
							? 'flex items-center justify-center h-12 md:h-auto'
							: 'flex items-center justify-center h-12 md:h-auto'
					}
				>
					{/* Desktop Navigation - Centered */}
					<div className="hidden md:flex items-center md:space-x-5 lg:space-x-12">
						{navItems.map((item) =>
							item.href === 'gallery' ? (
								<div
									key="gallery"
									className="relative"
									ref={galleryRef}
								>
									<button
										onClick={() =>
											setGalleryOpen((v) => !v)
										}
										className={`${buttonClasses} flex items-center gap-1`}
									>
										{t(item.nameKey)}
										<ChevronDown
											className={`w-3.5 h-3.5 transition-transform duration-200 ${galleryOpen ? 'rotate-180' : ''}`}
										/>
									</button>
									{galleryOpen && (
										<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-1 bg-black/60 backdrop-blur-md rounded-lg shadow-lg min-w-45 z-50">
											{GALLERY_CONCEPTS.map((concept) => {
												const isActive =
													location.pathname ===
													concept.path;
												return (
													<button
														key={concept.id}
														onClick={() => {
															setGalleryOpen(
																false,
															);
															navigate(
																concept.path,
															);
														}}
														className={`block w-full text-left px-4 py-2.5 text-sm lg:text-base hover:bg-white/10 transition-colors font-hoangngan7 uppercase tracking-wider whitespace-nowrap cursor-pointer ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
													>
														{concept.title}
													</button>
												);
											})}
										</div>
									)}
								</div>
							) : (
								<button
									key={item.href}
									onClick={() => handleNavigation(item.href)}
									className={buttonClasses}
								>
									{t(item.nameKey)}
								</button>
							),
						)}
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
						{navItems.map((item) =>
							item.href === 'gallery' ? (
								<div key="gallery">
									<button
										onClick={() =>
											setMobileGalleryOpen((v) => !v)
										}
										className={`${mobileItemClasses} flex items-center justify-between`}
									>
										{t(item.nameKey)}
										<ChevronDown
											className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileGalleryOpen ? 'rotate-180' : ''}`}
										/>
									</button>
									{mobileGalleryOpen && (
										<div className="pl-4 mt-1 space-y-1">
											{GALLERY_CONCEPTS.map((concept) => {
												const isActive =
													location.pathname ===
													concept.path;
												return (
													<button
														key={concept.id}
														onClick={() => {
															setIsOpen(false);
															setMobileGalleryOpen(
																false,
															);
															navigate(
																concept.path,
															);
														}}
														className={`${mobileItemClasses} text-[0.7em] ${isActive ? 'opacity-100 bg-white/10' : 'opacity-80'}`}
													>
														{concept.title}
													</button>
												);
											})}
										</div>
									)}
								</div>
							) : (
								<button
									key={item.href}
									onClick={() => handleNavigation(item.href)}
									className={mobileItemClasses}
								>
									{t(item.nameKey)}
								</button>
							),
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
