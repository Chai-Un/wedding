const GIFT_REGISTRY = {
	title: 'Gift we could ask for',
	mainText: 'Your presence is truly the best gift we could ask for.',
	details:
		"But if you feel called to give a little something, we've put together a small registry with some of our most wished-for items at Sining Spaces. Scan the QR on this page or send an email to hello@reallygreatsite.com with the Registry No. 12345 as the subject line for our updated gift list.",
};

export default function GiftRegistry() {
	return (
		<section id="gift-registry" className="bg-[#e8dcc8] px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="aspect-[3/4] bg-gradient-to-br from-stone-300 to-stone-200 rounded">
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              Add photo here
            </div>
          </div>

					{/* Right - Gift Registry Info */}
					<div className="space-y-8">
						<div>
							<h2 className="text-3xl font-serif text-[#5a6e4a] mb-6 italic">
								{GIFT_REGISTRY.title}
							</h2>
							<p className="text-gray-700 leading-relaxed mb-6">
								{GIFT_REGISTRY.mainText}
							</p>
							<p className="text-gray-600 text-sm leading-relaxed mb-6">
								{GIFT_REGISTRY.details}
							</p>
						</div>

            {/* QR Code placeholder */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white border-2 border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-400">QR</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Scan to view</p>
                <p>our registry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
