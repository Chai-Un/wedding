import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { GALLERY_DATA, GALLERY_CONCEPTS } from '../constants/galleryData';

// Unique photo grid layouts for each concept
const PHOTO_LAYOUTS = {
	'ngay-nang-ve': [
		{ cols: 2, rows: 2, span: 'col-span-2 row-span-2' }, // Large square
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 2, span: 'col-span-1 row-span-2' }, // Tall portrait
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 2, rows: 1, span: 'col-span-2 row-span-1' }, // Wide landscape
	],
	'redamncy': [
		{ cols: 1, rows: 2, span: 'col-span-1 row-span-2' }, // Tall left
		{ cols: 2, rows: 1, span: 'col-span-2 row-span-1' }, // Wide top
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 2, rows: 2, span: 'col-span-2 row-span-2' }, // Large bottom right
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
	],
	'becoming-one': [
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 2, rows: 2, span: 'col-span-2 row-span-2' }, // Large center
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 2, span: 'col-span-1 row-span-2' }, // Tall right
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
	],
	'heart-of-hanoi': [
		{ cols: 2, rows: 1, span: 'col-span-2 row-span-1' }, // Wide top
		{ cols: 1, rows: 2, span: 'col-span-1 row-span-2' }, // Tall left
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
		{ cols: 2, rows: 1, span: 'col-span-2 row-span-1' }, // Wide bottom
		{ cols: 1, rows: 1, span: 'col-span-1 row-span-1' },
	],
};

export default function GalleryDetailPage() {
	const { galleryId } = useParams<{ galleryId: string }>();
	
	const gallery = galleryId ? GALLERY_DATA[galleryId] : null;
	
	// Smooth scroll to top when galleryId changes
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [galleryId]);
	
	if (!gallery) {
		return <Navigate to="/" replace />;
	}

	// Get other concepts (exclude current one)
	const otherConcepts = GALLERY_CONCEPTS.filter(concept => concept.id !== galleryId);
	
	// Get layout for current concept
	const layout = galleryId ? PHOTO_LAYOUTS[galleryId as keyof typeof PHOTO_LAYOUTS] : null;

	return (
		<div className="min-h-screen bg-white">
			<Navigation />
			
			<main className="pt-24 pb-16 px-4">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-5xl md:text-6xl font-serif text-[#5a6e4a] italic mb-4">
							{gallery.title}
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							{gallery.description}
						</p>
					</div>

					{/* Magazine-style Photo Grid */}
					<div className="mb-20">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
							{layout && layout.map((item, i) => (
								<div
									key={i}
									className={`${item.span} bg-gradient-to-br from-stone-200 to-stone-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group`}
								>
									<div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm">
										Photo {i + 1}
									</div>
									{/* Overlay on hover */}
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								</div>
							))}
						</div>
					</div>

					{/* Other Concepts Navigation */}
					<div className="border-t border-gray-200 pt-12">
						<h2 className="text-2xl font-serif text-[#5a6e4a] text-center mb-8 italic">
							Explore Other Concepts
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
							{otherConcepts.map((concept) => (
								<Link
									key={concept.id}
									to={concept.path}
									className="group"
								>
									<div
										className={`aspect-[4/3] bg-gradient-to-br ${concept.bgColor} rounded-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer shadow-md group-hover:shadow-xl`}
									>
										<h3 className="text-xl md:text-2xl font-serif text-white text-center mb-2 group-hover:scale-105 transition-transform">
											{concept.title}
										</h3>
										<p className="text-sm text-white/90 text-center">
											{concept.description}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
