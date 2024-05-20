import InputBox from "../input/InputBox";
import { InputProps } from "../input/InputBox";

interface FormProps extends InputProps {
  labelText: string;
}

const FormInput = (props: FormProps) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className="text-md text-black-700 mb-2 block font-bold"
      >
        {props.labelText}
      </label>
      <InputBox
        isRequired={props.isRequired}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        handleChange={props.handleChange}
      />
    </>
  );
};

export default FormInput;
