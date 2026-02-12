import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
	const [thumbApi, setThumbApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(initialIndex);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!mainApi || !thumbApi) return;
			mainApi.scrollTo(index);
		},
		[mainApi, thumbApi],
	);

	const onSelect = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		const selected = mainApi.selectedScrollSnap();
		setSelectedIndex(selected);
		thumbApi.scrollTo(selected);
	}, [mainApi, thumbApi]);

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

	const scrollPrev = useCallback(() => {
		mainApi?.scrollPrev();
	}, [mainApi]);

	const scrollNext = useCallback(() => {
		mainApi?.scrollNext();
	}, [mainApi]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-7xl w-[96vw] sm:w-[92vw] md:w-[90vw] h-[92vh] sm:h-[88vh] md:h-[85vh] p-0 bg-[#fdf8f0] border-none sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
				<DialogTitle className="sr-only">Photo Gallery</DialogTitle>

				<div className="flex flex-col h-full">
					{/* Main carousel */}
					<div className="flex-1 relative flex items-center justify-center p-4">
						<Carousel
							setApi={setMainApi}
							className="w-full h-full"
							opts={{ loop: true }}
						>
							<CarouselContent>
								{photos.map((photo, index) => (
									<CarouselItem key={photo.id}>
										<div className="flex items-center justify-center h-[calc(92vh-200px)] sm:h-[calc(88vh-180px)] md:h-[calc(85vh-160px)]">
											<img
												src={photo.src}
												alt={
													photo.alt ||
													`Photo ${index + 1}`
												}
												className="max-w-full max-h-full object-contain"
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>

							{/* Navigation buttons */}
							<button
								onClick={scrollPrev}
								className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
							>
								<ChevronLeft className="w-6 h-6" />
								<span className="sr-only">Previous</span>
							</button>
							<button
								onClick={scrollNext}
								className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
							>
								<ChevronRight className="w-6 h-6" />
								<span className="sr-only ">Next</span>
							</button>
						</Carousel>
					</div>

					{/* Thumbnail carousel */}
					<div className="px-4 pb-4">
						<Carousel
							setApi={setThumbApi}
							opts={{
								containScroll: 'keepSnaps',
								dragFree: true,
							}}
						>
							<CarouselContent className="-ml-2">
								{photos.map((photo, index) => (
									<CarouselItem
										key={photo.id}
										className="basis-1/4 md:basis-1/6 lg:basis-1/8 pl-2"
									>
										<button
											onClick={() => onThumbClick(index)}
											className={cn(
												'relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all',
												index === selectedIndex
													? 'border-white'
													: 'border-transparent opacity-60 hover:opacity-100',
											)}
										>
											<img
												src={photo.src}
												alt={
													photo.alt ||
													`Thumbnail ${index + 1}`
												}
												className="w-full h-full object-cover cursor-pointer"
											/>
										</button>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					</div>

					{/* Photo counter */}
					<div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
						{selectedIndex + 1} / {photos.length}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
