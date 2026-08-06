// Native hash-anchor jumps aren't always reliable across route changes,
// so in-page section navigation is handled manually via scrollIntoView.
export function scrollToId(id, behavior = "smooth") {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior, block: "start" });
}
