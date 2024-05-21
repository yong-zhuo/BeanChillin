export interface InputProps {
  value: string;
  placeholder?: string;
  addClass?: string;
  name: string;
  id: string;
  type: string;
  isRequired: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fixedInputClass =
  "shadow rounded-md appearance-none relative block w-full px-3 py-2 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm";

const InputBox = (props: InputProps) => {
  return (
    <div className="mb-7">
      <input
        value={props.value}
        placeholder={props.placeholder}
        className={fixedInputClass + props.addClass}
        name={props.name}
        type={props.type}
        required={props.isRequired}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default InputBox;
