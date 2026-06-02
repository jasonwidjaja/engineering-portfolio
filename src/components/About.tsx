import { motion } from 'framer-motion'

const SKILLS = [
  'SolidWorks (CSWP)', 'Creo', 'Onshape', 'MATLAB / Simulink',
  'Python', 'GD&T (ASME Y14.5)', 'DFM / DFA', 'FEA',
  '3D Printing', 'MuJoCo', 'ROS', 'Arduino', 'LTSpice', 'Simscape',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 20 },
  },
}

export default function About() {
  return (
    <section id="about" className="py-14 px-6 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-10">
          {/* Bio + Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">About</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
                The human behind the robots.
              </h2>
              <p className="text-neutral-300 text-base leading-relaxed">
                Queens kid. Northeastern grad. MS in Robotics, BS in Mechanical Engineering, three co-ops deep (Amazon Robotics, Draper, Berkshire Grey). I've built robots that lift 550-lb barrels, designed parts for lunar snake robots, and saved 62% on production costs by convincing everyone sheet metal was the answer. When I'm not in the shop, I'm cooking, hiking, hooping, or letting the Knicks <s>ruin</s> make my evening. I like building things that actually work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src="/about-photo.png"
                alt="Jason hiking"
                className="rounded-2xl object-cover w-full max-w-xs md:max-w-full"
                style={{ maxHeight: 420 }}
              />
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
              Skills &amp; Tools
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  variants={pillVariants}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border border-neutral-800 text-neutral-300 bg-neutral-900/50 hover:border-neutral-600 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
