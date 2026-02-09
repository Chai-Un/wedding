import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';

export default function Gallery() {
	const { t } = useTranslation();

	return (
		<section id="gallery" className="bg-[#e8dcc8] px-4 py-12 md:py-20 lg:py-24">
			<div className="md:max-w-[70%] mx-auto">
				<div className="text-center mb-8 md:mb-12 lg:mb-16">
					<div className="text-4xl md:text-5xl lg:text-6xl font-custom-serif text-[#412d1d]">
						{t('gallery.title')}
					</div>
					<p className="text-[#412d1d] text-base md:text-lg mt-4 font-hoangngan4">
						{t('gallery.subtitle')}
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{GALLERY_CONCEPTS.map((concept) => (
						<Link
							key={concept.id}
							to={concept.path}
							className="group"
						>
							<div
								className={`aspect-3/4 ${!concept.bgImage ? `bg-linear-to-br ${concept.bgColor}` : ''} rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-6 cursor-pointer shadow-lg group-hover:shadow-xl relative overflow-hidden`}
								style={concept.bgImage ? {
									backgroundImage: `url(${concept.bgImage})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								} : undefined}
							>
								{/* Overlay for better text readability on images */}
								{concept.bgImage && (
									<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
								)}
								<div className="relative z-10">
									<div className="text-base md:text-xl lg:text-3xl font-hoangngan7 text-white text-center mb-2 group-hover:scale-110 transition-transform">
										{t(
											`gallery.concepts.${concept.translationKey}.title`,
										)}
									</div>
									<p className="text-xs md:text-sm lg:text-xl xl:text-2xl text-white/80 text-center font-hoangngan7">
										{t(
											`gallery.concepts.${concept.translationKey}.description`,
										)}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
