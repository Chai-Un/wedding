import { useTranslation } from 'react-i18next';

const Timeline = () => {
	const { t } = useTranslation();
	const timelineItems = t('timeline.items', { returnObjects: true }) as Array<{
		time: string;
		title: string;
		subtitle: string;
		description: string;
	}>;

	// Icon mapping for each timeline item
	const icons = [
		'🦢', // Swans for engagement
		'🍽️', // Table for guest arrival
		'💍', // Rings for wedding ceremony
		'🥂', // Champagne for reception
		'💃', // Dancer for first dance
		'🪩', // Disco ball for entertainment
	];

	return (
		<section id="timeline" className="bg-[#412d1d] py-12 md:py-20 lg:py-24 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Title */}
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-custom-serif text-[#eee5d5] text-center mb-8 md:mb-12 lg:mb-16">
					{t('timeline.title')}
				</h2>

				{/* Header with decorative swans */}
				<div className="flex flex-col items-center mb-12">
					<div className="text-6xl mb-6">🦢🦢</div>
					<div className="text-center space-y-2">
						<p className="text-[#eee5d5] text-lg md:text-xl lg:text-2xl font-montserrat">
							{timelineItems[0].time}
						</p>
						<p className="text-[#eee5d5] text-base md:text-lg lg:text-xl font-montserrat uppercase tracking-wide">
							{timelineItems[0].title}
						</p>
						<p className="text-[#eee5d5]/90 text-sm md:text-base font-montserrat italic">
							{timelineItems[0].subtitle}
						</p>
						<p className="text-[#eee5d5]/80 text-xs md:text-sm font-montserrat italic">
							{timelineItems[0].description}
						</p>
					</div>
				</div>

				{/* Grid of timeline items */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mt-16">
					{timelineItems.slice(1).map((item, index) => (
						<div key={index} className="flex flex-col items-center text-center space-y-3">
							{/* Icon */}
							<div className="text-6xl mb-2">{icons[index + 1]}</div>

							{/* Time */}
							<p className="text-[#eee5d5] text-lg md:text-xl lg:text-2xl font-montserrat font-medium">
								{item.time}
							</p>

							{/* Title */}
							<p className="text-[#eee5d5] text-base md:text-lg lg:text-xl font-montserrat">
								{item.title}
							</p>

							{/* Subtitle */}
							{item.subtitle && (
								<p className="text-[#eee5d5]/90 text-xs md:text-sm font-montserrat italic">
									{item.subtitle}
								</p>
							)}

							{/* Description */}
							{item.description && (
								<p className="text-[#eee5d5]/80 text-[10px] md:text-xs font-montserrat italic">
									{item.description}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Timeline;
