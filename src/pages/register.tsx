import { Flex, Box, Text, Input, Button, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import Router from "next/router";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register: NextPage = () => {

  const toast = useToast()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { register } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (await register({ email, password })) {
        Router.push("/login")
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

        <Text fontWeight="bold" fontSize="2.5em">Le Meet Up SignUp</Text>

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

        <Button type="submit" colorScheme="whiteAlpha">Register</Button>

      </Box>
    </Flex>
  )

}

export default Register