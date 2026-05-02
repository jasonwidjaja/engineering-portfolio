// ============================================
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// No need to touch any other code files.
// Just change the text, save, and push.
// ============================================

const W = 'https://jasonwidjaja.weebly.com/uploads/1/4/7/6/147605262'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProjectCard {
  id: string
  title: string
  category: string
  subtitle: string
  featured?: boolean
  description: string
  problem?: string
  result?: string
  highlights: string[]
  accent: string
  tags: string[]
  image?: string
  images?: { src: string; caption?: string }[]
  resultImage?: { src: string; caption?: string }
  videos?: string[]
  successGrid?: { title: string; src: string }[]
  posterPdf?: string
}

export interface PairItem {
  label: string
  images?: { src: string; caption?: string; fit?: 'contain' | 'cover' }[]
}

export interface SubProject {
  name: string
  description: string
  bullets: string[]
  subBullets?: number[]
  bulletImages?: Record<number, { layout?: 'split-stack'; items: { src: string; caption?: string; fit?: 'contain' | 'cover'; wide?: boolean; cropBottom?: number; cropTop?: number; halfWidth?: boolean; widthClass?: string }[] } | { src: string; caption?: string; fit?: 'contain' | 'cover'; wide?: boolean; cropBottom?: number; cropTop?: number; halfWidth?: boolean; widthClass?: string }[]>
  image?: string
  images?: { src: string; caption?: string; fit?: 'contain' | 'cover'; wide?: boolean; hero?: boolean; height?: string }[]
  pairItems?: PairItem[]
  note?: string
}

export interface Job {
  company: string
  role: string
  period: string
  location: string
  accent: string
  image: string
  logo?: string
  featured?: boolean
  overview: string
  overviewImage?: string
  overviewCaption?: string
  highlights: string[]
  projects: SubProject[]
}

export interface AwardBadge {
  label: string
  sublabel: string
}

export interface NavLink {
  label: string
  href: string
}

export interface OffDutyPhoto {
  src: string
  caption: string
}

export interface OffDutyHighlight {
  title: string
  body: string
}

// ── Personal Info ─────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Jason Matthew Widjaja',
  title: 'Mechanical Engineer',
  tagline: 'Open to full-time roles in mechanical engineering, robotics, and hardware development in Summer 2026.',
  location: 'Boston, MA',
  email: 'widjaja.ja@northeastern.edu',
  linkedin: 'https://www.linkedin.com/in/jason-matthew-widjaja/',
  resumePdf: '/Jason_Widjaja_Resume.pdf',
  headshotSrc: '/headshot.jpg',
  bio: [
    "Grew up in Queens, NY - not exactly a hotbed for robotics, but that's kind of the point. I picked Mechanical Engineering because I wanted to take a random thought and turn it into something real you can hold, test, and break.",
    "That's still what drives me. A sketch on a napkin, a half-baked idea from a team meeting - I want to be the person who figures out how to build it.",
  ],
}

export const CREDENTIALS = [
  "M.S. Robotics - Northeastern '26",
  'B.S. Mechanical Engineering · Northeastern \'25',
]

export const PREVIOUS_COMPANIES = ['Amazon Robotics', 'Draper Laboratory', 'Berkshire Grey']

export const COMPANY_LOGOS = [
  { name: 'Amazon Robotics', src: `${W}/editor/images.png`, imgClass: 'h-7 w-36 object-contain' },
  { name: 'Draper Laboratory', src: `${W}/published/download.png`, imgClass: 'h-7 w-auto object-contain' },
  { name: 'Berkshire Grey',   src: `${W}/published/ot-logo-bg.png`, imgClass: 'h-7 w-36 object-contain' },
]

// ── Navigation ────────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

// ── Awards & Recognition ──────────────────────────────────────────────────────

export const AWARDS: AwardBadge[] = [
]

// ── Skills ────────────────────────────────────────────────────────────────────

export const SKILLS: string[] = [
  'SolidWorks (CSWP)', 'Creo', 'Onshape', 'MATLAB / Simulink',
  'Python', 'GD&T (ASME Y14.5)', 'DFM / DFA', 'FEA',
  '3D Printing', 'MuJoCo', 'ROS', 'Arduino', 'LTSpice', 'Simscape',
]

// ── Off Duty ──────────────────────────────────────────────────────────────────

export const OFF_DUTY_PHOTOS: OffDutyPhoto[] = [
  { src: `${W}/editor/img-5365.gif`, caption: 'Dragon Boat Racing' },
  { src: '/singapore.jpg', caption: 'NTU Singapore' },
  { src: '/IMG_2364.jpg', caption: 'Exploring the World' },
]

export const OFF_DUTY_HIGHLIGHTS: OffDutyHighlight[] = [
  {
    title: 'Dragon Boat Racing',
    body: "Competed as part of Northeastern's dragon boat team - synchronized team paddling at its most physical. You learn very quickly that 20 people rowing out of sync don't go anywhere.",
  },
  {
    title: 'NTU Singapore Study Abroad',
    body: 'With the magical alliance of USA and Singapore, I snagged a full scholarship to study abroad at Nanyang Technological University in 2022. Studied 3D printing and additive manufacturing while exploring a completely different part of the world.',
  },
]

export const OFF_DUTY_INTERESTS: string[] = [
  'Basketball', 'Knicks', 'Baseball', 'Ping Pong',
  'Cooking', 'Hiking', 'F1', 'Travel', 'Dragon Boat',
]

// ── Projects ──────────────────────────────────────────────────────────────────

export const PROJECTS: ProjectCard[] = [
  {
    id: 'bourbot',
    title: 'Bourbot',
    category: 'Senior Capstone',
    subtitle: 'Senior Capstone · Jan - Apr 2025',
    featured: true,
    description:
      'Semi-automated tele-op robot to roll, lift, and clock 550-lb whiskey barrels inside rickhouses - the tight, multi-story warehouses where whiskey ages. Built for a distillery client who needed a safer, faster alternative to manual barrel handling.',
    problem:
      "Rickhouses weren't built for machines - narrow aisles, sloped floors, and 550-lb barrels that want to roll wherever they feel like. My job was to design a lifting mechanism that could clock a barrel's bung plug to within a few degrees and lift it cleanly, all without tipping it in a space barely wider than the robot itself.",
    result:
      'Demonstrated all four key operations live: rolled a 550-lb barrel, clocked the bung for alignment, lifted via the actuated mechanism, and navigated a 4° incline.',
    highlights: [
      'Led the lifting mechanism as designated lead - designed a ball-screw driven system to elevate the barrel and clock the bung plug to within a few degrees of target orientation',
      'Sized the lifting actuator through torque and speed calculations in MATLAB - accounted for ball-screw lead, lift height, and static friction load under a full 550-lb barrel',
      'Ran FEA on the lifting frame under worst-case barrel loading - verified stress concentrations and deflection stayed within acceptable limits',
      'Hand-calculated bending and compression in structural members to validate FEA results and confirm no single point dominated the failure mode',
      'Conducted barrel force push characterization tests - measured resistance forces at multiple floor angles and orientations to define real design load inputs',
      'Designed the bung clocking mechanism for repeatable angular alignment - validated with repeated live tests on the physical barrel',
      'Integrated lifting, rolling, and locomotion subsystems - resolved interface conflicts between mechanical systems and coordinated sequencing with the controls team',
      'Demonstrated all four key operations live on a 550-lb barrel: rolling, clocking, lifting, and 4° incline navigation during the final client demo',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'FEA', 'MATLAB', 'Mechanisms', 'Robotics'],
    image: `${W}/full-barrel-rolling_orig.gif`,
    images: [
      { src: `${W}/published/screenshot-2025-05-19-004650.png`, caption: 'Initial prototype napkin sketch' },
      { src: `${W}/published/screenshot-2025-07-03-004616.png`, caption: 'Final demo' },
      { src: `${W}/published/screenshot-2025-07-03-004803.png`, caption: 'Ball screw calculations' },
      { src: `${W}/published/screenshot-2025-07-03-004839.png`, caption: 'Reaction load calculations - shafts' },
    ],
    resultImage: { src: `${W}/editor/img-8672-720.jpg`, caption: 'Team photo - Capstone day' },
    successGrid: [
      { title: 'Bung Clocking', src: `${W}/clocking_orig.gif` },
      { title: 'Lifting Mechanism', src: `${W}/lifting-mechanism-front-view-online-video-cutter_orig.gif` },
      { title: 'Barrel Rolling - 4° Incline', src: `${W}/img-7658_orig.gif` },
      { title: 'Barrel Lifting', src: `${W}/published/img-9793-online-video-cutter-com.gif` },
    ],
    posterPdf: `${W}/bourbot_final_poster.pdf`,
  },
  {
    id: 'cobra',
    title: 'COBRA',
    category: 'NASA Competition',
    subtitle: 'NASA Big Idea Challenge · $170K+ · Artemis Award · 2021-2022',
    featured: true,
    description:
      "Bio-inspired 11-joint modular snake robot designed to explore lunar craters using tumbling and sidewinding locomotion - terrain no wheeled rover can handle. Submitted to NASA's Big Idea Challenge and presented at the NASA Big Idea Forum in Pasadena.",
    problem:
      'One weak joint in an 11-module daisy chain and the whole snake stops working. I had to design enclosures for the voltage regulators that could survive repeated tumbling impact, fit within the modular form factor, and not add so much mass that the locomotion math fell apart.',
    result:
      '$170K+ in funding and the Artemis Award - 1st place across all evaluation criteria at the NASA Big Idea Forum. Featured in NASA, Wired, and VOA News.',
    highlights: [
      'Designed prototype joint geometries in SolidWorks to optimize surface support during tumbling and sidewinding',
      'Engineered enclosures for voltage regulators across the daisy-chained Dynamixel motor chain',
      'Assisted with robot assembly and field-testing demonstrations at the Pasadena forum',
      'Featured in NASA, Wired, VOA News, and Northeastern University press coverage',
    ],
    accent: '#22c55e',
    tags: ['Robotics', 'SolidWorks', 'Electronics', 'NASA', 'Locomotion'],
    image: `${W}/published/screenshot-2024-01-21-172643.png`,
    images: [
      { src: `${W}/northeastern-cobra-highlights_orig.gif`, caption: 'COBRA locomotion highlights' },
      { src: `${W}/published/screenshot-2024-01-21-172942.png`, caption: 'Voltage regulator enclosure CAD' },
      { src: '/pasadena.png', caption: 'NASA Big Idea Forum - Pasadena' },
      { src: `${W}/published/screenshot-2024-01-21-172919.png`, caption: 'Prototype joint geometry' },
    ],
  },
  {
    id: 'brailleforge',
    title: 'BrailleForge',
    category: 'MakeMIT',
    subtitle: 'MakeMIT Hardwarethon · 3rd Place · Feb 2023',
    featured: true,
    description:
      'Dual-axis gantry that converts digital text to physical braille, built from scratch in under 15 hours at MakeMIT using repurposed materials and limited machine shop access. Competed against 50+ teams and placed 3rd overall.',
    problem:
      "15 hours, a limited machine shop, and mostly repurposed parts - there was no time to iterate. The needle had to hit every dot deep enough to be readable on the first real run. Any vibration or inconsistent force and a judge's finger wouldn't feel anything.",
    result:
      '3rd place out of 50+ teams. Printed a braille greeting card live - confirmed readable by a judge whose mother is blind.',
    highlights: [
      'Led full CAD design for the 2-axis gantry, motor mounts, and 80/20 aluminum structure assembly',
      'NEMA 23 steppers with lead-screw linear motion and a solenoid-driven sewing needle for embossing',
      'Designed motor mount fixtures to reduce vibration and improve embossing accuracy',
      'Output costs 50%+ less per unit than commercial braille printers on the market',
    ],
    accent: '#22c55e',
    tags: ['Arduino', '2-Axis Gantry', 'Hardware', 'Python', '3D Printing'],
    image: `${W}/published/img-7243.jpeg`,
    images: [
      { src: `${W}/full-assembly-cad-2_orig.png`, caption: 'Full assembly CAD' },
    ],
    resultImage: { src: `${W}/editor/screenshot-2023-11-05-015117.png`, caption: '3rd place - MakeMIT Hardwarethon · 50+ teams' },
  },
  {
    id: 'fitolux',
    title: 'Fitolux',
    category: 'Product Development',
    subtitle: 'Generate Product Development · ME Hardware Lead · Fall 2024',
    featured: true,
    description:
      'Dual-system supplement dispenser - a countertop docking station and a portable handheld unit - for precise, mess-free powder dosing. Led the full mechanical engineering effort as Hardware Lead across a team of five.',
    problem:
      "One auger mechanism had to work in two totally different form factors without starting from scratch for each. On top of that, the silicone mold for the handle grip took three failed iterations - wrong draft angles, trapped air, torn edges - before it actually came out clean.",
    result:
      'Delivered functional hardware for both the countertop and portable form factors - hardware-led from requirements through prototyping and validation.',
    highlights: [
      'Led a team of 5 MEs through requirements definition, design reviews, prototyping, and validation',
      'Designed a unified motorized auger dispensing mechanism that works in both the countertop and portable form factors',
      'Performed MATLAB torque analysis to specify DC motor requirements',
      'Prototyped a two-part silicone mold with iterative improvements: edge gates, draft angles, alignment pins, vent holes, and fillets',
      'Countertop unit uses an 80/20 frame with removable hopper and load cell for weight-based dosing',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', '3D Printing', 'MATLAB', 'Hardware Lead', 'Silicone Molding'],
    image: `${W}/published/fitolux-countertop-ezgif-com-crop-1.gif`,
    images: [
      { src: `${W}/published/fitlolux-portable-clip.gif`, caption: 'Portable unit demo' },
      { src: '/fitolux-cad.png', caption: 'Countertop unit CAD' },
      { src: `${W}/editor/sweeper-mechanism.gif`, caption: 'Sweeper mechanism' },
      { src: `${W}/published/screenshot-2024-12-23-234103.png`, caption: 'Silicone mold - gripper handle' },
      { src: '/countertop.png', caption: 'Countertop dispenser' },
    ],
  },
  {
    id: 'cstar',
    title: 'C-STAR',
    category: 'Product Development',
    subtitle: 'Generate Product Development · Spring 2024',
    description:
      'Automated robot for detecting concrete delamination in parking garages via acoustic analysis - replacing the slow, tedious process of manual chain-drag inspection. I led the sounder mechanism that strikes concrete and captures the resulting sound signature.',
    problem:
      'The sounder had to hit concrete at a consistent force while the robot was moving. Any vibration or inconsistent contact and the acoustic signature was garbage. It also had to fit inside a tight chassis and clear speed bumps without bouncing off the surface.',
    result:
      'Successfully differentiated delaminated from solid concrete acoustically in both benchtop and field testing.',
    highlights: [
      'Led sounder mechanism design: a sprocket-based system that strikes concrete surfaces while the robot drives',
      'Integrated a PCB microphone and ADC to distinguish solid vs. hollow concrete acoustically',
      'Performed static spring constant calculations and iterated linkage geometry to fit within chassis constraints',
      'Designed vibration mounts to minimize oscillations when the robot crosses speed bumps and obstacles',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'Sensors', 'Acoustics', 'Mechanisms', 'Field Testing'],
    image: `${W}/cstar-13_orig.jpg`,
    images: [
      { src: `${W}/published/soundermechanism-10-1.gif`, caption: 'Sprocket sounder striking concrete' },
      { src: `${W}/published/cstar-08.jpg`, caption: 'C-STAR robot' },
      { src: `${W}/published/screenshot-2024-12-23-200721.png`, caption: 'Mechanism detail' },
      { src: `${W}/editor/screenshot-2024-01-30-005326.png`, caption: 'System overview' },
    ],
  },
  {
    id: 'wavewise',
    title: 'WaveWise',
    category: 'Product Development',
    subtitle: 'Generate Product Development · Fall 2023',
    description:
      'Dynamic vertical kelp farm that automatically adjusts depth based on sunlight, temperature, and nutrient conditions - extending aquaculture to locations where fixed farms fail. I designed and built the depth adjustment system housed inside the buoy.',
    highlights: [
      'Designed a winch-based depth adjustment system with a 2:1 differential gear reduction for reliable output force',
      'Specified motors through hand calculations and verified the design for marine loading conditions',
      'Packaged electronics in an IP-68 waterproof COTS enclosure rated for full submersion',
      'System integrates salinity, pH, temperature, UV, and pressure sensors for autonomous depth control',
      'Demonstrated a functional first prototype in an aquatic environment',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'IP68', 'Mechanisms', 'Marine', 'Sensors'],
    image: `${W}/editor/screenshot-2024-01-21-163135.png`,
    images: [
      { src: '/wavewise_submersible_moving.gif', caption: 'Buoy adjusting depth underwater' },
      { src: `${W}/screenshot-2024-01-21-162635_orig.png`, caption: 'Depth adjustment system' },
      { src: `${W}/published/screenshot-2024-01-21-164135.png`, caption: 'Buoy system overview' },
    ],
  },
  {
    id: 'ne-racing',
    title: 'NE Electric Racing',
    category: 'Formula SAE',
    subtitle: 'Formula SAE · Ergonomics Subteam',
    description:
      "Ergonomics subteam member on Northeastern's Formula SAE electric vehicle, responsible for the accelerator pedal assembly. Designed for driver comfort and structural safety under the high loads of a hydraulic brake system.",
    highlights: [
      'Determined optimal foot-to-pedal angles through ergonomic analysis and driver measurements',
      'Designed mounting brackets that house pedals while clearing brake pedal and hydraulic lines',
      'Ran FEA to verify structural integrity under hydraulic loading - maintained a Factor of Safety >= 3',
      'Proposed next-iteration torsion spring design to reduce part count and create a more compact assembly',
    ],
    accent: '#22c55e',
    tags: ['Formula SAE', 'SolidWorks', 'FEA', 'Ergonomics'],
    image: `${W}/ner_orig.png`,
    images: [
      { src: `${W}/published/screenshot-2023-11-05-013408.png`, caption: 'Pedal assembly CAD' },
      { src: `${W}/screenshot-2023-11-05-013350-orig_orig.png`, caption: 'Accelerator pedal assembly' },
    ],
  },
  {
    id: 'robotic-hand',
    title: 'Robotic Hand',
    category: 'Personal Project',
    subtitle: 'Tendon-Driven Prototype',
    description:
      'Built a tendon-driven anthropomorphic robotic hand from scratch using a 3D printer and an open-source STL model. Independently solved four major mechanical and electrical challenges that came up during assembly and testing.',
    problem:
      "Four things broke in sequence: joints too tight to move, cables slipping off the pulley, stiffness coming back after filing, and every battery I tried - AAs, NiMH packs - either couldn't handle five servos at once or dropped voltage mid-motion. Each fix revealed the next problem.",
    result:
      'All five fingers operate with full independent range of motion through the tendon-driven pulley system.',
    highlights: [
      'Five-finger independent actuation via servo motors pulling tension cables through a pulley system',
      'Solved tolerancing issues by manually filing printed parts to achieve proper joint alignment',
      'Redesigned servo pulley with a lipped groove to prevent cable slippage under load',
      'Fixed joint stiffness through filing and application of synthetic lubricant',
      'Resolved power supply instability - settled on a regulated 6.8V / 7A DC supply after testing multiple battery configs',
    ],
    accent: '#22c55e',
    tags: ['Robotics', '3D Printing', 'Servo', 'Mechanisms'],
    image: `${W}/thumbnail-img-3388_orig.jpg`,
    images: [
      { src: `${W}/published/robot-hand1.jpg`, caption: 'Robotic hand assembly' },
      { src: `${W}/published/robot-hand2.jpg`, caption: 'Tendon-driven fingers' },
      { src: `${W}/published/thumbnail-image0.jpg`, caption: 'Full hand view' },
    ],
  },
  {
    id: 'hammer',
    title: 'General Purpose Hammer',
    category: 'Manufacturing',
    subtitle: 'Manual Machining · Mill & Lathe',
    description:
      'Designed and machined a modular hammer from scratch on a manual mill and lathe to build hands-on manufacturing skills. The interchangeable head design reinforced CAD-to-manufacturing workflows, thread tolerancing, and precision fitting.',
    highlights: [
      'Machined aluminum handle on a lathe with M10 x 1.25 external threading for modular head attachment',
      'Added a knurled grip for ergonomic handling under load',
      'Machined bronze hammer head on a mill with a matching M10 x 1.25 tapped hole',
      'Modular design allows swapping different head types for multiple applications from a single handle',
    ],
    accent: '#22c55e',
    tags: ['Manual Machining', 'Mill & Lathe', 'GD&T', 'DFM'],
    image: `${W}/published/hammer.jpg`,
    images: [
      { src: `${W}/published/hammer2.jpg`, caption: 'Handle detail' },
      { src: `${W}/published/hammer-cad.png`, caption: 'CAD model' },
    ],
  },
  {
    id: 'whisk',
    title: 'W.H.I.S.K.',
    category: 'Course Project',
    subtitle: 'Mini Project · ME Design (ME 4550)',
    description:
      'Wireless Hands-Free Intelligent Stirring Kitchen-Aid - an automatic rotary utensil holder that keeps a pot continuously stirred so you can focus on the rest of the meal. Designed and analyzed as part of a mechanical design course.',
    highlights: [
      'NEMA stepper motor drives a pulley-and-pin mechanism that locks onto an angled spoon and rotates it continuously',
      'Performed static and fatigue analysis on all main structural components',
      'Calculated fastener and material stiffness at the clamp-rail interface with safety factor verification against bolt failure and loosening',
      'CAD modeled and animated in Onshape with full mechanism frame analysis',
    ],
    accent: '#22c55e',
    tags: ['Onshape', 'Mechanisms', 'Fatigue Analysis', 'ME Design'],
    image: `${W}/published/whisk.gif`,
    images: [
      { src: `${W}/editor/whisk.png`, caption: 'W.H.I.S.K. CAD model' },
      { src: `${W}/screenshot-2024-12-27-013053_orig.png`, caption: 'Mechanism analysis' },
    ],
  },
  {
    id: 'motor-control',
    title: 'DC Motor Control',
    category: 'Course Project',
    subtitle: 'Mini Project · Mechatronic Systems (ME 5245)',
    description:
      'Three-part project developing Simscape models in MATLAB to predict DC motor behavior under position and speed commands, then verifying predictions against physical hardware. Built closed-loop control systems using both potentiometer and encoder feedback.',
    highlights: [
      'Designed closed-loop position control using potentiometer input and verified against encoder measurements on physical hardware',
      'Built Simscape simulation models predicting motor dynamics under position and speed commands',
      'Compared simulated potentiometer angular position vs. actual encoder readings - demonstrated close correlation between theory and hardware',
    ],
    accent: '#22c55e',
    tags: ['MATLAB', 'Simscape', 'Mechatronics', 'Controls'],
    image: `${W}/published/simulation-motor.png`,
    images: [
      { src: `${W}/hardware_orig.png`, caption: 'Hardware setup' },
      { src: `${W}/simulink-motor_orig.png`, caption: 'Simulink model' },
    ],
  },
  {
    id: 'robotic-manipulator',
    title: 'Planar 2D Robotic Manipulator',
    category: 'Course Project',
    subtitle: 'Mini Project · Robot Dynamics & Control (ME 3460)',
    description:
      'Simscape simulation of a three-jointed planar manipulator performing pick-and-place tasks using inverse kinematics and closed-loop PI control. Built in two phases: joint angle determination followed by full trajectory planning.',
    highlights: [
      'Computed homogeneous transformations and applied inverse kinematics to determine joint angles across pick-and-place locations',
      'Modeled obstacle avoidance in Simscape and verified manipulator positioning against theoretical joint angle ranges',
      'Designed end-effector trajectory between two locations and computed joint angles for the full travel path',
      'Implemented PI controllers for each motor-driven link for smooth closed-loop trajectory tracking',
    ],
    accent: '#22c55e',
    tags: ['MATLAB', 'Simscape', 'Inverse Kinematics', 'Robotics', 'Controls'],
    image: `${W}/projecta2simulink_orig.gif`,
    images: [
      { src: `${W}/editor/screenshot-2024-02-21-084246.png`, caption: 'Pick-and-place simulation' },
      { src: `${W}/editor/screenshot-2024-02-21-084734.png`, caption: 'Trajectory tracking' },
    ],
  },
  {
    id: 'jordan-shoe',
    title: 'Jordan Access 1 CAD Model',
    category: 'Course Project',
    subtitle: 'Mini Project · SolidWorks CSWA Coursework',
    description:
      'Precision SolidWorks model of the Jordan Access 1 sneaker, built to develop advanced surfacing and spline skills as part of CSWA certification coursework. Includes the Jordan logo and Jumpman signature as modeled geometry.',
    highlights: [
      'Modeled complex shoe geometry using advanced spline work for realistic surface curvature',
      'Rendered the Jordan logo and Jumpman signature as integrated 3D features',
      'Built as part of SolidWorks CSWA certification preparation',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'Surfacing', 'CSWA', 'CAD'],
    image: `${W}/editor/front-view-joradn-access-cad.png`,
    images: [
      { src: `${W}/editor/jordan-access-1-right-view-cad.png`, caption: 'Right view' },
    ],
  },
  {
    id: 'golf-tee',
    title: 'Automatic Golf Tee',
    category: 'Course Project',
    subtitle: 'Mini Project · Intro to Electrical Engineering (EECE 2210)',
    description:
      'Group-developed automatic golf tee system that dispenses golf balls and positions them on a rubber tee with three adjustable height settings. Built for an intro EE course - my focus was the mechanical feeder mechanism and integration with the servo control.',
    highlights: [
      'Designed and 3D-printed a golf ball feeder mechanism with an extruded loft top for easier ball-loading access',
      'Integrated a servo motor with a custom bracket to meter ball dispensing and prevent multiple balls from releasing at once',
      'Evaluated rack-and-pinion vs. gravity-fed delivery - chose gravity-fed to keep the design lightweight and compact',
      'System supports three adjustable tee height settings via servo positioning',
    ],
    accent: '#22c55e',
    tags: ['3D Printing', 'Arduino', 'Servo', 'Mechanisms', 'Electrical Engineering'],
    image: `${W}/editor/img-6961-mov-adobeexpress.gif`,
    images: [
      { src: `${W}/published/screenshot-2024-01-21-171844.png`, caption: 'Full system assembly' },
      { src: `${W}/screenshot-2024-01-21-171918_orig.png`, caption: 'Feeder mechanism detail' },
    ],
  },
  {
    id: 'jet-engine',
    title: 'Jet Engine CAD & Motion Study',
    category: 'Personal Project',
    subtitle: 'Mini Project · SolidWorks',
    description:
      'SolidWorks model of a Singapore Airlines jet engine built as a personal side project. Includes a kinematic Motion Study to simulate rotating turbine and fan blade mechanics.',
    highlights: [
      'Modeled the full jet engine assembly in SolidWorks from reference geometry',
      'Created a Motion Study to animate rotating turbine and fan blade kinematics',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'Motion Study', 'CAD'],
    image: `${W}/published/singapore.gif`,
  },
]

// ── Skyline Scene Cards (used by the Three.js NYC skyline section) ────────────
// accent: 'green' = engineering project, 'blue' = work experience

export interface SkylineCard {
  id: string
  name: string
  category: string
  cardDescription: string
  accent: 'green' | 'blue' | 'purple' | 'amber'
  image?: string
  cardImagePair?: [string, string]
  imagePosition?: string                           // CSS objectPosition for the card image
  imageZoom?: number                               // scale factor for the card image (e.g. 0.75 = zoom out 25%)
  headerImage?: { src: string; caption?: string }
  images?: { src: string; caption?: string; fill?: boolean; filter?: string; cropBottom?: number; pairSrc?: string; pairCaption?: string; containerWidth?: string }[]
  galleries?: { label: string; autoScroll?: boolean; images: { src: string; caption?: string; containerWidth?: string }[] }[]
  sideImage?: { src: string; caption?: string }
  problemExtra?: { src: string; caption?: string; pairSrc?: string; pairCaption?: string }
  problem?: string
  approach?: string
  result?: string
  highlights?: string[]
  imageGrid?: { src: string; caption: string; label?: string }[]
  successGrid?: { title: string; src: string }[]
  articles?: { label: string; url: string }[]
  videos?: { url: string; caption?: string }[]
  posterPdf?: string
  pdfLabel?: string
  tags: string[]
}

export const SKYLINE_CARDS: SkylineCard[] = [
  // ── Projects (green) ──────────────────────────────────────────────────────
  {
    id: 'rl-grasping',
    name: 'Vision-Based RL Grasping',
    category: 'Course Project · CS 5180',
    cardDescription: 'Warehouse robot grasping research. Franka Panda trained via PPO & SAC to intercept moving conveyor objects using YOLO.',
    accent: 'green',
    image: '/rl/env_side_overview.png',
    images: [
      { src: '/rl/env_stage1_side.png', caption: 'Stage 1: Franka Panda arm intercepting soda can on conveyor' },
      { src: '/rl/env_stage2_perception.png', caption: 'Stage 2: YOLO bounding boxes on overhead camera feed' },
      { src: '/rl/env_yolo_detection_can.png', caption: 'YOLO detection: soda can with class label and confidence score' },
      { src: '/rl/training_dual_axis.png', caption: 'Training curves: PPO (55M steps) vs SAC (10M steps), reward and success rate' },
      { src: '/rl/results_bar_charts.png', caption: 'Results: both reach 100% grasp success; SAC achieves it in 5× fewer training steps' },
    ],
    problem: "Warehouse automation depends on robots that can reliably sort and grasp objects moving on conveyor belts, the kind of repetitive, high-throughput task that defines fulfillment centers. Classical trajectory planning and IK solve this only when the object is stationary. The moment it moves, you can't pre-plan a path to a target that shifts every frame. Deep RL offers a different approach: instead of planning, the arm learns a policy that continuously adapts to where the object actually is. We replicated and extended existing research on vision-based grasping, combining YOLO perception with PPO and SAC to train a Franka Panda arm to intercept soda cans and milk cartons moving at variable belt speeds, entirely through trial and error in simulation.",
    approach: "Built a two-stage curriculum in MuJoCo: Stage 1 trains on a single object (soda can) at fixed belt speed; Stage 2 transfers those weights to handle two object types at random speeds (0.03–0.22 m/s). A YOLOv8n model trained on 500 synthetic images detects the object in a 640×640 overhead camera image and projects the bounding box center to 3D. The RL agent receives a 15-number state vector (7 joint angles, gripper XYZ, object class/XYZ/yaw) and outputs 6 joint angle deltas per step. Reward shapes distance-to-object continuously (+1000 × improvement/step) with a large success bonus (+3000) when the gripper closes within 3 cm. Compared PPO (Juan Cerquera) vs SAC (Jason Widjaja).",
    result: 'Both PPO and SAC reach 100% grasp success rate. SAC gets there 5x faster (~5M steps/stage vs ~24M for PPO) and grasps in fewer steps per episode (17.5 vs 20.8 on Stage 2). Curriculum learning transferred cleanly with no success rate regression when Stage 2 started from Stage 1 weights.',
    successGrid: [
      { title: 'PPO — Stage 2 Deployment', src: '/rl/ppo_stage2_deploy.gif' },
      { title: 'SAC — Stage 2 Deployment', src: '/rl/sac_stage2_deploy.gif' },
    ],
    highlights: [
      'Implemented and tuned SAC (Soft Actor-Critic): replay buffer of 1M transitions, entropy bonus for exploration, MLP [256, 256], ~5M steps/stage',
      'PPO comparison by teammate: MLP [64, 64], 2048-step rollouts, ~24M steps/stage; both hit 100% success',
      'Two-stage curriculum: Stage 1 (single object, fixed 0.05 m/s) → Stage 2 (two classes, random 0.03–0.22 m/s)',
      'YOLOv8n perception pipeline: 500 synthetic training images, 2D bounding box projected to 3D via known camera intrinsics',
      'MDP: 15-dim state (joint angles + gripper XYZ + object class/XYZ/yaw), 6-dim continuous action (±0.05 rad/step)',
      'Post-grasp placement via Jacobian pseudo-inverse IK: lift → translate → lower → open gripper',
      'Key fix: reward time-bonus formula was 200x too small; fixing it unblocked both algorithms simultaneously',
      'SAC converges 5× faster with more direct approach paths; PPO more stable but sample-inefficient',
    ],
    tags: ['Reinforcement Learning', 'MuJoCo', 'Python', 'YOLO', 'SAC', 'PPO', 'Robotics'],
  },
  {
    id: 'ankle-exo',
    name: 'Ankle Exoskeleton',
    category: 'Course Project · ME 6250',
    cardDescription: 'Low-cost 3D-printed ankle exoskeleton with cable-driven plantarflexion assist and IMU-based gait detection.',
    accent: 'green',
    image: '/exo/p3_img0.png',
    imageZoom: 0.9,
    images: [
      { src: '/exo/p3_img0.png', caption: 'Final assembled prototype — CAD render and physical build' },
      { src: '/exo-demo.gif', caption: 'Prototype demonstrating cable-driven plantarflexion assist at toe-off', fill: true, filter: 'saturate(0.6) contrast(0.9)', cropBottom: 20 },
      { src: '/exo/p2_img2.png', caption: 'Exploded view: Moteus C1 motor, 5:1 planetary gearbox, ring carrier, and pulley' },
      { src: '/exo/p2_img1.png', caption: 'Final power transmission — isometric and exploded CAD views (120 mm diameter)' },
      { src: '/exo/p2_img3.png', caption: 'First iteration prototype (200 mm diameter) — oversized SOLIDWORKS gears' },
    ],
    problem: 'Ankle exoskeletons range from $300 for passive braces to over $90,000 for FDA-approved robotic systems, making them inaccessible for most research and clinical use. Existing designs rely on expensive custom actuators and precision-machined components. The goal was to build a functional cable-driven exoskeleton using additive manufacturing that could augment Achilles tendon force during gait — proving out the mechanical and control architecture at a fraction of the cost.',
    approach: 'Designed a three-subsystem prototype: a PLA calf brace (3 iterations) housing a moteus-C1 BLDC motor and custom SLA-printed 5:1 planetary gearbox (downsized from 200 mm to 120 mm diameter using COTS McMaster gears), a foot brace acting as the shoe sole with a rear cable hook and IMU cavity, and rails connecting both along the shank. A Raspberry Pi 4 reads an MPU6050 IMU at 100 Hz over I2C, fuses accelerometer and gyroscope via a complementary filter (98%/2%), and commands the motor over CAN-FD at 5 Mbps. Threshold-based logic detects toe-off (pitch < −16°) and triggers plantarflexion, returning home when pitch > −8°.',
    result: 'Functional prototype delivering plantarflexion assistance at toe-off during gait. Demonstrated feasibility of a low-cost, additively manufactured exoskeleton — achieving >10 N·m peak torque — as a viable alternative to precision-machined systems.',
    highlights: [
      'Led power transmission design: specified 5:1 planetary gear ratio and increased output pulley diameter by 25% to meet torque spec — validated against prior 6:1 iteration that was mechanically sound but too large to package',
      'Downsized gearbox from 200 mm to 120 mm diameter by switching to COTS McMaster gears modified to accept press-fit bearings',
      'Ideated nut-and-bolt fastener slot geometry in the calf brace for secure, rework-accessible component attachment without adhesives',

      'Threshold gait logic: pitch < −16° triggers active plantarflexion, pitch > −8° returns motor home passively',
      'Motor control: moteus-C1 FOC at 15–30 kHz, 10 ms position commands over CAN-FD with hardware watchdog safeguard',
      'Power: 4S1P LiPo (14.8 V, 5000 mAh, 74 Wh) with buck converter to 5 V for Raspberry Pi',
    ],
    tags: ['SolidWorks', 'Python', 'Raspberry Pi', 'BLDC', 'Gait Detection', 'IMU', '3D Printing', 'Mechatronics', 'CAN-FD'],
  },
  {
    id: 'bourbot',
    name: 'Bourbot',
    category: 'Senior Capstone',
    cardDescription: '550-lb whiskey barrel handling robot. Designed the actuated ball-screw lifting mechanism.',
    accent: 'amber',
    image: `${W}/full-barrel-rolling_orig.gif`,
    posterPdf: '/bourbot_final_poster.pdf',
    images: [
      { src: `${W}/published/screenshot-2025-05-19-004650.png`, caption: 'Bourbot subsystem breakdown' },
      { src: `${W}/published/screenshot-2025-07-03-004616.png`, caption: 'Preliminary Design Sketch of Bourbot' },
      { src: `${W}/published/img-9793-online-video-cutter-com.gif`, caption: 'Actuated ball-screw lifting mechanism engaging to allow wedging of barrel' },
      { src: `${W}/published/screenshot-2025-05-19-004650.png`, caption: 'Preliminary design sketch' },
      { src: `${W}/img-7658_orig.gif`, caption: 'Barrel rolling on 4° incline' },
      { src: `${W}/published/img-9793-online-video-cutter-com.gif`, caption: 'Barrel lifting demo' },
      { src: `${W}/editor/img-8672-720.jpg`, caption: 'Team photo – Capstone day' },
    ],
    galleries: [
      {
        label: 'Design Calculations',
        images: [
          { src: `${W}/published/screenshot-2025-07-03-004803.png`, caption: 'Ball Screw Calculations' },
          { src: `${W}/published/screenshot-2025-07-03-004839.png`, caption: 'Structural Calculations' },
        ],
      },
      {
        label: 'In Action',
        images: [
          { src: '/circle.gif', caption: 'Bourbot navigating tight corners' },
        ],
      },
    ],
    problem: "Rickhouses weren't built for machines — narrow aisles, sloped floors, and 550-lb barrels that want to roll wherever they feel like. I had to design a lifting mechanism that could clock a barrel's bung plug to within a few degrees and lift it cleanly, all in a space barely wider than the robot itself.",
    approach: "Designed a ball-screw driven lifting system sized via MATLAB torque and speed calculations. Ran FEA on the lifting frame under worst-case loading. Built the bung clocking mechanism for repeatable angular alignment. Conducted barrel push-force characterization tests to define real design load inputs. Integrated lifting, rolling, and locomotion subsystems and coordinated sequencing with the controls team.",
    result: 'Demonstrated all four key operations live on a 550-lb barrel: rolling, clocking, lifting, and 4° incline navigation during the final client demo.',
    highlights: [
      'Led lifting mechanism as designated lead — designed a ball-screw driven system to elevate the barrel and clock the bung plug to target orientation',
      'Sized the lifting actuator through torque and speed calculations in MATLAB, accounting for ball-screw lead, lift height, and static friction load',
      'Ran FEA on the lifting frame under worst-case barrel loading — verified stress concentrations and deflection stayed within acceptable limits',
      'Conducted barrel force push characterization tests at multiple floor angles to define real design load inputs',
      'Designed the bung clocking mechanism for repeatable angular alignment, validated with repeated live tests on the physical barrel',
      'Integrated lifting, rolling, and locomotion subsystems — resolved interface conflicts and coordinated sequencing with the controls team',
      'Successfully demonstrated: rolling a 550-lb barrel, clocking the bung, lifting via the actuated mechanism, and navigating a 4° incline',
    ],
    successGrid: [
      { title: 'Bung Clocking', src: `${W}/clocking_orig.gif` },
      { title: 'Lifting Mechanism', src: `${W}/lifting-mechanism-front-view-online-video-cutter_orig.gif` },
      { title: 'Barrel Rolling — 4° Incline', src: `${W}/img-7658_orig.gif` },
      { title: 'Barrel Lifting', src: `${W}/published/img-9793-online-video-cutter-com.gif` },
    ],
    tags: ['SolidWorks', 'FEA', 'MATLAB', 'Mechanisms'],
  },
  {
    id: 'cobra',
    name: 'COBRA',
    category: 'NASA Competition',
    cardDescription: '1st place lunar snake robot. Artemis Award, $170K+ funding.',
    accent: 'amber',
    image: `${W}/published/screenshot-2024-01-21-172643.png`,
    videos: [
      { url: 'https://www.youtube.com/watch?v=Zv2XgsOK-Tg', caption: 'Field testing at the NASA Big Idea Forum 2022' },
    ],
    images: [
      { src: `${W}/northeastern-cobra-highlights_orig.gif`, caption: 'COBRA locomotion highlights' },
      { src: `${W}/screenshot-2025-05-25-013343_orig.png`, caption: 'Team photo – NASA Big Idea Forum, Pasadena', fill: true },
      { src: `${W}/published/screenshot-2024-01-21-172919.png`, caption: 'Prototype joint geometry' },
      { src: `${W}/published/screenshot-2024-01-21-174042.png`, caption: 'COBRA joint assembly' },
      { src: `${W}/published/screenshot-2023-11-05-000419.png`, caption: 'Sidewinding locomotion' },
      { src: '/pasadena.png', caption: 'NASA Big Idea Forum – Pasadena, CA' },
    ],
    problem: 'One weak joint in an 11-module daisy chain stops the whole snake. The voltage regulator enclosures had to survive repeated tumbling impact while fitting within the modular form factor — without adding mass that breaks the locomotion math.',
    approach: 'As a freshman with limited CAD experience, I experimented with SolidWorks extruded features to explore geometries for tumbling support. A square-like geometry provided the best support on flat surfaces while allowing full range of motion. Engineered enclosures for voltage regulators across the Dynamixel motor chain. Assisted with full robot assembly and field-testing demonstrations at the Pasadena forum.',
    result: '$170K+ in funding and the Artemis Award — 1st place across all evaluation criteria at the NASA Big Idea Forum in Pasadena, CA. Featured in NASA, Wired, VOA News, and Northeastern University press.',
    highlights: [
      'Developed prototype joint geometries in SolidWorks to optimize surface support during tumbling and sidewinding locomotion',
      'Engineered protective enclosures for voltage regulators across the daisy-chained Dynamixel motor chain',
      'Square-like attachment geometry provided the best balance of flat-surface support and range of motion (validated on mini-COBRA)',
      'Assisted with robot assembly and presented at the NASA Big Idea Forum in Pasadena, CA',
      'Scored top honors across all evaluation criteria — 1st place, $170K+ in funding, Artemis Award',
      'Covered by NASA.gov, Wired, VOA News, and Northeastern University News',
      'Contributed to technical writing for the project report and competition submission',
    ],
    articles: [
      { label: 'NASA.gov', url: 'https://www.nasa.gov/directorates/stmd/northeastern-university-slithers-to-the-top-with-big-idea-alternative-rover-concept/' },
      { label: 'Wired', url: 'https://www.wired.com/story/rovers-are-so-yesterday-its-time-to-send-a-snakebot-to-space/' },
      { label: 'VOA News', url: 'https://www.voanews.com/a/us-students-big-idea-could-help-nasa-explore-the-moon/6954875.html' },
      { label: 'Northeastern News', url: 'https://news.northeastern.edu/2022/12/07/snake-robot-nasa-moon/' },
    ],
    imageGrid: [
      { src: `${W}/published/screenshot-2024-01-21-172942.png`, caption: 'Iteration 1 — initial enclosure geometry', label: 'Voltage Regulator Enclosure — CAD Iterations' },
      { src: `${W}/published/screenshot-2024-01-21-172919.png`, caption: 'Iteration 2 — revised profile' },
      { src: '/screenshot-2024-01-21-173004_orig.png', caption: 'Iteration 3 — further refinement' },
      { src: `${W}/published/screenshot-2024-01-21-174042.png`, caption: 'Iteration 4 — final square-like geometry' },
    ],
    tags: ['Robotics', 'SolidWorks', 'NASA', 'Locomotion'],
  },
  {
    id: 'brailleforge',
    name: 'BrailleForge',
    category: 'MakeMIT 2023',
    cardDescription: 'Real-time braille embosser. 3rd place MakeMIT · 50+ teams.',
    accent: 'amber',
    image: `${W}/published/img-7243.jpeg`,
    headerImage: { src: `${W}/editor/original.png`, caption: 'MakeMIT 2023' },
    images: [
      { src: `${W}/full-assembly-cad-2_orig.png`, caption: 'Full assembly CAD' },
      { src: `${W}/editor/screenshot-2023-11-05-015117.png`, caption: '3rd place – MakeMIT Hardwarethon', fill: true },
    ],
    problem: '15 hours, a limited machine shop, and mostly repurposed parts — there was no time to iterate. The needle had to hit every dot deep enough to be readable on the first real run. Any vibration or inconsistent force and a judge\'s finger wouldn\'t feel anything.',
    approach: 'Led full CAD design for a 2-axis gantry with NEMA 23 steppers and lead-screw linear motion. Used a solenoid-driven sewing needle for embossing. Designed motor mount fixtures using 3D printing to reduce vibration and distribute loads. Used zip ties to secure the belt ends of the open-loop belt drive when no closed-loop timing belt was available.',
    result: '3rd place out of 50+ teams at MakeMIT 2023 (theme: Recovery). Printed a braille greeting card live — confirmed readable by a judge whose mother is blind.',
    successGrid: [
      { title: 'Embossing in Action', src: '/brailleforge-embossing.gif' },
      { title: 'Final Braille Postcard', src: '/brailleforge-result.png' },
    ],
    highlights: [
      'Led full CAD design and 80/20 aluminum structure assembly for a 2-axis gantry system',
      'NEMA 23 stepper motors with lead screws for X/Y positioning and a solenoid + sewing needle for dot embossing',
      '3D-printed motor mount fixtures to distribute vibration and prevent slipping on the 80/20 frame',
      'Secured open-loop belt ends with zip ties when standard closed-loop timing belt was unavailable',
      '3rd place out of 50+ teams — braille card confirmed readable by a judge whose mother is blind',
      'Built entirely in 15 hours at MIT with makeshift machine shop access and limited materials',
    ],
    tags: ['Arduino', '2-Axis Gantry', 'Python', '3D Printing'],
  },
  {
    id: 'fitolux',
    name: 'Fitolux',
    category: 'Generate Product Development · Fall 2024',
    cardDescription: 'Dual-system supplement dispenser. Hardware lead, team of 5 MEs.',
    accent: 'purple',
    image: '/fitolux-prototype.png',
    problemExtra: { src: '/fitolux-card-1.png', caption: 'Countertop dispenser CAD render', pairSrc: '/fitolux-card-2.png', pairCaption: 'Portable dispenser CAD render' },
    posterPdf: '/auger_screw_motor_calculation_slides.pdf',
    pdfLabel: 'View Motor Calculations',
    videos: [
      { url: 'https://www.youtube.com/watch?v=cfATa8s__wA', caption: 'Countertop powder dispensing demo' },
    ],
    images: [
      { src: `${W}/screenshot-2025-02-01-182356_orig.png`, caption: 'Countertop Dispenser', pairSrc: '/thumbnail-image8_orig.jpg', pairCaption: 'Portable Dispenser' },
      { src: `${W}/published/fitlolux-portable-clip.gif`, caption: 'Portable unit demo' },
      { src: '/thumbnail-image4_orig.jpg', caption: 'Silicone mold — before', pairSrc: '/thumbnail-image6_orig.jpg', pairCaption: 'Silicone mold — after improvements' },
      { src: `${W}/editor/sweeper-mechanism.gif`, caption: 'Sweeper mechanism' },
      { src: `${W}/published/screenshot-2024-12-23-234103.png`, caption: 'Silicone mold – gripper handle v3' },
      { src: `${W}/published/screenshot-2024-12-23-234817.png`, caption: 'Silicone mold iterations' },
      { src: `${W}/published/screenshot-2024-12-23-193302.png`, caption: 'Countertop unit CAD' },
      { src: `${W}/published/thumbnail-image4.jpg`, caption: 'Countertop prototype' },
      { src: `${W}/published/thumbnail-image6.jpg`, caption: 'Portable prototype' },
      { src: `${W}/published/thumbnail-image7.jpg`, caption: 'Team testing' },
    ],
    problem: 'One auger mechanism had to work in two totally different form factors — a full countertop station and a portable handheld unit — without starting from scratch for each. On top of that, the silicone mold for the handle grip took three failed iterations before it came out clean.',
    approach: 'Led a team of 5 MEs through requirements, design reviews, prototyping, and validation. Designed a unified motorized auger dispensing mechanism for both form factors (hopper + auger screw + outlet). Performed MATLAB torque analysis to specify DC motor requirements. Iterated the silicone mold with improvements including additional edge gates, increased draft angles, alignment pins, vent holes, PTFE lubricant, and edge fillets.',
    result: 'Delivered functional hardware for both the countertop and portable form factors — hardware-led from requirements through full prototyping and client validation.',
    highlights: [
      'Led a team of 5 MEs through requirements definition, design reviews, prototyping, and validation',
      'Designed a unified motorized auger dispensing mechanism used in both the countertop and portable device',
      'Countertop unit features an 80/20 frame, removable hopper (up to 2 lbs), and a load cell for weight-based dosing',
      'Portable device includes a sweeper mechanism with a torsion spring that returns to position after dispensing',
      'Performed MATLAB torque analysis and hand calculations to specify DC motor and auger screw requirements',
      'Iterated a two-part silicone mold through 3+ versions — fixing incomplete fills, demolding issues, trapped air, and uneven flow',
      'Worked with EE subteam to integrate PCB, LCD, and directional dial into both mechanical housings',
    ],
    tags: ['SolidWorks', '3D Printing', 'MATLAB', 'Silicone Molding'],
  },
  {
    id: 'cstar',
    name: 'C-STAR',
    category: 'Generate Product Development · Spring 2024',
    cardDescription: 'Acoustic concrete delamination detection robot. Led sounder mechanism.',
    accent: 'purple',
    image: `${W}/published/cstar-08.jpg`,
    posterPdf: '/c-star_hw_final_report.pdf',
    pdfLabel: 'View Final Report',
    videos: [
      { url: 'https://www.youtube.com/watch?v=cR8J74fFZMI', caption: 'C-STAR in action' },
      { url: 'https://www.youtube.com/watch?v=2Xt8i9xkP8w', caption: 'Sounder mechanism — garage testing' },
    ],
    images: [
      { src: `${W}/published/soundermechanism-10-1.gif`, caption: 'Blender rendering — sprocket sounder on concrete' },
      { src: `${W}/published/cstar-08.jpg`, caption: 'C-STAR robot', pairSrc: `${W}/published/screenshot-2024-12-23-203621.png`, pairCaption: '2D mapping of dense and hollow concrete from mic data' },
      { src: `${W}/published/screenshot-2024-12-23-204111.png`, caption: 'Bottom view of C-STAR', pairSrc: '/screenshot-2024-05-05-234133_orig.png', pairCaption: 'Sounder linkage body — prototype iteration' },
      { src: `${W}/editor/screenshot-2024-12-24-010605.png`, caption: 'Sounder linkage evolution' },
      { src: `${W}/editor/screenshot-2024-01-30-005326.png`, caption: 'Sounder mechanism assembly' },
      { src: `${W}/published/screenshot-2024-12-23-200721.png`, caption: 'Sprocket detail and mic placement' },
    ],
    problem: 'The sounder had to hit concrete at a consistent force while the robot was moving — any vibration or inconsistent contact and the acoustic signature was garbage. It also had to fit within a tight chassis, clear speed bumps without bouncing, and avoid generating its own noise that would pollute the mic signal.',
    approach: 'Led sounder mechanism design: a sprocket-based system passively driven by robot motion that strikes concrete and projects noise to a PCB microphone. Performed static calculations and used MATLAB to determine the optimal spring constant, minimizing oscillations over speed bumps. Iterated the linkage size to fit the sheet-metal base plate and position the mic PCB near the sprocket. Collaborated with the electrical team on PCB integration and ADC signal processing.',
    result: 'Successfully differentiated hollow (delaminated) from solid concrete acoustically in both benchtop and field testing at a school parking garage, with minor variance from environmental factors.',
    highlights: [
      'Led sounder mechanism development — a sprocket-based system passively driven by the robot that strikes and sounds concrete surfaces',
      'Noise-proof linkage structure eliminates external noise pollution; single sprocket channels sound directly to the microphone PCB',
      'Performed MATLAB spring constant optimization to minimize oscillations when the robot crosses speed bumps',
      '3D-printed linkage mounted on a shaft and bearing to passively adapt to obstacles without losing contact',
      'Vibration mounts on the sides allow linkage connectivity while isolating chassis vibration',
      'Collaborated with EE team on PCB microphone integration and ADC signal processing pipeline',
      'Field-tested at school parking garage — successfully differentiated solid vs. hollow concrete sound signatures',
    ],
    tags: ['SolidWorks', 'Sensors', 'Acoustics', 'Mechanisms'],
  },
  {
    id: 'wavewise',
    name: 'WaveWise',
    category: 'Generate Product Development · Fall 2023',
    cardDescription: 'Dynamic vertical kelp farm system with autonomous depth adjustment.',
    accent: 'purple',
    image: '/screenshot-2024-01-21-165110_orig.png',
    posterPdf: '/wavewise_final_report.pdf',
    pdfLabel: 'View Final Report',
    videos: [
      { url: 'https://www.youtube.com/watch?v=V0MTFVI5-2Y', caption: 'System overview demo' },
    ],
    galleries: [
      {
        label: 'Project Subsystems',
        images: [
          { src: '/screenshot-2024-01-21-162942_orig.png', caption: '(1) Buoy' },
          { src: '/screenshot-2024-01-21-162959_orig.png', caption: '(2) Depth Adjustment System' },
          { src: '/screenshot-2024-01-21-163020_orig.png', caption: '(3) Submersible Module', containerWidth: '45%' },
          { src: '/screenshot-2024-01-21-163040_orig.png', caption: '(4) Full Assembly' },
        ],
      },
      {
        label: 'Depth Adjustment Mechanism — My Contribution',
        images: [
          { src: '/screenshot-2024-01-21-163742_orig.png', caption: 'Top-level assembly' },
          { src: '/screenshot-2024-01-21-163759_orig.png', caption: 'Drivetrain detail' },
          { src: '/screenshot-2024-01-21-163819_orig.png', caption: 'Gear reduction assembly' },
          { src: '/screenshot-2024-01-21-163836_orig.png', caption: 'Component breakdown' },
        ],
      },
    ],
    images: [
      { src: `${W}/screenshot-2024-01-21-162635_orig.png`, caption: 'Depth adjustment system' },
      { src: '/screenshot-2024-01-21-164647_orig.png', caption: 'Neutral buoyancy, lift force & drum geometry calculations', pairSrc: '/screenshot-2024-01-21-164708_orig.png', pairCaption: 'Motor torque spec at FOS 3' },
      { src: '/screenshot-2024-01-21-165110_orig.png', caption: 'Underwater test', pairSrc: '/img-1325_orig.gif', pairCaption: 'Depth adjustment in action' },
    ],
    problem: 'Maine aquatic farmers needed a kelp farm that could reach locations where fixed-depth systems fail — sunlight, temperature, and nutrients all vary with depth. The challenge: design a reliable depth adjustment mechanism that survives harsh marine environments with IP-68 protection.',
    approach: 'Designed the depth adjustment mechanism — a winch system with a differential gear drivetrain driving three drum lines (kelp release, kelp retrieval, and submersible electrical cable) from a single motor. The differential enables opposite-direction drum rotation as needed. A 2:1 gear reduction delivers higher torque at lower speeds. Hand-calculated submersible mass for neutral buoyancy, required lift force, minimum drum radius for 75 ft of rope, and motor torque at FOS 3. Full drivetrain and electronics packaged inside a COTS IP-68 enclosure.',
    result: 'Functional depth adjustment prototype demonstrated in an aquatic environment — submersible successfully adjusted depth on command.',
    highlights: [
      'Designed differential-gear winch system driving three drum lines (kelp release, retrieval, electrical cable) from a single motor',
      'Differential gear drivetrain enables opposite-direction drum rotation simultaneously from one motor input',
      '2:1 gear reduction delivers higher torque at lower drum speeds for reliable load handling',
      'Hand-calculated: submersible mass for neutral buoyancy, lift force, minimum drum radius for 75 ft of rope, and motor torque at FOS 3',
      'Full drivetrain and electronics packaged in a COTS IP-68 enclosure rated for full marine submersion',
      'Submersible module integrates salinity, pH, temperature, UV, and pressure sensors for autonomous depth control',
    ],
    tags: ['SolidWorks', 'IP68', 'Marine', 'Mechanisms', 'Sensors'],
  },
  {
    id: 'robotic-hand',
    name: 'Robotic Hand',
    category: 'Personal Project',
    cardDescription: 'Tendon-driven anthropomorphic hand prototype with independent finger actuation.',
    accent: 'green',
    image: `${W}/thumbnail-img-3388_orig.jpg`,
    videos: [
      { url: 'https://www.youtube.com/watch?v=T_GyoB38Y3c', caption: 'Robotic hand demo' },
    ],
    imagePosition: 'top',
    imageZoom: 0.75,
    images: [
      { src: `${W}/published/robot-hand1.jpg`, caption: 'Servo pulley system and tension cable routing' },
      { src: `${W}/published/robot-hand2.jpg`, caption: 'Tendon-driven finger actuation' },
    ],
    sideImage: { src: `${W}/published/thumbnail-image0.jpg`, caption: 'Full robotic hand assembly' },
    problem: 'Four things broke in sequence: joints too tight to move (STL tolerances don\'t match), cables slipping off the servo pulley under load, stiffness returning after filing, and every battery config tried — 4xAA, NiMH packs — either lacked current or dropped voltage mid-actuation with five servos running.',
    approach: 'Solved joint tolerancing by manually filing printed parts to achieve proper fit (STL format couldn\'t be easily re-parametrized). Redesigned the servo pulley with a lipped groove in the center to prevent cable slippage. Applied synthetic lubricant to persistent stiff joints. Tested four AA batteries (not enough current), then 6xAA NiMH (7.2V, 2000mAh), and finally settled on a regulated DC supply at 6.8V / 7A.',
    result: 'All five fingers operate with full independent range of motion through the tendon-driven pulley system.',
    highlights: [
      'Built a 3D-printed tendon-driven anthropomorphic hand using an open-source design from Thingiverse',
      'Five independent fingers actuated by servo motors pulling tension cables through a pulley system',
      'Resolved joint tolerancing by manually filing printed parts — STL format couldn\'t be re-parametrized directly',
      'Redesigned servo pulley with a lipped groove in the center path to prevent cable slippage under load',
      'Applied synthetic lubricant to eliminate stiffness that returned after filing',
      'Resolved power supply instability after testing 4xAA, 6xAA NiMH packs — settled on a 6.8V / 7A regulated DC supply',
    ],
    tags: ['Robotics', '3D Printing', 'Servo', 'Mechanisms'],
  },
  {
    id: 'hammer',
    name: 'General Purpose Hammer',
    category: 'Manufacturing · Personal Project',
    cardDescription: 'Modular machined hammer. Manual mill & lathe. Interchangeable head.',
    accent: 'green',
    image: `${W}/published/hammer.jpg`,
    imagePosition: 'top',
    imageZoom: 0.75,
    images: [
      { src: `${W}/published/hammer-cad.png`, caption: 'CAD model', containerWidth: '37%' },
    ],
    sideImage: { src: `${W}/published/hammer2.jpg`, caption: 'Final assembled hammer' },
    problem: 'Building hands-on manufacturing competency while producing a functional, well-toleranced artifact — taking a CAD design all the way to a finished machined part with correct fit, finish, and assembly.',
    approach: 'Designed a detailed CAD model of the handle with precision knurling for grip. Machined the aluminum handle on a lathe with M10 × 1.25 external threading for interchangeable heads. Machined the bronze hammer head on a mill with a matching M10 × 1.25 tapped hole. Validated thread fit and tolerances across handle/head interface.',
    result: 'Modular design: the threaded interface allows different hammer heads to attach to the same handle for multiple applications — a single handle, multiple tools.',
    highlights: [
      'Designed a CAD model with precision knurling geometry for ergonomic grip',
      'Machined the aluminum handle on a manual lathe with M10 × 1.25 external threading',
      'Machined the bronze hammer head on a manual mill with matching M10 × 1.25 tapped hole',
      'Modular threaded interface allows interchangeable head types from a single handle',
      'Lightweight aluminum handle paired with bronze head balances weight, ergonomics, and striking mass',
      'Skills demonstrated: lathe and mill operation, threading, tapping, knurling, precision fitting',
    ],
    tags: ['Manual Machining', 'Mill & Lathe', 'GD&T', 'DFM'],
  },
  {
    id: 'golf-tee',
    name: 'Automatic Golf Tee',
    category: 'Course Project · Intro to EE',
    cardDescription: 'Motorized auto-adjusting tee system with three height settings.',
    accent: 'green',
    image: `${W}/editor/img-6961-mov-adobeexpress.gif`,
    images: [
      { src: `${W}/published/screenshot-2024-01-21-171844.png`, caption: 'Full system assembly' },
    ],
    sideImage: { src: `${W}/screenshot-2024-01-21-171918_orig.png`, caption: 'Feeder mechanism detail' },
    problem: 'Designing a reliable ball dispensing and tee-positioning mechanism that prevents multiple balls from releasing at once while keeping the system lightweight and compact for a table-top footprint.',
    approach: 'Designed and 3D-printed a golf ball feeder tube with an extruded loft top for easier ball loading. Integrated a small servo motor with a custom bracket to meter dispensing and gate ball release. Evaluated rack-and-pinion delivery but chose a gravity-fed approach to keep the design lighter and more compact. Programmed three preset tee heights via servo positioning.',
    result: 'System successfully dispensed and teed golf balls at three adjustable height settings — demonstrated in final class demo.',
    highlights: [
      'Designed and 3D-printed the golf ball feeder tube with an extruded loft top for easy loading access',
      'Integrated a servo motor with custom bracket as a gate to prevent multiple balls from dispensing at once',
      'Evaluated rack-and-pinion vs. gravity-fed delivery — selected gravity-fed for lower mass and simpler design',
      'Three adjustable tee height presets controlled via servo position',
      'Built as EE final project integrating mechanical design, 3D printing, servo control, and Arduino programming',
    ],
    tags: ['3D Printing', 'Arduino', 'Servo', 'Mechanisms'],
  },
  {
    id: 'ne-racing',
    name: 'NE Electric Racing',
    category: 'Formula SAE · Ergonomics Subteam',
    cardDescription: 'Ergonomics subteam, Formula SAE electric vehicle accelerator pedal assembly.',
    accent: 'green',
    image: `${W}/ner_orig.png`,
    images: [
      { src: `${W}/published/screenshot-2023-11-05-013408.png`, caption: 'Pedal assembly CAD' },
      { src: `${W}/screenshot-2023-11-05-013350-orig_orig.png`, caption: 'Accelerator pedal assembly' },
      { src: `${W}/screenshot-2023-03-12-155740-orig_orig.png`, caption: 'FEA analysis on pedal' },
    ],
    problem: 'Designing an accelerator pedal assembly that fits optimal driver ergonomics while clearing the brake pedal and hydraulic lines in a tightly constrained pedal box, and maintaining structural integrity under hydraulic loading forces.',
    approach: 'Determined optimal angles between the driver\'s foot and pedal through ergonomic analysis and driver measurements. Designed mount brackets to house the pedals without interfering with the brake pedal and hydraulic components. Conducted FEA analysis to verify the pedal can withstand hydraulic forces with a Factor of Safety of 3.',
    result: 'Delivered a validated accelerator pedal assembly. Proposed next-iteration design using torsion springs to reduce moving part count and create a more compact system.',
    highlights: [
      'Determined optimal foot-to-pedal angles through ergonomic analysis and driver measurements',
      'Designed mount brackets fitting pedal box constraints without interfering with brake pedal and hydraulic lines',
      'Conducted FEA analysis to verify structural integrity under hydraulic forces — confirmed FOS ≥ 3',
      'Identified opportunity to use torsion springs in next iteration to reduce part count and compactness',
    ],
    tags: ['Formula SAE', 'SolidWorks', 'FEA', 'Ergonomics'],
  },
  {
    id: 'whisk',
    name: 'W.H.I.S.K.',
    category: 'Course Project · ME Design',
    cardDescription: 'Wireless hands-free automatic pot stirrer. Stepper + pulley-pin mechanism.',
    accent: 'green',
    image: `${W}/published/whisk.gif`,
    images: [
      { src: `${W}/editor/whisk.png`, caption: 'W.H.I.S.K. CAD model' },
      { src: `${W}/screenshot-2024-12-27-013053_orig.png`, caption: 'Mechanism analysis' },
    ],
    problem: 'Continuously stir a pot hands-free — the mechanism must clamp onto a pot rim, lock an angled spoon, and rotate it without slipping or tipping under load.',
    approach: 'NEMA stepper motor drives a pulley-and-pin mechanism that locks onto the spoon handle and rotates it. Designed the clamp-rail interface with fastener and material stiffness analysis. Performed static and fatigue analysis on all main structural members.',
    result: 'CAD-modeled and animated in Onshape with full mechanism frame analysis and verified safety factors against bolt failure and loosening.',
    highlights: [
      'NEMA stepper motor drives a pulley-and-pin mechanism that locks onto an angled spoon and rotates continuously',
      'Static and fatigue analysis on all main structural components',
      'Fastener and material stiffness calculations at the clamp-rail interface — verified FOS against bolt failure and loosening',
      'Full CAD and animation in Onshape with mechanism frame analysis',
    ],
    tags: ['Onshape', 'Mechanisms', 'Fatigue Analysis', 'ME Design'],
  },
  {
    id: 'motor-control',
    name: 'DC Motor Control',
    category: 'Course Project · Mechatronics',
    videos: [
      { url: 'https://www.youtube.com/watch?v=eg0QcOfAqgM', caption: 'DC motor control demo' },
    ],
    cardDescription: 'Simscape closed-loop motor control with hardware verification. Position + speed.',
    accent: 'green',
    image: `${W}/published/simulation-motor.png`,
    images: [
      { src: `${W}/hardware_orig.png`, caption: 'Hardware setup' },
      { src: `${W}/simulink-motor_orig.png`, caption: 'Simulink model' },
    ],
    problem: 'Predict DC motor behavior under position and speed commands in simulation and verify those predictions against physical hardware measurements.',
    approach: 'Built Simscape models predicting motor dynamics. Designed closed-loop position control using potentiometer input. Compared simulated vs. actual encoder readings to validate model accuracy.',
    result: 'Close correlation demonstrated between simulated potentiometer angular position and physical encoder measurements across position and speed control modes.',
    highlights: [
      'Simscape models predicting DC motor dynamics under position and speed commands',
      'Closed-loop position control using potentiometer feedback, verified against encoder hardware',
      'Demonstrated close correlation between simulated and physical motor behavior',
    ],
    tags: ['MATLAB', 'Simscape', 'Mechatronics', 'Controls'],
  },
  {
    id: 'robotic-manipulator',
    name: '2D Robotic Manipulator',
    category: 'Course Project · Robot Dynamics',
    cardDescription: 'Three-joint planar manipulator simulation with inverse kinematics and PI control.',
    accent: 'green',
    image: `${W}/projecta2simulink_orig.gif`,
    images: [
      { src: `${W}/projecta2simulink_orig.gif`, caption: 'Pick-and-place simulation in Simscape' },
      { src: `${W}/editor/screenshot-2024-02-21-084246.png`, caption: 'Pick-and-place task setup' },
      { src: `${W}/editor/screenshot-2024-02-21-084734.png`, caption: 'Trajectory tracking' },
    ],
    problem: 'Simulate a three-jointed planar manipulator performing pick-and-place tasks using inverse kinematics and closed-loop PI control in Simscape.',
    approach: 'Computed homogeneous transformations and applied inverse kinematics for joint angle determination. Modeled obstacle avoidance in Simscape. Designed end-effector trajectory and implemented PI controllers on each motor-driven link.',
    result: 'Full pick-and-place simulation with smooth closed-loop trajectory tracking and verified positioning against theoretical joint angle ranges.',
    highlights: [
      'Computed homogeneous transformations and inverse kinematics to determine joint angles across pick-and-place locations',
      'Modeled obstacle avoidance in Simscape — verified manipulator positioning against theoretical joint angle ranges',
      'Designed full end-effector trajectory and computed joint angles for the entire travel path',
      'PI controllers on each motor-driven link for smooth closed-loop trajectory tracking',
    ],
    tags: ['MATLAB', 'Simscape', 'Inverse Kinematics', 'Robotics'],
  },
  {
    id: 'jordan-shoe',
    name: 'Jordan Access 1 CAD',
    category: 'Personal Project · SolidWorks',
    cardDescription: 'Precision SolidWorks sneaker model with Jordan logo and Jumpman signature.',
    accent: 'green',
    image: `${W}/editor/front-view-joradn-access-cad.png`,
    images: [
      { src: '/screenshot-2023-11-05-010357-orig_orig.png', caption: 'The actual Jordan Access 1 — bought in Singapore' },
      { src: `${W}/editor/jordan-access-1-right-view-cad.png`, caption: 'Right view', pairSrc: `${W}/editor/front-view-joradn-access-cad.png`, pairCaption: 'Front view' },
    ],
    problem: 'Develop advanced SolidWorks surfacing and spline techniques through a complex organic geometry challenge as part of CSWA certification coursework.',
    approach: 'Modeled complex shoe geometry using advanced splines for realistic surface curvature. Rendered the Jordan logo and Jumpman signature as integrated 3D surface features.',
    result: 'Completed precision CAD model with complex organic surfaces, Jordan logo, and Jumpman signature fully integrated as 3D geometry.',
    highlights: [
      'Complex shoe geometry using advanced spline work for realistic surface curvature',
      'Jordan logo and Jumpman signature rendered as integrated 3D features — not decals',
      'Built as part of SolidWorks CSWA certification preparation',
    ],
    tags: ['SolidWorks', 'Surfacing', 'CSWA', 'CAD'],
  },
  {
    id: 'jet-engine',
    name: 'Jet Engine CAD',
    category: 'Personal Project · SolidWorks',
    cardDescription: 'Singapore Airlines jet engine model with rotating turbine motion study.',
    accent: 'green',
    image: `${W}/published/singapore.gif`,
    images: [
      { src: `${W}/published/singapore.gif`, caption: 'Jet engine CAD with rotating turbine motion study' },
    ],
    problem: 'Model a realistic jet engine assembly in SolidWorks with a kinematic simulation of rotating turbine and fan blade mechanics.',
    approach: 'Modeled the full jet engine assembly from reference geometry. Created a Motion Study to animate rotating turbine and fan blade kinematics.',
    result: 'Completed SolidWorks model with animated Motion Study simulating realistic turbine and fan rotation.',
    highlights: [
      'Full jet engine assembly modeled in SolidWorks from reference geometry',
      'Motion Study animating rotating turbine and fan blade kinematics',
    ],
    tags: ['SolidWorks', 'Motion Study', 'CAD'],
  },
  // ── Work Experience (blue) ─────────────────────────────────────────────────
  {
    id: 'berkshire-grey',
    name: 'Berkshire Grey',
    category: 'Co-Op · Mechanical Engineer',
    cardDescription: '65% cost reduction via sheet metal conversion. Linear-actuator test rig. Scoop trailer unloader.',
    accent: 'blue',
    image: `${W}/bgsquad_orig.jpg`,
    images: [
      { src: `${W}/published/picture1-ezgif-com-optimize.gif`, caption: 'Drivetrain assembly animation' },
      { src: `${W}/picture9_orig.gif`, caption: 'Recirculation chute in action' },
      { src: `${W}/v2-pli_orig.png`, caption: 'Sheet metal PLI conversion (v2)' },
      { src: `${W}/published/billericadrivetrain.png`, caption: 'Final drivetrain – customer site' },
    ],
    problem: 'Pilot production of Scoop — a fully autonomous robotic trailer unloader — required cost-down, lead time reduction, and hardware validation across multiple mechanical systems under tight deployment timelines.',
    approach: 'Drove design reviews and custom part release for electromechanical assemblies. Delivered a linear-actuator test rig with 1" centerline tracking accuracy. Converted a machined PLI body to sheet-metal with CNC ribs. Deployed a recirculation chute reducing SQA cycling times 30%.',
    result: '65% part cost reduction ($750 → $281/unit). Chute cut test lead time by 3+ weeks and saved up to $10K+ per system.',
    tags: ['SolidWorks', 'Sheet Metal', 'DFM', 'FEA', 'Production'],
  },
  {
    id: 'draper',
    name: 'Draper Laboratory',
    category: 'Co-Op · Electro-Mechanical Engineer',
    cardDescription: '30+ GD&T drawing packages. IFOG integration hardware. MATLAB-LTSpice workflow.',
    accent: 'blue',
    image: `${W}/published/screenshot-2025-03-25-143254.png`,
    images: [
      { src: `${W}/published/screenshot-2025-03-25-145500.png`, caption: 'IFOG universal integration stand' },
    ],
    problem: 'Supporting the Next Generation IFOG program required improving integration ergonomics, releasing precision drawing packages to external vendors, and automating tedious circuit parameter sweeps.',
    approach: 'Enhanced IFOG integration hardware across two production iterations and one worm-gear POC. Released 30+ ASME Y14.5 GD&T drawing packages. Built a MATLAB-LTSpice workflow to sweep circuit parameters and eliminate voltage spikes.',
    result: '1 hour per unit saved in assembly processing. 30+ drawing packages released. Manual circuit tuning effort significantly reduced.',
    tags: ['GD&T', 'ASME Y14.5', 'MATLAB', 'LTSpice', 'Precision'],
  },
  {
    id: 'amazon',
    name: 'Amazon Robotics',
    category: 'Co-Op · R&D Hardware Engineer',
    cardDescription: 'Robotic fulfillment systems. Pan-tilt camera prototype saving $15K+/system.',
    accent: 'blue',
    image: `${W}/editor/20231109-135637-1.gif`,
    images: [
      { src: `${W}/screenshot-2024-03-09-220401_orig.png`, caption: 'PTZ camera system overview' },
      { src: `${W}/published/screenshot-2023-12-25-144649.png`, caption: 'V1 keyboard-controlled pan-tilt' },
      { src: `${W}/editor/screenshot-2023-12-25-175121.png`, caption: 'V2 enclosed housing' },
    ],
    problem: 'The Innovation Lab needed novel identification systems for pallet and barcode recognition — existing commercial PTZ cameras cost $5K+ each and lacked the zoom range needed.',
    approach: 'Designed and built two pan-tilt camera prototype iterations. Implemented wireless Python control over SSH. Engineered a camera focus mechanism for barcode calibration. Led fixture development for overhead Computer Vision systems.',
    result: '$15K+ cost savings per identification system. Focus mechanism is patent pending. Camera calibration structure presented to senior leadership.',
    tags: ['Robotics', 'Python', 'CAD', 'Computer Vision'],
  },
]

// ── Workshop Scene Tool Mappings ──────────────────────────────────────────────
// Each tool on the workbench represents one project or work experience.

// ============================================
// TO ADD REAL PROJECT PHOTOS:
// 1. Drop your image into /public/images/projects/
// 2. Set imagePath below to "/images/projects/yourfile.jpg"
// 3. Recommended: square or 4:3 ratio, at least 400x400px
// 4. The polaroid frame crops/fits the image automatically
// ============================================

export interface WorkbenchTool {
  id: string
  projectName: string
  category: 'project' | 'experience'
  featured: boolean
  shortDescription: string
  longDescription: { problem: string; approach: string; result: string }
  toolType: string
  benchPosition: { x: number; z: number; rotationY: number }
  accentColor: string
  labelHeight: number
  callout: { line1: string; line2: string }
  placeholderColor: string
  imagePath?: string
}

export const WORKBENCH_TOOLS: WorkbenchTool[] = [
  // ── Work Experience (LEFT side of bench, near the lamp) ───────────────────
  {
    id: 'draper',
    projectName: 'Draper Laboratory',
    category: 'experience',
    featured: false,
    shortDescription: 'Electro-Mechanical Co-Op. 30+ GD&T drawings. IFOG integration.',
    longDescription: {
      problem: 'Next Generation IFOG program needed improved integration ergonomics, precision drawing packages, and automated circuit parameter sweeps.',
      approach: 'Enhanced IFOG integration hardware across two production iterations. Released 30+ ASME Y14.5 GD&T drawing packages. Built MATLAB-LTSpice workflow.',
      result: '1 hour saved per unit in assembly. 30+ drawing packages released. Manual circuit tuning effort significantly reduced.',
    },
    toolType: 'calipers',
    benchPosition: { x: -5.5, z: 0.4, rotationY: 0.1 },
    accentColor: '#3b82f6',
    labelHeight: 0.8,
    callout: { line1: 'DRAPER', line2: 'Electro-Mechanical Co-Op' },
    placeholderColor: '#2a4a6b',
    imagePath: `${W}/published/screenshot-2025-03-25-143254.png`,
  },
  {
    id: 'berkshire-grey',
    projectName: 'Berkshire Grey',
    category: 'experience',
    featured: true,
    shortDescription: 'Mechanical Co-Op. 65% cost reduction via sheet metal conversion.',
    longDescription: {
      problem: 'Pilot production of Scoop autonomous trailer unloader required cost-down, lead time reduction, and hardware validation under tight timelines.',
      approach: 'Design reviews and custom part release. Linear-actuator test rig with 1″ centerline accuracy. Sheet metal PLI conversion. Recirculation chute reducing SQA cycling times.',
      result: '65% part cost reduction ($750→$281/unit). Chute saved 3+ weeks lead time and up to $10K+ per system.',
    },
    toolType: 'sheet-metal',
    benchPosition: { x: -4.2, z: -0.4, rotationY: -0.1 },
    accentColor: '#3b82f6',
    labelHeight: 1.3,
    callout: { line1: 'BERKSHIRE GREY ★', line2: 'Mechanical Engineer Co-Op' },
    placeholderColor: '#1e3a5f',
    imagePath: `${W}/bgsquad_orig.jpg`,
  },
  {
    id: 'amazon',
    projectName: 'Amazon Robotics',
    category: 'experience',
    featured: false,
    shortDescription: 'R&D Hardware Co-Op. Pan-tilt camera prototype saving $15K+/system.',
    longDescription: {
      problem: 'Innovation Lab needed novel identification systems. Existing commercial PTZ cameras cost $5K+ each and lacked needed zoom range.',
      approach: 'Two pan-tilt camera prototype iterations. Python wireless control over SSH. Camera focus mechanism for barcode calibration. Overhead CV system fixtures.',
      result: '$15K+ cost savings per identification system. Focus mechanism patent pending.',
    },
    toolType: 'conveyor-roller',
    benchPosition: { x: -3.0, z: 0.4, rotationY: 0.15 },
    accentColor: '#3b82f6',
    labelHeight: 1.0,
    callout: { line1: 'AMAZON ROBOTICS', line2: 'R&D Hardware Co-Op' },
    placeholderColor: '#1a3550',
    imagePath: `${W}/editor/20231109-135637-1.gif`,
  },
  // ── Featured Projects (CENTER-FRONT of bench) ─────────────────────────────
  {
    id: 'bourbot',
    projectName: 'Bourbot',
    category: 'project',
    featured: true,
    shortDescription: '550-lb whiskey barrel handling robot. Actuated ball-screw lift.',
    longDescription: {
      problem: 'Rickhouses have narrow aisles and 550-lb barrels that roll freely. The lifting mechanism had to clock the bung plug to within a few degrees in a space barely wider than the robot.',
      approach: 'Ball-screw driven lift system sized via MATLAB torque calculations. FEA on lifting frame. Bung clocking mechanism for repeatable angular alignment.',
      result: 'All four key operations demonstrated live: rolling, clocking, lifting, and 4° incline navigation on a 550-lb barrel.',
    },
    toolType: 'ball-screw',
    benchPosition: { x: 0.0, z: 0.4, rotationY: 0.0 },
    accentColor: '#22c55e',
    labelHeight: 1.4,
    callout: { line1: 'BOURBOT ★', line2: 'Whiskey Barrel Handling Robot' },
    placeholderColor: '#2d5a27',
    imagePath: `${W}/full-barrel-rolling_orig.gif`,
  },
  {
    id: 'cobra',
    projectName: 'COBRA',
    category: 'project',
    featured: true,
    shortDescription: '1st place lunar snake robot. NASA Artemis Award. $170K+ funding.',
    longDescription: {
      problem: 'One weak joint in an 11-module daisy chain stops the whole snake. Voltage regulator enclosures had to survive repeated tumbling impact within the modular form factor.',
      approach: 'Designed joint geometries in SolidWorks optimized for tumbling and sidewinding. Engineered voltage regulator enclosures across the Dynamixel chain.',
      result: '$170K+ funding and Artemis Award — 1st place at NASA Big Idea Forum. Featured in NASA, Wired, and VOA News.',
    },
    toolType: 'snake-linkage',
    benchPosition: { x: 1.5, z: -0.4, rotationY: -0.1 },
    accentColor: '#22c55e',
    labelHeight: 1.0,
    callout: { line1: 'NASA COBRA ★', line2: 'Lunar Snake Robot — 1st Place' },
    placeholderColor: '#1a4a3a',
    imagePath: `${W}/published/screenshot-2024-01-21-172643.png`,
  },
  {
    id: 'brailleforge',
    projectName: 'BrailleForge',
    category: 'project',
    featured: true,
    shortDescription: 'Real-time braille embosser. 3rd place MakeMIT. 50+ teams.',
    longDescription: {
      problem: '15 hours, limited machine shop, mostly repurposed parts. The needle had to hit every dot deep enough to be readable on the first real run.',
      approach: '2-axis gantry with NEMA 23 steppers and lead-screw linear motion. Solenoid-driven sewing needle for embossing.',
      result: '3rd place out of 50+ teams. Braille card confirmed readable live by a judge whose mother is blind.',
    },
    toolType: 'embossing-punch',
    benchPosition: { x: -1.5, z: -0.4, rotationY: 0.1 },
    accentColor: '#22c55e',
    labelHeight: 1.3,
    callout: { line1: 'BRAILLEFORGE ★', line2: 'Braille Embosser — MakeMIT 3rd' },
    placeholderColor: '#3a6a3a',
    imagePath: `${W}/published/img-7243.jpeg`,
  },
  // ── Other Projects (RIGHT side of bench) ─────────────────────────────────
  {
    id: 'fitolux',
    projectName: 'Fitolux',
    category: 'project',
    featured: false,
    shortDescription: 'Dual-system supplement dispenser. Hardware lead, team of 5.',
    longDescription: {
      problem: 'One auger mechanism had to work in two different form factors. Silicone mold took three failed iterations.',
      approach: 'Unified motorized auger for both form factors. MATLAB torque analysis. Iterated silicone mold with edge gates, draft angles, alignment pins.',
      result: 'Functional hardware for both countertop and portable form factors.',
    },
    toolType: 'sensor-strap',
    benchPosition: { x: 2.8, z: 0.4, rotationY: -0.1 },
    accentColor: '#22c55e',
    labelHeight: 0.8,
    callout: { line1: 'FITOLUX', line2: 'Supplement Dispenser · HW Lead' },
    placeholderColor: '#5a4a2a',
    imagePath: `${W}/published/fitolux-countertop-ezgif-com-crop-1.gif`,
  },
  {
    id: 'cstar',
    projectName: 'C-STAR',
    category: 'project',
    featured: false,
    shortDescription: 'Acoustic concrete delamination detection robot.',
    longDescription: {
      problem: 'Sounder had to hit concrete at consistent force while robot moved, clearing speed bumps without bouncing.',
      approach: 'Sprocket-based sounder system. PCB microphone and ADC integration. Vibration mounts to minimize oscillations.',
      result: 'Successfully differentiated delaminated from solid concrete in benchtop and field testing.',
    },
    toolType: 'gripper',
    benchPosition: { x: 3.4, z: -0.4, rotationY: 0.2 },
    accentColor: '#22c55e',
    labelHeight: 1.2,
    callout: { line1: 'C-STAR', line2: 'Collaborative Robotics Research' },
    placeholderColor: '#4a4a5a',
    imagePath: `${W}/cstar-13_orig.jpg`,
  },
  {
    id: 'wavewise',
    projectName: 'WaveWise',
    category: 'project',
    featured: false,
    shortDescription: 'Dynamic vertical kelp farm with autonomous depth control.',
    longDescription: {
      problem: 'System needed to adjust kelp farm depth reliably in open water where conditions vary significantly.',
      approach: 'Winch-based depth adjustment with 2:1 differential gear reduction. IP-68 electronics package. Salinity, pH, temperature, UV, pressure sensors.',
      result: 'Functional first prototype demonstrated in aquatic environment.',
    },
    toolType: 'propeller',
    benchPosition: { x: 4.0, z: 0.4, rotationY: 0 },
    accentColor: '#22c55e',
    labelHeight: 0.9,
    callout: { line1: 'WAVEWISE', line2: 'Maritime Autonomous Navigation' },
    placeholderColor: '#2a5a6a',
    imagePath: `${W}/editor/screenshot-2024-01-21-163135.png`,
  },
  {
    id: 'robotic-hand',
    projectName: 'Robotic Hand',
    category: 'project',
    featured: false,
    shortDescription: 'Tendon-driven anthropomorphic hand. Independent finger actuation.',
    longDescription: {
      problem: 'Four sequential failures: tight joints, cable slippage, stiffness returning, and unstable power supply.',
      approach: 'Manual filing for joint alignment. Lipped groove servo pulley. Synthetic lubricant. Regulated 6.8V/7A DC supply.',
      result: 'All five fingers operate with full independent range of motion.',
    },
    toolType: 'work-glove',
    benchPosition: { x: 4.6, z: -0.4, rotationY: -0.1 },
    accentColor: '#22c55e',
    labelHeight: 1.4,
    callout: { line1: 'ROBOTIC HAND', line2: 'Tendon-Driven Hand Prototype' },
    placeholderColor: '#5a3a3a',
    imagePath: `${W}/thumbnail-img-3388_orig.jpg`,
  },
  {
    id: 'hammer',
    projectName: 'General Purpose Hammer',
    category: 'project',
    featured: false,
    shortDescription: 'Modular machined hammer. Lathe + mill. Interchangeable head.',
    longDescription: {
      problem: 'Building hands-on manufacturing competency while producing a well-toleranced artifact.',
      approach: 'Lathe-machined aluminum handle with M10x1.25 threading. Knurled grip. Mill-machined bronze head.',
      result: 'Modular design with interchangeable head types for multiple applications.',
    },
    toolType: 'hammer',
    benchPosition: { x: 5.2, z: 0.4, rotationY: 0.4 },
    accentColor: '#22c55e',
    labelHeight: 0.8,
    callout: { line1: 'HAMMER', line2: 'Optimized Multi-Function Tool' },
    placeholderColor: '#6a5a2a',
    imagePath: `${W}/published/hammer.jpg`,
  },
  {
    id: 'golf-tee',
    projectName: 'Automatic Golf Tee',
    category: 'project',
    featured: false,
    shortDescription: 'Motorized tee system. Three adjustable height settings.',
    longDescription: {
      problem: 'Reliable dispensing mechanism preventing multiple-ball releases while staying compact.',
      approach: '3D-printed feeder with servo metering. Gravity-fed delivery chosen over rack-and-pinion.',
      result: 'Three height settings demonstrated in class demo.',
    },
    toolType: 'golf-tee',
    benchPosition: { x: 5.8, z: -0.4, rotationY: 0 },
    accentColor: '#22c55e',
    labelHeight: 1.1,
    callout: { line1: 'AUTO GOLF TEE', line2: 'Motorized Height-Adjust System' },
    placeholderColor: '#2a6a2a',
    imagePath: `${W}/editor/img-6961-mov-adobeexpress.gif`,
  },
  {
    id: 'ne-racing',
    projectName: 'NE Electric Racing',
    category: 'project',
    featured: false,
    shortDescription: 'Formula SAE ergonomics subteam. Accelerator pedal assembly.',
    longDescription: {
      problem: 'Pedal assembly must fit optimal driver ergonomics while clearing hydraulic brake lines under high loading.',
      approach: 'Ergonomic analysis and driver measurements. FEA verifying integrity under hydraulic load — FOS ≥ 3.',
      result: 'Proposed torsion spring design to reduce part count for next iteration.',
    },
    toolType: 'roll-bar',
    benchPosition: { x: 6.2, z: 0.1, rotationY: 0.2 },
    accentColor: '#22c55e',
    labelHeight: 0.9,
    callout: { line1: 'NE ELECTRIC RACING', line2: 'Formula SAE Ergonomics' },
    placeholderColor: '#4a2a2a',
    imagePath: `${W}/ner_orig.png`,
  },
]

// ── Experience ────────────────────────────────────────────────────────────────

export const EXPERIENCE: Job[] = [
  {
    company: 'Berkshire Grey',
    role: 'Mechanical Engineer Co-Op',
    period: 'Jul - Dec 2025',
    location: 'Bedford, MA',
    accent: '#3b82f6',
    logo: `${W}/published/ot-logo-bg.png`,
    image: `${W}/bgsquad_orig.jpg`,
    overview:
      'Joined during pilot production of Scoop — a fully autonomous robotic trailer unloader — and drove mechanical work across multiple systems toward full-scale deployment. Designed test rigs for conveyor and kinematic validation, implemented drivetrain improvements, converted a machined component into a cost-down sheet metal design, and released fixture assemblies for customer sites.',
    overviewImage: `${W}/published/fedex-dims-brightspotgocdn.webp`,
    highlights: [
      'Drove design reviews and custom part release for electromechanical assemblies through internal CCB and multi-site vendor coordination',
      'Delivered a linear-actuator test rig demonstrating 1" centerline tracking accuracy to support controls tuning',
      'Converted a machined PLI body to sheet-metal with CNC ribs - reducing part cost 65% and lead time by over 2 weeks',
      'Deployed a recirculation chute that cut SQA cycling times 30% and reduced costs by up to $10K+',
    ],
    projects: [
      {
        name: 'Transfer Module Drivetrain Redesign',
        description: 'Redesigned the drive chain assembly to cut costs, improve tensioning, and simplify assembly.',
        bullets: [
          'Performed chain and sprocket geometry analysis ensuring wrap angles exceeded 120°',
          'Improved tensioning with a motor interface plate and jack screw giving ±5mm adjustment',
          'Simplified motor cover components for tool-free mechanical assembly',
        ],
        images: [
          { src: `${W}/editor/old-transfer-drivetrain-redesign.png`, caption: 'Old drivetrain design', fit: 'contain' },
          { src: `${W}/published/new-trans-module-drivetrain.png`, caption: 'Redesigned drivetrain' },
          { src: `${W}/frontviewdrivetrain_orig.png`, caption: 'Isometric view' },
          { src: `${W}/published/sideviewdrivetrain.png`, caption: 'Side view', fit: 'contain' },
          { src: `${W}/published/picture1-ezgif-com-optimize.gif`, caption: 'Drivetrain assembly animation' },
          { src: `${W}/published/billericadrivetrain.png`, caption: 'Final assembly - customer site', fit: 'contain' },
        ],
      },
      {
        name: 'Whale Tail Proof-of-Concept Rig',
        description: 'Kinematic validation prototype for the wagging motion of the Scoop trailer-unloading arm.',
        bullets: [
          'Matched castor, linear actuator, and pivot-shaft locations to the production system layout',
          'Integrated with controls team - demonstrated ~1 inch centerline tracking accuracy',
        ],
        images: [
          { src: `${W}/editor/whaletail.png`, caption: 'Whale tail assembly' },
          { src: `${W}/published/picture6.gif`, caption: 'Centerline tracking test' },
          { src: `${W}/picture8-ezgif-com-crop_orig.gif`, caption: 'Whale tail motion demonstration', wide: true },
        ],
      },
      {
        name: 'Package Counter Mount (v1 & v2)',
        description: 'Two-iteration camera mounting solution for a vision-based package counting system.',
        bullets: [
          'V1: 80/20 frame with diagonal bracing, custom aluminum sidewall mounts, dual locking pivots for camera pitch',
          'V2: 1.5" x 3" double-rail frame, sandwiched brackets for stiffness, curved slots for yaw adjustment',
        ],
        images: [
          { src: `${W}/package-counter-midd1_orig.png`, caption: 'V1 - 80/20 frame with diagonal bracing' },
          { src: `${W}/packagecountermount2_orig.png`, caption: 'V2 - double-rail frame with sandwiched brackets' },
          { src: `${W}/published/picture2.png`, caption: 'V1 camera mount installed at customer site', wide: true },
        ],
      },
      {
        name: 'Recirculation Chute',
        description: 'Structural chute that routes packages back through the system during SQA cycling tests.',
        bullets: [
          'Designed and built two chute iterations - cut test lead time by 3+ weeks and costs up to $10K',
          'Final solution: 80/20 assembly with COTS roller conveyor for under $3K in under one week',
          'Cost analysis below shows vendor quote for a commercial chute vs. the in-house build',
        ],
        images: [
          { src: `${W}/picture9_orig.gif`, caption: 'Chute routing packages back through system' },
          { src: `${W}/published/conveyor-incl.png`, caption: 'COTS roller conveyor incline layout' },
          { src: `${W}/costanalysis_orig.png`, caption: 'Vendor cost analysis - commercial vs. in-house build', fit: 'contain' },
          { src: `${W}/fastglobal_orig.png`, caption: 'Example OTS spiral chute (FastGlobal)', fit: 'contain' },
        ],
      },
      {
        name: 'PLI Bridge Body - Sheet Metal Conversion',
        description: 'Two-iteration redesign of a machined PLI body into a sheet-metal assembly for production readiness.',
        bullets: [
          'Original: 2 CNC machined bodies per Scoop system at $750/unit ($1,500/system)',
          'First iteration: 5052 aluminum with tab-and-slot ribs, PEM nuts, stitch-welded - cleaner design but labor pushed cost to $2,200-$2,800/unit',
          'Second iteration: fully bolted sheet-metal assembly with M4 countersunk screws - eliminated welding, simplified fabrication',
          '62.55% cost reduction - $280.89 vs. $750 per unit at quantity 8',
        ],
        bulletImages: {
          0: [
            { src: `${W}/pli-loading-interface_orig.png`, caption: 'Original CNC machined PLI body', fit: 'contain', widthClass: 'w-3/4' },
          ],
          1: [
            { src: `${W}/first-iteration-pli_orig.png`, caption: 'First iteration - tab-and-slot sheet metal with welding', fit: 'contain', widthClass: 'w-3/4' },
          ],
          2: [
            { src: `${W}/v2-pli_orig.png`, caption: 'Second iteration - fully bolted sheet-metal assembly', fit: 'contain' },
          ],
        },
        note: 'Project handed off to senior ME to continue PLI bridge body redesign.',
      },
      {
        name: 'Conveyor Lifting Support',
        description: 'Sheet metal modification with custom machined support block to prevent conveyor sag.',
        bullets: [
          'Modified sheet metal part and integrated a custom CNC-machined support block to prevent conveyor sag during handling',
          'Created FEA model verifying 600 lb capacity with a 9.79 psi contact patch',
        ],
        images: [
          { src: `${W}/picture8_orig.gif`, caption: 'Test stand in action' },
          { src: `${W}/published/test-fixture-4.png`, caption: 'FEA setup for sheet metal part' },
        ],
      },
      {
        name: 'Honorable Mentions',
        description: 'Small-footprint design work spanning hardware, guarding, and test fixtures across the Scoop system.',
        bullets: [],
        pairItems: [
          { label: 'Ramp Extension Shims — extended conveyor ramp reach to reduce package drop height and improve flow', images: [
            { src: `${W}/fullramp_orig.png`, fit: 'contain' },
            { src: `${W}/gerry-ramp_orig.png`, fit: 'contain' },
          ]},
          { label: 'NC Button Panels — 3× panels covering operation stations across the system', images: [
            { src: `${W}/published/nc-button.png`, fit: 'contain' },
          ]},
          { label: 'Center Gap Fill Bracket — filled structural center gap in the assembly', images: [
            { src: `${W}/center-gap_orig.png`, fit: 'contain' },
          ]},
          { label: 'Gap Fill Guarding — left and right guarding configurations for operator safety', images: [
            { src: `${W}/published/guarding.png`, fit: 'contain' },
          ]},
          { label: 'HMI Panel Back Cover Mounts — 2× mounts created and installed for cable management', images: [
            { src: `${W}/published/hmi-back-cover.png`, fit: 'contain' },
          ]},
          { label: 'Conveyor Commissioning Test Stand — test fixture used by Quality Team for conveyor validation', images: [
            { src: `${W}/wing-commission_orig.png`, fit: 'contain' },
          ]},
          { label: 'Miniature Scoop Models — scaled physical models gifted to clients and stakeholders', images: [
            { src: `${W}/mini-scoop-models_orig.png`, fit: 'contain' },
          ]},
          { label: 'Vinyl Sticker Button Labels — designed labels for teleoperating Scoop at customer sites', images: [
            { src: `${W}/vinylstickerdesign_orig.png`, fit: 'contain' },
          ]},
        ],
      },
    ],
  },
  {
    company: 'Draper Laboratory',
    role: 'Electro-Mechanical Engineer Co-Op',
    period: 'Jul - Dec 2024',
    location: 'Cambridge, MA',
    accent: '#a855f7',
    logo: `${W}/published/download.png`,
    image: `${W}/published/screenshot-2025-03-25-143254.png`,
    overview:
      'Supported the Next Generation Interferometric Fiber Optic Gyroscope (IFOG) program - improving integration hardware, releasing GD&T drawing packages, and building a MATLAB-LTSpice circuit optimization workflow.',
    highlights: [
      'Enhanced IFOG integration hardware and documentation, cutting assembly processing time by 1 hour per unit',
      'Released 30+ GD&T drawing packages to ASME Y14.5, managing PDM configuration control and vendor communication',
      'Built a MATLAB-LTSpice workflow to sweep circuit parameters and eliminate voltage spikes across target frequencies',
    ],
    projects: [
      {
        name: 'IFOG Universal Integration Stand',
        description: 'Ergonomic integration stand for the IFOG program, iterated across two production versions and one proof-of-concept.',
        bullets: [
          'Two production iterations focused on ergonomic positioning and precise level accuracy',
          'Third POC iteration used a differential worm gear for motorized vertical actuation',
          'Integrated rectangular vial levels to verify gyroscope orientation during assembly',
          'Reduced per-unit assembly processing time by 1 hour',
          'Due to scope of co-op timeline, further refinements and prototyping could not be pursued.',
        ],
        images: [
          { src: `${W}/published/screenshot-2025-03-25-145500.png`, hero: true, fit: 'contain' },
          { src: `${W}/published/screenshot-2025-03-25-145914.png`, caption: 'Translating Jack Screw Mechanism used for third iteration concept', fit: 'contain' },
        ],
      },
      {
        name: 'GD&T Drawing Packages',
        description: 'Released 30+ precision drawing packages to support external contractor fabrication of a precise fluid dispensing assembly for coil hubs during the IFOG assembly process.',
        bullets: [
          'ASME Y14.5 compliant part and assembly drawings covering sub-assemblies, COTS, machined, and 3D-printed parts',
          'Built a 25-document drawing tree for the full assembly hierarchy',
          'Managed PDM configuration control and coordinated directly with Moog for fabrication',
        ],
      },
      {
        name: 'MATLAB-LTSpice Circuit Optimization',
        description: 'Automated parameter sweeping across a target frequency range to eliminate voltage spikes in a circuit design.',
        bullets: [
          'Scripted MATLAB to drive LTSpice simulations across resistor/capacitor value combinations',
          'Identified parameter sets that eliminated spikes at all target frequencies',
          'Significantly reduced manual trial-and-error circuit tuning effort',
        ],
      },
      {
        name: 'Supporting Contributions',
        description: 'Additional hardware, test, and assembly work across the co-op.',
        bullets: [
          'Tested hysteresis rings for magnetic properties using BH curve equipment',
          'Assembled and soldered FPGA heater control boxes for thermal management',
          'Machined adapter plates for shock and vibration test fixtures',
        ],
      },
    ],
  },
  {
    company: 'Amazon Robotics',
    role: 'R&D Hardware Engineer Co-Op',
    period: 'Jul - Dec 2023',
    location: 'Westborough, MA',
    accent: '#f59e0b',
    logo: `${W}/editor/images.png`,
    image: `${W}/editor/20231109-135637-1.gif`,
    overview:
      "Worked in the Innovation Lab - Amazon Robotics' skunkworks-style R&D group - focused on novel identification technologies to improve pallet and barcode recognition. Designed, built, and iterated on camera systems, calibration fixtures, and computer vision hardware.",
    overviewImage: `${W}/image-1_orig.jpg`,
    overviewCaption: 'Halloween at the Innovation Lab',
    highlights: [
      'Designed and built two pan-tilt camera prototypes in the Innovation Lab, verified with hand calcs and FEA',
      'Implemented wireless pan-tilt control in Python via SSH, cutting test costs by $15K+ per identification system',
      'Engineered a camera focus mechanism improving barcode-label calibration and identification (patent pending)',
      'Led fixture development for overhead Computer Vision systems and presented to senior leadership',
    ],
    projects: [
      {
        name: 'In-House Pan-Tilt-Zoom (PTZ) Camera System',
        description: 'Two full prototype iterations of a pan-tilt camera system to replace $5K+ commercial Panasonic PTZ cameras.',
        bullets: [
          'Prototype v1: keyboard-controlled (WASD) pan-tilt with 1.8° per step via Python over SSH - ~$5K cheaper than commercial PTZ, with greater zoom range (~27 ft)',
          'Prototype v2: enclosed R2-D2-style housing with slotted cable routing, extruded limit switch bosses at pan limits, and increased design life expectancy',
          'Swapped bolt drive to a 100mm M5 threaded rod + belt-pulley for reduced stress concentration and configurable torque/RPM',
          'ASA 3D-printed enclosure chosen for high impact/wear resistance and thermal tolerance',
          'Wireless Python control over SSH saved $15K+ per identification system vs. commercial alternatives',
        ],
        subBullets: [2, 3],
        bulletImages: {
          0: [
            { src: `${W}/img-0874_orig.gif`, caption: 'Pan — horizontal rotation via stepper motor', cropBottom: 15, cropTop: 10 },
            { src: `${W}/img-1980_orig.gif`, caption: 'Tilt — vertical articulation via threaded rod', cropBottom: 15, cropTop: 10 },
            { src: `${W}/editor/20231109-135637-1.gif`, wide: true, caption: 'Live demonstration of wirelessly controlling pan-tilt mechanism' },
          ],
          3: [
            { src: `${W}/screenshot-2023-12-25-175032_orig.png` },
            { src: `${W}/screenshot-2023-12-25-175047_orig.png` },
          ],
        },
      },
      {
        name: 'Camera Calibration Structure (Chandelier)',
        description: 'Overhead truss-mounted fixture to ensure accurate camera placement and calibration of relative positions to global coordinates.',
        bullets: [
          'Initial sheet metal design ruled out - bends exceeded press brake limits and required excessive custom machining',
          'Redesigned to 80/20 aluminum extrusion for easy truss interface, tool-free accessibility, and adjustable LiDar height via column slots',
          'Central LiDar enables point-cloud visualization to track moving containers across the floor',
          'Coverage area optimized based on horizontal and vertical field-of-view specifications',
        ],
        bulletImages: {
          0: [
            { src: `${W}/published/screenshot-2023-12-25-003235.png`, caption: 'Initial sheet metal design of chandelier', halfWidth: true },
          ],
          1: {
            layout: 'split-stack',
            items: [
              { src: `${W}/screenshot-2023-12-25-143644_orig.png` },
              { src: `${W}/screenshot-2023-12-25-143715_orig.png` },
              { src: `${W}/editor/img-0436-1.jpg`, caption: 'Installed on truss' },
            ],
          },
          3: [
            { src: `${W}/screenshot-2023-12-25-143735_orig.png` },
          ],
        },
      },
      {
        name: 'Sky Cable Fixed Camera Mount',
        description: 'Proof-of-concept fixed camera mount for the overhead sky cam system with Raspberry Pi image processing integration.',
        bullets: [
          'Increases scanning area range for identifying inbound pallets using lower-cost mechanical cameras',
          'Integrated Raspberry Pi with software package for streamlined image processing',
          'Identified key trade-off: sky cable vibration causes focus loss - requires manual recalibration for small barcodes',
        ],
        images: [
          { src: `${W}/published/thumbnail-597b7f92-5da0-43cc-89e9-1f9362fbf00e.jpg`, caption: 'Sky cable fixed camera mount POC', hero: true, height: 'h-[32rem]' },
        ],
      },
      {
        name: 'Miscellaneous Items',
        description: 'Additional one-off hardware developed across the co-op for computer vision testing infrastructure.',
        bullets: [],
        pairItems: [
          { label: 'Lens actuation mechanism for mechanical cameras supporting optical characterization and calibration', images: [
            { src: `${W}/screenshot-2023-12-25-171659_orig.png`, fit: 'contain' },
          ]},
          { label: 'Steerable mirror assembly with industrial Harrier camera for redirected field-of-view testing', images: [
            { src: `${W}/screenshot-2023-12-25-171904_orig.png`, fit: 'contain' },
          ]},
          { label: '45° angle camera mount for truss beam - angled coverage of floor-level targets', images: [
            { src: `${W}/screenshot-2023-12-25-171804_orig.png`, fit: 'contain' },
          ]},
          { label: 'Truss mount for lens actuation on mechanical cameras', images: [
            { src: `${W}/screenshot-2024-03-09-215840_orig.png`, fit: 'contain' },
            { src: `${W}/screenshot-2024-03-09-215816_orig.png`, fit: 'contain' },
          ]},
          { label: 'Panasonic PTZ camera fiducial marker mount and truss mounting hardware', images: [
            { src: `${W}/screenshot-2023-12-25-171919_orig.png`, fit: 'contain' },
          ]},
        ],
      },
    ],
  },
]
