import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/logo_new.png';
import Photo1 from '@/assets/images/mievatho_NH1487.JPG';
import Photo2 from '@/assets/images/mievatho_NH1504.JPG';

const ContactUs = () => {
	const { t } = useTranslation();

	return (
		<section className="bg-[#412d1d] py-12 md:py-16 lg:py-20 px-4 text-center">
			{/* <section className="bg-[#6b5739] py-12 md:py-16 lg:py-20 px-4 text-center"> */}
			<div className="max-w-6xl mx-auto">
				<div className="grid gap-12 items-center">
					<div
						className={`relative inline-flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain w-full h-30`}
						style={{ backgroundImage: `url(${Logo})` }}
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
			<div className="max-w-4xl mx-auto">
				{/* Two-photo grid with "together always" overlay */}
				<div className="relative mt-12 w-full mb-10">
					<div className="grid grid-cols-2 gap-3">
						<img
							src={Photo1}
							alt="Together always – photo 1"
							className="w-full object-cover aspect-4/3"
						/>
						<img
							src={Photo2}
							alt="Together always – photo 2"
							className="w-full object-cover aspect-4/3"
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
								transform: 'rotate(-11.551deg) scale(0.858056, 0.858056)',
								whiteSpace: 'nowrap',
							}}
						>
							{t('contact.togetherAlways')}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
