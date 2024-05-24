import Image from "next/image";

interface ButtonProps {
  action?: "submit" | "reset" | "button";
  text: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  addClass?: string;
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  orientation?: "left" | "right";
}

const buttonClass =
  "group shadow relative w-full flex justify-center border border-transparent text-sm font-medium py-2 px-4 rounded-md mt-9 ";

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.action}
      className={buttonClass + props.addClass}
      onClick={props.handleClick}
    >
      {props.alt &&
        props.src &&
        props.width &&
        props.height &&
        props.orientation === "left" && (
          <Image
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        )}
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {props.text}
      </div>
      {props.alt &&
        props.src &&
        props.width &&
        props.height &&
        props.orientation === "right" && (
          <Image
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        )}
    </button>
  );
}
