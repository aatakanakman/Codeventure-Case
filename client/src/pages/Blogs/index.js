import React from 'react'
import Card from '../../components/Card'
import { Flex, VStack, StackDivider, Spinner, Center } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { getBlogs } from '../../api'

const Blogs = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('blogs', getBlogs, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12

      if (!morePagesExist) {
        return
      }

      return allGroups.length + 1
    },
  })

  if (status === 'loading')
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Spinner
          thickness="4px"
          speed="0.65"
          emptyColor="gray.200"
          size="xl"
          color="red.500"
        />
      </Center>
    )

  if (status === 'error') return 'An error has occurred: ' + error.message
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          {data.pages.map((group, i) => (
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={16}
              mt={16}
              key={i}
            >
              {group.map(item => (
                <Card key={item._id} item={item}></Card>
              ))}
            </VStack>
          ))}
        </div>
      </div>

      <Flex mt="10" justifyContent="center">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </Flex>
    </>
  )
}

export default Blogs
