# Funding Application Form - Quick Reference

## 🚀 Quick Start

1. **Navigate to application**: Click "Start Application" in dashboard
2. **Fill the form**: 8 steps, complete one at a time
3. **Submit**: Final step shows complete review
4. **Check console**: Full payload logged for verification

---

## 📋 The 8 Steps

| Step | Name | Fields | Conditional |
|------|------|--------|-------------|
| 1 | Applicant Info | name, email, contact, applying_as | — |
| 2 | Company Info | company_name, cipc, directors, addresses | If applying_as = Company |
| 3 | App Type | application_type select | — |
| 4 | Event Details | event_name, date, venue, sampra_license, attendance | — |
| 5 | Project Info | about, concept, history, timeline, marketing_roi | — |
| 6 | Documents | id_document, additional_documents (multiple) | — |
| 7 | Quotations | dynamic table with add/remove | — |
| 8 | Review & Submit | summary with edit buttons | — |

---

## 💡 Key Features

- ✅ **Multi-step with progress tracking**
- ✅ **Conditional Step 2** (only if Company)
- ✅ **Dynamic quotation rows** with auto-total
- ✅ **Form validation** per step
- ✅ **File uploads** with preview
- ✅ **Auto-filled email** from auth
- ✅ **Review screen** before submit
- ✅ **Full state management** with useReducer

---

## 🎯 Quotations Feature (Step 7)

**Dynamic Table:**
```
Row 1:  [Name: PA System] [Amount: 5000] [Upload] [Remove]
Row 2:  [Name: Lighting]  [Amount: 3000] [Upload] [Remove]
Row 3:  [Name: Stage]     [Amount: 8000] [Upload] [Remove]
                          TOTAL: 16,000.00
                    [+ Add Quotation]
```

- Add rows: Click "+ Add Quotation"
- Remove rows: Click "Remove" on each row
- Auto-calculate: Total updates in real-time
- Format: Currency (R xxx,xxx.xx)

---

## 🔍 Validation Rules

**Step 1:**
- name_surname: Required
- contact_number: Required
- applying_as: Required

**Step 2 (if Company):**
- company_name: Required
- cipc_registration_number: Required
- cipc_document_upload: Required
- directors: Required
- Both addresses: Required

**Step 3:**
- application_type: Required

**Step 4:**
- All fields required except none

**Step 5:**
- All textarea fields: Required

**Step 6:**
- applicant_id_document: Required

**Step 7:**
- At least 1 quotation required
- Each quotation: name, amount > 0, file required

---

## 🗂️ File Locations

**Main Component:**
- `src/components/funding-form/ApplicationForm.tsx` (600+ lines)

**Step Components:**
- `Step1ApplicantInfo.tsx` - Applicant details
- `Step2CompanyInfo.tsx` - Company (conditional)
- `Step3ApplicationType.tsx` - Type selection
- `Step4EventDetails.tsx` - Event information
- `Step5ProjectInfo.tsx` - Project details
- `Step6Uploads.tsx` - Document uploads
- `Step7Quotations.tsx` - Dynamic quotations
- `Step8ReviewSubmit.tsx` - Final review

**Supporting Files:**
- `reducer.ts` - useReducer logic
- `StepNavigation.tsx` - Progress indicator

**Types:**
- `src/types/application.ts` - All interfaces

**Route:**
- `app/(protected)/apply/page.tsx` - Application page

---

## 📊 State Example

```typescript
// After filling form
{
  step1: {
    name_surname: "John Doe",
    email: "john@example.com",
    contact_number: "+27 123 456 7890",
    alternate_number: "",
    applying_as: "Company"
  },
  step2: {
    company_name: "ABC Music Productions",
    cipc_registration_number: "2024/123456",
    cipc_document_upload: File,
    directors: "John Doe (Director), Jane Smith (Manager)",
    company_postal_address: "123 Main St",
    company_physical_address: "123 Main St"
  },
  step3: {
    application_type: "Music Production"
  },
  step4: {
    event_name: "Annual Festival",
    event_date: "2024-06-15",
    venue: "Johannesburg Civic Centre",
    sampra_license: "Yes",
    estimated_attendance: "500"
  },
  step5: {
    about_applicant: "We are a music production company...",
    project_concept: "Annual music festival...",
    previous_events_history: "We have organized...",
    project_timeline: "January: Planning, February: Promotion...",
    marketing_plan_roi: "Social media campaign, ROI: 200%..."
  },
  step6: {
    applicant_id_document: File,
    additional_documents: [File, File]
  },
  step7: {
    quotations: [
      { id: "q1", quotation_name: "PA System", amount: 5000, file: File },
      { id: "q2", quotation_name: "Lighting", amount: 3000, file: File }
    ]
  }
}
```

---

## 🔗 Navigation

**From Dashboard:**
```
Dashboard Page
├── "Start Application" button
└── → /apply (ApplicationForm)
```

**Within Form:**
```
Step 1 → Step 2 (if Company) → Step 3 → Step 4 → Step 5 → Step 6 → Step 7 → Step 8
↑                                                                           ↓
└─ Back buttons allow going to any previous step ←─ Edit buttons in Step 8
```

---

## 💾 On Submit

**Currently:**
- Logs complete payload to browser console
- Shows success message
- Resets form

**Console Output:**
```
=== FUNDING APPLICATION SUBMISSION ===
Form Data: { ... entire object ... }
Submission Timestamp: "2026-04-12T15:30:00Z"
User: "john@example.com"
========================================
```

---

## ⏸️ Error Handling

**Validation Errors:**
- Shown in red box at top of form
- Lists all validation failures
- Prevents next step
- Clears when resolved

**Example:**
```
Please fix the following errors:
• Name & Surname is required
• Contact Number is required
• Please select Applying As
```

---

## 📱 Responsive

- **Mobile**: Single column, full width
- **Tablet**: Same as mobile
- **Desktop**: Same layout (form is naturally responsive)
- **Progress**: Simplified on mobile, full on desktop

---

## 🎨 Design System

- **Colors**: Blue (#2563eb), Green (#16a34a), Red (#dc2626), Slate theme
- **Spacing**: 6 unit padding, 4 unit gaps
- **Rounded**: lg/2xl borders
- **Shadows**: xl shadows on cards
- **Dark Theme**: Slate 800-900 backgrounds

---

## ✅ Testing Checklist

- [ ] Navigate to /apply
- [ ] Fill Step 1: Individual option
- [ ] Skip Step 2 (Company) automatically
- [ ] Fill Step 3: Select application type
- [ ] Fill Step 4: Enter event details
- [ ] Fill Step 5: Enter project info
- [ ] Fill Step 6: Upload ID document
- [ ] Fill Step 7: Add 3 quotations, verify total
- [ ] Remove middle quotation, verify total updates
- [ ] Step 8: Review all data
- [ ] Edit a section (goes back to that step)
- [ ] Submit and check console
- [ ] Form resets

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't submit | Check for validation errors (red box at top) |
| Step 2 not showing | You selected "Individual", not "Company" |
| Quotation total wrong | Check all quotations have valid amounts > 0 |
| File not uploading | Check file size and format |
| Can't edit section | Try clicking the section number in progress bar |

---

## 📖 File Upload Limits

**Currently (Frontend):**
- No size limits
- Accepts: PDF, JPG, PNG, DOC, DOCX

**Once Backend Ready:**
- Max 10MB per file
- Implement file scanning
- Store in Supabase Storage

---

## 🔮 Future Enhancements

- [ ] Auto-save draft data to localStorage
- [ ] Resume from draft
- [ ] Upload progress bar
- [ ] Duplicate quotation row
- [ ] CSV import for quotations
- [ ] Comparison mode for quotations
- [ ] PDF export of application
- [ ] Email confirmation after submit
- [ ] Application tracking dashboard
- [ ] Admin review interface

---

**Status:** ✅ Ready to Use  
**Last Updated:** April 12, 2026  
**Version:** 1.0
