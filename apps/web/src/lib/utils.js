import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('supabase.co/storage/v1/object/')) {
    const optimized = url.replace('/storage/v1/object/', '/storage/v1/render/image/');
    const separator = optimized.includes('?') ? '&' : '?';
    return `${optimized}${separator}width=${width}&quality=80&format=webp`;
  }
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
}
