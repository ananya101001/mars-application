import { Field, ErrorMessage } from 'formik';

const TravelPrefsStep = () => (
  <div className="form-step active">
    <label>Departure Date:</label>
    <Field name="departureDate" type="date" />
    <ErrorMessage name="departureDate" component="div" className="error" />

    <label>Return Date:</label>
    <Field name="returnDate" type="date" />
    <ErrorMessage name="returnDate" component="div" className="error" />

    <label>Preferred Accommodation:</label>
    <Field as="select" name="accommodation">
      <option value="">Select...</option>
      <option value="hotel">Hotel</option>
      <option value="capsule">Capsule Pod</option>
      <option value="research-station">Research Station</option>
    </Field>
    <ErrorMessage name="accommodation" component="div" className="error" />

    <label>Special Requests or Preferences:</label>
    <Field name="specialRequests" type="text" placeholder="Any special requests or preferences" />
    <ErrorMessage name="specialRequests" component="div" className="error" />
  </div>
);

export default TravelPrefsStep;
