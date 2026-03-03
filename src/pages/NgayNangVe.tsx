import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ResponsiveImage from '@/components/ResponsiveImage';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

export default function NgayNangVe() {
	const galleryId = 'ngay-nang-ve';
	const { t } = useTranslation('translation', {
		keyPrefix: `gallery.concepts.ngayNangVe`,
	});

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
					<div className="text-center mb-12">
						{/* <h1 className="text-5xl md:text-6xl font-hoangngan8 text-[#8b4242] italic mb-2">
							{t('pageTitle')}
						</h1> */}
						<div className="text-3xl md:text-4xl font-hoangngan7 text-[#8b4242] uppercase tracking-wider">
							{t('pageSubtitle')}
						</div>
					</div>

					{/* Photo Grid - Matching Reference Layout */}
					<div className="mb-3">
						{/* Row 1: 4 photos */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(0)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[0].src}
										alt="Photo 1"
										className="w-full h-full object-cover"
										objectPosition="50% 80%"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(1)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[1].src}
										alt="Photo 2"
										className="w-full h-full object-cover"
										objectPosition="50% 80%"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(2)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[2].src}
										alt="Photo 3"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(3)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[3].src}
										alt="Photo 4"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Caption */}
						<p className="text-sm md:text-base text-[#8b4242] mb-3 font-hoangngan11">
							{t('caption1')}
						</p>

						{/* Row 2: 1 large full-width photo */}
						<div className="mb-3">
							<div
								onClick={() => handlePhotoClick(4)}
								className="aspect-16/10 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[4].src}
										alt="Photo 5"
										className="w-full h-full object-cover"
										sizes="100vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: 3 photos */}
						<div className="grid grid-cols-3 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(5)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[5].src}
										alt="Photo 6"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(6)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[6].src}
										alt="Photo 7"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(7)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[7].src}
										alt="Photo 8"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 4: 3 photos */}
						<div className="grid grid-cols-3 gap-3">
							<div
								onClick={() => handlePhotoClick(8)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[8].src}
										alt="Photo 9"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(9)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[9].src}
										alt="Photo 10"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(10)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[10].src}
										alt="Photo 11"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>
					</div>

					{/* Second Section */}
					<div className="mb-0">
						{/* Caption */}
						<p className="text-sm md:text-base text-[#8b4242] mb-3 font-hoangngan11">
							{t('caption2')}
						</p>

						{/* Row 1: 3 photos */}
						<div className="grid grid-cols-3 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(11)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[11].src}
										alt="Photo 12"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(12)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[12].src}
										alt="Photo 13"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(13)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[13].src}
										alt="Photo 14"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 2: 1 large full-width photo */}
						<div className="mb-3">
							<div
								onClick={() => handlePhotoClick(14)}
								className="aspect-16/10 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[14].src}
										alt="Photo 15"
										className="w-full h-full object-cover"
										sizes="100vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: 3 photos */}
						<div className="grid grid-cols-3 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(15)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[15].src}
										alt="Photo 16"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(16)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[16].src}
										alt="Photo 17"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(17)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[17].src}
										alt="Photo 18"
										className="w-full h-full object-cover"
										sizes="33vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 4: 2 photos */}
						<div className="grid grid-cols-2 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(18)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[18].src}
										alt="Photo 19"
										className="w-full h-full object-cover"
										sizes="50vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(19)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[19].src}
										alt="Photo 20"
										className="w-full h-full object-cover"
										sizes="50vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 5: 4 photos */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							<div
								onClick={() => handlePhotoClick(20)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[20].src}
										alt="Photo 21"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(21)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[21].src}
										alt="Photo 22"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(22)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[22].src}
										alt="Photo 23"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(23)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<ResponsiveImage
										src={photos[23].src}
										alt="Photo 24"
										className="w-full h-full object-cover"
										sizes="(max-width: 768px) 50vw, 25vw"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
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
