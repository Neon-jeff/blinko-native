export const GENERIC_BLURHASHES = [
  "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
  "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
  "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.",
  "LLMF;H=~%MRj~qM{RjRjRjRjRjRj",
  "L9ASkK-;_N%M_3RjRjRjRjRjRjRj",
  "L6Pj?b%M_N^k^PWBW?j[RjRjRjRj",
  "LNG6k^%2Tw=w]~RBVZRi};RPxuwH",
  "LFG5]+Yk^6#M@-5c,1J5@[or[Q6.",
  "LJE%pA0M%MRj~qM{RjRjRjRjRjRj",
  "LHF8kC%2Tw=w]~RBVZRi};RPxuwH",
  "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
  "LJE6kB%MRjRj~qM{RjRjRjRjRjRj",
  "LHF5kC%2Tw=w]~RBVZRi};RPxuwH",
  "LLM2?U%2Tw=w]~RBVZRi};RPxuwH",
  "LGG6nWB2yk8pyo0adR*.7kCMdnj"
]
export function generateRandomBlurhash(length = 28): string {
  const randomIndex = Math.floor(Math.random() * GENERIC_BLURHASHES.length);
  return GENERIC_BLURHASHES[randomIndex];
}