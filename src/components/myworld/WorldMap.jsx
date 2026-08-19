import { motion } from "framer-motion"
import { project, worldmapSvg } from "./mapdata"

function MapMarker({ place, onSelect }) {
  const pos = project(place.lat, place.lng)
  return (
    <div
      className="group absolute z-10 -translate-x-1/2 -translate-y-full hover:z-30"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      {/* Optional text layer — name + one-liner, revealed on hover, above the photo. */}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[9rem] -translate-x-1/2 translate-y-1 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-xs font-semibold leading-tight text-ink">{place.place}</div>
        {place.caption && (
          <div className="mt-0.5 text-[11px] italic leading-snug text-fog">{place.caption}</div>
        )}
      </div>

      <motion.button
        type="button"
        onClick={() => onSelect?.(place)}
        whileHover={{ scale: 1.28 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative block cursor-pointer"
        style={{ transformOrigin: "center bottom" }}
        aria-label={`${place.place}, ${place.country}`}
      >
        <img
          src={encodeURI(place.cover)}
          alt={place.place}
          loading="lazy"
          className="block h-auto w-10"
        />
      </motion.button>

      {/* Anchor dot — marks the exact coordinate the photo is pinned to. */}
      <span className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-2 ring-page" />
    </div>
  )
}

// Renders the pastel continents map with photo markers. Container is locked to the
// map's aspect ratio so marker percentages line up with the continents underneath.
export default function WorldMap({ places, onSelect, className = "", style }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "950 / 620", ...style }}>
      <div
        className="worldmap-svg pointer-events-none absolute inset-0"
        dangerouslySetInnerHTML={{ __html: worldmapSvg }}
      />
      {places.map((place) => (
        <MapMarker key={place.id} place={place} onSelect={onSelect} />
      ))}
    </div>
  )
}
