import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RSVP_WEBHOOK_URL } from '@/constants/config';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

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
      setFormData({ guestName: '', attending: '', message: '', website: '' });
      toast.success('Thank you! Your RSVP has been received. We look forward to celebrating with you!', {
        duration: 5000,
      });
    } catch (error) {
      setSubmissionState('idle');
      toast.error('Network error. Please check your connection and try again.');
      console.error('RSVP submission error:', error);
    }
  };

  return (
    <section id="rsvp" className="bg-[#e8dcc8] px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            autoComplete="off"
            tabIndex={-1}
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
            aria-hidden="true"
          />

          {/* Title */}
          <h2 className="text-[66px] font-custom-serif text-[rgb(163,104,55)] mb-4">
            {t('rsvp.title')}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed font-montserrat">
            {t('rsvp.description')}
          </p>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-lg font-montserrat">
              {t('rsvp.nameLabel')}
            </label>
            <input
              type="text"
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              placeholder={t('rsvp.namePlaceholder')}
              disabled={submissionState === 'loading'}
              className="w-full border-b-2 border-gray-400 bg-transparent py-2 focus:outline-none focus:border-gray-600 text-gray-700 font-montserrat disabled:opacity-50"
              required
              maxLength={100}
            />
          </div>

          {/* Radio Buttons */}
          <div className="space-y-2">
            <RadioGroup
              value={formData.attending}
              onValueChange={(value) => setFormData({ ...formData, attending: value as 'yes' | 'no' })}
              disabled={submissionState === 'loading'}
              required
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem value="yes" id="yes" className="border-gray-600 text-gray-600" />
                <Label htmlFor="yes" className="text-gray-700 text-lg font-montserrat cursor-pointer">
                  {t('rsvp.attendYes')}
                </Label>
              </div>
              <div className="flex items-center gap-4">
                <RadioGroupItem value="no" id="no" className="border-gray-600 text-gray-600" />
                <Label htmlFor="no" className="text-gray-700 text-lg font-montserrat cursor-pointer">
                  {t('rsvp.attendNo')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-lg font-montserrat">
              {t('rsvp.messageLabel')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t('rsvp.messagePlaceholder')}
              disabled={submissionState === 'loading'}
              rows={6}
              className="w-full bg-[#e8dcc8] border-2 border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gray-400 text-gray-700 placeholder-gray-400 placeholder-italic font-montserrat disabled:opacity-50 resize-none"
              maxLength={500}
            />
            <p className="text-gray-600 text-sm">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submissionState === 'loading'}
            className="bg-[#6b5739] text-white px-8 py-3 rounded font-semibold hover:bg-[#5a4829] transition-colors uppercase tracking-wider font-montserrat disabled:opacity-50 flex items-center gap-2 justify-center"
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
    </section>
  );
}
