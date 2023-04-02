import React, { useState } from 'react';
import { NextPage } from 'next';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import Wrapper from '../../components/wrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../../utils/toErrorMap';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link'

type ChangePassInputs = {
    token : string,
    newPassword : string,
}

const ChangePassword : NextPage<{token : string}> = ({token}) => {
    
    const [tokenError, setTokenError] = useState('');
    const router = useRouter();
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<ChangePassInputs>();
    const [ , ChangePassword] = useChangePasswordMutation();
   
    const onSubmit : SubmitHandler<ChangePassInputs> = async(values) => {
         const response = await ChangePassword({newPassword : values.newPassword , token : token});
         if(response.data?.changePassword.errors){
            
            const errMap = toErrorMap(response.data.changePassword.errors)
            console.log("errors : " , errMap)
            if('token'in errMap ){
                setTokenError(errMap.token);
            }  

            response.data.changePassword.errors.forEach(({ field, message }) => {
                if (field === 'newPassword') {
                    setError('newPassword', { message: message })
                }
            })
         }
         else if(response.data?.changePassword.user){
            router.push('/');
         }
    }

    return (
        <Wrapper variant={'small'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.newPassword || !!errors.token}>

                    <FormLabel htmlFor='newPassword'>New Password</FormLabel>
                    <Input
                        name='newPassword'
                        id='nwPassword'
                        placeholder='new password'
                        type={'password'}
                        {...register('newPassword', {
                            required: 'This is required',
                        })}
                    />
                    {tokenError ? ( 
                        <Box>
                            <Box style={{color : 'red' ,  fontSize : 14}}>{tokenError}</Box>
                            <NextLink href='/forgot-password' style={{fontSize : 14}} >Go Forget it again</NextLink>
                        </Box>
                    ) : null}

                    <FormErrorMessage>
                        {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>


                </FormControl>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Change Password
                </Button>
            </form>
        </Wrapper>
    );   
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token : query.token as string
    }
}


export default withUrqlClient(createUrqlClient , {ssr : false})(ChangePassword)