'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { Text, RichText, Image, Link } from '@sitecore-content-sdk/nextjs';
import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { ComponentProps } from '@/lib/component-props';

export interface ContentCarouselParams {
  [key: string]: string | undefined;
}

export interface ContentCarouselItemFields {
  title?: { jsonValue?: Field<string> };
  image?: { jsonValue?: ImageField };
  description?: { jsonValue?: Field<string> };
  link?: { jsonValue?: LinkField };
}

export interface ContentCarouselFields {
  data?: {
    datasource?: {
      title?: { jsonValue?: Field<string> };
      items?: ContentCarouselItemFields[];
      children?: { results?: ContentCarouselItemFields[] };
    };
  };
}

export type ContentCarouselProps = ComponentProps & {
  params?: ContentCarouselParams;
  fields?: ContentCarouselFields;
};

function getItems(fields: ContentCarouselFields | undefined): ContentCarouselItemFields[] {
  const datasource = fields?.data?.datasource;
  if (!datasource) return [];
  if (Array.isArray(datasource.items) && datasource.items.length > 0) return datasource.items;
  const results = datasource.children?.results;
  if (Array.isArray(results) && results.length > 0) return results;
  return [];
}

function CarouselItemContent({
  item,
  isPageEditing,
}: {
  item: ContentCarouselItemFields;
  isPageEditing: boolean;
}) {
  const { title, image, description, link } = item;
  const linkVal = link?.jsonValue as { value?: { href?: string } } | undefined;
  const hasContent =
    !!title?.jsonValue?.value ||
    !!image?.jsonValue ||
    !!description?.jsonValue?.value ||
    !!linkVal?.value?.href;

  if (!hasContent && !isPageEditing) return null;

  return (
    <div className="flex h-full flex-col rounded-lg border border-theme-weaker bg-theme-faint p-4">
      {image?.jsonValue && (
        <div className="mb-3 overflow-hidden rounded-md">
          <Image
            field={image.jsonValue}
            className="h-40 w-full object-cover"
            alt={title?.jsonValue?.value ?? ''}
          />
        </div>
      )}
      {title?.jsonValue && (
        <Text
          tag="h3"
          field={title.jsonValue}
          className="mb-2 text-lg font-semibold text-primary"
        />
      )}
      {description?.jsonValue && (
        <div className="mb-3 flex-1 text-sm text-gray-700">
          <RichText field={description.jsonValue} />
        </div>
      )}
      {link?.jsonValue && (link.jsonValue as { value?: { href?: string } })?.value?.href && (
        <Link field={link.jsonValue} className="font-medium text-primary hover:text-primary-hover">
          {(link.jsonValue as { value?: { text?: string } })?.value?.text ?? 'Learn more'}
        </Link>
      )}
    </div>
  );
}

function ContentCarouselEditMode({ props }: { props: ContentCarouselProps }) {
  const { fields, params } = props;
  const items = getItems(fields);
  const datasource = fields?.data?.datasource;
  const title = datasource?.title;

  return (
    <div
      className={cn('content-carousel-edit rounded-lg border-2 border-dashed border-primary/30 bg-theme-weaker p-6', params?.styles)}
      data-component="ContentCarouselEditMode"
    >
      {title?.jsonValue && (
        <div className="mb-4">
          <Text tag="h2" field={title.jsonValue} className="text-xl font-semibold text-primary" />
        </div>
      )}
      <p className="mb-4 text-sm text-gray-600">Carousel items (editing mode):</p>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No items configured. Add a datasource with items.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="rounded border border-theme-weak bg-white p-4">
              <CarouselItemContent item={item} isPageEditing={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const Default: React.FC<ContentCarouselProps> = (props) => {
  const { fields, params, page } = props;
  const isPageEditing = page?.mode?.isEditing ?? false;
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const carouselRef = useRef<HTMLDivElement>(null);

  const items = getItems(fields);
  const datasource = fields?.data?.datasource;

  if (!fields?.data?.datasource) {
    return <NoDataFallback componentName="Content Carousel" />;
  }

  if (isPageEditing) {
    return <ContentCarouselEditMode props={props} />;
  }

  if (items.length === 0) {
    return <NoDataFallback componentName="Content Carousel" />;
  }

  const title = datasource?.title;

  return (
    <section
      className={cn('content-carousel mx-auto my-8 max-w-screen-xl px-4', params?.styles)}
      data-component="ContentCarousel"
    >
      {title?.jsonValue && (
        <div className="mb-6">
          <Text tag="h2" field={title.jsonValue} className="text-2xl font-semibold text-primary" />
        </div>
      )}
      <Carousel
        ref={carouselRef}
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: false,
        }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <CarouselItemContent item={item} isPageEditing={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary text-white border-primary hover:bg-primary-hover hover:text-white" />
        <CarouselNext className="bg-primary text-white border-primary hover:bg-primary-hover hover:text-white" />
      </Carousel>
    </section>
  );
};
