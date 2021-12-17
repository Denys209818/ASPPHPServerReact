import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActionsRegister } from "../../actions/BindingActions";
import FormikImageTextInput from "../TextInputs/ImageTextInput";
import TextInput from "../TextInputs/TextInput";
import { IRegisterErrorResponse, IRegisterModel } from "./types";
import ValidationSchema from "./ValidationSchema";


const Register: React.FC = () => 
{
    const[invalid, setInvalid] = useState("");
    const navigator = useNavigate();

    var initialValues: IRegisterModel = 
    {
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        Image: null
    }   

    const {RegisterAction} = useActionsRegister();

    const onSubmitHanlder = async (values: IRegisterModel, {setFieldError}: FormikHelpers<IRegisterModel>) => 
    {
        try 
        {
            await RegisterAction(values);
            navigator("/");

        }catch(ex) 
        {
            
            const serverError = ex as IRegisterErrorResponse;
            Object.entries(serverError).forEach(([key, value])=> {
                if(Array.isArray(value))
                {
                    let message = "";
                    value.forEach((item)=> { message+=`${item} `; });
                    setFieldError(key, message);
                }
            });
            if(serverError.message)
            {
              setInvalid("Аккаунт вже існує!");
            }
        }

    }

    const formik = useFormik({
        initialValues:initialValues,
        onSubmit: onSubmitHanlder,
        validationSchema: ValidationSchema
    });

    const {errors, touched, handleChange, handleSubmit, setFieldValue} = formik;

    return(<div className="container">
        <div className="row">
            <div className="offset-3 col-md-6">
                <h1 className="text-center">Реєстрація</h1>
                {invalid && <div className="alert alert-danger">{invalid}</div>}
                <FormikProvider value={formik}>
                    <Form>
                        <TextInput
                            label="Ім'я"
                            field="name"
                            changeHandler={handleChange}
                            error={errors.name}
                            touched={touched.name}
                            type="text"
                        />
                        <TextInput
                            label="Електронна пошта"
                            field="email"
                            changeHandler={handleChange}
                            error={errors.email}
                            touched={touched.email}
                            type="text"
                        />
                        <TextInput
                            label="Пароль"
                            field="password"
                            changeHandler={handleChange}
                            error={errors.password}
                            touched={touched.password}
                            type="password"
                        />
                        <TextInput
                            label="Підтвердження пароля"
                            field="password_confirmation"
                            changeHandler={handleChange}
                            error={errors.password_confirmation}
                            touched={touched.password_confirmation}
                            type="password"
                        />
                        <FormikImageTextInput
                            label="Фотографія"
                            field="Image"
                            changeHandler={handleChange}
                            error={errors.Image}
                            touched={touched.Image}
                            type="file"
                            setFieldValue={setFieldValue}
                        />

                        <input type="submit" className="btn btn-success mt-4" value="Зареєструватися"/>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    </div>);
}

export default Register;