"use client"

import { useEffect, useRef } from "react"

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return
    // Focus confirm by default when opening
    const t = setTimeout(() => {
      confirmRef.current?.focus()
    }, 0)
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onCancel?.()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      clearTimeout(t)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? "confirm-dialog-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => {
          if (!loading) onCancel?.()
        }}
      />

      {/* Dialog panel */}
      <div className="relative z-[61] w-full max-w-md mx-4 rounded-xl border border-gray-800 bg-gray-900 shadow-xl">
        <div className="p-5">
          <h3 id="confirm-dialog-title" className="text-white text-lg font-semibold">
            {title}
          </h3>
          {description ? (
            <p id="confirm-dialog-description" className="text-gray-400 text-sm mt-2">
              {description}
            </p>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              ref={confirmRef}
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
