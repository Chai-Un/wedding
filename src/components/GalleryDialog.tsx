import { useState, useCallback, useEffect, useRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';

interface Photo {
	id: string;
	src: string;
	alt?: string;
}

interface GalleryDialogProps {
	photos: Photo[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialIndex?: number;
}

export default function GalleryDialog({
	photos,
	open,
	onOpenChange,
	initialIndex = 0,
}: GalleryDialogProps) {
	const [selectedIndex, setSelectedIndex] = useState(initialIndex);
	const [uiVisible, setUiVisible] = useState(true);
	const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
	const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	// const thumbsRef = useRef<HTMLDivElement>(null); // used by thumbnail carousel (commented out)
	const touchStartX = useRef(0);
	const touchStartY = useRef(0);

	const resetHideTimer = useCallback(() => {
		setUiVisible(true);
		clearTimeout(hideTimer.current);
		hideTimer.current = setTimeout(() => setUiVisible(false), 2000);
	}, []);

	// Cleanup timer on unmount
	useEffect(() => () => clearTimeout(hideTimer.current), []);

	// Reset state when dialog opens/closes
	useEffect(() => {
		if (open) {
			setSelectedIndex(initialIndex);
			resetHideTimer();
		} else {
			clearTimeout(hideTimer.current);
		}
	}, [open, initialIndex, resetHideTimer]);

	// Reset portrait detection when navigating to a different photo
	useEffect(() => {
		setIsPortrait(null);
	}, [selectedIndex]);

	const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.currentTarget;
		setIsPortrait(img.naturalHeight > img.naturalWidth);
	}, []);

	// Scroll active thumbnail into view (used by thumbnail carousel, commented out)
	// useEffect(() => {
	// 	if (!thumbsRef.current) return;
	// 	const thumb = thumbsRef.current.children[selectedIndex] as HTMLElement;
	// 	thumb?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
	// }, [selectedIndex]);

	const scrollPrev = useCallback(() => {
		setSelectedIndex((i) => (i - 1 + photos.length) % photos.length);
		resetHideTimer();
	}, [photos.length, resetHideTimer]);

	const scrollNext = useCallback(() => {
		setSelectedIndex((i) => (i + 1) % photos.length);
		resetHideTimer();
	}, [photos.length, resetHideTimer]);

	// Keyboard navigation (Left/Right arrows; Esc is handled natively by Radix)
	useEffect(() => {
		if (!open) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') scrollPrev();
			else if (e.key === 'ArrowRight') scrollNext();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [open, scrollPrev, scrollNext]);

	// Touch gesture handlers
	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			touchStartX.current = e.touches[0].clientX;
			touchStartY.current = e.touches[0].clientY;
			resetHideTimer();
		},
		[resetHideTimer],
	);

	const handleTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			const dx = e.changedTouches[0].clientX - touchStartX.current;
			const dy = e.changedTouches[0].clientY - touchStartY.current;
			const absDx = Math.abs(dx);
			const absDy = Math.abs(dy);
			if (absDy > absDx && dy > 80) {
				// Swipe down → close
				onOpenChange(false);
			} else if (absDx > absDy && absDx > 50) {
				// Swipe left/right → navigate
				if (dx < 0) scrollNext();
				else scrollPrev();
			}
		},
		[scrollPrev, scrollNext, onOpenChange],
	);

	if (!photos.length) return null;

	const photo = photos[selectedIndex];

	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			<RadixDialog.Portal>
				{/* Immersive dark overlay with blur */}
				<DialogOverlay className="bg-black/80 backdrop-blur z-[60]" />

				{/* Fullscreen viewer */}
				<RadixDialog.Content
					aria-describedby={undefined}
					className={cn(
						'fixed inset-0 z-[60] flex flex-col bg-transparent outline-none',
						'data-[state=open]:animate-in data-[state=closed]:animate-out',
						'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
						'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
						'duration-300',
					)}
					onMouseMove={resetHideTimer}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<DialogTitle className="sr-only">Photo Gallery</DialogTitle>

					{/* ── Top toolbar ──────────────────────────────────────────────── */}
					<div
						className={cn(
							'absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3',
							'bg-linear-to-b from-black/70 via-black/20 to-transparent',
							'transition-opacity duration-500',
							uiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
						)}
					>
						<span className="text-white/80 text-sm tracking-wide select-none">
							{selectedIndex + 1} / {photos.length}
						</span>
						<RadixDialog.Close
							className={cn(
								'w-10 h-10 rounded-full bg-white/10 hover:bg-white/25',
								'flex items-center justify-center text-white transition-colors cursor-pointer',
								'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
							)}
						>
							<X className="w-5 h-5" />
							<span className="sr-only">Close</span>
						</RadixDialog.Close>
					</div>

					{/* ── Image area with floating nav arrows ──────────────────────── */}
					<div className="flex-1 flex items-center justify-center min-h-0 relative group">
						{/* Prev button */}
						<button
							onClick={scrollPrev}
							aria-label="Previous photo"
							className={cn(
								'absolute left-3 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full',
								'bg-black/30 hover:bg-black/55 backdrop-blur-sm',
								'flex items-center justify-center text-white',
								'transition-all duration-300 cursor-pointer',
								'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
								uiVisible
									? 'opacity-100'
									: 'opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0',
							)}
						>
							<ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
						</button>

						{/* Photo — keyed so React replaces it on navigation, triggering fade-in */}
						<div
							key={photo.id}
							className="w-full h-full flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-300"
						>
							<ResponsiveImage
								src={photo.src}
								alt={photo.alt || `Photo ${selectedIndex + 1}`}
								className={cn(
									'object-contain',
									// On mobile, portrait images fill the screen width; landscape keeps height-based fit
									isPortrait === true
										? 'w-full h-auto md:max-w-full md:max-h-full'
										: 'max-w-full max-h-full',
								)}
								pictureClassName={isPortrait === true ? 'w-full block md:w-auto md:max-w-full md:max-h-full' : undefined}
								sizes="100vw"
								loading="eager"
								style={{ maxHeight: 'calc(100vh - 120px)' }}
								onLoad={handleImageLoad}
							/>
						</div>

						{/* Next button */}
						<button
							onClick={scrollNext}
							aria-label="Next photo"
							className={cn(
								'absolute right-3 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full',
								'bg-black/30 hover:bg-black/55 backdrop-blur-sm',
								'flex items-center justify-center text-white',
								'transition-all duration-300 cursor-pointer',
								'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
								uiVisible
									? 'opacity-100'
									: 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0',
							)}
						>
							<ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
						</button>
					</div>

					{/* ── Bottom toolbar with thumbnail strip ──────────────────── */}
					{/* Thumbnail carousel commented out
					<div
						className={cn(
							'absolute bottom-0 left-0 right-0 z-20',
							'bg-linear-to-t from-black/70 via-black/20 to-transparent',
							'pt-10 pb-3',
							'transition-opacity duration-500',
							uiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
						)}
					>
						<div
							ref={thumbsRef}
							className="flex gap-1.5 overflow-x-auto px-4 justify-start md:justify-center [scrollbar-width:none]"
						>
							{photos.map((p, index) => (
								<button
									key={p.id}
									onClick={() => {
										setSelectedIndex(index);
										resetHideTimer();
									}}
									aria-label={`Go to photo ${index + 1}`}
									className={cn(
										'relative shrink-0 w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded transition-all cursor-pointer',
										'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
										index === selectedIndex
											? 'ring-2 ring-white opacity-100 scale-110'
											: 'opacity-50 hover:opacity-90 hover:scale-105',
									)}
								>
									<ResponsiveImage
										src={p.src}
										alt={p.alt || `Thumbnail ${index + 1}`}
										className="w-full h-full object-cover"
										sizes="64px"
									/>
								</button>
							))}
						</div>
					</div>
					*/}
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
}

