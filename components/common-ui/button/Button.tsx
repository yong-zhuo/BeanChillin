import { cn } from "@/lib/utils";
import Image from "next/image";

interface ButtonProps {
  action?: "submit" | "reset" | "button";
  text?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  addClass?: string;
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  orientation?: "left" | "right";
  isCircular?: boolean;
  state?: boolean
}

const buttonClass = "group relative  flex justify-center border border-transparent text-sm font-medium py-2 px-4 mt-9";

const squareButton = cn("rounded-md w-full", buttonClass);

const roundedButton = cn("rounded-full aspect-square overflow-hidden w-12 h-12", buttonClass);

export default function Button(props: ButtonProps) {

  const classes = props.isCircular ? cn(roundedButton, props.addClass) : cn(squareButton, props.addClass);

  return (
    <button
      type={props.action}
      className={classes}
      onClick={props.handleClick}
    >
      {props.state ? (<Image src="/misc/spinner.svg" alt="loading" height={props.height} width={props.width}/>) : (
        <>
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
                {...props.isCircular && { className: "absolute inset-0 w-4/5 h-4/5 m-auto object-contain" }}
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
        </>
      )}
      
    </button>
  );
}
