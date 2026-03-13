import { getOptimizedUrl } from '@/lib/responsive-image';

export interface GalleryConcept {
	id: string;
	title?: string;
	description?: string;
	translationKey: string;
	path: string;
	bgColor: string;
	bgImage?: string;
	content?: string;
	showTitle?: boolean;
}

// Use optimized thumbnails — fallback to md size for gallery cards
const thumb1 = getOptimizedUrl('gallery/thumbnails/thumb1.jpg', 'md') || '';
const thumb2 = getOptimizedUrl('gallery/thumbnails/thumb2.jpg', 'md') || '';
const thumb3 = getOptimizedUrl('gallery/thumbnails/thumb3.jpg', 'md') || '';
const thumb4 = getOptimizedUrl('gallery/thumbnails/thumb4.jpg', 'md') || '';

export const GALLERY_CONCEPTS: GalleryConcept[] = [
	{
		id: 'eat-the-memories',
		title: 'EAT THE MEMORIES NOT THE CALORIES',
		// description: 'Sunny summer memories',
		translationKey: 'eatTheMemories',
		path: '/gallery/eat-the-memories',
		bgColor: 'from-rose-300 to-pink-200',
		bgImage: thumb1,
		// content: 'Photos from our sunny summer days together...',
		showTitle: true,
	},
	{
		id: 'redamancy',
		title: 'REDAMANCY',
		// description: 'Loving someone who loves you back',
		translationKey: 'redamancy',
		path: '/gallery/redamancy',
		bgColor: 'from-amber-300 to-orange-200',
		bgImage: thumb2,
		showTitle: true,
		// content: 'The feeling of loving and being loved in return...',
	},
	{
		id: 'becoming-one',
		title: 'BECOMING ONE',
		// description: 'Our journey to unity',
		translationKey: 'becomingOne',
		path: '/gallery/becoming-one',
		bgColor: 'from-emerald-300 to-teal-200',
		bgImage: thumb3,
		showTitle: true,
		// content: 'Our journey becoming one together...',
	},
	{
		id: 'heart-of-hanoi',
		title: 'HEART OF HANOI',
		// description: 'Love in the city',
		translationKey: 'heartOfHanoi',
		path: '/gallery/heart-of-hanoi',
		bgColor: 'from-blue-300 to-indigo-200',
		bgImage: thumb4,
		showTitle: true,
		// content: 'Exploring the heart of Hanoi together...',
	},
];

export const GALLERY_DATA = GALLERY_CONCEPTS.reduce((acc, concept) => {
	acc[concept.id] = concept;
	return acc;
}, {} as Record<string, GalleryConcept>);
