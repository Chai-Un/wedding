import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import envelopeClosed from '@/assets/images/letter/envelope.png';
import envelopeOpen from '@/assets/images/letter/envelope_open.png';
import stampImg from '@/assets/images/letter/stamp.png';
import eiffelImg from '@/assets/images/letter/eiffel.png';

interface InvitationProps {
	onOpen: () => void;
}

/*
 * Animation timeline (stage-driven):
 *
 *   0ms    → click: 'lift'    — envelope scales up, wax seal spins away
 *   500ms  → 'open'           — closed→open envelope crossfade
 *   1100ms → 'letter'         — letter card slides up from behind
 *   2200ms → 'dismiss'        — entire overlay fades out
 *   3000ms → onOpen()         — overlay removed from DOM
 */
type AnimStage = 'idle' | 'lift' | 'open' | 'letter' | 'dismiss';

export default function Invitation({ onOpen }: InvitationProps) {
	const { t } = useTranslation();
	const [stage, setStage] = useState<AnimStage>('idle');

	const handleEnvelopeClick = useCallback(() => {
		if (stage !== 'idle') return;
		setStage('lift');
	}, [stage]);

	// Drive the timeline through stages
	useEffect(() => {
		if (stage === 'idle') return;

		const delays: Partial<Record<AnimStage, number>> = {
			lift: 500,
			open: 600,
			letter: 1100,
		};
		const next: Partial<Record<AnimStage, AnimStage>> = {
			lift: 'open',
			open: 'letter',
			letter: 'dismiss',
		};

		if (stage === 'dismiss') {
			const id = setTimeout(() => onOpen(), 800);
			return () => clearTimeout(id);
		}

		const nextStage = next[stage];
		const delay = delays[stage];
		if (nextStage && delay) {
			const id = setTimeout(() => setStage(nextStage), delay);
			return () => clearTimeout(id);
		}
	}, [stage, onOpen]);

	const isLifted = stage !== 'idle';
	const isOpen = stage === 'open' || stage === 'letter' || stage === 'dismiss';
	const isLetterOut = stage === 'letter' || stage === 'dismiss';
	const isDismissing = stage === 'dismiss';

	return (
		<section
			className={`fixed inset-0 z-50 flex flex-col bg-[#fbf7ee] overflow-y-auto ${
				isDismissing ? 'opacity-0 pointer-events-none' : 'opacity-100'
			}`}
			style={{ transition: 'opacity 800ms ease-out' }}
		>
			<div className="flex flex-col items-center min-h-full">
				{/* ──── Letter Content ──── */}
				<div className="w-full max-w-xl mx-auto px-8 pt-12 md:pt-16 lg:pt-20 pb-4 text-center">
					{/* Decorative divider */}
					<div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
						<span className="block h-px w-12 bg-[#6b5739]/25" />
						<span className="block w-1.5 h-1.5 rotate-45 border border-[#6b5739]/30" />
						<span className="block h-px w-12 bg-[#6b5739]/25" />
					</div>

					<h1 className="text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase font-hoangngan7 text-[#412d1d] mb-8 md:mb-10">
						{t('invitation.title')}
					</h1>

					<div className="text-[#2d2b25]/70 leading-[1.9] text-sm md:text-base font-hoangngan4 whitespace-pre-line max-w-md mx-auto mb-8 md:mb-10">
						{t('invitation.message')}
					</div>

					<p className="text-[#2d2b25]/60 text-sm md:text-base font-hoangngan4 italic mb-1">
						{t('invitation.withLove')}
					</p>
					<p className="font-hoangngan8 text-3xl md:text-4xl lg:text-5xl text-[#412d1d]">
						{t('invitation.names')}
					</p>
				</div>

				{/* ──── Envelope Section ──── */}
				<div className="w-full max-w-md mx-auto px-6 pt-6 md:pt-10 pb-16 md:pb-20 flex flex-col items-center">
					{/* Outer wrapper — applies the lift transform to the whole group */}
					<div
						className="relative w-full cursor-pointer"
						onClick={handleEnvelopeClick}
						role="button"
						tabIndex={0}
						aria-label={t('invitation.openEnvelope')}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ')
								handleEnvelopeClick();
						}}
						style={{
							transform: isLifted
								? 'translateY(-12px) scale(1.02)'
								: 'translateY(0) scale(1)',
							transition:
								'transform 500ms cubic-bezier(.22,1,.36,1)',
						}}
					>
						{/* Letter card — behind envelope, slides up when stage = 'letter' */}
						<div
							className="absolute left-1/2 w-[72%] bg-white rounded-sm overflow-hidden"
							style={{
								zIndex: 0,
								top: '5%',
								transform: `translateX(-50%) translateY(${isLetterOut ? '-70%' : '0%'})`,
								opacity: isLetterOut ? 1 : 0,
								boxShadow: isLetterOut
									? '0 12px 40px rgba(0,0,0,0.12)'
									: 'none',
								transition:
									'transform 1000ms cubic-bezier(.22,1,.36,1), opacity 400ms ease',
							}}
						>
							<div className="relative px-6 py-8 md:px-8 md:py-10 text-center bg-linear-to-b from-white to-[#faf6ee]">
								<div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-[#c5a96a]/30 to-transparent" />
								<p className="font-hoangngan8 text-xl md:text-2xl lg:text-3xl text-[#412d1d] mb-3 leading-snug">
									{t('invitation.welcome')}
								</p>
								<p className="font-hoangngan7 text-xs md:text-sm tracking-[0.25em] text-[#6b5739]/60">
									{t('invitation.date')}
								</p>
							</div>
						</div>

						{/* Open envelope — always rendered underneath, revealed by crossfade */}
						<img
							src={envelopeOpen}
							alt=""
							className="relative w-full h-auto block"
							style={{
								zIndex: 1,
								opacity: isOpen ? 1 : 0,
								transition: 'opacity 600ms ease-in-out',
							}}
							draggable={false}
							aria-hidden="true"
						/>

						{/* Closed envelope — sits on top, fades away at 'open' stage */}
						<img
							src={envelopeClosed}
							alt="Envelope"
							className="absolute inset-0 w-full h-auto block"
							style={{
								zIndex: 2,
								opacity: isOpen ? 0 : 1,
								transition: 'opacity 600ms ease-in-out',
							}}
							draggable={false}
						/>

						{/* Wax seal — spins away & fades at 'lift' stage */}
						<div
							className="absolute left-1/2 top-[38%]"
							style={{
								zIndex: 3,
								transform: `translate(-50%, -50%) scale(${isLifted ? 0 : 1}) rotate(${isLifted ? '20deg' : '0deg'})`,
								opacity: isLifted ? 0 : 1,
								transition:
									'transform 400ms cubic-bezier(.4,0,.2,1), opacity 300ms ease-out',
							}}
						>
							<div className="w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 rounded-full bg-linear-to-br from-[#c9bc82] via-[#b5a76a] to-[#c5b878] shadow-[0_3px_12px_rgba(0,0,0,0.15)] flex items-center justify-center ring-2 ring-[#d4c890]/30">
								<svg
									viewBox="0 0 50 50"
									className="w-8 h-8 md:w-11 md:h-11 lg:w-14 lg:h-14"
								>
									<circle cx="20" cy="20" r="4" fill="none" stroke="#e8dcc0" strokeWidth="0.8" />
									<circle cx="17" cy="17" r="3" fill="none" stroke="#e8dcc0" strokeWidth="0.6" />
									<circle cx="23" cy="17" r="3" fill="none" stroke="#e8dcc0" strokeWidth="0.6" />
									<circle cx="17" cy="23" r="3" fill="none" stroke="#e8dcc0" strokeWidth="0.6" />
									<circle cx="23" cy="23" r="3" fill="none" stroke="#e8dcc0" strokeWidth="0.6" />
									<circle cx="20" cy="20" r="1.5" fill="#e8dcc0" opacity="0.6" />
									<circle cx="32" cy="28" r="3.5" fill="none" stroke="#e8dcc0" strokeWidth="0.7" />
									<circle cx="29.5" cy="25.5" r="2.5" fill="none" stroke="#e8dcc0" strokeWidth="0.5" />
									<circle cx="34.5" cy="25.5" r="2.5" fill="none" stroke="#e8dcc0" strokeWidth="0.5" />
									<circle cx="29.5" cy="30.5" r="2.5" fill="none" stroke="#e8dcc0" strokeWidth="0.5" />
									<circle cx="34.5" cy="30.5" r="2.5" fill="none" stroke="#e8dcc0" strokeWidth="0.5" />
									<circle cx="32" cy="28" r="1.2" fill="#e8dcc0" opacity="0.6" />
									<path d="M20 24 Q18 32, 22 38" fill="none" stroke="#e8dcc0" strokeWidth="0.7" />
									<path d="M32 32 Q30 36, 28 40" fill="none" stroke="#e8dcc0" strokeWidth="0.6" />
									<ellipse cx="16" cy="30" rx="3" ry="1.5" fill="#e8dcc0" opacity="0.3" transform="rotate(-40 16 30)" />
									<ellipse cx="26" cy="34" rx="2.5" ry="1.2" fill="#e8dcc0" opacity="0.3" transform="rotate(30 26 34)" />
								</svg>
							</div>
						</div>

						{/* Stamps — fade out at 'open' stage */}
						<div
							className="absolute bottom-[8%] right-[5%] flex items-end gap-1.5 md:gap-2"
							style={{
								zIndex: 3,
								opacity: isOpen ? 0 : 0.75,
								transition: 'opacity 400ms ease-out',
							}}
						>
							<img
								src={eiffelImg}
								alt=""
								className="w-7 h-9 md:w-9 md:h-12 lg:w-11 lg:h-14 object-contain"
								draggable={false}
								aria-hidden="true"
							/>
							<img
								src={stampImg}
								alt=""
								className="w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 object-contain"
								draggable={false}
								aria-hidden="true"
							/>
						</div>
					</div>

					{/* Call-to-action */}
					<p
						className={`mt-5 md:mt-7 text-[10px] md:text-xs tracking-[0.2em] uppercase font-hoangngan7 text-[#6b5739]/50 transition-opacity duration-300 ${
							isLifted ? 'opacity-0' : 'animate-pulse'
						}`}
					>
						{t('invitation.openEnvelope')}
					</p>
				</div>
			</div>

			{/* ──── Decorative flowers — fixed bottom-left ──── */}
			<div className="fixed bottom-0 left-0 pointer-events-none z-40">
				<svg
					viewBox="0 0 180 260"
					className="w-28 md:w-40 lg:w-48 opacity-40 md:opacity-50"
				>
					<path d="M70 260 Q78 210, 62 170 Q55 145, 72 115" fill="none" stroke="#7a9e6c" strokeWidth="1.8" opacity="0.7" />
					<path d="M70 260 Q64 220, 82 190 Q92 165, 110 145" fill="none" stroke="#7a9e6c" strokeWidth="1.8" opacity="0.7" />
					<path d="M70 260 Q58 240, 45 230" fill="none" stroke="#7a9e6c" strokeWidth="1.5" opacity="0.6" />
					<ellipse cx="48" cy="195" rx="16" ry="7" fill="#7a9e6c" opacity="0.35" transform="rotate(-35 48 195)" />
					<ellipse cx="96" cy="168" rx="16" ry="7" fill="#7a9e6c" opacity="0.35" transform="rotate(25 96 168)" />
					<ellipse cx="38" cy="232" rx="12" ry="5" fill="#7a9e6c" opacity="0.3" transform="rotate(-20 38 232)" />
					<g>
						<circle cx="68" cy="108" r="11" fill="#e8a0b0" opacity="0.65" />
						<circle cx="58" cy="100" r="9" fill="#f0b8c4" opacity="0.55" />
						<circle cx="78" cy="100" r="9" fill="#f0b8c4" opacity="0.55" />
						<circle cx="62" cy="93" r="8" fill="#f5c8d0" opacity="0.45" />
						<circle cx="74" cy="93" r="8" fill="#f5c8d0" opacity="0.45" />
						<circle cx="68" cy="103" r="4.5" fill="#d48898" opacity="0.7" />
					</g>
					<g>
						<circle cx="112" cy="138" r="9" fill="#f0c8a0" opacity="0.55" />
						<circle cx="104" cy="132" r="7.5" fill="#f5d4b0" opacity="0.45" />
						<circle cx="120" cy="132" r="7.5" fill="#f5d4b0" opacity="0.45" />
						<circle cx="112" cy="126" r="6.5" fill="#f8dcc0" opacity="0.35" />
						<circle cx="112" cy="135" r="3.5" fill="#e0b088" opacity="0.65" />
					</g>
					<circle cx="50" cy="150" r="4.5" fill="#f0b8c4" opacity="0.35" />
					<circle cx="88" cy="125" r="3.5" fill="#f5c8d0" opacity="0.3" />
					<circle cx="38" cy="218" r="5" fill="#f0c8a0" opacity="0.3" />
				</svg>
			</div>
		</section>
	);
}

