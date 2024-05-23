
/**
 * Text is optional, divider can function without text
 * borderColor prop must be specified as "border-*" due to dynamic classnames
 */

interface DividerProps {
    text?:string
    borderColor: string
    textColor: string
}

const Divider = (props: DividerProps) => {
  return (
    <div className="relative my-8 flex items-center">
      <div className={`flex-grow border-t ${props.borderColor}`}></div>
      <span className={`mx-4 text-${props.textColor}`}>{props.text}</span>
      <div className={`flex-grow border-t ${props.borderColor}`}></div>
    </div>
  );
};

export default Divider;
