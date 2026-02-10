import Cover from '../components/sections/Cover';
import OurStory from '../components/sections/OurStory';
import OurJourney from '../components/sections/OurJourney';
import RSVP from '../components/sections/RSVP';
import Gallery from '../components/sections/Gallery';
import Timeline from '@/components/sections/Timeline';
import ContactUs from '@/components/sections/ContactUs';

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<main>
				<Cover />
				<OurStory />
				<RSVP />
				<Timeline />
				<OurJourney />
				<Gallery />
        <ContactUs />
			</main>
		</div>
	);
}
