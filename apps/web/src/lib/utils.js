import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(url, width = 800) {
  if (!url) return '';
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
}
