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
    <section className="bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            <span className="text-red-600">Real</span>{" "}
            <span className="text-slate-900">People,</span>{" "}
            <span className="text-red-600">Real</span>{" "}
            <span className="text-slate-900">Recoveries</span>
          </h2>
          <p className="mt-3 text-slate-700 text-base md:text-lg">
            Hear what our patients have to say about their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="rounded-3xl shadow-xl p-6 bg-white">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Share Your Feedback</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Program <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="program"
                    type="text"
                    value={program}
                    onChange={e => setProgram(e.target.value)}
                    placeholder="Enter your program"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <p className="block text-sm font-medium text-slate-800 mb-1.5">
                    Rating <span className="text-red-600">*</span>
                  </p>
                  {renderStars(rating, true)}
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-800 mb-1.5">
                    Feedback Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={4}
                    value={feedbackMessage}
                    onChange={e => setFeedbackMessage(e.target.value)}
                    placeholder="Write your feedback"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-emerald-700">{success}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-5 py-2.5 transition"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 h-[420px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100">
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
                        className="rounded-2xl shadow-md p-4 bg-slate-50 flex items-start gap-4"
                      >
                        <div className="h-11 w-11 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-base font-semibold shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-slate-900 text-base font-semibold">{item.name}</h4>
                          <p className="text-red-600 text-sm font-medium mt-0.5">{item.program}</p>
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
