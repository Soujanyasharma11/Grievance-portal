import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import { useCookies } from 'react-cookie';

function Complaint({ show, onHide }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to control the success dialog box
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Use the cookies hook to get the auth token
  const [cookies] = useCookies(['authToken']);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('date', selectedDate);

    // Make a POST request to your server's endpoint with the full URL
    fetch('http://localhost:4000/complaints/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${cookies.authToken}`, // Use backticks for the template string
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Complaint submitted:', data);
        // Show the success dialog box
        setShowSuccessDialog(true);
        // Close the modal after successful submission (if needed)
        onHide();
      })
      .catch((error) => {
        console.error('Error submitting complaint:', error);
        // Handle the error (e.g., show an error message)
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Register Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Complaint:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description of Grievance:
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="selectedDate" className="form-label">
              Date:
            </label>
            <DatePicker
              id="selectedDate"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()} // Block past dates
              maxDate={new Date()}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Upload Photo:
            </label>
            <input
              type="file"
              className="form-control"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Dialog Box */}
      <Modal show={showSuccessDialog} onHide={() => setShowSuccessDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Successful Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your complaint has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessDialog(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Complaint;
