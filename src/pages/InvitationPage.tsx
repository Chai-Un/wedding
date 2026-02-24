import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Invitation from '@/components/sections/Invitation';

export default function InvitationPage() {
	const navigate = useNavigate();

	const handleOpen = useCallback(() => {
		navigate('/home');
	}, [navigate]);

	return <Invitation onOpen={handleOpen} />;
}
