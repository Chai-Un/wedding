import { useState, useEffect } from 'react';

type DescriptionPosition = 'left' | 'center' | 'right';

interface PolaroidPhotoProps {
	image: string;
	location: string;
	year: string;
	rotation: number;
	index: number;
	descriptionPosition?: DescriptionPosition;
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
			className={`bg-[#fbf7ee] p-2 md:p-4 pb-1 md:pb-2 transition-all duration-300 inline-block hover:z-50 ${
				isVertical
					? 'h-95 w-auto md:h-auto md:w-auto'
					: 'w-[calc(100vw-32px)] md:w-auto'
			}`}
			style={{
				transform: `rotate(${rotation}deg)`,
				transition: 'transform 0.3s ease, box-shadow 0.3s ease',
				boxShadow: 'rgba(0, 0, 0, 0.4) 10px 10px 15px',
				zIndex: index,
			}}
		>
			<div className={`overflow-hidden ${
				isVertical
					? 'h-[calc(100%-2rem)] md:h-auto'
					: ''
			}`}>
				<img
					src={image}
					alt={`${location}, ${year}`}
					className={`object-cover ${
						isVertical
							? 'h-full w-auto md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-90'
							: 'w-full aspect-4/3 md:w-72 md:h-56 lg:w-80 lg:h-64 xl:w-90 xl:h-72'
					}`}
				/>
			</div>
			<div className={`mt-2 md:mt-3 lg:mt-4 font-hoangngan2 ${
				descriptionPosition === 'left' ? 'text-left' :
				descriptionPosition === 'right' ? 'text-right' :
				'text-center'
			}`}>
				<p className="text-[#412d1d] text-sm md:text-base lg:text-lg xl:text-xl">
					{location}, {year}
				</p>
			</div>
		</div>
	);
}
