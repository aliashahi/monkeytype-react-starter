export interface LetterDto {
  index: number;
  letter: string;
  currect: boolean | null;
}

export interface WordDto {
  letters: LetterDto[];
}

export interface TextDto {
  words: WordDto[];
}
