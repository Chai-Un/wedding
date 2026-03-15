import { useTranslation } from 'react-i18next';
import PolaroidPhoto from '@/components/PolaroidPhoto';
import ResponsiveImage from '@/components/ResponsiveImage';
import { getOptimizedUrl } from '@/lib/responsive-image';
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

// Paper texture for torn-paper background — use optimized variant
const paperUrl = getOptimizedUrl('journey/paper_base.png', 'lg') || '';

interface JourneyPhoto {
	image: string;
	location: string;
	year: string;
	rotation: number;
}

const journeyPhotos: JourneyPhoto[] = [
	{ image: 'journey/demo.jpg', location: 'Paris', year: '2023', rotation: -10 },
	{ image: 'journey/demo2.jpg', location: 'Madrid', year: '2023', rotation: 5 },
	{ image: 'journey/demo.jpg', location: 'Nice', year: '2023', rotation: 12 },
	{ image: 'journey/demo2.jpg', location: 'London', year: '2024', rotation: 5 },
	{ image: 'journey/demo.jpg', location: 'Nottingham', year: '2024', rotation: 10 },
	{ image: 'journey/demo2.jpg', location: 'Edinburgh', year: '2024', rotation: -4 },
	{ image: 'journey/demo.jpg', location: 'Dreamland', year: '2025', rotation: -10 },
	{ image: 'journey/demo.jpg', location: 'Bali', year: '2025', rotation: 2 },
	{ image: 'journey/demo2.jpg', location: 'Sài Gòn', year: '2025', rotation: -4 },
];

export default function OurJourney() {
	const { t } = useTranslation();

	return (
		<section
			id="our-journey"
			className="bg-[#fbf7ee] px-0 md:px-4 py-12 md:py-20 lg:py-24"
		>
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="mb-12 md:mb-16 lg:mb-20 px-4 md:px-0">
					<div className="text-[48px] lg:text-[80px] font-hoangngan8 text-[#412d1d] mb-4 text-center">
						{t('journey.title')}
					</div>
				</div>

				{/* Single paragraph block with all journey text */}
				<div className="relative max-w-3xl md:max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 px-4 md:px-0">
					{/* Decorative: flowerTop + stamp — top-left */}
					<ResponsiveImage
						src="journey/flower_top.png"
						alt=""
						className="absolute left-[10%] top-[-3%] -md:top-[8%] md:left-[5%] w-16 md:w-24 z-16 pointer-events-none select-none"
					/>
					<ResponsiveImage
						src="journey/stamp.png"
						alt=""
						className="absolute left-[-1%] top-[-2%] md:left-[-2%] md:top-[-2%] lg:left-[-8%] lg:top-[2%] w-40 md:w-64 lg:w-81 h-10 md:h-16 lg:h-20 z-15 pointer-events-none select-none opacity-70 rotate-140"
					/>

					{/* Paper background with text */}
					<div className="relative w-[95%] mx-auto lg:w-full">
						{/* Inline SVG clip-path definition — torn edges on all 4 sides */}
						<svg
							width="0"
							height="0"
							className="absolute"
							aria-hidden="true"
						>
							<defs>
								<clipPath
									id="torn-paper"
									clipPathUnits="objectBoundingBox"
								>
									{/*
										Realistic torn paper — each edge is hand-crafted:
										- Varied tear amplitude (tiny nicks + large chunks)
										- Mix of sharp angular peaks and soft rounded bits
										- Clustered damage zones with calm stretches between
										- Asymmetric cubic beziers to avoid any periodicity
									*/}
									<path
										d="
										M 0.00,0.04

										C 0.01,0.015 0.025,0.00  0.045,0.02
										C 0.055,0.03  0.06,0.005  0.075,0.015
										C 0.085,0.025 0.09,0.00   0.11,0.03
										C 0.13,0.055 0.135,0.01   0.15,0.025
										C 0.16,0.035 0.165,0.00   0.185,0.02
										C 0.20,0.04  0.21,0.005   0.23,0.015
										C 0.245,0.02  0.25,-0.005  0.275,0.01
										C 0.30,0.025 0.305,0.00   0.33,0.035
										C 0.355,0.06  0.36,0.005   0.385,0.02
										C 0.40,0.03  0.405,0.00   0.425,0.015
										C 0.44,0.025 0.445,-0.005  0.47,0.01
										C 0.495,0.025 0.50,0.00    0.525,0.03
										C 0.55,0.055 0.555,0.01    0.575,0.025
										C 0.59,0.035 0.595,0.00    0.615,0.02
										C 0.635,0.04 0.64,0.005    0.665,0.015
										C 0.68,0.02  0.685,-0.005  0.71,0.01
										C 0.735,0.025 0.74,0.00    0.76,0.04
										C 0.775,0.055 0.78,0.01    0.80,0.025
										C 0.815,0.035 0.82,-0.005  0.845,0.015
										C 0.865,0.03  0.87,0.00    0.895,0.025
										C 0.915,0.04  0.92,0.005   0.945,0.02
										C 0.96,0.03  0.965,0.00    0.985,0.02
										C 0.995,0.03  1.00,0.01    1.00,0.04

										L 1.00,0.97

										C 0.995,0.99  0.975,1.00   0.965,0.985
										C 0.955,0.97  0.945,1.005  0.93,0.99
										C 0.915,0.975 0.91,1.01    0.895,0.995
										C 0.875,0.975 0.87,1.005   0.855,0.99
										C 0.84,0.975 0.835,1.01    0.815,0.995
										C 0.795,0.98  0.79,1.01    0.77,0.995
										C 0.75,0.98   0.745,1.015  0.725,0.995
										C 0.70,0.975  0.695,1.01   0.675,0.995
										C 0.655,0.98  0.65,1.02    0.625,1.00
										C 0.60,0.98   0.595,1.015  0.575,0.995
										C 0.555,0.975 0.55,1.01    0.53,0.995
										C 0.51,0.98   0.505,1.02   0.485,1.00
										C 0.46,0.98   0.455,1.015  0.435,0.995
										C 0.415,0.975 0.41,1.01    0.39,0.995
										C 0.37,0.98   0.365,1.015  0.345,0.995
										C 0.325,0.975 0.32,1.01    0.295,0.995
										C 0.275,0.98  0.27,1.02    0.25,1.00
										C 0.23,0.98   0.225,1.015  0.205,0.995
										C 0.185,0.975 0.18,1.01    0.16,0.995
										C 0.14,0.98   0.135,1.015  0.115,0.995
										C 0.095,0.975 0.09,1.01    0.07,0.995
										C 0.05,0.98   0.045,1.02   0.025,1.00
										C 0.01,0.985  0.005,0.995  0.00,0.98

										L 0.00,0.04
										Z
									"
									/>
								</clipPath>
							</defs>
						</svg>

						{/* Paper — clipped with torn edges, drop shadow outside */}
						<div
							style={{
								filter: 'drop-shadow(0px 4px 10px rgba(60,35,10,0.18)) drop-shadow(0px 1px 3px rgba(60,35,10,0.10))',
							}}
						>
							<div
								className="w-full"
								style={{
									backgroundImage: `url(${paperUrl})`,
									backgroundSize: 'cover',
									backgroundPosition: 'bottom',
									clipPath: 'url(#torn-paper)',
									paddingTop: '5%',
									paddingBottom: '5%',
								}}
							>
								{/* Text content */}
								<div className="px-6 py-15 md:px-16 md:py-14 lg:px-20 lg:py-20">
									<p className="text-[#3d1700] text-xs md:text-base font-hoangngan4 leading-relaxed whitespace-pre-line w-full text-left">
										{t('journey.paragraph1')}
										{'\n\n\n'}
										{t('journey.paragraph2')}
										{'\n\n\n'}
										{t('journey.paragraph3')}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Decorative: flower + wax_seal — bottom-right */}
					<ResponsiveImage
						src="journey/flower.png"
						alt=""
						className="absolute right-[9%] bottom-[-3%] md:right-6 md:bottom-[-7%] lg:bottom-[-10%] lg:right-0 w-20 md:w-32 lg:w-40 z-10 pointer-events-none select-none rotate-40"
					/>
					<ResponsiveImage
						src="journey/wax_seal.png"
						alt=""
						className="absolute bottom-4 right-16 md:bottom-5 md:right-20 lg:right-16 w-10 md:w-16 lg:w-20 z-10 pointer-events-none select-none"
					/>
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
