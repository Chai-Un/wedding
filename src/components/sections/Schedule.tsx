import { TypingText } from '@/components/ui/typing-text';

interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

const scheduleItems: ScheduleItem[] = [
  {
    time: "5:00 PM",
    title: "Welcome Photos & Cocktails",
    description: "Arrive and enjoy welcome drinks while we capture some candid moments"
  },
  {
    time: "6:00 PM",
    title: "Dinner Program",
    description: "A delicious meal prepared for our celebration"
  },
  {
    time: "6:00 PM",
    title: "Toasts & Speeches",
    description: "Heartfelt words from family and friends"
  },
  {
    time: "7:00 PM",
    title: "Official Picture Taking",
    description: "Group photos with the wedding party and guests"
  },
  {
    time: "8:00 PM",
    title: "Reception",
    description: "Let the celebration begin!"
  },
  {
    time: "9:00 PM",
    title: "Open Bar & Dancing",
    description: "Dance the night away under the stars"
  }
];

export default function Schedule() {
  return (
    <section id="schedule" className="bg-[#e8dcc8] px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Program */}
          <div>
            <TypingText
              text="Program"
              as="h2"
              className="text-4xl font-serif text-[#5a6e4a] mb-12 text-center italic"
              speed={80}
              showCursor={false}
            />
            <div className="space-y-8">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 text-right">
                      <span className="text-lg font-serif text-[#5a6e4a]">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex-grow border-l-2 border-[#5a6e4a]/20 pl-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Reception */}
          <div>
            <h2 className="text-4xl font-serif text-[#5a6e4a] mb-12 text-center italic">
              Reception
            </h2>
            <div className="aspect-[3/4] bg-gradient-to-br from-stone-300 to-stone-200 rounded mb-8">
              {/* Placeholder for photo */}
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                Add venue photo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
