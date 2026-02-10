import { useTranslation } from 'react-i18next';
import ourStoryImage from '@/assets/images/mievatho_NH1504.JPG';
import BreakImage from '@/assets/images/break.svg?react';

export default function OurStory() {
	const { t } = useTranslation();
	return (
		<section className="bg-[#fbf7ee] py-12 md:py-20 lg:py-24 px-4 pb-0!">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
					<div className="md:px-8 m-auto order-first md:order-last">
						<img
							src={ourStoryImage}
							alt="Our Story"
							className="aspect-3/4 object-cover rounded object-[50%_80%] w-full md:h-[80%]"
						/>
					</div>
					<div className="space-y-6 text-center md:text-left md:pt-8 lg:pt-16 order-last md:order-first">
						<div className="text-3xl md:text-4xl lg:text-5xl font-hoangngan8 text-[#412d1d]">
							{t('ourStory.greeting')}
						</div>

						<div className="text-[#2d2b25]/80 leading-relaxed text-base md:text-lg font-hoangngan4 whitespace-pre-line">
							{t('ourStory.story')}
							<div className="text-[#2d2b25]/80 text-base md:text-lg font-hoangngan4 whitespace-pre-line">
								<p>{t('ourStory.withLove')}</p>
								<p className="font-hoangngan8 text-2xl md:text-3xl lg:text-4xl">
									{t('ourStory.names')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full md:pt-20 lg:pt-24 pt-12'>
				<BreakImage style={{ fill: '#6b5739', margin: '0 auto' }} />
			</div>
		</section>
	);
}
