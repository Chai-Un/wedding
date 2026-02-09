import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import vnSvg from '@/assets/images/vn-flag.svg';
import enSvg from '@/assets/images/uk-flag.svg';

interface LanguageSwitcherProps {
	className?: string;
}

export default function LanguageSwitcher({
	className = '',
}: LanguageSwitcherProps) {
	const { i18n } = useTranslation();
	const isEnglish = i18n.language === 'en';

	const handleToggle = (checked: boolean) => {
		const newLanguage = checked ? 'en' : 'vi';
		i18n.changeLanguage(newLanguage);
		localStorage.setItem('language', newLanguage);
	};

	return (
		<div className={className}>
			<Switch
				checked={isEnglish}
				onChange={handleToggle}
				onColor="#d6c1a0"
				offColor="#d6c1a0"
				onHandleColor="#fff"
				offHandleColor="#fff"
				handleDiameter={28}
				uncheckedIcon={
					<div className="flex items-center justify-center h-full text-[1em] md:text-[0.875em] font-medium text-white font-family-dancing">
						VI
					</div>
				}
				checkedIcon={
					<div className="flex items-center justify-center h-full text-[1em] md:text-[0.875em] font-medium text-white font-family-dancing">
						EN
					</div>
				}
				uncheckedHandleIcon={
					<div className="flex items-center justify-center h-full">
						<img src={vnSvg} alt="VN" className="w-5 h-5 object-cover" />
					</div>
				}
				checkedHandleIcon={
					<div className="flex items-center justify-center h-full">
						<img src={enSvg} alt="EN" className="w-5 h-5 object-cover" />
					</div>
				}
				height={28}
				width={62}
				borderRadius={16}
				className="react-switch"
			/>
		</div>
	);
}
