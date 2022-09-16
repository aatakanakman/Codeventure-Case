import {
  Box,
  Image,
  Button,
  Flex,
  Container,
  Heading,
  Tag,
  HStack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Card = ({ item }) => {
  return (
    <Container borderRadius="lg" maxW={1440} overflow="hidden">
      <Link to={`/blog/${item._id}`}>
        <Flex direction="column" gap={4}>
          <Image
            objectFit="cover"
            borderRadius="10px"
            src={item.photo}
            loading="lazy"
            alt="blog"
          ></Image>

          <Box px={[0, 12, 16]}>
            <HStack justify="space-between" align="center">
              <Heading as="h5" size="md" mb={2}>
                {item.title}
              </Heading>
              <Tag size={'sm'} variant="solid" colorScheme="gray">
                {moment(item.created_at).format('DD/MM/YYYY')}
              </Tag>
            </HStack>
            <Text
              fontWeight="light"
              fontSize={20}
              lineHeight="tight"
              fontFamily="Quicksand"
            >
              {item.description}
            </Text>
            <Link to={`/blog/${item._id}`}>
              <Button
                mt={4}
                colorScheme="pink"
                variant="ghost"
                border="1px"
                borderColor="pink"
              >
                Okumaya Devam Et
              </Button>
            </Link>
          </Box>
        </Flex>
      </Link>
    </Container>
  )
}

export default Card
