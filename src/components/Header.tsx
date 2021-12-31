import { InfoCircleFilled, CrownFilled } from "@ant-design/icons";

function Header(probs: any) {
  const Label = (text: string, index: number = 0) => {
    return (
      <span
        key={index}
        className="text-xs transition-all cursor-pointer text-sub-color hover:text-main-color px-[2px] mx-[2px]"
      >
        {text}
      </span>
    );
  };

  const Line = (labels: string[]) => {
    return (
      <li className="m-0 h-4 font-semibold">
        {labels.map((l, index) => {
          return Label(l, index);
        })}
      </li>
    );
  };
  return (
    <header className="w-full h-20 flex flex-nowrap items-center">
      <span className="w-10 h-6 mt-2 bg-yellow-400 rounded-lg mx-2"></span>
      <ul className="flex flex-nowrap items-center justify-around">
        <h1 className="text-text-color text-3xl">monkey type</h1>
        <CrownFilled className="p-2 pt-4 text-gray-200 cursor-pointer hover:text-white hover:scale-110 transition-all" />
        <InfoCircleFilled className="p-2 pt-4 text-gray-200 cursor-pointer hover:text-white hover:scale-110 transition-all" />
      </ul>
      <ul className="ml-auto text-right">
        {Line(["punctuation", "numbers"])}
        {Line(["time", "words", "words", "quote", "zen", "custom"])}
        {Line(["15", "30", "60", "120", "custom"])}
      </ul>
    </header>
  );
}

export default Header;
