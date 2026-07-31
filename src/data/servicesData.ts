import { HandymanService, ServiceCategory } from '../types';

export const HANDYMAN_SERVICES: HandymanService[] = [
  // DRYWALL & WALLS
  {
    id: 'drywall-repair',
    title: 'Drywall Repair & Patching',
    category: 'Drywall & Walls',
    shortDescription: 'Repair holes, cracks, water damage, stress cracks, and pop-outs with smooth texture matching.',
    fullDescription: 'Comprehensive drywall repair service for interior walls and ceilings. We cut out damaged sections, install backing boards, apply drywall tape, mud, sand, and texture match to blend seamlessly with existing surfaces.',
    estimatedPriceMin: 120,
    estimatedPriceMax: 280,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: true,
    includedTasks: [
      'Hole patching & mesh taping',
      'Joint compound smoothing & sanding',
      'Texture matching (knockdown, orange peel, smooth)',
      'Primer application on patched area'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&w=800&q=80',
    keywords: ['Drywall repair', 'Drywall', 'Repair Jobs', 'Repair Needs', 'Handyman Repair', 'General Home Repair']
  },
  {
    id: 'drywall-installation',
    title: 'Drywall Installation',
    category: 'Drywall & Walls',
    shortDescription: 'Full sheet drywall hanging, taping, mudding, and finishing for rooms, basements, or garages.',
    fullDescription: 'Professional drywall hanging for new construction, wall partitioning, basement finishing, or room renovations. Includes precise measuring, cutting around outlets, screw fastening, corner bead installation, and multi-coat mudding.',
    estimatedPriceMin: 350,
    estimatedPriceMax: 950,
    pricingType: 'flat',
    estimatedHours: '4 - 8 hrs',
    popular: false,
    includedTasks: [
      'Sheetrock measurement and hanging',
      'Moisture-resistant board for baths/kitchens',
      'Corner bead & joint tape installation',
      'Three-coat mudding and fine sanding'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    keywords: ['Drywall installation', 'Drywall', 'Renovation Jobs', 'Remodeling Working']
  },
  {
    id: 'siding-repair-install',
    title: 'Siding Repair & Installation',
    category: 'Drywall & Walls',
    shortDescription: 'Vinyl, wood, and composite siding repair, board replacement, and section installations.',
    fullDescription: 'Fix cracked, loose, or weather-damaged exterior siding. We replace damaged panels, secure flashing, seal gaps, and protect your home envelope against moisture infiltration.',
    estimatedPriceMin: 180,
    estimatedPriceMax: 550,
    pricingType: 'flat',
    estimatedHours: '2 - 5 hrs',
    popular: false,
    includedTasks: [
      'Damaged siding panel removal',
      'Sub-fascia & house wrap moisture check',
      'New siding installation & trim fitting',
      'Caulking and weatherproofing seals'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    keywords: ['Siding', 'Exterior Maintenance', 'Property Maintenance Services', 'Home Repair And Maintenance']
  },

  // PAINTING
  {
    id: 'interior-painting',
    title: 'Interior Painting Services',
    category: 'Painting',
    shortDescription: 'Precision wall, ceiling, trim, baseboard, and door painting with premium zero-VOC paints.',
    fullDescription: 'Transform your living spaces with meticulous interior painting. Includes wall preparation, nail hole filling, masking floors/furniture, crisp edging lines, and two full coats of premium paint.',
    estimatedPriceMin: 150,
    estimatedPriceMax: 650,
    pricingType: 'flat',
    estimatedHours: '3 - 8 hrs',
    popular: true,
    includedTasks: [
      'Furniture protection & drop cloth setup',
      'Wall prep, hole filling & sanding',
      'Trim, baseboard, & crown molding masking',
      'Two coats of premium low-VOC paint'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    keywords: ['Interior painting', 'Painting', 'Handyman Painting', 'Interior And Exterior Painting Services']
  },
  {
    id: 'outdoor-painting',
    title: 'Outdoor & Exterior Painting',
    category: 'Painting',
    shortDescription: 'Weather-resistant painting for decks, fences, doors, trim, shutters, and exterior walls.',
    fullDescription: 'Durable exterior painting and staining engineered to withstand harsh weather. We prep surfaces by scraping loose paint, power washing, caulking seams, priming bare surfaces, and applying exterior-grade coatings.',
    estimatedPriceMin: 220,
    estimatedPriceMax: 850,
    pricingType: 'flat',
    estimatedHours: '4 - 10 hrs',
    popular: false,
    includedTasks: [
      'Surface scraping & loose paint removal',
      'Exterior sealant & caulking application',
      'High-durability UV & water resistant paint/stain',
      'Deck, fence, or trim detailing'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    keywords: ['Outdoor Painting', 'Painting', 'Handyman Painting', 'Interior And Exterior Painting Services']
  },

  // PLUMBING & FIXTURES
  {
    id: 'plumbing-fixture-installation',
    title: 'Plumbing Fixture Installation',
    category: 'Plumbing & Fixtures',
    shortDescription: 'Faucets, sinks, showerheads, garbage disposals, toilets, and valve installations.',
    fullDescription: 'Upgrade your bathroom and kitchen with new plumbing fixtures installed safely without leaks. We handle supply line hookups, drain connections, p-trap alignment, and silicone sealing.',
    estimatedPriceMin: 110,
    estimatedPriceMax: 320,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: true,
    includedTasks: [
      'Old fixture removal & eco disposal',
      'New faucet, sink, or toilet mounting',
      'Supply line & shut-off valve inspection',
      'Leak testing and silicone perimeter seal'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    keywords: ['Plumbing fixture installation', 'Plumbing', 'Installing Fixtures', 'Installation And Repair', 'Bathroom And Kitchen']
  },
  {
    id: 'plumbing-issues-repair',
    title: 'Plumbing Repair & Leak Fixing',
    category: 'Plumbing & Fixtures',
    shortDescription: 'Fix running toilets, dripping faucets, leaky pipes, clogged drains, and garbage disposals.',
    fullDescription: 'Fast relief for common household plumbing issues. We diagnose leaks, replace worn flappers or cartridges, clear clogged drains, and repair minor pipe fittings.',
    estimatedPriceMin: 95,
    estimatedPriceMax: 260,
    pricingType: 'hourly',
    estimatedHours: '1 - 2 hrs',
    popular: true,
    includedTasks: [
      'Leak diagnosis & pressure check',
      'Toilet fill valve & flapper replacement',
      'P-trap cleanout & snaking',
      'Garbage disposal jam clearance or replacement'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    keywords: ['Plumbing', 'Electrical Issues', 'Handyman Repair', 'Repair Jobs', 'Repair Needs']
  },

  // ELECTRICAL & MOUNTING
  {
    id: 'tv-mounting',
    title: 'TV Mounting & Wall Anchoring',
    category: 'Electrical & Mounting',
    shortDescription: 'Secure TV mounting into studs or drywall with wire hiding, soundbar installation, and shelf leveling.',
    fullDescription: 'Safe, ultra-sturdy mounting for screens from 32" to 85"+ on standard drywall, brick, or concrete. We locate studs, test wall stability, align levels, and neatly conceal cables inside wall or surface raceways.',
    estimatedPriceMin: 89,
    estimatedPriceMax: 195,
    pricingType: 'flat',
    estimatedHours: '1 - 2 hrs',
    popular: true,
    includedTasks: [
      'Wall stud detection & weight capacity check',
      'Fixed, tilting, or full-motion bracket setup',
      'TV securing & precision leveling',
      'In-wall or external cord concealment'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    keywords: ['TV mounting', 'General Mounting', 'Installing Fixtures', 'Installation And Repair']
  },
  {
    id: 'electrical-work-repair',
    title: 'Electrical Repairs & Light Fixtures',
    category: 'Electrical & Mounting',
    shortDescription: 'Replace light fixtures, ceiling fans, outlets, switches, dimmers, and smart doorbells.',
    fullDescription: 'Safe handyman electrical solutions for everyday fixtures. Replace dated switches with dimmers, install ceiling fans, replace light pendants, add USB outlets, and troubleshoot dead sockets.',
    estimatedPriceMin: 95,
    estimatedPriceMax: 290,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: true,
    includedTasks: [
      'Circuit breaker safety shutoff & voltage testing',
      'Ceiling fan, chandelier, or flush mount installation',
      'Outlet, GFCI, & dimmer switch upgrades',
      'Smart home camera & doorbell wiring'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    keywords: ['Electrical work', 'Electrical Issues', 'Installing Fixtures', 'Installation And Repair']
  },
  {
    id: 'general-mounting',
    title: 'General Mounting & Hanging Services',
    category: 'Electrical & Mounting',
    shortDescription: 'Hang heavy mirrors, artwork, floating shelves, curtain rods, blinds, and heavy wall decor.',
    fullDescription: 'Keep your walls intact and your valuables secure. We use heavy-duty wall anchors, toggle bolts, and stud fastening to hang gallery walls, large mirrors, drapery hardware, and shelving.',
    estimatedPriceMin: 75,
    estimatedPriceMax: 175,
    pricingType: 'flat',
    estimatedHours: '1 - 2 hrs',
    popular: false,
    includedTasks: [
      'Stud finding & laser leveling',
      'Heavy mirror & art installation',
      'Curtain rod & window blind anchoring',
      'Floating shelf bracket installation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    keywords: ['General Mounting', 'Installing Fixtures', 'Handyman Assist']
  },

  // FLOORING & CONCRETE
  {
    id: 'install-flooring',
    title: 'Flooring Installation (LVP, Hardwood, Tile)',
    category: 'Flooring & Concrete',
    shortDescription: 'Luxury vinyl plank (LVP), laminate, tile, and wood flooring laying with baseboard installation.',
    fullDescription: 'Complete flooring transformation. We prep subfloors, lay underlayment, interlock plank systems, make complex cuts around door frames, and finish with quarter-round and baseboard trim.',
    estimatedPriceMin: 300,
    estimatedPriceMax: 1200,
    pricingType: 'sqft',
    estimatedHours: '4 - 12 hrs',
    popular: true,
    includedTasks: [
      'Subfloor leveling & underlayment roll out',
      'Interlocking LVP / laminate plank laying',
      'Threshold transition strip fitting',
      'Baseboard & shoe molding re-installation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    keywords: ['Install flooring', 'Flooring', 'Renovation Jobs', 'Remodeling Working']
  },
  {
    id: 'repair-flooring',
    title: 'Flooring Repair & Board Replacement',
    category: 'Flooring & Concrete',
    shortDescription: 'Fix scratched, warped, squeaky, or damaged hardwood, laminate, tile, and LVP floors.',
    fullDescription: 'Targeted flooring repairs to save you money on replacement. We fix loose floorboards, eliminate annoying floor squeaks, swap damaged planks, and repair cracked ceramic tiles.',
    estimatedPriceMin: 125,
    estimatedPriceMax: 340,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: false,
    includedTasks: [
      'Individual board cut-out & replacement',
      'Subfloor fastener tightening (squeak removal)',
      'Grout repair & tile replacement',
      'Seam re-bonding & color matching'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80',
    keywords: ['Flooring repair', 'Repair flooring', 'Flooring', 'Handyman Repair', 'Repair Jobs']
  },
  {
    id: 'concrete-work',
    title: 'Concrete Repair & Small Masonry',
    category: 'Flooring & Concrete',
    shortDescription: 'Repair walkway cracks, step masonry, driveway patching, and concrete sealing.',
    fullDescription: 'Durable repairs for outdoor concrete structures. We clean out cracks, apply hydraulic mortar or epoxy fillers, level uneven step edges, and apply protective sealant.',
    estimatedPriceMin: 175,
    estimatedPriceMax: 480,
    pricingType: 'flat',
    estimatedHours: '2 - 5 hrs',
    popular: false,
    includedTasks: [
      'Concrete crack routing & pressure cleanout',
      'High-strength polymer concrete patching',
      'Step corner reconstruction',
      'Penetrating waterproof concrete sealant'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    keywords: ['Concrete Work', 'Home Repair And Maintenance', 'Property Upkeep']
  },

  // CARPENTRY & ASSEMBLY & REMODELING
  {
    id: 'cabinet-installation',
    title: 'Cabinet Installation & Hardware Upgrade',
    category: 'Carpentry & Assembly',
    shortDescription: 'Upper & lower cabinet hanging, vanity mounting, hinge adjustment, and knob/handle installation.',
    fullDescription: 'Precision cabinet mounting for kitchen, bath, garage, or laundry. We ensure perfectly level alignment, secure stud anchoring, soft-close hinge adjustments, and hardware drilling.',
    estimatedPriceMin: 220,
    estimatedPriceMax: 750,
    pricingType: 'flat',
    estimatedHours: '3 - 7 hrs',
    popular: true,
    includedTasks: [
      'Wall stud layout & laser leveling',
      'Upper & lower cabinet anchoring',
      'Face frame joining & filler strip trimming',
      'Handle, pull, and soft-close hinge hardware'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    keywords: ['Cabinet Installation', 'Kitchen Renovation', 'Bathroom And Kitchen', 'Remodeling Working']
  },
  {
    id: 'furniture-assembly',
    title: 'Furniture Assembly Services',
    category: 'Carpentry & Assembly',
    shortDescription: 'Assembly of IKEA, Wayfair, Amazon beds, desks, dressers, bookcases, and outdoor patio sets.',
    fullDescription: 'Save hours of frustration. Our handymen quickly unpack, organize components, assemble sturdy furniture following manufacturer specs, and anchor heavy pieces to the wall for child safety.',
    estimatedPriceMin: 65,
    estimatedPriceMax: 195,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: true,
    includedTasks: [
      'Hardware sorting & inventory verification',
      'Full frame & drawer assembly',
      'Anti-tip wall safety strap installation',
      'Packaging cardboard breakdown'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    keywords: ['Furniture Assembly', 'Handyman Assist', 'General Home Repair']
  },
  {
    id: 'kitchen-bathroom-remodeling',
    title: 'Kitchen & Bathroom Renovation Assist',
    category: 'Carpentry & Assembly',
    shortDescription: 'Backsplash tiling, vanity replacement, fixture upgrades, mirror installation, and complete mini-renovations.',
    fullDescription: 'Cost-effective kitchen and bath updates without the full general contractor markup. We install new vanities, tile subway backsplashes, swap hardware, upgrade mirrors, and re-caulk tubs/showers.',
    estimatedPriceMin: 350,
    estimatedPriceMax: 1500,
    pricingType: 'flat',
    estimatedHours: '4 - 16 hrs',
    popular: true,
    includedTasks: [
      'Subway tile or mosaic backsplash installation',
      'Vanity, faucet, and mirror installation',
      'Waterproof tub/shower silicone caulking',
      'Hardware, lighting, & exhaust fan upgrades'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    keywords: ['Bathroom And Kitchen', 'Kitchen Renovation', 'Remodeling Working', 'Renovation Jobs']
  },

  // GENERAL MAINTENANCE & REPAIRS
  {
    id: 'general-repairs-maintenance',
    title: 'General Home Maintenance & Repairs',
    category: 'General Maintenance & Remodeling',
    shortDescription: 'Half-day or full-day handyman tackle list for all minor home repair needs.',
    fullDescription: 'Have a long list of odd jobs? Let our skilled local handyman cross off all your household repair needs in a single visit. Great for honey-do lists, pre-sale tune-ups, and seasonal home maintenance.',
    estimatedPriceMin: 140,
    estimatedPriceMax: 450,
    pricingType: 'hourly',
    estimatedHours: '2 - 6 hrs',
    popular: true,
    includedTasks: [
      'Door latch adjustment & deadbolt installation',
      'Weatherstripping & draft sealing',
      'Grout touch-ups & caulking refresh',
      'Custom repair list completion'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    keywords: ['General repairs', 'Home maintenance & repairs', 'General Home Repair', 'Handyman Repair', 'Home Repair And Maintenance', 'Local Handyman', 'Handyman Assist', 'Property Upkeep', 'Property Maintenance Services', 'Repair Jobs', 'Repair Needs']
  },
  {
    id: 'pressure-washing-cleaning',
    title: 'Pressure Washing & Exterior Cleanup',
    category: 'General Maintenance & Remodeling',
    shortDescription: 'Deep cleaning for driveways, decks, patios, siding, walkways, and fences.',
    fullDescription: 'Blast away grime, mold, mildew, and oil stains. Restore curb appeal to your property with controlled high-pressure washing for concrete, pavers, vinyl siding, and wood decks.',
    estimatedPriceMin: 130,
    estimatedPriceMax: 320,
    pricingType: 'flat',
    estimatedHours: '2 - 4 hrs',
    popular: false,
    includedTasks: [
      'Biodegradable eco-cleaner pre-soak',
      'High-PSI deck, patio, or driveway wash',
      'Vinyl siding soft wash (gentle rinse)',
      'Walkway algae & dirt removal'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    keywords: ['Pressure Washing', 'Property Upkeep', 'Property Maintenance Services', 'Rubbish Removal']
  },
  {
    id: 'rubbish-removal-hauling',
    title: 'Rubbish Removal & Debris Hauling',
    category: 'General Maintenance & Remodeling',
    shortDescription: 'Haul away renovation debris, old appliances, yard waste, packaging, and unwanted furniture.',
    fullDescription: 'Fast clutter clearing and disposal. We heavy-lift packaging boxes, broken appliances, renovation waste, and yard debris directly onto our truck for eco-friendly recycling and disposal.',
    estimatedPriceMin: 95,
    estimatedPriceMax: 290,
    pricingType: 'flat',
    estimatedHours: '1 - 3 hrs',
    popular: false,
    includedTasks: [
      'Debris & trash bagging / loading',
      'Appliance & furniture heavy lifting',
      'Sweep clean of job area',
      'Responsible recycling & landfill disposal'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    keywords: ['Rubbish Removal', 'Property Upkeep', 'Handyman Assist', 'Property Maintenance Services']
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Drywall & Walls',
  'Painting',
  'Plumbing & Fixtures',
  'Electrical & Mounting',
  'Flooring & Concrete',
  'Carpentry & Assembly',
  'General Maintenance & Remodeling'
];
