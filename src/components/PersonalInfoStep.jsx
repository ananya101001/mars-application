import { Field, ErrorMessage } from 'formik';

const PersonalInfoStep = () => (
  <div className="form-step active">
    <Field name="fullName" placeholder="Full Name" />
    <ErrorMessage name="fullName" component="div" className="error" />

    <Field name="dob" type="date" />
    <ErrorMessage name="dob" component="div" className="error" />

    <Field name="nationality" placeholder="Nationality" />
    <ErrorMessage name="nationality" component="div" className="error" />

    <Field name="email" type="email" placeholder="Email" />
    <ErrorMessage name="email" component="div" className="error" />

    <Field name="phone" placeholder="Phone Number" />
    <ErrorMessage name="phone" component="div" className="error" />
  </div>
);

export default PersonalInfoStep;
