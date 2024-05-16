'use client'

import LayoutSignup from '@/components/signup/layout'
import { Dispatch, SetStateAction, useState } from 'react'

import SignupFeatureStep1 from './signup_step_1'
import SignupFeatureStep2 from './signup_step_2'
import SignupFeatureStep3 from './signup_step_3'

interface SignupStepProps {
  onNext: () => void
  currentStep: number
}

export interface IFormData {
  userId: number | null
  first_name: string
  last_name: string
  phone: string
  email: string
  pronoun: string
  password: string
  password_confirmation: string
  acceptPolicy: boolean
  businessType: string
  medialSpecial: string | null
  medialSpecialLabel: string
  businessTypeLabel: string
  province: string
  district: string
  ward: string
  businessName: string
  houseNumber: string
  referralCode: string | null
}

export interface ISignupStepProps {
  onBack: () => void
  onNext: () => void
  currentStep: number
  formData: IFormData
  setFormData: Dispatch<SetStateAction<IFormData>>
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<IFormData>({
    userId: null,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    pronoun: '',
    password: '',
    password_confirmation: '',
    acceptPolicy: false,
    businessType: '',
    medialSpecialLabel: '',
    medialSpecial: null,
    businessTypeLabel: '',
    province: '',
    district: '',
    ward: '',
    businessName: '',
    houseNumber: '',
    referralCode: null
  })
  const onStep = () => setStep((prevStep) => prevStep + 1)
  const prevStep = () => setStep((prevStep) => prevStep - 1)

  switch (step) {
    case 1:
      return (
        <SignupFeatureStep1
          onNext={onStep}
          currentStep={step}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
        />
      )
    case 2:
      return (
        <SignupFeatureStep2
          onNext={onStep}
          currentStep={step}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
        />
      )
    case 3:
      return (
        <SignupFeatureStep3
          onNext={onStep}
          currentStep={step}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
        />
      )
  }
}
