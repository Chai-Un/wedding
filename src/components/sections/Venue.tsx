import { MapPin, Shirt, Car } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Venue() {
  const venueData = [
    {
      icon: MapPin,
      title: "Reception Venue",
      heading: "The Sunroom at Rizal Gardens",
      description: "Our reception will take place in The Sunroom at Rizal Gardens — an open-air garden space. The celebration will be outdoors, so expect fresh air, soft grass, and lots of golden hour glow.",
      photo: 1
    },
    {
      icon: Shirt,
      title: "Dress Code",
      heading: "Garden Party Chic",
      description: "Flowy, breathable fabrics and comfortable shoes (heels are optional, sinking in the grass is not required). Pastel colors are preferred but not mandatory!",
      photo: 2
    },
    {
      icon: Car,
      title: "Parking & Directions",
      heading: "Free On-Site Parking",
      description: "Free parking is available on-site, with designated areas for PWDs and senior guests. If you need special assistance or a drop-off closer to the garden entrance, let us know.",
      photo: 3
    }
  ];

  return (
    <section id="venue" className="bg-[#2a2722] px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {venueData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-stone-400 to-stone-300 rounded mb-6">
                  <div className="w-full h-full flex items-center justify-center text-stone-500">
                    Photo {item.photo}
                  </div>
                </div>
                <div className="text-[#d4c5ad] space-y-3">
                  <div className="flex items-center gap-2 text-lg font-serif italic">
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </div>
                  <h3 className="font-semibold text-xl">
                    {item.heading}
                  </h3>
                  <p className="text-[#d4c5ad]/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden px-8">
          <Carousel 
            className="w-full"
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {venueData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <CarouselItem key={index}>
                    <div className="space-y-4">
                      <div className="aspect-[3/4] bg-gradient-to-br from-stone-400 to-stone-300 rounded">
                        <div className="w-full h-full flex items-center justify-center text-stone-500">
                          Photo {item.photo}
                        </div>
                      </div>
                      <div className="text-[#d4c5ad] space-y-3 px-4">
                        <div className="flex items-center gap-2 text-lg font-serif italic">
                          <Icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                        <h3 className="font-semibold text-xl">
                          {item.heading}
                        </h3>
                        <p className="text-[#d4c5ad]/80 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="text-[#d4c5ad] border-[#d4c5ad]" />
            <CarouselNext className="text-[#d4c5ad] border-[#d4c5ad]" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
