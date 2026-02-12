import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface StackedCarouselProps {
	children: React.ReactNode[];
	autoPlay?: boolean;
	autoplayDelay?: number;
	className?: string;
}

export function StackedCarousel({
	children,
	autoPlay = true,
	autoplayDelay = 3000,
	className = '',
}: StackedCarouselProps) {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [isDragging, setIsDragging] = React.useState(false);
	const total = React.Children.count(children);
	const touchStartX = React.useRef(0);
	const touchEndX = React.useRef(0);
	const isDraggingRef = React.useRef(false);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true },
		autoPlay
			? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true, stopOnMouseEnter: true })]
			: []
	);

	React.useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setActiveIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on('select', onSelect);
		onSelect();

		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi]);

	const handleDotClick = (index: number) => {
		emblaApi?.scrollTo(index);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
		touchEndX.current = e.touches[0].clientX;
		setIsDragging(true);
		isDraggingRef.current = true;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDraggingRef.current) return;
		touchEndX.current = e.touches[0].clientX;
		
		// Prevent vertical scroll while swiping horizontally
		const diff = Math.abs(touchStartX.current - touchEndX.current);
		if (diff > 10) {
			e.preventDefault();
		}
	};

	const handleTouchEnd = () => {
		if (!isDraggingRef.current) return;
		
		const diff = touchStartX.current - touchEndX.current;
		// Responsive threshold: smaller on mobile, larger on tablet
		const threshold = window.innerWidth < 768 ? 50 : 75;

		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				emblaApi?.scrollNext();
			} else {
				emblaApi?.scrollPrev();
			}
		}
		
		setIsDragging(false);
		isDraggingRef.current = false;
	};

	// Mouse/pointer events for tablet/hybrid devices
	const handlePointerDown = (e: React.PointerEvent) => {
		// Only handle touch or pen input, not mouse on desktop
		if (e.pointerType === 'mouse' && window.innerWidth > 1024) return;
		
		touchStartX.current = e.clientX;
		touchEndX.current = e.clientX;
		setIsDragging(true);
		isDraggingRef.current = true;
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDraggingRef.current) return;
		touchEndX.current = e.clientX;
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		if (!isDraggingRef.current) return;
		
		const diff = touchStartX.current - touchEndX.current;
		const threshold = window.innerWidth < 768 ? 50 : 75;

		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				emblaApi?.scrollNext();
			} else {
				emblaApi?.scrollPrev();
			}
		}
		
		setIsDragging(false);
		isDraggingRef.current = false;
		e.currentTarget.releasePointerCapture(e.pointerId);
	};

	return (
		<div className={className}>
			{/* Hidden Embla container for autoplay engine */}
			<div ref={emblaRef} className="overflow-hidden h-0 opacity-0 pointer-events-none" aria-hidden="true">
				<div className="flex">
					{React.Children.map(children, (_, i) => (
						<div key={i} className="min-w-0 shrink-0 grow-0 basis-full" />
					))}
				</div>
			</div>

			{/* Visible stacked cards with swipe */}
			<div
				className={`relative h-110 flex items-center justify-center touch-pan-y ${
					isDragging ? 'cursor-grabbing' : 'cursor-grab'
				}`}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={() => {
					setIsDragging(false);
					isDraggingRef.current = false;
				}}
			>
				{React.Children.map(children, (child, index) => {
					// Calculate circular distance from active
					let offset = index - activeIndex;
					if (offset > total / 2) offset -= total;
					if (offset < -total / 2) offset += total;

					const absOffset = Math.abs(offset);
					const isActive = offset === 0;
					const isVisible = absOffset <= 2;

					if (!isVisible) return null;

					return (
						<div
							key={index}
							className="absolute transition-all duration-500 ease-out"
							style={{
								transform: `
									translateY(${absOffset * 12}px)
									scale(${1 - absOffset * 0.08})
								`,
								zIndex: 10 - absOffset,
								opacity: isActive ? 1 : Math.max(0, 0.6 - absOffset * 0.25),
								filter: isActive ? 'none' : `blur(${absOffset}px)`,
								pointerEvents: isActive ? 'auto' : 'none',
							}}
						>
							{child}
						</div>
					);
				})}
			</div>

			{/* Progress dots */}
			<div className="flex justify-center gap-2 mt-4">
				{Array.from({ length: total }).map((_, index) => (
					<button
						key={index}
						onClick={() => handleDotClick(index)}
						className="p-1"
						aria-label={`Go to photo ${index + 1}`}
					>
						<div
							className={`rounded-full transition-all duration-300 ${
								index === activeIndex
									? 'w-6 h-2 bg-[#412d1d]'
									: 'w-2 h-2 bg-[#412d1d]/30'
							}`}
						/>
					</button>
				))}
			</div>
		</div>
	);
}
