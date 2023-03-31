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
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';


type Inputs = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    username: string;
    password: string
};

type registerProps = {}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const [, Register] = useRegisterMutation();
    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        console.log('input', values);
        const response = await Register(values);
        if (response.data?.register.errors) {
            console.log("errors : ", response.data.register.errors)
            response.data.register.errors.forEach(({ field, message }) => {
                if (field === 'username') {
                 }
                if (field === 'password') {
                    setError('password', { message: message });
                }
            })
        }
        else if (response.data?.register.user) {
            //worked 
            router.push('/');
        }
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

export default withUrqlClient(createUrqlClient)(Register)