import React from 'react';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Wrapper from '../components/wrapper'


type Inputs = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
};

type registerProps = {

}

const Register: React.FC<registerProps> = ({ }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


    return (
        <Wrapper variant={'small'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue="name" {...register("name", { required: true })} />

                {/* errors will return when field validation fails  */}
                {errors.name && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </Wrapper>
    );
}

export default Register;