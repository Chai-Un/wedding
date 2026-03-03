import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface OverlapCarouselProps {
	children: React.ReactNode[];
	autoPlay?: boolean;
	autoplayDelay?: number;
	className?: string;
}

export function OverlapCarousel({
	children,
	autoPlay = true,
	autoplayDelay = 4000,
	className = '',
}: OverlapCarouselProps) {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const total = React.Children.count(children);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true },
		autoPlay
			? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: false })]
			: [],
	);

	const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	/** Stop autoplay and restart it after 5 seconds of inactivity */
	const pauseAndScheduleResume = React.useCallback(() => {
		const autoplay = emblaApi?.plugins()?.autoplay as
			| { stop: () => void; play: () => void }
			| undefined;
		if (!autoplay) return;

		autoplay.stop();

		if (resumeTimer.current) clearTimeout(resumeTimer.current);
		resumeTimer.current = setTimeout(() => {
			autoplay.play();
		}, 5000);
	}, [emblaApi]);

	React.useEffect(() => {
		return () => {
			if (resumeTimer.current) clearTimeout(resumeTimer.current);
		};
	}, []);

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
		pauseAndScheduleResume();
	};

	const handlePrev = () => {
		emblaApi?.scrollPrev();
		pauseAndScheduleResume();
	};

	const handleNext = () => {
		emblaApi?.scrollNext();
		pauseAndScheduleResume();
	};

	/** Get circular offset from activeIndex */
	const getOffset = (index: number) => {
		let offset = index - activeIndex;
		if (offset > total / 2) offset -= total;
		if (offset < -total / 2) offset += total;
		return offset;
	};

	return (
		<div className={className}>
			{/* Hidden embla container to drive the autoplay / snap engine */}
			<div
				ref={emblaRef}
				className="overflow-hidden h-0 opacity-0 pointer-events-none"
				aria-hidden="true"
			>
				<div className="flex">
					{React.Children.map(children, (_, i) => (
						<div key={i} className="min-w-0 shrink-0 grow-0 basis-full" />
					))}
				</div>
			</div>

			{/* Visible 3-card overlap stack */}
			<div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '520px' }}>
				{/* Prev / Next click zones */}
				<button
					onClick={handlePrev}
					className="absolute left-0 top-0 h-full w-1/4 z-20 cursor-pointer opacity-0"
					aria-label="Previous slide"
				/>
				<button
					onClick={handleNext}
					className="absolute right-0 top-0 h-full w-1/4 z-20 cursor-pointer opacity-0"
					aria-label="Next slide"
				/>

				{React.Children.map(children, (child, index) => {
					const offset = getOffset(index);
					const absOffset = Math.abs(offset);
					const isActive = offset === 0;

					// Only render the 3 visible slides (center, left, right)
					if (absOffset > 1) return null;

					return (
						<div
							key={index}
							className="absolute transition-all duration-500 ease-out"
							style={{
								transform: isActive
									? 'translateX(0) scale(1)'
									: `translateX(${offset * 80}%) scale(0.9)`,
								zIndex: isActive ? 3 : 2,
								opacity: isActive ? 1 : 0.5,
								filter: isActive ? 'none' : 'blur(2px)',
								pointerEvents: isActive ? 'auto' : 'none',
							}}
						>
							{child}
						</div>
					);
				})}
			</div>

			{/* Progress dots */}
			<div className="flex justify-center gap-2 mt-6">
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
