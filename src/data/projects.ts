const W = 'https://jasonwidjaja.weebly.com/uploads/1/4/7/6/147605262'

export interface ProjectCard {
  id: string
  title: string
  subtitle: string
  description: string
  challenge?: string
  highlights: string[]
  accent: string
  tags: string[]
  image?: string
  imagePosition?: string
  images?: string[]
}

export const CARDS: ProjectCard[] = [
  {
    id: 'bourbot',
    title: 'Bourbot',
    subtitle: 'Senior Capstone · Jan – Apr 2025',
    description:
      'Semi-automated tele-op robot to roll, lift, and clock 550-lb whiskey barrels inside rickhouses - the tight, multi-story warehouses where whiskey ages. Built for a distillery client who needed a safer, faster alternative to manual barrel handling.',
    challenge:
      "Rickhouses weren't built for machines - narrow aisles, sloped floors, and 550-lb barrels that want to roll wherever they feel like. My job was to design a lifting mechanism that could clock a barrel's bung plug to within a few degrees and lift it cleanly, all without tipping it in a space barely wider than the robot itself.",
    highlights: [
      'Led the lifting mechanism as designated lead - designed a ball-screw driven system for barrel elevation and bung (white plug) alignment',
      'Specified lifting motor and integrated the lifting, rolling, and locomotion subsystems',
      'Verified stresses and deflection with FEA and hand calculations in MATLAB',
      'Conducted barrel force push characterization tests to define design requirements',
      'Successfully rolled a 550-lb whiskey barrel on the platform',
      'Achieved barrel clocking for precise bung (white plug) alignment',
      'Demonstrated lifting via the actuated mechanism and navigated a 4° incline - all live',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'FEA', 'MATLAB', 'Mechanisms', 'Robotics'],
    image: `${W}/full-barrel-rolling_orig.gif`,
    images: [
      `${W}/published/barrel-1.gif`,
      `${W}/editor/img-8672-720.jpg`,
      `${W}/clocking_orig.gif`,
      `${W}/lifting-mechanism-front-view-online-video-cutter_orig.gif`,
      `${W}/img-7658_orig.gif`,
      `${W}/published/screenshot-2025-05-19-004650.png`,
    ],
  },
  {
    id: 'cobra',
    title: 'COBRA',
    subtitle: 'NASA Big Idea Challenge · $170K+ · Artemis Award · 2021–2022',
    description:
      "Bio-inspired 11-joint modular snake robot designed to explore lunar craters using tumbling and sidewinding locomotion - terrain no wheeled rover can handle. Submitted to NASA's Big Idea Challenge and presented at the NASA Big Idea Forum in Pasadena.",
    challenge:
      "One weak joint in an 11-module daisy chain and the whole snake stops working. I had to design enclosures for the voltage regulators that could survive repeated tumbling impact, fit within the modular form factor, and not add so much mass that the locomotion math fell apart.",
    highlights: [
      'Won top honors across all evaluation criteria at the NASA Big Idea Forum - $170K+ funding and the Artemis Award',
      'Designed prototype joint geometries in SolidWorks to optimize surface support during tumbling and sidewinding',
      'Engineered enclosures for voltage regulators across the daisy-chained Dynamixel motor chain',
      'Assisted with robot assembly and field-testing demonstrations at the Pasadena forum',
      'Featured in NASA, Wired, VOA News, and Northeastern University press coverage',
    ],
    accent: '#22c55e',
    tags: ['Robotics', 'SolidWorks', 'Electronics', 'NASA', 'Locomotion'],
    image: `${W}/published/screenshot-2024-01-21-172643.png`,
    images: [
      `${W}/northeastern-cobra-highlights_orig.gif`,
      `${W}/published/screenshot-2024-01-21-172942.png`,
      `${W}/published/screenshot-2024-01-21-172919.png`,
    ],
  },
  {
    id: 'brailleforge',
    title: 'BrailleForge',
    subtitle: 'MakeMIT Hardwarethon · 3rd Place · Feb 2023',
    description:
      'Dual-axis gantry that converts digital text to physical braille, built from scratch in under 15 hours at MakeMIT using repurposed materials and limited machine shop access. Competed against 50+ teams and placed 3rd overall.',
    challenge:
      "15 hours, a limited machine shop, and mostly repurposed parts - there was no time to iterate. The needle had to hit every dot deep enough to be readable on the first real run. Any vibration or inconsistent force and a judge's finger wouldn't feel anything.",
    highlights: [
      'Led full CAD design for the 2-axis gantry, motor mounts, and 80/20 aluminum structure assembly',
      'NEMA 23 steppers with lead-screw linear motion and a solenoid-driven sewing needle for embossing',
      'Designed motor mount fixtures to reduce vibration and improve embossing accuracy',
      'Output costs 50%+ less per unit than commercial braille printers on the market',
      'Printed a braille greeting card live - a judge whose mother is blind confirmed it was readable',
    ],
    accent: '#22c55e',
    tags: ['Arduino', '2-Axis Gantry', 'Hardware', 'Python', '3D Printing'],
    image: `${W}/published/img-7243.jpeg`,
    images: [
      `${W}/editor/screenshot-2023-11-05-015117.png`,
      `${W}/full-assembly-cad-2_orig.png`,
    ],
  },
  {
    id: 'fitolux',
    title: 'Fitolux',
    subtitle: 'Generate Product Development · ME Hardware Lead · Fall 2024',
    description:
      'Dual-system supplement dispenser - a countertop docking station and a portable handheld unit - for precise, mess-free powder dosing. Led the full mechanical engineering effort as Hardware Lead across a team of five.',
    challenge:
      "One auger mechanism had to work in two totally different form factors without starting from scratch for each. On top of that, the silicone mold for the handle grip took three failed iterations - wrong draft angles, trapped air, torn edges - before it actually came out clean.",
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
      `${W}/published/fitlolux-portable-clip.gif`,
      `${W}/published/thumbnail-image4.jpg`,
      `${W}/published/thumbnail-image6.jpg`,
    ],
  },
  {
    id: 'cstar',
    title: 'C-STAR',
    subtitle: 'Generate Product Development · Spring 2024',
    description:
      'Automated robot for detecting concrete delamination in parking garages via acoustic analysis - replacing the slow, tedious process of manual chain-drag inspection. I led the sounder mechanism that strikes concrete and captures the resulting sound signature.',
    challenge:
      "The sounder had to hit concrete at a consistent force while the robot was moving. Any vibration or inconsistent contact and the acoustic signature was garbage. It also had to fit inside a tight chassis and clear speed bumps without bouncing off the surface.",
    highlights: [
      'Led sounder mechanism design: a sprocket-based system that strikes concrete surfaces while the robot drives',
      'Integrated a PCB microphone and ADC to distinguish solid vs. hollow concrete acoustically',
      'Performed static spring constant calculations and iterated linkage geometry to fit within chassis constraints',
      'Designed vibration mounts to minimize oscillations when the robot crosses speed bumps and obstacles',
      'Successfully differentiated delaminated and solid concrete in both benchtop and field testing',
    ],
    accent: '#22c55e',
    tags: ['SolidWorks', 'Sensors', 'Acoustics', 'Mechanisms', 'Field Testing'],
    image: `${W}/published/cstar-08.jpg`,
    images: [
      `${W}/published/soundermechanism-10-1.gif`,
      `${W}/published/screenshot-2024-12-23-200721.png`,
      `${W}/editor/screenshot-2024-01-30-005326.png`,
    ],
  },
  {
    id: 'wavewise',
    title: 'WaveWise',
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
      `${W}/screenshot-2024-01-21-162635_orig.png`,
      `${W}/published/screenshot-2024-01-21-164135.png`,
    ],
  },
  {
    id: 'neu-racing',
    title: 'NE Electric Racing',
    subtitle: 'Formula SAE · Ergonomics Subteam',
    description:
      "Ergonomics subteam member on Northeastern's Formula SAE electric vehicle, responsible for the accelerator pedal assembly. Designed for driver comfort and structural safety under the high loads of a hydraulic brake system.",
    highlights: [
      'Determined optimal foot-to-pedal angles through ergonomic analysis and driver measurements',
      'Designed mounting brackets that house pedals while clearing brake pedal and hydraulic lines',
      'Ran FEA to verify structural integrity under hydraulic loading - maintained a Factor of Safety ≥ 3',
      'Proposed next-iteration torsion spring design to reduce part count and create a more compact assembly',
    ],
    accent: '#22c55e',
    tags: ['Formula SAE', 'SolidWorks', 'FEA', 'Ergonomics'],
    image: `${W}/ner_orig.png`,
    images: [
      `${W}/published/screenshot-2023-11-05-013408.png`,
      `${W}/screenshot-2023-11-05-013350-orig_orig.png`,
    ],
  },
  {
    id: 'robotic-hand',
    title: 'Robotic Hand',
    subtitle: 'Tendon-Driven Prototype',
    description:
      'Built a tendon-driven anthropomorphic robotic hand from scratch using a 3D printer and an open-source STL model. Independently solved four major mechanical and electrical challenges that came up during assembly and testing.',
    challenge:
      "Four things broke in sequence: joints too tight to move, cables slipping off the pulley, stiffness coming back after filing, and every battery I tried - AAs, NiMH packs - either couldn't handle five servos at once or dropped voltage mid-motion. Each fix revealed the next problem.",
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
    imagePosition: 'top',
    images: [
      `${W}/published/robot-hand1.jpg`,
      `${W}/published/robot-hand2.jpg`,
      `${W}/published/thumbnail-image0.jpg`,
    ],
  },
  {
    id: 'hammer',
    title: 'General Purpose Hammer',
    subtitle: 'Manual Machining · Mill & Lathe',
    description:
      'Designed and machined a modular hammer from scratch on a manual mill and lathe to build hands-on manufacturing skills. The interchangeable head design reinforced CAD-to-manufacturing workflows, thread tolerancing, and precision fitting.',
    highlights: [
      'Machined aluminum handle on a lathe with M10 × 1.25 external threading for modular head attachment',
      'Added a knurled grip for ergonomic handling under load',
      'Machined bronze hammer head on a mill with a matching M10 × 1.25 tapped hole',
      'Modular design allows swapping different head types for multiple applications from a single handle',
    ],
    accent: '#22c55e',
    tags: ['Manual Machining', 'Mill & Lathe', 'GD&T', 'DFM'],
    image: `${W}/published/hammer.jpg`,
    imagePosition: 'top',
    images: [
      `${W}/published/hammergif.gif`,
      `${W}/published/hammer-cad.png`,
    ],
  },
  {
    id: 'whisk',
    title: 'W.H.I.S.K.',
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
      `${W}/editor/whisk.png`,
      `${W}/screenshot-2024-12-27-013053_orig.png`,
    ],
  },
  {
    id: 'motor-control',
    title: 'DC Motor Control',
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
      `${W}/hardware_orig.png`,
      `${W}/simulink-motor_orig.png`,
    ],
  },
  {
    id: 'robotic-manipulator',
    title: 'Planar 2D Robotic Manipulator',
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
      `${W}/editor/screenshot-2024-02-21-084246.png`,
      `${W}/editor/screenshot-2024-02-21-084734.png`,
    ],
  },
  {
    id: 'jordan-shoe',
    title: 'Jordan Access 1 CAD Model',
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
      `${W}/editor/jordan-access-1-right-view-cad.png`,
    ],
  },
  {
    id: 'jet-engine',
    title: 'Jet Engine CAD & Motion Study',
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
