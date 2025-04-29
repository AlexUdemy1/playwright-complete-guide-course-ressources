import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    selectedOption: '',
    checkbox: false,
    date: '',
    sliderValue: 50,
    file: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSliderChange = (e) => {
    setFormData({ ...formData, sliderValue: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    // Initialize error message
    let error = '';

    // Validate text input
    if (!formData.textInput) {
      error += 'Text input is required. ';
    }

    // Validate select option (Option 3 must be selected)
    if (formData.selectedOption !== 'option3') {
      error += 'You must select Option 3. ';
    }

    if(formData.checkbox !== true) {
      error += 'The checkbox needs to be selected. '
    }

    // Validate date (must be 13/06/2050)
    if (formData.date !== '2050-06-13') {
      error += 'The date must be 13/06/2050. ';
    }

    // Validate slider value (must be 95)
    if (formData.sliderValue !== '95') {
      error += 'The slider value must be 95. ';
    }

    // Validate file upload
    if (!formData.file) {
      error += 'An image file must be uploaded. ';
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous success or error messages
    setSuccessMessage('');
    setErrorMessage('');

    const error = validateForm();

    if (error) {
      // If there is any error, display the error message
      setErrorMessage(error);
    } else {
      // If no error, display success message
      setSuccessMessage('Form successfully submitted!');
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center text-black bg-gray-100">
      <h1 title="playwright-test" className="text-2xl font-bold mb-4" id="page-title">
        Form for Playwright Testing
      </h1>

      <form
        onSubmit={handleSubmit}
        aria-labelledby="form-title"
        className="border-gray-400 border p-6 rounded-lg w-full max-w-md bg-white"
      >
        <h2 className="text-xl mb-2" id="form-title">
          Example Form
        </h2>

        {/* Text Input */}
        <label htmlFor="text-input" className="block mb-2">
          Enter Text:
        </label>
        <input
          type="text"
          id="text-input"
          name="textInput"
          placeholder='Enter a value'
          alt='text-input'
          aria-label='textInput'
          value={formData.textInput}
          onChange={handleInputChange}
          aria-describedby="text-input-description"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <small id="text-input-description" className="text-gray-500">
          This is a text input field.
        </small>

        {/* Select Picker */}
        <label htmlFor="select-picker" className="block mb-2">
          Select Option:
        </label>
        <select
          id="select-picker"
          name="selectedOption"
          value={formData.selectedOption}
          onChange={handleInputChange}
          aria-label="Select an option"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Choose...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        {/* Checkbox */}
        <label htmlFor="checkbox" className="block mb-2 flex items-center">
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleInputChange}
            className="mr-2"
          />
          Accept terms and conditions
        </label>

        {/* Datepicker */}
        <label htmlFor="datepicker" className="block mb-2">
          Select Date:
        </label>
        <input
          type="date"
          id="datepicker"
          data-testid="datepicker"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          aria-label="Pick a date"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />

        {/* Slider */}
        <label htmlFor="slider" className="block mb-2">
          Slider (Value: {formData.sliderValue}):
        </label>
        <input
          type="range"
          id="slider"
          name="slider"
          min="0"
          max="100"
          value={formData.sliderValue}
          onChange={handleSliderChange}
          className="w-full mb-4"
        />

        {/* Image Upload Button */}
        <label htmlFor="image-upload" className="block mb-2">
          Upload Image:
        </label>
        <input
          type="file"
          id="image-upload"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          aria-label="Upload an image"
          className="mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          aria-labelledby="submit-button"
          id="submit-button"
        >
          Submit
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-red-500">
            <h3>Error:</h3>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-500">
            <h3>Success:</h3>
            <p>{successMessage}</p>
          </div>
        )}
      </form>

      {/* List */}
      <div className="mt-6">
        <h3 className="text-xl mb-2">Example List</h3>
        <ul role="list" className="list-disc pl-5">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <button name='Submit' className="px-2 py-1 bg-blue-500 text-white rounded">Submit</button>
        </ul>
      </div>
      <div className="mt-6 pb-6">
        <h3 className="text-xl mb-2">Example</h3>
          <button name='Submit' className="px-2 py-1 bg-blue-500 text-white rounded">Submit</button>
      </div>
    </div>
  );
};

export default App;
