import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { GalleryConcept } from '@/constants/galleryData';

interface GalleryItemProps {
	concept: GalleryConcept;
	variant?: 'stacked' | 'simple';
	showDescription?: boolean;
}

export default function GalleryItem({
	concept,
	variant = 'stacked',
	showDescription = true,
}: GalleryItemProps) {
	const { t } = useTranslation();

	// Stacked photo effect for main gallery
	return (
		<Link key={concept.id} to={concept.path} className="group">
			<div className="relative">
				{/* Stacked photo effect - back layers using actual bgImage */}
				{concept.bgImage && variant === 'stacked' && (
					<>
						<div
							className="absolute -top-1 -right-1 w-full h-full rounded-lg rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-30 blur-[1px]"
							style={{
								backgroundImage: `url(${concept.bgImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
							}}
						></div>
						<div
							className="absolute -top-2 -right-2 w-full h-full rounded-lg rotate-[4deg] group-hover:rotate-0 transition-transform duration-300 opacity-50 blur-[2px]"
							style={{
								backgroundImage: `url(${concept.bgImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
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
									backgroundPosition: 'center',
								}
							: undefined
					}
				>
					{/* Dark overlay on hover */}
					{concept.bgImage && (
						<div className="absolute inset-0 bg-black/0 transition-colors duration-300"></div>
					)}

					{/* Title - always visible at top with gradient */}
					<div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/50 via-black/30 to-transparent p-4 pb-8 z-10">
						<div className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-hoangngan7 text-white text-center leading-tight pt-[5%] line-clamp-2">
							{t(
								`gallery.concepts.${concept.translationKey}.title`,
							)}
						</div>
					</div>

					{showDescription && (
						<div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 via-black/30 to-transparent p-2 pt-8 z-10">
							<div className="text-xs md:text-sm lg:text-base xl:text-lg font-hoangngan10 text-white text-center leading-tight line-clamp-3 h-12 md:h-14 lg:h-16">
								{t(
									`gallery.concepts.${concept.translationKey}.description`,
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}
