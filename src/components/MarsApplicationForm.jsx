import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProgressIndicator from './ProgressIndicator.jsx';

// Step Components (Ensure these are imported or defined separately)
import PersonalInfoStep from './PersonalInfoStep.jsx';
import TravelPrefsStep from './TravelPrefsStep.jsx';
import HealthSafetyStep from './HealthSafetyStep.jsx';

const personalSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  dob: Yup.date().required('Required'),
  nationality: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
  .matches(
    /^(?:\+?\d{1,4}[ -]?)?\(?\d{3}\)?[-\s./]?\d{3}[-\s./]?\d{4}$/,
    'Invalid phone number'
  ).test('len', 'Phone number must be exactly 10 digits', value => {
    const cleanValue = value?.replace(/\D/g, ''); // Remove non-digit characters
    return cleanValue.length === 10;
  })
    .required('Required'),
});

const travelSchema = Yup.object().shape({
  departureDate: Yup.date().required('Required'),
  returnDate: Yup.date().min(Yup.ref('departureDate'), 'Return date must be after departure'),
  accommodation: Yup.string().required('Required'),
  special_guest: Yup.string(),
});

const healthSchema = Yup.object().shape({
  healthDeclaration: Yup.boolean().oneOf([true], 'Declaration required'),
  emergencyContact: Yup.object().shape({
    name: Yup.string().required('Required'),
    relationship: Yup.string().required('Required'),
    phone: Yup.string()
  .matches(
    /^(?:\+?\d{1,4}[ -]?)?\(?\d{3}\)?[-\s./]?\d{3}[-\s./]?\d{4}$/,
    'Invalid phone number'
  ).test('len', 'Phone number must be exactly 10 digits', value => {
    const cleanValue = value?.replace(/\D/g, ''); // Remove non-digit characters
    return cleanValue.length === 10;
  })
    .required('Required'),
  }),
  medicalConditions: Yup.string() 
    .nullable()
    .notRequired()
    .max(1000, 'Too long!'),
});

const steps = [
  { title: 'Personal Information', validationSchema: personalSchema },
  { title: 'Travel Preferences', validationSchema: travelSchema },
  { title: 'Health & Safety', validationSchema: healthSchema },
];

const MarsApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for submission success

  const initialValues = {
    fullName: '',
    dob: '',
    nationality: '',
    email: '',
    phone: '',
    departureDate: '',
    returnDate: '',
    accommodation: '',
    healthDeclaration: false,
    emergencyContact: { name: '', relationship: '', phone: '' },
    medicalConditions: '', // Ensure this is included in the initial values
  };

  const handleNext = (values, actions) => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log('Submission:', values);
      setSubmissionSuccess(true); // Set success state on form submission
      actions.setSubmitting(false); // Stop submitting
    }
  };

  return (
    <div className="form-container">
      {submissionSuccess ? (
        <div className="success-message">
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying to Mars space travel! We will get back to you shortly.</p>
        </div>
      ) : (
        <>
          <ProgressIndicator steps={steps} currentStep={currentStep} />

          <Formik
            initialValues={initialValues}
            validationSchema={steps[currentStep - 1].validationSchema}
            onSubmit={handleNext}
          >
            {({ values }) => (
              <Form>
                {currentStep === 1 && <PersonalInfoStep />}
                {currentStep === 2 && <TravelPrefsStep />}
                {currentStep === 3 && <HealthSafetyStep />}

                <div className="navigation-buttons">
                  {currentStep > 1 && (
                    <button type="button" onClick={() => setCurrentStep((prev) => prev - 1)}>
                      Previous
                    </button>
                  )}

                  {currentStep < steps.length ? (
                    <button type="submit">Next</button>
                  ) : (
                    <button type="submit">Submit Application</button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default MarsApplicationForm;
export const personalSchema1 = personalSchema;
export const travelSchema1 = travelSchema;
export const healthSchema1 = healthSchema;
