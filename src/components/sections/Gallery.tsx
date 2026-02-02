import { Link } from 'react-router-dom';
import { GALLERY_CONCEPTS } from '@/constants/galleryData';
import { TypingText } from '@/components/ui/typing-text';

export default function Gallery() {
	return (
		<section id="gallery" className="bg-[#e8dcc8] px-4 py-24">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<TypingText
						text="Gallery"
						as="h2"
						className="text-4xl md:text-5xl font-serif text-[#5a6e4a] italic"
						speed={80}
						showCursor={false}
					/>
					<p className="text-gray-600 text-lg mt-4">
						Explore our journey together
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{GALLERY_CONCEPTS.map((concept) => (
						<Link
							key={concept.id}
							to={concept.path}
							className="group"
						>
							<div
								className={`aspect-[3/4] bg-gradient-to-br ${concept.bgColor} rounded-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-6 cursor-pointer shadow-lg group-hover:shadow-xl`}
							>
								<h3 className="text-xl md:text-2xl font-serif text-white text-center mb-2 group-hover:scale-110 transition-transform">
									{concept.title}
								</h3>
								<p className="text-sm text-white/80 text-center">
									{concept.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
