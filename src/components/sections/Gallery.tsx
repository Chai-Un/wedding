import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
// import clickIcon from '@/assets/images/click.png';

export default function Gallery() {
	const { t } = useTranslation();

	return (
		<section
			id="gallery"
			className="bg-[#e8dcc8] px-4 py-12 md:py-20 lg:py-24"
		>
			<div className="md:max-w-[80%] lg:max-w-[70%] mx-auto">
				<div className="text-center mb-8 md:mb-12 lg:mb-16">
					<div className="text-4xl md:text-5xl lg:text-6xl font-custom-serif text-[#412d1d]">
						{t('gallery.title')}
					</div>
					<p className="text-[#412d1d] text-base md:text-lg mt-4 font-hoangngan4">
						{t('gallery.subtitle')}
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
					{GALLERY_CONCEPTS.map((concept) => (
						<Link
							key={concept.id}
							to={concept.path}
							className="group"
						>
							<div className="relative">
								{/* Stacked photo effect - back layers using actual bgImage */}
								{concept.bgImage && (
									<>
										<div
											className="absolute -top-1 -right-1 w-full h-full rounded-lg rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-30 blur-[1px]"
											style={{
												backgroundImage: `url(${concept.bgImage})`,
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												boxShadow:
													'0 4px 12px rgba(0, 0, 0, 0.1)',
											}}
										></div>
										<div
											className="absolute -top-2 -right-2 w-full h-full rounded-lg rotate-[4deg] group-hover:rotate-0 transition-transform duration-300 opacity-50 blur-[2px]"
											style={{
												backgroundImage: `url(${concept.bgImage})`,
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												boxShadow:
													'0 6px 16px rgba(0, 0, 0, 0.2)',
											}}
										></div>
									</>
								)}

								{/* Main card */}
								<div
									className={`relative aspect-3/4 ${!concept.bgImage ? `bg-linear-to-br ${concept.bgColor}` : ''} rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center cursor-pointer shadow-lg group-hover:shadow-xl overflow-hidden`}
									style={
										concept.bgImage
											? {
													backgroundImage: `url(${concept.bgImage})`,
													backgroundSize: 'cover',
													backgroundPosition:
														'center',
												}
											: undefined
									}
								>
									{/* Dark overlay on hover */}
									{concept.bgImage && (
										<div className="absolute inset-0 bg-black/0 transition-colors duration-300"></div>
									)}

									{/* Mobile tap indicator (only on last item) */}
									{/* {index === GALLERY_CONCEPTS.length - 1 && (
										<div className="absolute bottom-1 right-0 md:hidden z-20 pointer-events-none">
											<img
												src={clickIcon}
												alt="Tap to view"
												className="w-20 h-20 opacity-80 -rotate-42 animate-bounce"
											/>
										</div>
									)} */}

									{/* Title - always visible at top with gradient */}
									<div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/50 via-black/30 to-transparent p-4 z-10">
										<div className="text-xl md:text-lg lg:text-2xl font-hoangngan7 text-white text-center leading-tight pt-[10%]">
											{t(
												`gallery.concepts.${concept.translationKey}.title`,
											)}
										</div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
