import Navigation from '@/components/Navigation';
import coverImage from '@/assets/images/mievatho_NH6514.JPG';
// import coverMobileImage from '@/assets/images/mievatho_NH1487.JPG';

const WEDDING_INFO = [
	'11:00 ngày 11 tháng 4, 2026',
	'TRUNG TÂM HỘI NGHỊ QUỐC GIA',
];

export default function Cover() {
	return (
		<section
			id="home"
			className="relative h-screen md:min-h-screen flex flex-col items-center justify-center px-4 py-20"
		>
			{/* Navigation */}
			<Navigation overlay={true} />
			
				{/* Background with overlay - Portrait/Mobile */}
				<div
					className="absolute inset-0 bg-cover md:hidden"
					style={{
						backgroundImage: `url(${coverImage})`,
						backgroundPosition: '60% 30%',
					}}
				>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>

				{/* Background with overlay - Landscape/Desktop */}
				<div
					className="absolute inset-0 bg-cover hidden md:block"
					style={{
						backgroundImage: `url(${coverImage})`,
						backgroundPosition: '50% 10%',
					}}
				>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>

				{/* Content */}
				<div className="relative z-10 text-center space-y-8 max-w-4xl">
					{/* Couple Names */}
					<div className="space-y-4">
						<div
							className="text-[56px] md:text-[100px] text-white italic tracking-wide leading-tight"
							style={{ fontFamily: 'CustomSerif, serif' }}
						>
							Hoàng & Ngân
						</div>
						<p className="text-xl md:text-2xl text-white/90 tracking-[0.3em] uppercase font-light">
							ARE GETTING MARRIED
						</p>
					</div>
				</div>

				{/* Date & Time at bottom */}
				<div className="absolute bottom-[2%] left-0 right-0 text-center z-10 px-4">
					<div
						className="grid md:grid-cols-2 gap-4 md:gap-12 items-center text-lg md:text-2xl uppercase font-thin font-inconsolata"
					>
						{WEDDING_INFO.map((info, index) => (
							<div key={index} className="text-white tracking-wider">
								{info}
							</div>
						))}
					</div>
				</div>
			</section>
	);
}
