import { Review, BeforeAfterProject } from '../types';

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Marcus Vance',
    location: 'Westside Neighborhood',
    rating: 5,
    date: '2 days ago',
    serviceName: 'Drywall Repair & Painting',
    comment: 'One Stop Shop Handyman saved my wall after a plumbing pipe repair left a huge 2x3ft hole. The drywall patch and texture match were so seamless you literally cannot tell where the hole used to be. Extremely clean and professional!',
    verified: true
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    location: 'Oakridge',
    rating: 5,
    date: '1 week ago',
    serviceName: 'TV Mounting & Light Fixtures',
    comment: 'Booked online in less than 2 minutes! The craftsman arrived right on time with all the proper tools, mounted our 75-inch OLED TV flush to the wall, hid all cords, and installed 2 new dining pendants. 10/10 service!',
    verified: true
  },
  {
    id: '3',
    author: 'David & Ellen Sterling',
    location: 'Pine Crest',
    rating: 5,
    date: '2 weeks ago',
    serviceName: 'Luxury Vinyl Plank Flooring Install',
    comment: 'Replaced 400 sq ft of old carpet with LVP flooring. They completed the work in a single day, trimmed all baseboards meticulously, and hauled away the old carpet. Honest upfront pricing with zero hidden fees.',
    verified: true
  },
  {
    id: '4',
    author: 'Rachel Ruiz',
    location: 'Highland Park',
    rating: 5,
    date: '3 weeks ago',
    serviceName: 'Bathroom Vanity & Plumbing',
    comment: 'Installed a new double-sink bathroom vanity and replaced the faucets and shutoff valves. Their attention to detail and leak testing gave me total peace of mind. Will definitely use them for future repairs!',
    verified: true
  }
];

export const BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: 'ba-1',
    title: 'Water Damaged Ceiling & Drywall Repair',
    category: 'Drywall & Painting',
    description: 'Cut out soft water-damaged sheetrock, installed mold-resistant backing, mudded 3 coats, applied orange peel texture match, and repainted ceiling.',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    duration: '3.5 hours'
  },
  {
    id: 'ba-2',
    title: 'Kitchen Cabinet & Backsplash Renovation',
    category: 'Kitchen & Cabinets',
    description: 'Installed modern subway tile backsplash, hung new upper cabinet section, adjusted soft-close hinges, and installed matte black door pulls.',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    duration: '6 hours'
  },
  {
    id: 'ba-3',
    title: 'LVP Flooring Replacement & Trim Work',
    category: 'Flooring',
    description: 'Removed damaged worn laminate, prepped subfloor with leveling underlayment, installed waterproof LVP flooring with fresh white quarter-round trim.',
    beforeImg: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80',
    duration: '1 day'
  }
];

export const FAQS = [
  {
    question: 'How does your instant scheduling work?',
    answer: 'Simply select the service(s) you need, pick a convenient date and morning/afternoon time slot, and provide your property details. You get immediate online booking confirmation with a reference number and a calendar invite download.'
  },
  {
    question: 'Are your handymen licensed, background-checked, and insured?',
    answer: 'Yes! Every craftsman on the One Stop Shop team is fully background checked, vetted, bonded, and backed by our $2,000,000 general liability insurance policy for your peace of mind.'
  },
  {
    question: 'Do I need to supply the materials or do you provide them?',
    answer: 'We supply all standard professional tools, fasteners, drywall patch compounds, caulking, and general supplies. For specific items like light fixtures, ceiling fans, faucets, or paint colors, you can supply them or ask us to purchase them on your behalf (with itemized receipt).'
  },
  {
    question: 'Is there a minimum service fee or diagnostic fee?',
    answer: 'We provide clear upfront pricing. Most single jobs have flat transparent rates. If you need multiple small repairs done, our hourly rates or half-day handyman packages give you the best value.'
  },
  {
    question: 'What if I need emergency or same-day repair assistance?',
    answer: 'We reserve emergency time slots every day for urgent plumbing leaks, broken locks, or electrical outages. Click the "Request Emergency Callback" button or call us directly at (555) 382-4263.'
  }
];
