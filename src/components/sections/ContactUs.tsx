import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ResponsiveImage from '@/components/ResponsiveImage';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { getOptimizedUrl } from '@/lib/responsive-image';

const ContactUs = () => {
	const { t } = useTranslation();

	return (
		<ResponsiveBackground
			imagePath="gallery/redamancy/mievatho_NH1525.jpg"
			className="relative py-12 md:py-16 lg:py-20 px-4 text-center bg-cover"
		>
			<div className="absolute inset-0 bg-[#3d1700]/65 pointer-events-none" />
			{/* <section className="bg-[#6b5739] py-12 md:py-16 lg:py-20 px-4 text-center"> */}
			<div className="relative max-w-6xl mx-auto">
				<div className="grid gap-12 items-center">
					<div
						className={`relative inline-flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain w-full h-32 md:h-40`}
						style={{ backgroundImage: `url(${getOptimizedUrl('logo.jpg', 'sm') || ''})` }}
						// style={{ backgroundImage: `url(${LogoSvg})` }}
					></div>
					<div className="text-[#d4c5ad] text-[0.8em] md:text-[1em] lg:text-[1.125em] font-hoangngan3">
						<div className="whitespace-pre-line">
							{t('contact.message')}
						</div>
						<div className="flex items-center justify-center gap-3 pt-2">
							<Phone className="w-4 h-4" />
							<a
								href="tel:+84978662863"
								className="hover:text-[#eee5d5] transition-colors"
							>
								{t('contact.phone')}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="relative max-w-4xl mx-auto">
				{/* Two-photo grid with "together always" overlay */}
				<div className="relative mt-12 w-10/12 lg:w-full mx-auto mb-10">
					<div className="grid grid-cols-2 gap-1 md:gap-2">
						<ResponsiveImage
							src="gallery/redamancy/mievatho_NH6309.jpg"
							alt="Together always – photo 1"
							className="w-full object-cover aspect-4/3"
							sizes="(max-width: 768px) 45vw, 40vw"
						/>
						<ResponsiveImage
							src="gallery/redamancy/mievatho_NH6232.jpg"
							alt="Together always – photo 2"
							className="w-full object-cover aspect-4/3"
							sizes="(max-width: 768px) 45vw, 40vw"
						/>
					</div>
					{/* Overlay text spanning across both photos */}
					<div className="absolute bottom-4.5 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none z-10">
						<span
							className="font-hoangngan13 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
							style={{
								fontSize: 'clamp(1.25rem, 3vw, 3rem)',
								fontWeight: 400,
								fontStyle: 'normal',
								color: 'rgb(255, 255, 255)',
								fontKerning: 'none',
								textDecorationLine: 'none',
								display: 'inline-block',
								transform:
									'rotate(-11.551deg) scale(0.858056, 0.858056)',
								whiteSpace: 'nowrap',
							}}
						>
							{t('contact.togetherAlways')}
						</span>
					</div>
				</div>
			</div>
		</ResponsiveBackground>
	);
};

export default ContactUs;
