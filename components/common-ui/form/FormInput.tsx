import { CircleAlert } from "lucide-react";
import { fieldState } from "@/types/formFieldsState";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

export interface FormProps<T extends fieldState> {
  labelText?: string;
  placeholder?: string;
  forRegister?: boolean;
  error?: FieldError;
  addClass?: string;
  register?: UseFormRegister<T>;
  name: Path<T>;
  type: string;
  id: string;
}

const fixedInputClass =
  "shadow rounded-md appearance-none relative block w-full px-3 py-2 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-pri focus:border-pri focus:z-10 sm:text-sm";

const FormInput = <T extends fieldState>({
  labelText,
  placeholder,
  forRegister,
  error,
  addClass,
  register,
  name,
  type,
  id,
  ...props
}: FormProps<T>) => {
  return (
    <>
      <div className="flex justify-between">
        {labelText && <label
          htmlFor={id}
          className="text-md text-black-700 mb-2 block font-bold sm:text-base md:text-sm"
        >
          {labelText} {forRegister && <span className="text-pri">*</span>}
        </label>}

        {error && (
          <p className="text-xs flex justify-between font-semibold text-red-400 ">
            <CircleAlert height={15} />
            {error.message}
          </p>
        )}
      </div>

      <div className="mb-7">
        {/*Extra label for Jest to detect input field */}  
        <label htmlFor={id} className="hidden" >{labelText}</label>
        <input
          id={id}
          placeholder={placeholder}
          className={`${fixedInputClass} ${addClass || ""}`}
          {...props}
          type={type}
          {...(register && register(name))}
        />
      </div>
    </>
  );
};

export default FormInput;
