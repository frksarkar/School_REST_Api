<div class="markdown prose w-full break-words dark:prose-invert light">
   <hr>
   <h1>School Management REST API</h1>
   <p>Welcome to the School Management REST API project! This API is designed to manage various aspects of a school, including administrative functions, academic years, class levels, programs, subjects, teachers, students, and exams. Below you'll find details on how to set up, use, and contribute to this project.</p>
   <h2>Table of Contents</h2>
   <ul>
      <li>
         <a target="_new" href="#getting-started">Getting Started</a>
         <ul>
            <li><a target="_new" href="#prerequisites">Prerequisites</a></li>
            <li><a target="_new" href="#installation">Installation</a></li>
            <li><a target="_new" href="#running-the-application">Running the Application</a></li>
         </ul>
      </li>
      <li>
         <a target="_new" href="#api-endpoints">API Endpoints</a>
         <ul>
            <li><a target="_new" href="#admins">Admins</a></li>
            <li><a target="_new" href="#academic-years">Academic Years</a></li>
            <li><a target="_new" href="#academic-terms">Academic Terms</a></li>
            <li><a target="_new" href="#class-levels">Class Levels</a></li>
            <li><a target="_new" href="#programs">Programs</a></li>
            <li><a target="_new" href="#subjects">Subjects</a></li>
            <li><a target="_new" href="#year-groups">Year Groups</a></li>
            <li><a target="_new" href="#teachers">Teachers</a></li>
            <li><a target="_new" href="#exams">Exams</a></li>
            <li><a target="_new" href="#students">Students</a></li>
            <li><a target="_new" href="#questions">Questions</a></li>
            <li><a target="_new" href="#exam-results">Exam Results</a></li>
         </ul>
      </li>
      <li><a target="_new" href="#contributing">Contributing</a></li>
      <li><a target="_new" href="#license">License</a></li>
   </ul>
   <h2>Getting Started</h2>
   <h3>Prerequisites</h3>
   <p>Ensure you have the following installed:</p>
   <ul>
      <li><a target="_new" href="https://nodejs.org/">Node.js</a> (version 14 or higher)</li>
      <li><a target="_new" href="https://www.mongodb.com/">MongoDB</a></li>
   </ul>
   <h3>Installation</h3>
   <ol>
      <li>
         <p>Clone the repository:</p>
```bash
git clone https://github.com/frksarkar/school-management-api.git
cd school-management-API
```
      </li>
      <li>
         <p>Install dependencies:</p>
```bash
npm install
```
      </li>
      <li>
         <p>Set up environment variables. Create a ```.env``` file in the root directory and add the following:</p>
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your_jwt_secret
```
      </li>
   </ol>
   <h3>Running the Application</h3>
   <p>Start the development server:</p>
   <pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="overflow-y-auto p-4 text-left undefined" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm start
</code></div></div></pre>
   <p>The API will be running at <code>http://localhost:3000/api/v1</code>.</p>
   <h2>API Endpoints</h2>
   <h3>Admins</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/admins</strong></p>
         <ul>
            <li>Description: Get all admins</li>
            <li>Response: List of admins</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/admins</strong></p>
         <ul>
            <li>Description: Create a new admin</li>
            <li>Request Body: JSON object with admin details</li>
            <li>Response: Created admin</li>
         </ul>
      </li>
   </ul>
   <h3>Academic Years</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/academic-years</strong></p>
         <ul>
            <li>Description: Get all academic years</li>
            <li>Response: List of academic years</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/academic-years</strong></p>
         <ul>
            <li>Description: Create a new academic year</li>
            <li>Request Body: JSON object with academic year details</li>
            <li>Response: Created academic year</li>
         </ul>
      </li>
   </ul>
   <h3>Academic Terms</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/academic-terms</strong></p>
         <ul>
            <li>Description: Get all academic terms</li>
            <li>Response: List of academic terms</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/academic-terms</strong></p>
         <ul>
            <li>Description: Create a new academic term</li>
            <li>Request Body: JSON object with academic term details</li>
            <li>Response: Created academic term</li>
         </ul>
      </li>
   </ul>
   <h3>Class Levels</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/class-levels</strong></p>
         <ul>
            <li>Description: Get all class levels</li>
            <li>Response: List of class levels</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/class-levels</strong></p>
         <ul>
            <li>Description: Create a new class level</li>
            <li>Request Body: JSON object with class level details</li>
            <li>Response: Created class level</li>
         </ul>
      </li>
   </ul>
   <h3>Programs</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/programs</strong></p>
         <ul>
            <li>Description: Get all programs</li>
            <li>Response: List of programs</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/programs</strong></p>
         <ul>
            <li>Description: Create a new program</li>
            <li>Request Body: JSON object with program details</li>
            <li>Response: Created program</li>
         </ul>
      </li>
   </ul>
   <h3>Subjects</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/subjects</strong></p>
         <ul>
            <li>Description: Get all subjects</li>
            <li>Response: List of subjects</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/subjects</strong></p>
         <ul>
            <li>Description: Create a new subject</li>
            <li>Request Body: JSON object with subject details</li>
            <li>Response: Created subject</li>
         </ul>
      </li>
   </ul>
   <h3>Year Groups</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/year-groups</strong></p>
         <ul>
            <li>Description: Get all year groups</li>
            <li>Response: List of year groups</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/year-groups</strong></p>
         <ul>
            <li>Description: Create a new year group</li>
            <li>Request Body: JSON object with year group details</li>
            <li>Response: Created year group</li>
         </ul>
      </li>
   </ul>
   <h3>Teachers</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/teachers</strong></p>
         <ul>
            <li>Description: Get all teachers</li>
            <li>Response: List of teachers</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/teachers</strong></p>
         <ul>
            <li>Description: Create a new teacher</li>
            <li>Request Body: JSON object with teacher details</li>
            <li>Response: Created teacher</li>
         </ul>
      </li>
   </ul>
   <h3>Exams</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/exams</strong></p>
         <ul>
            <li>Description: Get all exams</li>
            <li>Response: List of exams</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/exams</strong></p>
         <ul>
            <li>Description: Create a new exam</li>
            <li>Request Body: JSON object with exam details</li>
            <li>Response: Created exam</li>
         </ul>
      </li>
   </ul>
   <h3>Students</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/students</strong></p>
         <ul>
            <li>Description: Get all students</li>
            <li>Response: List of students</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/students</strong></p>
         <ul>
            <li>Description: Create a new student</li>
            <li>Request Body: JSON object with student details</li>
            <li>Response: Created student</li>
         </ul>
      </li>
   </ul>
   <h3>Questions</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/questions</strong></p>
         <ul>
            <li>Description: Get all questions</li>
            <li>Response: List of questions</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/questions</strong></p>
         <ul>
            <li>Description: Create a new question</li>
            <li>Request Body: JSON object with question details</li>
            <li>Response: Created question</li>
         </ul>
      </li>
   </ul>
   <h3>Exam Results</h3>
   <ul>
      <li>
         <p><strong>GET /api/v1/exam/results</strong></p>
         <ul>
            <li>Description: Get all exam results</li>
            <li>Response: List of exam results</li>
         </ul>
      </li>
      <li>
         <p><strong>POST /api/v1/exam/results</strong></p>
         <ul>
            <li>Description: Create a new exam result</li>
            <li>Request Body: JSON object with exam result details</li>
            <li>Response: Created exam result</li>
         </ul>
      </li>
   </ul>
   <h2>Contributing</h2>
   <p>We welcome contributions! Please fork the repository and submit a pull request for review.</p>
   <ol>
      <li>Fork the repository</li>
      <li>Create a feature branch (<code>git checkout -b feature/your-feature</code>)</li>
      <li>Commit your changes (<code>git commit -m 'Add some feature'</code>)</li>
      <li>Push to the branch (<code>git push origin feature/your-feature</code>)</li>
      <li>Open a pull request</li>
   </ol>
   <h2>License</h2>
   <p>This project is licensed under the MIT License - see the <a target="_new" rel="noreferrer">LICENSE</a> file for details.</p>
   <hr>
   <p>Feel free to adjust any details to fit your specific project setup or preferences. This template provides a comprehensive overview and should help users understand and use your API effectively.</p>
</div>
