interface ButtonProps {
  action: "submit" | "reset" | "button";
  text: string;
}

const formButtonClass =
  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-slate-400 mt-9";

export default function FormButton(props: ButtonProps) {
  return (
    <button type={props.action} className={formButtonClass}>
      {props.text}
    </button>
  );
}
