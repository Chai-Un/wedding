import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

import { Button } from '../ui/button';
import RSVPForm from './RSVPForm';

export default function RSVP() {
	const { t } = useTranslation();

	const openMap = () => {
		window.open(
			'https://maps.google.com/?q=Trung+Tâm+Hội+Nghị+Quốc+Gia+Phạm+Hùng',
			'_blank',
		);
	};

	return (
		<section
			id="rsvp"
			className="bg-[#fbf7ee] px-4 py-12 md:py-20 lg:py-24"
		>
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
					{/* Left Column - Invitation Card */}
					<div className="bg-[#eee5d5] pt-12 pb-6 md:p-6 lg:p-8 flex flex-col justify-center">
						{/* Invitation Text */}
						<div className="text-center space-y-4">
							{/* <div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 uppercase tracking-wider whitespace-pre-line">
								{t('rsvp.hosts')}
							</div> */}
							<div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 leading-relaxed whitespace-pre-line">
								{t('rsvp.invitationText')}
							</div>
							<div className="text-[#6b5739] text-lg lg:text-xl font-bold font-hoangngan5 uppercase tracking-wide">
								{t('rsvp.dateTime')}
							</div>
							<div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 leading-relaxed space-y-2 whitespace-pre-line">
								<div className="py-3 m-0">
									{t('rsvp.location')}
								</div>
								<div className="font-bold text-lg lg:text-xl uppercase font-hoangngan5">
									{t('rsvp.venue')}
								</div>
								<div>{t('rsvp.address')}</div>
							</div>
							<Button
								size="lg"
								onClick={openMap}
								variant={null}
								className="font-hoangngan5 text-[#6b5739] px-12 py-6 text-sm tracking-widest uppercase cursor-pointer"
							>
								<MapPin className="w-4 h-4" />
								{t('rsvp.viewMap')}
							</Button>
						</div>
					</div>

					{/* Right Column - RSVP Form */}
					<RSVPForm />
				</div>
			</div>
		</section>
	);
}
