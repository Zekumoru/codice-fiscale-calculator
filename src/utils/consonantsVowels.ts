export const isAlpha = (ch: string) => /^[A-Za-z]$/i.test(ch);
export const isVowel = (ch: string) => /^[aiueo]$/i.test(ch);

const consonantsVowels = (str: string) => {
  const output: string[] = [];

  // find consonants first
  for (const ch of str) {
    if (isVowel(ch) || !isAlpha(ch)) continue;
    output.push(ch);
  }

  // now find vowels
  for (const ch of str) {
    if (!isVowel(ch) || !isAlpha(ch)) continue;
    output.push(ch);
  }

  return output.join("");
};

export default consonantsVowels;
