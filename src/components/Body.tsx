import { useEffect, useRef, useState } from "react";
import { LetterDto, TextDto } from "../models/letter.interface";
import Timer from "./Timer";

function Body(probs: any) {
  const text =
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a
     type specimen book.`
      .toLowerCase()
      .replace(/\s+/g, " ");

  let t: TextDto = {
    letters: text.split("").map<LetterDto>((letter: string, index: number) => {
      return {
        index: index,
        currect: null,
        letter,
      };
    }),
  };

  const [data, setData] = useState<TextDto>(t);
  const dataRef = useRef(data);
  const [myCounter, setMyCounter] = useState<number>(0);
  const counterRef = useRef(myCounter);

  const createLetterClassName = (letter: LetterDto): string => {
    let class_name = letter.currect
      ? "text-main-color" + (letter.letter == " " ? " mx-2" : "")
      : letter.currect === false
      ? "text-error-color" + (letter.letter == " " ? " mx-2" : "")
      : "text-sub-color" + (letter.letter == " " ? " mx-2" : "");
    return class_name;
  };

  const Letter = (letter: LetterDto, index = 0) => {
    return (
      <span key={index} className="flex">
        {letter.index === myCounter ? (
          <div className="h-10 inline-block w-[3px] bg-main-color animate-pulse"></div>
        ) : (
          ""
        )}
        <span className={createLetterClassName(letter)}>{letter.letter}</span>
      </span>
    );
  };

  const Text = (text: TextDto) => {
    return (
      <div className="w-full flex flex-wrap">
        {text.letters.map((letter: LetterDto, index: number) => {
          return Letter(letter, index);
        })}
      </div>
    );
  };

  const getCurrentLetterIndex = (c: number): LetterDto => {
    for (let i = 0; i < data.letters.length; i++) {
      if (data.letters[i].index == c) {
        return { ...data.letters[i] };
      }
    }
    return { currect: null, index: -1, letter: "" };
  };

  const getupdatedText = (currentLetter: LetterDto): TextDto => {
    let c_data = dataRef.current;
    let t: TextDto = { letters: [] };
    for (let i = 0; i < c_data.letters.length; i++) {
      let letter: LetterDto = { currect: null, index: -1, letter: "" };
      if (c_data.letters[i].index === currentLetter.index)
        letter = currentLetter;
      else letter = c_data.letters[i];
      t.letters.push(letter);
    }
    return t;
  };

  const incrementor = () => {
    counterRef.current++;
    setMyCounter(counterRef.current);
  };

  const decrementor = () => {
    counterRef.current--;
    setMyCounter(counterRef.current);
  };

  const updateDataCurrentValue = (
    currentLetter: LetterDto,
    currect: boolean | null
  ) => {
    dataRef.current = getupdatedText({
      letter: currentLetter.letter,
      currect,
      index: currentLetter.index,
    });
    setData(dataRef.current);
  };

  const onKeyDown = (event: any) => {
    let currentLetter: LetterDto = getCurrentLetterIndex(counterRef.current);
    if (event.key === "Backspace") {
      updateDataCurrentValue(currentLetter, null);
      if (counterRef.current != 0) {
        currentLetter = getCurrentLetterIndex(counterRef.current - 1);
        updateDataCurrentValue(currentLetter, null);
      }
      decrementor();
    } else if (currentLetter.letter === event.key) {
      incrementor();
      updateDataCurrentValue(currentLetter, true);
    } else if (event.key.length == 1) {
      incrementor();
      updateDataCurrentValue(currentLetter, false);
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
      <Timer />
      {Text(data)}
    </div>
  );
}

export default Body;
