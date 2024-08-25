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



const fakeJobsData = [
	{
	  id: '1',
	  title: 'Software Engineer',
	  description: 'Responsible for developing and maintaining web applications.',
	  actual_interview_date: '2024-08-20',
	  job_url: 'https://example.com/software-engineer',
	},
	{
	  id: '2',
	  title: 'Product Manager',
	  description: 'Oversee the product lifecycle and collaborate with cross-functional teams.',
	  actual_interview_date: '2024-09-01',
	  job_url: 'https://example.com/product-manager',
	},
	{
	  id: '3',
	  title: 'Data Analyst',
	  description: 'Analyze data and provide insights to support business decisions.',
	  actual_interview_date: '2024-08-25',
	  job_url: 'https://example.com/data-analyst',
	},
	{
	  id: '4',
	  title: 'UX Designer',
	  description: 'Design user-friendly interfaces and enhance user experience.',
	  actual_interview_date: '2024-09-10',
	  job_url: 'https://example.com/ux-designer',
	},
	{
	  id: '5',
	  title: 'DevOps Engineer',
	  description: 'Implement and manage CI/CD pipelines and automate infrastructure.',
	  actual_interview_date: '2024-09-05',
	  job_url: 'https://example.com/devops-engineer',
	},
	{
	  id: '6',
	  title: 'Sales Manager',
	  description: 'Lead the sales team and develop strategies to meet sales targets.',
	  actual_interview_date: '2024-08-30',
	  job_url: 'https://example.com/sales-manager',
	},
	{
	  id: '7',
	  title: 'Marketing Specialist',
	  description: 'Create and execute marketing campaigns to promote products.',
	  actual_interview_date: '2024-09-12',
	  job_url: 'https://example.com/marketing-specialist',
	},
	{
	  id: '8',
	  title: 'Human Resources Manager',
	  description: 'Manage employee relations, recruitment, and training programs.',
	  actual_interview_date: '2024-09-15',
	  job_url: 'https://example.com/hr-manager',
	},
	{
	  id: '9',
	  title: 'Financial Analyst',
	  description: 'Analyze financial data and prepare reports for management.',
	  actual_interview_date: '2024-09-18',
	  job_url: 'https://example.com/financial-analyst',
	},
	{
	  id: '10',
	  title: 'Customer Support Specialist',
	  description: 'Provide support and resolve issues for customers via various channels.',
	  actual_interview_date: '2024-09-20',
	  job_url: 'https://example.com/customer-support',
	},
	{
	  id: '11',
	  title: 'Graphic Designer',
	  description: 'Create visual content for digital and print media.',
	  actual_interview_date: '2024-09-25',
	  job_url: 'https://example.com/graphic-designer',
	},
	{
	  id: '12',
	  title: 'Content Writer',
	  description: 'Develop content for blogs, articles, product descriptions, and social media.',
	  actual_interview_date: '2024-09-28',
	  job_url: 'https://example.com/content-writer',
	},
	{
	  id: '13',
	  title: 'IT Support Technician',
	  description: 'Provide technical support and troubleshoot hardware/software issues.',
	  actual_interview_date: '2024-09-30',
	  job_url: 'https://example.com/it-support',
	},
	{
	  id: '14',
	  title: 'Project Manager',
	  description: 'Coordinate and manage projects from initiation to closure.',
	  actual_interview_date: '2024-10-02',
	  job_url: 'https://example.com/project-manager',
	},
	{
	  id: '15',
	  title: 'Business Analyst',
	  description: 'Analyze business processes and recommend improvements.',
	  actual_interview_date: '2024-10-05',
	  job_url: 'https://example.com/business-analyst',
	},
	{
	  id: '16',
	  title: 'Mechanical Engineer',
	  description: 'Design and develop mechanical systems and components.',
	  actual_interview_date: '2024-10-08',
	  job_url: 'https://example.com/mechanical-engineer',
	},
	{
	  id: '17',
	  title: 'Electrical Engineer',
	  description: 'Design and develop electrical systems and equipment.',
	  actual_interview_date: '2024-10-10',
	  job_url: 'https://example.com/electrical-engineer',
	},
	{
	  id: '18',
	  title: 'Research Scientist',
	  description: 'Conduct experiments and research in a specialized field.',
	  actual_interview_date: '2024-10-15',
	  job_url: 'https://example.com/research-scientist',
	},
	{
	  id: '19',
	  title: 'Operations Manager',
	  description: 'Oversee daily operations and ensure efficient processes.',
	  actual_interview_date: '2024-10-18',
	  job_url: 'https://example.com/operations-manager',
	},
	{
	  id: '20',
	  title: 'Data Scientist',
	  description: 'Analyze large datasets to extract insights and inform decisions.',
	  actual_interview_date: '2024-10-20',
	  job_url: 'https://example.com/data-scientist',
	},
	{
	  id: '21',
	  title: 'Social Media Manager',
	  description: 'Manage and grow the company’s social media presence.',
	  actual_interview_date: '2024-10-22',
	  job_url: 'https://example.com/social-media-manager',
	},
	{
	  id: '22',
	  title: 'Network Engineer',
	  description: 'Design, implement, and manage computer networks.',
	  actual_interview_date: '2024-10-25',
	  job_url: 'https://example.com/network-engineer',
	},
	{
	  id: '23',
	  title: 'Cybersecurity Specialist',
	  description: 'Protect the organization’s systems and data from cyber threats.',
	  actual_interview_date: '2024-10-28',
	  job_url: 'https://example.com/cybersecurity-specialist',
	},
	{
	  id: '24',
	  title: 'QA Engineer',
	  description: 'Ensure the quality and functionality of software products through testing.',
	  actual_interview_date: '2024-11-01',
	  job_url: 'https://example.com/qa-engineer',
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
	},
	{
		id: 4,
		job_name: 'UX Designer',
		interview_datetime: '2024-08-26 09:00 AM',
		passed: false
	},
	{
		id: 5,
		job_name: 'DevOps Engineer',
		interview_datetime: '2024-08-27 03:00 PM',
		passed: true
	},
	{
		id: 6,
		job_name: 'QA Engineer',
		interview_datetime: '2024-08-28 01:00 PM',
		passed: false
	},
	{
		id: 7,
		job_name: 'Business Analyst',
		interview_datetime: '2024-08-29 11:00 AM',
		passed: true
	},
	{
		id: 8,
		job_name: 'Project Coordinator',
		interview_datetime: '2024-08-30 02:30 PM',
		passed: false
	},
	{
		id: 9,
		job_name: 'Frontend Developer',
		interview_datetime: '2024-09-02 10:30 AM',
		passed: true
	},
	{
		id: 10,
		job_name: 'Backend Developer',
		interview_datetime: '2024-09-03 09:00 AM',
		passed: true
	},
	{
		id: 11,
		job_name: 'Technical Writer',
		interview_datetime: '2024-09-04 03:30 PM',
		passed: false
	},
	{
		id: 12,
		job_name: 'Full Stack Developer',
		interview_datetime: '2024-09-05 12:00 PM',
		passed: true
	},
	{
		id: 13,
		job_name: 'Data Scientist',
		interview_datetime: '2024-09-06 02:00 PM',
		passed: true
	},
	{
		id: 14,
		job_name: 'HR Manager',
		interview_datetime: '2024-09-07 11:30 AM',
		passed: false
	},
	{
		id: 15,
		job_name: 'Scrum Master',
		interview_datetime: '2024-09-08 01:00 PM',
		passed: true
	},
	{
		id: 16,
		job_name: 'Cloud Engineer',
		interview_datetime: '2024-09-09 09:30 AM',
		passed: true
	},
	{
		id: 17,
		job_name: 'IT Support Specialist',
		interview_datetime: '2024-09-10 03:00 PM',
		passed: false
	},
	{
		id: 18,
		job_name: 'Product Owner',
		interview_datetime: '2024-09-11 02:30 PM',
		passed: true
	},
	{
		id: 19,
		job_name: 'Network Engineer',
		interview_datetime: '2024-09-12 10:00 AM',
		passed: true
	},
	{
		id: 20,
		job_name: 'Systems Analyst',
		interview_datetime: '2024-09-13 01:30 PM',
		passed: false
	},
	{
		id: 21,
		job_name: 'Database Administrator',
		interview_datetime: '2024-09-14 11:00 AM',
		passed: true
	},
	{
		id: 22,
		job_name: 'Security Analyst',
		interview_datetime: '2024-09-15 12:00 PM',
		passed: false
	},
	{
		id: 23,
		job_name: 'Marketing Specialist',
		interview_datetime: '2024-09-16 10:30 AM',
		passed: true
	}
];


const Prepdata = [
    { id: 1, title: 'React Basics', completed: true, score: 85.5, ready: true },
    { id: 2, title: 'Django REST Framework', completed: false, score: 70.0, ready: false },
    { id: 3, title: 'GraphQL with Apollo', completed: true, score: 92.0, ready: true },
    { id: 4, title: 'Next.js', completed: false, score: 80.0, ready: false },
    { id: 5, title: 'Node.js Advanced', completed: true, score: 88.0, ready: true },
    { id: 6, title: 'Redux Toolkit', completed: false, score: 75.0, ready: false },
    { id: 7, title: 'TypeScript Basics', completed: true, score: 95.0, ready: true },
    { id: 8, title: 'React Native', completed: true, score: 85.0, ready: true },
    { id: 9, title: 'Python for Data Science', completed: false, score: 78.0, ready: false },
    { id: 10, title: 'Machine Learning with Python', completed: true, score: 90.0, ready: true },
    { id: 11, title: 'Docker and Kubernetes', completed: false, score: 70.0, ready: false },
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


	const codedata = [
		{
		  id: 1,
		  question: 'Write a function to reverse a string in JavaScript.',
		  answer: `function reverseString(str) {
			return str.split('').reverse().join('');
		  }`,
		  my_answer: '',
		  attempted: false,
		  score: 85.5,
		},
		{
		  id: 2,
		  question: 'Write a Python function to check if a number is prime.',
		  answer: `def is_prime(n):
			if n <= 1:
			  return False
			for i in range(2, int(n**0.5) + 1):
			  if n % i == 0:
				return False
			return True`,
		  my_answer: '',
		  attempted: false,
		  score: 70.0,
		},
		{
		  id: 3,
		  question: 'Write a JavaScript function to find the factorial of a number.',
		  answer: `function factorial(n) {
			if (n === 0) {
			  return 1;
			}
			return n * factorial(n - 1);
		  }`,
		  my_answer: '',
		  attempted: false,
		  score: 92.0,
		},
	  ];
	  

export { interviewBlocks, interviewCodingQuestions, fakeJobsData, fakeInterviewsData, data, Prepdata, codedata };
