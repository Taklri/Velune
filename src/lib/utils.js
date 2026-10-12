import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(inputs.flat().filter(Boolean).join(' '));
}
