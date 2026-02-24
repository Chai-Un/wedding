import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import envelopeClosed from '@/assets/images/envelope/envelope.png';
import waxSealImg from '@/assets/images/envelope/wax_seal.png';
import flowerImg from '@/assets/images/envelope/flower.png';
import eiffelImg from '@/assets/images/envelope/eiffel.png';
import stampOne from '@/assets/images/envelope/stamp_one.png';
import stampTwo from '@/assets/images/envelope/stamp_two.png';
import stampThree from '@/assets/images/envelope/stamp_three.png';

interface InvitationProps {
	onOpen: () => void;
}

/*
 * Animation timeline (stage-driven):
 *
 *   idle    — envelope breathes, wax seal visible, stamps & text shown
 *   lift    — click: wax seal dissolves + spin, gold particles burst
 *   dismiss — blur + fade out, onOpen() fires (500ms after lift)
 */
type AnimStage = 'idle' | 'lift' | 'dismiss';

// Pre-computed particle vectors — module-level so they're stable across renders
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
	const angle = (i / 20) * Math.PI * 2;
	const dist = 38 + (i % 4) * 18; // 38 | 56 | 74 | 92 px
	return {
		id: i,
		tx: Math.cos(angle) * dist,
		ty: Math.sin(angle) * dist,
		size: 3 + (i % 3), // 3 | 4 | 5 px
		delay: Math.floor(i / 4) * 45, // 0 | 45 | 90 | 135 | 180 ms
		gold: i % 2 === 0 ? '#f2e295' : '#d4b96a',
	};
});

export default function Invitation({ onOpen }: InvitationProps) {
	const { t } = useTranslation();
	const [stage, setStage] = useState<AnimStage>('idle');

	const handleClick = useCallback(() => {
		if (stage !== 'idle') return;
		setStage('lift');
	}, [stage]);

	// Stage-driven timeline
	useEffect(() => {
		if (stage === 'idle') return;

		if (stage === 'dismiss') {
			const id = setTimeout(() => onOpen(), 500);
			return () => clearTimeout(id);
		}

		// lift → dismiss after particle burst
		if (stage === 'lift') {
			const id = setTimeout(() => setStage('dismiss'), 600);
			return () => clearTimeout(id);
		}
	}, [stage, onOpen]);

	const isLifted = stage !== 'idle';
	const isDismissing = stage === 'dismiss';

	return (
		<section
			className="min-h-screen relative flex items-center justify-center overflow-hidden"
			style={{
				background: '#fbf7ee',
				opacity: isDismissing ? 0 : 1,
				filter: isDismissing ? 'blur(6px)' : 'blur(0px)',
				pointerEvents: isDismissing ? 'none' : 'auto',
				transition: 'opacity 500ms ease-out, filter 500ms ease-out',
			}}
		>
			{/* ── CSS Keyframe definitions ── */}
			<style>{`
				@keyframes envelopeBreathe {
					0%, 100% { transform: translateY(0px)  scale(1);     }
					50%       { transform: translateY(-7px) scale(1.008); }
				}
				@keyframes particleBurst {
					0%   { transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1.4); opacity: 0.92; }
					100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);       opacity: 0;    }
				}
				@keyframes softPulse {
					0%, 100% { opacity: 0.55; }
					50%       { opacity: 0.2;  }
				}
				@keyframes ambientGlow {
					0%, 100% { opacity: 0.18; }
					50%       { opacity: 0.28; }
				}
			`}</style>



			{/* ── Decorative flower — fixed bottom-left throughout all stages ── */}
			<img
				src={flowerImg}
				alt=""
				draggable={false}
				aria-hidden="true"
				className="fixed bottom-0 left-0 pointer-events-none z-20 select-none"
				style={{ width: 'clamp(120px, 18vw, 280px)' }}
			/>

			{/* ── Envelope stage ── */}
			<div className="w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
				{/*
				 * Aspect-ratio wrapper (1599 × 1036 ≈ 1.543)
				 * Both envelope images sit absolute inside; the wrapper sets the height.
				 */}
				<div
					className="relative w-full"
					style={{
						aspectRatio: '1599 / 1036',
						cursor: stage === 'idle' ? 'pointer' : 'default',
						animation:
							stage === 'idle'
								? 'envelopeBreathe 4s ease-in-out infinite'
								: 'none',
					}}
					onClick={handleClick}
					role="button"
					tabIndex={stage === 'idle' ? 0 : -1}
					aria-label={t('invitation.openEnvelope')}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') handleClick();
					}}
				>


					{/* ─ Closed envelope — overlaid; fades out on 'open' ─ */}
					<img
						src={envelopeClosed}
						alt="Wedding invitation envelope"
						draggable={false}
						className="absolute inset-0 w-full h-full object-contain"
						style={{
							opacity: 1,
							transform: isLifted
								? 'translateY(-10px) scale(1.015)'
								: 'translateY(0) scale(1)',
							transition:
								'opacity 700ms ease, transform 600ms cubic-bezier(.22,1,.36,1)',
							zIndex: 3,
						}}
					/>

					{/* ─ Title — upper-left, ~10% top / 18% left ─ */}
					<p
						className="absolute pointer-events-none font-hoangngan8 leading-tight text-[#5a3e28]"
						style={{
							top: '10%',
							left: '18%',
							right: '8%',
							fontSize: 'clamp(1rem, 3.4vw, 3rem)',
							zIndex: 4,
							opacity: isLifted ? 0 : 1,
							transition: 'opacity 350ms ease',
						}}
					>
						{t('invitation.welcome')}
					</p>

					{/* ─ Date — centered below title, ~28% top ─ */}
					<p
						className="absolute pointer-events-none font-hoangngan7 tracking-[0.26em] text-center text-[#6b5739]/75"
						style={{
							top: '28%',
							left: '18%',
							right: '18%',
							fontSize: 'clamp(0.58rem, 1.3vw, 1.05rem)',
							zIndex: 4,
							opacity: isLifted ? 0 : 1,
							transition: 'opacity 350ms ease',
						}}
					>
						{t('invitation.date')}
					</p>

					{/* ─ Wax seal — ~50% x / ~57% y, spins and dissolves on click ─ */}
					<div
						className="absolute pointer-events-none"
						style={{
							top: '57%',
							left: '50%',
							zIndex: 4,
							transform: `translate(-50%, -50%) scale(${isLifted ? 0 : 1}) rotate(${isLifted ? '28deg' : '0deg'})`,
							opacity: isLifted ? 0 : 1,
							transition:
								'transform 480ms cubic-bezier(.4,0,.2,1), opacity 380ms ease-out',
						}}
					>
						<img
							src={waxSealImg}
							alt=""
							draggable={false}
							aria-hidden="true"
							style={{ width: 'clamp(44px, 5.8vw, 88px)' }}
							className="object-contain drop-shadow-md"
						/>
					</div>

					{/* ─ Note / CTA text — lower-center-left, pulses when idle ─ */}
					<p
						className="absolute pointer-events-none font-hoangngan7 tracking-[0.22em] uppercase text-[#6b5739]"
						style={{
							top: '76%',
							left: '34%',
							fontSize: 'clamp(0.48rem, 0.92vw, 0.78rem)',
							zIndex: 4,
							opacity: isLifted ? 0 : undefined,
							animation:
								stage === 'idle'
									? 'softPulse 2.6s ease-in-out infinite'
									: 'none',
							transition: 'opacity 300ms ease',
						}}
					>
						{t('invitation.openEnvelope')}
					</p>

					{/* ─ 4 Stamps — bottom-right corner ─ */}
					<div
						className="absolute flex items-end pointer-events-none"
						style={{
							bottom: '5%',
							right: '3%',
							gap: 'clamp(2px, 0.35vw, 5px)',
							zIndex: 4,
							opacity: isLifted ? 0 : 1,
							transition: 'opacity 380ms ease-out',
						}}
					>
						<img
							src={eiffelImg}
							alt=""
							draggable={false}
							aria-hidden="true"
							style={{
								width: 'clamp(20px, 4.2vw, 56px)',
								height: 'clamp(26px, 5.4vw, 72px)',
								objectFit: 'contain',
							}}
						/>
						<img
							src={stampOne}
							alt=""
							draggable={false}
							aria-hidden="true"
							style={{
								width: 'clamp(22px, 4.4vw, 60px)',
								height: 'clamp(22px, 4.4vw, 60px)',
								objectFit: 'contain',
							}}
						/>
						<img
							src={stampTwo}
							alt=""
							draggable={false}
							aria-hidden="true"
							style={{
								width: 'clamp(18px, 3.7vw, 50px)',
								height: 'clamp(24px, 4.8vw, 64px)',
								objectFit: 'contain',
							}}
						/>
						<img
							src={stampThree}
							alt=""
							draggable={false}
							aria-hidden="true"
							style={{
								width: 'clamp(20px, 4vw, 54px)',
								height: 'clamp(20px, 4vw, 54px)',
								objectFit: 'contain',
							}}
						/>
					</div>



					{/* ─ Golden wax seal particle burst — mounts on lift, animates once ─ */}
					{isLifted &&
						PARTICLES.map((p) => (
							<div
								key={p.id}
								className="absolute rounded-full pointer-events-none"
								style={
									{
										width: p.size,
										height: p.size,
										top: '57%',
										left: '50%',
										zIndex: 5,
										background: `radial-gradient(circle at 35% 30%, ${p.gold}, #8a6a10)`,
										'--tx': `${p.tx}px`,
										'--ty': `${p.ty}px`,
										animation: `particleBurst 720ms cubic-bezier(.22,1,.36,1) ${p.delay}ms both`,
									} as React.CSSProperties
								}
							/>
						))}
				</div>
			</div>
		</section>
	);
}
