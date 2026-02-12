import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import ourStoryImage from '@/assets/images/mievatho_NH6514.JPG';
import BreakImage from '@/assets/images/break.svg?react';
import Navigation from '@/components/Navigation';

export default function Redamancy() {
	const galleryId = 'redamancy';
	const { t } = useTranslation('translation', {
		keyPrefix: `gallery.concepts.redamancy`,
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

	// Define all photos for the gallery
	const photos = [
		{ id: '1', src: ourStoryImage, alt: 'Photo 1' },
		{ id: '2', src: ourStoryImage, alt: 'Photo 2' },
		{ id: '3', src: ourStoryImage, alt: 'Photo 3' },
		{ id: '4', src: ourStoryImage, alt: 'Photo 4' },
		{ id: '5', src: ourStoryImage, alt: 'Photo 5' },
		{ id: '6', src: ourStoryImage, alt: 'Photo 6' },
		{ id: '7', src: ourStoryImage, alt: 'Photo 7' },
		{ id: '8', src: ourStoryImage, alt: 'Photo 8' },
		{ id: '9', src: ourStoryImage, alt: 'Photo 9' },
		{ id: '10', src: ourStoryImage, alt: 'Photo 10' },
		{ id: '11', src: ourStoryImage, alt: 'Photo 11' },
		{ id: '12', src: ourStoryImage, alt: 'Photo 12' },
		{ id: '13', src: ourStoryImage, alt: 'Photo 13' },
		{ id: '14', src: ourStoryImage, alt: 'Photo 14' },
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
						<div className="text-3xl md:text-4xl font-hoangngan7 text-[#8b4242] uppercase tracking-wider">
							{t('title')}
						</div>
						<p className="text-[#8b4242] text-base md:text-lg mt-4 font-hoangngan4">
							{t('caption')}
						</p>
					</div>

					{/* Photo Grid - Matching Reference Layout */}
					<div className="mb-3">
						{/* Row 1: 2 photos - large left, portrait right */}
						<div className="grid grid-cols-2 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(0)}
								className="aspect-4/3 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 1"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(1)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 2"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 2: 1 large full-width photo */}
						<div className="mb-3">
							<div
								onClick={() => handlePhotoClick(2)}
								className="aspect-16/10 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 3 (Large)
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 3: 4 photos */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(3)}
								className="aspect-square bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 4
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(4)}
								className="aspect-square bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 5
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(5)}
								className="aspect-square bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 6
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(6)}
								className="aspect-square bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 7
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 4: 2 portrait photos */}
						<div className="grid grid-cols-2 gap-3 mb-3">
							<div
								onClick={() => handlePhotoClick(7)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 8
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(8)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 9
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
						</div>

						{/* Row 5: 5 photos at bottom */}
						<div className="grid grid-cols-5 gap-3">
							<div
								onClick={() => handlePhotoClick(9)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 10
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(10)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 11
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(11)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 12
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(12)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 13
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(13)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									Photo 14
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
