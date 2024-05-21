
/**
 * Text is optional, divider can function without text
 */

interface DividerProps {
    text?:string
    color: string
    textColor: string
}

const Divider = (props: DividerProps) => {
  return (
    <div className="relative my-8 flex items-center">
      <div className={"flex-grow border-t border-" + props.color}></div>
      <span className={"mx-4 text-" + props.textColor}>{props.text}</span>
      <div className={"flex-grow border-t border-"+ props.color}></div>
    </div>
  );
};

export default Divider;
