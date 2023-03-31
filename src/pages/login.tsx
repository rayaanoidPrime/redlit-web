import React from 'react';
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
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


type Inputs = React.InputHTMLAttributes<HTMLInputElement> & {
    usernameOrEmail: string;
    password: string
};


const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const [, Login] = useLoginMutation();
    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        console.log('input', values);

        const response = await Login(values, { fetchOptions: { credentials: 'include' } });
        if (response.data?.login.errors) {
            console.log("errors : ", response.data.login.errors)
            response.data.login.errors.forEach(({ field, message }) => {
                if (field === 'username' || field === 'email') {
                    setError('usernameOrEmail', { message: message })
                }
                if (field === 'password') {
                    setError('password', { message: message });
                }
            })
        }
        else if (response.data?.login.user) {
            //worked 
            router.push('/');
        }
    }

    return (
        <Wrapper variant={'small'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.usernameOrEmail || !!errors.password}>

                    <FormLabel htmlFor='usernameOrEmail'>Username Or Email</FormLabel>
                    <Input
                        name='usernameOrEmail'
                        id='usernameOrEmail'
                        placeholder='Username Or Email'
                        {...register('usernameOrEmail', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.usernameOrEmail && errors.usernameOrEmail.message}
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
                    Login
                </Button>
            </form>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login)