import { useEffect, useState } from 'react';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

// Photo orientations (P = portrait, L = landscape):
// 0:P 1:P 2:P 3:P 4:P 5:P 6:P 7:P 8:L 9:L 10:L 11:P 12:P 13:P 14:P
// 15:P 16:P 17:P 18:P 19:P 20:P 21:P 22:P 23:P 24:P 25:P 26:L 27:P

export default function BecomingOne() {
	const galleryId = 'becoming-one';

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	// Define all photos for the gallery — use relative paths for responsive image lookup
	const photos = [
		{
			id: '1',
			src: 'gallery/becomeone/mievatho_NH1550.jpg',
			alt: 'Photo 1',
		},
		{
			id: '2',
			src: 'gallery/becomeone/mievatho_NH1622.jpg',
			alt: 'Photo 2',
		},
		{
			id: '3',
			src: 'gallery/becomeone/mievatho_NH1682.jpg',
			alt: 'Photo 3',
		},
		{
			id: '4',
			src: 'gallery/becomeone/mievatho_NH6968.jpg',
			alt: 'Photo 4',
		},
		{
			id: '5',
			src: 'gallery/becomeone/mievatho_NH1752.jpg',
			alt: 'Photo 5',
		},
		{
			id: '6',
			src: 'gallery/becomeone/mievatho_NH7023.jpg',
			alt: 'Photo 6',
		},
		{
			id: '7',
			src: 'gallery/becomeone/mievatho_NH1998.jpg',
			alt: 'Photo 7',
		},
		{
			id: '8',
			src: 'gallery/becomeone/mievatho_NH6801.jpg',
			alt: 'Photo 8',
		},
		{
			id: '9',
			src: 'gallery/becomeone/mievatho_NH7492.jpg',
			alt: 'Photo 9',
		},
		{
			id: '10',
			src: 'gallery/becomeone/mievatho_NH7192.jpg',
			alt: 'Photo 10',
		},
		{
			id: '11',
			src: 'gallery/becomeone/mievatho_NH1764.jpg',
			alt: 'Photo 11',
		},
		{
			id: '12',
			src: 'gallery/becomeone/mievatho_NH1787.jpg',
			alt: 'Photo 12',
		},
		{
			id: '13',
			src: 'gallery/becomeone/mievatho_NH1974.jpg',
			alt: 'Photo 13',
		},
		{
			id: '14',
			src: 'gallery/becomeone/mievatho_NH1832.jpg',
			alt: 'Photo 14',
		},
		{
			id: '15',
			src: 'gallery/becomeone/mievatho_NH1583.jpg',
			alt: 'Photo 15',
		},
		{
			id: '16',
			src: 'gallery/becomeone/mievatho_NH7776.jpg',
			alt: 'Photo 16',
		},
		{
			id: '17',
			src: 'gallery/becomeone/mievatho_NH1579.jpg',
			alt: 'Photo 17',
		},
		{
			id: '18',
			src: 'gallery/becomeone/mievatho_NH1734.jpg',
			alt: 'Photo 18',
		},
		{
			id: '19',
			src: 'gallery/becomeone/mievatho_NH6977.jpg',
			alt: 'Photo 19',
		},
		{
			id: '20',
			src: 'gallery/becomeone/mievatho_NH1866.jpg',
			alt: 'Photo 20',
		},
		{
			id: '21',
			src: 'gallery/becomeone/mievatho_NH7315.jpg',
			alt: 'Photo 21',
		},
		{
			id: '22',
			src: 'gallery/becomeone/mievatho_NH1904b.jpg',
			alt: 'Photo 22',
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
			<main className="pt-32 pb-16 px-4">
				<div className="max-w-7xl mx-auto">
					{/* === SECTION 1 === */}
					<div className="space-y-3">
						{/* Row 1: 3 portraits — photos 0,1,2 */}
						<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
							{[0, 1, 2].map((i) =>
								photo(i, 'aspect-2/3', '33vw'),
							)}
						</div>

						{/* Row 2: portrait | wide | portrait — photos 3,4,5 */}
						<div
							className="flex gap-1 md:gap-2 mb-1 md:mb-2"
							style={{ height: '40vw' }}
						>
							<div
								onClick={() => handlePhotoClick(12)}
								className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage
									src={photos[12].src}
									alt={photos[12].alt}
									className="w-full h-full object-cover"
									sizes="50vw"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(15)}
								className="flex-2 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage
									src={photos[4].src}
									alt={photos[4].alt}
									className="w-full h-full object-cover"
									sizes="50vw"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(5)}
								className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage
									src={photos[5].src}
									alt={photos[5].alt}
									className="w-full h-full object-cover"
									sizes="25vw"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: 4 portraits — photos 6,7,8,9 */}
						<div className="grid grid-cols-4 gap-1 md:gap-2 mb-1 md:mb-2">
							{[6, 7, 8, 9].map((i) =>
								photo(i, 'aspect-2/3', '25vw'),
							)}
						</div>
					</div>

					{/* === SECTION 2 === */}
					<div className="space-y-3">
						{/* Row 4: 2 landscape photos — photos 10,11 */}
						<div className="grid grid-cols-2 gap-1 md:gap-2 mb-1 md:mb-2">
							{[10, 11].map((i) =>
								photo(i, 'aspect-3/2', '50vw'),
							)}
						</div>

						{/* Rows 5+6: left col: 12(large),15(small); right: col1 13,16 | col2 14,17 */}
						<div
							className="flex gap-1 md:gap-2 mb-1 md:mb-2"
							style={{ height: '80vw' }}
						>
							{/* Left: 2 portraits stacked */}
							<div className="w-1/2 flex flex-col gap-1 md:gap-2">
								<div
									onClick={() => handlePhotoClick(12)}
									className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
								>
									<ResponsiveImage
										src={photos[12].src}
										alt={photos[12].alt}
										className="w-full h-full object-cover"
										sizes="50vw"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
								<div
									onClick={() => handlePhotoClick(15)}
									className="flex-[0.5] bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
								>
									<ResponsiveImage
										src={photos[15].src}
										alt={photos[15].alt}
										className="w-full h-full object-cover"
										sizes="50vw"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
							</div>
							{/* Right: 2 columns — col1: 13,16 | col2: 14,17 */}
							<div className="w-1/2 grid grid-cols-2 gap-1 md:gap-2">
								<div className="flex flex-col gap-1 md:gap-2">
									<div
										onClick={() => handlePhotoClick(13)}
										className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
									>
										<ResponsiveImage
											src={photos[13].src}
											alt={photos[13].alt}
											className="w-full h-full object-cover"
											sizes="25vw"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
									</div>
									<div
										onClick={() => handlePhotoClick(16)}
										className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
									>
										<ResponsiveImage
											src={photos[16].src}
											alt={photos[16].alt}
											className="w-full h-full object-cover"
											sizes="25vw"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
									</div>
								</div>
								<div className="flex flex-col gap-1 md:gap-2">
									<div
										onClick={() => handlePhotoClick(14)}
										className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
									>
										<ResponsiveImage
											src={photos[14].src}
											alt={photos[14].alt}
											className="w-full h-full object-cover"
											sizes="25vw"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
									</div>
									<div
										onClick={() => handlePhotoClick(17)}
										className="flex-1 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
									>
										<ResponsiveImage
											src={photos[17].src}
											alt={photos[17].alt}
											className="w-full h-full object-cover"
											sizes="25vw"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* === SECTION 3 === */}
					<div className="space-y-3">
						{/* Row 7: 3 portraits no gap — photos 18,19,20 */}
						<div className="grid grid-cols-3">
							{[18, 19, 20].map((i) =>
								photo(i, 'aspect-2/3', '33vw'),
							)}
						</div>
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
						<div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-3xl md:max-w-240 mx-auto">
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

			{/* Gallery Dialog */}
			<GalleryDialog
				photos={photos}
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				initialIndex={selectedPhotoIndex}
			/>
		</div>
	);
}
