import { useState, useEffect } from 'react';

interface PolaroidPhotoProps {
	image: string;
	location: string;
	year: string;
	rotation: number;
	index: number;
}

export default function PolaroidPhoto({
	image,
	location,
	year,
	rotation,
	index,
}: PolaroidPhotoProps) {
	const [isVertical, setIsVertical] = useState<boolean>(false);

	useEffect(() => {
		const img = new Image();
		img.src = image;
		img.onload = () => {
			setIsVertical(img.height > img.width);
		};
	}, [image]);

	return (
		<div
			key={`photo-${index}`}
			className="bg-white p-4 md:p-5 lg:p-6 transition-all duration-300 inline-block"
			style={{
				transform: `rotate(${rotation}deg)`,
				transition: 'transform 0.3s ease, box-shadow 0.3s ease',
				boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			<img
				src={image}
				alt={`${location}, ${year}`}
				className={`object-cover ${
					isVertical
						? 'w-48 md:w-56 lg:w-64 xl:w-72 h-64 md:h-72 lg:h-80 xl:h-96'
						: 'w-64 md:w-72 lg:w-80 xl:w-96 h-48 md:h-56 lg:h-64 xl:h-72'
				}`}
			/>
			<div className="mt-3 md:mt-4 text-center font-hoangngan4">
				<p className="text-[#412d1d] text-sm md:text-base lg:text-lg xl:text-xl">
					{location}, {year}
				</p>
			</div>
		</div>
	);
}
