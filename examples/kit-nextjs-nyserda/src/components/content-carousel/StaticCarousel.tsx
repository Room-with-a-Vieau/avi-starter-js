'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const SLIDE_DURATION_MS = 7000;

export interface StaticCarouselSlide {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkText: string;
}

const STATIC_SLIDES: StaticCarouselSlide[] = [
  {
    title: 'Working for an Affordable, Sustainable, and Innovative Energy Future',
    imageSrc:
      'https://xmc-salesengine3c66-aviny0cdd-dev5e4f.sitecorecloud.io/-/jssmedia/Project/examples/new-york/banner01.png?h=536&iar=0&w=1002&ttc=63909112282&tt=2E8A6C3F0D3A3A75B450448F852D8699&hash=DF14F6A69FB40A9EBE561B356188A5A3',
    imageAlt: 'Working for an Affordable, Sustainable, and Innovative Energy Future',
    linkHref: '#',
    linkText: 'Learn more',
  },
  {
    title: 'Building Our Clean Energy Future Today',
    imageSrc:
      'https://xmc-salesengine3c66-aviny0cdd-dev5e4f.sitecorecloud.io/-/jssmedia/Project/examples/new-york/banner02.png?h=536&iar=0&w=1002&ttc=63909112983&tt=515B8E3FF554722B2A064E7147A67C8C&hash=104C0B06BD81F6ECDF4F97C565830CFF',
    imageAlt: 'Building Our Clean Energy Future Today',
    linkHref: '#',
    linkText: 'Learn more',
  },
  {
    title: 'Congestion Mitigation and Air Quality Improvement (CMAQ) Program',
    imageSrc:
      'https://xmc-salesengine3c66-aviny0cdd-dev5e4f.sitecorecloud.io/-/jssmedia/Project/examples/new-york/banner03.png?h=536&iar=0&w=1002&ttc=63909112362&tt=4E9728EF512BD9584A0BD4090AA0D191&hash=C99857D85600C074131E53966EFBDC31',
    imageAlt: 'Congestion Mitigation and Air Quality Improvement (CMAQ) Program',
    linkHref: '#',
    linkText: 'Learn more',
  },
];

function StaticCarouselItemContent({
  slide,
  isPageEditing,
}: {
  slide: StaticCarouselSlide;
  isPageEditing: boolean;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-theme-weaker bg-theme-faint p-4">
      <div
        className={cn(
          'mb-3 overflow-hidden rounded-md w-full',
          isPageEditing && 'relative h-40'
        )}
      >
        {isPageEditing ? (
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            width={1002}
            height={536}
            className="w-full h-auto"
            sizes="(max-width: 1280px) 100vw, 1280px"
            unoptimized
          />
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-primary">{slide.title}</h3>
      {slide.description && (
        <div className="mb-3 flex-1 text-sm text-gray-700">{slide.description}</div>
      )}
      <Link
        href={slide.linkHref}
        className="font-medium text-primary hover:text-primary-hover"
      >
        {slide.linkText}
      </Link>
    </div>
  );
}

export interface StaticCarouselProps {
  className?: string;
  styles?: string;
}

export const Default: React.FC<StaticCarouselProps> = ({ className, styles }) => {
  const { page } = useSitecore();
  const isPageEditing = page?.mode?.isEditing ?? false;
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPageEditing || !api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, [api, isPageEditing]);

  return (
    <section
      className={cn('static-carousel mx-auto my-8 max-w-screen-xl px-4', className, styles)}
      data-component="StaticCarousel"
    >
      <Carousel
        ref={carouselRef}
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          ...(isPageEditing ? {} : { containScroll: 'trimSnaps' }),
        }}
        className="relative w-full"
      >
        <CarouselContent className={isPageEditing ? '-ml-4' : '-ml-0'}>
          {STATIC_SLIDES.map((slide, index) => (
            <CarouselItem
              key={index}
              className={isPageEditing ? 'pl-4 md:basis-1/2 lg:basis-1/3' : 'pl-0 basis-full'}
            >
              <StaticCarouselItemContent slide={slide} isPageEditing={isPageEditing} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary text-white border-primary hover:bg-primary-hover hover:text-white" />
        <CarouselNext className="bg-primary text-white border-primary hover:bg-primary-hover hover:text-white" />
      </Carousel>
    </section>
  );
};
