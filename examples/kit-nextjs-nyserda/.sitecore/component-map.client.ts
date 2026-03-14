// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as AndrewHeaderContent from 'src/components/page-content/AndrewHeaderContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as HomeCTA from 'src/components/home-cta/HomeCTA';
import * as StaticCarousel from 'src/components/content-carousel/StaticCarousel';
import * as StaticCarouselbackup from 'src/components/content-carousel/StaticCarousel-backup';
import * as ContentCarousel from 'src/components/content-carousel/ContentCarousel';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['AndrewHeaderContent', { ...AndrewHeaderContent }],
  ['Navigation', { ...Navigation }],
  ['HomeCTA', { ...HomeCTA }],
  ['StaticCarousel', { ...StaticCarousel }],
  ['StaticCarousel-backup', { ...StaticCarouselbackup }],
  ['ContentCarousel', { ...ContentCarousel }],
]);

export default componentMap;
