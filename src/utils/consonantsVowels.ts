const isVowel = (ch: string) => {
  return !!["a", "e", "i", "o", "u"].find(
    (vowel) => vowel === ch.toLowerCase()
  );
};

const consonantsVowels = (str: string) => {
  const output: string[] = [];

  // find consonants first
  for (const ch of str) {
    if (isVowel(ch)) continue;
    output.push(ch);
  }

  // now find vowels
  for (const ch of str) {
    if (!isVowel(ch)) continue;
    output.push(ch);
  }

  return output.join("");
};

export default consonantsVowels;
