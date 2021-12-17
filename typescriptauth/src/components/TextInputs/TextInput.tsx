import classNames from "classnames";

interface InputData 
{
    field: string,
    label: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "password",
    error?: null | string,
    touched?: boolean
}


const TextInput: React.FC<InputData> = ({field, label, changeHandler, type="text", error = null, touched}) => 
{
    return (<div className="form-group">
        <label className="form-label" htmlFor={field}>{label}</label>
        <input id={field} name={field} type={type} onChange={changeHandler} className={classNames(
          "form-control",
          { "is-invalid": touched && error },
          { "is-valid": touched && !error }
        )}/>

        {touched && error && <div className="invalid-feedback">
                {error}
            </div>}
    </div>);
}

export default TextInput;