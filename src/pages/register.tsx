import React from 'react';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
} from '@chakra-ui/react'
import Wrapper from '../components/wrapper'
import { useMutation } from 'urql';


type Inputs = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    username: string;
    password: string
};

type registerProps = {

}

const REGISTER_MUT = `
mutation Register($username: String, $password: String) {
    register(username: $username, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        createdAt
        updatedAt
      }
    }
}
`

const Register: React.FC<registerProps> = ({ }) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const [, Register] = useMutation(REGISTER_MUT);
    const onSubmit: SubmitHandler<Inputs> = (values) => {
        console.log(values);
        Register(values)
    }

    return (
        <Wrapper variant={'small'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.username || !!errors.password}>

                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input
                        name='username'
                        id='username'
                        placeholder='username'
                        {...register('username', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                    <Box mt={5}>
                        <FormLabel htmlFor='Password'>Password</FormLabel>
                        <Input
                            name='Password'
                            id='password'
                            placeholder='password'
                            type={'password'}
                            {...register('password', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Register
                </Button>
            </form>
        </Wrapper>
    );
}

export default Register;