// Fixed palette of badge colors. Config stores only the key (e.g. "indigo");
// the full Tailwind classes live here as literals so Tailwind keeps them in the
// build (dynamically-built class strings would be purged).
export interface PaletteColor {
    badge: string;
    swatch: string;
}

export const colorPalette: Record<string, PaletteColor> = {
    indigo: { badge: "bg-indigo-700/5 text-indigo-700 border-indigo-700/15", swatch: "bg-indigo-500" },
    blue: { badge: "bg-blue-700/5 text-blue-700 border-blue-700/15", swatch: "bg-blue-500" },
    teal: { badge: "bg-teal-700/5 text-teal-700 border-teal-700/15", swatch: "bg-teal-500" },
    cyan: { badge: "bg-cyan-700/5 text-cyan-700 border-cyan-700/15", swatch: "bg-cyan-500" },
    emerald: { badge: "bg-emerald-700/5 text-emerald-700 border-emerald-700/15", swatch: "bg-emerald-500" },
    lime: { badge: "bg-lime-700/5 text-lime-700 border-lime-700/15", swatch: "bg-lime-500" },
    amber: { badge: "bg-amber-700/5 text-amber-700 border-amber-700/15", swatch: "bg-amber-500" },
    orange: { badge: "bg-orange-600/5 text-orange-600 border-orange-600/15", swatch: "bg-orange-500" },
    rose: { badge: "bg-rose-700/5 text-rose-700 border-rose-700/15", swatch: "bg-rose-500" },
    pink: { badge: "bg-pink-700/5 text-pink-700 border-pink-700/15", swatch: "bg-pink-500" },
    fuchsia: { badge: "bg-fuchsia-700/5 text-fuchsia-700 border-fuchsia-700/15", swatch: "bg-fuchsia-500" },
    violet: { badge: "bg-violet-700/5 text-violet-700 border-violet-700/15", swatch: "bg-violet-500" },
    gray: { badge: "bg-gray-500/5 text-gray-600 border-gray-500/15", swatch: "bg-gray-500" },
};

export const colorNames = Object.keys(colorPalette);
export const defaultColorKey = "gray";

export const paletteColor = (key: string): PaletteColor =>
    colorPalette[key] ?? colorPalette[defaultColorKey];
