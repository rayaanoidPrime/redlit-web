import React from 'react';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react'
import Wrapper from '../components/wrapper'


type Inputs = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
};

type registerProps = {

}

const Register: React.FC<registerProps> = ({ }) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


    return (
        <Wrapper variant={'small'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>First name</FormLabel>
                    <Input
                        id='name'
                        placeholder='name'
                        {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </Wrapper>
    );
}

export default Register;