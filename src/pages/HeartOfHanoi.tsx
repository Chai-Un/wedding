import { useEffect, useState } from 'react';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

// Photo orientations: 0:L 1:P 2:P 3:L 4:P 5:P 6:P 7:P

export default function HeartOfHanoi() {
	const galleryId = 'heart-of-hanoi';

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	const photos = [
		{
			id: '1',
			src: 'gallery/heartofhanoi/mievatho_NH4259.jpg',
			alt: 'Photo 1',
		},
		{
			id: '2',
			src: 'gallery/heartofhanoi/mievatho_NH4222.jpg',
			alt: 'Photo 2',
		},
		{
			id: '3',
			src: 'gallery/heartofhanoi/mievatho_NH4910.jpg',
			alt: 'Photo 3',
		},
		{
			id: '4',
			src: 'gallery/heartofhanoi/mievatho_NH5038.jpg',
			alt: 'Photo 4',
		},
		{
			id: '5',
			src: 'gallery/heartofhanoi/mievatho_NH4539.jpg',
			alt: 'Photo 5',
		},
		{
			id: '6',
			src: 'gallery/heartofhanoi/mievatho_NH4567.jpg',
			alt: 'Photo 6',
		},
		{
			id: '7',
			src: 'gallery/heartofhanoi/mievatho_NH4407.jpg',
			alt: 'Photo 7',
		},
		{
			id: '8',
			src: 'gallery/heartofhanoi/mievatho_NH4427.jpg',
			alt: 'Photo 8',
		},
	];

	const handlePhotoClick = (index: number) => {
		setSelectedPhotoIndex(index);
		setDialogOpen(true);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	const otherConcepts = GALLERY_CONCEPTS.filter(
		(concept) => concept.id !== galleryId,
	);

	const photo = (i: number, aspect: string, sizes: string) => (
		<div
			key={i}
			onClick={() => handlePhotoClick(i)}
			className={`${aspect} bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer`}
		>
			<ResponsiveImage
				src={photos[i].src}
				alt={photos[i].alt}
				className="w-full h-full object-cover"
				sizes={sizes}
			/>
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
		</div>
	);

	return (
		<div className="min-h-screen bg-white">
			<Navigation overlay alwaysShow />
			<div className="w-full h-[6.5em] md:h-[19em] block relative overflow-hidden">
				<ResponsiveImage
					src={photos[7].src}
					alt="Cover Photo"
					className="absolute inset-0 w-full h-full object-cover object-top"
					sizes="100vw"
				/>
			</div>
			<main className="pt-14 pb-16 px-4 md:pt-24 lg:pt-32">
				<div className="mb-8 md:mb-16">
					<div
						className="text-[30px] md:text-[64px] font-hoangngan16 leading-none flex justify-center items-end"
						aria-label="Heart of Hanoi"
					>
						{'Heart of Hanoi'.split('').map((char, i, arr) => {
							const mid = (arr.length - 0.5) / 2;
							const normalized = (i - mid) / mid;
							const lift = (1 - normalized * normalized) * 10;
							const rotation = normalized * 10;
							
							// Determine color based on word
							let color = '#9f000e'; // default red for "Heart"
							if (i >= 5 && i <= 7) {
								color = '#6b7566'; // olive/sage for "of"
							} else if (i >= 8) {
								color = '#d4af37'; // gold for "Hanoi"
							}
							
							return (
								<span
									key={i}
									aria-hidden="true"
									style={{
										display: 'inline-block',
										transform: `translateY(${-lift}px) rotate(${rotation}deg)`,
										transformOrigin: '50% 100%',
										color,
									}}
								>
									{char === ' ' ? '\u00a0' : char}
								</span>
							);
						})}
					</div>
				</div>
				<div className="max-w-7xl mx-auto space-y-3">
					{/* Row 1: landscape (1 col) | portrait (2 cols) — ratio 1:2 — photos 0,1 */}
					<div
						className="flex gap-1 md:gap-2 mb-1 md:mb-2"
						style={{ height: '40vw' }}
					>
						<div
							onClick={() => handlePhotoClick(0)}
							className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[0].src}
								alt={photos[0].alt}
								className="w-full h-full object-cover object-bottom"
								sizes="33vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
						<div
							onClick={() => handlePhotoClick(1)}
							className="flex-2 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[1].src}
								alt={photos[1].alt}
								className="w-full h-full object-cover"
								sizes="66vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
					</div>

					{/* Row 2: 2 portraits side by side — photos 2,3 */}
					<div className="grid grid-cols-2 gap-1 md:gap-2 mb-1 md:mb-2">
						{[2, 3].map((i) => photo(i, 'aspect-2/3', '50vw'))}
					</div>

					{/* Row 3: 3 portraits in a row — photos 4,5,6 */}
					<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
						{[4, 5, 6].map((i) => photo(i, 'aspect-2/3', '33vw'))}
					</div>

					{/* Row 4: 1 landscape photo — photo 7 */}
					<div className="justify-center mb-1 md:mb-2 mt-14 -mx-4 md:-mx-2 lg:mx-0">
						{photo(7, 'aspect-16/9', '100vw')}
					</div>

					{/* Other Concepts Navigation */}
					<div>
						<div className="w-full md:py-20 lg:py-24 py-12">
							<BreakImage
								style={{
									fill: '#6b5739',
									margin: '0 auto',
									maxWidth: '100%',
								}}
							/>
						</div>
						<div className="grid grid-cols-3 gap-6 max-w-3xl md:max-w-240 mx-auto">
							{otherConcepts.map((concept) => (
								<GalleryItem
									key={concept.id}
									concept={concept}
									variant="simple"
								/>
							))}
						</div>
					</div>
				</div>
			</main>

			<GalleryDialog
				photos={photos}
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				initialIndex={selectedPhotoIndex}
			/>
		</div>
	);
}
