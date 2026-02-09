import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/logo_new.png';

const ContactUs = () => {
	const { t } = useTranslation();
	
	return (
		<section className="bg-[#6b5739] py-12 md:py-16 lg:py-20 px-4 text-center">
			<div className="max-w-5xl mx-auto">
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
								className="hover:text-[#e8dcc8] transition-colors"
							>
								{t('contact.phone')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
