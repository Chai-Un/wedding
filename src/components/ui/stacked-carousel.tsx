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
	const total = React.Children.count(children);
	const touchStartX = React.useRef(0);
	const touchEndX = React.useRef(0);

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
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const diff = touchStartX.current - touchEndX.current;
		const threshold = 50;

		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				emblaApi?.scrollNext();
			} else {
				emblaApi?.scrollPrev();
			}
		}
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
				className="relative h-110 flex items-center justify-center"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
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
