# SmartEdu Platform – Comprehensive Implementation Plan

**Vision:** A one-stop web-based tutoring platform for school students (1st–12th standard) offering class-wise, board-wise, and subject-wise learning with transparent fees and regular assessments.

---

## 1. Core Features Overview

### 1.1 **Student Onboarding & Profile Management**
- ✅ User registration (name, email, password, role: student/parent/admin/tutor)
- ✅ Login with JWT authentication
- ✅ Profile page with user info (name, email, role, class, board, enrolled subjects)
- **To-Do:** 
  - Add phone, address, emergency contact fields
  - Profile picture upload
  - Edit profile functionality
  - Account verification (email confirmation)

### 1.2 **Class, Subject & Board Organization**
- ✅ Classes: 1st–12th standard (database: `classes` table)
- ✅ Boards: CBSE, ICSE, STATE (stored in `classes` table)
- ✅ Subjects: Automatically filtered by selected class (stored in `subjects` table)
- **To-Do:**
  - Display board-specific curricula
  - Show recommended subjects per board per class
  - Subject descriptions and syllabus details

### 1.3 **Enrollment System**
- ✅ Database schema: `enrollments` table with `user_id`, `class_id`, `subject_id`, `enrollment_type`
- ✅ Enrollment types: Class-wise, Subject-wise
- **To-Do:**
  - Frontend enrollment workflow (select class → select board → select subject(s) → confirm enrollment)
  - Bulk subject enrollment
  - Enrollment history and management page
  - Unenroll functionality

### 1.4 **Fee Calculation & Transparency**
- ✅ Database schema: `fees` table with fee types (Class-wise, Subject-wise, Group, Individual)
- Backend controllers: `feeController.js` with fee calculation logic
- **To-Do:**
  - Frontend Fee Calculator component (already exists)
  - Real-time fee display based on selections (class, subject, type)
  - Pricing tiers for group vs. individual classes
  - Discount/promo code support
  - Installment options UI

### 1.5 **Assessment Engine (Tests)**
- ✅ Database schema: `tests` table with `test_type` (Weekly, Monthly, Unit, Mock)
- ✅ Database schema: `results` table for storing marks and scores
- Backend controllers: `testController.js`, `resultController.js`
- **To-Do:**
  - Frontend: Test list page (upcoming, past, practice)
  - Take test UI (timer, question navigation, submit functionality)
  - Result dashboard showing:
    - Marks obtained vs. total
    - Percentage and grade
    - Subject-wise performance charts
    - Comparison with class average
  - Analytics: Test history, trends, weak areas

### 1.6 **Results & Performance Tracking**
- ✅ Backend: `/api/results` endpoints for fetching user results
- ✅ Database: `results` table linking user, test, marks, percentage
- **To-Do:**
  - Results page with detailed performance breakdown
  - Performance charts (Recharts already integrated)
  - Export results as PDF/Excel
  - Weak subject identification
  - Personalized recommendations based on performance

### 1.7 **Parent/Guardian Progress Tracking**
- **To-Do:**
  - Parent account type in `users` table (role: 'parent')
  - Link parent to student(s)
  - Parent dashboard showing:
    - Child's enrolled classes/subjects
    - Test scores and performance trends
    - Attendance/engagement metrics
    - Tutor feedback
  - Parent notifications (test results, payment status)

### 1.8 **Admin Dashboard**
- **To-Do:**
  - Admin account type (role: 'admin')
  - Admin pages:
    - User management (view, edit, delete students/tutors/parents)
    - Class and subject management
    - Fee configuration
    - Test management (create, publish, view results)
    - Analytics: platform-wide performance, revenue, user stats
    - Reports: enrollment trends, revenue, test pass rates

### 1.9 **Tutor/Educator Dashboard**
- **To-Do:**
  - Tutor account type (role: 'tutor')
  - Tutor pages:
    - My classes (students enrolled in tutor's classes)
    - Create and manage tests/assignments
    - View student performance
    - Provide feedback/comments on results
    - Schedule and manage sessions
    - Earnings/payment tracking

### 1.10 **Payments & Billing**
- ✅ Database schema: `payments` table
- Backend controllers: `paymentController.js`
- **To-Do:**
  - Payment gateway integration (Stripe, Razorpay, PayPal)
  - Invoice generation
  - Payment history and receipts
  - Refund management
  - Subscription/recurring billing

### 1.11 **Notifications & Communication**
- **To-Do:**
  - Email notifications:
    - Registration confirmation
    - Test announcement
    - Result notification
    - Payment receipt
  - In-app notifications (bell icon already in Header)
  - SMS notifications (optional: Twilio integration)
  - Push notifications (PWA or FCM)

### 1.12 **Reports & Analytics**
- Backend: Aggregate queries for dashboards
- **To-Do:**
  - Student performance: trend charts, weak areas, improvement areas
  - Admin reports: enrollment by class/board, revenue, user growth
  - Tutor reports: student progress, class performance
  - Export capability (CSV, PDF)

---

## 2. Database Schema Summary

```sql
-- Users (Authentication & Core Identity)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student','parent','tutor','admin') DEFAULT 'student',
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  country VARCHAR(50),
  profile_picture_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes (1st-12th, Board-wise)
CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(20) NOT NULL,
  board ENUM('CBSE','ICSE','STATE') NOT NULL,
  description TEXT
);

-- Subjects (Subject Catalog)
CREATE TABLE subjects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_id INT NOT NULL,
  subject_name VARCHAR(100) NOT NULL,
  description TEXT,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Enrollments (Track student class/subject enrollment)
CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  subject_id INT,
  enrollment_type ENUM('Class','Subject') NOT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Fees (Pricing & Fee Structure)
CREATE TABLE fees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_id INT NOT NULL,
  subject_id INT,
  fee_type ENUM('Class-wise','Subject-wise','Group','Individual') NOT NULL,
  fee_amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Tests (Assessment Content)
CREATE TABLE tests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subject_id INT NOT NULL,
  test_name VARCHAR(100) NOT NULL,
  test_type ENUM('Weekly','Monthly','Unit','Mock') NOT NULL,
  total_marks INT NOT NULL,
  duration_minutes INT,
  created_by INT,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Results (Test Performance Data)
CREATE TABLE results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  test_id INT NOT NULL,
  marks_obtained INT NOT NULL,
  percentage DECIMAL(5,2),
  status ENUM('Pending','Completed','Failed') DEFAULT 'Pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- Payments (Transaction Tracking)
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  enrollment_id INT NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_status ENUM('Pending','Completed','Failed','Refunded') DEFAULT 'Pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE
);

-- Parent-Student Link (Join Table)
CREATE TABLE parent_student_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT NOT NULL,
  student_id INT NOT NULL,
  relationship VARCHAR(50),
  FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_parent_student (parent_id, student_id)
);

-- Notifications (Log & Track)
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  is_read TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 3. Frontend Pages & Components Checklist

### Pages (in `src/pages/`)
- [x] Login.jsx – Authentication
- [x] Register.jsx – User signup
- [x] Dashboard.jsx – Student home (welcome, stats, charts)
- [x] Profile.jsx – User profile (name, email, class, subjects)
- [ ] **Subjects.jsx** – Select class/board → View subjects → Enroll  *(Enhance)*
- [ ] **Tests.jsx** – Upcoming/past tests, take test UI  *(Enhance)*
- [ ] **Results.jsx** – View test results, performance charts  *(Enhance)*
- [ ] **Enrollment.jsx** – Manage enrollments (new/unenroll)  *(New)*
- [ ] **Payment.jsx** – Fee calculation, payment gateway  *(New)*
- [ ] **AdminDashboard.jsx** – Admin panel with stats/management  *(New)*
- [ ] **AdminUsers.jsx** – Manage users (CRUD)  *(New)*
- [ ] **AdminFees.jsx** – Configure fee structure  *(New)*
- [ ] **TutorDashboard.jsx** – Tutor interface  *(New)*
- [ ] **ParentDashboard.jsx** – Parent tracking of child progress  *(New)*
- [x] Home.jsx – Landing page
- [x] Settings.jsx – Placeholder
- [x] Messages.jsx – Placeholder
- [x] Profile.jsx – User profile

### Components (in `src/components/`)
- [x] Header.jsx – Top navbar with user profile, notifications, theme toggle
- [x] Sidebar.jsx – Navigation sidebar
- [x] ProtectedRoute.jsx – Route protection by role
- [ ] **ClassSelector.jsx** – Select class and board  *(Already exists – enhance)*
- [ ] **SubjectSelector.jsx** – Multi-select subjects from class  *(New)*
- [ ] **FeeCalculator.jsx** – Calculate fees based on selections  *(Already exists – integrate)*
- [ ] **EnrollmentForm.jsx** – Step-by-step enrollment wizard  *(New)*
- [ ] **PaymentGateway.jsx** – Payment UI (Stripe/Razorpay)  *(New)*
- [ ] **TestCard.jsx** – Display test details, "Take Test" button  *(New)*
- [ ] **TestTaker.jsx** – Quiz interface with timer, navigation  *(New)*
- [ ] **ResultCard.jsx** – Display individual test result  *(New)*
- [ ] **PerformanceChart.jsx** – Custom chart for performance trends  *(New)*
- [ ] **NotificationDropdown.jsx** – Show real notifications  *(New)*
- [ ] **AdminLayout.jsx** – Admin-specific layout with extra sidebar  *(New)*
- [ ] **FeedbackForm.jsx** – Tutor feedback on results  *(New)*

### Contexts (in `src/context/`)
- [x] AuthContext.jsx – User authentication
- [x] ThemeContext.jsx – Dark/light mode
- [x] LayoutContext.jsx – Sidebar toggle
- [x] TestContext.jsx – Test data (if needed)
- [ ] **EnrollmentContext.jsx** – Selected class/subjects state  *(New)*
- [ ] **NotificationContext.jsx** – Global notifications  *(New)*

---

## 4. Backend Endpoints Summary

### Authentication (`/api/auth`)
- [x] `POST /auth/register` – Register new user
- [x] `POST /auth/login` – Login & get JWT token
- [x] `GET /auth/me` – Get current user (protected)
- [ ] `POST /auth/logout` – Logout *(Optional, token expiry handles it)*
- [ ] `POST /auth/forgot-password` – Password reset request
- [ ] `POST /auth/reset-password` – Reset with token

### Classes & Subjects (`/api/classes`, `/api/subjects`)
- [ ] `GET /classes` – List all classes
- [ ] `GET /classes/:classId/subjects` – Get subjects by class
- [ ] `POST /classes` – Create class (admin only)
- [ ] `POST /subjects` – Add subject (admin only)

### Enrollments (`/api/enrollments`)
- [ ] `POST /enrollments` – Enroll in class/subject (protected)
- [ ] `GET /enrollments/my` – Get current user's enrollments (protected)
- [ ] `GET /enrollments/student/:studentId` – Get student's enrollments (parent/tutor/admin)
- [ ] `DELETE /enrollments/:id` – Unenroll (protected)

### Fees (`/api/fees`)
- [ ] `GET /fees/calculate` – Calculate fee based on selections (query params: classId, subjectId, type)
- [ ] `GET /fees` – List fee structures (admin only)
- [ ] `POST /fees` – Create fee (admin only)

### Tests (`/api/tests`)
- [ ] `GET /tests` – List all tests (filtered by subject/enrolled classes)
- [ ] `GET /tests/:id` – Get test details
- [ ] `POST /tests` – Create test (admin/tutor only)
- [ ] `PUT /tests/:id` – Update test (admin/tutor only)
- [ ] `DELETE /tests/:id` – Delete test (admin/tutor only)

### Results (`/api/results`)
- [ ] `POST /results` – Submit test result (protected)
- [ ] `GET /results/my` – Get current user's results (protected)
- [ ] `GET /results/student/:studentId` – Get student's results (parent/tutor/admin)
- [ ] `GET /results/test/:testId` – Get all results for a test (admin/tutor)

### Payments (`/api/payments`)
- [ ] `POST /payments` – Record payment (protected, integrate gateway)
- [ ] `GET /payments/my` – Get user's payment history (protected)
- [ ] `GET /payments` – List all payments (admin only)

### Users (`/api/users`)
- [ ] `GET /users` – List all users (admin only, with filters)
- [ ] `PUT /users/:id` – Update user (self + admin)
- [ ] `DELETE /users/:id` – Delete user (admin only)
- [ ] `GET /users/:id/students` – Get parent's children (parent only)

### Notifications (`/api/notifications`)
- [ ] `GET /notifications` – Get user's notifications (protected)
- [ ] `PUT /notifications/:id` – Mark notification as read
- [ ] `POST /notifications` – Send notification (admin/tutor only)

---

## 5. Implementation Priority & Phases

### **Phase 1: MVP (Core Functionality)**
**Weeks 1–2:**
- End-to-end authentication (register, login, profile) ✅ *Done*
- Class/board/subject selection workflow
- Basic admin dashboard (view users, fees, tests)
- Test list and basic result submission
- Enrollment management

**Deliverable:** Students can register, select class/subject, view tests, submit results.

### **Phase 2: Enhanced Learning & Tracking**
**Weeks 3–4:**
- Performance dashboard with charts and trends
- Detailed results page with analytics
- Fee calculator and payment integration (Razorpay/Stripe)
- Notifications system (bell icon → real notifications)
- History and reports

**Deliverable:** Students can track progress; parents can monitor child's performance.

### **Phase 3: Admin & Tutor Roles**
**Weeks 5–6:**
- Admin dashboard (full CRUD for users, classes, fees, tests)
- Tutor interface (create tests, view class performance, give feedback)
- Role-based access control (RBAC) enforcement
- Email notifications for key events

**Deliverable:** Admins manage platform; tutors manage content and feedback.

### **Phase 4: Advanced Features & Optimization**
**Weeks 7–8:**
- Parent accounts and student-parent linking
- Advanced analytics (weakness detection, recommendations)
- Bulk operations (import students, create tests from templates)
- Performance optimization and caching
- Mobile responsiveness refinement

**Deliverable:** Scalable, feature-rich platform ready for launch.

---

## 6. Key Technical Decisions

1. **Authentication:** JWT with 1-day expiry (refresh token optional)
2. **Database:** MySQL 8.0 with proper indexing on foreign keys
3. **Frontend:** React 19 + Vite + Tailwind CSS + Framer Motion
4. **Backend:** Express.js + bcryptjs for password hashing
5. **State Management:** React Context API (no Redux for simplicity)
6. **Charts:** Recharts for performance visualization
7. **Payment:** Razorpay integration (popular in India)
8. **Hosting:** (TBD) Vercel (frontend) + Heroku/AWS (backend)

---

## 7. Immediate Next Steps

1. **Start backend:** Ensure `.env` is set correctly; run `npm start` in `backend/`
2. **Test login flow:** Register a user, log in, confirm token in localStorage
3. **Build enrollment workflow:** Create EnrollmentForm component with class → subject selection
4. **Implement fee calculation:** Connect FeeCalculator to actual fees data from backend
5. **Create admin dashboard:** Admin can view users, manage classes, configure fees
6. **Set up test taking:** Build test submission UI and result recording
7. **Integrate payment gateway:** Add Razorpay/Stripe for enrollment payment
8. **Deploy MVP:** Get basic platform live for testing

---

## 8. Success Metrics

- ✅ User can register, log in, and see personalized data
- ✅ Student can enroll in class/subject and view fees
- ✅ Student can attempt tests and view results
- ✅ Admin can manage platform content
- ✅ Parent can track child's progress
- ✅ System handles 100+ concurrent users
- ✅ Platform is mobile-responsive

---

**Document Last Updated:** Feb 23, 2026  
**Status:** Planning & Implementation  
**Next Review:** After Phase 1 completion
