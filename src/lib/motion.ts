import type { Variants, Transition, Easing } from 'framer-motion'

// Shared, deliberately subtle motion. Fast and calm — professional, not flashy.

export const ease: Easing = [0.22, 1, 0.36, 1]

// Whole-tab transition when switching sections.
export const tabTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12, ease } },
}

// Container that staggers its children into view.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
}

// A single item fading up. Pair with staggerContainer.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
}

export const springy: Transition = { type: 'spring', stiffness: 500, damping: 30 }
