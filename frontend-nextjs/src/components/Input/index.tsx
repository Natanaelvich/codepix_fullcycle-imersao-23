// @flow
import { forwardRef } from "react";
import slug from "slug";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText?: string;
}
const formGroupClasses = {
  text: "form-group",
  number: "form-group",
  radio: "form-check",
};

const inputClasses = {
  text: "form-control",
  number: "form-control",
  radio: "form-check-input",
};

type InputType = "text" | "number" | "radio";

const labelClasses = {
    text: "",
    number: "",
    radio: "form-check-label",
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { labelText, type = "text", ...rest } = props;
    const id = props.id ?? props.name ?? slug(labelText ?? "");
    const Label = labelText && (
        <label className={labelClasses[type as InputType]} htmlFor={id}>
            {labelText}
        </label>
    );

  const CustomInput = (
    <input id={id} className={inputClasses[type as InputType]} type={type} {...rest} ref={ref} />
  );
  return (
    <div className={formGroupClasses[type as InputType]}>
      {type === "radio" && (
        <>
          {CustomInput}
          {Label}
        </>
      )}
      {(type === "text" || type === "number") && (
        <>
          {Label}
          {CustomInput}
        </>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
