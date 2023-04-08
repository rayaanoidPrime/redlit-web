import { FormControl, FormLabel,Box, Input, FormErrorMessage, Flex, Button, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import  Wrapper  from "../components/wrapper";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useEffect } from "react";
import { useIsAuth } from "../utils/useIsAuth";


type CreatePostInputs = {
    title : string,
    text : string,
}

const CreatePost : React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePostInputs>();
    const [ , CreatePost] = useCreatePostMutation();
    const onSubmit : SubmitHandler<CreatePostInputs> = async(values) => {
        console.log(values);
        const {error} = await CreatePost(values);
        if(!error){
            router.push("/");
        }
    }

    return (
        <Wrapper variant="small">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.text || !!errors.title}>

                    <FormLabel htmlFor='title'>Title</FormLabel>
                    <Input
                        name='title'
                        id='title'
                        placeholder='title'
                        {...register('title', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                    <Box mt={5}>
                        <FormLabel htmlFor='text'>Body</FormLabel>
                        <Textarea
                            name='text'
                            id='text'
                            placeholder='text...'
                            {...register('text', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.text && errors.text.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <Flex style={{justifyContent: 'space-between'}}>
                    <Button mt={10} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Create Post
                    </Button>
                </Flex>
                
            </form>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);