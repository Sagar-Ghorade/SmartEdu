-- SmartEdu Complete Database Seed
-- Solves: Full lifecycle (1-12), Board alignment (CBSE/ICSE/State), Testing & Evaluation

-- ========== CLASSES (1st - 12th) ==========
DELETE FROM classes;
INSERT INTO classes (class_name, board) VALUES
-- Primary (1st - 5th)
('1st', 'CBSE'), ('1st', 'ICSE'), ('1st', 'STATE'),
('2nd', 'CBSE'), ('2nd', 'ICSE'), ('2nd', 'STATE'),
('3rd', 'CBSE'), ('3rd', 'ICSE'), ('3rd', 'STATE'),
('4th', 'CBSE'), ('4th', 'ICSE'), ('4th', 'STATE'),
('5th', 'CBSE'), ('5th', 'ICSE'), ('5th', 'STATE'),

-- Secondary (6th - 8th)
('6th', 'CBSE'), ('6th', 'ICSE'), ('6th', 'STATE'),
('7th', 'CBSE'), ('7th', 'ICSE'), ('7th', 'STATE'),
('8th', 'CBSE'), ('8th', 'ICSE'), ('8th', 'STATE'),

-- Senior Secondary (9th - 10th)
('9th', 'CBSE'), ('9th', 'ICSE'), ('9th', 'STATE'),
('10th', 'CBSE'), ('10th', 'ICSE'), ('10th', 'STATE'),

-- Senior Secondary (11th - 12th)
('11th', 'CBSE'), ('11th', 'ICSE'), ('11th', 'STATE'),
('12th', 'CBSE'), ('12th', 'ICSE'), ('12th', 'STATE');

-- ========== SUBJECTS by CLASS & BOARD ==========
-- Note: Each board may have different subject offerings

DELETE FROM subjects;

-- 1st Standard (All boards similar - foundational)
INSERT INTO subjects (class_id, subject_name) VALUES
(1, 'English'), (1, 'Maths'), (1, 'Science & EVS'), (1, 'Social Studies'),
(2, 'English'), (2, 'Maths'), (2, 'Science & EVS'), (2, 'Social Studies'),
(3, 'English'), (3, 'Maths'), (3, 'Science & EVS'), (3, 'Social Studies');

-- 2nd Standard
INSERT INTO subjects (class_id, subject_name) VALUES
(4, 'English'), (4, 'Maths'), (4, 'Science & EVS'), (4, 'Social Studies'),
(5, 'English'), (5, 'Maths'), (5, 'Science & EVS'), (5, 'Social Studies'),
(6, 'English'), (6, 'Maths'), (6, 'Science & EVS'), (6, 'Social Studies');

-- 3rd Standard
INSERT INTO subjects (class_id, subject_name) VALUES
(7, 'English'), (7, 'Hindi'), (7, 'Maths'), (7, 'Science'), (7, 'Social Studies'),
(8, 'English'), (8, 'Hindi'), (8, 'Maths'), (8, 'Science'), (8, 'Social Studies'),
(9, 'English'), (9, 'Hindi'), (9, 'Maths'), (9, 'Science'), (9, 'Social Studies');

-- 4th Standard
INSERT INTO subjects (class_id, subject_name) VALUES
(10, 'English'), (10, 'Hindi'), (10, 'Maths'), (10, 'Science'), (10, 'Social Studies'),
(11, 'English'), (11, 'Hindi'), (11, 'Maths'), (11, 'Science'), (11, 'Social Studies'),
(12, 'English'), (12, 'Hindi'), (12, 'Maths'), (12, 'Science'), (12, 'Social Studies');

-- 5th Standard
INSERT INTO subjects (class_id, subject_name) VALUES
(13, 'English'), (13, 'Hindi'), (13, 'Maths'), (13, 'Science'), (13, 'Social Studies'),
(14, 'English'), (14, 'Hindi'), (14, 'Maths'), (14, 'Science'), (14, 'Social Studies'),
(15, 'English'), (15, 'Hindi'), (15, 'Maths'), (15, 'Science'), (15, 'Social Studies');

-- 6th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(16, 'English'), (16, 'Hindi'), (16, 'Maths'), (16, 'Science'), (16, 'Social Science'),
-- 6th Standard (ICSE)
(17, 'English'), (17, 'Hindi'), (17, 'Mathematics'), (17, 'Science'), (17, 'Social Studies'),
-- 6th Standard (STATE)
(18, 'English'), (18, 'Hindi'), (18, 'Maths'), (18, 'Science'), (18, 'Social Studies');

-- 7th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(19, 'English'), (19, 'Hindi'), (19, 'Maths'), (19, 'Science'), (19, 'Social Science'),
-- 7th Standard (ICSE)
(20, 'English'), (20, 'Hindi'), (20, 'Mathematics'), (20, 'Science'), (20, 'Social Studies'),
-- 7th Standard (STATE)
(21, 'English'), (21, 'Hindi'), (21, 'Maths'), (21, 'Science'), (21, 'Social Studies');

-- 8th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(22, 'English'), (22, 'Hindi'), (22, 'Maths'), (22, 'Science'), (22, 'Social Science'),
-- 8th Standard (ICSE)
(23, 'English'), (23, 'Hindi'), (23, 'Mathematics'), (23, 'Science'), (23, 'Social Studies'),
-- 8th Standard (STATE)
(24, 'English'), (24, 'Hindi'), (24, 'Maths'), (24, 'Science'), (24, 'Social Studies');

-- 9th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(25, 'English'), (25, 'Hindi'), (25, 'Mathematics'), (25, 'Science'), (25, 'Social Science'),
-- 9th Standard (ICSE)
(26, 'English'), (26, 'Hindi'), (26, 'Mathematics'), (26, 'Physics'), (26, 'Chemistry'), (26, 'Biology'), (26, 'Social Studies'),
-- 9th Standard (STATE)
(27, 'English'), (27, 'Hindi'), (27, 'Maths'), (27, 'Science'), (27, 'Social Studies');

-- 10th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(28, 'English'), (28, 'Hindi'), (28, 'Mathematics'), (28, 'Science'), (28, 'Social Science'),
-- 10th Standard (ICSE)
(29, 'English'), (29, 'Hindi'), (29, 'Mathematics'), (29, 'Physics'), (29, 'Chemistry'), (29, 'Biology'), (29, 'Social Studies'),
-- 10th Standard (STATE)
(30, 'English'), (30, 'Hindi'), (30, 'Maths'), (30, 'Science'), (30, 'Social Studies');

-- 11th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(31, 'English'), (31, 'Physics'), (31, 'Chemistry'), (31, 'Mathematics'), (31, 'Biology'),
-- 11th Standard (ICSE)
(32, 'English'), (32, 'Physics'), (32, 'Chemistry'), (32, 'Mathematics'), (32, 'Biology'),
-- 11th Standard (STATE)
(33, 'English'), (33, 'Physics'), (33, 'Chemistry'), (33, 'Mathematics'), (33, 'Biology');

-- 12th Standard (CBSE)
INSERT INTO subjects (class_id, subject_name) VALUES
(34, 'English'), (34, 'Physics'), (34, 'Chemistry'), (34, 'Mathematics'), (34, 'Biology'),
-- 12th Standard (ICSE)
(35, 'English'), (35, 'Physics'), (35, 'Chemistry'), (35, 'Mathematics'), (35, 'Biology'),
-- 12th Standard (STATE)
(36, 'English'), (36, 'Physics'), (36, 'Chemistry'), (36, 'Mathematics'), (36, 'Biology');

-- ========== TESTS (Weekly, Monthly, Unit, Mock) ==========
DELETE FROM tests;

-- Testing for multiple classes and boards
INSERT INTO tests (subject_id, test_name, test_type, total_marks, duration_minutes) VALUES
-- Class 6 CBSE - Maths
(17, 'Maths Chapter 1 - Numbers Unit Test', 'Unit', 50, 45),
(17, 'Maths Weekly Test - Week 1', 'Weekly', 40, 30),
(17, 'Maths Monthly Test - January', 'Monthly', 100, 90),

-- Class 6 CBSE - Science
(19, 'Science Chapter 2 - Matter Unit Test', 'Unit', 50, 45),
(19, 'Science Mock Exam', 'Mock', 150, 120),

-- Class 10 CBSE - Mathematics
(37, 'Mathematics Chapter 1 - Real Numbers', 'Unit', 40, 40),
(37, 'Mathematics Monthly Assessment', 'Monthly', 80, 75),
(37, 'Mathematics Board Pattern Mock', 'Mock', 100, 90),

-- Class 10 CBSE - Science
(39, 'Physics Unit Test - Light', 'Unit', 50, 45),
(39, 'Chemistry Unit Test - Acids & Bases', 'Unit', 50, 45),
(39, 'Biology Unit Test - Heredity', 'Unit', 50, 45),

-- Class 12 CBSE - Physics
(74, '12th Physics Mock Exam - Full Syllabus', 'Mock', 70, 180),
(74, 'Physics Unit Test - Electrostatics', 'Unit', 50, 60),

-- Class 12 CBSE - Chemistry
(75, '12th Chemistry Mock Exam - Full Syllabus', 'Mock', 70, 180),

-- Class 12 CBSE - Mathematics
(76, '12th Maths Mock Exam - Full Syllabus', 'Mock', 100, 180);

-- ========== FEES (Class-wise, Subject-wise, Group, Individual) ==========
DELETE FROM fees;

INSERT INTO fees (class_id, subject_id, fee_type, fee_amount) VALUES
-- Primary Classes (1-5) - Class-wise pricing
(1, NULL, 'Class-wise', 1500),
(4, NULL, 'Class-wise', 1500),
(7, NULL, 'Class-wise', 2000),
(10, NULL, 'Class-wise', 2000),
(13, NULL, 'Class-wise', 2500),

-- Secondary Classes (6-8) - Class-wise + Subject-wise
(16, NULL, 'Class-wise', 3000), (16, 73, 'Subject-wise', 1000),
(19, NULL, 'Class-wise', 3000), (19, 75, 'Subject-wise', 1000),
(22, NULL, 'Class-wise', 3000), (22, 77, 'Subject-wise', 1000),

-- Senior Secondary (9-10) - Multiple fee types
(25, NULL, 'Class-wise', 4000), (25, 79, 'Subject-wise', 1500),
(28, NULL, 'Class-wise', 4000), (28, 81, 'Subject-wise', 1500),

-- Higher Secondary (11-12) - Varied pricing
(31, NULL, 'Class-wise', 5000), (31, 83, 'Subject-wise', 2000), 
(31, 83, 'Group', 4500), (31, 83, 'Individual', 2500),
(34, NULL, 'Class-wise', 5000), (34, 85, 'Subject-wise', 2000),
(34, 85, 'Group', 4500), (34, 85, 'Individual', 2500);

-- ========== RESULT ENTRIES (To show assessment in action) ==========
DELETE FROM results;

INSERT INTO results (user_id, test_id, marks_obtained, percentage, status) VALUES
(1, 1, 42, 85.00, 'Completed'),
(1, 2, 35, 88.00, 'Completed'),
(1, 3, 78, 78.00, 'Completed');

-- ========== SAMPLE ENROLLMENTS ==========
DELETE FROM enrollments;

INSERT INTO enrollments (user_id, class_id, subject_id, enrollment_type) VALUES
(1, 16, 73, 'Subject'),
(1, 16, 75, 'Subject'),
(1, 16, 76, 'Subject');

-- ==========VERIFICATION QUERIES==========
-- Run these to verify data:
-- SELECT COUNT(*) as total_classes FROM classes;  -- Should be 36 (1-12 × 3 boards)
-- SELECT COUNT(*) as total_subjects FROM subjects;  -- Should be ~150+
-- SELECT COUNT(*) as total_tests FROM tests;  -- Should be 12+
-- SELECT COUNT(*) as total_fees FROM fees;  -- Should be 20+
-- SELECT * FROM classes WHERE board = 'CBSE' LIMIT 5;
-- SELECT s.subject_name, c.class_name FROM subjects s JOIN classes c ON s.class_id = c.id WHERE c.board = 'CBSE' LIMIT 10;
