// formValidation.test.js
import * as Yup from 'yup';

// Validation Schemas
const personalSchema1 = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, 'Invalid phone number')
    .required('Phone number is required')
});

const travelSchema1 = Yup.object().shape({
  departureDate: Yup.date().required('Departure date is required'),
  returnDate: Yup.date()
    .min(Yup.ref('departureDate'), 'Return date must be after departure date')
    .required('Return date is required'),
  accommodation: Yup.string().required('Accommodation preference is required')
});

const healthSchema1 = Yup.object().shape({
  healthDeclaration: Yup.boolean()
    .oneOf([true], 'Health declaration must be accepted')
    .required('Health declaration is required'),
  emergencyContact: Yup.object().shape({
    name: Yup.string().required('Emergency contact name is required'),
    relationship: Yup.string().required('Relationship is required'),
    phone: Yup.string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, 'Invalid phone number')
      .required('Emergency contact phone is required')
  })
});

describe('Form Validation Schemas', () => {
  describe('personalSchema1', () => {
    test('should require a full name', async () => {
      const isValid = await personalSchema1.isValid({});
      expect(isValid).toBe(false);
    });

    test('should require a valid email', async () => {
      const isValid = await personalSchema1.isValid({ email: 'invalid-email' });
      expect(isValid).toBe(false);
    });

    test('should require a valid phone number', async () => {
      const isValid = await personalSchema1.isValid({ phone: 'invalid-phone' });
      expect(isValid).toBe(false);
    });

    test('should pass for valid personal info', async () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890'
      };
      const isValid = await personalSchema1.isValid(validData);
      expect(isValid).toBe(true);
    });
  });

  describe('travelSchema1', () => {
    test('should require a departure date', async () => {
      const isValid = await travelSchema1.isValid({});
      expect(isValid).toBe(false);
    });

    test('should require return date to be after departure date', async () => {
      const isValid = await travelSchema1.isValid({
        departureDate: '2024-02-01',
        returnDate: '2024-01-01'
      });
      expect(isValid).toBe(false);
    });

    test('should pass for valid travel info', async () => {
      const validData = {
        departureDate: '2024-02-01',
        returnDate: '2024-03-01',
        accommodation: 'space-hotel'
      };
      const isValid = await travelSchema1.isValid(validData);
      expect(isValid).toBe(true);
    });
  });

  describe('healthSchema1', () => {
    test('should require health declaration', async () => {
      const isValid = await healthSchema1.isValid({});
      expect(isValid).toBe(false);
    });

    test('should require emergency contact information', async () => {
      const isValid = await healthSchema1.isValid({
        healthDeclaration: true
      });
      expect(isValid).toBe(false);
    });

    test('should pass for valid health info', async () => {
      const validData = {
        healthDeclaration: true,
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+1234567890'
        }
      };
      const isValid = await healthSchema1.isValid(validData);
      expect(isValid).toBe(true);
    });
  });

  describe('complete form validation', () => {
    test('should validate a complete form', async () => {
      const validForm = {
        personal: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890'
        },
        travel: {
          departureDate: '2024-02-01',
          returnDate: '2024-03-01',
          accommodation: 'space-hotel'
        },
        health: {
          healthDeclaration: true,
          emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phone: '+1234567890'
          }
        }
      };

      const personalValid = await personalSchema1.isValid(validForm.personal);
      const travelValid = await travelSchema1.isValid(validForm.travel);
      const healthValid = await healthSchema1.isValid(validForm.health);

      expect(personalValid).toBe(true);
      expect(travelValid).toBe(true);
      expect(healthValid).toBe(true);
    });
  });
});
