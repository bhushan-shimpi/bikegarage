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
    beforeImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    description: 'Barn-find rusty 2-stroke transformed with mirror chrome plating, rebuilt Mikuni carb, and Candy Red tank.'
  },
  {
    id: 'g2',
    title: 'Royal Enfield Bullet 350 Restoration',
    category: 'restoration',
    bikeName: 'RE Bullet 350 Standard',
    beforeImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy engine de-carbonization, pushrod seals renewal, hand-painted gold coachlines on matte black tank.'
  },
  {
    id: 'g3',
    title: 'Honda Shine 125 Full Service & Decarb',
    category: 'servicing',
    bikeName: 'Honda CB Shine 125',
    beforeImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    description: 'Full 35-point safety check, valve lash clearance calibration, Motul 10W-30 synthetic oil, and new brake pads.'
  },
  {
    id: 'g4',
    title: 'Hero Glamour Fuel Tank Repaint & Clearcoat',
    category: 'painting',
    bikeName: 'Hero Glamour FI',
    beforeImage: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dent extraction, anti-rust epoxy undercoat, vibrant candy blue basecoat, and high-solid 2K gloss clearcoat.'
  },
  {
    id: 'g5',
    title: 'KTM Duke 200 Foam Wash & Ceramic Coat',
    category: 'detailing',
    bikeName: 'KTM 200 Duke',
    beforeImage: 'https://images.unsplash.com/photo-1589148938909-4d241c91ee52?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80',
    description: 'High-pressure mud purge, degreased trellis frame, chain degreasing and Motul chain paste, ceramic hydrophobic seal.'
  },
  {
    id: 'g6',
    title: 'Bajaj Pulsar 180 Complete Engine Rebuild',
    category: 'servicing',
    bikeName: 'Bajaj Pulsar 180 DTS-i',
    beforeImage: 'https://images.unsplash.com/photo-1596706255843-0c4e09f58209?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
    description: 'Replaced crankshaft bearings, primary gear, Goetze piston rings, and rebuilt 5-speed transmission.'
  }
];
