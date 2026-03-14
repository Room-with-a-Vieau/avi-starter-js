'use client';

import type React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';
import { cn } from '@/lib/utils';

const BASE_URL = 'https://www.nyserda.ny.gov';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface MenuColumn {
  heading: string;
  headingId: string;
  links: NavLink[];
}

interface NavItem {
  id: string;
  label: string;
  labelHtml?: string;
  panelId: string;
  title: string;
  backerStyle?: React.CSSProperties;
  gridStyle?: React.CSSProperties;
  columns: MenuColumn[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'MainMenu0',
    label: 'Buildings & Businesses',
    panelId: 'ulNavItemList0',
    title: 'Buildings & Businesses',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-Buildings-Business-1000x720.jpg')",
    },
    columns: [
      {
        heading: 'Evaluate & Manage Your Energy Use',
        headingId: 'h3-0-1',
        links: [
          { label: 'Energy Assessments & Benchmarking', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Energy-Efficiency-Solutions/Energy-Assessments-and-Benchmarking` },
          { label: 'Build Your Energy Strategy', href: `${BASE_URL}/PutEnergyToWork/About-Energy-Management/Build-Your-Energy-Strategy` },
          { label: 'Strategic Energy Management', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Strategic-Energy-Management` },
          { label: 'Operations & Maintenance Training', href: `${BASE_URL}/PutEnergyToWork/Energy-Program-and-Incentives/Workforce-Staffing-and-Training-Programs-and-Incentives` },
          { label: 'Energy Management Products', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Building-Operations-and-Performance/Real-Time-Energy-Management` },
          { label: 'Energy Efficient Solutions', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Energy-Efficiency-Solutions` },
          { label: 'See All Energy Evaluation & Management Programs', href: `${BASE_URL}/all-programs?v=11#category=businesses-large,businesses-small,institutional,multifamily-residential,real-estate-developers,architects,all-buildings-businesses,energy-management,all-energy-evaluation-management`, external: true },
        ],
      },
      {
        heading: 'Heating & Cooling',
        headingId: 'h3-0-8',
        links: [
          { label: 'Cold-Climate Heat Pumps', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Clean-Heating-and-Cooling` },
          { label: 'Heat Pump Water Heaters', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Clean-Heating-and-Cooling/#heat-pump`, external: true },
          { label: 'Geothermal Heating & Cooling', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Clean-Heating-and-Cooling` },
          { label: 'Multi-Property & Campus Solutions', href: `${BASE_URL}/All-Programs/Large-Scale-Thermal` },
          { label: 'Improve Indoor Air Quality', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Energy-Efficiency-Solutions/Indoor-Air-Quality` },
          { label: 'Seal & Insulate Your Building', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Energy-Efficiency-Solutions/Seal-and-Insulate-Your-Building` },
          { label: 'See All Heating & Cooling Programs', href: `${BASE_URL}/all-programs?v=12#category=all-buildings-businesses,all-heating-cooling`, external: true },
        ],
      },
      {
        heading: 'Decarbonize Your Building',
        headingId: 'h3-0-15',
        links: [
          { label: 'Cold-Climate Heat Pumps', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Clean-Heating-and-Cooling` },
          { label: 'Solar', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Solar` },
          { label: 'Energy Storage', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Energy-Storage` },
          { label: 'EVs and Charging Stations', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Electric-Vehicles-Charging-Stations` },
          { label: 'Financing Options', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Financing-for-Buildings-and-Businesses` },
          { label: 'See All Building and Business Programs', href: `${BASE_URL}/all-programs?v=13#category=all-buildings-businesses`, external: true },
        ],
      },
      {
        heading: 'Opportunities by Industry',
        headingId: 'h3-0-21',
        links: [
          { label: 'Agriculture', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Agriculture` },
          { label: 'Manufacturers', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Industrial-Manufacturing` },
          { label: 'Offices & Professional Services', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Retail-and-Office-Buildings` },
          { label: 'Hospitals & Healthcare', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Healthcare` },
          { label: 'Education', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Education` },
          { label: 'Small Businesses', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Small-Business` },
          { label: 'See All Building & Business Programs', href: `${BASE_URL}/all-programs?v=14#category=all-buildings-businesses`, external: true },
        ],
      },
      {
        heading: 'Opportunities by Building Type',
        headingId: 'h3-0-28',
        links: [
          { label: 'Multifamily', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Multifamily` },
          { label: 'Commercial & Mixed Use', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Commercial-Mixed-Use-Buildings` },
          { label: 'High Rise', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/High-Rise-Buildings` },
          { label: 'New Construction & Development', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/New-Construction-and-Development` },
          { label: 'Campuses & Multi-Building Properties', href: `${BASE_URL}/PutEnergyToWork/Industry-Energy-Solutions/Campuses-Multi-Building-Properties` },
          { label: 'See All Building & Business Programs', href: `${BASE_URL}/all-programs?v=15#category=all-buildings-businesses`, external: true },
        ],
      },
      {
        heading: 'Apartments & Condos',
        headingId: 'h3-0-34',
        links: [
          { label: 'Offers for Your Landlords or Co-ops', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Offers-to-Discuss-With-Landlords-or-Co-ops` },
          { label: 'Community Solar', href: `${BASE_URL}/All-Programs/NY-Sun/Community-Solar` },
          { label: 'Choosing an Apartment/Condo', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Choosing-An-Apartment-Or-Condo` },
          { label: 'Electronics & Appliances', href: `${BASE_URL}/Residents-and-Homeowners/Efficient-Appliances-and-Lighting/Electronics-and-Appliances` },
          { label: 'Tips for Renters & Condo Owners', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Renter-Energy-Saving-Tips` },
          { label: 'Income-Eligible Households', href: 'https://energyadvisor.ny.gov', external: true },
          { label: 'See All Apartment & Condo Programs', href: `${BASE_URL}/all-programs?v=16#category=renters,landlords-and-multifamily-properties`, external: true },
        ],
      },
    ],
  },
  {
    id: 'MainMenu1',
    label: 'Houses & Apartments',
    panelId: 'ulNavItemList1',
    title: 'Houses & Apartments',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-Houses-Apartments-Neighbor-1000x720.jpg')",
      backgroundPosition: 'bottom center',
      backgroundSize: 'cover',
    },
    gridStyle: { backgroundColor: 'rgba(255,255,255,0.93)' },
    columns: [
      {
        heading: "Lower Your Home's Carbon Footprint",
        headingId: 'h3-1-1',
        links: [
          { label: 'Energy Assessment', href: `${BASE_URL}/All-Programs/Residential-Energy-Assessment-Programs` },
          { label: 'Weatherproofing', href: `${BASE_URL}/Residents-and-Homeowners/Seal-and-Insulate-Your-Home` },
          { label: 'Solar & Energy Storage', href: `${BASE_URL}/Residents-and-Homeowners/Use-Solar-and-Energy-Storage-at-Home` },
          { label: 'Electric Vehicles & Charging', href: `${BASE_URL}/Residents-and-Homeowners/Electric-Vehicles-and-Charging-Stations` },
          { label: 'Financing Options', href: `${BASE_URL}/All-Programs/Residential-Financing-Programs` },
          { label: 'New Construction', href: `${BASE_URL}/Residents-and-Homeowners/Home-Buying/Building-Your-New-Home` },
          { label: 'See All Low-Carbon Home Programs', href: `${BASE_URL}/all-programs?v=21#category=all-houses-apartments`, external: true },
        ],
      },
      {
        heading: 'Heating & Cooling',
        headingId: 'h3-1-8',
        links: [
          { label: 'Cold-Climate Heat Pumps', href: 'https://cleanheat.ny.gov/how-they-work/', external: true },
          { label: 'Heat Pump Water Heaters', href: 'https://cleanheat.ny.gov/heat-pump-water-heaters/', external: true },
          { label: 'Geothermal Heat Pumps', href: 'https://cleanheat.ny.gov/geothermal-heat-pumps/', external: true },
          { label: 'Local Contractors & Resources', href: 'https://cleanheat.ny.gov/find-a-contractor/', external: true },
          { label: 'Improve Indoor Air Quality', href: `${BASE_URL}/Residents-and-Homeowners/Improving-Air-Quality` },
          { label: 'Weatherproofing', href: `${BASE_URL}/Residents-and-Homeowners/Seal-and-Insulate-Your-Home` },
          { label: 'See All Heating & Cooling Programs', href: `${BASE_URL}/all-programs?v=22#category=all-houses-apartments,all-heating-cooling`, external: true },
        ],
      },
      {
        heading: 'Income-Eligible Households',
        headingId: 'h3-1-15',
        links: [
          { label: 'Funding for Home Improvements', href: `${BASE_URL}/All-Programs/Residential-and-Property-Owner-Income-Eligible-Programs` },
          { label: 'Options for Renters', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment` },
          { label: 'Energy Bill Assistance', href: `${BASE_URL}/Residents-and-Homeowners/Energy-Bill-Assistance` },
          { label: 'Tips & Resources', href: `${BASE_URL}/Residents-and-Homeowners/Energy-Saving-Tips` },
          { label: 'See All Income-Eligible Programs', href: `${BASE_URL}/all-programs?v=23#category=income-eligible-households`, external: true },
        ],
      },
      {
        heading: 'Apartments & Condos',
        headingId: 'h3-1-20',
        links: [
          { label: 'Offers for Your Landlords or Co-ops', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Offers-to-Discuss-With-Landlords-or-Co-ops` },
          { label: 'Community Solar', href: `${BASE_URL}/All-Programs/NY-Sun/Community-Solar` },
          { label: 'Choosing an Apartment/Condo', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Choosing-An-Apartment-Or-Condo` },
          { label: 'Electronics & Appliances', href: `${BASE_URL}/Residents-and-Homeowners/Efficient-Appliances-and-Lighting/Electronics-and-Appliances` },
          { label: 'Tips for Renters & Condo Owners', href: `${BASE_URL}/Residents-and-Homeowners/Save-Energy-in-Your-Apartment/Renter-Energy-Saving-Tips` },
          { label: 'See All Apartment & Condo Programs', href: `${BASE_URL}/all-programs?v=24#category=renters,landlords-and-multifamily-properties`, external: true },
        ],
      },
      {
        heading: 'Appliances & Lighting',
        headingId: 'h3-1-26',
        links: [
          { label: 'Lighting', href: `${BASE_URL}/Residents-and-Homeowners/Efficient-Appliances-and-Lighting/Energy-Efficient-Lighting` },
          { label: 'Thermostats', href: `${BASE_URL}/Residents-and-Homeowners/Heat-and-Cool-Your-Home/Thermostats` },
          { label: 'Induction Cooking', href: `${BASE_URL}/Residents-and-Homeowners/Cooking-at-Home` },
          { label: 'Appliances & Equipment', href: `${BASE_URL}/Residents-and-Homeowners/Efficient-Appliances-and-Lighting/Major-Appliances` },
          { label: 'Water Heaters', href: `${BASE_URL}/Residents-and-Homeowners/Heat-and-Cool-Your-Home/Water-Heaters` },
          { label: 'Products & Appliances Tips', href: `${BASE_URL}/Residents-and-Homeowners/Energy-Saving-Tips` },
        ],
      },
      {
        heading: 'Plan for Home Improvements',
        headingId: 'h3-1-32',
        links: [
          { label: 'Buying a Home', href: `${BASE_URL}/Residents-and-Homeowners/Home-Buying` },
          { label: 'Home Equipment Replacement', href: `${BASE_URL}/Residents-and-Homeowners/Home-Equipment-Replacements` },
          { label: 'Home Renovations', href: `${BASE_URL}/Residents-and-Homeowners/Home-Renovations-Upgrades` },
          { label: 'Improving Comfort & Efficiency', href: `${BASE_URL}/Residents-and-Homeowners` },
          { label: 'See All Residential Programs', href: `${BASE_URL}/all-programs?v=23#category=single-family-homes,renters,income-eligible-households,landlords-and-multifamily-properties,all-houses-apartments`, external: true },
        ],
      },
    ],
  },
  {
    id: 'MainMenu2',
    label: 'Renewables & Transportation',
    panelId: 'ulNavItemList2',
    title: 'Renewables & Transportation',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-Renewables-Trans-1000x720.jpg')",
    },
    gridStyle: { backgroundColor: 'rgba(255,255,255,0.80)' },
    columns: [
      {
        heading: 'Renewables',
        headingId: 'h3-2-1',
        links: [
          { label: 'Solar', href: `${BASE_URL}/All-Programs/NY-Sun` },
          { label: 'Wind', href: `${BASE_URL}/All-Programs/Offshore-Wind` },
          { label: 'Energy Storage', href: `${BASE_URL}/All-Programs/Energy-Storage-Program` },
          { label: 'Large-Scale Renewable Solicitations', href: `${BASE_URL}/All-Programs/Large-Scale-Renewables/RES-Tier-One-Eligibility/Solicitations-for-Long-term-Contracts` },
          { label: 'Clean Energy Siting for Communities', href: `${BASE_URL}/All-Programs/Clean-Energy-Siting-Resources` },
          { label: 'See All Renewable Programs', href: `${BASE_URL}/all-programs?v=31#category=all-renewables`, external: true },
        ],
      },
      {
        heading: 'Electric Vehicles (EVs)',
        headingId: 'h3-2-7',
        links: [
          { label: 'Available Rebates & Eligible Models', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program` },
          { label: 'Transition Your Fleet Vehicles', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Electric-Vehicles-Charging-Stations` },
          { label: 'Electric School Buses', href: `${BASE_URL}/All-Programs/Electric-School-Buses` },
          { label: 'Benefits of Switching to EVs', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/About-Electric-Cars` },
          { label: 'Fuel Savings Calculator', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/About-Electric-Cars/Electric-Vehicle-Calculator` },
          { label: 'Information for Vehicle Dealers', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/Dealers` },
          { label: 'See All EV Programs', href: `${BASE_URL}/all-programs?v=32#category=all-transportation`, external: true },
        ],
      },
      {
        heading: 'Install a Charging Station',
        headingId: 'h3-2-14',
        links: [
          { label: 'Homes', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/Charging-Options` },
          { label: 'Multifamily Buildings', href: `${BASE_URL}/All-Programs/Charge-Ready-NY` },
          { label: 'Businesses', href: `${BASE_URL}/PutEnergyToWork/Energy-Technology-and-Solutions/Renewables-and-Clean-Technologies/Electric-Vehicles-Charging-Stations` },
          { label: 'Institutions', href: `${BASE_URL}/All-Programs/Charging-Station-Programs` },
          { label: 'Towns/Communities', href: `${BASE_URL}/All-Programs/Clean-Energy-Siting-Resources/EV-Charging-Station-Permitting-Resources` },
          { label: 'Schools', href: `${BASE_URL}/All-Programs/Charging-Station-Programs` },
          { label: 'See All Charging Station Programs', href: `${BASE_URL}/all-programs?v=33#category=all-transportation`, external: true },
        ],
      },
      {
        heading: 'Resources for Drivers',
        headingId: 'h3-2-21',
        links: [
          { label: 'Find a Charging Station', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/Charging-Options/Electric-Vehicle-Station-Locator` },
          { label: 'Find a Local Dealer', href: `${BASE_URL}/All-Programs/Drive-Clean-Rebate-For-Electric-Cars-Program/Participating-Dealers` },
          { label: 'EV Calculator', href: 'https://nyserda.wattplan.com/EV/', external: true },
          { label: 'E-Z Pass Discounts', href: 'https://www.thruway.ny.gov/ezpass/discount.html', external: true },
          { label: 'See All Resources for Drivers', href: `${BASE_URL}/all-programs?v=34#category=all-transportation`, external: true },
        ],
      },
      {
        heading: 'Transit & Other Mobility Options',
        headingId: 'h3-2-26',
        links: [
          { label: 'Clean Mobility Technologies', href: `${BASE_URL}/All-Programs/Clean-Mobility-Program` },
          { label: 'Clean Transportation Reports & Guides', href: `${BASE_URL}/About/Publications/Energy-Analysis-Reports-and-Studies/Transportation-Reports` },
          { label: 'Funding for Public Transit Systems', href: `${BASE_URL}/E-Mobility-Technologies-and-Funding` },
          { label: 'Electrifying Infrastructure', href: `${BASE_URL}/Transportation-Technology` },
          { label: 'See All Transit & Other Mobility Programs', href: `${BASE_URL}/all-programs?v=35#category=all-transportation`, external: true },
        ],
      },
    ],
  },
  {
    id: 'MainMenu3',
    label: 'Green Careers & Training',
    panelId: 'ulNavItemList3',
    title: 'Green Careers & Training',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-Green-Careers-1000x720.jpg')",
    },
    columns: [
      {
        heading: 'Clean Energy Careers',
        headingId: 'h3-3-1',
        links: [
          { label: 'Explore Careers in Clean Energy', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/Energize-Your-Future` },
          { label: 'Internships', href: `${BASE_URL}/All-Programs/Clean-Energy-Internship-Program/Prospective-Interns` },
          { label: 'Trainings', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/Resources` },
          { label: 'Apprenticeships', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Job-Seekers/Clean-Energy-Apprenticeships` },
          { label: 'Paths to Degrees & Certifications', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Job-Seekers/Degrees-and-Certifications` },
          { label: 'NYSERDA Careers', href: `${BASE_URL}/About/Careers-at-NYSERDA` },
        ],
      },
      {
        heading: 'Funding For Hiring',
        headingId: 'h3-3-7',
        links: [
          { label: 'Clean Energy Businesses', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/Leveraging-Multiple-Workforce-Programs` },
          { label: 'Contractors & Installers', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Businesses/Funding-for-Contractors-and-Installers` },
          { label: 'Organized Labor', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Businesses/For-Organized-Labor` },
          { label: 'Cleantech Startups', href: `${BASE_URL}/Funding-for-Cleantech-Startups` },
          { label: 'Renewable Developers', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Businesses` },
          { label: 'See All Hiring Programs', href: `${BASE_URL}/all-programs?v=42#category=hiring`, external: true },
        ],
      },
      {
        heading: 'Support for Underserved Communities',
        headingId: 'h3-3-13',
        links: [
          { label: 'Climate Justice Fellowship', href: `${BASE_URL}/All-Programs/Climate-Justice-Fellowship` },
          { label: 'Funding for Community-Based Programs', href: `${BASE_URL}/Resources-for-Community-Organizations` },
          { label: 'Hiring Disadvantaged Community Populations', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Businesses/Hiring-Disadvantaged-Community-Populations` },
          { label: 'Workforce Development & Training', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training` },
          { label: 'See All Underserved Community Programs', href: `${BASE_URL}/all-programs?v=43#category=underserved-communities,all-workforce-development`, external: true },
        ],
      },
      {
        heading: 'Clean Energy Entrepreneurs',
        headingId: 'h3-3-18',
        links: [
          { label: 'Incubators & Resources', href: '#' },
          { label: 'Networking & Events', href: `${BASE_URL}/Events` },
          { label: 'Mentoring & Expert Advice', href: `${BASE_URL}/All-Programs/ClimateTech-Expertise-Network` },
          { label: 'See All Clean Energy Entrepreneur Programs', href: `${BASE_URL}/all-programs?v=44#category=all-entrepreneurs-startups,all-workforce-development`, external: true },
        ],
      },
      {
        heading: 'Train Current Employees',
        headingId: 'h3-3-22',
        links: [
          { label: 'Expand Your Clean Energy Offerings', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/For-Businesses/Expand-Your-Clean-Energy-Offerings` },
          { label: 'All Available Trainings', href: `${BASE_URL}/All-Programs/Clean-Energy-Workforce-Development-and-Training/Clean-Energy-Training-Resources` },
          { label: 'Webinars', href: `${BASE_URL}/Events` },
          { label: 'See All Training Programs', href: `${BASE_URL}/all-programs?v=45#category=workforce-training`, external: true },
        ],
      },
    ],
  },
  {
    id: 'MainMenu4',
    label: 'State Policy & Community Solutions',
    panelId: 'ulNavItemList4',
    title: 'State Policy & Community Solutions',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-State-Policy-Community-Sol-1000x720.jpg')",
    },
    columns: [
      {
        heading: 'New York Energy Planning',
        headingId: 'h3-4-1',
        links: [
          { label: 'State Energy Plan', href: 'https://energyplan.ny.gov/', external: true },
          { label: 'Climate Act', href: 'https://climate.ny.gov/', external: true },
          { label: 'Energy Codes', href: `${BASE_URL}/All-Programs/Clean-Resilient-Building-Codes` },
          { label: 'Other Policies & Local Laws', href: `${BASE_URL}/About/New-York-State-Regulations` },
          { label: 'NYSERDA Strategic Outlook', href: `${BASE_URL}/About/Publications/Program-Planning-Status-Reports/Strategic-Outlook` },
          { label: 'Advanced Nuclear', href: `${BASE_URL}/All-Programs/Advanced-Nuclear-Energy` },
          { label: 'See All New York Climate Laws', href: `${BASE_URL}/All-Programs?v=51#category=all-policies-codes`, external: true },
        ],
      },
      {
        heading: 'Support for Underserved Communities',
        headingId: 'h3-4-8',
        links: [
          { label: 'P-12 Schools', href: `${BASE_URL}/All-Programs/P-12-Initiative` },
          { label: 'Climate Justice', href: `${BASE_URL}/All-Programs/Energy-and-Climate-Equity-Strategy/Climate-Justice` },
          { label: 'Regional Support', href: `${BASE_URL}/All-Programs/Regional-Clean-Energy-Hubs` },
          { label: 'Resources for Community Organizations', href: `${BASE_URL}/Resources-for-Community-Organizations` },
          { label: 'See All Underserved Community Programs', href: `${BASE_URL}/All-Programs?v=51#category=underserved-communities`, external: true },
        ],
      },
      {
        heading: 'Solutions for Municipalities',
        headingId: 'h3-4-13',
        links: [
          { label: 'P-12 Schools', href: `${BASE_URL}/All-Programs/P-12-Initiative` },
          { label: 'Municipal Buildings', href: `${BASE_URL}/All-Programs/Clean-Energy-Communities` },
          { label: 'Energy Codes & Training', href: `${BASE_URL}/All-Programs/Clean-Resilient-Building-Codes/Municipalities-Code-Officials` },
          { label: 'Permitting & Siting', href: `${BASE_URL}/All-Programs/Clean-Energy-Siting-Resources` },
          { label: 'Power Plant Redevelopment', href: `${BASE_URL}/All-Programs/Just-Transition-Site-Reuse-Planning-Program` },
          { label: 'District Thermal', href: `${BASE_URL}/All-Programs/Large-Scale-Thermal` },
          { label: 'See All Municipality Programs', href: `${BASE_URL}/All-Programs?v=53#category=municipalities`, external: true },
        ],
      },
      {
        heading: 'Transit & Other Mobility Options',
        headingId: 'h3-4-20',
        links: [
          { label: 'E-Mobility Technologies & Innovation', href: `${BASE_URL}/E-Mobility-Technologies-and-Funding` },
          { label: 'Clean Transportation Reports & Guides', href: `${BASE_URL}/About/Publications/Energy-Analysis-Reports-and-Studies/Transportation-Reports` },
          { label: 'Funding for Public Transit Systems', href: `${BASE_URL}/E-Mobility-Technologies-and-Funding` },
          { label: 'Electrifying Infrastructure', href: `${BASE_URL}/Transportation-Technology` },
          { label: 'See All Transit & Other Mobility Programs', href: `${BASE_URL}/All-Programs?v=54#category=all-transportation`, external: true },
        ],
      },
      {
        heading: 'Community-Scale Renewables & Clean Energy Siting',
        headingId: 'h3-4-25',
        links: [
          { label: 'Community Solar', href: `${BASE_URL}/All-Programs/NY-Sun/Community-Solar` },
          { label: 'Siting for Renewable Projects', href: `${BASE_URL}/All-Programs/Clean-Energy-Siting-Resources` },
          { label: 'Transitioning Underused Spaces', href: `${BASE_URL}/All-Programs/Clean-Energy-Siting-Resources/Transitioning-Underused-Spaces` },
          { label: 'Agricultural & Clean Energy Development', href: `${BASE_URL}/All-Programs/NY-Sun/On-site-Solar/Businesses/Leasing-Your-Land` },
        ],
      },
    ],
  },
  {
    id: 'MainMenu5',
    label: 'Economic Development &\nInnovation',
    labelHtml: 'Economic Development <br aria-hidden="true">& Innovation',
    panelId: 'ulNavItemList5',
    title: 'Economic Development & Innovation',
    backerStyle: {
      backgroundImage: "url('https://www.nyserda.ny.gov/-/media/Project/Nyserda/Images/Navigation/Nav-Climate-Tech-Innovation-1000x550.jpg')",
    },
    gridStyle: { backgroundColor: 'rgba(255,255,255,0.90)' },
    columns: [
      {
        heading: 'Investment in Clean Energy',
        headingId: 'h3-5-1',
        links: [
          { label: 'Investor and Venture Capital', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Funding-Opportunities` },
          { label: 'NY Green Bank', href: 'https://greenbank.ny.gov/', external: true },
          { label: 'Our Impact', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Innovation-Project-Portfolios` },
          { label: 'See All Investment Programs', href: `${BASE_URL}/All-Programs?v=61#category=entrepreneurs-start-ups,all-entrepreneurs-startups,researchers,all-researchers`, external: true },
        ],
      },
      {
        heading: 'Innovation Focus Areas',
        headingId: 'h3-5-5',
        links: [
          { label: 'Innovation & Research', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA` },
          { label: 'Carbon Management', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Natural-Carbon-Solutions` },
          { label: 'Clean Transportation', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Clean-Transportation` },
          { label: 'Energy Storage', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Power-Generation-and-Storage` },
          { label: 'Advanced Fuels', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Advanced-Fuels-and-Thermal-Energy-Research` },
          { label: 'End-Use Innovation for Buildings', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/End-Use-Energy-Innovation` },
          { label: 'Grid Modernization', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Grid-Modernization` },
          { label: 'Commercialization', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Commercialization-Program` },
        ],
      },
      {
        heading: 'Cleantech Solutions',
        headingId: 'h3-5-13',
        links: [
          { label: 'Funding', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Funding-Opportunities` },
          { label: 'Research Initiatives', href: '#' },
          { label: 'Partnerships', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA` },
          { label: 'Publications & Reports', href: `${BASE_URL}/About/Publications/Research-and-Technical-Reports` },
          { label: 'See All Clean Tech Solution Programs', href: `${BASE_URL}/All-Programs?v=63#category=all-entrepreneurs-startups,all-researchers`, external: true },
        ],
      },
      {
        heading: 'Entrepreneurs & Startups',
        headingId: 'h3-5-18',
        links: [
          { label: 'Mentoring & Expert Advice', href: `${BASE_URL}/All-Programs/ClimateTech-Expertise-Network` },
          { label: 'See All Entrepreneur & Startup Programs', href: `${BASE_URL}/All-Programs/Innovation-at-NYSERDA/Commercialization-Program` },
        ],
      },
      {
        heading: 'Economic Development',
        headingId: 'h3-5-20',
        links: [
          { label: 'Economic Development', href: `${BASE_URL}/All-Programs/Economic-Development` },
          { label: 'STEP', href: `${BASE_URL}/About/Saratoga-Technology-and-Energy-Park` },
          { label: 'Clean Energy Industry Report', href: `${BASE_URL}/About/Publications/New-York-Clean-Energy-Industry-Report` },
        ],
      },
    ],
  },
];

export type HeaderContentProps = ComponentProps & {
  params?: ComponentProps['params'] & { styles?: string };
  fields?: Record<string, unknown>;
};

function NavDropdownPanel({
  item,
  isOpen,
}: {
  item: NavItem;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div
      id={item.panelId}
      className="nav-item-list relative z-50 mt-0 w-full border-t border-[var(--color-theme-weak)] bg-[var(--color-theme-faint)] shadow-lg"
      role="region"
      aria-labelledby={item.id}
    >
      <div className="menu-title border-b border-[var(--color-theme-weak)] bg-[var(--color-primary)] px-6 py-3">
        <h2 className="m-0 text-lg font-semibold text-white">{item.title}</h2>
      </div>
      <div
        className="menu-backer min-h-[320px] bg-cover bg-center bg-no-repeat"
        style={item.backerStyle}
      >
        <div
          className="menu-grid mx-auto max-w-[1400px] px-4 py-6"
          style={item.gridStyle}
        >
          <ul className="menu-grid-inner grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {item.columns.map((col) => (
              <li key={col.headingId} className="menu-box list-none">
                <h3
                  id={col.headingId}
                  className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]"
                >
                  {col.heading}
                </h3>
                <ul
                  className="list-none space-y-1 pl-0"
                  aria-labelledby={col.headingId}
                >
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="text-[var(--color-foreground)] underline decoration-[var(--color-theme-mid)] underline-offset-2 hover:decoration-[var(--color-primary)]"
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Default({ params, page }: HeaderContentProps): React.ReactElement {
  const { page: _page } = useSitecore();
  const pageContext = _page ?? page;
  const isEditing = pageContext?.mode?.isEditing ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const closePanel = useCallback(() => {
    setOpenIndex(null);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  }, [hoverTimer]);

  const openPanel = useCallback((index: number) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setOpenIndex(index);
  }, [hoverTimer]);

  const handleMouseEnter = useCallback((index: number) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const t = setTimeout(() => openPanel(index), 150);
    setHoverTimer(t);
  }, [hoverTimer, openPanel]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setHoverTimer(null);
    const t = setTimeout(closePanel, 200);
    setHoverTimer(t);
  }, [closePanel, hoverTimer]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closePanel();
    };
    window.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePanel]);

  const { styles = '', RenderingIdentifier: id } = params ?? {};

  const openItem = openIndex !== null ? NAV_ITEMS[openIndex] : null;

  return (
    <div
      ref={navRef}
      className={cn(
        'header-grid menu-wrapper-no-height relative hidden md:block',
        styles
      )}
      id={id}
    >
      <div className="container-fluid menu-max menu-wide w-full max-w-[100%] px-4">
        <nav
          className="nys-global-header horizontal unstacked no-border-bottom flex flex-wrap items-center border-b-0 bg-[var(--color-primary)] text-white"
          aria-label="navigation-primary"
        >
          <h1 className="nyserdalogo my-0 flex-shrink-0 py-4 pr-6 text-xl font-bold" tabIndex={-1}>
            <a
              href={BASE_URL}
              className="text-white no-underline hover:underline focus:outline focus:ring-2 focus:ring-white"
            >
              NYSERDA
            </a>
          </h1>
          <ul className="nav-container flex list-none flex-wrap gap-0 pl-0">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id={item.id}
                  type="button"
                  aria-expanded={openIndex === index}
                  aria-haspopup="true"
                  aria-controls={item.panelId}
                  className={cn(
                    'nav-item nav-item__header menu-button flex cursor-pointer items-center border-0 bg-transparent px-4 py-4 text-left text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)] focus:outline focus:ring-2 focus:ring-inset focus:ring-white',
                    openIndex === index && 'bg-[var(--color-primary-hover)]'
                  )}
                  onClick={() => {
                    if (isEditing) return;
                    setOpenIndex(openIndex === index ? null : index);
                  }}
                >
                  {item.labelHtml ? (
                    <span
                      className="nav-span"
                      dangerouslySetInnerHTML={{ __html: item.labelHtml }}
                    />
                  ) : (
                    <span className="nav-span">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Full-width dropdown rendered at container level so it spans entire width */}
        {openItem && (
          <div className="absolute left-0 right-0 top-full z-40 -mx-4">
            <NavDropdownPanel item={openItem} isOpen />
          </div>
        )}
      </div>
    </div>
  );
}
