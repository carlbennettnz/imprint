import React from 'react'
import { WordsSummary } from '../../data/db'

interface SummaryCardProps {
  summary: WordsSummary
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  const total = summary.learned + summary.needsReview + summary.unlearned || 1

  return (
    <div className="bg-white border border-grey-light rounded overflow-hidden flex mb-8">
      {summary.learned ? (
        <div
          className="border-green border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate"
          style={{ width: `${(summary.learned / total) * 100}%` }}
        >
          {summary.learned} words memorised
        </div>
      ) : null}

      {summary.needsReview ? (
        <div
          className="border-orange border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate"
          style={{ width: `${(summary.needsReview / total) * 100}%` }}
        >
          {summary.needsReview} need revision
        </div>
      ) : null}

      {summary.unlearned ? (
        <div
          className="border-gray border-b-8 p-4 whitespace-no-wrap overflow-hidden truncate"
          style={{ width: `${(summary.unlearned / total) * 100}%` }}
        >
          {summary.unlearned} to learn
        </div>
      ) : null}

      {!summary.learned && !summary.needsReview && !summary.unlearned ? (
        <div className="p-4 text-grey-dark w-full text-sm text-center">
          Get started by adding some words
        </div>
      ) : null}
    </div>
  )
}
