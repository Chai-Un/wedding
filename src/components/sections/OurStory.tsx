import ourStoryImage from '@/assets/images/mievatho_NH1504.JPG';
import { TypingText } from '@/components/ui/typing-text';

const STORY_TEXT = `Hơn 3 năm yêu xa với bao lời yêu thương gửi trao nhau từ cách xa hàng ngàn cây số. Cuối cùng cũng sắp tới ngày chúng mình được sát gần nhau, cùng về chung một mái nhà. Chúng mình rất mong được kỉ niệm ngày chung đôi cùng những người thương yêu nhất. Sự hiện diện và những lời chúc phúc của mọi người là món quà tuyệt vời mà chúng mình luôn trân quý!`;

export default function OurStory() {
	return (
		<section className="bg-[#d6c1a0] py-20 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12">
					<img
						src={ourStoryImage}
						alt="Our Story"
						className="aspect-[3/4] w-full object-cover rounded object-[50%_70%]"
					/>

					<div className="space-y-6 text-center md:text-left">
						<TypingText
							text="Our Day"
							as="h2"
							className="text-[66px] font-custom-serif text-[rgb(163,104,55)]"
							speed={80}
							showCursor={false}
						/>

						<p className="text-gray-600 leading-relaxed text-2xl font-dancing">
							{STORY_TEXT}
						</p>

						<div className="text-gray-600 space-y-1">
							<p className="text-2xl font-dancing">With love,</p>
							<p className="text-[28px] font-dancing">
								Hoàng & Ngân
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
