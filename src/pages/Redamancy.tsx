import { useEffect, useState } from 'react';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

// Photo orientations: 0-8:P  9:L  10:L  11:P  12:L  13:P

export default function Redamancy() {
	const galleryId = 'redamancy';

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	const photos = [
		{ id: '1',  src: 'gallery/redamancy/mievatho_NH0954.jpg', alt: 'Photo 1' },
		{ id: '2',  src: 'gallery/redamancy/mievatho_NH1048.jpg', alt: 'Photo 2' },
		{ id: '3',  src: 'gallery/redamancy/mievatho_NH1116.jpg', alt: 'Photo 3' },
		{ id: '4',  src: 'gallery/redamancy/mievatho_NH1381.jpg', alt: 'Photo 4' },
		{ id: '5',  src: 'gallery/redamancy/mievatho_NH1487.jpg', alt: 'Photo 5' },
		{ id: '6',  src: 'gallery/redamancy/mievatho_NH1504.jpg', alt: 'Photo 6' },
		{ id: '7',  src: 'gallery/redamancy/mievatho_NH1525.jpg', alt: 'Photo 7' },
		{ id: '8',  src: 'gallery/redamancy/mievatho_NH5150.jpg', alt: 'Photo 8' },
		{ id: '9',  src: 'gallery/redamancy/mievatho_NH5455.jpg', alt: 'Photo 9' },
		{ id: '10', src: 'gallery/redamancy/mievatho_NH6232.jpg', alt: 'Photo 10' },
		{ id: '11', src: 'gallery/redamancy/mievatho_NH6309.jpg', alt: 'Photo 11' },
		{ id: '12', src: 'gallery/redamancy/mievatho_NH6389.jpg', alt: 'Photo 12' },
		{ id: '13', src: 'gallery/redamancy/mievatho_NH6514.jpg', alt: 'Photo 13' },
		{ id: '14', src: 'gallery/redamancy/mievatho_NH6575.jpg', alt: 'Photo 14' },
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

	const imgDiv = (i: number, sizes: string) => (
		<div
			key={i}
			onClick={() => handlePhotoClick(i)}
			className="w-full h-full bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
		>
			<ResponsiveImage
				src={photos[i].src}
				alt={photos[i].alt}
				className="w-full h-full object-cover"
				sizes={sizes}
			/>
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
		</div>
	);

	return (
		<div className="min-h-screen bg-[#eee5d5]">
			<Navigation overlay alwaysShow />
			<main className="pt-32 pb-16 px-4">
				<div className="max-w-7xl mx-auto space-y-3">

					{/* Row 1: 1fr | 2fr — left: 2 portraits stacked, right: 1 tall portrait */}
					<div className="flex gap-3" style={{ height: '70vw' }}>
						{/* Left 1fr: two portraits stacked, each 50% height */}
						<div className="flex-1 flex flex-col gap-3">
							{imgDiv(0, '25vw')}
							{imgDiv(1, '25vw')}
						</div>
						{/* Right 2fr: one tall portrait */}
						<div className="flex-2">
							{imgDiv(2, '50vw')}
						</div>
					</div>

					{/* Row 2: full-width landscape — photo 9 */}
					<div className="aspect-video">
						{imgDiv(9, '100vw')}
					</div>

					{/* Row 3: 1fr | 2fr — portrait left, landscape right — photos 3, 10 */}
					<div className="flex gap-3" style={{ height: '40vw' }}>
						<div className="flex-1">
							{imgDiv(3, '25vw')}
						</div>
						<div className="flex-2">
							{imgDiv(10, '50vw')}
						</div>
					</div>

					{/* Row 4: 2fr | 1fr — left: 1 large portrait, right: 2 portraits stacked — photos 4, 5, 6 */}
					<div className="flex gap-3" style={{ height: '70vw' }}>
						{/* Left 2fr: one large portrait */}
						<div className="flex-2">
							{imgDiv(4, '50vw')}
						</div>
						{/* Right 1fr: two portraits stacked */}
						<div className="flex-1 flex flex-col gap-3">
							{imgDiv(5, '25vw')}
							{imgDiv(6, '25vw')}
						</div>
					</div>

					{/* Row 5: 3 equal columns — landscape images — photos 7, 12, 13 */}
					<div className="grid grid-cols-3 gap-3">
						{[7, 12, 13].map((i) => (
							<div
								key={i}
								onClick={() => handlePhotoClick(i)}
								className="aspect-2/3 bg-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer"
							>
								<ResponsiveImage
									src={photos[i].src}
									alt={photos[i].alt}
									className="w-full h-full object-cover"
									sizes="33vw"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
							</div>
						))}
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

