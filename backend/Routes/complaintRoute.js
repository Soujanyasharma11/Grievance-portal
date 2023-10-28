const express = require('express');
const router = express.Router();
const { userVerification } = require('../Middlewares/AuthMiddleware');
const {
  registerComplaint,
  getAllComplaints,
  deleteComplaint, // Ensure this function is correctly imported
} = require('../Controllers/complaintController');

// User verification middleware
router.use(userVerification);

// Register Complaint route
router.post('/register', registerComplaint);

// Get Complaints route
router.get('/complaints', getAllComplaints);

// Delete Complaint route
router.delete('/complaints/:id', deleteComplaint);

module.exports = router;
