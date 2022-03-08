import type { NextPage } from 'next'
import { Box, Text } from "@chakra-ui/react"
import { useEffect } from 'react'
import { api } from '../services/apiClient'

const Dashboard: NextPage = () => {

    useEffect(() => {

        const listPlaces = async () => {

            api.post("place").then(d => console.log("1", d.data))
            api.post("place").then(d => console.log("2", d.data))
            api.post("place").then(d => console.log("3", d.data))

        }

        listPlaces()


    }, [])

    return (
        <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" fontSize="2.5em" paddingTop={10}>Welcome to the Dashboard</Text>
        </Box>
    )
}

export default Dashboard
