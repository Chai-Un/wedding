import { useEffect, useState } from 'react';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

export default function NgayNangVe() {
	const galleryId = 'ngay-nang-ve';

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	// Define all photos for the gallery — use relative paths for responsive image lookup
	const photos = [
		{ id: '1', src: 'gallery/ngaynangve/mievatho_NH0014.jpg', alt: 'Photo 1' },
		{ id: '2', src: 'gallery/ngaynangve/mievatho_NH0056.jpg', alt: 'Photo 2' },
		{ id: '3', src: 'gallery/ngaynangve/mievatho_NH0203.jpg', alt: 'Photo 3' },
		{ id: '4', src: 'gallery/ngaynangve/mievatho_NH0214.jpg', alt: 'Photo 4' },
		{ id: '5', src: 'gallery/ngaynangve/mievatho_NH0359.jpg', alt: 'Photo 5' },
		{ id: '6', src: 'gallery/ngaynangve/mievatho_NH0428.jpg', alt: 'Photo 6' },
		{ id: '7', src: 'gallery/ngaynangve/mievatho_NH0532.jpg', alt: 'Photo 7' },
		{ id: '8', src: 'gallery/ngaynangve/mievatho_NH0545.jpg', alt: 'Photo 8' },
		{ id: '9', src: 'gallery/ngaynangve/mievatho_NH0592.jpg', alt: 'Photo 9' },
		{ id: '10', src: 'gallery/ngaynangve/mievatho_NH2421.jpg', alt: 'Photo 10' },
		{ id: '11', src: 'gallery/ngaynangve/mievatho_NH2468.jpg', alt: 'Photo 11' },
		{ id: '12', src: 'gallery/ngaynangve/mievatho_NH2572.jpg', alt: 'Photo 12' },
		{ id: '13', src: 'gallery/ngaynangve/mievatho_NH2714.jpg', alt: 'Photo 13' },
		{ id: '14', src: 'gallery/ngaynangve/mievatho_NH2760.jpg', alt: 'Photo 14' },
		{ id: '15', src: 'gallery/ngaynangve/mievatho_NH2814.jpg', alt: 'Photo 15' },
		{ id: '16', src: 'gallery/ngaynangve/mievatho_NH2930.jpg', alt: 'Photo 16' },
		{ id: '17', src: 'gallery/ngaynangve/mievatho_NH2984.jpg', alt: 'Photo 17' },
		{ id: '18', src: 'gallery/ngaynangve/mievatho_NH3135.jpg', alt: 'Photo 18' },
		{ id: '19', src: 'gallery/ngaynangve/mievatho_NH3236.jpg', alt: 'Photo 19' },
		{ id: '20', src: 'gallery/ngaynangve/mievatho_NH3279.jpg', alt: 'Photo 20' },
		{ id: '21', src: 'gallery/ngaynangve/mievatho_NH3312.jpg', alt: 'Photo 21' },
		{ id: '22', src: 'gallery/ngaynangve/mievatho_NH3341.jpg', alt: 'Photo 22' },
		{ id: '23', src: 'gallery/ngaynangve/mievatho_NH3466.jpg', alt: 'Photo 23' },
		{ id: '24', src: 'gallery/ngaynangve/mievatho_NH3549.jpg', alt: 'Photo 24' },
		{ id: '25', src: 'gallery/ngaynangve/mievatho_NH3644.jpg', alt: 'Photo 25' },
		{ id: '26', src: 'gallery/ngaynangve/mievatho_NH3736.jpg', alt: 'Photo 26' },
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

	return (
		<div className="min-h-screen bg-[#eee5d5]">
			<Navigation overlay alwaysShow />
			<main className="pt-32 pb-16 px-4">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-8 md:mb-12">
						<h1
							className="text-6xl md:text-7xl lg:text-8xl font-hoangngan13 text-[#8b4242] leading-none mb-4 flex justify-center items-end"
							aria-label="Eat the Memories"
						>
							{'Eat the Memories'.split('').map((char, i, arr) => {
								const mid = (arr.length - 1) / 2;
								const normalized = (i - mid) / mid;
								const lift = (1 - normalized * normalized) * 32;
								const rotation = normalized * 18;
								return (
									<span
										key={i}
										aria-hidden="true"
										style={{
											display: 'inline-block',
											transform: `translateY(${-lift}px) rotate(${rotation}deg)`,
											transformOrigin: '50% 100%',
										}}
									>
										{char === ' ' ? '\u00a0' : char}
									</span>
								);
							})}
						</h1>
						<div className="text-center text-xl md:text-2xl font-hoangngan7 text-[#8b4242] uppercase tracking-widest font-bold">
							Not the Calories
						</div>
					</div>

					{/* ── SECTION 1 ── */}
					<div className="mb-3 md:mb-3">
						{/* Row 1: 3 equal portraits */}
						<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									onClick={() => handlePhotoClick(i)}
									className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
								>
									<ResponsiveImage src={photos[i].src} alt={photos[i].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
							))}
						</div>

						{/* Row 2: full-width landscape */}
						<div className="mb-1 md:mb-2">
							<div onClick={() => handlePhotoClick(3)} className="aspect-video overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[3].src} alt={photos[3].alt} className="absolute inset-0 w-full h-full object-cover" sizes="100vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: 3 equal portraits */}
						<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
							{[4, 5, 6].map((i) => (
								<div
									key={i}
									onClick={() => handlePhotoClick(i)}
									className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
								>
									<ResponsiveImage src={photos[i].src} alt={photos[i].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
							))}
						</div>

						{/* Row 4: wide (2/3) + portrait (1/3) — portrait drives height, wide stretches */}
						<div className="grid grid-cols-3 gap-1 md:gap-2">
							<div
								onClick={() => handlePhotoClick(7)}
								className="col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage src={photos[7].src} alt={photos[7].alt} className="absolute inset-0 w-full h-full object-cover" sizes="66vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(8)}
								className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage src={photos[8].src} alt={photos[8].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>
					</div>

					{/* ── SECTION 2 ── */}
					<div className="mb-3 md:mb-3">
						{/* Row 1: portrait (1/3) + wide (2/3) — portrait drives height, wide stretches */}
						<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
							<div
								onClick={() => handlePhotoClick(9)}
								className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage src={photos[9].src} alt={photos[9].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(10)}
								className="col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage src={photos[10].src} alt={photos[10].alt} className="absolute inset-0 w-full h-full object-cover" sizes="66vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 2: 4-col mosaic — corners stacked, centers tall spanning 2 rows */}
						<div className="grid grid-cols-4 gap-1 md:gap-2 mb-1 md:mb-2">
							<div onClick={() => handlePhotoClick(11)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[11].src} alt={photos[11].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(12)} className="row-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[12].src} alt={photos[12].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(13)} className="row-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[13].src} alt={photos[13].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(14)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[14].src} alt={photos[14].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(15)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[15].src} alt={photos[15].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(16)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[16].src} alt={photos[16].alt} className="absolute inset-0 w-full h-full object-cover" sizes="25vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: full-width landscape */}
						<div onClick={() => handlePhotoClick(17)} className="aspect-video overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
							<ResponsiveImage src={photos[17].src} alt={photos[17].alt} className="absolute inset-0 w-full h-full object-cover" sizes="100vw" />
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
						</div>
					</div>

					{/* ── SECTION 3 ── */}
					<div className="mb-3 md:mb-3">
						{/* Mosaic: 3-col, center tall spanning 2 rows */}
						<div className="grid grid-cols-3 gap-1 md:gap-2 mb-1 md:mb-2">
							<div onClick={() => handlePhotoClick(18)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[18].src} alt={photos[18].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(20)} className="row-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[20].src} alt={photos[20].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(22)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[22].src} alt={photos[22].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(19)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[19].src} alt={photos[19].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(23)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[23].src} alt={photos[23].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Bottom: wide col-span-2 row-span-2 + 2 portraits stacked right — portraits drive row height */}
						<div className="grid grid-cols-3 gap-1 md:gap-2">
							<div onClick={() => handlePhotoClick(21)} className="col-span-2 row-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[21].src} alt={photos[21].alt} className="absolute inset-0 w-full h-full object-cover" sizes="66vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(24)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[24].src} alt={photos[24].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div onClick={() => handlePhotoClick(25)} className="aspect-3/4 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer">
								<ResponsiveImage src={photos[25].src} alt={photos[25].alt} className="absolute inset-0 w-full h-full object-cover" sizes="33vw" />
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>
					</div>

					{/* Other Concepts Navigation */}
					<div>
						<div className="w-full md:py-20 lg:py-24 py-12">
							<BreakImage style={{ fill: '#6b5739', margin: '0 auto', maxWidth: '100%' }} />
						</div>
						<div className="grid grid-cols-3 gap-6 max-w-3xl md:max-w-240 mx-auto">
							{otherConcepts.map((concept) => (
								<GalleryItem key={concept.id} concept={concept} variant="simple" />
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
