import type { NextPage } from 'next'
import { Box, Text } from "@chakra-ui/react"

const Home: NextPage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Text paddingTop={10}>Hello world</Text>
    </Box>
  )
}

export default Home
