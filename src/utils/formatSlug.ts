export const formatSlug = (str: string) => {
    return encodeURIComponent(str.split(' ').map(w => w.charAt(0) + w.slice(1)).join('-').toLowerCase())
};