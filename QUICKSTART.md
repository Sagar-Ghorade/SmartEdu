# SmartEdu Quick Start Guide

## ✅ Current Status

### What's Ready
- ✅ **Backend:** Running on `http://localhost:5000` with MySQL connected
- ✅ **Frontend:** Ready at `http://localhost:5174` (run `npm run dev` in frontend folder)
- ✅ **Database:** `smartedu` with 8 tables (users, classes, subjects, tests, fees, enrollments, results, payments)
- ✅ **Authentication:** JWT-based login/register working
- ✅ **UI Components:** Header, Sidebar, Dashboard, Profile, Tests, Results, Subjects pages
- ✅ **Real User Data:** Profile and Dashboard now display logged-in user's name (not "John Doe")

### What's NOT Yet Implemented
- ⭕ Payment gateway integration (Razorpay/Stripe)
- ⭕ Admin & Tutor dashboards
- ⭕ Parent account linking
- ⭕ Advanced test-taking UI (timer, questions)
- ⭕ Email notifications
- ⭕ Performance analytics (advanced charts)

---

## 🚀 Immediate Setup Steps

### Step 1: Start Backend (if not already running)
```bash
cd c:\Users\HP\SmartEdu\backend
npm install    # First time only
npm start
```
**Expected Output:**
```
✅ Server running on port 5000
✅ MySQL Connected Successfully
```

### Step 2: Start Frontend
Open a new terminal:
```bash
cd c:\Users\HP\SmartEdu\frontend
npm run dev
```
**Expected Output:**
```
  VITE v7... ready in ... ms
  Local: http://localhost:5174
```

### Step 3: Test the Application
1. Open browser: http://localhost:5174
2. Try **Register** with new account (e.g., `alice@example.com`, password `secret`)
3. **Login** with registered credentials
4. Verify your **name appears** in:
   - Top-right corner (Header)
   - Dashboard welcome message ("Welcome back, Alice! 👋")
   - Profile page

---

## 🧪 Quick API Tests (curl or Postman)

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}'
```

### Login & Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```
**Response:** (copy the `token` value)
```json
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Alice",
    "email": "alice@example.com",
    "role": "student"
  }
}
```

### Get Current User (Protected Route)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/auth/me
```

### Get Classes
```bash
curl http://localhost:5000/api/classes
```

### Get Subjects by Class (e.g., class_id=1)
```bash
curl http://localhost:5000/api/subjects?classId=1
```

### Create Enrollment
```bash
curl -X POST http://localhost:5000/api/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"class_id": 1, "subject_id": 1}'
```

---

## 📋 Database Sample Data (Already Inserted)

### Classes
| ID | Class Name | Board |
|----|-----------|-------|
| 1  | 1st       | CBSE  |
| 2  | 10th      | CBSE  |
| 3  | 12th      | STATE |

### Subjects
| ID | Class ID | Subject Name |
|----|----------|--------------|
| 1  | 1        | Maths        |
| 2  | 1        | English      |
| 3  | 2        | Science      |
| 4  | 3        | Physics      |

### Tests
| ID | Subject ID | Test Type | Total Marks |
|----|-----------|-----------|-------------|
| 1  | 1         | Weekly    | 50          |
| 2  | 3         | Mock      | 100         |

### Fees
| ID | Class ID | Subject ID | Fee Type      | Fee Amount |
|----|----------|-----------|---------------|------------|
| 1  | 1        | NULL      | Class-wise    | 2000.00    |
| 2  | 2        | 3         | Subject-wise  | 1500.00    |

---

## 🎯 Key Frontend Changes Made

### Fixed Issues
- ✅ "John Doe" hard-coded names replaced with real user data from `AuthContext`
- ✅ Dark-mode Tailwind classes fixed (used valid gray variants)
- ✅ React icon import errors resolved
- ✅ Profile and Dashboard now show logged-in user's name
- ✅ Header profile dropdown uses real user email and role

### Modified Files
- **[Header.jsx](src/components/Header.jsx)** – Uses `useAuth()` to display user name, email, role
- **[Dashboard.jsx](src/pages/Dashboard.jsx)** – Welcome message shows user name
- **[Profile.jsx](src/pages/Profile.jsx)** – Profile displays real user data with initials
- **[AuthContext.jsx](src/context/AuthContext.jsx)** – Calls `GET /api/auth/me` on app load to fetch user
- **[api.js](src/services/api.js)** – Axios interceptor adds Bearer token and handles 401 (token expiry)

---

## 🛠️ Next Immediate Tasks (Priority Order)

### 1. **Enrollment Workflow** (High Priority)
- Create `EnrollmentForm.jsx` component with:
  - Step 1: Select Class
  - Step 2: Select Board (CBSE/ICSE/STATE) – shows only matching classes
  - Step 3: Select Subjects (multi-select from selected class)
  - Step 4: Display fee & confirm enrollment
- Call `POST /api/enrollments` to submit
- **File to edit:** `src/pages/Subjects.jsx` or create new `src/pages/Enrollment.jsx`

### 2. **Test Submission UI** (Medium Priority)
- Create `TestTaker.jsx` component:
  - Display test questions
  - Track answers
  - Show timer
  - Submit interface
- Call `POST /api/results` to save score
- **Files to create:**
  - `src/components/TestTaker.jsx`
  - Update `src/pages/Tests.jsx` to render test list + test taker UI

### 3. **Admin Dashboard** (Medium Priority)
- Create `src/pages/AdminDashboard.jsx`
- Admin can:
  - View all users (students/tutors/parents)
  - Manage classes and subjects
  - Configure fee structure
  - View test results aggregated
- Protect route with `<ProtectedRoute requiredRole="admin">`

### 4. **Results Page Enhancement** (Medium Priority)
- Enhance `src/pages/Results.jsx`:
  - List user's test results with scores
  - Show trend charts (performance over time)
  - Subject-wise breakdown
  - Compare with class average (mock data for now)

### 5. **Payment Integration** (Lower Priority)
- Integrate Razorpay or Stripe
- Create payment form after enrollment
- Record payment in `payments` table
- Send confirmation email (future)

---

## 🔐 Security Note

**Never commit `.env` to git!** Current `.env` has:
```
DB_PASSWORD=student
JWT_SECRET=smartedu_super_secret_key
```
Change these for production:
```bash
# Generate a strong JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📚 Documentation Links

- **[Full Implementation Plan](SMARTEDU_IMPLEMENTATION_PLAN.md)** – Complete roadmap with all features
- **Backend Routes:** See `backend/routes/*.js`
- **Frontend Components:** See `frontend/src/components` and `frontend/src/pages`
- **Context API:** See `frontend/src/context`

---

## 💬 Support & Debugging

### If Backend Won't Start
1. Check MySQL is running: `mysql -u root -p`
2. Verify `.env` has correct DB credentials
3. Check if port 5000 is in use: `netstat -ano | findstr 5000`
4. Kill and restart: Check Terminal and close any existing `npm start` process

### If Login Returns 404
1. Confirm backend is running (check `http://localhost:5000/`)
2. Check browser DevTools → Network tab → see request to `/api/auth/login`
3. If CORS error, confirm CORS is enabled in `backend/server.js`

### If User Name Still Shows "John Doe"
1. Check `localStorage.getItem('token')` in browser console
2. Ensure token is set after login
3. Refresh page (gives `AuthContext` time to fetch `/auth/me`)
4. Check `GET /api/auth/me` returns real user data (test with curl above)

---

## 🎉 Success Checklist

- [ ] Backend running on port 5000 ✅
- [ ] MySQL connected ✅
- [ ] Can register new user
- [ ] Can login with registered credentials
- [ ] Dashboard shows your name (not "John Doe")
- [ ] Profile page shows your email
- [ ] Header shows your initials in avatar
- [ ] Can view classes and subjects
- [ ] Can enroll in a subject (once enrollment form is built)
- [ ] Can view tests
- [ ] Can submit and view test results (once tests UI is built)

---

**Last Updated:** Feb 23, 2026  
**Status:** MVP Phase – Ready for Phase 2 Development  
**Next:** Build enrollment workflow + test submission UI
