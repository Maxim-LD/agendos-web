"use client"

import { useState, useMemo, FC, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { Check, Info, Zap, Coffee, Brain, AlertCircle, Loader2 } from "lucide-react"
import api from "@/lib/api"

const TOTAL_STEPS = 4

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

interface OnboardingFlowProps {
  onFinish: () => void;
  email: string | null;
}

export const OnboardingFlow: FC<OnboardingFlowProps> = ({ onFinish, email }) => {
  const [step, setStep] = useState(1)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [comingSoonFeature, setComingSoonFeature] = useState("")
  const [advanceOnClose, setAdvanceOnClose] = useState(false)
  const [onboardingData, setOnboardingData] = useState({
    // Profile Step
    email: email || "",
    username: "",
    phone: "",
    occupation: "",
    date_of_birth: "",
    status: "",
    // Capacity Step
    maximum_daily_capacity: 8,
  })

  const updateOnboardingData = (data: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }))
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS + 1))
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1))

  const handleProfileSkip = () => setStep(3) // Skip to FirstTaskStep
  const handleFirstTaskSkip = () => setStep(TOTAL_STEPS) // Skip to CompletionStep

  const handleComingSoon = (feature: string) => {
    setAdvanceOnClose(true)
    setComingSoonFeature(feature)
    setComingSoonOpen(true)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProfileStep onNext={handleNext} onSkip={handleProfileSkip} data={onboardingData} updateData={updateOnboardingData} />
      case 2:
        return (
          <CapacityStep onNext={handleNext} onBack={handleBack} data={onboardingData} updateData={updateOnboardingData} />
        )
      case 3:
        return <FirstTaskStep onNext={handleNext} onSkip={handleFirstTaskSkip} />
      case 4:
        return <CompletionStep onFinish={onFinish} />
      default:
        return null
    }
  }

  if (step > TOTAL_STEPS) {
    onFinish()
    return null
  }

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1628] to-[#1E3A52] z-30" />
      {/* Dimming overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          key={step}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200"
        >
          <div className="p-6 sm:p-8">
            <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <ComingSoonModal 
        open={comingSoonOpen} 
        onOpenChange={(isOpen) => {
          setComingSoonOpen(isOpen)
          if (!isOpen && advanceOnClose) {
            handleNext()
            setAdvanceOnClose(false)
          }
        }} 
        featureName={comingSoonFeature} />
    </>
  )
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progressPercentage = useMemo(() => (currentStep / totalSteps) * 100, [currentStep, totalSteps])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-[#00BFA6]">Step {currentStep} of {totalSteps}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <motion.div
          className="bg-[#00BFA6] h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>
    </div>
  )
}

interface ProfileStepProps {
  onNext: () => void;
  onSkip: () => void;
  data: {
    username: string;
    phone: string;
    occupation: string;
    date_of_birth: string;
    status: string
  };
  updateData: (data: Partial<ProfileStepProps["data"]>) => void;
}

const ProfileStep: FC<ProfileStepProps> = ({ onNext, onSkip, data, updateData }) => {
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null) // Clear error on change
    updateData({ [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const { username, phone, occupation, date_of_birth, status } = data;
    const profileFields = { username, phone, occupation, date_of_birth, status };
    const isProfileEmpty = Object.values(profileFields).every(value => value === "" || value === null)

    if (isProfileEmpty) {
      setError("Please fill in at least one field, or skip for now.")
      return
    }
    // Validation passed, proceed to the next step where data will be saved.
    onNext()
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-charcoal-black mb-2">Personalize Your System</h2>
      <p className="text-charcoal-black/60 mb-8">This is optional and helps tailor your experience.</p>
      <div className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="johndoe" value={data.username} onChange={handleChange} className="placeholder:text-charcoal-black/40" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="08012345678" value={data.phone} onChange={handleChange} className="placeholder:text-charcoal-black/40" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" name="occupation" placeholder="e.g. Software Engineer" value={data.occupation} onChange={handleChange} className="placeholder:text-charcoal-black/40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input id="date_of_birth" name="date_of_birth" type="date" value={data.date_of_birth} onChange={handleChange} className="placeholder:text-charcoal-black/40" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" name="status" placeholder="e.g. Student" value={data.status} onChange={handleChange} className="placeholder:text-charcoal-black/40" />
          </div>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-6 text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" onClick={onSkip} className="w-full py-3">Skip for Now</Button>
        <Button onClick={handleSave} className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3">
          Save & Continue
        </Button>
      </div>
    </div>
  )
}

interface CapacityStepProps {
  onNext: () => void;
  onBack: () => void;
  data: { maximum_daily_capacity: number; [key: string]: any };
  updateData: (data: Partial<{ maximum_daily_capacity: number }>) => void;
}

const CapacityStep: FC<CapacityStepProps> = ({ onNext, onBack, data, updateData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProfileSave = async () => {
    setIsSubmitting(true)
    setError(null)
    const { email, ...profileData } = data;
    try {
      const res = await api.request(
        `/user/onboarding?email=${data.email}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData),
        });
      const result = await res.json()
      if (!result.success) {
        setError(result.message || 'Failed to save profile.');
      } else {
        onNext()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-charcoal-black mb-2">The Effort Budget</h2>
      <p className="text-charcoal-black/60 mb-8">Master your capacity by setting a daily limit for high-effort tasks.</p>

      <div className="my-10">
        <div className="flex justify-between items-end">
          <span className="text-4xl font-bold text-[#FF7A00]">{data.maximum_daily_capacity}</span>
          <span className="text-lg text-charcoal-black/80 mb-1">Hours / Day</span>
        </div>
        <Slider
          value={[data.maximum_daily_capacity]}
          max={12}
          min={1}
          step={1}
          onValueChange={(value: number[]) => updateData({ maximum_daily_capacity: value[0] || 8 })}
          className="mt-4"
        />
        <div className="flex justify-between text-xs text-charcoal-black/50 mt-2">
          <span>1 hr</span>
          <span>12 hrs</span>
        </div>
      </div>

      <div className="flex items-center justify-center text-sm text-charcoal-black/70 bg-gray-50 p-3 rounded-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 mr-3 text-[#00BFA6] cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>The Effort Budget helps prevent burnout by tracking your daily capacity.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>Your daily limit for focused work.</span>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4 text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleProfileSave} className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Set Budget & Continue
        </Button>
      </div>
    </div>
  )
}

interface FirstTaskStepProps {
  onNext: () => void;
  onSkip: () => void;
}

const FirstTaskStep: FC<FirstTaskStepProps> = ({ onNext, onSkip }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    effort_estimate_minutes: "",
    energy_required: "medium" as "low" | "medium" | "high",
  })
  const [energy, setEnergy] = useState<"low" | "medium" | "high">("medium")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      console.log("Submitting task data:", { ...taskData, energy_required: energy })
      await new Promise(resolve => setTimeout(resolve, 1500))
      onNext()
    } catch (err) {
      setError("Failed to create task. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const energyLevels = {
    low: { icon: Coffee, label: "Low", description: "Calm, easy tasks", color: "text-blue-500" },
    medium: { icon: Zap, label: "Medium", description: "Standard focus", color: "text-yellow-500" },
    high: { icon: Brain, label: "High", description: "Deep, focused work", color: "text-red-500" },
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-charcoal-black mb-2">Define Your First Win</h2>
      <p className="text-charcoal-black/60 mb-8">Create your first task to get started.</p>

      <div className="space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input id="title" name="title" value={taskData.title} onChange={handleChange} placeholder="e.g., Draft project proposal" className="placeholder:text-charcoal-black/40" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="effort">Effort Estimate (minutes)</Label>
          <Input id="effort" name="effort_estimate_minutes" type="number" value={taskData.effort_estimate_minutes} onChange={handleChange} placeholder="e.g., 60" className="placeholder:text-charcoal-black/40" />
        </div>
        <div className="space-y-3">
          <Label>Energy Required</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(energyLevels).map(([key, { icon: Icon, label, color }]) => (
              <button
                key={key}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEnergy(key as "low" | "medium" | "high");
                }}
                className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                  energy === key ? "border-[#00BFA6] bg-teal-50/50 ring-2 ring-[#00BFA6]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-charcoal-black/60 h-4">
            {energyLevels[energy].description}
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4 text-left">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" onClick={onSkip} className="w-full py-3" disabled={isSubmitting}>
          Skip for Now
        </Button>
        <Button onClick={handleSave} className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Task & Continue
        </Button>
      </div>
    </div>
  )
}

interface CompletionStepProps {
  onFinish: () => void;
}

const CompletionStep: FC<CompletionStepProps> = ({ onFinish }) => {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="mx-auto w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          className="w-16 h-16 rounded-full bg-[#00BFA6] flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="text-2xl font-bold text-charcoal-black mt-6 mb-2"
      >
        Success! Your Dashboard Awaits
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="text-charcoal-black/60 mb-8"
      >
        You're all set to start mastering your productivity.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      >
        <Button onClick={onFinish} className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white font-bold py-3">
          Go to Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
