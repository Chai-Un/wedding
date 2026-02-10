import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RSVP_WEBHOOK_URL } from '@/constants/config';
import { Loader2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';

type SubmissionState = 'idle' | 'loading';

interface FormData {
	guestName: string;
	attending: 'yes' | 'no' | '';
	message: string;
	website: string; // Honeypot field
}

export default function RSVP() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState<FormData>({
		guestName: '',
		attending: '',
		message: '',
		website: '', // Honeypot field - should remain empty
	});
	const [submissionState, setSubmissionState] =
		useState<SubmissionState>('idle');

	const openMap = () => {
		window.open(
			'https://maps.google.com/?q=Trung+Tâm+Hội+Nghị+Quốc+Gia+Phạm+Hùng',
			'_blank',
		);
	};

	const validateForm = (): string | null => {
		// Honeypot check - if filled, it's a bot
		if (formData.website) {
			console.log('Honeypot triggered - potential bot detected');
			return null; // Silent fail for bots
		}

		if (!formData.guestName.trim()) {
			return 'Please enter your guestName';
		}
		if (formData.guestName.length < 2 || formData.guestName.length > 100) {
			return 'Name must be between 2 and 100 characters';
		}
		if (!formData.attending) {
			return 'Please select your attendance';
		}
		if (formData.message.length > 500) {
			return 'Message must be less than 500 characters';
		}
		return null;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const validationError = validateForm();
		if (validationError) {
			toast.error(validationError);
			return;
		}

		setSubmissionState('loading');

		try {
			// Use no-cors mode to bypass CORS issues with Google Apps Script
			await fetch(RSVP_WEBHOOK_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			// With no-cors mode, we can't read the response
			// So we assume success if no network error occurred
			setSubmissionState('idle');
			setFormData({
				guestName: '',
				attending: '',
				message: '',
				website: '',
			});
			toast.success(
				'Thank you! Your RSVP has been received. We look forward to celebrating with you!',
				{
					duration: 5000,
				},
			);
		} catch (error) {
			setSubmissionState('idle');
			toast.error(
				'Network error. Please check your connection and try again.',
			);
			console.error('RSVP submission error:', error);
		}
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
							<div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 uppercase tracking-wider whitespace-pre-line">
								{t('rsvp.hosts')}
							</div>
							<div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 leading-relaxed whitespace-pre-line">
								{t('rsvp.invitationText')}
							</div>
							<div className="text-[#6b5739] text-lg lg:text-xl font-bold font-hoangngan5 uppercase tracking-wide">
								{t('rsvp.dateTime')}
							</div>
							<div className="text-[#6b5739] text-base lg:text-lg font-hoangngan4 leading-relaxed space-y-2 whitespace-pre-line">
								<div className="py-3">{t('rsvp.location')}</div>
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
					<div className=" p-4 md:p-6 lg:p-8">
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Title */}
							<div className="text-4xl md:text-5xl font-custom-serif text-[#6b5739] mb-4 text-center md:text-left">
								{t('rsvp.title')}
							</div>

							{/* Description */}
							<p className="text-xs md:text-base leading-relaxed font-hoangngan3 text-[#6b5739] text-center md:text-left">
								{t('rsvp.description')}
							</p>

							{/* Name Input */}
							<div className="space-y-2">
								<input
									type="text"
									value={formData.guestName}
									onChange={(e) =>
										setFormData({
											...formData,
											guestName: e.target.value,
										})
									}
									placeholder={t('rsvp.nameLabel')}
									disabled={submissionState === 'loading'}
									className="w-full border-b-[1.5px] border-[#412d1d] bg-transparent py-2 focus:outline-none focus:border-[#412d1d] text-[#6b5739] font-hoangngan3 disabled:opacity-50 placeholder-[#6b5739]"
									required
									maxLength={100}
								/>
							</div>

							{/* Radio Buttons */}
							<div className="space-y-3">
								<RadioGroup
									value={formData.attending}
									onValueChange={(value) =>
										setFormData({
											...formData,
											attending: value as 'yes' | 'no',
										})
									}
									disabled={submissionState === 'loading'}
									required
								>
									<div className="flex items-center gap-4">
										<RadioGroupItem
											value="yes"
											id="yes"
											className="border-[#6b5739] text-[#6b5739]"
										/>
										<Label
											htmlFor="yes"
											className="text-[#6b5739] text-base font-hoangngan4 cursor-pointer"
										>
											{t('rsvp.attendYes')}
										</Label>
									</div>
									<div className="flex items-center gap-4">
										<RadioGroupItem
											value="no"
											id="no"
											className="border-[#6b5739] text-[#6b5739]"
										/>
										<Label
											htmlFor="no"
											className="text-[#6b5739] text-base font-hoangngan4 cursor-pointer"
										>
											{t('rsvp.attendNo')}
										</Label>
									</div>
								</RadioGroup>
							</div>

							{/* Message Textarea */}
							<div className="space-y-2">
								<label className="block text-[#6b5739] text-base font-hoangngan4">
									{t('rsvp.messageLabel')}
								</label>
								<textarea
									value={formData.message}
									onChange={(e) =>
										setFormData({
											...formData,
											message: e.target.value,
										})
									}
									placeholder={t('rsvp.messagePlaceholder')}
									disabled={submissionState === 'loading'}
									rows={4}
									className="w-full bg-[#eee5d5] border-0 rounded-xl px-4 py-3 mb-0 focus:outline-none text-[#6b5739] placeholder-[#6b5739] placeholder-italic font-hoangngan3 disabled:opacity-50 resize-none"
									maxLength={500}
								/>
								<p className="text-gray-500 text-xs md:text-sm italic">
									{formData.message.length}/500{' '}
									{t('rsvp.characters')}
								</p>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={submissionState === 'loading'}
								className="w-auto bg-[#6b5739] text-white px-8 py-3 rounded font-semibold transition-colors uppercase tracking-wider font-hoangngan4 disabled:opacity-50 flex items-center gap-2 justify-center cursor-pointer m-auto md:m-0"
							>
								{submissionState === 'loading' ? (
									<>
										<Loader2 className="w-5 h-5 animate-spin" />
										{t('rsvp.submitButton')}
									</>
								) : (
									t('rsvp.submitButton')
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
