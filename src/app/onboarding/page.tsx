"use client"

import { Suspense, FC } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OnboardingFlow } from "@/features/auth/components/onboarding-flow"

function OnboardingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return <OnboardingFlow email={email} onFinish={() => router.push("/dashboard")} />
}

const OnboardingPage: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPageContent />
    </Suspense>
  )
}

export default OnboardingPage