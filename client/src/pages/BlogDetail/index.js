import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBlogDetail } from "../../api";
import {
  Text,
  Image,
  Container,
  Heading,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";

const BlogDetail = () => {
  const { blog_id } = useParams();
  const { isLoading, isError, data } = useQuery(["blog", blog_id], () =>
    getBlogDetail(blog_id)
  );

  if (isLoading)
    return (
      <Center style={{ minHeight: "100vh" }}>
        <Spinner
          thickness="4px"
          speed="0.65"
          emptyColor="gray.200"
          size="xl"
          color="red.500"
        />
      </Center>
    );

  if (isError) return <div>Error</div>;

  return (
    <Container maxW="container.md">
      <VStack textAlign="center" spacing={6} my="12">
        <Heading as="h2" fontSize="2xl">
          {data.title}
        </Heading>

        <Image src={data.photo} alt={data.description} mx="auto" />

        <Heading as="h4" size="md">
          {data.description}
        </Heading>
        <Text px={12} fontFamily="Quicksand" textAlign="left" lineHeight={2}>
          {data.content}
        </Text>
      </VStack>
    </Container>
  );
};

export default BlogDetail;
