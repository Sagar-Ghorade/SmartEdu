# SmartEdu Backend API Integration Guide

Complete reference for all API endpoints needed to build the frontend features.

---

## 📡 API Base URL

```
Production: https://smartedu.example.com/api
Development: http://localhost:5000/api
```

All examples use development URL.

---

## 🔐 Authentication

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Sagar Pandey",
  "email": "sagar@example.com",
  "password": "password123",
  "role": "student"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Sagar Pandey",
    "email": "sagar@example.com",
    "role": "student"
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "sagar@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Sagar Pandey",
    "email": "sagar@example.com",
    "role": "student"
  }
}
```

### Me (Get Current User)
```bash
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Sagar Pandey",
    "email": "sagar@example.com",
    "role": "student"
  }
}
```

### Logout
```bash
POST /api/auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📚 Classes - School Lifecycle

### Get All Classes (1st-12th)
```bash
GET /api/classes
# Returns all 36 classes (1-12 × 3 boards)

Response: 200 OK
{
  "success": true,
  "classes": [
    {
      "id": 1,
      "class_name": "1st",
      "board": "CBSE",
      "grade_level": "Primary"
    },
    {
      "id": 2,
      "class_name": "1st",
      "board": "ICSE",
      "grade_level": "Primary"
    },
    ...
    {
      "id": 36,
      "class_name": "12th",
      "board": "STATE",
      "grade_level": "Higher Secondary"
    }
  ]
}
```

### Get Class by ID
```bash
GET /api/classes/{id}

Response: 200 OK
{
  "success": true,
  "class": {
    "id": 5,
    "class_name": "1st",
    "board": "STATE",
    "grade_level": "Primary"
  }
}
```

### Filter Classes by Board
```bash
GET /api/classes?board=CBSE
# Returns only CBSE classes (1-12)

Response: 200 OK
{
  "success": true,
  "classes": [
    {"id": 1, "class_name": "1st", "board": "CBSE", "grade_level": "Primary"},
    {"id": 7, "class_name": "2nd", "board": "CBSE", "grade_level": "Primary"},
    ...
  ]
}
```

---

## 📖 Subjects - Board-Aligned Curriculum

### Get All Subjects
```bash
GET /api/subjects
# Returns all 150+ subjects

Response: 200 OK
{
  "success": true,
  "subjects": [
    {
      "id": 1,
      "subject_name": "English",
      "class_id": 1,
      "board": "CBSE",
      "description": "English Language & Literature"
    },
    ...
  ]
}
```

### Get Subjects for a Class (Board-Aligned)
```bash
GET /api/subjects?classId=1
# Returns subjects for 1st Standard from selected board

Response: 200 OK
{
  "success": true,
  "subjects": [
    {
      "id": 1,
      "subject_name": "English",
      "class_id": 1,
      "board": "CBSE",
      "description": "English Language & Literature"
    },
    {
      "id": 2,
      "subject_name": "Maths",
      "class_id": 1,
      "board": "CBSE",
      "description": "Arithmetic & Basic Concepts"
    },
    {
      "id": 3,
      "subject_name": "Science",
      "class_id": 1,
      "board": "CBSE",
      "description": "General Science"
    },
    {
      "id": 4,
      "subject_name": "Social Studies",
      "class_id": 1,
      "board": "CBSE",
      "description": "Geography, History & Civics"
    }
  ]
}
```

### Note: CBSE vs ICSE vs STATE Differences

**Same class, different boards = different subjects!**

Example: 6th Standard
```
CBSE 6th:  English, Maths, Science, Hindi, Social Science
ICSE 6th:  English, Mathematics, Science, Hindi, History & Geography
STATE 6th: English, Maths, Science, Hindi, Social Studies
```

Frontend must request subjects by class_id and backend returns board-specific entries.

---

## 🎓 Enrollments - Track Student Progress

### Get My Enrollments
```bash
GET /api/enrollments/my
Authorization: Bearer <token>
# Returns all classes/subjects current user is enrolled in

Response: 200 OK
{
  "success": true,
  "enrollments": [
    {
      "id": 1,
      "user_id": 1,
      "class_id": 1,
      "subject_id": 1,
      "enrollment_type": "Subject",
      "enrolled_at": "2025-02-24T10:30:00Z",
      "class_name": "1st CBSE",
      "subject_name": "English"
    },
    {
      "id": 2,
      "user_id": 1,
      "class_id": 1,
      "subject_id": 2,
      "enrollment_type": "Subject",
      "enrolled_at": "2025-02-24T10:31:00Z",
      "class_name": "1st CBSE",
      "subject_name": "Maths"
    }
  ]
}
```

### Enroll in Subject
```bash
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "class_id": 1,
  "subject_id": 2,
  "enrollment_type": "Subject"  # or "Class" for full class enrollment
}

Response: 201 Created
{
  "success": true,
  "enrollment": {
    "id": 3,
    "user_id": 1,
    "class_id": 1,
    "subject_id": 2,
    "enrollment_type": "Subject",
    "enrolled_at": "2025-02-24T10:32:00Z"
  }
}
```

### Check Enrollment Status
```bash
GET /api/enrollments/check?classId=1&subjectId=2
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "enrolled": true,
  "enrollment_date": "2025-02-24T10:30:00Z"
}
```

### Delete Enrollment (Unenroll)
```bash
DELETE /api/enrollments/{enrollmentId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Enrollment deleted successfully"
}
```

---

## 💰 Fees - Transparent Pricing

### Get Fee for Class/Subject
```bash
GET /api/fees?classId=1&subjectId=1
# Returns applicable fees

Response: 200 OK
{
  "success": true,
  "fees": [
    {
      "id": 1,
      "class_id": 1,
      "subject_id": 1,
      "fee_type": "Subject-wise",
      "fee_amount": 1000,
      "currency": "INR",
      "description": "1st Standard Maths"
    },
    {
      "id": 2,
      "class_id": 1,
      "subject_id": null,
      "fee_type": "Class-wise",
      "fee_amount": 1500,
      "currency": "INR",
      "description": "1st Standard Full Class"
    }
  ]
}
```

### Fee Structure Example
```
Class 1-5: ₹1,500 per class
Class 6-8: ₹3,000 per class + ₹1,000 per subject
Class 9-10: ₹4,000 per class + ₹1,500 per subject
Class 11-12: ₹5,000 per class + ₹2,000 per subject
            (Group: ₹4,500, Individual: ₹2,500)
```

### Calculate Total Enrollment Cost
```javascript
// Frontend logic:
const enrollmentCost = Math.min(
  classFee,                    // Option 1: Pay for full class
  subjectFee * selectedSubjects.length  // Option 2: Pay per subject
);
// Show cheaper option to user
```

---

## 🧪 Tests - Assessment Ecosystem

### Get All Tests
```bash
GET /api/tests
# Returns all available tests (Weekly, Monthly, Unit, Mock)

Response: 200 OK
{
  "success": true,
  "tests": [
    {
      "id": 1,
      "test_name": "Weekly Test - Week 1",
      "class_id": 1,
      "test_type": "Weekly",
      "total_marks": 40,
      "duration_minutes": 30,
      "created_at": "2025-02-24T10:00:00Z"
    },
    {
      "id": 2,
      "test_name": "Monthly Assessment - February",
      "class_id": 1,
      "test_type": "Monthly",
      "total_marks": 100,
      "duration_minutes": 90,
      "created_at": "2025-02-24T10:00:00Z"
    }
  ]
}
```

### Get Tests for a Class
```bash
GET /api/tests?classId=10
# Returns all tests for Class 10

Response: 200 OK
{
  "success": true,
  "tests": [
    {
      "id": 45,
      "test_name": "Unit Test 1 - Ch 1-3",
      "class_id": 10,
      "test_type": "Unit",
      "total_marks": 50,
      "duration_minutes": 45,
      "question_count": 20
    },
    {
      "id": 46,
      "test_name": "Weekly Assessment",
      "class_id": 10,
      "test_type": "Weekly",
      "total_marks": 40,
      "duration_minutes": 30,
      "question_count": 15
    },
    {
      "id": 47,
      "test_name": "Mock Board Exam",
      "class_id": 10,
      "test_type": "Mock",
      "total_marks": 100,
      "duration_minutes": 180,
      "question_count": 40
    }
  ]
}
```

### Get Test Details with Questions
```bash
GET /api/tests/{testId}
# Returns test with full question list

Response: 200 OK
{
  "success": true,
  "test": {
    "id": 1,
    "test_name": "Weekly Test - Week 1",
    "class_id": 1,
    "test_type": "Weekly",
    "total_marks": 40,
    "duration_minutes": 30,
    "questions": [
      {
        "id": 1,
        "question_text": "What is 2 + 2?",
        "question_type": "MCQ",
        "marks": 2,
        "options": [
          {"id": 1, "text": "3"},
          {"id": 2, "text": "4"},
          {"id": 3, "text": "5"},
          {"id": 4, "text": "6"}
        ]
      },
      ...
    ]
  }
}
```

---

## 📊 Results - Score Tracking & Analytics

### Submit Test (Save Answers & Calculate Score)
```bash
POST /api/results
Authorization: Bearer <token>
Content-Type: application/json

{
  "test_id": 1,
  "answers": [
    {"question_id": 1, "selected_option_id": 2, "marks_obtained": 2},
    {"question_id": 2, "selected_option_id": 1, "marks_obtained": 0},
    {"question_id": 3, "selected_option_id": 3, "marks_obtained": 2}
  ],
  "time_taken_minutes": 28
}

Response: 201 Created
{
  "success": true,
  "result": {
    "id": 1,
    "user_id": 1,
    "test_id": 1,
    "marks_obtained": 28,
    "total_marks": 40,
    "percentage": 70,
    "grade": "B",
    "attempted_questions": 20,
    "correct_answers": 14,
    "submitted_at": "2025-02-24T10:28:00Z"
  }
}
```

### Get My Test Results
```bash
GET /api/results/my
Authorization: Bearer <token>
# Returns all test results for logged-in user

Response: 200 OK
{
  "success": true,
  "results": [
    {
      "id": 1,
      "test_id": 1,
      "test_name": "Weekly Test - Week 1",
      "class_id": 1,
      "marks_obtained": 28,
      "total_marks": 40,
      "percentage": 70,
      "grade": "B",
      "submitted_at": "2025-02-24T10:28:00Z",
      "improvement": "↑ +5 from last week"
    },
    {
      "id": 2,
      "test_id": 2,
      "test_name": "Monthly Assessment - February",
      "class_id": 1,
      "marks_obtained": 78,
      "total_marks": 100,
      "percentage": 78,
      "grade": "A",
      "submitted_at": "2025-02-24T11:15:00Z",
      "improvement": "↑ +8 from last month"
    }
  ]
}
```

### Get Class Average (Rankings)
```bash
GET /api/results/class/{classId}/average
# Allows comparison with peers

Response: 200 OK
{
  "success": true,
  "class_stats": {
    "test_id": 2,
    "class_average": 65,
    "highest_score": 95,
    "lowest_score": 35,
    "median": 68,
    "your_score": 78,
    "your_rank": 3,
    "total_students": 45
  }
}
```

### Get Performance Analytics
```bash
GET /api/results/analytics
Authorization: Bearer <token>
# Returns trends and weak areas

Response: 200 OK
{
  "success": true,
  "analytics": {
    "overall_percentage": 72,
    "trend": "Improving",
    "total_tests_taken": 12,
    "average_marks": 72,
    "weak_subjects": [
      {"subject": "Science", "average": 65, "recommendation": "Focus on Chemistry"},
      {"subject": "Social Studies", "average": 68, "recommendation": "Study more history dates"}
    ],
    "strong_subjects": [
      {"subject": "English", "average": 82},
      {"subject": "Maths", "average": 78}
    ],
    "last_30_days": [
      {"date": "2025-02-18", "marks": 70, "test": "Weekly Test 1"},
      {"date": "2025-02-20", "marks": 74, "test": "Weekly Test 2"},
      {"date": "2025-02-24", "marks": 78, "test": "Monthly Test"}
    ],
    "recommendations": [
      "Keep up the improvement in Maths!",
      "Chemistry needs more practice - try 5 more problems daily",
      "You're in top 10% for English"
    ]
  }
}
```

---

## 💳 Payments - Enrollment Fees

### Create Payment Intent
```bash
POST /api/payments/intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "enrollment_id": 1,
  "amount": 1000,
  "currency": "INR",
  "payment_method": "razorpay"  # or "stripe"
}

Response: 201 Created
{
  "success": true,
  "payment_intent": {
    "id": "payment_1",
    "razorpay_order_id": "order_123456",
    "amount": 1000,
    "currency": "INR",
    "status": "created"
  }
}
```

### Verify Payment
```bash
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "payment_intent_id": "payment_1",
  "razorpay_payment_id": "pay_123456",
  "razorpay_signature": "signature_value"
}

Response: 200 OK
{
  "success": true,
  "payment": {
    "id": 1,
    "enrollment_id": 1,
    "amount": 1000,
    "status": "completed",
    "transaction_id": "pay_123456",
    "verified_at": "2025-02-24T10:35:00Z"
  }
}
```

### Get Payment History
```bash
GET /api/payments/my
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "payments": [
    {
      "id": 1,
      "enrollment": {
        "class_name": "1st CBSE",
        "subject_name": "Maths"
      },
      "amount": 1000,
      "status": "completed",
      "paid_on": "2025-02-24T10:35:00Z",
      "reference_id": "pay_123456"
    }
  ]
}
```

---

## 👨‍👩‍👧‍👦 Parent Features (Phase 2)

### Link Child Account
```bash
POST /api/parents/link-student
Authorization: Bearer <token>
Content-Type: application/json

{
  "child_email": "child@example.com",
  "link_code": "ABC123"  # Code sent to child's email
}

Response: 201 Created
{
  "success": true,
  "link": {
    "parent_id": 1,
    "student_id": 2,
    "linked_at": "2025-02-24T10:40:00Z"
  }
}
```

### Get Child's Progress
```bash
GET /api/parents/children/{childId}/progress
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "child": {
    "name": "Arjun Pandey",
    "class": "10th CBSE",
    "enrollments": [...],
    "recent_results": [...],
    "performance_summary": {
      "overall_percentage": 78,
      "trend": "Improving",
      "next_exam": "Unit Test 2",
      "weak_areas": ["Chemistry", "Social Studies"]
    }
  }
}
```

---

## 🛡️ Error Handling

### Common Error Responses

```json
// 400 Bad Request
{
  "success": false,
  "error": "Missing required fields: classId, subjectId"
}

// 401 Unauthorized
{
  "success": false,
  "error": "Please log in first"
}

// 403 Forbidden
{
  "success": false,
  "error": "Only admins can access this endpoint"
}

// 404 Not Found
{
  "success": false,
  "error": "Class not found"
}

// 500 Server Error
{
  "success": false,
  "error": "Database error - please try again"
}
```

---

## 🔗 API Integration Checklist

### Phase 1: Core Features
- [ ] Auth: Register, Login, Me, Logout
- [ ] Classes: Get all (with board filter)
- [ ] Subjects: Get by class (board-specific)
- [ ] Enrollments: Get my, Create, Check status
- [ ] Fees: Get applicable fees
- [ ] Tests: Get by class, Get test with questions
- [ ] Results: Submit, Get my results

### Phase 2: Analytics & Parents
- [ ] Results: Get analytics, Get class average
- [ ] Parents: Link child, Get child progress
- [ ] Payments: Create intent, Verify

### Phase 3: Admin/Educator
- [ ] Classes: Create, Update, Delete
- [ ] Subjects: Create, Update, Delete
- [ ] Tests: Create questions, Edit, Delete
- [ ] Fees: Set pricing, Apply discounts
- [ ] Users: List, Edit, Delete

---

## 📱 Frontend Implementation Examples

### Fetch Classes & Subjects
```javascript
// In Subjects.jsx component
useEffect(() => {
  // Get all classes
  API.get("/classes").then(res => {
    const classesForBoard = res.data.classes.filter(c => c.board === selectedBoard);
    setClasses(classesForBoard);
  });
}, [selectedBoard]);

useEffect(() => {
  // Get board-specific subjects when class changes
  if (selectedClass) {
    API.get(`/subjects?classId=${selectedClass}`).then(res => {
      setSubjects(res.data.subjects);
    });
  }
}, [selectedClass]);
```

### Enroll in Subject
```javascript
const handleEnroll = async (subjectId) => {
  try {
    const response = await API.post("/enrollments", {
      class_id: selectedClass,
      subject_id: subjectId,
      enrollment_type: "Subject"
    });
    // Show success message
    refreshEnrollments();
  } catch (error) {
    console.error("Enrollment failed:", error);
  }
};
```

### Display Test Results
```javascript
useEffect(() => {
  API.get("/results/my").then(res => {
    setResults(res.data.results);
  });
}, []);

// Show performance metrics
const avgPercentage = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;
```

---

**Last Updated:** Feb 24, 2025  
**Version:** 1.0 - Complete Backend API Reference
