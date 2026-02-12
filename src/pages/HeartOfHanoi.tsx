import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryItem from '@/components/GalleryItem';
import GalleryDialog from '@/components/GalleryDialog';
import ContactUs from '@/components/sections/ContactUs';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import ourStoryImage from '@/assets/images/mievatho_NH6514.JPG';
import BreakImage from '@/assets/images/break.svg?react';

export default function HeartOfHanoi() {
	const galleryId = 'heart-of-hanoi';
	const { t } = useTranslation('translation', {
		keyPrefix: `gallery.concepts.heartOfHanoi`,
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
		<div className="min-h-screen bg-[#fdf8f0]">
			<main className="pt-24 pb-16 px-4">
				<div className="max-w-7xl mx-auto">
					{/* Photo Grid - Matching Reference Layout */}
					<div className="mb-3">
						{/* Row 1: Title + 2 large landscape photos */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
							{/* Title Section */}
							<div className="flex flex-col justify-center items-start p-8 md:p-4">
								<h1 className="text-5xl md:text-6xl font-hoangngan8 text-[#8b4242] mb-4">
									Heart
								</h1>
								<h1 className="text-5xl md:text-6xl font-hoangngan8 text-[#a8c5dd] mb-4">
									of
								</h1>
								<h1 className="text-5xl md:text-6xl font-hoangngan8 text-[#d4af37] mb-4">
									Hanoi
								</h1>
							</div>

							{/* Photo 1 */}
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

							{/* Photo 2 */}
							<div
								onClick={() => handlePhotoClick(1)}
								className="aspect-4/3 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
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

						{/* Row 2: Text section + 2 portrait photos */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
							{/* Text Section */}
							<div className="flex flex-col justify-center items-start p-8 md:p-12 text-[#8b4242]">
								<p className="text-sm md:text-base font-hoangngan11 mb-4 text-center md:text-left">
									{t('caption1')}
								</p>
								<p className="text-sm md:text-base font-hoangngan11 mb-4 text-center md:text-left">
									{t('caption2')}
								</p>
								<p className="text-sm md:text-base font-hoangngan11 text-center md:text-left">
									{t('caption3')}
								</p>
							</div>

							{/* 2 Portrait Photos */}
							<div className="grid grid-cols-2 gap-3">
								<div
									onClick={() => handlePhotoClick(2)}
									className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
								>
									<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
										<img
											src={ourStoryImage}
											alt="Photo 3"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
								<div
									onClick={() => handlePhotoClick(3)}
									className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
								>
									<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
										<img
											src={ourStoryImage}
											alt="Photo 4"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
							</div>
						</div>

						{/* Row 3: 4 photos - varied sizes */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							<div
								onClick={() => handlePhotoClick(4)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 5"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(5)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 6"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(6)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 7"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
							</div>
							<div
								onClick={() => handlePhotoClick(7)}
								className="aspect-3/4 bg-linear-to-br from-stone-200 to-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
							>
								<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm cursor-pointer">
									<img
										src={ourStoryImage}
										alt="Photo 8"
										className="w-full h-full object-cover"
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
						<div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-3xl md:max-w-4xl mx-auto">
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
