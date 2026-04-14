'use client';

import { ApplicationData } from '@/src/types/application';

interface Step5ProjectInfoProps {
  data: ApplicationData['step5'];
  onChange: (updates: Partial<ApplicationData['step5']>) => void;
}

/**
 * Step 5 - Project Information
 * Collect detailed project information via textareas
 */
export default function Step5ProjectInfo({ data, onChange }: Step5ProjectInfoProps) {
  const textareaClass = "w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Project Information</h2>

      {/* About Applicant */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          About You / Your Organization *
        </label>
        <textarea
          value={data.about_applicant}
          onChange={(e) => onChange({ about_applicant: e.target.value })}
          placeholder="Tell us about yourself or your organization..."
          rows={4}
          className={textareaClass}
        />
      </div>

      {/* Project Concept */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Project Concept / Description *
        </label>
        <textarea
          value={data.project_concept}
          onChange={(e) => onChange({ project_concept: e.target.value })}
          placeholder="Describe your project concept in detail..."
          rows={4}
          className={textareaClass}
        />
      </div>

      {/* Previous Events History */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Previous Events / Experience History *
        </label>
        <textarea
          value={data.previous_events_history}
          onChange={(e) => onChange({ previous_events_history: e.target.value })}
          placeholder="List previous events and your experience..."
          rows={4}
          className={textareaClass}
        />
      </div>

      {/* Project Timeline */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Project Timeline / Implementation Plan *
        </label>
        <textarea
          value={data.project_timeline}
          onChange={(e) => onChange({ project_timeline: e.target.value })}
          placeholder="Detail your project timeline and key milestones..."
          rows={4}
          className={textareaClass}
        />
      </div>

      {/* Marketing Plan & ROI */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Marketing Plan & Expected ROI *
        </label>
        <textarea
          value={data.marketing_plan_roi}
          onChange={(e) => onChange({ marketing_plan_roi: e.target.value })}
          placeholder="Describe your marketing strategy and expected return on investment..."
          rows={4}
          className={textareaClass}
        />
      </div>
    </div>
  );
}
