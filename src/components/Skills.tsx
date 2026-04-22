import { motion } from 'framer-motion'

const SKILLS = [
  'SolidWorks (CSWP)',
  'Creo',
  'Onshape',
  'MATLAB / Simulink',
  'Python',
  'GD&T (ASME Y14.5)',
  'DFM / DFA',
  'FEA',
  '3D Printing',
  'MuJoCo',
  'ROS',
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-6 border-t border-neutral-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            Skills &amp; Tools
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-sm font-medium border border-neutral-800 text-neutral-300 bg-neutral-900/50 hover:border-neutral-600 hover:text-white transition-colors"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
