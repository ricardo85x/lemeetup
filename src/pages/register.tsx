import { Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Router from "next/router";
import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register: NextPage = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { register, hasError } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await register({ email, password })

      if (!hasError) {
        alert("User registration completed successfully")
        Router.push("/login")
      } else {
        alert("User registration failed!")
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