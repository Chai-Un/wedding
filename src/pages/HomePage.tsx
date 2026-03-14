import Cover from '../components/sections/Cover';
import OurJourney from '../components/sections/OurJourney';
// import RSVP from '../components/sections/RSVP';
import Gallery from '../components/sections/Gallery';
import Timeline from '@/components/sections/Timeline';
import ContactUs from '@/components/sections/ContactUs';
import { useEffect } from 'react';
import New_RSVP from '@/components/sections/New_RSVP';

export default function HomePage() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);
	return (
		<div className="min-h-screen">
			<main>
				<Cover />
				<New_RSVP />
				{/* <RSVP /> */}
				<Timeline />
				<OurJourney />
				<Gallery />
				<ContactUs />
			</main>
		</div>
	);
}
