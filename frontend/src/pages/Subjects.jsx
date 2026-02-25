import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiFilter, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Subjects() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassNumber, setSelectedClassNumber] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [feesList, setFeesList] = useState([]);
  const [fees, setFees] = useState(null);
  const [enrollmentMode, setEnrollmentMode] = useState("Individual");
  const [loading, setLoading] = useState(true);

  const boards = ["CBSE", "ICSE", "STATE"];

  // Fetch all classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/classes");
        setClasses(res.data.data || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load classes");
        setLoading(false);
      }
    };
    fetchClasses();
    // fetch fees
    const fetchFees = async () => {
      try {
        const res = await API.get("/fees");
        setFeesList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        // non-critical
        setFeesList([]);
      }
    };
    fetchFees();
  }, []);

  // Fetch subjects when class selected (supports real DB class id or virtual class number)
  useEffect(() => {
    // If a real DB class id is selected, fetch from API
    if (selectedClass) {
      const fetchSubjects = async () => {
        try {
          const res = await API.get(`/subjects/${selectedClass}`);
          const raw = Array.isArray(res.data) ? res.data : [];
          // dedupe by normalized subject name then filter to canonical subjects only
          const seenNames = new Set();
          const deduped = [];
          const classNum = getSelectedClassNumber();
          for (const s of raw) {
            const name = (s.subject_name || s.name || "").trim();
            const key = name.toLowerCase();
            if (!key) continue;
            if (seenNames.has(key)) continue;
            // only include canonical subjects for this class range
            if (!isCanonicalSubject(classNum, name)) continue;
            seenNames.add(key);
            deduped.push(s);
          }
          setSubjects(deduped);
        } catch (error) {
          toast.error("Failed to load subjects");
          setSubjects([]);
        }
      };
      fetchSubjects();
      return;
    }

    // If a virtual class number is selected (no DB class), show fallback subjects (handled in UI)
    if (selectedClassNumber) {
      setSubjects([]); // ensure subjects array is empty so fallback UI is shown
      return;
    }

    // Nothing selected
    setSubjects([]);
  }, [selectedClass, selectedClassNumber]);

  // Fetch user's enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await API.get("/enrollments/my");
        setEnrollments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        // Not critical if fails
      }
    };
    fetchEnrollments();
  }, []);

  // Handle enrollment (subjectId may be numeric id or a subject name string)
  const handleEnroll = async (subjectIdentifier) => {
    try {
      const payload = { enrollment_type: "Subject", mode: enrollmentMode };

      if (selectedClass) payload.class_id = selectedClass;
      else if (selectedClassNumber && selectedBoard) {
        payload.class_number = selectedClassNumber;
        payload.board = selectedBoard;
      } else {
        toast.error("This class is not available for enrollment. Contact admin.");
        return;
      }

      if (typeof subjectIdentifier === "number") payload.subject_id = subjectIdentifier;
      else payload.subject_name = subjectIdentifier;

      await API.post("/enrollments", payload);
      toast.success("Enrolled successfully!");
      // Refresh enrollments
      const res = await API.get("/enrollments/my");
      setEnrollments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  // Handle class enrollment (supports virtual classes)
  const handleEnrollClass = async () => {
    try {
      const payload = { enrollment_type: "Class", mode: enrollmentMode };
      if (selectedClass) payload.class_id = selectedClass;
      else if (selectedClassNumber && selectedBoard) {
        payload.class_number = selectedClassNumber;
        payload.board = selectedBoard;
      } else {
        toast.error("This class is not available for enrollment. Contact admin.");
        return;
      }

      await API.post("/enrollments", payload);
      toast.success("Class enrollment successful!");
      const res = await API.get("/enrollments/my");
      setEnrollments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  // Get unique classes grouped by board
  const classesGroupedByBoard = boards.reduce((acc, board) => {
    const boardClasses = classes.filter((c) => c.board === board);
    if (boardClasses.length > 0) {
      acc[board] = boardClasses;
    }
    return acc;
  }, {});

  // Helper to parse class number from class_name like '1st', '2nd', '10th'
  const parseClassNumber = (className) => {
    if (!className) return null;
    const num = parseInt(className, 10);
    return Number.isNaN(num) ? null : num;
  };

  // Get grade/category (Primary, Middle School, Secondary)
  const getGrade = (classRef) => {
    let classNum = null;
    if (!classRef) return null;
    // If a plain number or numeric string is passed
    if (typeof classRef === "number" || !Number.isNaN(parseInt(classRef, 10))) {
      classNum = parseInt(classRef, 10);
    }
    // If passed a class id or object, resolve via classes array
    if (!classNum) {
      const clsObj = typeof classRef === "object" ? classRef : classes.find((c) => c.id === classRef);
      if (clsObj) classNum = parseClassNumber(clsObj.class_name);
    }
    if (!classNum) return null;
    if (classNum <= 5) return "Primary";
    if (classNum <= 8) return "Middle School";
    return "Secondary";
  };

  // Default subject fallbacks when DB doesn't have entries yet
  const defaultSubjectsForClass = (classId, board) => {
    const classNum = parseInt(classId);
    if (classNum <= 5) return ["Maths", "EVS", "English"];
    if (classNum <= 8) return ["Maths", "Science", "English", "Social Science"];
    if (classNum <= 10) return ["Maths", "Science", "English"];
    // 11-12: show both Math and Biology options
    return ["Physics", "Chemistry", "Mathematics", "Biology"];
  };

  // Determine if a subject name matches the canonical list for a class number
  const isCanonicalSubject = (classNum, subjectName) => {
    if (!classNum || !subjectName) return false;
    const n = subjectName.trim().toLowerCase();
    if (classNum <= 5) {
      return /math|evs|english/.test(n);
    }
    if (classNum <= 8) {
      return /math|science|english|social/.test(n);
    }
    if (classNum <= 10) {
      return /math|science|english/.test(n);
    }
    // 11-12
    return /physics|chemistry|math|biology/.test(n);
  };

  const getSelectedClassNumber = () => {
    if (selectedClassNumber) return selectedClassNumber;
    if (selectedClass) {
      const cls = classes.find((c) => c.id === selectedClass);
      return cls ? parseClassNumber(cls.class_name) : null;
    }
    return null;
  };

  // Compute fee based on selection (class or subject) and mode
  const computeFeeAmount = (classId, subjectId, mode) => {
    if (!classId) return null;
    // prefer exact match: class+subject+mode
    const modeKey = mode === "Group" ? "Group" : "Individual";

    // Try subject-specific fee first
    if (subjectId) {
      const exact = feesList.find(
        (f) => f.class_id === classId && f.subject_id === subjectId && f.fee_type === modeKey
      );
      if (exact) return exact.fee_amount;
      // fallback to subject-wise fee without mode
      const subj = feesList.find(
        (f) => f.class_id === classId && f.subject_id === subjectId && (f.fee_type === "Subject-wise" || f.fee_type === modeKey)
      );
      if (subj) return subj.fee_amount;
    }

    // Try class-level fees
    const exactClassMode = feesList.find(
      (f) => f.class_id === classId && (f.subject_id === null || f.subject_id === undefined) && f.fee_type === modeKey
    );
    if (exactClassMode) return exactClassMode.fee_amount;

    const classWide = feesList.find(
      (f) => f.class_id === classId && (f.subject_id === null || f.subject_id === undefined) && f.fee_type === "Class-wise"
    );
    if (classWide) return classWide.fee_amount;

    return null;
  };

  // Helper to add ordinal suffix (1st, 2nd, 3rd, 4th)
  const ordinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];    
  };

  // Generate classes 1..12 for a board, preferring DB entries when present
  const getGeneratedClasses = (board) => {
    const boardClasses = classes.filter((c) => c.board === board);
    const out = [];
    for (let i = 1; i <= 12; i++) {
      const db = boardClasses.find((c) => parseClassNumber(c.class_name) === i);
      if (db) out.push({ ...db, virtual: false });
      else out.push({ id: `virtual-${board}-${i}`, class_name: `${i}${ordinalSuffix(i)}`, virtual: true, number: i, board });
    }
    return out;
  };

  const isEnrolled = (subjectId) =>
    enrollments.some((e) => e.subject_id === subjectId && e.class_id === selectedClass);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading subjects...</p>
      </div>
    );
  }



  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 bg-gray-50 dark:bg-gray-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <FiBook className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subjects</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your class, board, and subjects to begin learning
            </p>
          </div>
        </div>

        {/* Step 1: Select Board */}
        {!selectedBoard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiFilter className="w-5 h-5" />
                Step 1: Select Your Board
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                SmartEdu supports CBSE, ICSE, and State Boards with curriculum-aligned content
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {boards.map((board) => (
                  <button
                    key={board}
                    onClick={() => setSelectedBoard(board)}
                    className="group p-6 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-left"
                  >
                    <p className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600">
                      {board}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {board === "CBSE"
                        ? "Central Board"
                        : board === "ICSE"
                        ? "Indian Certificate"
                        : "State Curriculum"}
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      {Math.min(1, classesGroupedByBoard[board]?.length || 0)} to 12 classes available
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Class */}
        {selectedBoard && !(selectedClass || selectedClassNumber) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-2">Step 2: Select Your Class</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <strong>{selectedBoard}</strong> Board • Classes 1st to 12th
              </p>

              {/* Display by grade groups */}
              {['Primary', 'Middle School', 'Secondary'].map((grade) => {
                const generated = getGeneratedClasses(selectedBoard);
                const gradeClasses = generated.filter((c) => getGrade(c) === grade);
                if (gradeClasses.length === 0) return null;

                return (
                  <div key={grade} className="mb-6">
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3 uppercase tracking-wide">
                      {grade}
                    </p>
                    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {gradeClasses.map((cls) => {
                        const classKey = cls.virtual ? `virtual-${selectedBoard}-${cls.number}` : cls.id;
                        const fallbackSubjects = defaultSubjectsForClass(cls.virtual ? cls.number : cls.class_name, selectedBoard);
                        return (
                          <div
                            key={classKey}
                            className="p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                          >
                              <button
                                onClick={() => {
                                  // Prevent selecting a class the user already enrolled in (class-wise)
                                  const enrolledClass = !cls.virtual && enrollments.some((e) => e.class_id === cls.id && e.enrollment_type === "Class");
                                  if (enrolledClass) {
                                    toast("You are already enrolled in this class.");
                                    return;
                                  }
                                  if (cls.virtual) {
                                    setSelectedClass(null);
                                    setSelectedClassNumber(cls.number);
                                  } else {
                                    setSelectedClass(cls.id);
                                    setSelectedClassNumber(null);
                                  }
                                  // bring subjects panel into view
                                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                                }}
                              className="w-full text-left font-semibold text-gray-900 dark:text-white"
                            >
                              {cls.class_name}
                            </button>

                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {fallbackSubjects.map((s) => (
                                <span
                                  key={`${classKey}-${s}`}
                                  className="inline-block mr-2 mb-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setSelectedBoard(null)}
                className="mt-6 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                ← Change Board
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Select Subjects */}
        {selectedBoard && (selectedClass || selectedClassNumber) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Step 3: Choose Subjects</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>{selectedBoard}</strong> Board • Class{" "}
                    {selectedClass
                      ? classesGroupedByBoard[selectedBoard]?.find((c) => c.id === selectedClass)?.class_name
                      : `${selectedClassNumber}${ordinalSuffix(selectedClassNumber)}`}
                    {" "}
                    Standard
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedClass(null);
                    setSelectedClassNumber(null);
                    setSubjects([]);
                    // scroll to the class selection area so user sees Step 2
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Change Class
                </button>
              </div>

              <>
                <p className="text-gray-500 py-2 text-center">
                  Choose from the standard subjects for this grade — board-specific syllabus applies.
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <label className="text-sm font-medium">Mode:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEnrollmentMode('Individual')}
                      className={`px-3 py-1 rounded ${enrollmentMode === 'Individual' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}
                    >
                      Individual
                    </button>
                    <button
                      onClick={() => setEnrollmentMode('Group')}
                      className={`px-3 py-1 rounded ${enrollmentMode === 'Group' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}
                    >
                      Group
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {(() => {
                    const classNum = getSelectedClassNumber();
                    const canonical = defaultSubjectsForClass(classNum || selectedClass || selectedClassNumber, selectedBoard) || [];
                    // prepare display list mapping canonical names to DB subject if present
                    const display = canonical.map((name) => {
                      const found = subjects.find(
                        (s) => (s.subject_name || s.name || "").trim().toLowerCase() === name.trim().toLowerCase()
                      );
                      return { name, id: found ? found.id : null };
                    });

                    return display.map((item, idx) => {
                      const enrolled = item.id ? isEnrolled(item.id) : false;
                      // compute fee if class id is DB-backed
                      const feeAmount = selectedClass ? computeFeeAmount(selectedClass, item.id, enrollmentMode) : null;
                      return (
                        <motion.div
                          key={`canonical-${idx}-${item.name}`}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 border-2 rounded-lg transition-all ${enrolled ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-300 dark:border-gray-700 hover:border-primary-600"}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Weekly tests • Monthly assessments • Mock exams available</p>
                            </div>
                            {enrolled && <FiCheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                          </div>

                          {!enrolled && (
                            <button
                              onClick={() => (item.id ? handleEnroll(item.id) : handleEnroll(item.name))}
                              className="mt-4 btn-primary btn-sm w-full flex items-center justify-center gap-2"
                            >
                              Enroll <FiArrowRight className="w-4 h-4" />
                            </button>
                          )}

                          {/* Fee display */}
                          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            {feeAmount ? (
                              <span className="font-semibold">Fee: ₹{Number(feeAmount).toFixed(0)} ({enrollmentMode})</span>
                            ) : (
                              <span className="text-xs">Fee: Contact admin</span>
                            )}
                          </div>

                          {enrolled && (
                            <p className="mt-4 text-sm text-green-600 font-semibold flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4" /> Enrolled
                            </p>
                          )}
                        </motion.div>
                      );
                    });
                  })()}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedClass(null);
                      setSubjects([]);
                      setSelectedClassNumber(null);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="btn-primary flex-1"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </>
            </div>
          </motion.div>
        )}

        {/* Current Enrollments */}
        {enrollments.length > 0 && (
          <div className="card p-6 mt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              Your Enrollments ({enrollments.length})
            </h3>
            <div className="space-y-2">
              {enrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    {enr.board ? `${enr.board} • ` : ""}
                    {enr.class_name || `Class ${enr.class_id}`}
                    {enr.subject_name ? ` — ${enr.subject_name}` : enr.enrollment_type === "Class" ? " • Class Enrollment" : ""}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Since {new Date(enr.enrollment_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Subjects;