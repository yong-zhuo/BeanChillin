
interface ButtonProps {
  action: "submit" | "reset" | "button";
  text: string;
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

const formButtonClass =
  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-black mt-10";

export default function FormButton(props: ButtonProps) {
  return (
    <button
      type={props.action}
      className={formButtonClass}
      onSubmit={props.handleSubmit}
    >
      {props.text}
    </button>
  );
}
