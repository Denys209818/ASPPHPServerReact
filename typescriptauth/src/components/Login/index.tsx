import { Form, FormikHandlers, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../actions/BindingActions";
import { IReturnedLogin } from "../../actions/types/LoginTypes";
import TextInput from "../TextInputs/TextInput";
import { ILoginErrorResponse, ILoginModel } from "./types";
import ValidationSchema from "./ValidationSchema";


const Login: React.FC = () => 
{
    const [invalid, setInvalid] = useState("");
    const {LoginAction} = useActions();
    const navigate = useNavigate();
    var initialState: ILoginModel = {
        email: '',
        password:''
    }

    const onSubmitLogin = async (values: ILoginModel, {setFieldError}:FormikHelpers<ILoginModel>) => {
        try
        {
            await LoginAction(values);
            navigate("/");
        }
        catch (ex) {
            const serverError = ex as ILoginErrorResponse;
            Object.entries(serverError).forEach(([key, value])=> {
                if(Array.isArray(value))
                {
                    let message = "";
                    value.forEach((item)=> { message+=`${item} `; });
                    setFieldError(key, message);
                }
            });
            if(serverError.error)
            {
              setInvalid(serverError.error);
            }
          }
    }

    const formik = useFormik({
        initialValues:initialState,
        onSubmit: onSubmitLogin,
        validationSchema: ValidationSchema
    });
    
    const {errors, touched, handleSubmit, handleChange} = formik;



    return (<div className="container mt-3">
        <div className="row">
            <div className="offset-3 col-md-6">
                <h1 className="text-center">Вхід в аккаунт</h1>
                {invalid &&
                <div className="alert alert-danger">
                    {invalid}
                </div>}
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <TextInput
                            field="email"
                            label="Електронна адреса"
                            changeHandler={handleChange}
                            type="text"
                            error={errors.email}
                            touched={touched.email}
                        />
                        <TextInput
                            field="password"
                            label="Пароль"
                            changeHandler={handleChange}
                            type="password"
                            error={errors.password}
                            touched={touched.password}
                        />

                        <input type="submit" value="Увійти" className="btn btn-success mt-4"/>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    </div>);
}

export default Login;