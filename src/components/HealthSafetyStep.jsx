import { Field, ErrorMessage } from 'formik';

const HealthSafetyStep = () => (
  <div className="form-step active">
    <div>
      <label className="health-safety-checkbox">
        <Field type="checkbox" name="healthDeclaration" />
        I confirm that I am in good health for space travel.
      </label>
    </div>
    <ErrorMessage name="healthDeclaration" component="div" className="error" />

    <h3>Emergency Contact</h3>

    <label>Name:</label>
    <Field name="emergencyContact.name" type="text" placeholder="Full Name" />
    <ErrorMessage name="emergencyContact.name" component="div" className="error" />

    <label>Relationship:</label>
    <Field name="emergencyContact.relationship" type="text" placeholder="Relationship" />
    <ErrorMessage name="emergencyContact.relationship" component="div" className="error" />

    <label>Phone:</label>
    <Field name="emergencyContact.phone" type="text" placeholder="Phone Number" />
    <ErrorMessage name="emergencyContact.phone" component="div" className="error" />

    <h3>Medical Conditions (if applicable)</h3>

    <label>Any Medical Conditions:</label>
    <Field name="medicalConditions" type="text" placeholder="List any medical conditions" />
    <ErrorMessage name="medicalConditions" component="div" className="error" />
  </div>
);

export default HealthSafetyStep;
