'use client';

import type React from 'react';

const NYSERDA_BASE = 'https://www.nyserda.ny.gov';
const HERO_IMAGE_SRC = `${NYSERDA_BASE}/-/media/Project/Nyserda/Images/Programs/Clean-Energy-Workforce/hero-expand-clean-energy-offerings.jpg?la=en&h=400&w=1000&hash=C7D3DB05DAFBE306254CE211D9D24A7F`;

export default function CleanEnergyBanner(): React.ReactElement {
  return (
    <section className="clean-energy-banner" aria-label="Expand your clean energy offerings">
      <div className="clean-energy-banner__bg">
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="clean-energy-banner__img"
        />
      </div>
      <div className="clean-energy-banner__overlay">
        <h1 className="clean-energy-banner__title">
          Expand Your Clean Energy Offerings
        </h1>
        <p className="clean-energy-banner__subtitle">
          Diversifying business models with clean energy.
        </p>
      </div>
    </section>
  );
}
