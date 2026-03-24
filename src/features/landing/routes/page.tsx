"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ComingSoonModal } from "@/components/ui/coming-soon-modal"
import { Drawer } from "vaul"
import { MobileMockup } from "@/features/landing/components/mobile-mockup"
import { AgendosLogo } from "@/features/brand/components/logo/AgendosLogo"
import { AgendosIcon } from "@/features/brand/components/logo/AgendosIcon"
import { useAuth } from "@/providers"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"

export default function LandingPage() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, accessToken, logout } = useAuth()

  const isAuthenticated = !!(user && accessToken)

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName)
    setComingSoonOpen(true)
  }
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center" aria-label="Agendos Homepage">
                <AgendosLogo className="text-3xl" />
              </Link>
              <ul className="hidden md:flex items-center gap-8">
                <li>
                  <a href="#features" className="text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how" className="text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#download" className="text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                    Download
                  </a>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="User menu"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </Button>
                      {isProfileMenuOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                          <div className="absolute right-0 mt-2 w-25 bg-white rounded-md shadow-lg py-1">
                            <Link
                              href="/profile"
                              className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100"
                              onClick={() => setIsProfileMenuOpen(false)}
                            >
                              Profile
                            </Link>
                            <div className="mt-auto border-t p-2">
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                                )}
                                onClick={() => {
                                  logout?.()
                                  setIsProfileMenuOpen(false)
                                }}
                              >
                                Logout
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/auth/login">
                      <Button className="bg-[var(--color-indigo-500)] hover:bg-[var(--color-indigo-600)] text-white rounded-lg px-6">Sign In</Button>
                    </Link>
                  </li>
                )}
              </ul>
              <Drawer.Root direction="left" open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <Drawer.Trigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="bg-white flex flex-col h-full w-[70%] max-w-[280px] fixed top-0 left-0 shadow-xl z-50">
                    <div className="p-4 bg-white flex-1 h-full">
                      <div className="max-w-md mx-auto">
                        <ul className="flex flex-col gap-6 mt-6">
                          <li>
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                              Features
                            </a>
                          </li>
                          <li>
                            <a href="#how" onClick={() => setIsMenuOpen(false)} className="text-lg text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                              How It Works
                            </a>
                          </li>
                          <li>
                            <a href="#download" onClick={() => setIsMenuOpen(false)} className="text-lg text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                              Download
                            </a>
                          </li>
                          {isAuthenticated ? (
                            <>
                              <li className="pt-4 border-t">
                                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <button onClick={() => {
                                  logout?.()
                                  setIsMenuOpen(false)
                                }} className="flex items-center gap-3 text-lg text-[var(--color-zinc-900)] font-semibold font-sans hover:text-[var(--color-indigo-500)] transition-colors w-full text-left">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                  Logout
                                </button>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="pt-4 border-t">
                                <Link href="/auth/login">
                                  <Button className="w-full bg-[var(--color-indigo-500)] hover:bg-[var(--color-indigo-600)] text-white rounded-lg px-6">Sign In</Button>
                                </Link>
                              </li>
                              <li>
                                <Link href="/auth/signup">
                                  <Button variant="outline" className="w-full border-2 border-[var(--color-indigo-500)] text-[var(--color-indigo-500)] hover:bg-[var(--color-indigo-500)] hover:text-white rounded-lg px-6">
                                    Get Started
                                  </Button>
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--color-zinc-950)] to-[var(--color-zinc-800)] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 py-20 md:py-24">
              <div className="md:w-1/2 lg:w-[55%] text-center md:text-left md:pl-8 lg:pl-16">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold mb-6 leading-tight">
                  Get Things Done with <br className="hidden lg:block" />
                  <span className="text-[var(--color-orange-600)]">AGENDOS</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#8B9DB8] mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
                  The intelligent productivity app that helps you focus, achieve goals, and build lasting habits.
                  Transform your daily tasks into meaningful accomplishments.
                </p>
                {/* Mobile-only Logo */}
                <div className="md:hidden flex justify-center my-8">
                  <div className="w-60 h-60 bg-[var(--color-indigo-500)] rounded-[60px] flex items-center justify-center shadow-2xl animate-float">
                    <AgendosIcon className="w-32 h-32" variant="light" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link href="/auth/signup">
                    <Button className="bg-[var(--color-indigo-500)] hover:bg-[var(--color-indigo-600)] text-white px-8 py-6 text-lg rounded-xl font-heading font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/brand">
                    <Button className="border-2 border-[var(--color-indigo-500)] text-white hover:bg-[var(--color-indigo-600)] hover:text-white px-8 py-6 text-lg rounded-xl font-heading font-bold transition-all hover:-translate-y-1 bg-transparent">
                      View Branding
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Desktop-only Logo */}
              <div className="hidden md:flex md:w-1/2 lg:w-[45%] justify-center md:justify-end lg:pr-12">
                <div className="w-72 h-72 lg:w-[420px] lg:h-[420px] bg-[var(--color-indigo-500)] rounded-[3rem] lg:rounded-[4rem] flex items-center justify-center shadow-2xl animate-float">
                  <AgendosIcon className="w-40 h-40 lg:w-56 lg:h-56" variant="light" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-[var(--color-zinc-50)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-zinc-900)] mb-4">
                Everything You Need to Stay Productive
              </h2>
              <p className="text-base sm:text-lg text-[#8B9DB8]">
                Powerful features designed to help you accomplish more with less stress
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

              {/* Tasks */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path
                      d="M 12,16 L 12,32 M 17,16 L 17,32 M 22,16 L 22,32 M 27,16 L 27,32"
                      stroke="var(--color-orange-600)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="12" cy="10" r="2.5" fill="var(--color-orange-600)" />
                    <circle cx="17" cy="12" r="2.5" fill="var(--color-orange-600)" />
                    <circle cx="22" cy="10" r="2.5" fill="var(--color-orange-600)" />
                    <circle cx="27" cy="12" r="2.5" fill="var(--color-orange-600)" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Tasks</h3>
                <p className="text-[#8B9DB8] text-center">Organize your daily to-dos with smart lists and priorities</p>
              </div>

              {/* Goals */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="15" fill="none" stroke="var(--color-orange-600)" strokeWidth="3" />
                    <circle cx="20" cy="20" r="8" fill="none" stroke="var(--color-orange-600)" strokeWidth="3" />
                    <circle cx="20" cy="20" r="3" fill="var(--color-orange-600)" />
                    <path d="M 28,8 L 32,4" stroke="var(--color-orange-600)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="32" cy="4" r="2" fill="var(--color-orange-600)" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Goals</h3>
                <p className="text-[#8B9DB8] text-center">Set and track meaningful goals with progress visualization</p>
              </div>

              {/* Reminders */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-orange-600)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>

                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Reminders</h3>
                <p className="text-[#8B9DB8] text-center">
                  Never miss important deadlines with smart notifications
                </p>
              </div>


              {/* Analytics */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path
                      d="M 6,28 L 6,19 L 12,16 L 18,22 L 24,14 L 30,11 L 30,28 Z"
                      fill="none"
                      stroke="var(--color-orange-600)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="16" r="2.5" fill="var(--color-orange-600)" />
                    <circle cx="18" cy="22" r="2.5" fill="var(--color-orange-600)" />
                    <circle cx="24" cy="14" r="2.5" fill="var(--color-orange-600)" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Analytics</h3>
                <p className="text-[#8B9DB8] text-center">
                  Visualize your productivity with insightful charts and reports
                </p>
              </div>

              {/* Wellness */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path
                      d="M 20,28 Q 14,23 11,19 Q 9,16 10,13 Q 11,10 14,10 Q 17,10 20,14 Q 23,10 26,10 Q 29,10 30,13 Q 31,16 29,19 Q 26,23 20,28 Z"
                      fill="var(--color-orange-600)"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Wellness</h3>
                <p className="text-[#8B9DB8] text-center">Track health metrics and maintain work-life balance</p>
              </div>

              {/* Habits */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 bg-[var(--color-zinc-800)] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-110 mx-auto">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="14" fill="none" stroke="var(--color-orange-600)" strokeWidth="3" strokeDasharray="15 3" />
                    <path
                      d="M 16,19 L 19,23 L 26,14"
                      fill="none"
                      stroke="var(--color-orange-600)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-zinc-900)] mb-2 text-center">Habits</h3>
                <p className="text-[#8B9DB8] text-center">Build positive routines with streak tracking and rewards</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-zinc-900)] mb-4">How It Works</h2>
              <p className="text-base sm:text-lg text-[#8B9DB8]">Get started in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  num: "1",
                  title: "Create Your Tasks",
                  desc: "Add tasks, set priorities, and organize them into projects. Our smart AI helps categorize and schedule everything automatically.",
                },
                {
                  num: "2",
                  title: "Focus & Execute",
                  desc: "Use Focus Mode to block distractions and work in productive sprints. Track time and stay in the zone with motivating progress rings.",
                },
                {
                  num: "3",
                  title: "Track Progress",
                  desc: "Review your accomplishments with detailed analytics. Celebrate wins, identify patterns, and continuously improve your productivity.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-[var(--color-orange-600)] text-white rounded-full flex items-center justify-center text-2xl font-heading font-extrabold mx-auto mb-6 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-zinc-900)] mb-4">{step.title}</h3>
                  <p className="text-[#8B9DB8] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Preview */}
        <section className="py-20 px-6 bg-gradient-to-br from-[var(--color-indigo-500)] to-[var(--color-indigo-600)] text-white text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold mb-4">Beautiful Design Meets Powerful Functionality</h2>
            <p className="text-base sm:text-lg mb-12 text-white/90">Experience productivity that feels effortless</p>
            <div className="flex justify-center">
              <MobileMockup />
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 px-6 bg-[var(--color-zinc-50)] text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[var(--color-zinc-900)] mb-6">Ready to Get Things Done?</h2>
            <p className="text-base sm:text-lg text-[#8B9DB8] mb-12">Download AGENDOS today and transform the way you work</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                className="bg-[var(--color-zinc-900)] hover:bg-[var(--color-indigo-500)] text-white px-6 py-5 text-base rounded-xl font-semibold font-sans transition-all hover:-translate-y-1 shadow-lg"
                onClick={() => handleFeatureClick("App Store")}
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </Button>
              <Button
                className="bg-[var(--color-zinc-900)] hover:bg-[var(--color-indigo-500)] text-white px-6 py-5 text-base rounded-xl font-semibold font-sans transition-all hover:-translate-y-1 shadow-lg"
                onClick={() => handleFeatureClick("Google Play")}
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-[var(--color-zinc-950)] text-[#8B9DB8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <AgendosLogo variant="dark" className="text-3xl" />
                </div>
                <p className="text-sm">Transform your daily tasks into meaningful accomplishments.</p>
              </div>
              <div>
                <h4 className="text-white font-heading font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#features" className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how" className="hover:text-[var(--color-indigo-500)] transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#download" className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-heading font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-heading font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-[var(--color-indigo-500)] transition-colors">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-[var(--color-zinc-800)] pt-8 text-center text-sm">
              <p>&copy; 2025 AGENDOS. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} featureName={selectedFeature} />
    </>
  )
}
