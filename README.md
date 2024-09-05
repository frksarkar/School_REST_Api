# School Management REST API

Welcome to the School Management REST API project! This API is designed to manage various aspects of a school, including administrative functions, academic years, class levels, programs, subjects, teachers, students, and exams. Below you'll find details on how to set up, use, and contribute to this project.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)
    -   [Admins](#admins)
    -   [Academic Years](#academic-years)
    -   [Academic Terms](#academic-terms)
    -   [Class Levels](#class-levels)
    -   [Programs](#programs)
    -   [Subjects](#subjects)
    -   [Year Groups](#year-groups)
    -   [Teachers](#teachers)
    -   [Exams](#exams)
    -   [Students](#students)
    -   [Questions](#questions)
    -   [Exam Results](#exam-results)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 14 or higher)
-   [MongoDB](https://www.mongodb.com/)

### Installation

1.  Clone the repository:

        git clone https://github.com/frksarkar/school-management-api.git
        cd school-management-API

2.  Install dependencies:

         npm install

3.  Set up environment variables. Create a `.env` file in the root directory and add the following:

        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/school-management
        JWT_SECRET=your_jwt_secret

### Running the Application

Start the development server:

    npm start

The API will be running at `http://localhost:3000/api/v1`.

## API Endpoints

### Admins

-   **GET /api/v1/admins**

    -   Description: Get all admins
    -   Response: List of admins

-   **POST /api/v1/admins**

    -   Description: Create a new admin
    -   Request Body: JSON object with admin details
    -   Response: Created admin

### Academic Years

-   **GET /api/v1/academic-years**

    -   Description: Get all academic years
    -   Response: List of academic years

-   **POST /api/v1/academic-years**

    -   Description: Create a new academic year
    -   Request Body: JSON object with academic year details
    -   Response: Created academic year

### Academic Terms

-   **GET /api/v1/academic-terms**

    -   Description: Get all academic terms
    -   Response: List of academic terms

-   **POST /api/v1/academic-terms**

    -   Description: Create a new academic term
    -   Request Body: JSON object with academic term details
    -   Response: Created academic term

### Class Levels

-   **GET /api/v1/class-levels**

    -   Description: Get all class levels
    -   Response: List of class levels

-   **POST /api/v1/class-levels**

    -   Description: Create a new class level
    -   Request Body: JSON object with class level details
    -   Response: Created class level

### Programs

-   **GET /api/v1/programs**

    -   Description: Get all programs
    -   Response: List of programs

-   **POST /api/v1/programs**

    -   Description: Create a new program
    -   Request Body: JSON object with program details
    -   Response: Created program

### Subjects

-   **GET /api/v1/subjects**

    -   Description: Get all subjects
    -   Response: List of subjects

-   **POST /api/v1/subjects**

    -   Description: Create a new subject
    -   Request Body: JSON object with subject details
    -   Response: Created subject

### Year Groups

-   **GET /api/v1/year-groups**

    -   Description: Get all year groups
    -   Response: List of year groups

-   **POST /api/v1/year-groups**

    -   Description: Create a new year group
    -   Request Body: JSON object with year group details
    -   Response: Created year group

### Teachers

-   **GET /api/v1/teachers**

    -   Description: Get all teachers
    -   Response: List of teachers

-   **POST /api/v1/teachers**

    -   Description: Create a new teacher
    -   Request Body: JSON object with teacher details
    -   Response: Created teacher

### Exams

-   **GET /api/v1/exams**

    -   Description: Get all exams
    -   Response: List of exams

-   **POST /api/v1/exams**

    -   Description: Create a new exam
    -   Request Body: JSON object with exam details
    -   Response: Created exam

### Students

-   **GET /api/v1/students**

    -   Description: Get all students
    -   Response: List of students

-   **POST /api/v1/students**

    -   Description: Create a new student
    -   Request Body: JSON object with student details
    -   Response: Created student

### Questions

-   **GET /api/v1/questions**

    -   Description: Get all questions
    -   Response: List of questions

-   **POST /api/v1/questions**

    -   Description: Create a new question
    -   Request Body: JSON object with question details
    -   Response: Created question

### Exam Results

-   **GET /api/v1/exam/results**

    -   Description: Get all exam results
    -   Response: List of exam results

-   **POST /api/v1/exam/results**

    -   Description: Create a new exam result
    -   Request Body: JSON object with exam result details
    -   Response: Created exam result

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for review.

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/your-feature`)
3.  Commit your changes (`git commit -m 'Add some feature'`)
4.  Push to the branch (`git push origin feature/your-feature`)
5.  Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
