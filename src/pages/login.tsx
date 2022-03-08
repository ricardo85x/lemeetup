import { Flex, Box, Text, Input, Button, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import Router from "next/router";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login: NextPage = () => {

    const toast = useToast()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { signIn } = useAuth()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (email && password) {
            if (await signIn({ email, password })) {
                Router.push("/dashboard")

            } else {
                toast({
                    title: 'Invalid email or password',
                    description: "Try again",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-end',

                })
            }

        }
    }


    return (
        <Flex maxH={1000} mt={10} justifyContent="center">
            <Box as="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gridGap={5}>

                <Text fontWeight="bold" fontSize="2.5em">Le Meet Up Login</Text>

                <Input
                    type="email"
                    placeholder="E-Mail"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />

                <Button type="submit" colorScheme="whiteAlpha">Login</Button>

            </Box>
        </Flex>
    )
}

export default Login