export interface GalleryItem {
  id: string;
  title: string;
  category: 'restoration' | 'servicing' | 'painting' | 'detailing';
  bikeName: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Yamaha RX100 Retro Rebuild',
    category: 'restoration',
    bikeName: 'Yamaha RX100 (1997)',
    beforeImage: '/images/services/bike-restoration.jpg',
    afterImage: '/images/hero-bike.jpg',
    description: 'Barn-find rusty 2-stroke transformed with mirror chrome plating, rebuilt Mikuni carb, and Candy Red tank.'
  },
  {
    id: 'g2',
    title: 'Bajaj Pulsar & Yamaha Restoration',
    category: 'restoration',
    bikeName: 'RE Bullet 350 Standard',
    beforeImage: '/images/services/bike-restoration.jpg',
    afterImage: '/images/about/bay3-restoration.jpg',
    description: 'Heavy engine de-carbonization, pushrod seals renewal, hand-painted gold coachlines on matte black tank.'
  },
  {
    id: 'g3',
    title: 'Honda Shine 125 Full Service & Decarb',
    category: 'servicing',
    bikeName: 'Honda CB Shine 125',
    beforeImage: '/images/services/engine-repair.jpg',
    afterImage: '/images/services/general-service.jpg',
    description: 'Full 35-point safety check, valve lash clearance calibration, Motul 10W-30 synthetic oil, and new brake pads.'
  },
  {
    id: 'g4',
    title: 'Hero Glamour Fuel Tank Repaint & Clearcoat',
    category: 'painting',
    bikeName: 'Hero Glamour FI',
    beforeImage: '/images/services/carburetor-fi.jpg',
    afterImage: '/images/about/bay4-wash.jpg',
    description: 'Deep dent extraction, anti-rust epoxy undercoat, vibrant candy blue basecoat, and high-solid 2K gloss clearcoat.'
  },
  {
    id: 'g5',
    title: 'KTM Duke 200 Foam Wash & Ceramic Coat',
    category: 'detailing',
    bikeName: 'KTM 200 Duke',
    beforeImage: '/images/services/general-service.jpg',
    afterImage: '/images/services/foam-wash.jpg',
    description: 'High-pressure mud purge, degreased trellis frame, chain degreasing and Motul chain paste, ceramic hydrophobic seal.'
  },
  {
    id: 'g6',
    title: 'Bajaj Pulsar 180 Complete Engine Rebuild',
    category: 'servicing',
    bikeName: 'Bajaj Pulsar 180 DTS-i',
    beforeImage: '/images/services/oil-change.jpg',
    afterImage: '/images/services/engine-repair.jpg',
    description: 'Replaced crankshaft bearings, primary gear, Goetze piston rings, and rebuilt 5-speed transmission.'
  }
];
