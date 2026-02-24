import {
	BrowserRouter,
	Routes,
	Route,
	useParams,
	Navigate,
} from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import HomePage from './pages/HomePage';
import NgayNangVe from './pages/NgayNangVe';
import Redamancy from './pages/Redamancy';
import BecomingOne from './pages/BecomingOne';
import HeartOfHanoi from './pages/HeartOfHanoi';
import { Toaster } from './components/ui/toaster';
import './i18n/config';

// Gallery Router component that conditionally renders based on galleryId
function GalleryRouter() {
	const { galleryId } = useParams<{ galleryId: string }>();

	switch (galleryId) {
		case 'ngay-nang-ve':
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
				<Route path="/" element={<InvitationPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/gallery/:galleryId" element={<GalleryRouter />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
