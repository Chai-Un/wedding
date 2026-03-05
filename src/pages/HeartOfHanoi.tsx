import { useEffect, useState } from 'react';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import ContactUs from '@/components/sections/ContactUs';
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
			src: 'gallery/heartofhanoi/mievatho_NH4222.jpg',
			alt: 'Photo 1',
		},
		{
			id: '2',
			src: 'gallery/heartofhanoi/mievatho_NH4259.jpg',
			alt: 'Photo 2',
		},
		{
			id: '3',
			src: 'gallery/heartofhanoi/mievatho_NH4407.jpg',
			alt: 'Photo 3',
		},
		{
			id: '4',
			src: 'gallery/heartofhanoi/mievatho_NH4427.jpg',
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
			src: 'gallery/heartofhanoi/mievatho_NH4910.jpg',
			alt: 'Photo 7',
		},
		{
			id: '8',
			src: 'gallery/heartofhanoi/mievatho_NH5038.jpg',
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
		<div className="min-h-screen bg-[#eee5d5]">
			<Navigation overlay alwaysShow />
			<main className="pt-32 pb-16 px-4">
				<div className="max-w-7xl mx-auto space-y-3">
					{/* Row 1: portrait (1) | landscape (2 cols) — ratio 1:2 — photos 1,0 */}
					<div className="flex gap-3" style={{ height: '40vw' }}>
						<div
							onClick={() => handlePhotoClick(1)}
							className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[1].src}
								alt={photos[1].alt}
								className="w-full h-full object-cover"
								sizes="25vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
						<div
							onClick={() => handlePhotoClick(0)}
							className="flex-2 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[0].src}
								alt={photos[0].alt}
								className="w-full h-full object-cover"
								sizes="50vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
					</div>

					{/* Row 2: 2 equal columns, same height — photos 2,3 */}
					<div className="flex gap-3" style={{ height: '50vw' }}>
						<div
							onClick={() => handlePhotoClick(2)}
							className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[2].src}
								alt={photos[2].alt}
								className="w-full h-full object-cover"
								sizes="50vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
						<div
							onClick={() => handlePhotoClick(3)}
							className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
						>
							<ResponsiveImage
								src={photos[3].src}
								alt={photos[3].alt}
								className="w-full h-full object-cover"
								sizes="50vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
					</div>

					{/* Row 3: 4 equal columns — photos 4,5,6,7 */}
					<div className="grid grid-cols-4 gap-3">
						{[4, 5, 6, 7].map((i) =>
							photo(i, 'aspect-2/3', '25vw'),
						)}
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

			<ContactUs />

			<GalleryDialog
				photos={photos}
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				initialIndex={selectedPhotoIndex}
			/>
		</div>
	);
}
