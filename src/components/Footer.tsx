function Footer(probs: any) {
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
        <div></div>
    //   <li className="h-4 font-semibold">
    //     {labels.map((l, index) => {
    //       return Label(l, index);
    //     })}
    //   </li>
    );
  };
  return (
    <div>
      <ul className="text-right">{Line(["punctuation", "numbers"])}</ul>
    </div>
  );
}

export default Footer;
