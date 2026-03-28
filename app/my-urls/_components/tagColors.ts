export const TAG_COLOR_PALETTE = [
  { bg: "bg-red-200 dark:bg-red-900/40",    text: "text-red-800 dark:text-red-400",    border: "border-red-300 dark:border-red-800/50" },
  { bg: "bg-orange-200 dark:bg-orange-900/40", text: "text-orange-800 dark:text-orange-400", border: "border-orange-300 dark:border-orange-800/50" },
  { bg: "bg-amber-200 dark:bg-amber-900/40",  text: "text-amber-800 dark:text-amber-400",  border: "border-amber-300 dark:border-amber-800/50" },
  { bg: "bg-green-200 dark:bg-green-900/40",  text: "text-green-800 dark:text-green-400",  border: "border-green-300 dark:border-green-800/50" },
  { bg: "bg-teal-200 dark:bg-teal-900/40",   text: "text-teal-800 dark:text-teal-400",   border: "border-teal-300 dark:border-teal-800/50" },
  { bg: "bg-blue-200 dark:bg-blue-900/40",   text: "text-blue-800 dark:text-blue-400",   border: "border-blue-300 dark:border-blue-800/50" },
  { bg: "bg-violet-200 dark:bg-violet-900/40", text: "text-violet-800 dark:text-violet-400", border: "border-violet-300 dark:border-violet-800/50" },
  { bg: "bg-pink-200 dark:bg-pink-900/40",   text: "text-pink-800 dark:text-pink-400",   border: "border-pink-300 dark:border-pink-800/50" },
] as const;

export function getTagColor(tagId: string) {
  const index = (parseInt(tagId, 10) || 0) % TAG_COLOR_PALETTE.length;
  return TAG_COLOR_PALETTE[index];
}
