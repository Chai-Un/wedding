import {
	BrowserRouter,
	Routes,
	Route,
	useParams,
	Navigate,
} from 'react-router-dom';
import EnvelopePage from './pages/EnvelopePage';
import HomePage from './pages/HomePage';
import NgayNangVe from './pages/NgayNangVe';
import Redamancy from './pages/Redamancy';
import BecomingOne from './pages/BecomingOne';
import HeartOfHanoi from './pages/HeartOfHanoi';
import { Toaster } from './components/ui/toaster';
import './i18n/config';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Gallery Router component that conditionally renders based on galleryId
function GalleryRouter() {
	const { galleryId } = useParams<{ galleryId: string }>();

	switch (galleryId) {
		case 'eat-the-memories':
			return <NgayNangVe />;
		case 'redamancy':
			return <Redamancy />;
		case 'becoming-one':
			return <BecomingOne />;
		case 'heart-of-hanoi':
			return <HeartOfHanoi />;
		default:
			return <Navigate to="/home" replace />;
	}
}

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<EnvelopePage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/gallery/:galleryId" element={<GalleryRouter />} />
			</Routes>
			<Toaster />
			<SpeedInsights />
		</BrowserRouter>
	);
}

export default App;
