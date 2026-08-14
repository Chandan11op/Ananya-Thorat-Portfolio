/**
 * Centralized Media Configuration
 * To replace any photo with real Ananya photographs in the future,
 * simply change the paths or URLs in this file without modifying component logic.
 */

export const mediaAssets = {
  hero: {
    portrait: "/assets/images/hero/hero_portrait.png",
    alt: "Ananya Thorat - Professional Event Anchor with Microphone on Stage",
    caption: "Live on stage with microphone • Mumbai"
  },
  about: {
    portrait: "/assets/images/about/about_me.png",
    alt: "Ananya Thorat - Candid Event Hosting Moment",
    tapeLabel: "MOMENTS CREATED LIVE",
    locationTag: "Mumbai • E-Cell Hinduja"
  },
  events: {
    unicorn26: {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/unicorn26.jpg",
      alt: "Representative Event Visual: Entrepreneurship Fest"
    },
    fashionshow: {
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/fashionshow.jpg",
      alt: "Representative Event Visual: Fashion Show Runway"
    },
    cultural: {
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/cultural.jpg",
      alt: "Representative Event Visual: Cultural Festival"
    },
    ceremony: {
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/ceremony.jpg",
      alt: "Representative Event Visual: Formal Ceremonies"
    },
    pitch: {
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/pitch.jpg",
      alt: "Representative Event Visual: Business Pitch"
    },
    speaker: {
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      fallback: "/assets/images/events/speaker.jpg",
      alt: "Representative Event Visual: Guest Speaker Sessions"
    }
  },
  textures: {
    paperGrain: "radial-gradient(rgba(122, 23, 54, 0.04) 1px, transparent 1px)",
    noiseOverlay: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.035\"/></svg>')"
  }
};
