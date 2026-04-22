import { motion } from 'framer-motion'
import { OFF_DUTY_PHOTOS, OFF_DUTY_HIGHLIGHTS, OFF_DUTY_INTERESTS } from '../data/content'

export default function OffDutyAdventures() {
  return (
    <section id="off-duty" className="py-14 px-6 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
            Off Duty
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Life outside the machine shop.
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-lg">
            Engineering is what I do - but it's not all I am.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {OFF_DUTY_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: 220 }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-white text-sm font-semibold">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Activity highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {OFF_DUTY_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Interest chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-neutral-600 uppercase tracking-[0.2em] mb-3">Also into</p>
          <div className="flex flex-wrap gap-2">
            {OFF_DUTY_INTERESTS.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-400 text-sm hover:border-neutral-600 hover:text-neutral-300 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
