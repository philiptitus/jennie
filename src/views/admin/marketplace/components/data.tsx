// Fake Data for Normal Interview Blocks
const interviewBlocks = [
	{
		id: 1,
		session_id: 1,
		question: "Explain the concept of closures in JavaScript.",
	},
	
	{
		id: 2,
		session_id: 1,
		question: "What is the difference between var, let, and const in JavaScript?",
	},
	{
		id: 3,
		session_id: 1,
		question: "What are the key differences between HTTP and HTTPS?",
	},
	{
		id: 4,
		session_id: 1,
		question: "How does the virtual DOM work in React?",
	},
	{
		id: 5,
		session_id: 1,
		question: "What is event delegation in JavaScript?",
	},
	{
		id: 6,
		session_id: 1,
		question: "Explain the difference between null and undefined in JavaScript.",
	},
	{
		id: 7,
		session_id: 1,
		question: "What is a promise in JavaScript?",
	},
	{
		id: 8,
		session_id: 1,
		question: "What is the use of the 'use strict' directive in JavaScript?",
	},
	{
		id: 9,
		session_id: 1,
		question: "Explain the concept of hoisting in JavaScript.",
	},
	{
		id: 10,
		session_id: 1,
		question: "What is the difference between == and === in JavaScript?",
	},
];



// Example fake data for jobs
const fakeJobsData= [
	{
	  id: '1',
	  title: 'Software Engineer',
	  description: 'Responsible for developing and maintaining web applications.',
	  mockup_interview_date: '2024-08-20',
	  job_url: 'https://example.com/software-engineer',
	},
	{
	  id: '2',
	  title: 'Product Manager',
	  description: 'Oversee the product lifecycle and collaborate with cross-functional teams.',
	  mockup_interview_date: '2024-09-01',
	  job_url: 'https://example.com/product-manager',
	},
	{
	  id: '3',
	  title: 'Data Analyst',
	  description: 'Analyze data and provide insights to support business decisions.',
	  mockup_interview_date: '2024-08-25',
	  job_url: 'https://example.com/data-analyst',
	},
  ];

// Fake Data for Interview Coding Questions
const interviewCodingQuestions = [
	{
		id: 1,
		session_id: 1,
		question: "Write a function to reverse a string in Python.",
		language: "Python",
		attempted: false,
	},
	{
		id: 2,
		session_id: 1,
		question: "Implement a stack using an array in JavaScript.",
		language: "JavaScript",
		attempted: false,
	},
	{
		id: 3,
		session_id: 1,
		question: "Write a program to find the factorial of a number in Python.",
		language: "Python",
		attempted: false,
	},
	{
		id: 4,
		session_id: 1,
		question: "Create a function to check if a string is a palindrome in JavaScript.",
		language: "JavaScript",
		attempted: false,
	},
	{
		id: 5,
		session_id: 1,
		question: "Write a function to merge two sorted arrays in Python.",
		language: "Python",
		attempted: false,
	},
	{
		id: 6,
		session_id: 1,
		question: "Implement a queue using two stacks in JavaScript.",
		language: "JavaScript",
		attempted: false,
	},
	{
		id: 7,
		session_id: 1,
		question: "Write a function to calculate the Fibonacci sequence in Python.",
		language: "Python",
		attempted: false,
	},
	{
		id: 8,
		session_id: 1,
		question: "Create a function to flatten a nested array in JavaScript.",
		language: "JavaScript",
		attempted: false,
	},
	{
		id: 9,
		session_id: 1,
		question: "Write a program to check if a number is prime in Python.",
		language: "Python",
		attempted: false,
	},
	{
		id: 10,
		session_id: 1,
		question: "Implement binary search in JavaScript.",
		language: "JavaScript",
		attempted: false,
	},
];


const fakeInterviewsData = [
	{
	  id: 1,
	  job_name: 'Software Engineer',
	  interview_datetime: '2024-08-20 10:00 AM',
	  passed: true
	},
	{
	  id: 2,
	  job_name: 'Product Manager',
	  interview_datetime: '2024-09-01 02:00 PM',
	  passed: false
	},
	{
	  id: 3,
	  job_name: 'Data Analyst',
	  interview_datetime: '2024-08-25 11:30 AM',
	  passed: true
	}
  ];

  const data = [
		{
			id: 1,
			question: 'What is React?',
			answer: 'React is a JavaScript library for building user interfaces.',
			my_answer: 'A library for building UIs',
			attempted: true,
			score: 85.5,
		},
		{
			id: 2,
			question: 'What is Django REST Framework?',
			answer: 'Django REST Framework is a powerful toolkit for building Web APIs in Django.',
			my_answer: '',
			attempted: false,
			score: 70.0,
		},
		{
			id: 3,
			question: 'What is GraphQL?',
			answer: 'GraphQL is a query language for APIs and a runtime for executing those queries.',
			my_answer: 'A query language for APIs',
			attempted: true,
			score: 92.0,
		},
	]


export { interviewBlocks, interviewCodingQuestions, fakeJobsData, fakeInterviewsData, data };
