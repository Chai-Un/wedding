import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ResponsiveImage from '@/components/ResponsiveImage';
import videoBgWebm from '@/assets/videos/demo.webm';
import videoBgMp4 from '@/assets/videos/demo.mp4';
import logoEnvelope from '@/assets/images-optimized/logo_envelope.jpg';

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
			className="relative max-md:h-dvh md:min-h-screen flex flex-col max-md:overflow-hidden"
			style={{
				opacity: isDismissing ? 0 : 1,
				pointerEvents: isDismissing ? 'none' : 'auto',
				transition: 'opacity 500ms ease-out, filter 500ms ease-out',
			}}
		>
			{/* Background video — fixed on desktop so it covers viewport while scrolling */}
			<video
				className="absolute max-md:inset-0 max-md:w-full max-md:h-full md:fixed md:inset-0 md:w-screen md:h-screen object-cover -z-10"
				autoPlay
				loop
				muted
				playsInline
			>
				<source src={videoBgWebm} type="video/webm" />
				<source src={videoBgMp4} type="video/mp4" />
			</video>
			{/* Overlay — same fixed behaviour on desktop */}
			<div className="absolute max-md:inset-0 md:fixed md:inset-0 md:w-screen md:h-screen bg-white/60 -z-10" />

			{/* Content layer */}
			<div className="relative z-10 flex flex-col items-center w-full flex-1 max-md:min-h-0">
				{/* Spacer above logo — vh-based on mobile so it scales with screen height */}
				<div className="h-[5vh] md:h-10 lg:h-14 shrink-0" />

				<div className='w-28 h-28 md:w-36 md:h-36 lg:w-45 lg:h-45 shrink-0'>
					<img src={logoEnvelope} alt="" className='w-full h-full' loading="eager" />
				</div>

				{/* Equal spacer between logo and title */}
				<div className="h-[4vh] md:h-10 lg:h-14 shrink-0" />

			{/* ── Letter text above the envelope ── */}
			<div className="w-full max-w-5xl mx-auto px-6 md:px-12 text-center mb-3 md:mb-8 shrink-0">
				{/* Title */}
				<div className="font-hoangngan7 tracking-[0.2em] uppercase text-[#3d2b1a] text-sm md:text-xl lg:text-2xl mb-3 md:mb-10">
					{t('invitation.title')}
				</div>

				{/* Message body */}
				<div className="font-hoangngan4 text-[#4a3520] leading-relaxed whitespace-pre-line text-xs md:text-base mb-3 md:mb-7 text-center">
					{t('invitation.message')}
				</div>

				{/* With love */}
				<div className="font-hoangngan4 text-[#6b5739] text-xs md:text-base mb-0.5 md:mb-1">
					{t('invitation.withLove')}
				</div>

				{/* Names signature */}
				<p className="font-hoangngan22 text-[#3d2b1a] leading-none text-2xl md:text-[60px] pt-2 md:pt-4">
					{t('invitation.names')}
				</p>
			</div>

			{/* ── Envelope stage ── */}
			<div className="w-full max-w-7xl mx-auto px-2 md:px-8 lg:px-12 min-h-0 shrink pb-5">
				{/*
				 * Aspect-ratio wrapper (1599 × 1036 ≈ 1.543)
				 * Both envelope images sit absolute inside; the wrapper sets the height.
				 * On mobile we cap the height so everything fits in one screen.
				 */}
				<div
					className="relative w-full max-h-[42vh] md:max-h-none"
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
					<div
						className="absolute inset-0 w-full h-full"
						style={{
							opacity: 1,
							transform: isLifted
								? 'translateY(-10px) scale(1.015)'
								: 'translateY(0) scale(1)',
							transition:
								'opacity 700ms ease, transform 600ms cubic-bezier(.22,1,.36,1)',
							zIndex: 3,
						}}
					>
						<ResponsiveImage
							src="envelope/envelope.png"
							alt="Wedding invitation envelope"
							alpha
							draggable={false}
							className="w-full h-full object-contain"
							sizes="(max-width: 768px) 100vw, 80vw"
							loading="eager"
						/>
					</div>

					{/* ── Decorative flowers — grouped, anchored to envelope bottom-left ── */}
					<div
						className="absolute pointer-events-none select-none"
						style={{
							bottom: '5%',
							left: 0,
							zIndex: 20,
							width: '18%',
						}}
					>
						{/* Large bouquet — rotated, mirrored */}
						<ResponsiveImage
							src="envelope/flower.png"
							alt=""
							alpha
							draggable={false}
							aria-hidden={true}
							className="absolute bottom-2.5 left-[125%] md:bottom-0 md:left-[145%]"
							sizes="60vw"
							style={{
								rotate: '-27deg',
								transform: 'scale(-1, 1)',
								transformOrigin: 'bottom left',
							}}
						/>
						{/* Single flower — sits to the right of the bouquet */}
						<ResponsiveImage
							src="envelope/single_flower.png"
							alt=""
							alpha
							draggable={false}
							aria-hidden={true}
							className="absolute"
							sizes="8vw"
							style={{
								width: '44%',
								bottom: '0%',
								left: '70%',
							}}
						/>
					</div>

					{/* ─ Title — upper-left, ~10% top / 18% left ─ */}
					<div
						className="absolute pointer-events-none font-hoangngan8 leading-tight text-[#5a3e28] text-center"
						style={{
							top: '20%',
							left: '10%',
							right: '8%',
							fontSize: 'clamp(1rem, 3.4vw, 3rem)',
							zIndex: 4,
							opacity: isLifted ? 0 : 1,
							transition: 'opacity 350ms ease',
						}}
					>
						{t('invitation.welcome')}
					</div>

					{/* ─ Date — centered below title, ~28% top ─ */}
					<div
						className="absolute pointer-events-none font-hoangngan4 tracking-[0.26em] text-center text-[#6b5739]/80"
						style={{
							top: '28%',
							left: '18%',
							right: '18%',
							fontSize: 'clamp(0.7rem, 2vw, 1.5rem)',
							zIndex: 4,
							opacity: isLifted ? 0 : 1,
							transition: 'opacity 350ms ease',
						}}
					>
						{t('invitation.date')}
					</div>

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
						<ResponsiveImage
							src="envelope/wax_seal.png"
							alt=""
							alpha
							draggable={false}
							aria-hidden={true}
							sizes="6vw"
							style={{ width: 'clamp(44px, 6vw, 100px)' }}
							className="object-contain drop-shadow-md"
						/>
					</div>

					{/* ─ Note / CTA text — centered, pulses when idle ─ */}
					<div
						className="absolute pointer-events-none font-hoangngan7 tracking-widest uppercase text-[#6b5739] text-center"
						style={{
							top: '80%',
							left: '15%',
							right: '15%',
							fontSize: 'clamp(0.6rem, 1.5vw, 2.3rem)',
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
					</div>

					<div
						className="absolute pointer-events-none"
						style={{
							bottom: '12%',
							right: '13.5%',
							zIndex: 4,
							transition: 'opacity 380ms ease-out',
						}}
					>
						<div
							className="flex items-end"
							style={{ gap: '0.4vw' }}
						>
							<div
								className="relative shrink-0"
								style={{
									width: '6vw',
									maxWidth: 78,
									minWidth: 30,
								}}
							>
								<ResponsiveImage
									src="envelope/eiffel.png"
									alt=""
									alpha
									draggable={false}
									aria-hidden={true}
									sizes="4vw"
									style={{
										width: '60%',
										objectFit: 'contain',
										display: 'block',
										zIndex: 10,
										position: 'relative',
										float: 'right',
										marginRight: '-30%',
									}}
								/>
								<ResponsiveImage
									src="envelope/stamp_three.png"
									alt=""
									alpha
									draggable={false}
									aria-hidden={true}
									sizes="4vw"
									style={{
										position: 'absolute',
										top: '-18%',
										left: '50%',
										width: '72%',
										objectFit: 'contain',
										zIndex: 10,
									}}
								/>
							</div>

							{/* London / Big Ben */}
							<ResponsiveImage
								src="envelope/stamp_one.png"
								alt=""
								alpha
								draggable={false}
								aria-hidden={true}
								sizes="6vw"
								style={{
									width: '6vw',
									maxWidth: 78,
									minWidth: 30,
									objectFit: 'contain',
									zIndex: 5,
								}}
							/>

							{/* Botanical */}
							<ResponsiveImage
								src="envelope/stamp_two.png"
								alt=""
								alpha
								draggable={false}
								aria-hidden={true}
								sizes="6vw"
								style={{
									width: '6vw',
									maxWidth: 78,
									minWidth: 30,
									objectFit: 'contain',
									zIndex: 4,
								}}
							/>
						</div>
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
			</div>{/* /envelope stage */}
			</div>{/* /content layer */}
		</section>
	);
}
