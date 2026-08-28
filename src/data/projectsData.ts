import { ProjectItem } from '../types/project';

export const projectsData: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Honda Unicorn 150 Complete Restoration',
    bikeModel: 'Honda Unicorn 150 (2007 Model)',
    category: 'restoration',
    yearBuilt: '2007',
    problem: 'Old bike parked for 4 years in open weather. Heavily rusted petrol tank, seized piston, brittle electrical wiring, faded chassis, and no compression.',
    workDone: [
      'Full chassis sandblasting, anti-rust zinc priming, and jet-black powder coating',
      'Engine bore job with new 0.25 oversize piston, fresh rings, and valvetrain rebuilding',
      'Fuel tank de-rusting, dent removal, metallic pearl black paint with silver factory pinstriping',
      'Brand new OEM Honda wiring harness, starter motor servicing, and LED instrument cluster',
      'Front disc caliper rebuild, DOT4 fluid, new rear brake drum shoes',
      'Complete nut-and-bolt zinc/chrome restoration and showroom Teflon detailing'
    ],
    result: 'Complete bike makeover! Engine purrs like day one with 48+ kmpl mileage and pristine mirror gloss body finish.',
    completionTime: '12 Days',
    beforeImage: '/images/about/bay3-restoration.jpg',
    afterImage: '/images/services/bike-painting.jpg',
    isFeatured: true
  },
  {
    id: 'p2',
    title: 'Vintage Yamaha RX100 Legendary Revival',
    bikeModel: 'Yamaha RX100 (1996 Classic 2-Stroke)',
    category: 'restoration',
    yearBuilt: '1996',
    problem: 'Engine lost iconic 2-stroke punch, oil pump jammed, chrome flaking off silencer and rims, tank dented with old peeling stickers.',
    workDone: [
      'Complete 2-stroke 98cc engine overhaul, Japanese Mikuni carb overhaul, and reed valve tuning',
      'Authentic triple-nickel chrome plating on expansion chamber, silencer, rims, and mudguards',
      'Candy Apple Red high-gloss 2K paint job with genuine Yamaha gold script decals',
      'Spoke wheel rebuilding with heavy gauge spokes and fresh MRF retro tyres',
      'New OEM clutch plates, primary drive gear, and autolube pump calibration'
    ],
    result: 'Iconic 2-stroke exhaust ring-a-ding note restored with instant front wheel lift acceleration and head-turning retro shine.',
    completionTime: '18 Days',
    beforeImage: '/images/about/bay3-restoration.jpg',
    afterImage: '/images/services/bike-restoration.jpg',
    isFeatured: true
  },
  {
    id: 'p3',
    title: 'Royal Enfield Bullet 350 Heavy Overhaul',
    bikeModel: 'Royal Enfield Bullet 350 Standard',
    category: 'servicing',
    yearBuilt: '2012',
    problem: 'Heavy tappet noise, excessive engine vibration at 60 km/h, oil dripping from pushrod tubes, and hard clutch operation.',
    workDone: [
      'Pushrod tube seal replacement with Viton heat-resistant O-rings',
      'De-carbonization of cylinder head and precision valve seating',
      'Heavy-duty clutch assembly and Teflon-lined low-friction clutch cable',
      'Chain and sprocket replacement with heavy-roller O-ring kit',
      'Castrol 15W-50 semi-synthetic oil flush and filter renewal'
    ],
    result: 'Trademark Royal Enfield deep rhythmic thump back without any oil drops, feather-soft clutch lever, and silky ride quality.',
    completionTime: '3 Days',
    beforeImage: '/images/services/engine-repair.jpg',
    afterImage: '/images/why-choose-us.jpg',
    isFeatured: true
  }
];
