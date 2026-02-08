import { useTranslation } from 'react-i18next';
import ourStoryImage from '@/assets/images/mievatho_NH1504.JPG';

export default function OurStory() {
	const { t } = useTranslation();
	return (
		<section className="bg-[#d6c1a0] py-20 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12">
					<img
						src={ourStoryImage}
						alt="Our Story"
						className="aspect-3/4 w-full object-cover rounded object-[50%_70%]"
					/>

					<div className="space-y-6 text-center md:text-left">
						<div className="text-[2.5em] lg:text-[3em] font-hoangngan8 text-[#412d1d]">
							{t('ourStory.greeting')}
						</div>

						<div className="text-[#2d2b25]/80 leading-relaxed text-[1em] font-hoangngan4 whitespace-pre-line">
							{t('ourStory.story')}
							<div className="text-[#2d2b25]/80 text-[1em] font-hoangngan4 whitespace-pre-line">
								<p>{t('ourStory.withLove')}</p>
								<p className="font-hoangngan8 text-[2em]">
									{t('ourStory.names')}
								</p>
							</div>
						</div>

						{/* <TypingText
							text={
								t('ourStory.story') +
								'\n' +
								'\n' +
								t('ourStory.withLove') +
								'\n' +
								t('ourStory.names')
							}
							className="text-[#2d2b25]/80 leading-relaxed text-[1em] font-hoangngan4 whitespace-pre-line"
							speed={0}
							showCursor={false}
						/> */}
					</div>
				</div>
			</div>
		</section>
	);
}
