import { useState, useCallback, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
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
	const [mainApi, setMainApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(initialIndex);
	const thumbsRef = useRef<HTMLDivElement>(null);

	const onSelect = useCallback(() => {
		if (!mainApi) return;
		const selected = mainApi.selectedScrollSnap();
		setSelectedIndex(selected);
		// Scroll active thumbnail into view
		if (thumbsRef.current) {
			const thumb = thumbsRef.current.children[selected] as HTMLElement;
			if (thumb) {
				thumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
			}
		}
	}, [mainApi]);

	useEffect(() => {
		if (!mainApi) return;
		mainApi.on('reInit', onSelect);
		mainApi.on('select', onSelect);
		return () => {
			mainApi.off('reInit', onSelect);
			mainApi.off('select', onSelect);
		};
	}, [mainApi, onSelect]);

	// Reset to initial index when dialog opens
	useEffect(() => {
		if (open && mainApi) {
			mainApi.scrollTo(initialIndex, true);
		}
	}, [open, initialIndex, mainApi]);

	const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
	const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="w-[90vw] max-w-7xl h-[60vh] md:h-[85vh] p-0 bg-white border-none overflow-visible sm:max-w-none"
			>
				<DialogTitle className="sr-only">Photo Gallery</DialogTitle>

				{/* Close button outside top-right corner */}
				<DialogClose className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors cursor-pointer z-50">
					<X className="w-4 h-4" />
					<span className="sr-only">Close</span>
				</DialogClose>

				<div className="flex flex-col h-full overflow-hidden rounded-lg">
					{/* Main carousel */}
					<div className="flex-1 relative flex items-center justify-center p-3 min-h-0">
						<Carousel
							setApi={setMainApi}
							className="w-full h-full"
							opts={{ loop: true }}
						>
							<CarouselContent>
								{photos.map((photo, index) => (
									<CarouselItem key={photo.id}>
										<div className="relative h-[calc(60vh-120px)] md:h-[calc(85vh-120px)]">
											<ResponsiveImage
												src={photo.src}
												alt={photo.alt || `Photo ${index + 1}`}
												className="absolute inset-0 w-full h-full object-contain"
												sizes="90vw"
												loading={Math.abs(index - selectedIndex) <= 1 ? 'eager' : 'lazy'}
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>

							<button
								onClick={scrollPrev}
								className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
							>
								<ChevronLeft className="w-5 h-5" />
								<span className="sr-only">Previous</span>
							</button>
							<button
								onClick={scrollNext}
								className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
							>
								<ChevronRight className="w-5 h-5" />
								<span className="sr-only">Next</span>
							</button>
						</Carousel>

						{/* Photo counter */}
						<div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-xs pointer-events-none">
							{selectedIndex + 1} / {photos.length}
						</div>
					</div>

					{/* Thumbnail strip — fixed height, horizontal scroll */}
					<div className="px-3 pb-3 shrink-0">
						<div
							ref={thumbsRef}
							className="flex gap-2 overflow-x-auto"
							style={{ scrollbarWidth: 'thin' }}
						>
							{photos.map((photo, index) => (
								<button
									key={photo.id}
									onClick={() => mainApi?.scrollTo(index)}
									className={cn(
										'relative shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded border-2 transition-all cursor-pointer',
										index === selectedIndex
											? 'border-white opacity-100'
											: 'border-transparent opacity-50 hover:opacity-90',
									)}
								>
									<ResponsiveImage
										src={photo.src}
										alt={photo.alt || `Thumbnail ${index + 1}`}
										className="w-full h-full object-cover"
										sizes="80px"
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

