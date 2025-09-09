import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
};

export const childFade: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

export const listStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
};