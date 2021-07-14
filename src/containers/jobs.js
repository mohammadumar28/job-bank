import {
  Box, Container, Image, Text,
} from '@chakra-ui/react';
import {
  object, bool, func, oneOfType, string, array,
} from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  Paginator,
  Previous,
  usePaginator,
  Next,
} from 'chakra-paginator';
import { Link } from 'react-router-dom';
import fetchJobs from '../redux/actions/jobs';

const Jobs = ({
  fetchJobs, jobs, fetching, error,
}) => {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  useEffect(async () => {
    if (currentPage === 1) fetchJobs(0);
  }, [currentPage]);

  useEffect(async () => {
    if (currentPage === 1) return;
    await fetchJobs((currentPage - 1) * 15);
  }, [currentPage]);

  const totalPages = Math.round((jobs.total + 15 - 1) / 15);

  let toRender;

  if (fetching) {
    toRender = <Text>Loading...</Text>;
  }

  if (!fetching && error) {
    toRender = <Text>{error.message}</Text>;
  }

  if (!fetching && !error && jobs.results) {
    toRender = (
      <Box>
        {
      jobs?.results?.map((i) => (
        <Box key={i.id} maxW="full" borderWidth="1px" colorScheme="red" borderRadius="sm" p="4" m="8">
          <Link to={`/jobs/${i.id}`}>
            <Box display="flex">
              <Image
                borderRadius="full"
                boxSize="50px"
                fit="cover"
                src={i.organizations[0].picture}
                alt="company logo"
              />
              <Box textAlign="left" pl="4">
                <Text fontSize="lg" pb="1" color={['blue.500', 'blue.300']} fontWeight="500">{i.objective}</Text>
                <Text fontSize="sm" pb="1">
                  <Text display="inline" color="gray.500">at </Text>
                  {i.organizations[0].name}
                </Text>
                <Text fontSize="sm" pb="1">
                  {`
                  ${i.remote ? 'Remote' : ''}
                  ${i.locations.length > 0 ? ` | ${i.locations[0]}` : ''}`}
                </Text>
                <Text fontSize="sm" pb="1">
                  Posted on
                  {' '}
                  {new Date(i.created).toLocaleString('en-us', { day: 'numeric', month: 'long' })}
                </Text>
                <Text fontSize="sm" color="green.400" pb="1">
                  Salary:
                  {' '}
                  {`USD ${i.compensation?.data?.minHourlyUSD?.toFixed(2)} to
                USD ${i.compensation?.data?.maxHourlyUSD?.toFixed(2)}`}
                  {' '}
                  hourly
                </Text>
              </Box>
            </Box>
          </Link>
        </Box>
      ))
      }
        <Paginator
          currentPage={currentPage}
          pagesQuantity={totalPages}
          onPageChange={setCurrentPage}
        >
          <Container display="flex" justifyContent="space-between" w="full" p={4}>
            <Previous>
              <IconContext.Provider value={{ className: 'pagination-btn' }}>
                <GrFormPrevious />
              </IconContext.Provider>
              <Text>
                Previous
              </Text>
            </Previous>
            <Next>
              <Text>
                Next
              </Text>
              <IconContext.Provider value={{ className: 'pagination-btn' }}>
                <GrFormNext />
              </IconContext.Provider>
            </Next>
          </Container>
        </Paginator>
      </Box>
    );
  }

  return (
    <Container maxW="container.md">
      <Box>
        {toRender}
      </Box>
    </Container>
  );
};

Jobs.propTypes = {
  fetchJobs: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  jobs: object.isRequired,
  fetching: bool.isRequired,
  error: oneOfType([string, object, array]),
};

Jobs.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  fetching: state.fetching,
  error: state.error,
});

export default connect(mapStateToProps, { fetchJobs })(Jobs);
