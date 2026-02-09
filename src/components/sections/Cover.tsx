import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import coverImage from '@/assets/images/mievatho_NH6514.JPG';
// import coverMobileImage from '@/assets/images/mievatho_NH1487.JPG';

export default function Cover() {
	const { t } = useTranslation();
	return (
		<section
			id="home"
			className="relative h-screen md:min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24 lg:py-32"
		>
			{/* Navigation */}
			<Navigation overlay={true} />

			{/* Background with overlay - Portrait/Mobile */}
			<div
				className="absolute inset-0 bg-cover md:hidden"
				style={{
					backgroundImage: `url(${coverImage})`,
					backgroundPosition: '60% 30%',
				}}
			>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Background with overlay - Landscape/Desktop */}
			<div
				className="absolute inset-0 bg-cover hidden md:block"
				style={{
					backgroundImage: `url(${coverImage})`,
					backgroundPosition: '50% 10%',
				}}
			>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center space-y-8 max-w-4xl">
				{/* Couple Names */}
				<div className="space-y-4">
					<div className="text-5xl md:text-7xl lg:text-8xl text-white tracking-normal leading-tight font-hoangngan8">
						Hoàng & Ngân
					</div>
					<p className="text-xl md:text-3xl lg:text-4xl text-white/90 tracking-[0.3em] uppercase font-light font-hoangngan7">
						{t('cover.saveTheDate')}
					</p>
				</div>
			</div>

			{/* Date & Time at bottom */}
			<div className="absolute bottom-[2%] left-0 right-0 text-center z-10 px-4">
				<div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center text-xl uppercase font-thin font-inconsolata">
					<div className="text-white tracking-wider">
						{t('cover.date')}
					</div>
					<div className="text-white tracking-wider">
						{t('cover.venue')}
					</div>
				</div>
			</div>
		</section>
	);
}
