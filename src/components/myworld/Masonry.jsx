import { motion } from "framer-motion"

// A lightweight masonry photo wall (CSS columns + break-inside-avoid). Natural image
// ratios stagger the rows; each photo fades up as it scrolls into view.
export default function Masonry({ items }) {
  return (
    <div className="columns-2 gap-2 sm:columns-3 lg:columns-4">
      {items.map((item, i) => (
        <motion.figure
          key={`${item.src}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
          className="mb-3 block break-inside-avoid overflow-hidden rounded-xs bg-box"
        >
          <img
            src={encodeURI(item.src)}
            alt={item.alt}
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </motion.figure>
      ))}
    </div>
  )
}
