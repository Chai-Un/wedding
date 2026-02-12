import { useTranslation } from 'react-i18next';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import GalleryItem from '@/components/GalleryItem';

export default function Gallery() {
	const { t } = useTranslation();

	return (
		<section
			id="gallery"
			className="bg-[#e8dcc8] px-4 py-12 md:py-20 lg:py-24"
		>
			<div className="md:max-w-[90%] lg:max-w-[80%] 3xl:max-w-[50%] mx-auto">
				<div className="text-center mb-8 md:mb-12 lg:mb-16">
					<div className="text-4xl md:text-5xl lg:text-6xl font-custom-serif text-[#412d1d]">
						{t('gallery.title')}
					</div>
					<p className="text-[#412d1d] text-base md:text-lg mt-4 font-hoangngan4">
						{t('gallery.subtitle')}
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 whitespace-pre-line">
					{GALLERY_CONCEPTS.map((concept) => (
						<GalleryItem
							key={concept.id}
							concept={concept}
							variant="simple"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
