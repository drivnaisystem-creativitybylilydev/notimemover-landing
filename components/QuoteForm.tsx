'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  movingFrom: string
  movingTo: string
  moveDate: string
  size: string
  name: string
  email: string
  phone: string
}

const PRICE_RANGES: Record<string, string> = {
  studio: '$800 - $1,200',
  '2br': '$1,200 - $1,800',
  '3br': '$1,800 - $2,500',
  house: '$2,500+',
}

const SIZE_LABELS: Record<string, string> = {
  studio: 'Studio/1BR',
  '2br': '2BR',
  '3br': '3BR+',
  house: 'Whole House',
}

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    movingFrom: '',
    movingTo: '',
    moveDate: '',
    size: '',
    name: '',
    email: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSizeSelect = (size: string) => {
    setFormData(prev => ({
      ...prev,
      size,
    }))
  }

  const isStep1Valid = formData.movingFrom && formData.movingTo && formData.moveDate
  const isStep2Valid = formData.size
  const isStep3Valid = formData.name && formData.email && formData.phone

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2)
    else if (step === 2 && isStep2Valid) setStep(3)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStep3Valid) {
      console.log('Form submitted:', formData)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            We received your quote request.
          </p>

          <div className="bg-orange-brand/10 border-2 border-orange-brand/30 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Estimated Cost</p>
            <p className="text-3xl font-bold text-orange-brand">
              {PRICE_RANGES[formData.size]}
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary-500 p-4 mb-8 text-left">
            <p className="text-sm text-gray-700">
              <strong>What happens next:</strong> A moving specialist will contact you within 24 hours with personalized recommendations and next steps.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {formData.movingFrom} → {formData.movingTo}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Move Date:</strong> {new Date(formData.moveDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Home Size:</strong> {SIZE_LABELS[formData.size]}
            </p>
          </div>

          <Link
            href="/"
            className="btn-primary w-full mt-8 block text-center"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 pt-40 relative">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-2xl w-full border-2 border-orange-brand/20 relative">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Step {step} of 3
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-orange-brand">
                {Math.round((step / 3) * 100)}%
              </span>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center gap-1"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-orange-brand h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Where are you moving?
              </h2>
              <p className="text-gray-600 mb-8">
                Tell us your moving locations to get started
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Moving From
                  </label>
                  <input
                    type="text"
                    name="movingFrom"
                    placeholder="e.g., New York, NY"
                    value={formData.movingFrom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Moving To
                  </label>
                  <input
                    type="text"
                    name="movingTo"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.movingTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Move Date
                  </label>
                  <input
                    type="date"
                    name="moveDate"
                    value={formData.moveDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 text-center"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className={`flex-1 px-6 py-3 bg-orange-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-brand/30 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${!isStep1Valid ? '' : 'hover:-translate-y-0.5'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                How much stuff?
              </h2>
              <p className="text-gray-600 mb-8">
                Select your home size for an instant estimate
              </p>

              <div className="space-y-3">
                {Object.entries(SIZE_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSizeSelect(key)}
                    className={`w-full p-5 rounded-lg border-2 transition-all duration-300 text-left font-semibold group ${
                      formData.size === key
                        ? 'border-orange-brand bg-gradient-to-r from-orange-brand/10 to-orange-brand/10/50 shadow-lg shadow-orange-brand/15'
                        : 'border-gray-200 bg-white hover:border-secondary-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`transition-colors duration-200 ${formData.size === key ? 'text-brown-dark font-bold' : 'text-gray-900 group-hover:text-gray-700'}`}>
                        {label}
                      </span>
                      <span className={`transition-colors duration-200 font-semibold ${formData.size === key ? 'text-orange-brand' : 'text-gray-500 group-hover:text-orange-brand'}`}>
                        {PRICE_RANGES[key]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className={`flex-1 px-6 py-3 bg-orange-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-brand/30 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${!isStep2Valid ? '' : 'hover:-translate-y-0.5'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;ll reach out to finalize your moving quote
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown-dark mb-2 font-montserrat">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-orange-brand focus:outline-none transition-all duration-200 focus:shadow-md focus:shadow-orange-brand/10 bg-white hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isStep3Valid}
                  className={`flex-1 px-6 py-3 bg-orange-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-brand/30 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${!isStep3Valid ? '' : 'hover:-translate-y-0.5'}`}
                >
                  Submit Quote
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
