'use client';

import type React from 'react';
import { cn } from '@/lib/utils';

const NYSERDA_BASE = 'https://www.nyserda.ny.gov';
const HERO_IMAGE_DESKTOP = `${NYSERDA_BASE}/-/media/Project/Nyserda/Images/Home-Hero/WorkingforanAffordableSustainableandInnovativeEnergyFuture1002x536.jpg`;
const HERO_IMAGE_MOBILE = `${NYSERDA_BASE}/-/media/Project/Nyserda/Images/Home-Hero/WorkingforanAffordableSustainableandInnovativeEnergyFuture704x1232.jpg`;

export default function HomeCTA(): React.ReactElement {
  return (
    <section className="hero-enhanced">
      <div className={cn('hero-block', 'no-stack-image-mobile')}>
        <img
          src={HERO_IMAGE_DESKTOP}
          alt="Solar contractor on solar panel"
          className="desktop-only hero-block__img"
        />
        <img
          src={HERO_IMAGE_MOBILE}
          alt="Solar contractor on solar panel"
          className="mobile-only hero-block__img"
        />
        <div className="hero-content">
          <div className="hero-title">
            <h2 className="hero-title__heading">
              Working for an Affordable, Sustainable, and Innovative Energy Future
            </h2>
          </div>
          <div className="link-panel">
            <a
              href={`${NYSERDA_BASE}/About`}
              className="hero-cta-button"
            >
              View Our Mission and Vision
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
