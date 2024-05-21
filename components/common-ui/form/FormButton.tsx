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
}

const formButtonClass =
  "group shadow relative w-full flex justify-center border border-transparent text-sm font-medium py-2 px-4 rounded-md mt-9 ";

export default function FormButton(props: ButtonProps) {
  return (
    <button
      type={props.action}
      className={formButtonClass + props.addClass}
      onClick={props.handleClick}
    >
      {props.alt && props.src && props.width && props.height && (
        <Image
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
        />
      )}
      {props.text}
    </button>
  );
}
