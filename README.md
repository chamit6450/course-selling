# Course & Test Taking Website

## Overview
This is a full-featured course and test-taking website built using Next.js, Prisma ORM, ShadCN, JWT authentication, and Bcrypt for password hashing. The platform allows users to enroll in courses, take tests, submit feedback, and track their progress. Administrators can manage courses, tests, and users via a dedicated dashboard.

## Features
### User Features
- **User Authentication:** Secure login and registration using JWT and Bcrypt.
- **Course Enrollment:** Users can browse and enroll in courses.
- **Watch Courses:** Video and text-based learning materials.
- **Take Tests:** Timed and interactive quizzes for learning assessment.
- **Submit Feedback:** Users can provide feedback on courses.
- **Track Progress:** View completed courses and test scores.

### Admin Features
- **Course Management:** Create, update, and delete courses.
- **Test Management:** Add, modify, and remove tests.
- **User Management:** Manage enrolled users and their progress.
- **Attendance Tracking:** Monitor user activity and participation.

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, ShadCN (for UI components)
- **Backend:** Next.js API routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JSON Web Tokens (JWT) and Bcrypt

## visit at: https://course-selling-q13g.vercel.app/

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/amitxdev/course-selling.git
   cd course-selling
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables:
   Create a `.env` file and add the following:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
   JWT_SECRET=your_jwt_secret
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Register/Login to access courses and tests.
- Admins can access the dashboard for management tasks.

## Deployment
To deploy the project, use platforms like **Vercel** or **Railway**:
1. Push your project to GitHub.
2. Connect your repository to Vercel.
3. Set up environment variables in the deployment settings.
4. Deploy and enjoy!

## Future Enhancements
- Live classes and discussion forums
- AI-powered test analysis
- Certificate generation for course completion

## License
This project is licensed under the MIT License.

## Contributors
Feel free to contribute to the project by submitting pull requests!

## Contact
For any queries, contact [chamit6450@gmail.com] or open an issue on GitHub.

