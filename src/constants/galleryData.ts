import thumbnail1 from '@/assets/images/gallery/thumbnails/thumb1.jpg';
import thumbnail2 from '@/assets/images/gallery/thumbnails/thumb2.jpg';
import thumbnail3 from '@/assets/images/gallery/thumbnails/thumb3.jpg';
import thumbnail4 from '@/assets/images/gallery/thumbnails/thumb4.jpg';
export interface GalleryConcept {
	id: string;
	title: string;
	description: string;
	translationKey: string;
	path: string;
	bgColor: string;
	bgImage?: string;
	content: string;
}

export const GALLERY_CONCEPTS: GalleryConcept[] = [
	{
		id: 'ngay-nang-ve',
		title: 'Ngày Nắng Về',
		description: 'Sunny summer memories',
		translationKey: 'ngayNangVe',
		path: '/gallery/ngay-nang-ve',
		bgColor: 'from-rose-300 to-pink-200',
		bgImage: thumbnail1,
		content: 'Photos from our sunny summer days together...',
	},
	{
		id: 'redamncy',
		title: 'Redamncy',
		description: 'Loving someone who loves you back',
		translationKey: 'redamncy',
		path: '/gallery/redamncy',
		bgColor: 'from-amber-300 to-orange-200',
		bgImage: thumbnail2,
		content: 'The feeling of loving and being loved in return...',
	},
	{
		id: 'becoming-one',
		title: 'Becoming One',
		description: 'Our journey to unity',
		translationKey: 'becomingOne',
		path: '/gallery/becoming-one',
		bgColor: 'from-emerald-300 to-teal-200',
		bgImage: thumbnail3,
		content: 'Our journey becoming one together...',
	},
	{
		id: 'heart-of-hanoi',
		title: 'Heart of Hanoi',
		description: 'Love in the city',
		translationKey: 'heartOfHanoi',
		path: '/gallery/heart-of-hanoi',
		bgColor: 'from-blue-300 to-indigo-200',
		bgImage: thumbnail4,
		content: 'Exploring the heart of Hanoi together...',
	},
];

export const GALLERY_DATA = GALLERY_CONCEPTS.reduce((acc, concept) => {
	acc[concept.id] = concept;
	return acc;
}, {} as Record<string, GalleryConcept>);
