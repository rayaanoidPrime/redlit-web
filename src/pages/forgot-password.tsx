import { FormControl, FormLabel, Input, FormErrorMessage, Flex, Button, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Wrapper from '../components/wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import register from './register';


type Inputs = {
    email : string
}

const forgotPassword : React.FC<{}> = ({}) => {
    const router = useRouter();
    const [complete , setComplete]  = useState(false);
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const [, ForgotPassword] = useForgotPasswordMutation();
    const onSubmit : SubmitHandler<Inputs> = async(values) => {
        await ForgotPassword(values);
        setComplete(true);
    }

    return (

        complete ? (
                <Wrapper variant={'small'}>
                    <Box>If an account exists we sent you an email</Box>
                </Wrapper>
            ) : 
            (
                <Wrapper variant={'small'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.email}>

                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            name='email'
                            id='forgotPassword'
                            placeholder='email'
                            type={'email'}
                            {...register('email', {
                                required: 'This is required',
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Flex style={{justifyContent: 'space-between'}}>
                        <Button mt={10} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                            Forgot Password
                        </Button>
                    </Flex>
                        
                    </form>
                </Wrapper>
            )

    )
}



export default withUrqlClient(createUrqlClient , {ssr : false})(forgotPassword)