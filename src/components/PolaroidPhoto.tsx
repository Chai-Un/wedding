import { useState, useEffect } from 'react';

interface PolaroidPhotoProps {
	image: string;
	location: string;
	year: string;
	rotation: number;
	index: number;
	descriptionPosition?: string;
}

export default function PolaroidPhoto({
	image,
	location,
	year,
	rotation,
	index,
	descriptionPosition = 'center',
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
			className="bg-[#fbf7ee] p-2 md:p-4 transition-all duration-300 inline-block hover:z-50"
			style={{
				transform: `rotate(${rotation}deg)`,
				transition: 'transform 0.3s ease, box-shadow 0.3s ease',
				boxShadow: 'rgba(0, 0, 0, 0.4) 10px 10px 15px',
				zIndex: index,
			}}
		>
			<img
				src={image}
				alt={`${location}, ${year}`}
				className={`object-cover ${
					isVertical
						? 'w-full md:w-56 lg:w-64 xl:w-72 h-28 md:h-72 lg:h-80 xl:h-90'
						: 'w-full md:w-72 lg:w-80 xl:w-90 h-20 md:h-56 lg:h-64 xl:h-72'
				}`}
			/>
			<div className={`mt-2 md:mt-3 lg:mt-4 text-${descriptionPosition} font-hoangngan2`}>
				<p className="text-[#412d1d] text-sm md:text-base lg:text-lg xl:text-xl">
					{location}, {year}
				</p>
			</div>
		</div>
	);
}
