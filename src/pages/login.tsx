import { Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Router from "next/router";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login: NextPage = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { token, signIn, hasError } = useAuth()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (email && password) {
            const xxx = await signIn({ email, password })

            console.log("has?", xxx)

            if (!hasError) {
                //      Router.push("/")
            } else {
                alert("Invalid email or password")
            }
        }
    }

    useEffect(() => {
        if (token) {
            console.log(token)
        }
    }, [token])

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