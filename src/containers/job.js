/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Container, Box, Text, Image, Heading, Divider, SimpleGrid, Tag, HStack,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiMoneyStack } from 'react-icons/gi';
import { FaLanguage } from 'react-icons/fa';
import {
  object, func, oneOfType, string, array,
} from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchJob from '../redux/actions/job';

const Job = ({
  fetchJob, job, status, error,
}) => {
  const { id } = useParams();

  useEffect(async () => {
    fetchJob(id);
  }, [id]);

  if (status === 'pending') {
    console.log('pending', status);
  }

  if (status === 'resolved') {
    console.log('resolved', job);
  }

  if (status === 'rejected') {
    console.log('error', error);
  }

  const { objective, organizations, place: { remote, location } } = job;

  return (
    <Container maxW="container.md">
      <Box>
        <Image
          src={organizations[0].picture}
          boxSize="130px"
          fit="cover"
          alt="company logo"
        />
        <Text pt="2" fontSize="sm">{organizations[0].name}</Text>
      </Box>
      <Box py="4">
        <Heading as="h1" size="md" pb="4">
          {objective}
        </Heading>
        <Box display="flex" alignItems="center" fontWeight="300">
          <MdLocationOn />
          <Text fontSize="sm" pl="2">
            {remote ? 'Remote' : ''}
            {location?.map((l) => ` - ${l.id} `)}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" pt="2" fontWeight="300">
          <GiMoneyStack />
          <Text fontSize="sm" pl="2">Salary: $14 hourly</Text>
        </Box>
        <Box display="flex" alignItems="center" pt="2" fontWeight="300">
          <AiOutlineClockCircle />
          <Text fontSize="sm" pl="2">Posted on July 14</Text>
        </Box>
        <Box display="flex" alignItems="center" pt="2" fontWeight="300">
          <FaLanguage />
          <Text fontSize="sm" pl="2">Language: English</Text>
        </Box>
      </Box>
      <Divider />
      <Box py="4">
        <Tag size="md" colorScheme="red" borderRadius="full" m="1">
          Software Development
        </Tag>
        <Tag size="md" colorScheme="red" borderRadius="full" m="1">
          Software Development
        </Tag>
        <Tag size="md" colorScheme="red" borderRadius="full" m="1">
          Software Development
        </Tag>
        <Tag size="md" colorScheme="red" borderRadius="full" m="1">
          Software Development
        </Tag>
        <Tag size="md" colorScheme="red" borderRadius="full" m="1">
          Software Development
        </Tag>
      </Box>
      <Divider />
      <Box py="4">
        <Heading as="h3" size="sm" fontWeight="600">DESCRIPTION</Heading>
        <Text pt="2">
          The Faulkner Automotive Group is looking for an enthusiastic,
          self-motivated Lot Attendant to join our team! Faulkner is a place you
          can establish a career and grow with the organization. We provide training
          to all of our employees and offer continued growth opportunities for those
          that have excellent talent, energy and ambition to succeed. We offer a top-tier
          benefits package to all full-time employees, including Medical,
          Dental, Vision, 401K plus company match, Employee Referral Bonuses and Paid Vacation.
        </Text>
      </Box>
      <Divider />
      <Box py="4">
        <Heading as="h3" size="sm" fontWeight="600">RESPONSIBILITIES</Heading>
        <Text pt="2">
          The Faulkner Automotive Group is looking for an enthusiastic,
          self-motivated Lot Attendant to join our team! Faulkner is a place you
          can establish a career and grow with the organization. We provide training
          to all of our employees and offer continued growth opportunities for those
          that have excellent talent, energy and ambition to succeed. We offer a top-tier
          benefits package to all full-time employees, including Medical,
          Dental, Vision, 401K plus company match, Employee Referral Bonuses and Paid Vacation.
        </Text>
      </Box>
      <Divider />
      <Box py="4">
        <Heading as="h3" size="sm" fontWeight="600">YOU'LL BE WORKING WITH</Heading>
        <SimpleGrid minChildWidth="200px" spacing="20px" pt="3">
          <Box bg="gray.300" color="black" p="8" pb="12" borderRadius="md" w="100%" textAlign="center">
            <Image
              borderRadius="full"
              boxSize="100px"
              mx="auto"
              src="https://starrgate.s3.amazonaws.com/users/a60d2a68c3e0289b05fe83d82954e64e55e75921/profile_9bg1jDP.jpg"
              alt="Segun Adebayo"
              mb="4"
            />
            <Text fontSize="md" fontWeight="500">John Wick</Text>
            <Text fontSize="sm">Web Developer</Text>
          </Box>
          <Box bg="lightblue" color="black" p="8" w="100%" textAlign="center">
            <Image
              src="https://starrgate.s3.amazonaws.com/users/ec7551dff10b04f9c59337114989f6f0cba20c95/profile_WWH0UvD.jpg"
              borderRadius="full"
              boxSize="100px"
              mx="auto"
              alt="profile photo"
            />
            <Text fontSize="md" fontWeight="500">John Wick</Text>
            <Text fontSize="sm">Web Developer</Text>
          </Box>
          <Box bg="gray.300" color="black" p="8" w="100%" textAlign="center">
            <Image
              src="https://starrgate.s3.amazonaws.com/users/a60d2a68c3e0289b05fe83d82954e64e55e75921/profile_9bg1jDP.jpg"
              borderRadius="full"
              boxSize="100px"
              mx="auto"
              alt="profile photo"
            />
            <Text fontSize="md" fontWeight="500">John Wick</Text>
            <Text fontSize="sm">Web Developer</Text>
          </Box>
          <Box bg="gray.300" color="black" p="8" w="100%" textAlign="center">
            <Image
              src="https://starrgate.s3.amazonaws.com/users/ec7551dff10b04f9c59337114989f6f0cba20c95/profile_WWH0UvD.jpg"
              borderRadius="full"
              boxSize="100px"
              mx="auto"
              alt="profile photo"
            />
            <Text fontSize="md" fontWeight="500">John Wick</Text>
            <Text fontSize="sm">Web Developer</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

Job.propTypes = {
  fetchJob: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  job: object.isRequired,
  status: string.isRequired,
  error: oneOfType([string, object, array]),
};

Job.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  job: state.job,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchJob })(Job);
