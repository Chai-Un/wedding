export interface GalleryConcept {
	id: string;
	title: string;
	description: string;
	path: string;
	bgColor: string;
	content: string;
}

export const GALLERY_CONCEPTS: GalleryConcept[] = [
	{
		id: 'ngay-nang-ve',
		title: 'Ngày Nắng Ve',
		description: 'Sunny summer memories',
		path: '/gallery/ngay-nang-ve',
		bgColor: 'from-rose-300 to-pink-200',
		content: 'Photos from our sunny summer days together...',
	},
	{
		id: 'redamncy',
		title: 'Redamncy',
		description: 'Loving someone who loves you back',
		path: '/gallery/redamncy',
		bgColor: 'from-amber-300 to-orange-200',
		content: 'The feeling of loving and being loved in return...',
	},
	{
		id: 'becoming-one',
		title: 'Becoming One',
		description: 'Our journey to unity',
		path: '/gallery/becoming-one',
		bgColor: 'from-emerald-300 to-teal-200',
		content: 'Our journey becoming one together...',
	},
	{
		id: 'heart-of-hanoi',
		title: 'Heart of Hanoi',
		description: 'Love in the city',
		path: '/gallery/heart-of-hanoi',
		bgColor: 'from-blue-300 to-indigo-200',
		content: 'Exploring the heart of Hanoi together...',
	},
];

export const GALLERY_DATA = GALLERY_CONCEPTS.reduce((acc, concept) => {
	acc[concept.id] = concept;
	return acc;
}, {} as Record<string, GalleryConcept>);
