import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(url, width = 1200, quality = 75) {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('supabase.co/storage/v1/object/')) {
    if (url.includes('format=webp')) return url; // Already optimized
    
    const optimized = url.replace('/storage/v1/object/', '/storage/v1/render/image/');
    const separator = optimized.includes('?') ? '&' : '?';
    return `${optimized}${separator}width=${width}&quality=${quality}&format=webp`;
  }
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  return url;
}
