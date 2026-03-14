import { useState } from 'react';
import ResponsiveImage from '../ResponsiveImage';
import RSVPForm from './RSVPForm';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogClose,
	DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

const New_RSVP = () => {
	const [open, setOpen] = useState(false);

	return (
		<section className="relative w-full py-8 md:py-12 lg:py-16 flex items-center justify-center px-4 bg-[#fffcf7]">
			{/* Content container with envelope_opened as background - Larger sizes for better readability */}
			<div className="relative w-full max-w-[95vw] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
				{/* Background: envelope_opened - sized to match content */}
				<div className="relative w-full aspect-square">
					<ResponsiveImage
						src="envelope/envelope_opened_1.png"
						alt="Envelope"
						className="w-full h-full object-contain"
						sizes="(max-width: 768px) 95vw, (max-width: 1024px) 700px, (max-width: 1280px) 900px, 1000px"
					/>

					{/* Centered envelope_online - positioned inside envelope - LARGER, moved up */}
					<div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 lg:p-8 xl:p-10 pb-8 md:pb-12 lg:pb-16 xl:pb-20">
						<ResponsiveImage
							src="envelope/envelope_online.png"
							alt="Wedding Invitation"
							className="w-full h-auto drop-shadow-2xl"
							sizes="(max-width: 768px) 90vw, (max-width: 1024px) 650px, (max-width: 1280px) 820px, 900px"
						/>
					</div>

					{/* Heart with RSVP text - ROTATED 120deg, left-bottom overlapping envelope_online */}
					<button
						onClick={() => setOpen(true)}
						className="absolute left-1 bottom-12 md:left-8 md:bottom-16 lg:left-12 lg:bottom-20 xl:left-16 xl:bottom-24 w-[120px] md:w-[160px] lg:w-[200px] xl:w-[240px] cursor-pointer group z-20 bg-transparent border-0 p-0"
					>
						<div className="relative transition-transform duration-300 group-hover:scale-110 rotate-[-30deg]">
							<ResponsiveImage
								src="envelope/heart.png"
								alt="RSVP"
								className="w-full h-auto drop-shadow-xl"
								sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, (max-width: 1280px) 200px, 240px"
							/>
							{/* Text overlay on heart - rotates with the heart */}
							<div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
								<p className="text-[#6b5739] font-hoangngan7 text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight">
									Phản hồi tham dự
								</p>
								<p className="text-[#6b5739] font-hoangngan7 text-[10px] md:text-sm lg:text-base xl:text-lg font-semibold mt-0.5">
									RSVP
								</p>
							</div>
						</div>
					</button>
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
