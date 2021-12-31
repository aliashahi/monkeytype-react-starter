export interface LetterDto {
  index: number;
  letter: string;
  currect: boolean | null;
}

// export interface WordDto {}

export interface TextDto {
  letters: LetterDto[];
}
