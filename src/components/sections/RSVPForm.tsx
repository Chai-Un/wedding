import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { RSVP_WEBHOOK_URL } from '@/constants/config';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

type SubmissionState = 'idle' | 'loading';
interface FormData {
	guestName: string;
	attending: 'yes' | 'no' | '';
	guestCount: string | number;
	message: string;
	website: string; // Honeypot field
}

const RSVPForm = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState<FormData>({
		guestName: '',
		attending: 'yes',
		guestCount: '',
		message: '',
		website: '', // Honeypot field - should remain empty
	});

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
		if (formData.attending === 'yes' && !formData.guestCount) {
			return 'Please select number of guests';
		}
		if (formData.message.length > 500) {
			return 'Message must be less than 500 characters';
		}
		return null;
	};

	const [submissionState, setSubmissionState] =
		useState<SubmissionState>('idle');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationError = validateForm();
		if (validationError) {
			toast.error(validationError);
			return;
		}

		setSubmissionState('loading');

		try {
			// Convert guestCount to number if it's a string
			const submitData = {
				...formData,
				guestCount: formData.guestCount
					? Number(formData.guestCount)
					: '',
			};

			// Use no-cors mode to bypass CORS issues with Google Apps Script
			await fetch(RSVP_WEBHOOK_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submitData),
			});

			// With no-cors mode, we can't read the response
			// So we assume success if no network error occurred
			setSubmissionState('idle');
			setFormData({
				guestName: '',
				attending: 'yes',
				guestCount: '',
				message: '',
				website: '',
			});
			toast.success(
				'Cảm ơn bạn đã gửi xác nhận tham dự! Chúng mình rất mong được gặp bạn tại ngày vui của chúng mình!',
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
		<div>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Title */}
				<div className="text-3xl md:text-4xl font-hoangngan7 text-[#6b5739] mb-4 text-center">
					{t('rsvp.title')}
				</div>

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
						className="w-full border-b-[1.5px] border-[#412d1d] bg-transparent py-2 focus:outline-none focus:border-[#412d1d] text-[#6b5739] font-hoangngan4 disabled:opacity-50 placeholder-[#6b5739]"
						required
						maxLength={100}
					/>
				</div>

				{/* Radio Buttons */}
				<div className="space-y-3">
					<RadioGroup
						value={formData.attending}
						onValueChange={(value) => {
							const attending = value as 'yes' | 'no';
							setFormData({
								...formData,
								attending,
								guestCount:
									attending === 'no'
										? ''
										: formData.guestCount,
							});
						}}
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

				{/* Guest Count Dropdown */}
				<div className="space-y-2 text-[#6b5739] text-hoangngan4">
					{/* <label className="block text-base font-hoangngan4">
						{t('rsvp.guestCountLabel')}
					</label> */}
					<select
						value={formData.guestCount}
						onChange={(e) =>
							setFormData({
								...formData,
								guestCount: e.target.value
									? Number(e.target.value)
									: '',
							})
						}
						disabled={
							formData.attending !== 'yes' ||
							submissionState === 'loading'
						}
						className="w-full border-b-[1.5px] border-[#412d1d] bg-transparent py-2 focus:outline-none focus:border-[#412d1d] font-hoangngan4 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<option value="">Số lượng khách tham dự</option>
						<option value="1">1 khách</option>
						<option value="2">2 khách</option>
						<option value="3">3 khách</option>
					</select>
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
					<p className="text-[#6b5739] text-sm italic font-hoangngan4">
						{formData.message.length}/500 {t('rsvp.characters')}
					</p>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={submissionState === 'loading'}
					className="w-auto bg-[#6b5739] text-white px-8 py-3 rounded-full font-semibold transition-colors uppercase tracking-wider font-hoangngan4 disabled:opacity-50 flex items-center gap-2 justify-center cursor-pointer m-auto md:m-0 w-full"
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

				{/* Description */}
				<p className="text-xs md:text-base leading-relaxed font-hoangngan4 text-[#6b5739] md:text-left mt-4">
					{t('rsvp.description')}
				</p>
			</form>
		</div>
	);
};

export default RSVPForm;
