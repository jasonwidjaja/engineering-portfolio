import { motion } from 'framer-motion'

export default function ResumeSection() {
  return (
    <section id="resume" className="py-14 px-6 border-t border-neutral-900 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
              Resume
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Full Resume.
            </h2>
          </div>

          <a
            href="/Jason_Widjaja_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(34,197,94,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(34,197,94,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.3)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-neutral-800"
          style={{ height: '85vh' }}
        >
          <iframe
            src="/Jason_Widjaja_Resume.pdf"
            className="w-full h-full"
            title="Jason Widjaja Resume"
          />
        </motion.div>
      </div>
    </section>
  )
}
