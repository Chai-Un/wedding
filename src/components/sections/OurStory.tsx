import { useTranslation } from 'react-i18next';
import ourStoryImage from '@/assets/images/mievatho_NH1504.JPG';
import { TypingText } from '@/components/ui/typing-text';

export default function OurStory() {
	const { t } = useTranslation();
	return (
		<section className="bg-[#d6c1a0] py-20 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12">
					<img
						src={ourStoryImage}
						alt="Our Story"
						className="aspect-[3/4] w-full object-cover rounded object-[50%_70%]"
					/>

					<div className="space-y-6 text-center md:text-left">
						<div className="text-[3em] font-hoangngan8 text-[rgb(163,104,55)]">
							{t('ourStory.greeting')}
						</div>

						<TypingText
							text={
								t('ourStory.story') +
								'\n' + '\n' +
								t('ourStory.withLove') +
								'\n' +
								t('ourStory.names')
							}
							className="text-gray-600 leading-relaxed text-2xl font-dancing whitespace-pre-line"
							speed={35}
							showCursor={false}
						/>

						{/* <TypingText
							text={t('ourStory.withLove')}
							className="text-gray-600 leading-relaxed text-2xl font-dancing whitespace-pre-line"
							speed={40}
							showCursor={false}
						/>

						<TypingText
							text={t('ourStory.names')}
							className="text-gray-600 leading-relaxed text-2xl font-dancing whitespace-pre-line"
							speed={40}
							showCursor={false}
						/> */}
						{/* <div className="text-gray-600 space-y-1">
							<p className="text-2xl font-dancing">
								{t('ourStory.withLove')}
							</p>
							<p className="text-[28px] font-dancing">
								{t('ourStory.names')}
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
}
