import type { Project } from '../scenes/types'

export interface ThemeConfig {
  id: string
  name: string
  accent: string
  accentLight: string
  accentDark: string
  accentRgb: string
  background: string
  bgNum: number
  threePrimary: number
  threeSecondary: number
  sceneFile: string
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'emerald',
    name: 'Emerald',
    accent: '#22c55e',
    accentLight: '#4ade80',
    accentDark: '#16a34a',
    accentRgb: '34,197,94',
    background: '#0a0a0a',
    bgNum: 0x0a0a0a,
    threePrimary: 0x22c55e,
    threeSecondary: 0x3b82f6,
    sceneFile: '../scenes/PegboardScene',
  },
]

export const DEFAULT_THEME = THEMES[0]

export const SCENE_PROJECTS: Project[] = [
  { id: 'bourbot', name: 'Bourbot', tagline: '550-lb whiskey barrel handling robot. Actuated ball-screw lifting mechanism.', category: 'project', featured: true, details: { problem: 'Rickhouses have narrow aisles and 550-lb barrels that roll freely. The lifting mechanism had to clock the bung plug to within a few degrees in a space barely wider than the robot.', approach: 'Ball-screw driven lift system sized via MATLAB torque calculations. FEA on lifting frame. Bung clocking mechanism for repeatable angular alignment.', result: 'All four key operations demonstrated live: rolling, clocking, lifting, and 4° incline navigation on a 550-lb barrel.' } },
  { id: 'cobra', name: 'COBRA', tagline: '1st place lunar snake robot. NASA Artemis Award. $170K+ funding.', category: 'project', featured: true, details: { problem: 'One weak joint in an 11-module daisy chain stops the whole snake. Voltage regulator enclosures had to survive repeated tumbling impact within the modular form factor.', approach: 'Designed joint geometries in SolidWorks optimized for tumbling and sidewinding. Engineered voltage regulator enclosures across the Dynamixel chain.', result: '$170K+ funding and Artemis Award — 1st place at NASA Big Idea Forum. Featured in NASA, Wired, and VOA News.' } },
  { id: 'brailleforge', name: 'BrailleForge', tagline: 'Real-time braille embosser. 3rd place MakeMIT. 50+ teams.', category: 'project', featured: true, details: { problem: '15 hours, limited machine shop, mostly repurposed parts. The needle had to hit every dot deep enough to be readable on the first real run.', approach: '2-axis gantry with NEMA 23 steppers and lead-screw linear motion. Solenoid-driven sewing needle for embossing.', result: '3rd place out of 50+ teams. Braille card confirmed readable live by a judge whose mother is blind.' } },
  { id: 'fitolux', name: 'Fitolux', tagline: 'Dual-system supplement dispenser. Hardware lead, team of 5.', category: 'project', featured: false, details: { problem: 'One auger mechanism had to work in two different form factors. Silicone mold took three failed iterations.', approach: 'Unified motorized auger for both form factors. MATLAB torque analysis. Iterated silicone mold with edge gates, draft angles, alignment pins.', result: 'Functional hardware for both countertop and portable form factors.' } },
  { id: 'cstar', name: 'C-STAR', tagline: 'Acoustic concrete delamination detection robot.', category: 'project', featured: false, details: { problem: 'Sounder had to hit concrete at consistent force while robot moved, clearing speed bumps without bouncing.', approach: 'Sprocket-based sounder system. PCB microphone and ADC integration. Vibration mounts to minimize oscillations.', result: 'Successfully differentiated delaminated from solid concrete in benchtop and field testing.' } },
  { id: 'wavewise', name: 'WaveWise', tagline: 'Dynamic vertical kelp farm with autonomous depth control.', category: 'project', featured: false, details: { problem: 'System needed to adjust kelp farm depth reliably in open water where conditions vary significantly.', approach: 'Winch-based depth adjustment with 2:1 differential gear reduction. IP-68 electronics package. Salinity, pH, temperature, UV, pressure sensors.', result: 'Functional first prototype demonstrated in aquatic environment.' } },
  { id: 'robotic-hand', name: 'Robotic Hand', tagline: 'Tendon-driven anthropomorphic hand. Independent finger actuation.', category: 'project', featured: false, details: { problem: 'Four sequential failures: tight joints, cable slippage, stiffness returning, and unstable power supply.', approach: 'Manual filing for joint alignment. Lipped groove servo pulley. Synthetic lubricant. Regulated 6.8V/7A DC supply.', result: 'All five fingers operate with full independent range of motion.' } },
  { id: 'hammer', name: 'General Purpose Hammer', tagline: 'Modular machined hammer. Interchangeable head design.', category: 'project', featured: false, details: { problem: 'Building hands-on manufacturing competency while producing a well-toleranced artifact.', approach: 'Lathe-machined aluminum handle with M10x1.25 threading. Knurled grip. Mill-machined bronze head.', result: 'Modular design with interchangeable head types for multiple applications.' } },
  { id: 'golf-tee', name: 'Automatic Golf Tee', tagline: 'Motorized tee system with three adjustable height settings.', category: 'project', featured: false, details: { problem: 'Reliable dispensing mechanism preventing multiple-ball releases while staying compact.', approach: '3D-printed feeder with servo metering. Gravity-fed delivery chosen over rack-and-pinion.', result: 'Three height settings demonstrated in class demo.' } },
  { id: 'ne-racing', name: 'NE Electric Racing', tagline: 'Formula SAE ergonomics subteam. Accelerator pedal assembly.', category: 'project', featured: false, details: { problem: 'Pedal assembly must fit optimal driver ergonomics while clearing hydraulic brake lines under high loading.', approach: 'Ergonomic analysis and driver measurements. FEA verifying integrity under hydraulic load — FOS ≥ 3.', result: 'Proposed torsion spring design to reduce part count for next iteration.' } },
  { id: 'berkshire-grey', name: 'Berkshire Grey', tagline: 'Mechanical Engineer Co-Op. 65% cost reduction via sheet metal conversion.', category: 'experience', featured: true, details: { problem: 'Pilot production of Scoop autonomous trailer unloader required cost-down, lead time reduction, and hardware validation under tight timelines.', approach: 'Design reviews and custom part release. Linear-actuator test rig with 1" centerline accuracy. Sheet metal PLI conversion. Recirculation chute reducing SQA cycling times.', result: '65% part cost reduction ($750→$281/unit). Chute saved 3+ weeks lead time and up to $10K+ per system.' } },
  { id: 'draper', name: 'Draper Laboratory', tagline: 'Electro-Mechanical Engineer Co-Op. 30+ GD&T drawing packages. IFOG integration.', category: 'experience', featured: false, details: { problem: 'Next Generation IFOG program needed improved integration ergonomics, precision drawing packages, and automated circuit parameter sweeps.', approach: 'Enhanced IFOG integration hardware across two production iterations. Released 30+ ASME Y14.5 GD&T drawing packages. Built MATLAB-LTSpice workflow.', result: '1 hour saved per unit in assembly. 30+ drawing packages released. Manual circuit tuning effort significantly reduced.' } },
  { id: 'amazon', name: 'Amazon Robotics', tagline: 'R&D Hardware Engineer Co-Op. Pan-tilt camera prototype saving $15K+/system.', category: 'experience', featured: false, details: { problem: 'Innovation Lab needed novel identification systems. Existing commercial PTZ cameras cost $5K+ each and lacked needed zoom range.', approach: 'Two pan-tilt camera prototype iterations. Python wireless control over SSH. Camera focus mechanism for barcode calibration. Overhead CV system fixtures.', result: '$15K+ cost savings per identification system. Focus mechanism patent pending.' } },
]
