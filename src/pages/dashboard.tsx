import type { NextPage } from 'next'
import { Box, Text } from "@chakra-ui/react"

const Dashboard: NextPage = () => {
    return (
        <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" fontSize="2.5em" paddingTop={10}>Welcome to the Dashboard</Text>
        </Box>
    )
}

export default Dashboard
