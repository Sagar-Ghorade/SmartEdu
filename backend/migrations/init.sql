-- PostgreSQL schema for SmartEdu
-- Enum types
CREATE TYPE user_role AS ENUM ('student','parent','tutor','admin');
CREATE TYPE board_type AS ENUM ('CBSE','ICSE','STATE');
CREATE TYPE enrollment_type AS ENUM ('Class','Subject');
CREATE TYPE fee_type AS ENUM ('Class-wise','Subject-wise','Group','Individual');
CREATE TYPE test_type AS ENUM ('Weekly','Monthly','Unit','Mock');
CREATE TYPE result_status AS ENUM ('Pending','Completed','Failed');
CREATE TYPE payment_status AS ENUM ('Pending','Completed','Failed','Refunded');

-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'student',
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  country VARCHAR(50),
  profile_picture_url VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Classes
CREATE TABLE IF NOT EXISTS classes (
  id BIGSERIAL PRIMARY KEY,
  class_name VARCHAR(20) NOT NULL,
  board board_type NOT NULL,
  description TEXT
);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
  id BIGSERIAL PRIMARY KEY,
  class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
  enrollment_type enrollment_type NOT NULL,
  start_date TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, class_id, subject_id)
);

-- Fees
CREATE TABLE IF NOT EXISTS fees (
  id BIGSERIAL PRIMARY KEY,
  class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
  fee_type fee_type NOT NULL,
  fee_amount NUMERIC(10,2) NOT NULL
);

-- Tests
CREATE TABLE IF NOT EXISTS tests (
  id BIGSERIAL PRIMARY KEY,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  test_name VARCHAR(100) NOT NULL,
  test_type test_type NOT NULL,
  total_marks INT NOT NULL,
  duration_minutes INT,
  created_by BIGINT REFERENCES users(id)
);

-- Results
CREATE TABLE IF NOT EXISTS results (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id BIGINT NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  marks_obtained INT NOT NULL,
  percentage NUMERIC(5,2),
  status result_status DEFAULT 'Pending',
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrollment_id BIGINT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  amount_paid NUMERIC(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'Pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  payment_date TIMESTAMPTZ DEFAULT now()
);

-- Parent-Student Link
CREATE TABLE IF NOT EXISTS parent_student_links (
  id BIGSERIAL PRIMARY KEY,
  parent_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relationship VARCHAR(50),
  UNIQUE (parent_id, student_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Minimal seed data for classes and canonical subjects
INSERT INTO classes (class_name, board, description)
VALUES
  ('1', 'CBSE', 'Class 1 CBSE'),
  ('2', 'CBSE', 'Class 2 CBSE')
ON CONFLICT DO NOTHING;
