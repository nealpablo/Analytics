import { PCComponent } from './types';

export const COMPONENTS_DATABASE: PCComponent[] = [
  // ═══════════════════════════════════════
  // CPUs
  // ═══════════════════════════════════════

  // Budget Tier
  {
    id: 'cpu-athlon-3000g',
    name: 'AMD Athlon 3000G',
    category: 'cpu',
    prices: {
      USD: 55,
      PHP: 2500,
    },
    performance: 2,
    cores: 2,
    tdp: 35,
    compatibility: ['am4'],
  },
  {
    id: 'cpu-pentium-g7400',
    name: 'Intel Pentium Gold G7400',
    category: 'cpu',
    prices: {
      USD: 64,
      PHP: 5500,
    },
    performance: 3,
    cores: 2,
    tdp: 46,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-ryzen-3-4100',
    name: 'AMD Ryzen 3 4100',
    category: 'cpu',
    prices: {
      USD: 59,
      PHP: 3800,
    },
    performance: 4,
    cores: 4,
    tdp: 65,
    compatibility: ['am4'],
  },
  {
    id: 'cpu-i3-12100f',
    name: 'Intel Core i3-12100F',
    category: 'cpu',
    prices: {
      USD: 89,
      PHP: 5200,
    },
    performance: 5,
    cores: 4,
    tdp: 58,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-i3-13100f',
    name: 'Intel Core i3-13100F',
    category: 'cpu',
    prices: {
      USD: 109,
      PHP: 7900,
    },
    performance: 6,
    cores: 4,
    tdp: 58,
    compatibility: ['lga1700'],
  },

  // Mid Tier
  {
    id: 'cpu-ryzen-5600',
    name: 'AMD Ryzen 5 5600',
    category: 'cpu',
    prices: {
      USD: 119,
      PHP: 6200,
    },
    performance: 7,
    cores: 6,
    tdp: 65,
    compatibility: ['am4'],
  },
  {
    id: 'cpu-ryzen-5600x',
    name: 'AMD Ryzen 5 5600X',
    category: 'cpu',
    prices: {
      USD: 139,
      PHP: 8500,
    },
    performance: 7,
    cores: 6,
    tdp: 65,
    compatibility: ['am4'],
  },
  {
    id: 'cpu-i5-12400f',
    name: 'Intel Core i5-12400F',
    category: 'cpu',
    prices: {
      USD: 129,
      PHP: 7800,
    },
    performance: 7,
    cores: 6,
    tdp: 65,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-i5-13400f',
    name: 'Intel Core i5-13400F',
    category: 'cpu',
    prices: {
      USD: 189,
      PHP: 13500,
    },
    performance: 7,
    cores: 10,
    tdp: 65,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-ryzen-7600',
    name: 'AMD Ryzen 5 7600',
    category: 'cpu',
    prices: {
      USD: 199,
      PHP: 10500,
    },
    performance: 8,
    cores: 6,
    tdp: 65,
    compatibility: ['am5'],
  },
  {
    id: 'cpu-i5-13600k',
    name: 'Intel Core i5-13600K',
    category: 'cpu',
    prices: {
      USD: 279,
      PHP: 15800,
    },
    performance: 8,
    cores: 14,
    tdp: 125,
    compatibility: ['lga1700'],
  },

  // High Tier
  {
    id: 'cpu-ryzen-7-7700x',
    name: 'AMD Ryzen 7 7700X',
    category: 'cpu',
    prices: {
      USD: 299,
      PHP: 18500,
    },
    performance: 9,
    cores: 8,
    tdp: 105,
    compatibility: ['am5'],
  },
  {
    id: 'cpu-i7-13700k',
    name: 'Intel Core i7-13700K',
    category: 'cpu',
    prices: {
      USD: 369,
      PHP: 27000,
    },
    performance: 9,
    cores: 16,
    tdp: 253,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-ryzen-7-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    prices: {
      USD: 399,
      PHP: 19990,
    },
    performance: 10,
    cores: 8,
    tdp: 120,
    compatibility: ['am5'],
  },

  // Ultra Tier
  {
    id: 'cpu-ryzen-9-7950x',
    name: 'AMD Ryzen 9 7950X',
    category: 'cpu',
    prices: {
      USD: 549,
      PHP: 35000,
    },
    performance: 10,
    cores: 16,
    tdp: 170,
    compatibility: ['am5'],
  },
  {
    id: 'cpu-i9-13900k',
    name: 'Intel Core i9-13900K',
    category: 'cpu',
    prices: {
      USD: 549,
      PHP: 34000,
    },
    performance: 10,
    cores: 24,
    tdp: 253,
    compatibility: ['lga1700'],
  },
  {
    id: 'cpu-ryzen-9-7950x3d',
    name: 'AMD Ryzen 9 7950X3D',
    category: 'cpu',
    prices: {
      USD: 649,
      PHP: 39900,
    },
    performance: 10,
    cores: 16,
    tdp: 120,
    compatibility: ['am5'],
  },

  // Enthusiast Workstation
  {
    id: 'cpu-threadripper-7995wx',
    name: 'AMD Threadripper PRO 7995WX',
    category: 'cpu',
    prices: {
      USD: 9999,
      PHP: 620000,
    },
    performance: 15,
    cores: 96,
    tdp: 350,
    compatibility: ['trx50'],
  },

  // ═══════════════════════════════════════
  // GPUs
  // ═══════════════════════════════════════

  // Budget Tier
  {
    id: 'gpu-integrated',
    name: 'Integrated Graphics',
    category: 'gpu',
    prices: {
      USD: 0,
      PHP: 0,
    },
    performance: 1,
    vram: 'Shared',
    tdp: 0,
    compatibility: ['pcie3', 'pcie4'],
  },
  {
    id: 'gpu-arc-a380',
    name: 'Intel Arc A380',
    category: 'gpu',
    prices: {
      USD: 99,
      PHP: 5500,
    },
    performance: 2,
    vram: '6GB',
    tdp: 75,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rx-6500xt',
    name: 'AMD Radeon RX 6500 XT',
    category: 'gpu',
    prices: {
      USD: 109,
      PHP: 6800,
    },
    performance: 3,
    vram: '4GB',
    tdp: 107,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-gtx-1650',
    name: 'NVIDIA GTX 1650',
    category: 'gpu',
    prices: {
      USD: 139,
      PHP: 5500,
    },
    performance: 4,
    vram: '4GB',
    tdp: 75,
    compatibility: ['pcie3', 'pcie4'],
  },
  {
    id: 'gpu-rx-6600',
    name: 'AMD Radeon RX 6600',
    category: 'gpu',
    prices: {
      USD: 169,
      PHP: 10000,
    },
    performance: 5,
    vram: '8GB',
    tdp: 132,
    compatibility: ['pcie4'],
  },

  // Mid Tier
  {
    id: 'gpu-rx-7600',
    name: 'AMD Radeon RX 7600',
    category: 'gpu',
    prices: {
      USD: 269,
      PHP: 19500,
    },
    performance: 6,
    vram: '8GB',
    tdp: 165,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4060',
    name: 'NVIDIA RTX 4060',
    category: 'gpu',
    prices: {
      USD: 299,
      PHP: 21500,
    },
    performance: 6,
    vram: '8GB',
    tdp: 115,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4060ti',
    name: 'NVIDIA RTX 4060 Ti',
    category: 'gpu',
    prices: {
      USD: 399,
      PHP: 28000,
    },
    performance: 7,
    vram: '8GB',
    tdp: 160,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rx-7700xt',
    name: 'AMD Radeon RX 7700 XT',
    category: 'gpu',
    prices: {
      USD: 419,
      PHP: 29000,
    },
    performance: 7,
    vram: '12GB',
    tdp: 245,
    compatibility: ['pcie4'],
  },

  // High Tier
  {
    id: 'gpu-rx-7800xt',
    name: 'AMD Radeon RX 7800 XT',
    category: 'gpu',
    prices: {
      USD: 479,
      PHP: 32000,
    },
    performance: 8,
    vram: '16GB',
    tdp: 263,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4070',
    name: 'NVIDIA RTX 4070',
    category: 'gpu',
    prices: {
      USD: 549,
      PHP: 39000,
    },
    performance: 8,
    vram: '12GB',
    tdp: 200,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4070ti',
    name: 'NVIDIA RTX 4070 Ti',
    category: 'gpu',
    prices: {
      USD: 749,
      PHP: 45000,
    },
    performance: 8,
    vram: '12GB',
    tdp: 285,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rx-7900xtx',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'gpu',
    prices: {
      USD: 899,
      PHP: 60000,
    },
    performance: 9,
    vram: '24GB',
    tdp: 355,
    compatibility: ['pcie4'],
  },

  // Ultra Tier
  {
    id: 'gpu-rtx-4080super',
    name: 'NVIDIA RTX 4080 SUPER',
    category: 'gpu',
    prices: {
      USD: 999,
      PHP: 72000,
    },
    performance: 9,
    vram: '16GB',
    tdp: 320,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4080',
    name: 'NVIDIA RTX 4080',
    category: 'gpu',
    prices: {
      USD: 1099,
      PHP: 65000,
    },
    performance: 9,
    vram: '16GB',
    tdp: 320,
    compatibility: ['pcie4'],
  },
  {
    id: 'gpu-rtx-4090',
    name: 'NVIDIA RTX 4090',
    category: 'gpu',
    prices: {
      USD: 1599,
      PHP: 110000,
    },
    performance: 10,
    vram: '24GB',
    tdp: 450,
    compatibility: ['pcie4'],
  },

  // Enthusiast Workstation
  {
    id: 'gpu-2x-rtx-6000-ada',
    name: '2x NVIDIA RTX 6000 Ada',
    category: 'gpu',
    prices: {
      USD: 13600,
      PHP: 850000,
    },
    performance: 15,
    vram: '96GB',
    tdp: 600,
    compatibility: ['pcie4'],
  },

  // ═══════════════════════════════════════
  // RAM
  // ═══════════════════════════════════════

  // Budget DDR4
  {
    id: 'ram-8gb-ddr4',
    name: '8GB DDR4 3200MHz',
    category: 'ram',
    prices: {
      USD: 25,
      PHP: 1500,
    },
    performance: 3,
    memory: '8GB',
    compatibility: ['am4', 'lga1700'],
  },
  {
    id: 'ram-16gb-ddr4-3200',
    name: '16GB DDR4 3200MHz',
    category: 'ram',
    prices: {
      USD: 35,
      PHP: 3200,
    },
    performance: 5,
    memory: '16GB',
    compatibility: ['am4', 'lga1700'],
  },

  // Mid DDR4
  {
    id: 'ram-16gb-ddr4-3600',
    name: '16GB DDR4 3600MHz',
    category: 'ram',
    prices: {
      USD: 49,
      PHP: 2400,
    },
    performance: 6,
    memory: '16GB',
    compatibility: ['am4', 'lga1700'],
  },
  {
    id: 'ram-32gb-ddr4',
    name: '32GB DDR4 3600MHz',
    category: 'ram',
    prices: {
      USD: 79,
      PHP: 8500,
    },
    performance: 7,
    memory: '32GB',
    compatibility: ['am4', 'lga1700'],
  },

  // Mid DDR5
  {
    id: 'ram-16gb-ddr5-5600',
    name: '16GB DDR5 5600MHz',
    category: 'ram',
    prices: {
      USD: 49,
      PHP: 4500,
    },
    performance: 7,
    memory: '16GB',
    compatibility: ['am5', 'lga1700'],
  },
  {
    id: 'ram-16gb-ddr5-6000',
    name: '16GB DDR5 6000MHz',
    category: 'ram',
    prices: {
      USD: 59,
      PHP: 5000,
    },
    performance: 7,
    memory: '16GB',
    compatibility: ['am5', 'lga1700'],
  },

  // High DDR5
  {
    id: 'ram-32gb-ddr5-5600',
    name: '32GB DDR5 5600MHz',
    category: 'ram',
    prices: {
      USD: 79,
      PHP: 7500,
    },
    performance: 8,
    memory: '32GB',
    compatibility: ['am5', 'lga1700'],
  },
  {
    id: 'ram-32gb-ddr5-6000',
    name: '32GB DDR5 6000MHz',
    category: 'ram',
    prices: {
      USD: 99,
      PHP: 8500,
    },
    performance: 8,
    memory: '32GB',
    compatibility: ['am5', 'lga1700'],
  },
  {
    id: 'ram-64gb-ddr5-6000',
    name: '64GB DDR5 6000MHz',
    category: 'ram',
    prices: {
      USD: 179,
      PHP: 16000,
    },
    performance: 10,
    memory: '64GB',
    compatibility: ['am5', 'lga1700'],
  },
  {
    id: 'ram-128gb-ddr5-5600',
    name: '128GB DDR5 5600MHz',
    category: 'ram',
    prices: {
      USD: 399,
      PHP: 35000,
    },
    performance: 10,
    memory: '128GB',
    compatibility: ['am5', 'lga1700'],
  },

  // Enthusiast Workstation
  {
    id: 'ram-256gb-ecc',
    name: '256GB DDR5 ECC Registered',
    category: 'ram',
    prices: {
      USD: 1199,
      PHP: 75000,
    },
    performance: 15,
    memory: '256GB',
    compatibility: ['trx50'],
  },

  // ═══════════════════════════════════════
  // Storage
  // ═══════════════════════════════════════

  // Budget
  {
    id: 'storage-ssd-128gb',
    name: '128GB SATA SSD',
    category: 'storage',
    prices: {
      USD: 15,
      PHP: 550,
    },
    performance: 4,
    storage: '128GB',
    compatibility: ['sata'],
  },
  {
    id: 'storage-ssd-256gb',
    name: '256GB NVMe SSD',
    category: 'storage',
    prices: {
      USD: 25,
      PHP: 1100,
    },
    performance: 6,
    storage: '256GB',
    compatibility: ['m2'],
  },
  {
    id: 'storage-ssd-500gb',
    name: '500GB NVMe SSD',
    category: 'storage',
    prices: {
      USD: 39,
      PHP: 1800,
    },
    performance: 7,
    storage: '500GB',
    compatibility: ['m2'],
  },

  // Mid
  {
    id: 'storage-ssd-1tb',
    name: '1TB NVMe SSD',
    category: 'storage',
    prices: {
      USD: 59,
      PHP: 4500,
    },
    performance: 8,
    storage: '1TB',
    compatibility: ['m2'],
  },
  {
    id: 'storage-ssd-1tb-gen4',
    name: '1TB Gen4 NVMe SSD',
    category: 'storage',
    prices: {
      USD: 79,
      PHP: 6500,
    },
    performance: 9,
    storage: '1TB',
    compatibility: ['m2'],
  },

  // High
  {
    id: 'storage-ssd-2tb',
    name: '2TB NVMe SSD',
    category: 'storage',
    prices: {
      USD: 109,
      PHP: 8500,
    },
    performance: 8,
    storage: '2TB',
    compatibility: ['m2'],
  },
  {
    id: 'storage-ssd-2tb-gen4',
    name: '2TB Gen4 NVMe SSD',
    category: 'storage',
    prices: {
      USD: 149,
      PHP: 12500,
    },
    performance: 9,
    storage: '2TB',
    compatibility: ['m2'],
  },
  {
    id: 'storage-ssd-4tb',
    name: '4TB NVMe SSD',
    category: 'storage',
    prices: {
      USD: 279,
      PHP: 18000,
    },
    performance: 9,
    storage: '4TB',
    compatibility: ['m2'],
  },

  // Enthusiast Workstation
  {
    id: 'storage-4x-4tb-gen5',
    name: '16TB (4x4TB) Gen5 NVMe RAID',
    category: 'storage',
    prices: {
      USD: 1599,
      PHP: 100000,
    },
    performance: 15,
    storage: '16TB',
    compatibility: ['m2'],
  },

  // ═══════════════════════════════════════
  // Motherboards
  // ═══════════════════════════════════════

  // Budget
  {
    id: 'mobo-a520m',
    name: 'MSI A520M-A PRO',
    category: 'motherboard',
    prices: {
      USD: 59,
      PHP: 3200,
    },
    performance: 3,
    formFactor: 'mATX',
    compatibility: ['am4'],
  },
  {
    id: 'mobo-h610m',
    name: 'Gigabyte H610M S2H',
    category: 'motherboard',
    prices: {
      USD: 69,
      PHP: 3800,
    },
    performance: 4,
    formFactor: 'mATX',
    compatibility: ['lga1700'],
  },
  {
    id: 'mobo-b450m',
    name: 'MSI B450M PRO-VDH MAX',
    category: 'motherboard',
    prices: {
      USD: 79,
      PHP: 4200,
    },
    performance: 5,
    formFactor: 'mATX',
    compatibility: ['am4'],
  },

  // Mid
  {
    id: 'mobo-b550',
    name: 'MSI B550-A PRO',
    category: 'motherboard',
    prices: {
      USD: 119,
      PHP: 6500,
    },
    performance: 7,
    formFactor: 'ATX',
    compatibility: ['am4'],
  },
  {
    id: 'mobo-b660',
    name: 'MSI PRO B660M-A',
    category: 'motherboard',
    prices: {
      USD: 109,
      PHP: 5800,
    },
    performance: 6,
    formFactor: 'mATX',
    compatibility: ['lga1700'],
  },
  {
    id: 'mobo-b760',
    name: 'MSI PRO B760-A EDGE',
    category: 'motherboard',
    prices: {
      USD: 169,
      PHP: 9500,
    },
    performance: 7,
    formFactor: 'ATX',
    compatibility: ['lga1700'],
  },
  {
    id: 'mobo-b650',
    name: 'ASUS TUF GAMING B650-PLUS',
    category: 'motherboard',
    prices: {
      USD: 189,
      PHP: 10500,
    },
    performance: 8,
    formFactor: 'ATX',
    compatibility: ['am5'],
  },

  // High
  {
    id: 'mobo-z690',
    name: 'ASUS ROG STRIX Z690-A',
    category: 'motherboard',
    prices: {
      USD: 289,
      PHP: 19000,
    },
    performance: 9,
    formFactor: 'ATX',
    compatibility: ['lga1700'],
  },
  {
    id: 'mobo-x670',
    name: 'ASUS ROG STRIX X670E-E',
    category: 'motherboard',
    prices: {
      USD: 379,
      PHP: 24000,
    },
    performance: 9,
    formFactor: 'ATX',
    compatibility: ['am5'],
  },
  {
    id: 'mobo-z790',
    name: 'ASUS ROG MAXIMUS Z790 HERO',
    category: 'motherboard',
    prices: {
      USD: 599,
      PHP: 35000,
    },
    performance: 10,
    formFactor: 'ATX',
    compatibility: ['lga1700'],
  },

  // Enthusiast Workstation
  {
    id: 'mobo-wrx90',
    name: 'ASUS Pro WS WRX90E-SAGE SE',
    category: 'motherboard',
    prices: {
      USD: 1299,
      PHP: 82000,
    },
    performance: 15,
    formFactor: 'E-ATX',
    compatibility: ['trx50'],
  },

  // ═══════════════════════════════════════
  // Power Supplies
  // ═══════════════════════════════════════

  // Budget
  {
    id: 'psu-400w',
    name: '400W 80+ White PSU',
    category: 'psu',
    prices: {
      USD: 25,
      PHP: 1200,
    },
    performance: 3,
    compatibility: ['atx'],
  },
  {
    id: 'psu-450w',
    name: '450W 80+ White PSU',
    category: 'psu',
    prices: {
      USD: 30,
      PHP: 1500,
    },
    performance: 4,
    compatibility: ['atx'],
  },
  {
    id: 'psu-500w-bronze',
    name: '500W 80+ Bronze PSU',
    category: 'psu',
    prices: {
      USD: 45,
      PHP: 2200,
    },
    performance: 5,
    compatibility: ['atx'],
  },

  // Mid
  {
    id: 'psu-550w-bronze',
    name: '550W 80+ Bronze PSU',
    category: 'psu',
    prices: {
      USD: 55,
      PHP: 2500,
    },
    performance: 6,
    compatibility: ['atx'],
  },
  {
    id: 'psu-650w-bronze',
    name: '650W 80+ Bronze PSU',
    category: 'psu',
    prices: {
      USD: 59,
      PHP: 2800,
    },
    performance: 6,
    compatibility: ['atx'],
  },
  {
    id: 'psu-650w-gold',
    name: '650W 80+ Gold PSU',
    category: 'psu',
    prices: {
      USD: 79,
      PHP: 4200,
    },
    performance: 7,
    compatibility: ['atx'],
  },
  {
    id: 'psu-750w-gold',
    name: '750W 80+ Gold PSU',
    category: 'psu',
    prices: {
      USD: 89,
      PHP: 5000,
    },
    performance: 7,
    compatibility: ['atx'],
  },

  // High
  {
    id: 'psu-850w-gold',
    name: '850W 80+ Gold PSU',
    category: 'psu',
    prices: {
      USD: 119,
      PHP: 6500,
    },
    performance: 8,
    compatibility: ['atx'],
  },
  {
    id: 'psu-1000w-gold',
    name: '1000W 80+ Gold PSU',
    category: 'psu',
    prices: {
      USD: 159,
      PHP: 9500,
    },
    performance: 9,
    compatibility: ['atx'],
  },
  {
    id: 'psu-1000w',
    name: '1000W 80+ Platinum PSU',
    category: 'psu',
    prices: {
      USD: 199,
      PHP: 19500,
    },
    performance: 10,
    compatibility: ['atx'],
  },
  {
    id: 'psu-1200w-plat',
    name: '1200W 80+ Platinum PSU',
    category: 'psu',
    prices: {
      USD: 249,
      PHP: 26000,
    },
    performance: 10,
    compatibility: ['atx'],
  },

  // Enthusiast Workstation
  {
    id: 'psu-1600w',
    name: '1600W 80+ Titanium PSU',
    category: 'psu',
    prices: {
      USD: 599,
      PHP: 40000,
    },
    performance: 15,
    compatibility: ['atx'],
  },

  // ═══════════════════════════════════════
  // Cases
  // ═══════════════════════════════════════

  // Budget
  {
    id: 'case-keytech-t100',
    name: 'Keytech T100',
    category: 'case',
    prices: {
      USD: 20,
      PHP: 850,
    },
    performance: 2,
    formFactor: 'mATX',
    compatibility: ['matx', 'itx'],
  },
  {
    id: 'case-versa-h17',
    name: 'Thermaltake Versa H17',
    category: 'case',
    prices: {
      USD: 35,
      PHP: 2800,
    },
    performance: 3,
    formFactor: 'mATX',
    compatibility: ['matx', 'itx'],
  },
  {
    id: 'case-cougar-mx330',
    name: 'Cougar MX330-G',
    category: 'case',
    prices: {
      USD: 45,
      PHP: 3200,
    },
    performance: 4,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-deepcool-cc560',
    name: 'DeepCool CC560',
    category: 'case',
    prices: {
      USD: 55,
      PHP: 3300,
    },
    performance: 5,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },

  // Mid
  {
    id: 'case-focus-g',
    name: 'Fractal Design Focus G',
    category: 'case',
    prices: {
      USD: 65,
      PHP: 4200,
    },
    performance: 6,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-4000d',
    name: 'Corsair 4000D Airflow',
    category: 'case',
    prices: {
      USD: 99,
      PHP: 5800,
    },
    performance: 7,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-h510-flow',
    name: 'NZXT H510 Flow',
    category: 'case',
    prices: {
      USD: 109,
      PHP: 6500,
    },
    performance: 7,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-nr200p',
    name: 'Cooler Master NR200P',
    category: 'case',
    prices: {
      USD: 99,
      PHP: 5800,
    },
    performance: 7,
    formFactor: 'ITX',
    compatibility: ['itx'],
  },

  // High
  {
    id: 'case-lianli-o11',
    name: 'Lian Li O11 Dynamic EVO',
    category: 'case',
    prices: {
      USD: 159,
      PHP: 11500,
    },
    performance: 9,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-torrent',
    name: 'Fractal Design Torrent',
    category: 'case',
    prices: {
      USD: 189,
      PHP: 14500,
    },
    performance: 10,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-h9-elite',
    name: 'NZXT H9 Elite',
    category: 'case',
    prices: {
      USD: 229,
      PHP: 13500,
    },
    performance: 9,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
  {
    id: 'case-5000t-rgb',
    name: 'Corsair 5000T RGB',
    category: 'case',
    prices: {
      USD: 299,
      PHP: 17500,
    },
    performance: 9,
    formFactor: 'ATX',
    compatibility: ['atx', 'matx', 'itx'],
  },
];

export function getComponentsByCategory(
  category: string
): PCComponent[] {
  return COMPONENTS_DATABASE.filter(
    (component) => component.category === category
  );
}

export function getComponentById(id: string): PCComponent | undefined {
  return COMPONENTS_DATABASE.find((component) => component.id === id);
}
