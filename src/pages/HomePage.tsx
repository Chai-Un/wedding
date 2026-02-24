import { useState, useCallback } from 'react';
import Cover from '../components/sections/Cover';
import OurStory from '../components/sections/OurStory';
import OurJourney from '../components/sections/OurJourney';
import RSVP from '../components/sections/RSVP';
import Gallery from '../components/sections/Gallery';
import Timeline from '@/components/sections/Timeline';
import ContactUs from '@/components/sections/ContactUs';
import Invitation from '@/components/sections/Invitation';

export default function HomePage() {
	const [showInvitation, setShowInvitation] = useState(true);

	const handleInvitationOpen = useCallback(() => {
		setShowInvitation(false);
	}, []);

	return (
		<div className="min-h-screen">
			{showInvitation && <Invitation onOpen={handleInvitationOpen} />}
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
