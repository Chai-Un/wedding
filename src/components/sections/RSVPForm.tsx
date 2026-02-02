import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { RSVP_WEBHOOK_URL } from '@/constants/config';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { TypingText } from '@/components/ui/typing-text';

type SubmissionState = 'idle' | 'loading';

interface FormData {
  guestName: string;
  attending: 'yes' | 'no' | '';
  message: string;
  website: string; // Honeypot field
}

export default function RSVPForm() {
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
      return 'Please enter your name';
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
    <section id="rsvp" className="bg-[#2a2722] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <TypingText
            text="RSVP"
            as="h2"
            className="text-4xl md:text-5xl font-serif text-[#d4c5ad] mb-4 italic"
            speed={100}
            showCursor={false}
          />
          <p className="text-[#d4c5ad]/80 text-lg">
            Please let us know if you'll be joining us on our special day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Guest Name Input */}
            <div>
              <label
                htmlFor="guestName"
                className="block text-[#d4c5ad] font-serif text-lg mb-2"
              >
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="guestName"
                value={formData.guestName}
                onChange={(e) =>
                  setFormData({ ...formData, guestName: e.target.value })
                }
                disabled={submissionState === 'loading'}
                className="w-full px-4 py-3 bg-[#3a3632] border border-[#d4c5ad]/30 rounded text-[#d4c5ad] placeholder-[#d4c5ad]/40 focus:outline-none focus:border-[#d4c5ad] transition-colors disabled:opacity-50"
                placeholder="Enter your full name"
                maxLength={100}
              />
            </div>

            {/* Attendance Radio Buttons */}
            <div>
              <label className="block text-[#d4c5ad] font-serif text-lg mb-3">
                Will you be attending? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attending: e.target.value as 'yes' | 'no',
                      })
                    }
                    disabled={submissionState === 'loading'}
                    className="w-5 h-5 text-[#d4c5ad] bg-[#3a3632] border-[#d4c5ad]/30 focus:ring-[#d4c5ad] focus:ring-2 disabled:opacity-50"
                  />
                  <span className="text-[#d4c5ad] text-lg">
                    Joyfully Accept
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attending: e.target.value as 'yes' | 'no',
                      })
                    }
                    disabled={submissionState === 'loading'}
                    className="w-5 h-5 text-[#d4c5ad] bg-[#3a3632] border-[#d4c5ad]/30 focus:ring-[#d4c5ad] focus:ring-2 disabled:opacity-50"
                  />
                  <span className="text-[#d4c5ad] text-lg">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-[#d4c5ad] font-serif text-lg mb-2"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                disabled={submissionState === 'loading'}
                rows={4}
                className="w-full px-4 py-3 bg-[#3a3632] border border-[#d4c5ad]/30 rounded text-[#d4c5ad] placeholder-[#d4c5ad]/40 focus:outline-none focus:border-[#d4c5ad] transition-colors resize-none disabled:opacity-50"
                placeholder="Share your warm wishes or any special notes..."
                maxLength={500}
              />
              <p className="text-[#d4c5ad]/60 text-sm mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submissionState === 'loading'}
              className="w-full bg-[#d4c5ad] text-[#2a2722] hover:bg-[#e8dcc8] font-serif text-lg py-6 disabled:opacity-50"
            >
              {submissionState === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit RSVP'
              )}
            </Button>
          </form>
      </div>
    </section>
  );
}
