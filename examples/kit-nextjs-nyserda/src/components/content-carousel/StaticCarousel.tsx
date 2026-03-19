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
      'https://avi-starter-js.vercel.app/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fsalesengine3c66-aviny0cdd-dev5e4f-e87e%2Fmedia%2FProject%2Fexamples%2Fnew-york%2Fbanner01.png%3Fh%3D536%26iar%3D0%26w%3D1002&w=1280&q=75',
    imageAlt: 'Working for an Affordable, Sustainable, and Innovative Energy Future',
    linkHref: 'About-NYSERDA',
    linkText: 'Learn more',
  },
  {
    title: 'Building Our Clean Energy Future Today',
    imageSrc:
      'https://avi-starter-js.vercel.app/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fsalesengine3c66-aviny0cdd-dev5e4f-e87e%2Fmedia%2FProject%2Fexamples%2Fnew-york%2Fbanner02.png%3Fh%3D536%26iar%3D0%26w%3D1002&w=1280&q=75',
    imageAlt: 'Building Our Clean Energy Future Today',
    linkHref: 'About-NYSERDA',
    linkText: 'Learn more',
  },
  {
    title: 'Congestion Mitigation and Air Quality Improvement (CMAQ) Program',
    imageSrc:
      'https://avi-starter-js.vercel.app/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fsalesengine3c66-aviny0cdd-dev5e4f-e87e%2Fmedia%2FProject%2Fexamples%2Fnew-york%2Fbanner03.png%3Fh%3D536%26iar%3D0%26w%3D1002&w=1280&q=75',
    imageAlt: 'Congestion Mitigation and Air Quality Improvement (CMAQ) Program',
    linkHref: 'About-NYSERDA',
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
