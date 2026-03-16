import { useState } from 'react';
import ResponsiveImage from '../ResponsiveImage';
import RSVPForm from './RSVPForm';
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const New_RSVP = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const openMap = () => {
		window.open(
			'https://maps.google.com/?q=Trung+Tâm+Hội+Nghị+Quốc+Gia+Phạm+Hùng',
			'_blank',
		);
	};

	return (
		<section
			id="rsvp_envelope"
			className="bg-[#fffcf7] px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20"
		>
			{/* Title */}
			<div className="text-[48px] lg:text-[64px] font-hoangngan8 text-[#412d1d] text-center">
				{t('rsvp.invitedMessage')}
			</div>

			{/* Two-column layout on desktop */}
			<div className="mx-auto w-full max-w-7xl">
				<div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 xl:gap-16">
					{/* Left Column: Envelope and Map Button */}
					<div className="w-full lg:w-3/5">
						<div className="relative w-full">
							{/* Envelope with invitation card - portrait orientation */}
							<ResponsiveImage
								src="envelope/envelope_with_paper_1.png"
								alt="Wedding Invitation Envelope"
								className="w-full h-auto object-contain"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>

						{/* View Map Button */}
						<div
							className="flex justify-center mt-0 md:-mt-10 cursor-pointer"
							onClick={openMap}
						>
							<Button
								size="lg"
								variant={null}
								onClick={openMap}
								className="font-hoangngan5 bg-[#d4c5ad] hover:bg-[#c4b59d] text-[#412d1d] px-8 py-3 md:px-12 md:py-6 tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-colors text-sm lg:text-base z-20"
							>
								<MapPin className="w-5 h-5 md:w-6 md:h-6" />
								{t('rsvp.viewMap')}
							</Button>
						</div>
					</div>

					{/* Right Column: RSVP Form */}
					<div className="w-full lg:w-2/5">
						<div
							className="mt-4 lg:mt-0 bg-white rounded-[5px] p-6 md:p-8 lg:p-10"
							style={{
								boxShadow:
									'rgba(0, 0, 0, 0.1) 0px 2px 10px 0px',
							}}
						>
							<RSVPForm />
						</div>
					</div>
				</div>
			</div>

			{/* Dialog - moved outside the container */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					showCloseButton={false}
					className="w-[95vw] max-w-lg md:max-w-xl overflow-visible"
				>
					<DialogTitle className="sr-only">RSVP Form</DialogTitle>

					{/* Close button - outside top-right corner like GalleryDialog */}
					<DialogClose asChild>
						<button className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors cursor-pointer z-50 border-0">
							<X className="w-4 h-4" />
							<span className="sr-only">Close</span>
						</button>
					</DialogClose>

					<div className="max-h-[70vh] overflow-y-auto -mx-6 px-6">
						<RSVPForm />
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default New_RSVP;
