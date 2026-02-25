require('dotenv').config();
(async () => {
  const token = process.env.TEST_JWT;
  if (!token) {
    console.error('Please set TEST_JWT in env to the token printed by create_test_user.js');
    process.exit(1);
  }

  const body = {
    class_number: 1,
    board: 'CBSE',
    enrollment_type: 'Class'
  };

  try {
    const res = await fetch('http://localhost:5000/api/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Request failed:', err.message || err);
  }
})();
