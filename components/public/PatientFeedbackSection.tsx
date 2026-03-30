"use client"

import { FormEvent, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type FeedbackRow = {
  id: string
  name: string
  program: string
  rating: number
  message: string
  created_at: string
}

export default function PatientFeedbackSection() {
  const [fullName, setFullName] = useState("")
  const [program, setProgram] = useState("")
  const [rating, setRating] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchFeedbacks = async () => {
    const { data, error: fetchError } = await supabase
      .from("feedback")
      .select("id, name, program, rating, message, created_at")
      .order("created_at", { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    setFeedbacks((data as FeedbackRow[]) ?? [])
  }

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setIsLoading(true)
      setError("")
      const { data, error: fetchError } = await supabase
        .from("feedback")
        .select("id, name, program, rating, message, created_at")
        .order("created_at", { ascending: false })

      if (!mounted) return

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setFeedbacks((data as FeedbackRow[]) ?? [])
      }
      setIsLoading(false)
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!fullName.trim() || !program.trim() || !feedbackMessage.trim() || rating < 1) {
      setError("Please fill all required fields and select a rating.")
      return
    }

    setIsSubmitting(true)

    const { error: insertError } = await supabase
      .from("feedback")
      .insert([
        {
          name: fullName.trim(),
          program: program.trim(),
          rating: Number(rating),
          message: feedbackMessage.trim()
        }
      ] as any)

    if (insertError) {
      setError(insertError.message)
      setIsSubmitting(false)
      return
    }

    setFullName("")
    setProgram("")
    setRating(0)
    setFeedbackMessage("")
    await fetchFeedbacks()
    setSuccess("Feedback submitted successfully.")
    setIsSubmitting(false)
  }

  const renderStars = (value: number, interactive = false) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={interactive ? () => setRating(star) : undefined}
          className={interactive ? "text-xl leading-none" : "text-lg leading-none cursor-default"}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <span className={star <= value ? "text-amber-500 font-bold" : "text-slate-300"}>{"\u2605"}</span>
        </button>
      ))}
    </div>
  )

  return (
    <section className="bg-[#F8FAFC] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            <span className="text-teal-600">Real</span>{" "}
            <span className="text-slate-900">People,</span>{" "}
            <span className="text-teal-600">Real</span>{" "}
            <span className="text-slate-900">Recoveries</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            Hear what our patients have to say about their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl md:p-6">
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-slate-900">Share Your Feedback</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Full Name <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="field-base rounded-2xl border-slate-200 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Program <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="program"
                    type="text"
                    value={program}
                    onChange={e => setProgram(e.target.value)}
                    placeholder="Enter your program"
                    className="field-base rounded-2xl border-slate-200 placeholder-slate-400"
                  />
                </div>

                <div>
                  <p className="block text-sm font-medium text-slate-800 mb-1.5">
                    Rating <span className="text-teal-600">*</span>
                  </p>
                  {renderStars(rating, true)}
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Feedback Message <span className="text-teal-600">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={4}
                    value={feedbackMessage}
                    onChange={e => setFeedbackMessage(e.target.value)}
                    placeholder="Write your feedback"
                    className="field-base resize-none rounded-2xl border-slate-200 placeholder-slate-400"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-teal-500">{success}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-btn w-full justify-center rounded-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="h-[420px] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-md [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100 md:p-6">
              {isLoading ? (
                <p className="text-slate-700">Loading feedback...</p>
              ) : (
                <div className="space-y-4">
                  {feedbacks.length === 0 ? (
                    <p className="text-slate-700">No feedback yet. Be the first to share your experience.</p>
                  ) : (
                    feedbacks.map(item => (
                      <article
                        key={item.id}
                        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-base font-semibold text-teal-600">
                          {item.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-slate-900 text-base font-semibold">{item.name}</h4>
                          <p className="mt-0.5 text-sm font-medium text-teal-500">{item.program}</p>
                          <div className="mt-1.5">{renderStars(item.rating)}</div>
                          <p className="mt-2 text-slate-800 leading-relaxed text-sm md:text-base">{item.message}</p>
                          <p className="mt-2 text-slate-500 text-sm">{formatDate(item.created_at)}</p>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
