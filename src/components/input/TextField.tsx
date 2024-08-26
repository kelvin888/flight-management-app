import React, { InputHTMLAttributes, useState } from "react"
import { FieldError, useFormContext, useFormState } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { ErrorMessage } from "@hookform/error-message"
import { twMerge } from "tailwind-merge"

type inputContainerProps = InputHTMLAttributes<HTMLDivElement>
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  inputContainerProps?: inputContainerProps
  error?: FieldError
  labelprops?: React.HTMLAttributes<HTMLLabelElement>
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputContainerProps, ...props }, ref) => {
    const { name, label, type, labelprops } = props
    const [showPassword, setShowPassword] = useState(false)
    const { errors } = useFormState()
    const { register } = useFormContext()

    const toggleType = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className={inputContainerProps?.className} ref={ref}>
        {label && (
          <label {...labelprops} htmlFor={name}>
            {label}
          </label>
        )}
        <div className="mt-2 flex items-center">
          <input
            id={name}
            {...props}
            className={twMerge(`h-11-5 w-full rounded border border-gray-20 p-3 
            focus:border-gray-20 focus:ring-gray-20 dark:bg-gray-600 ${props.className}`)}
            {...register(name)}
            type={showPassword ? "text" : type}
            readOnly
            onFocus={(e) => e.target.removeAttribute("readonly")}
          />
          {type === "password" && (
            <span
              className={`${showPassword ? "text-gray-10" : "text-gray-20"}`}
            >
              <FontAwesomeIcon
                onClick={toggleType}
                icon={showPassword ? faEye : faEyeSlash}
                className="-ml-8 cursor-pointer"
              />
            </span>
          )}
        </div>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className="mt-1 text-[0.6875rem] text-red-500 dark:text-orange-300">
              {message}
            </div>
          )}
        />
      </div>
    )
  }
)

TextField.displayName = "TextField"

export default TextField
