import { login } from "@/lib/schemas/loginSchema";
import { fieldState } from "@/types/formFieldsState";
import {
  FieldError,
  Path,
  UseFormRegister,
} from "react-hook-form";


export interface FormProps<T extends fieldState> {
  labelText: string;
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
}: FormProps<T>) => {
  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-md text-black-700 mb-2 block font-bold"
        >
          {labelText}{" "}
          {forRegister && <span className="text-pri">*</span>}
        </label>
        {error && (
        <p className="text-sm text-red-400  ">{error.message}</p>
      )}
      </div>

      <div className="mb-7">
      
        <input
          placeholder={placeholder}
          className={`${fixedInputClass} ${addClass || ""}`}
          type={type}
          {...(register && register(name))}
        />
        
      </div>
      
    </>
  );
};

export default FormInput;
