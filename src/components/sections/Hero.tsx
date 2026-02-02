import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/mievatho_NH6514.JPG";
import ourStoryImage from "@/assets/images/mievatho_NH1504.JPG";
import thumbnailMobileImage from "@/assets/images/mievatho_NH1487.JPG";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section id="home" className="relative h-screen md:min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Background with overlay - Portrait/Mobile */}
        <div className="absolute inset-0 bg-cover md:hidden" style={{ backgroundImage: `url(${thumbnailMobileImage})`, backgroundPosition: '50% 30%' }}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Background with overlay - Landscape/Desktop */}
        <div className="absolute inset-0 bg-cover hidden md:block" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: '50% 10%' }}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          {/* Couple Names */}
          <div className="space-y-4">
            <div className="text-[56px] md:text-[100px] text-white italic tracking-wide leading-tight" style={{ fontFamily: 'CustomSerif, serif' }}>
              Hoàng & Ngân
            </div>
            <p className="text-xl md:text-2xl text-white/90 tracking-[0.3em] uppercase font-light">
              ARE GETTING MARRIED
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('rsvp')}
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-12 py-6 text-sm tracking-widest uppercase"
            >
              RSVP HERE
            </Button>
          </div>
        </div>

        {/* Date & Time at bottom */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <p className="text-white/80 text-sm tracking-wider">APRIL 27, 2030 • 6:00 PM • THE SUNROOM AT RIZAL GARDENS</p>
        </div>
      </section>

      {/* Initials Section */}
      {/* <section className="bg-[#5a6e4a] py-20 flex justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-[#d4c5ad] flex items-center justify-center">
          <span className="text-5xl font-serif text-[#d4c5ad] italic">HN</span>
        </div>
      </section> */}

      {/* Story Section */}
      <section className="bg-[#e8dcc8] py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] bg-gradient-to-br from-stone-300 to-stone-200 rounded">
              <img src={ourStoryImage} alt="Our Story" className="w-full h-full object-cover rounded" style={{ objectPosition: '50% 70%' }} />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-[#5a6e4a] italic">
                Our Love Story
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Write a paragraph that tells your story as a couple. You can include details
                like how you met, your journey together, and what makes your relationship unique.
                This is your chance to share your personality and connect with your guests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
