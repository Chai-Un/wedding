import { useTranslation } from 'react-i18next';
import PolaroidPhoto from '@/components/PolaroidPhoto';
import { StackedCarousel } from '@/components/ui/stacked-carousel';
import { OverlapCarousel } from '@/components/ui/overlap-carousel';

// Import journey photos - you'll need to add these images to your assets folder
// import paris2023 from '@/assets/images/journey/paris-2023.jpg';
// import madrid2023 from '@/assets/images/journey/madrid-2023.jpg';
// import nice2023 from '@/assets/images/journey/nice-2023.jpg';
// import london2024 from '@/assets/images/journey/london-2024.jpg';
// import nottingham2024 from '@/assets/images/journey/nottingham-2024.jpg';
// import edinburgh2024 from '@/assets/images/journey/edinburgh-2024.jpg';
// import dreamland2025 from '@/assets/images/journey/dreamland-2025.jpg';
// import bali2025 from '@/assets/images/journey/bali-2025.jpg';
// import saigon2025 from '@/assets/images/journey/saigon-2025.jpg';
import demoImg from '@/assets/images/journey/demo.jpg';
import demoImg2 from '@/assets/images/journey/demo2.jpg';

interface JourneyPhoto {
	image: string;
	location: string;
	year: string;
	rotation: number;
}

const journeyPhotos: JourneyPhoto[] = [
	{ image: demoImg, location: 'Paris', year: '2023', rotation: -10 },
	{ image: demoImg2, location: 'Madrid', year: '2023', rotation: 5 },
	{ image: demoImg, location: 'Nice', year: '2023', rotation: 12 },
	{ image: demoImg2, location: 'London', year: '2024', rotation: 5 },
	{ image: demoImg, location: 'Nottingham', year: '2024', rotation: 10 },
	{ image: demoImg2, location: 'Edinburgh', year: '2024', rotation: -4 },
	{ image: demoImg, location: 'Dreamland', year: '2025', rotation: -10 },
	{ image: demoImg, location: 'Bali', year: '2025', rotation: 2 },
	{ image: demoImg2, location: 'Sài Gòn', year: '2025', rotation: -4 },
];

export default function OurJourney() {
	const { t } = useTranslation();

	return (
		<section id="our-journey" className="bg-[#fbf7ee] px-0 md:px-4 py-12 md:py-20 lg:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="mb-12 md:mb-16 lg:mb-20 px-4 md:px-0">
					<div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-hoangngan8 text-[#412d1d] mb-4 text-center">
						{t('journey.title')}
					</div>
				</div>

				{/* Single paragraph block with all journey text */}
				<div className="max-w-5xl md:max-w-6xl mx-auto mb-12 md:mb-16 lg:mb-20 px-4 md:px-0">
					<p className="text-[#412d1d]/80 text-base md:text-lg font-hoangngan4 leading-relaxed text-justify md:text-left whitespace-pre-line">
						{t('journey.paragraph1')}
						{'\n\n'}
						{t('journey.paragraph2')}
						{'\n\n'}
						{t('journey.paragraph3')}
					</p>
				</div>

				{/* Photo carousel */}
				{/* Mobile: Stacked Carousel */}
				<div className="md:hidden">
					<StackedCarousel autoplayDelay={3000}>
						{journeyPhotos.map((photo, index) => (
							<PolaroidPhoto
								key={`photo-m-${index}`}
								image={photo.image}
								location={photo.location}
								year={photo.year}
								rotation={photo.rotation}
								index={index}
								descriptionPosition="center"
							/>
						))}
					</StackedCarousel>
				</div>

				{/* Desktop: Overlap Carousel with 3 visible slides */}
				<div className="hidden md:block">
					<OverlapCarousel autoplayDelay={4000}>
						{journeyPhotos.map((photo, index) => (
							<PolaroidPhoto
								key={`photo-d-${index}`}
								image={photo.image}
								location={photo.location}
								year={photo.year}
								rotation={photo.rotation}
								index={index}
								descriptionPosition="center"
							/>
						))}
					</OverlapCarousel>
				</div>
			</div>
		</section>
	);
}
