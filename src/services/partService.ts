import { SparePart } from '../types/customer';
import { storageService } from './storageService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'chaudhari_spare_parts';

const defaultParts: SparePart[] = [
  // 🔧 Engine Parts
  { id: 'prt-e01', name: 'Engine Oil (4T 10W-30, 1L)', category: 'Engine', price: 350, stockQuantity: 25 },
  { id: 'prt-e02', name: 'Engine Oil (4T 20W-40, 1L)', category: 'Engine', price: 320, stockQuantity: 20 },
  { id: 'prt-e03', name: 'Oil Filter', category: 'Engine', price: 120, stockQuantity: 20 },
  { id: 'prt-e04', name: 'Air Filter', category: 'Engine', price: 150, stockQuantity: 18 },
  { id: 'prt-e05', name: 'Spark Plug', category: 'Engine', price: 120, stockQuantity: 30 },
  { id: 'prt-e06', name: 'Spark Plug Cap', category: 'Engine', price: 80, stockQuantity: 15 },
  { id: 'prt-e07', name: 'Clutch Plate Set', category: 'Engine', price: 550, stockQuantity: 10 },
  { id: 'prt-e08', name: 'Clutch Spring Set', category: 'Engine', price: 120, stockQuantity: 12 },
  { id: 'prt-e09', name: 'Clutch Cable', category: 'Engine', price: 110, stockQuantity: 15 },
  { id: 'prt-e10', name: 'Clutch Bearing', category: 'Engine', price: 180, stockQuantity: 8 },
  { id: 'prt-e11', name: 'Clutch Housing', category: 'Engine', price: 450, stockQuantity: 5 },
  { id: 'prt-e12', name: 'Piston', category: 'Engine', price: 850, stockQuantity: 6 },
  { id: 'prt-e13', name: 'Piston Ring Set', category: 'Engine', price: 350, stockQuantity: 8 },
  { id: 'prt-e14', name: 'Cylinder Block', category: 'Engine', price: 2200, stockQuantity: 3 },
  { id: 'prt-e15', name: 'Cylinder Head', category: 'Engine', price: 1800, stockQuantity: 3 },
  { id: 'prt-e16', name: 'Head Gasket', category: 'Engine', price: 180, stockQuantity: 12 },
  { id: 'prt-e17', name: 'Valve (Intake / Exhaust)', category: 'Engine', price: 220, stockQuantity: 10 },
  { id: 'prt-e18', name: 'Valve Seal', category: 'Engine', price: 80, stockQuantity: 15 },
  { id: 'prt-e19', name: 'Valve Spring', category: 'Engine', price: 90, stockQuantity: 12 },
  { id: 'prt-e20', name: 'Camshaft', category: 'Engine', price: 1200, stockQuantity: 4 },
  { id: 'prt-e21', name: 'Cam Chain', category: 'Engine', price: 350, stockQuantity: 8 },
  { id: 'prt-e22', name: 'Cam Chain Tensioner', category: 'Engine', price: 180, stockQuantity: 8 },
  { id: 'prt-e23', name: 'Crankshaft', category: 'Engine', price: 3500, stockQuantity: 2 },
  { id: 'prt-e24', name: 'Crank Bearing', category: 'Engine', price: 280, stockQuantity: 6 },
  { id: 'prt-e25', name: 'Connecting Rod', category: 'Engine', price: 950, stockQuantity: 4 },
  { id: 'prt-e26', name: 'Rocker Arm', category: 'Engine', price: 320, stockQuantity: 6 },
  { id: 'prt-e27', name: 'Engine Gasket Set (Full)', category: 'Engine', price: 450, stockQuantity: 8 },
  { id: 'prt-e28', name: 'Crankcase Gasket', category: 'Engine', price: 120, stockQuantity: 10 },
  { id: 'prt-e29', name: 'Oil Seal', category: 'Engine', price: 60, stockQuantity: 20 },
  { id: 'prt-e30', name: 'Timing Chain', category: 'Engine', price: 280, stockQuantity: 8 },
  { id: 'prt-e31', name: 'Timing Gear', category: 'Engine', price: 350, stockQuantity: 6 },

  // ⚙️ Transmission / Gearbox
  { id: 'prt-g01', name: 'Gear Lever', category: 'Transmission', price: 180, stockQuantity: 10 },
  { id: 'prt-g02', name: 'Gear Shaft', category: 'Transmission', price: 450, stockQuantity: 5 },
  { id: 'prt-g03', name: 'Gear Selector Fork', category: 'Transmission', price: 320, stockQuantity: 5 },
  { id: 'prt-g04', name: 'Gear Bearing', category: 'Transmission', price: 150, stockQuantity: 8 },
  { id: 'prt-g05', name: 'Gear Sprocket', category: 'Transmission', price: 280, stockQuantity: 8 },
  { id: 'prt-g06', name: 'Primary Gear', category: 'Transmission', price: 550, stockQuantity: 4 },
  { id: 'prt-g07', name: 'Secondary Gear', category: 'Transmission', price: 550, stockQuantity: 4 },
  { id: 'prt-g08', name: 'Gearbox Gasket', category: 'Transmission', price: 90, stockQuantity: 10 },
  { id: 'prt-g09', name: 'Gear Oil (80W-90, 100ml)', category: 'Transmission', price: 60, stockQuantity: 20 },

  // 🛞 Chain & Drive System
  { id: 'prt-c01', name: 'Drive Chain', category: 'Chain & Drive', price: 450, stockQuantity: 12 },
  { id: 'prt-c02', name: 'Front Sprocket', category: 'Chain & Drive', price: 180, stockQuantity: 12 },
  { id: 'prt-c03', name: 'Rear Sprocket', category: 'Chain & Drive', price: 320, stockQuantity: 10 },
  { id: 'prt-c04', name: 'Chain & Sprocket Kit', category: 'Chain & Drive', price: 850, stockQuantity: 8 },
  { id: 'prt-c05', name: 'Chain Adjuster', category: 'Chain & Drive', price: 80, stockQuantity: 15 },
  { id: 'prt-c06', name: 'Chain Slider', category: 'Chain & Drive', price: 120, stockQuantity: 10 },
  { id: 'prt-c07', name: 'Chain Cover', category: 'Chain & Drive', price: 150, stockQuantity: 8 },

  // 🛑 Brake System — Front
  { id: 'prt-b01', name: 'Front Brake Pads', category: 'Brakes', price: 220, stockQuantity: 12 },
  { id: 'prt-b02', name: 'Front Brake Disc', category: 'Brakes', price: 650, stockQuantity: 6 },
  { id: 'prt-b03', name: 'Front Brake Caliper', category: 'Brakes', price: 1200, stockQuantity: 4 },
  { id: 'prt-b04', name: 'Caliper Piston', category: 'Brakes', price: 180, stockQuantity: 8 },
  { id: 'prt-b05', name: 'Brake Hose', category: 'Brakes', price: 220, stockQuantity: 8 },
  { id: 'prt-b06', name: 'Master Cylinder', category: 'Brakes', price: 480, stockQuantity: 5 },
  { id: 'prt-b07', name: 'Brake Lever (Front)', category: 'Brakes', price: 150, stockQuantity: 10 },
  { id: 'prt-b08', name: 'Brake Fluid (DOT 4)', category: 'Brakes', price: 120, stockQuantity: 15 },
  { id: 'prt-b09', name: 'Brake Shoe Set (Drum — Front)', category: 'Brakes', price: 180, stockQuantity: 15 },
  // Rear
  { id: 'prt-b10', name: 'Rear Brake Pads', category: 'Brakes', price: 200, stockQuantity: 12 },
  { id: 'prt-b11', name: 'Rear Brake Disc', category: 'Brakes', price: 620, stockQuantity: 6 },
  { id: 'prt-b12', name: 'Rear Brake Caliper', category: 'Brakes', price: 1100, stockQuantity: 4 },
  { id: 'prt-b13', name: 'Rear Brake Shoe Set (Drum)', category: 'Brakes', price: 180, stockQuantity: 15 },
  { id: 'prt-b14', name: 'Brake Drum (Rear)', category: 'Brakes', price: 380, stockQuantity: 5 },
  { id: 'prt-b15', name: 'Rear Brake Cable', category: 'Brakes', price: 110, stockQuantity: 12 },
  { id: 'prt-b16', name: 'Brake Rod', category: 'Brakes', price: 90, stockQuantity: 10 },
  { id: 'prt-b17', name: 'Brake Spring', category: 'Brakes', price: 40, stockQuantity: 20 },

  // 🛞 Wheel & Tyre Parts
  { id: 'prt-w01', name: 'Front Tyre', category: 'Wheels & Tyres', price: 900, stockQuantity: 8 },
  { id: 'prt-w02', name: 'Rear Tyre', category: 'Wheels & Tyres', price: 1100, stockQuantity: 8 },
  { id: 'prt-w03', name: 'Tube (Front / Rear)', category: 'Wheels & Tyres', price: 150, stockQuantity: 20 },
  { id: 'prt-w04', name: 'Tubeless Valve', category: 'Wheels & Tyres', price: 30, stockQuantity: 30 },
  { id: 'prt-w05', name: 'Wheel Rim', category: 'Wheels & Tyres', price: 1200, stockQuantity: 4 },
  { id: 'prt-w06', name: 'Wheel Bearing', category: 'Wheels & Tyres', price: 120, stockQuantity: 15 },
  { id: 'prt-w07', name: 'Wheel Spacer', category: 'Wheels & Tyres', price: 60, stockQuantity: 15 },
  { id: 'prt-w08', name: 'Axle', category: 'Wheels & Tyres', price: 280, stockQuantity: 8 },
  { id: 'prt-w09', name: 'Axle Nut', category: 'Wheels & Tyres', price: 40, stockQuantity: 20 },
  { id: 'prt-w10', name: 'Rim Tape', category: 'Wheels & Tyres', price: 50, stockQuantity: 20 },
  { id: 'prt-w11', name: 'Wheel Spoke', category: 'Wheels & Tyres', price: 25, stockQuantity: 50 },

  // 🏍️ Suspension & Steering
  { id: 'prt-s01', name: 'Front Fork Assembly', category: 'Suspension', price: 2800, stockQuantity: 3 },
  { id: 'prt-s02', name: 'Fork Oil', category: 'Suspension', price: 180, stockQuantity: 12 },
  { id: 'prt-s03', name: 'Fork Oil Seal', category: 'Suspension', price: 120, stockQuantity: 12 },
  { id: 'prt-s04', name: 'Fork Dust Seal', category: 'Suspension', price: 80, stockQuantity: 12 },
  { id: 'prt-s05', name: 'Fork Bush', category: 'Suspension', price: 90, stockQuantity: 10 },
  { id: 'prt-s06', name: 'Fork Tube', category: 'Suspension', price: 650, stockQuantity: 4 },
  { id: 'prt-s07', name: 'Rear Shock Absorber', category: 'Suspension', price: 1200, stockQuantity: 5 },
  { id: 'prt-s08', name: 'Rear Suspension Bush', category: 'Suspension', price: 80, stockQuantity: 12 },
  { id: 'prt-s09', name: 'Steering Cone Set', category: 'Suspension', price: 220, stockQuantity: 8 },
  { id: 'prt-s10', name: 'Steering Bearing', category: 'Suspension', price: 180, stockQuantity: 8 },
  { id: 'prt-s11', name: 'Handlebar', category: 'Suspension', price: 450, stockQuantity: 6 },
  { id: 'prt-s12', name: 'Handlebar Grip (Pair)', category: 'Suspension', price: 120, stockQuantity: 15 },
  { id: 'prt-s13', name: 'Handlebar Clamp', category: 'Suspension', price: 150, stockQuantity: 8 },

  // 🔌 Electrical Parts
  { id: 'prt-el01', name: 'Battery (12V 4Ah MF)', category: 'Electrical', price: 1150, stockQuantity: 6 },
  { id: 'prt-el02', name: 'Battery Terminal', category: 'Electrical', price: 40, stockQuantity: 20 },
  { id: 'prt-el03', name: 'Fuse Set', category: 'Electrical', price: 30, stockQuantity: 25 },
  { id: 'prt-el04', name: 'Main Fuse', category: 'Electrical', price: 50, stockQuantity: 20 },
  { id: 'prt-el05', name: 'Headlight Bulb (12V 35W Halogen)', category: 'Electrical', price: 120, stockQuantity: 25 },
  { id: 'prt-el06', name: 'LED Headlight', category: 'Electrical', price: 650, stockQuantity: 8 },
  { id: 'prt-el07', name: 'Tail Light Bulb', category: 'Electrical', price: 40, stockQuantity: 25 },
  { id: 'prt-el08', name: 'Indicator Bulb', category: 'Electrical', price: 30, stockQuantity: 30 },
  { id: 'prt-el09', name: 'Indicator Assembly (Front / Rear)', category: 'Electrical', price: 180, stockQuantity: 10 },
  { id: 'prt-el10', name: 'Horn', category: 'Electrical', price: 150, stockQuantity: 10 },
  { id: 'prt-el11', name: 'Starter Motor', category: 'Electrical', price: 1800, stockQuantity: 3 },
  { id: 'prt-el12', name: 'Starter Relay', category: 'Electrical', price: 180, stockQuantity: 8 },
  { id: 'prt-el13', name: 'Ignition Coil', category: 'Electrical', price: 380, stockQuantity: 6 },
  { id: 'prt-el14', name: 'CDI Unit', category: 'Electrical', price: 650, stockQuantity: 5 },
  { id: 'prt-el15', name: 'ECU', category: 'Electrical', price: 2800, stockQuantity: 2 },
  { id: 'prt-el16', name: 'Rectifier / Regulator', category: 'Electrical', price: 480, stockQuantity: 6 },
  { id: 'prt-el17', name: 'Stator Coil', category: 'Electrical', price: 850, stockQuantity: 4 },
  { id: 'prt-el18', name: 'Pickup Coil', category: 'Electrical', price: 350, stockQuantity: 5 },
  { id: 'prt-el19', name: 'Wiring Harness', category: 'Electrical', price: 950, stockQuantity: 4 },
  { id: 'prt-el20', name: 'Ignition Switch', category: 'Electrical', price: 280, stockQuantity: 8 },
  { id: 'prt-el21', name: 'Side Stand Switch', category: 'Electrical', price: 120, stockQuantity: 10 },
  { id: 'prt-el22', name: 'Neutral Switch', category: 'Electrical', price: 90, stockQuantity: 10 },
  { id: 'prt-el23', name: 'Brake Switch', category: 'Electrical', price: 80, stockQuantity: 12 },

  // 💡 Lighting & Indicators
  { id: 'prt-l01', name: 'Headlight Assembly', category: 'Lighting', price: 850, stockQuantity: 5 },
  { id: 'prt-l02', name: 'DRL (Daytime Running Light)', category: 'Lighting', price: 350, stockQuantity: 6 },
  { id: 'prt-l03', name: 'Tail Light Assembly', category: 'Lighting', price: 420, stockQuantity: 6 },
  { id: 'prt-l04', name: 'Front Indicator (Pair)', category: 'Lighting', price: 220, stockQuantity: 8 },
  { id: 'prt-l05', name: 'Rear Indicator (Pair)', category: 'Lighting', price: 200, stockQuantity: 8 },
  { id: 'prt-l06', name: 'Indicator Relay', category: 'Lighting', price: 80, stockQuantity: 12 },
  { id: 'prt-l07', name: 'Number Plate Light', category: 'Lighting', price: 80, stockQuantity: 12 },
  { id: 'prt-l08', name: 'Speedometer / Meter Console', category: 'Lighting', price: 1200, stockQuantity: 3 },

  // ⛽ Fuel System
  { id: 'prt-f01', name: 'Fuel Filter', category: 'Fuel System', price: 120, stockQuantity: 15 },
  { id: 'prt-f02', name: 'Fuel Pump', category: 'Fuel System', price: 850, stockQuantity: 5 },
  { id: 'prt-f03', name: 'Fuel Injector', category: 'Fuel System', price: 1800, stockQuantity: 3 },
  { id: 'prt-f04', name: 'Carburetor Assembly', category: 'Fuel System', price: 1200, stockQuantity: 4 },
  { id: 'prt-f05', name: 'Carburetor Repair Kit', category: 'Fuel System', price: 180, stockQuantity: 10 },
  { id: 'prt-f06', name: 'Throttle Cable', category: 'Fuel System', price: 90, stockQuantity: 12 },
  { id: 'prt-f07', name: 'Fuel Pipe / Hose', category: 'Fuel System', price: 80, stockQuantity: 12 },
  { id: 'prt-f08', name: 'Fuel Tank Cap', category: 'Fuel System', price: 150, stockQuantity: 8 },
  { id: 'prt-f09', name: 'Fuel Tap / Petcock', category: 'Fuel System', price: 180, stockQuantity: 8 },
  { id: 'prt-f10', name: 'Injector O-ring', category: 'Fuel System', price: 50, stockQuantity: 20 },

  // 🌬️ Cooling System
  { id: 'prt-cool01', name: 'Radiator', category: 'Cooling', price: 2800, stockQuantity: 2 },
  { id: 'prt-cool02', name: 'Radiator Fan', category: 'Cooling', price: 650, stockQuantity: 4 },
  { id: 'prt-cool03', name: 'Coolant (1L)', category: 'Cooling', price: 180, stockQuantity: 15 },
  { id: 'prt-cool04', name: 'Water Pump', category: 'Cooling', price: 950, stockQuantity: 3 },
  { id: 'prt-cool05', name: 'Thermostat', category: 'Cooling', price: 280, stockQuantity: 5 },
  { id: 'prt-cool06', name: 'Radiator Hose', category: 'Cooling', price: 180, stockQuantity: 8 },
  { id: 'prt-cool07', name: 'Oil Cooler', category: 'Cooling', price: 1200, stockQuantity: 3 },

  // 🔊 Exhaust System
  { id: 'prt-ex01', name: 'Exhaust Muffler', category: 'Exhaust', price: 1500, stockQuantity: 4 },
  { id: 'prt-ex02', name: 'Exhaust Gasket', category: 'Exhaust', price: 80, stockQuantity: 15 },
  { id: 'prt-ex03', name: 'Exhaust Pipe', category: 'Exhaust', price: 950, stockQuantity: 4 },
  { id: 'prt-ex04', name: 'Exhaust Mounting Rubber', category: 'Exhaust', price: 60, stockQuantity: 20 },
  { id: 'prt-ex05', name: 'Exhaust Clamp', category: 'Exhaust', price: 50, stockQuantity: 20 },
  { id: 'prt-ex06', name: 'Heat Shield', category: 'Exhaust', price: 180, stockQuantity: 8 },

  // 🧰 Cables & Controls
  { id: 'prt-cab01', name: 'Clutch Cable Assembly', category: 'Cables & Controls', price: 110, stockQuantity: 15 },
  { id: 'prt-cab02', name: 'Front Brake Cable', category: 'Cables & Controls', price: 100, stockQuantity: 12 },
  { id: 'prt-cab03', name: 'Rear Brake Cable', category: 'Cables & Controls', price: 110, stockQuantity: 12 },
  { id: 'prt-cab04', name: 'Speedometer Cable', category: 'Cables & Controls', price: 120, stockQuantity: 10 },
  { id: 'prt-cab05', name: 'Choke Cable', category: 'Cables & Controls', price: 80, stockQuantity: 10 },
  { id: 'prt-cab06', name: 'Clutch Lever', category: 'Cables & Controls', price: 120, stockQuantity: 12 },
  { id: 'prt-cab07', name: 'Brake Lever (Front)', category: 'Cables & Controls', price: 150, stockQuantity: 12 },

  // 🪑 Body & Exterior
  { id: 'prt-body01', name: 'Front Mudguard', category: 'Body', price: 380, stockQuantity: 6 },
  { id: 'prt-body02', name: 'Rear Mudguard', category: 'Body', price: 350, stockQuantity: 6 },
  { id: 'prt-body03', name: 'Side Panels (Pair)', category: 'Body', price: 520, stockQuantity: 5 },
  { id: 'prt-body04', name: 'Tank Cover', category: 'Body', price: 380, stockQuantity: 5 },
  { id: 'prt-body05', name: 'Seat Assembly', category: 'Body', price: 1200, stockQuantity: 3 },
  { id: 'prt-body06', name: 'Seat Lock', category: 'Body', price: 150, stockQuantity: 8 },
  { id: 'prt-body07', name: 'Grab Rail', category: 'Body', price: 320, stockQuantity: 5 },
  { id: 'prt-body08', name: 'Crash Guard', category: 'Body', price: 850, stockQuantity: 4 },
  { id: 'prt-body09', name: 'Rider Footrest (Pair)', category: 'Body', price: 280, stockQuantity: 8 },
  { id: 'prt-body10', name: 'Pillion Footrest (Pair)', category: 'Body', price: 220, stockQuantity: 8 },
  { id: 'prt-body11', name: 'Main Stand', category: 'Body', price: 450, stockQuantity: 5 },
  { id: 'prt-body12', name: 'Side Stand', category: 'Body', price: 280, stockQuantity: 8 },
  { id: 'prt-body13', name: 'Stand Spring', category: 'Body', price: 40, stockQuantity: 20 },
  { id: 'prt-body14', name: 'Number Plate Holder', category: 'Body', price: 80, stockQuantity: 12 },
  { id: 'prt-body15', name: 'Rear View Mirror Set (Pair)', category: 'Body', price: 180, stockQuantity: 8 },

  // 🛠️ Bearings, Bushes & Seals
  { id: 'prt-bear01', name: 'Wheel Bearing (Front / Rear)', category: 'Bearings & Seals', price: 120, stockQuantity: 15 },
  { id: 'prt-bear02', name: 'Steering Bearing Set', category: 'Bearings & Seals', price: 180, stockQuantity: 10 },
  { id: 'prt-bear03', name: 'Swingarm Bearing', category: 'Bearings & Seals', price: 150, stockQuantity: 10 },
  { id: 'prt-bear04', name: 'Engine Bearing', category: 'Bearings & Seals', price: 280, stockQuantity: 8 },
  { id: 'prt-bear05', name: 'Suspension Bush (Rear)', category: 'Bearings & Seals', price: 80, stockQuantity: 15 },
  { id: 'prt-bear06', name: 'Rubber Bush', category: 'Bearings & Seals', price: 50, stockQuantity: 20 },
  { id: 'prt-bear07', name: 'Oil Seal Set', category: 'Bearings & Seals', price: 60, stockQuantity: 20 },
  { id: 'prt-bear08', name: 'Dust Seal', category: 'Bearings & Seals', price: 50, stockQuantity: 20 },
  { id: 'prt-bear09', name: 'O-Ring Set', category: 'Bearings & Seals', price: 40, stockQuantity: 25 },
  { id: 'prt-bear10', name: 'Gasket (General)', category: 'Bearings & Seals', price: 60, stockQuantity: 20 },

  // 🧴 Service Consumables
  { id: 'prt-con01', name: 'Chain Lubricant Spray', category: 'Consumables', price: 190, stockQuantity: 14 },
  { id: 'prt-con02', name: 'Chain Cleaner Spray', category: 'Consumables', price: 160, stockQuantity: 12 },
  { id: 'prt-con03', name: 'Grease (Multi-purpose)', category: 'Consumables', price: 80, stockQuantity: 15 },
  { id: 'prt-con04', name: 'Contact Cleaner Spray', category: 'Consumables', price: 220, stockQuantity: 10 },
  { id: 'prt-con05', name: 'Carburetor Cleaner Spray', category: 'Consumables', price: 200, stockQuantity: 10 },
  { id: 'prt-con06', name: 'Thread Locker (Loctite)', category: 'Consumables', price: 120, stockQuantity: 10 },
  { id: 'prt-con07', name: 'Gasket Sealant (RTV)', category: 'Consumables', price: 150, stockQuantity: 10 },
  { id: 'prt-con08', name: 'Brake Fluid (DOT 4, 100ml)', category: 'Consumables', price: 120, stockQuantity: 15 },
  { id: 'prt-con09', name: 'Multipurpose Lubricant (WD-40)', category: 'Consumables', price: 180, stockQuantity: 12 },
  { id: 'prt-con10', name: 'Distilled Water (Battery)', category: 'Consumables', price: 30, stockQuantity: 20 },

  // 🔩 Small Hardware
  { id: 'prt-hw01', name: 'Nuts & Bolts Set (Assorted)', category: 'Hardware', price: 80, stockQuantity: 20 },
  { id: 'prt-hw02', name: 'Washers (Pack)', category: 'Hardware', price: 30, stockQuantity: 30 },
  { id: 'prt-hw03', name: 'Lock Nuts (Pack)', category: 'Hardware', price: 40, stockQuantity: 25 },
  { id: 'prt-hw04', name: 'Circlip Set', category: 'Hardware', price: 50, stockQuantity: 20 },
  { id: 'prt-hw05', name: 'Cotter Pins (Pack)', category: 'Hardware', price: 30, stockQuantity: 25 },
  { id: 'prt-hw06', name: 'Cable Ties (Pack)', category: 'Hardware', price: 40, stockQuantity: 20 },
  { id: 'prt-hw07', name: 'Hose Clamps (Pack)', category: 'Hardware', price: 60, stockQuantity: 15 },
  { id: 'prt-hw08', name: 'Rubber Caps / Grommets (Pack)', category: 'Hardware', price: 40, stockQuantity: 20 },
  { id: 'prt-hw09', name: 'Springs (Assorted)', category: 'Hardware', price: 50, stockQuantity: 20 },
];

export const partService = {
  getCached: (): SparePart[] => {
    const cached = storageService.get<SparePart[]>(STORAGE_KEY, []);
    if (cached && cached.length >= defaultParts.length) {
      return cached;
    }
    return defaultParts;
  },

  getAll: async (forceRefresh = false): Promise<SparePart[]> => {
    try {
      const res = await apiClient.get<{ success: boolean; data: any[] }>('/api/parts');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const list: SparePart[] = res.data.map((p: any) => ({
          ...p,
          price: Number(p.price) || 0,
          stockQuantity: Number(p.stockQuantity) || 0,
        }));
        storageService.set(STORAGE_KEY, list);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_parts_updated'));
        }
        return list;
      }
    } catch (err) {
      console.warn('Failed to fetch parts from API, checking local storage:', err);
    }
    const cached = storageService.get<SparePart[]>(STORAGE_KEY, []);
    if (!forceRefresh && cached && cached.length >= defaultParts.length) {
      return cached;
    }
    storageService.set(STORAGE_KEY, defaultParts);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_parts_updated'));
    }
    return defaultParts;
  },

  create: async (data: Omit<SparePart, 'id'>): Promise<SparePart> => {
    const existing = storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
    const newId = `prt-${Date.now()}`;
    const newPart: SparePart = {
      id: newId,
      ...data,
      price: Number(data.price) || 0,
      stockQuantity: Number(data.stockQuantity) || 0,
    };

    // Optimistically update local storage
    storageService.set(STORAGE_KEY, [...existing, newPart]);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_parts_updated'));
    }

    try {
      const res = await apiClient.post<{ success: boolean; data: any }>('/api/parts', data);
      if (res.success && res.data) {
        const created: SparePart = {
          ...res.data,
          price: Number(res.data.price) || 0,
          stockQuantity: Number(res.data.stockQuantity) || 0,
        };
        const current = storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
        storageService.set(
          STORAGE_KEY,
          current.map((p) => (p.id === newId ? created : p))
        );
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_parts_updated'));
        }
        return created;
      }
    } catch (err) {
      console.error('Failed to create part via API:', err);
    }

    return newPart;
  },

  update: async (id: string, data: Partial<SparePart>): Promise<SparePart> => {
    // 1. Optimistically update local cache
    const existing = storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
    const updatedLocal = existing.map((p) => (p.id === id ? { ...p, ...data } : p));
    storageService.set(STORAGE_KEY, updatedLocal);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_parts_updated'));
    }

    // 2. Persist to API
    try {
      const res = await apiClient.put<{ success: boolean; data: any }>(`/api/parts/${id}`, data);
      if (res.success && res.data) {
        const updated: SparePart = {
          ...res.data,
          price: Number(res.data.price) || 0,
          stockQuantity: Number(res.data.stockQuantity) || 0,
        };
        const current = storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
        storageService.set(
          STORAGE_KEY,
          current.map((p) => (p.id === id ? updated : p))
        );
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('chaudhari_parts_updated'));
        }
        return updated;
      }
    } catch (err) {
      console.error('Failed to update part via API:', err);
    }

    return updatedLocal.find((p) => p.id === id) || ({ id, ...data } as SparePart);
  },

  delete: async (id: string): Promise<boolean> => {
    const existing = storageService.get<SparePart[]>(STORAGE_KEY, defaultParts);
    storageService.set(
      STORAGE_KEY,
      existing.filter((p) => p.id !== id)
    );
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chaudhari_parts_updated'));
    }
    try {
      await apiClient.delete(`/api/parts/${id}`);
      return true;
    } catch (err) {
      console.warn('Failed to delete part on API:', err);
      return true;
    }
  },
};
