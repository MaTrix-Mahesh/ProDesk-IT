import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, accountDetailsSchema, totalRegistrationSchema } from './schemas/registrationSchema';
import StepTracker from './components/StepTracker';
import PersonalInfo from './components/PersonalInfo';
import AccountDetails from './components/AccountDetails';
import ReviewSubmit from './components/ReviewSubmit';
import SuccessScreen from './components/SuccessScreen';

export default function App() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const getCurrentSchema = () => {
    if (step === 1) return personalInfoSchema;
    if (step === 2) return accountDetailsSchema;
    return totalRegistrationSchema;
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(getCurrentSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNextStep = async () => {
    const activeFields = step === 1 
      ? ['firstName', 'lastName', 'dob'] 
      : ['email', 'password', 'confirmPassword'];

    const isStepValid = await methods.trigger(activeFields);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleFormSubmission = (data) => {
    console.log('Wizard Completed Form State Payload:', data);
    setFormData(data);
    setIsSubmitted(true);
  };

  const handleRestartWizard = () => {
    methods.reset();
    setFormData({});
    setIsSubmitted(false);
    setStep(1);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-radial from-slate-50 via-slate-100 to-indigo-50/40 px-4 py-14 overflow-x-hidden antialiased selection:bg-indigo-500/10 selection:text-indigo-600">
      
      {/* Structural Abstract Geometric Blurred Accents */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-linear-to-br from-indigo-200/30 to-purple-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-linear-to-tr from-blue-100/40 to-indigo-200/20 blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:p-10 transition-all duration-300 transform-gpu hover:border-slate-300/80">
        {!isSubmitted && <StepTracker step={step} />}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmission)} noValidate>
            {!isSubmitted && step === 1 && (
              <PersonalInfo onNext={handleNextStep} />
            )}
            {!isSubmitted && step === 2 && (
              <AccountDetails onNext={handleNextStep} onBack={handleBackStep} />
            )}
            {!isSubmitted && step === 3 && (
              <ReviewSubmit onBack={handleBackStep} isSubmitting={methods.formState.isSubmitting} />
            )}
            {isSubmitted && (
              <SuccessScreen data={formData} onStartOver={handleRestartWizard} />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}