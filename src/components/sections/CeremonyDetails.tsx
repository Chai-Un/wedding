import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CircleBeautyImage from '@/assets/images/circle-beauty.png';
import ceremonyBackgroundImage from '@/assets/images/mievatho_NH6575.JPG';
import ceremonyMobileBackgroundImage from '@/assets/images/mievatho_NH6575.JPG';

export default function CeremonyDetails() {
	const { t } = useTranslation();
	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	};

	const openMap = () => {
		window.open(
			'https://maps.google.com/?q=Trung+Tâm+Hội+Nghị+Quốc+Gia+Phạm+Hùng',
			'_blank',
		);
	};

	return (
		<section className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 lg:py-28">
			{/* Mobile background */}
			<div
				className="absolute inset-0 bg-cover bg-center md:hidden"
				style={{ backgroundImage: `url(${ceremonyMobileBackgroundImage})` }}
			/>
			{/* Desktop background */}
			<div
				className="absolute inset-0 bg-cover bg-center hidden md:block"
				style={{ backgroundImage: `url(${ceremonyBackgroundImage})` }}
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-[#412d1d]/70"></div>

			{/* Logo/Monogram */}
			<div className="mb-8 relative z-10">
				<div
					style={{
						width: '131.206px',
						height: '115.223px',
						transform: 'translate(0px, 0px) rotate(0deg)',
					}}
				>
					<img
						crossOrigin="anonymous"
						draggable="false"
						src={CircleBeautyImage}
						alt=""
					/>
				</div>
				{/* HN Text Overlay */}
				<div className="absolute inset-0 flex items-center justify-center">
					<span
						style={{
							fontFamily: 'CustomSerif, serif',
							fontSize: '32px',
							fontWeight: 400,
							color: 'rgb(255, 255, 255)',
							fontStyle: 'normal',
						}}
					>
						HN
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="text-center space-y-6 max-w-3xl text-white z-10">
				{/* <p
					className="text-lg tracking-wide"
					style={{ fontFamily: 'Inconsolata, monospace' }}
				>
					Hôn lễ diễn ra vào
				</p> */}

				<h2
					className="text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase"
					style={{ fontFamily: 'Inconsolata, monospace' }}
				>
					{t('ceremony.day')}
				</h2>

				<div
					className="text-3xl md:text-4xl lg:text-5xl tracking-wide"
					style={{ fontFamily: 'Inconsolata, monospace' }}
				>
					{t('ceremony.time')}
				</div>

				<div className="pt-8 space-y-3">
					<p
						className="text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase"
						style={{
							fontFamily: 'Inconsolata, monospace',
							letterSpacing: '0.1em',
						}}
					>
						{t('ceremony.room')}
					</p>
					<p
						className="text-xl md:text-2xl lg:text-3xl tracking-widest uppercase"
						style={{ fontFamily: 'Inconsolata, monospace' }}
					>
						{t('ceremony.venue')}
					</p>
					<p
						className="text-base md:text-lg lg:text-xl tracking-wide pt-2"
						style={{ fontFamily: 'Inconsolata, monospace' }}
					>
						{t('ceremony.address')}
					</p>
				</div>

				{/* Buttons */}
				<div className="pt-12 space-y-4">
					<Button
						size="lg"
						onClick={openMap}
						variant="outline"
						className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4a3f35] px-12 py-6 text-sm tracking-widest uppercase transition-all"
					>
						<MapPin className="w-4 h-4 mr-2" />
						{t('ceremony.mapButton')}
					</Button>
					{/* CTA Button */}
					<div className="pt-8">
						<Button
							size="lg"
							onClick={() => scrollToSection('rsvp')}
							className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-12 py-6 text-sm tracking-widest uppercase"
						>
							{t('ceremony.rsvpButton')}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
