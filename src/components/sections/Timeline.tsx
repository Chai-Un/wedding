import { useTranslation } from 'react-i18next';
import swanWhite from '@/assets/images/symbol/swan_white.svg';
import dishWhite from '@/assets/images/symbol/dish_white.svg';
import ringWhite from '@/assets/images/symbol/ring-white.svg';
import groomBrideWhite from '@/assets/images/symbol/groom_bride_white.svg';
import cheerWhite from '@/assets/images/symbol/cheer.svg';
import discoBallWhite from '@/assets/images/symbol/disco_ball_white.svg';

const Timeline = () => {
	const { t } = useTranslation();
	const timelineItems = t('timeline.items', {
		returnObjects: true,
	}) as Array<{
		time: string;
		title: string;
		subtitle: string;
		description: string;
	}>;

	// Icon mapping for each timeline item
	const icons = [
		swanWhite, // Swans for engagement
		dishWhite, // Table for guest arrival
		ringWhite, // Rings for wedding ceremony
		cheerWhite, // Dancer for first dance
		groomBrideWhite, // Champagne for reception
		discoBallWhite, // Disco ball for entertainment
	];

	return (
		<section
			id="timeline"
			className="bg-[#6b5739] py-12 md:py-20 lg:py-24 px-4"
		>
			<div className="max-w-6xl mx-auto">
				{/* Title */}
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-custom-serif text-[#e8dcc8] text-center mb-8 md:mb-12">
					{t('timeline.title')}
				</h2>

				{/* Header with decorative swans */}
				<div className="flex flex-col items-center">
					<div className="flex gap-4 mb-4">
						<img src={swanWhite} alt="Swan" className="w-35 h-25" />
					</div>
					<div className="text-center space-y-2">
						<p className="text-[#e8dcc8] text-lg md:text-xl lg:text-2xl font-hoangngan5 uppercase tracking-wide font-bold">
							{timelineItems[0].time}
						</p>
						<p className="text-[#e8dcc8] text-base md:text-lg lg:text-xl font-hoangngan3 uppercase tracking-wide">
							{timelineItems[0].title}
						</p>
						<p className="text-[#e8dcc8]/90 text-base md:text-lg lg:text-xl font-hoangngan3 italic">
							{timelineItems[0].subtitle}
						</p>
						<p className="text-[#e8dcc8]/80 text-xs md:text-sm font-hoangngan3 italic">
							{timelineItems[0].description}
						</p>
					</div>
				</div>

				{/* Grid of timeline items */}
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-10 mt-10 md:mt-16">
					{timelineItems.slice(1).map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-center text-center space-y-3"
						>
							{/* Icon */}
							<div className="mb-3 md:mb-5">
								<img
									src={icons[index + 1]}
									alt={item.title}
									className="w-full h-25"
								/>
							</div>

							{/* Time */}
							<div className="text-[#e8dcc8] text-lg md:text-xl lg:text-2xl font-hoangngan5 font-medium mb-0 md:mb-2">
								{item.time}
							</div>

							{/* Title */}
							<div className="text-[#e8dcc8] text-base md:text-lg lg:text-xl font-hoangngan3">
								{item.title}
							</div>

							{/* Subtitle */}
							{item.subtitle && (
								<div className="text-[#e8dcc8]/90 text-xs md:text-sm font-hoangngan3 mb-0">
									{item.subtitle}
								</div>
							)}

							{/* Description */}
							{item.description && (
								<div className="text-[#e8dcc8]/80 text-xs md:text-sm font-hoangngan3">
									{item.description}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Timeline;
