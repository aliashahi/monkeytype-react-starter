import { useEffect, useRef, useState } from "react";
import { LetterDto, TextDto, WordDto } from "../models/letter.interface";

function Body(probs: any) {
  const text =
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a
     type specimen book.`
      .toLowerCase()
      .replace(/\s+/g, " ");
  let count = 0;
  let t: TextDto = {
    words: text.split(" ").map<WordDto>((word: string) => {
      count += word.length;
      return {
        letters: word
          .split("")
          .map<LetterDto>((letter: string, index2: number) => {
            return {
              index: count - word.length + index2,
              currect: null,
              letter,
            };
          }),
      };
    }),
  };

  const [data, setData] = useState<TextDto>(t);
  const dataRef = useRef(data);
  const [myCounter, setMyCounter] = useState<number>(0);
  const counterRef = useRef(myCounter);

  const Letter = (letter: LetterDto, index = 0) => {
    return (
      <span
        key={index}
        className={
          letter.currect
            ? "text-main-color"
            : letter.currect === false
            ? "text-error-color"
            : ""
        }
      >
        {letter.letter}
      </span>
    );
  };

  const Word = (word: WordDto, id = 0) => {
    return (
      <span key={id} className="px-2">
        {word.letters.map((letter: LetterDto, index: number) => {
          return Letter(letter, index);
        })}
      </span>
    );
  };

  const Text = (text: TextDto) => {
    return (
      <div className="w-full flex flex-wrap">
        {text.words.map((word: WordDto, index: number) => {
          return Word(word, index);
        })}
      </div>
    );
  };

  const getCurrentLetterIndex = (c: number): LetterDto => {
    for (let i = 0; i < data.words.length; i++) {
      for (let j = 0; j < data.words[i].letters.length; j++) {
        if (data.words[i].letters[j].index == c) {
          return { ...data.words[i].letters[j] };
        }
      }
    }
    return { currect: null, index: -1, letter: "" };
  };

  const getupdatedText = (currentLetter: LetterDto): TextDto => {
    let c_data = dataRef.current;
    let t: TextDto = { words: [] };
    for (let i = 0; i < c_data.words.length; i++) {
      let word: WordDto = { letters: [] };
      for (let j = 0; j < c_data.words[i].letters.length; j++) {
        if (c_data.words[i].letters[j].index === currentLetter.index)
          word.letters.push(currentLetter);
        else word.letters.push(c_data.words[i].letters[j]);
      }
      t.words.push(word);
    }
    return t;
  };

  const onKeyDown = (event: any) => {
    let currentLetter: LetterDto = getCurrentLetterIndex(counterRef.current);
    if (event.key === "Backspace") {
      dataRef.current = getupdatedText({
        letter: currentLetter.letter,
        currect: null,
        index: currentLetter.index,
      });
      if (counterRef.current != 0)
        currentLetter = getCurrentLetterIndex(counterRef.current - 1);
      counterRef.current--;
      setMyCounter(counterRef.current);
      dataRef.current = getupdatedText({
        letter: currentLetter.letter,
        currect: null,
        index: currentLetter.index,
      });
      setData(dataRef.current);
    } else if (currentLetter.letter === event.key) {
      counterRef.current++;
      setMyCounter(counterRef.current);
      dataRef.current = getupdatedText({
        letter: currentLetter.letter,
        currect: true,
        index: currentLetter.index,
      });
      setData(dataRef.current);
    } else if (event.key.length == 1) {
      counterRef.current++;
      setMyCounter(counterRef.current);
      dataRef.current = getupdatedText({
        letter: currentLetter.letter,
        currect: false,
        index: currentLetter.index,
      });
      setData(dataRef.current);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      id="MainContent"
      className="h-[40vh] text-2xl font-medium w-full text-text-color"
    >
      {Text(data)}
    </div>
  );
}

export default Body;
