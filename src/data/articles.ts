export interface MaterialColor {
  name: string;
  hex: string;
  material: string;
}

export interface ArticleChapter {
  id: string;
  title: string;
  content: string[];
  pullQuote?: string;
  imageDetail?: {
    url: string;
    caption: string;
    architectOrStudio?: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  category: 'Architecture' | 'Materials' | 'Millwork' | 'Lighting' | 'Philosophy';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    location: string;
  };
  featuredImage: {
    url: string;
    fallbackUrl: string;
    alt: string;
    caption: string;
    credit: string;
  };
  palette: MaterialColor[];
  specifications: {
    label: string;
    value: string;
  }[];
  excerpt: string;
  chapters: ArticleChapter[];
  keyTakeaway: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'the-architecture-of-silence-kyoto-machiya',
    title: 'The Architecture of Silence: Monastic Warmth in Kyoto’s Modern Machiya',
    subtitle: 'Reimagining the historic wooden townhouse through charred cedar, tatami acoustics, and the deep spatial shadow of Jun’ichirō Tanizaki.',
    kicker: 'Spatial Studies 01',
    category: 'Architecture',
    date: 'October 14, 2026',
    readTime: '7 min read',
    author: {
      name: 'Kengo Yoshida',
      role: 'Spatial Theorist & Principal, Atelier Mu',
      location: 'Kyoto, Japan'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Minimalist Japanese interior with clean timber posts, paper screen light, and pale tatami',
      caption: 'Kyoto Machiya Pavilion: Interplay between natural cedar posts, shoji translucency, and the quiet shadow line.',
      credit: 'Photography by Hiroshi Tanaka / Atelier Mu'
    },
    palette: [
      { name: 'Charred Yakisugi', hex: '#23201D', material: 'Fire-treated cedar timber' },
      { name: 'Woven Rush Tatami', hex: '#C2BC97', material: 'Natural unbleached igusa grass' },
      { name: 'Hinoki Cypress', hex: '#E2CEB1', material: 'Hand-planed structural beams' },
      { name: 'Kozo Washi Paper', hex: '#F3EDE2', material: 'Handmade mulberry sliding partitions' }
    ],
    specifications: [
      { label: 'Typology', value: 'Residential Renovation' },
      { label: 'Floor Area', value: '118 m²' },
      { label: 'Primary Timber', value: 'Reclaimed Japanese Hinoki & Cedar' },
      { label: 'Glazing Treatment', value: 'Double-pane low-E with internal paper lattice' }
    ],
    excerpt: 'To step across the stone threshold of a traditional Kyoto machiya is to surrender modern visual frenzy in favor of an acoustic and perceptual hush that has been refined over four centuries.',
    chapters: [
      {
        id: 'threshold-doma',
        title: 'The Threshold and the Doma',
        content: [
          'In historical Japanese residential architecture, the transition from street to sanctuary is never abrupt. The entrance sequence begins at the doma—an earthen gravel passage at ground level where the dust of the outside world is shed alongside one’s shoes.',
          'In our contemporary restoration of this 1890s townhouse in northern Kyoto, we preserved this volumetric pause. Rather than flattening the level changes into a uniform western slab, the polished dark aggregate floor serves as an acoustic dampener, resetting the heartbeat before one ascends four inches onto the elevated wooden flooring.'
        ],
        pullQuote: 'Space does not begin where walls stand; it begins where clutter stops and acoustic silence is permitted to settle.'
      },
      {
        id: 'praise-of-penumbra',
        title: 'The Penumbra of Tanizaki',
        content: [
          'In his seminal 1933 essay In Praise of Shadows, Jun’ichirō Tanizaki lamented the Western compulsion to illuminate every corner with unrelenting white light. He noted that the lacquerware and gold leaf of the East were conceived specifically to glow from the murky depths of a dark alcove.',
          'Here, artificial lighting is relegated to indirect 2200K cove grazes positioned two inches above the baseboard. During the day, sunlight is filtered through three layers of handmade mulberry washi screens, transforming harsh midday glare into a milky, enveloping aura.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 1 — Subdued tatami room facing an interior courtyard with raked pebbles and moss.',
          architectOrStudio: 'Atelier Mu Architecture'
        }
      },
      {
        id: 'tsuboniwa-respiration',
        title: 'Respiration Through the Tsuboniwa',
        content: [
          'The micro-courtyard, or tsuboniwa, occupies barely four square meters in the core of the floor plan. Yet it anchors the entire domestic experience. A solitary Japanese maple, bedded in charcoal and green moss, catches seasonal rain and casts dancing silhouettes across the dining table.',
          'By keeping interior furnishings strictly below eye level when seated on the floor, the occupant’s gaze is drawn naturally outward toward the miniature garden. The boundary between architecture and landscape gently dissolves.'
        ]
      }
    ],
    keyTakeaway: 'True minimalism in Japanese interior theory is not about geometric sterility, but about eliminating sensory noise so that organic materials and natural light can speak with profound emotional resonance.'
  },
  {
    id: 'art-02',
    slug: 'tactile-restraint-lime-wash-and-microcement',
    title: 'Tactile Restraint: Hand-Troweled Lime Wash and Microcement Surfaces',
    subtitle: 'Why uniform flat drywall fails the human touch, and how natural mineral finishes imbue reductionist spaces with warmth and living patina.',
    kicker: 'Materiality 02',
    category: 'Materials',
    date: 'September 28, 2026',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Material Conservator & Surface Architect',
      location: 'Antwerp, Belgium'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      alt: 'Clean minimalist living room with textured beige lime plaster walls and warm microcement floor',
      caption: 'Antwerp Penthouse: Hand-applied slaked lime plaster creating organic light gradation across the south-facing living pavilion.',
      credit: 'Photography by Frederik Vercruysse'
    },
    palette: [
      { name: 'Slaked Lime Wash', hex: '#EDE8E0', material: 'Aged mineral lime & chalk pigment' },
      { name: 'Honed Microtopping', hex: '#BEB9AF', material: 'Polymer-modified mineral cement' },
      { name: 'Belgian Raw Flax', hex: '#D2C8BA', material: 'Unbleached natural loom linen' },
      { name: 'Roman Travertine', hex: '#DFD8CC', material: 'Cross-cut unfilled porous stone' }
    ],
    specifications: [
      { label: 'Surface System', value: '3-Coat Slaked Lime with Mineral Wax' },
      { label: 'Floor Thickness', value: '3.5 mm Seamless Microcement' },
      { label: 'Acoustic Absorption', value: 'NRC 0.32 (plaster) + wool underlay' },
      { label: 'VOC Rating', value: 'Zero VOC / Hypoallergenic' }
    ],
    excerpt: 'When an interior is stripped of paintings, mouldings, and decorative bric-a-brac, the surface of the wall itself becomes the canvas. A flat synthetic latex wall feels dead; a slaked lime finish breathes.',
    chapters: [
      {
        id: 'the-death-of-synthetic-paint',
        title: 'The Failure of Synthetic Perfection',
        content: [
          'For the past forty years, residential construction has treated walls as inert partitions: taped drywall sheets rolled over with acrylic emulsion. The result is a skin that reflects sound harshly, shows greasy fingerprints, and creates a plastic sheen under raking sunlight.',
          'In contrast, slaked lime (calcium hydroxide) cures through carbonation, absorbing atmospheric carbon dioxide over years to revert into pure limestone. Its micro-crystalline lattice scatters incoming photons at millions of microscopic angles, producing that velvety, matte aura distinctive of historic Mediterranean and Belgian monasteries.'
        ],
        pullQuote: 'A sterile room is one where light hits a dead surface. A soulful room is one where light penetrates the mineral grain.'
      },
      {
        id: 'seamless-horizontal-planes',
        title: 'Microcement and the Seamless Floor',
        content: [
          'Grout lines in tile work act as visual gridlines, forcing the human brain to compute distance and subdivide the plane. Microcement solves this by establishing a continuous, monolithic topography from room to room.',
          'Because microtopping is troweled by hand in thin 3mm passes, subtle variations in blade pressure produce gentle, cloud-like movements across the floor. Paired with underfloor hydronic heating, the tactile sensation under bare feet shifts from clinical coldness to soft stone warmth.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 2 — Seamless transition between microcement floor and raw linen upholstery.',
          architectOrStudio: 'Rostova Material Lab'
        }
      },
      {
        id: 'the-ageing-surface',
        title: 'Embracing the Living Patina',
        content: [
          'The greatest misconception about minimalist interiors is the fear of wear. Mineral finishes do not peel; they age. Where a shoulder brushes a doorway, the lime slightly polishes. Where sunlight strikes, the mineral tint slowly matures.',
          'When materials are honest—stone, lime, raw timber, unwashed linen—wear ceases to be damage and becomes history.'
        ]
      }
    ],
    keyTakeaway: 'Tactile minimalism replaces decorative distraction with rich sensory depth. Mineral finishes bring subtle texture and acoustic softness to pared-back architecture.'
  },
  {
    id: 'art-03',
    slug: 'the-unbroken-plane-flush-joinery-systems',
    title: 'The Unbroken Plane: Flush Joinery and Concealed Storage',
    subtitle: 'Examining the rigorous engineering of shadow beads, ceiling-height pivot doors, and millwork that hides domestic entropy.',
    kicker: 'Millwork Engineering 03',
    category: 'Millwork',
    date: 'August 19, 2026',
    readTime: '8 min read',
    author: {
      name: 'Marc van der Meer',
      role: 'Master Cabinetmaker & Architect',
      location: 'Amsterdam, Netherlands'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      alt: 'Architectural interior featuring seamless walnut wood cabinetry and flush architectural shadow gap',
      caption: 'Canal House Transformation: Full-height walnut storage wall concealing structural columns, HVAC registers, and pantry.',
      credit: 'Photography by Casper Le Fèvre'
    },
    palette: [
      { name: 'Smoked Walnut', hex: '#3B2E25', material: 'Crown-cut smoked European walnut' },
      { name: 'Shadow Black', hex: '#1C1B19', material: 'Anodized aluminum reglet profile' },
      { name: 'Warm Putty Lacquer', hex: '#E6E1D8', material: 'Super-matte 5% sheen polyurethane' },
      { name: 'Raw Cast Bronze', hex: '#634E39', material: 'Concealed edge pull insert' }
    ],
    specifications: [
      { label: 'Door Reveal', value: '6 mm Aluminum Fry Reglet' },
      { label: 'Pivot Hardware', value: 'FritsJurgens System M+ Concealed' },
      { label: 'Grain Alignment', value: 'Sequenced vertical architectural match' },
      { label: 'Acoustic Seal', value: 'Magnetic drop-down bottom drop seal' }
    ],
    excerpt: 'Domestic life is chaotic: cords, appliances, coats, books, and paperwork constantly seek surface area. Minimalism survives only when storage is executed with obsessive architectural precision.',
    chapters: [
      {
        id: 'the-six-millimeter-gap',
        title: 'The Discipline of the Shadow Bead',
        content: [
          'In standard residential construction, trim and baseboards are installed to hide sloppy construction joints between sheetrock and flooring. In minimalist architecture, baseboards are eliminated entirely in favor of the shadow bead.',
          'By installing a recessed aluminum channel between the drywall bottom and the subfloor, the wall appears to hover six millimeters above the floor. This single tectonic detail requires millimeter-grade carpentry, but instantly creates visual lightness and geometric honesty.'
        ],
        pullQuote: 'A wall that touches the floor without a shadow gap feels grounded by gravity; a wall that hovers with a shadow gap feels sculpted by thought.'
      },
      {
        id: 'full-height-portals',
        title: 'Doors as Disappearing Walls',
        content: [
          'Standard door frames create visual interruptions: casing headers, latch plates, and hinges puncturing the vertical sightline. By contrast, ceiling-height frameless pivot doors align flush with adjacent wall cladding.',
          'Using concealed bottom and top pivots that carry up to 500 kilograms, a 3-meter-tall panel swings with hydraulic grace on the touch of an index finger. When closed, the door simply becomes the wall.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 3 — Flush pivot portal integrating flush with vertical timber wall paneling.',
          architectOrStudio: 'Van der Meer Architectural Joinery'
        }
      },
      {
        id: 'grain-continuity',
        title: 'Sequenced Grain Continuity',
        content: [
          'Nothing ruins minimalist cabinetry faster than mismatched wood veneer patterns. In high-craft joinery, every door front across a six-meter cabinet wall is sliced in sequence from the same single flitch of smoked European walnut.',
          'The organic grain continues unbroken across door seams, drawer cuts, and corner returns. What could have looked like a wall of utilitarian lockers transforms into a singular, monumental sculpture of living timber.'
        ]
      }
    ],
    keyTakeaway: 'Concealed storage and flush joinery are not mere luxury finishes; they are the functional foundation that shields the human mind from visual domestic clutter.'
  },
  {
    id: 'art-04',
    slug: 'warm-scandinavian-reduction-hygge-and-void',
    title: 'Warm Scandinavian Reduction: Reconciling Hygge with Spatial Emptiness',
    subtitle: 'How Nordic architects harness pale Douglas fir, sheepskin texture, and low-slung luminaires to build warm sanctuaries without clutter.',
    kicker: 'Regional Dialect 04',
    category: 'Philosophy',
    date: 'July 11, 2026',
    readTime: '5 min read',
    author: {
      name: 'Astrid Lindholm',
      role: 'Interior Stylist & Architecture Author',
      location: 'Copenhagen, Denmark'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80',
      alt: 'Nordic minimalist living space with pale oak wood floors, sheer drapery, and low-slung linen furniture',
      caption: 'Nørrebro Residence: High ceilings, bleached solid Douglas fir planks, and diffuse northern daylight.',
      credit: 'Photography by Jonas Bjerre-Poulson / Norm Architects'
    },
    palette: [
      { name: 'Pale Douglas Fir', hex: '#EDE1D2', material: 'Lye-treated and white-soaped solid timber' },
      { name: 'Unspun Cream Wool', hex: '#F4F0E8', material: 'Handwoven Scandinavian flatweave rug' },
      { name: 'Gotland Shearling', hex: '#C7BDB1', material: 'Natural undyed sheepskin throw' },
      { name: 'Smoked Smudge Glass', hex: '#8C857B', material: 'Handblown pendant diffusers' }
    ],
    specifications: [
      { label: 'Flooring Species', value: 'Dinesen Douglas Fir (450mm width)' },
      { label: 'Lye Formulation', value: 'Traditional soap-and-lye scrubbing' },
      { label: 'Window Dressings', value: 'Floor-to-ceiling sheer linen voiles' },
      { label: 'Daylight Factor', value: 'DF > 3.8% in living perimeter' }
    ],
    excerpt: 'In the harsh northern latitudes where winter sun sets by three in the afternoon, minimalism cannot afford to be icy or aloof. Danish reductionism achieves emotional warmth through material softness.',
    chapters: [
      {
        id: 'the-danish-soap-finish',
        title: 'The Ritual of the Soaped Floor',
        content: [
          'Walking across a lacquered oak floor feels synthetic—your foot is separated from the timber by a thin film of polyurethane. Scandinavian architects favor the traditional soap treatment: scrubbing solid Douglas fir boards with white soap flakes.',
          'The wood pores remain open, retaining moisture and exhaling a subtle scent of pine forest. Over decades, repeated soaping builds a velvety, chalk-white patina that stays warm even during sub-zero winters.'
        ],
        pullQuote: 'Minimalism in cold climates is an act of survival: you gather only that which provides true comfort, and you give it room to breathe.'
      },
      {
        id: 'islands-of-warmth',
        title: 'Islands of Light in an Ocean of Shadow',
        content: [
          'Rather than blasting a room with uniform recessed ceiling lights, Nordic designers distribute 4 to 6 low-wattage accent points. A paper lantern suspended 60 centimeters above the coffee table, a reading brass wand beside the armchair, a candle on a granite windowsill.',
          'These pools of warm, low-slung light carve intimate micro-environments inside an otherwise open, airy floor plan, evoking the primal comfort of the ancestral hearth.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 4 — Low-level task lamp casting a warm gradient over chalk-painted walls.',
          architectOrStudio: 'Nordic Light Studio'
        }
      },
      {
        id: 'curated-softness',
        title: 'The Contrast of Hard and Soft',
        content: [
          'The danger of extreme reductionism is hardness: too much concrete, steel, and glass creates sensory fatigue. Nordic minimalism resolves this by introducing tactile counters: an uncombed Gotland sheepskin draped over a rigid Hans Wegner Wishbone chair.',
          'The eye registers the stark geometric discipline of the room, while the body relaxes into organic tactile softness.'
        ]
      }
    ],
    keyTakeaway: 'Warm Scandinavian minimalism is proof that spatial reduction does not require emotional austerity. When paired with natural textiles and ambient lighting, empty space feels like a protective sanctuary.'
  },
  {
    id: 'art-05',
    slug: 'sculptural-geometry-single-object-spaces',
    title: 'Sculptural Geometry: Single-Object Spaces and Curated Voids',
    subtitle: 'Understanding the architectural gravity of leaving rooms intentionally empty, anchored by a solitary monolithic design artifact.',
    kicker: 'Curatorial Practice 05',
    category: 'Architecture',
    date: 'June 22, 2026',
    readTime: '6 min read',
    author: {
      name: 'Julian Theron',
      role: 'Curator & Spatial Critic',
      location: 'Basel, Switzerland'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
      alt: 'Vast gallery-like room with concrete floor and a single sculptural chair in natural light',
      caption: 'The Basel Pavilion: An 80-square-meter concrete gallery anchored solely by a patinated bronze daybed.',
      credit: 'Photography by Rory Gardiner'
    },
    palette: [
      { name: 'Poured Concrete', hex: '#94918C', material: 'Diamond-ground matte exposed concrete' },
      { name: 'Aged Gunmetal Bronze', hex: '#3E3A36', material: 'Lost-wax cast architectural bronze' },
      { name: 'Alabaster Plaster', hex: '#F7F4EC', material: 'Natural mineral chalk finish' },
      { name: 'Saddle Bridle Leather', hex: '#714E36', material: 'Vegetable-tanned full-grain hide' }
    ],
    specifications: [
      { label: 'Spatial Volume', value: '4.2 m Ceiling Clear Height' },
      { label: 'Anchor Object', value: 'Custom 2.8m Cast Bronze Daybed' },
      { label: 'Glazing Ratio', value: 'North-facing clerestory slot aperture' },
      { label: 'Acoustic Target', value: 'RT60 = 0.65s (subdued reverberation)' }
    ],
    excerpt: 'Most rooms are overcrowded because their occupants fear emptiness. Yet in architecture, empty space is not a vacuum waiting to be filled—it is the primary material with which we compose.',
    chapters: [
      {
        id: 'the-monumental-anchor',
        title: 'The Gravity of the Solitary Anchor',
        content: [
          'When you enter an eighty-square-meter room containing nine pieces of furniture, your attention fractures. Your eyes dart from the side table to the floor lamp to the decorative bowl, seeking a coherent focal point.',
          'Remove eight of those items. Now, place a solitary monolithic daybed carved from solid volcanic basalt in the center. Instantly, the entire room organizes itself around this center of gravity. The empty air between the walls and the stone becomes charged with tension, like the silence between two musical chords.'
        ],
        pullQuote: 'A solitary object in an empty room possesses the dignity of a sculpture in a museum; five objects in the same room become furniture.'
      },
      {
        id: 'scale-manipulation',
        title: 'Playing with Architectural Scale',
        content: [
          'Single-object design requires radical courage with scale. If the solitary object is too small, it looks forgotten—like a chair abandoned during moving day. It must possess monumental proportion.',
          'In the Basel Pavilion, the custom bronze daybed measures nearly three meters in length and weighs eight hundred kilograms. Its low horizontal stance grounds the towering 4.2-meter ceiling heights, creating a dynamic dialogue between horizontal stability and vertical aspiration.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 5 — Monolithic seating volume positioned against sheer lime-plaster wall.',
          architectOrStudio: 'Theron Curatorial Bureau'
        }
      },
      {
        id: 'psychology-of-void',
        title: 'The Mental Clarity of Negative Space',
        content: [
          'Our nervous systems are under constant bombardment from notifications, billboards, traffic, and screen clutter. To come home to a room whose predominant feature is nothingness allows the prefrontal cortex to decompress.',
          'Emptiness is luxury in the twenty-first century. Anyone can buy objects; very few possess the confidence to preserve the void.'
        ]
      }
    ],
    keyTakeaway: 'Mastering the single-object room requires treating empty space as a tangible physical medium. One monumental, beautifully crafted piece speaks louder than a dozen decorative accents.'
  },
  {
    id: 'art-06',
    slug: 'light-as-material-apertures-and-shadows',
    title: 'Light as Material: Apertures, Slits, and Raking Daylight',
    subtitle: 'Moving beyond decorative fixtures to treat natural sunlight and architectural apertures as primary building blocks.',
    kicker: 'Illumination 06',
    category: 'Lighting',
    date: 'May 30, 2026',
    readTime: '7 min read',
    author: {
      name: 'Sora Takahashi',
      role: 'Architectural Lighting Consultant',
      location: 'Tokyo & Zürich'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dramatic light and shadow playing across a minimalist concrete and timber architectural hallway',
      caption: 'The Solitary Shaft: A continuous ceiling slit reveals raking morning light across textured stone masonry.',
      credit: 'Photography by Simone Bossi'
    },
    palette: [
      { name: 'Board-Formed Grey', hex: '#A3A09A', material: 'In-situ architectural concrete' },
      { name: 'Deep Basalt Shadow', hex: '#262422', material: 'Natural black volcanic stone' },
      { name: 'Warm Amber Filament', hex: '#F0BA73', material: '2100K high-CRI linear cove' },
      { name: 'Honed Pietra Serena', hex: '#6D7174', material: 'Italian blue-grey sandstone' }
    ],
    specifications: [
      { label: 'Aperture Geometry', value: '150mm Skylight Slot Wall Wash' },
      { label: 'Color Rendering', value: 'CRI 98+ / R9 > 95' },
      { label: 'Color Temperature', value: 'Dynamic 2100K–2700K Warm Dim' },
      { label: 'Glare Rating', value: 'UGR < 10 (Zero Direct Source Visibility)' }
    ],
    excerpt: 'You cannot touch light with your fingers, yet light is the heaviest material in the architectural palette. It defines boundaries, elevates textures, and sets the emotional frequency of dwelling.',
    chapters: [
      {
        id: 'the-slit-aperture',
        title: 'The Slit Aperture and the Wall Wash',
        content: [
          'A conventional window places a glass square in the middle of a wall, creating glare around the frame. An architectural slit aperture, however, is cut directly along the intersection of the ceiling and wall.',
          'As the sun travels across the sky, daylight does not spill randomly into the room; it grazes down the face of the vertical surface. Every trowel stroke of the lime plaster, every grain of the board-formed concrete is brought into relief by razor-sharp raking shadows.'
        ],
        pullQuote: 'Do not look at the lamp. Look at the wall that the lamp gently touches.'
      },
      {
        id: 'the-curse-of-downlights',
        title: 'The Indictment of the Ceiling Downlight Grid',
        content: [
          'The most destructive trend in modern residential design is the matrix of ceiling pot lights. They drill cone-shaped hot spots into the floor, cast unflattering raccoon shadows under human faces, and turn ceilings into Swiss cheese.',
          'In refined minimalist architecture, ceilings remain pristine, uninterrupted planes. Luminaires are hidden within joinery reveals, floor slots, or bounce shields, so that light emerges as an ambient glow rather than a harsh pinpoint.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 6 — Low-elevation grazing light illuminating mineral floor textures at dusk.',
          architectOrStudio: 'Takahashi Light Bureau'
        }
      },
      {
        id: 'circadian-dimming',
        title: 'Circadian Attunement: The 2100K Threshold',
        content: [
          'As twilight turns to night, the human nervous system needs a decline in both illuminance and color temperature. By implementing warm-dim technology that shifts from 2700K down to a candle-like 2100K at 5% output, an interior signals rest to the body.',
          'The home ceases to be an office or a gallery; it becomes a nocturnal sanctuary.'
        ]
      }
    ],
    keyTakeaway: 'Lighting in minimalist interiors is about concealment. When the light source disappears and only its reflection on textured surfaces remains, space achieves poetic grandeur.'
  },
  {
    id: 'art-07',
    slug: 'the-monolithic-kitchen-stone-blocks-hidden-appliances',
    title: 'The Monolithic Kitchen: Honed Stone Blocks and Invisible Appliances',
    subtitle: 'Transforming the culinary workspace from a chaotic machine into an architectural altar of monolithic honed stone and pocketed cabinetry.',
    kicker: 'Culinary Architecture 07',
    category: 'Millwork',
    date: 'April 18, 2026',
    readTime: '7 min read',
    author: {
      name: 'Matteo Bellini',
      role: 'Industrial Designer & Kitchen Architect',
      location: 'Milan, Italy'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Clean modern minimalist kitchen island in monolithic stone with concealed induction hob',
      caption: 'Via Solferino Apartment: A 4.2-meter cantilevered Pietra di Cardoso stone island with invisible under-counter induction.',
      credit: 'Photography by Giorgio Possenti'
    },
    palette: [
      { name: 'Pietra di Cardoso', hex: '#44484B', material: 'Honed Tuscan dark sandstone' },
      { name: 'Smoked Rovere Oak', hex: '#312922', material: 'Brushed deep thermo-treated oak' },
      { name: 'Unlacquered Brass', hex: '#9B7B4B', material: 'Solid machined brass with natural tarnish' },
      { name: 'Muted Nero Slate', hex: '#1C1C1D', material: 'Fingerprint-resistant nanotech laminate' }
    ],
    specifications: [
      { label: 'Island Dimensions', value: '4200 × 1100 × 920 mm' },
      { label: 'Induction System', value: 'TPB Tech Invisible Sub-Stone Induction' },
      { label: 'Extraction', value: 'Recirculating downdraft integrated in perimeter' },
      { label: 'Pocket Doors', value: 'Hawa Concepta 25/30 Bi-fold Glide' }
    ],
    excerpt: 'The kitchen is historically the messiest room in the house: cutting boards, dish soaps, blenders, and toaster ovens competing for horizontal counter space. The monolithic kitchen reclaims order.',
    chapters: [
      {
        id: 'the-stone-altar',
        title: 'The Stone Altar vs. The Countertop',
        content: [
          'In traditional kitchens, counters are composed of thin horizontal slabs glued on top of particle-board cabinets. In contrast, the monolithic kitchen treats the island as a single carved block of geological mass.',
          'Mitered 45-degree waterfall edges allow the stone veining to flow seamlessly from the horizontal prep surface down to the floor. The island ceases to read as a cabinet with a lid; it reads as a quarry boulder that has anchored itself in the floorboards.'
        ],
        pullQuote: 'When appliances disappear, the kitchen is no longer a food factory—it is an architectural altar where nourishment is prepared with reverence.'
      },
      {
        id: 'invisible-induction',
        title: 'The Invisible Cooktop Revolution',
        content: [
          'Black glass induction ceramic hobs have long disfigured the purity of stone surfaces. The latest evolution embeds induction magnetic coils directly beneath the 20mm natural stone slab itself.',
          'Three micro-laser-etched crosshairs on the honed travertine mark the burner zones. When cooking is finished, the pan is removed, the stone is wiped down with a cloth, and the island returns to being an unencumbered monolithic sculpture.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 7 — Precision joinery housing pocket doors that conceal small culinary appliances.',
          architectOrStudio: 'Bellini Studio Milano'
        }
      },
      {
        id: 'pocketing-entropy',
        title: 'Pocketing the Daily Ritual',
        content: [
          'Behind the island stands a wall of smoked oak floor-to-ceiling millwork. When open, bi-fold pocket doors slide away into internal side pockets, revealing coffee machines, spice jars, and dish racks.',
          'When dinner is done, two doors are slid shut. In four seconds, the entire machinery of modern domestic cooking disappears into a warm wooden wall.'
        ]
      }
    ],
    keyTakeaway: 'The monolithic kitchen balances rigorous utilitarian function with architectural purity through invisible induction technology and flush pocketing doors.'
  },
  {
    id: 'art-08',
    slug: 'acoustic-serenity-slatted-timber-boucle-sound',
    title: 'Acoustic Serenity: Slatted White Oak, Bouclé Textures, and Noise Damping',
    subtitle: 'How hard-surface minimalist spaces avoid clinical reverberation through acoustic millwork, wool felt, and tactile upholstery.',
    kicker: 'Acoustic Architecture 08',
    category: 'Materials',
    date: 'March 25, 2026',
    readTime: '5 min read',
    author: {
      name: 'Dr. Henrik Vane',
      role: 'Architectural Psychoacoustician',
      location: 'Stockholm, Sweden'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      alt: 'Minimalist living room with textured wood acoustic wall panels and soft bouclé upholstered furniture',
      caption: 'The Listening Haven: Full-height micro-perforated slatted white oak panels backed with recycled acoustic felt.',
      credit: 'Photography by Erik Lefvander'
    },
    palette: [
      { name: 'Oiled White Oak', hex: '#D8C3A4', material: 'Solid FSC European white oak battens' },
      { name: 'Charcoal Acoustic Felt', hex: '#2B2927', material: 'High-density recycled PET acoustic backing' },
      { name: 'Natural Oatmeal Bouclé', hex: '#E7E2DA', material: 'Textured looped wool & alpaca fiber' },
      { name: 'High-Pile Wool Loop', hex: '#D0C8BD', material: 'Undyed New Zealand sheep wool rug' }
    ],
    specifications: [
      { label: 'Acoustic Rating', value: 'Class A Absorption (NRC 0.90)' },
      { label: 'Slat Geometry', value: '27 mm width × 13 mm gap × 12 mm depth' },
      { label: 'Backing Felt', value: '9 mm high-density black acoustic fleece' },
      { label: 'Target RT60', value: '0.45 seconds across speech frequencies' }
    ],
    excerpt: 'A room can look magnificent in a magazine photograph, but if a dropped teacup clatters with the resonance of an empty subway station, it will never feel like a restful home.',
    chapters: [
      {
        id: 'the-echo-chamber-trap',
        title: 'The Echo Chamber Trap of Modernism',
        content: [
          'Hard, unyielding surfaces—polished concrete, tempered glass, skim-coat plaster—bounce audio waves back into the room like billiard balls. This creates flutter echo and speech muddiness, forcing occupants to raise their voices and stimulating subconscious stress.',
          'Psychoacoustics proves that human comfort is directly correlated with reverberation time. A home sanctuary requires a reverberation time (RT60) below 0.5 seconds, while an untreated open-plan loft frequently clocks in at an exhausting 1.8 seconds.'
        ],
        pullQuote: 'You cannot relax in a room where your own footsteps talk back to you in echoes.'
      },
      {
        id: 'the-acoustic-slat-wall',
        title: 'Disguising Sound Dampening as Millwork',
        content: [
          'Traditional acoustic foam panels look like recording studios. The architectural solution is the wood slat panel: slim vertical battens of natural oiled white oak mounted on a bed of dense black recycled PET felt.',
          'The high frequencies pass cleanly between the 13mm slat gaps and are absorbed by the felt fiber behind, while the timber faces diffuse mid-range sound waves, preserving warm conversational intimacy without visual compromise.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 8 — Detail of slatted oak battens meeting a continuous wool rug boundary.',
          architectOrStudio: 'Vane Acoustic Acoustics & Design'
        }
      },
      {
        id: 'soft-tactile-weights',
        title: 'Soft Tactile Furniture as Sound Traps',
        content: [
          'Upholstery is another acoustic weapon. Smooth leather chairs bounce sound; deeply looped bouclé wool, shearling, and heavy Belgian linen absorb sound waves across a wide frequency spectrum.',
          'Paired with thick felt underlays beneath oversized handwoven wool rugs, the room achieves that monastic hush that makes deep reading and quiet conversation effortless.'
        ]
      }
    ],
    keyTakeaway: 'Visual minimalism must always be accompanied by acoustic design. Slatted timber millwork and heavy organic textiles quiet the room and heal the nervous system.'
  },
  {
    id: 'art-09',
    slug: 'the-tokonoma-principle-biophilic-reduction',
    title: 'The Tokonoma Principle: Biophilic Reduction and the Singularity of Nature',
    subtitle: 'Why a single pruned branch in an intentional alcove commands deeper mindfulness than twenty crowded houseplant pots.',
    kicker: 'Biophilic Philosophy 09',
    category: 'Philosophy',
    date: 'February 17, 2026',
    readTime: '6 min read',
    author: {
      name: 'Mei Lin-Benoit',
      role: 'Landscape & Interior Architect',
      location: 'Kyoto & Paris'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80',
      alt: 'Minimalist alcove displaying a solitary branch in a rough ceramic vase beside tatami mats',
      caption: 'The Tokonoma Alcove: A single winter plum blossom branch framed against lime plaster and raw cedar.',
      credit: 'Photography by Kenjiro Yoshimi'
    },
    palette: [
      { name: 'Unglazed Bizen Clay', hex: '#634737', material: 'Wood-fired unglazed stoneware ceramic' },
      { name: 'Cedar Tokobashira', hex: '#8C674E', material: 'Bark-peeled natural cedar pillar post' },
      { name: 'Parchment Lime Plaster', hex: '#F0ECE4', material: 'Raw limestone powder with straw chaff' },
      { name: 'Black Basalt River Stone', hex: '#262423', material: 'Water-smoothed volcanic river pebbles' }
    ],
    specifications: [
      { label: 'Alcove Depth', value: '600 mm Recessed Wall Cavity' },
      { label: 'Vessel Style', value: '16th Century Bizen Wood-fired Vase' },
      { label: 'Botanical Curation', value: 'Seasonal single branch (Ikebana discipline)' },
      { label: 'Backdrop Finish', value: 'Coarse hemp-fiber lime mortar' }
    ],
    excerpt: 'The recent trend of turning living rooms into indoor tropical greenhouses misses the true essence of biophilia. When plants become clutter, their individuality and poetic voice are silenced.',
    chapters: [
      {
        id: 'the-sacred-alcove',
        title: 'The Sacred Space of the Tokonoma',
        content: [
          'Originating in the Muromachi period tea rooms of Japan, the tokonoma is an elevated recessed alcove designed for the appreciation of art and nature. Only one scroll and one floral arrangement (chabana) are displayed at any time.',
          'Because the rest of the room is completely empty, the eye has nowhere else to wander. A single branch of wild plum, bent by mountain winds and bearing two half-opened buds, commands the attention of an epic painting.'
        ],
        pullQuote: 'To place ten flowers in a room is to invite confusion. To place one flower in a room is to contemplate the universe.'
      },
      {
        id: 'the-ikebana-mindset',
        title: 'The Negative Space of Ikebana',
        content: [
          'Western floral design often clusters dozens of blossoms into dense spheres of color. Japanese ikebana, particularly the chabana school practiced by tea masters like Sen no Rikyū, celebrates the empty air between the stems (ma).',
          'The curvature of an empty twig, the shadow it casts on the lime-plaster wall, the asymmetry of a single fallen leaf—these imperfect moments (wabi-sabi) remind the observer of the fleeting transience of all living things.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 9 — Natural daylight highlighting the organic silhouette of single branch flora.',
          architectOrStudio: 'Atelier Lin-Benoit'
        }
      },
      {
        id: 'framed-living-vistas',
        title: 'The Window as Living Canvas',
        content: [
          'Rather than building massive floor-to-ceiling glass boxes that expose you to the neighbors, reductionist architecture carves low, horizontal ribbon windows at floor level (yukimi shoji).',
          'Sitting on a floor mat, you do not see the sky or surrounding rooftops; you see moss, raked sand, and rain dripping from cedar eaves. Nature is not consumed as a panoramic commodity—it is invited in as an intimate companion.'
        ]
      }
    ],
    keyTakeaway: 'True biophilia in minimalist interior architecture is not measured by the quantity of potted plants, but by the intentionality with which a solitary natural element is given center stage.'
  },
  {
    id: 'art-10',
    slug: 'a-curatorial-life-the-dieter-rams-discipline',
    title: 'A Curatorial Life: The Dieter Rams Discipline of Intentional Domesticity',
    subtitle: 'Applying the ten commandments of good design to everyday home curation: eliminating visual noise and evaluating tools by lifetime utility.',
    kicker: 'Curatorial Practice 10',
    category: 'Philosophy',
    date: 'January 09, 2026',
    readTime: '8 min read',
    author: {
      name: 'Kasper Dahl',
      role: 'Industrial Archivist & Design Critic',
      location: 'Frankfurt & Copenhagen'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80',
      alt: 'Clean minimalist study with Vitsoe shelving system, oiled desk, and meticulously arranged design objects',
      caption: 'The Frankfurt Study: Vitsoe 606 Universal Shelving System housing only essential design monographs and audio tools.',
      credit: 'Photography by Philip Sinden'
    },
    palette: [
      { name: 'Powder-Coated Off-White', hex: '#ECE8DF', material: 'RAL 9002 electrostatic steel' },
      { name: 'Natural Oiled Beech', hex: '#CDB192', material: 'Solid quarter-sawn European beech' },
      { name: 'Anodized Silver Aluminum', hex: '#B5B9BC', material: 'Extruded bead-blasted aluminum' },
      { name: 'Matte Charcoal Black', hex: '#232221', material: 'ABS composite and vulcanized rubber' }
    ],
    specifications: [
      { label: 'Shelving Standard', value: 'Vitsoe 606 Universal Shelving System' },
      { label: 'Audio Benchmark', value: 'Braun Atelier Audio 1 (1959)' },
      { label: 'Design Principle', value: 'Weniger, aber besser (Less, but better)' },
      { label: 'Curatorial Threshold', value: 'Lifetime durability & functional honesty' }
    ],
    excerpt: 'Dieter Rams famously distilled his philosophy into three words: Weniger, aber besser—Less, but better. In the domestic realm, this is not a decorative style, but an ethical code for living.',
    chapters: [
      {
        id: 'the-ten-principles-indoors',
        title: 'The Ten Principles as an Interior Framework',
        content: [
          'When Dieter Rams formulated his Ten Principles of Good Design in the late 1970s, he was responding to a world increasingly filled with decorative junk and planned obsolescence. While formulated for industrial products like radios and coffee makers, these rules apply directly to interior architecture.',
          'Good design is unobtrusive: rooms should be neutral backdrops for self-expression, not theatrical displays. Good design is honest: a laminate table should not pretend to be solid marble; an LED light should not pretend to be a gas lantern.'
        ],
        pullQuote: 'Indifference towards people and the reality in which they live is actually the one and only cardinal sin in design.'
      },
      {
        id: 'the-vitsoe-system',
        title: 'The Longevity of the 606 System',
        content: [
          'Designed by Rams in 1960, the 606 Universal Shelving System remains in continuous production without a single cosmetic alteration. A shelf purchased in 1962 slots seamlessly into aluminum tracks installed in 2026.',
          'This is the antithesis of the disposable furniture cycle. When you invest in objects designed for sixty years of daily use, you stop buying things repeatedly. Your home stabilizes into a permanent calm state.'
        ],
        imageDetail: {
          url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fig. 10 — Anodized aluminum surfaces and precision dial typography in the study.',
          architectOrStudio: 'Dahl Design Archive'
        }
      },
      {
        id: 'the-art-of-letting-go',
        title: 'The Daily Audit: What Deserves Your Attention?',
        content: [
          'Every object sitting on your desk or bookshelf is making a subtle demand on your attention. It whispers to your brain: dust me, organize me, remember who gave me to you, feel guilty for not reading me.',
          'Living curating means auditing your space with merciless kindness. If an object does not serve an unambiguous functional purpose or provide profound daily joy, release it. What remains is only what truly nourishes your life.'
        ]
      }
    ],
    keyTakeaway: 'Less, but better is not about depriving yourself; it is about respecting your finite time and mental energy by surrounding yourself only with objects of timeless integrity.'
  }
];
