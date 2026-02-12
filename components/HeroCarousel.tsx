'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { HeroOverlayClassic } from './HeroOverlayClassic';
import 'swiper/css';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    image: '/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg',
    label: 'Strategy',
    text: "In today's rapidly evolving business landscape, the imperative for strategic transformation is underscored by our commitment to four pivotal pillars of success.",
    href: '/strategy/',
  },
  {
    id: 2,
    image: '/wp-content/uploads/2017/08/methodology-1.jpg',
    label: 'Methodology',
    text: 'To leverage technical advantages while maintaining vigilant cost control we collaborate with leadership, management, and technical teams to create strategy and allocate budget for the best technical solutions.',
    href: '/methodology/',
  },
  {
    id: 3,
    image: '/wp-content/uploads/2017/08/execution.jpg',
    label: 'Execution',
    text: "Think of ETI as a strategic partner dedicated to helping you achieve your organizational goals. Our approach centers on aligning with your objectives, delivering excellence, and fostering a culture of continuous improvement.",
    href: '/execution/',
  },
];

export function HeroCarousel() {
  return (
    <div className="relative h-[675px] w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        speed={1000}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section className="relative h-[675px] w-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                className="object-cover object-center"
                priority={slide.id === 1}
              />
              <div className="absolute inset-0 bg-black/10" />
              <HeroOverlayClassic
                label={slide.label}
                text={slide.text}
                href={slide.href}
              />
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
