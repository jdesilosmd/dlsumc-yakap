import { useState } from "react";
import {
  LayoutDashboard, Map, Cpu, ShieldAlert, ChevronDown, ChevronRight,
  CheckCircle, AlertTriangle, XCircle, Clock, Building2, Users,
  FlaskConical, Stethoscope, FileText, Wifi, Database, Lock,
  MonitorSmartphone, Pill, Microscope, BadgeCheck, Calendar,
  TrendingUp, Info, ArrowRight, Circle, Dot, Receipt, BookOpen,
  ClipboardList, Scale, PackageCheck
} from "lucide-react";

// ── COLOUR TOKENS ────────────────────────────────────────────────────────────
// Strict black-and-white palette per user instruction.
const T = {
  bg: "#FFFFFF",
  surface: "#F7F7F7",
  border: "#D1D1D1",
  borderDark: "#888888",
  ink: "#111111",
  inkMuted: "#555555",
  inkFaint: "#999999",
  black: "#000000",
};

// ── DATA ─────────────────────────────────────────────────────────────────────

const phases = [
  {
    id: 1,
    code: "PHASE 1",
    title: "Internal Gap Analysis & Pre-Assessment",
    duration: "Weeks 1–3",
    lead: "Quality Management / Health Informatics",
    status: "critical",
    steps: [
      {
        sub: "1A",
        label: "Administer SAT YAKAP",
        detail:
          "Complete the PhilHealth Self-Assessment Tool across all departments: primary care, pharmacy, laboratory, radiology, administration. Appoint a dedicated YAKAP Accreditation Coordinator.",
        unit: "All Departments",
        icon: <FileText size={14} />,
      },
      {
        sub: "1B",
        label: "Physical Facility Assessment (Annex A)",
        detail:
          "Audit physical environment: enclosed consultation room, separate examination area, patient toilet, clean water supply, fire extinguisher, no-smoking signage, non-slip flooring, adequate lighting.",
        unit: "Facilities Management",
        icon: <Building2 size={14} />,
      },
      {
        sub: "1C",
        label: "Clinical Workflow Audit",
        detail:
          "Assess readiness for First Patient Encounter (FPE), ICD-10 coding, GAMOT prescription encoding (Annex B.2), lab/diagnostic referrals (Annex B.3), and secondary laboratory referral pathways.",
        unit: "Medical Services / Pharmacy",
        icon: <Stethoscope size={14} />,
      },
    ],
  },
  {
    id: 2,
    code: "PHASE 2",
    title: "Documentary & Regulatory Compliance",
    duration: "Weeks 3–6",
    lead: "Medical Records / Legal & Compliance",
    status: "high",
    steps: [
      {
        sub: "2A",
        label: "Assemble Core Submission Package (Annex C)",
        detail:
          "Provider Data Record, notarized Performance Commitment (dual signature: Head of Facility + Hospital Director), DOH/FDA LTOs (certified true copies), List of Affiliated Physicians, Business Permit, Annex D.1 & D.2 SDS certifications, NDA (Annex E), SAT YAKAP, ₱1,000 accreditation fee receipt.",
        unit: "Legal & Compliance / Medical Records",
        icon: <FileText size={14} />,
      },
      {
        sub: "2B",
        label: "General Information Sheet (SEC-GIS)",
        detail:
          "If DLSUMC is constituted as a corporation, submit an updated SEC General Information Sheet per PhilHealth Advisory No. 2025-0055.",
        unit: "Legal Office / Corporate Secretary",
        icon: <BadgeCheck size={14} />,
      },
    ],
  },
  {
    id: 3,
    code: "PHASE 3",
    title: "Health IT & Systems Readiness",
    duration: "Weeks 4–9 (parallel with Phase 2)",
    lead: "Health Informatics / IT Department",
    status: "critical",
    steps: [
      {
        sub: "3A",
        label: "EMR Selection & Declaration (Deadline: Apr 1, 2026)",
        detail:
          "Evaluate and procure a PhilHealth-certified EMR with YAKAP API v1.1. Formally declare chosen provider to PhilHealth by April 1, 2026 (internal deadline: March 25, 2026). Decommission legacy eKonsulta before July 2026.",
        unit: "Health Informatics / CIO",
        icon: <Database size={14} />,
      },
      {
        sub: "3B",
        label: "API Integration & GAMOT Physician Nomination",
        detail:
          "Configure and test PhilHealth YAKAP API v1.1 in staging. Nominate up to four (4) GAMOT Authorized Physicians per PA 2026-0009. All nominees must be PhilHealth-accredited.",
        unit: "Health Informatics / Medical Staff Office",
        icon: <Wifi size={14} />,
      },
      {
        sub: "3C",
        label: "Data Privacy & Security Compliance",
        detail:
          "Execute NDA (Annex E) for all staff accessing PhilHealth data. Conduct PIC review of EMR system. Register with NPC under the Data Privacy Act of 2012. Implement role-based access controls.",
        unit: "Health Informatics / Data Privacy Officer",
        icon: <Lock size={14} />,
      },
      {
        sub: "3D",
        label: "Infrastructure & Connectivity",
        detail:
          "Upgrade to minimum 25–100 Mbps dedicated internet line for the YAKAP unit. Provision workstations/tablets in consultation room and pharmacy. Assess UPS/generator backup for the YAKAP primary care area.",
        unit: "IT Department / Facilities",
        icon: <MonitorSmartphone size={14} />,
      },
    ],
  },
  {
    id: 4,
    code: "PHASE 4",
    title: "Submission & Inspection Preparation",
    duration: "Weeks 9–14",
    lead: "Hospital Director's Office / Compliance",
    status: "medium",
    steps: [
      {
        sub: "4A",
        label: "Pre-Submission Internal Review",
        detail:
          "Final completeness audit of all Annex documents. Verify dual signatures on Performance Commitment. Confirm no licenses expire within 3 months of submission date. Arrange documents per Annex C order.",
        unit: "YAKAP Coordinator / Compliance",
        icon: <CheckCircle size={14} />,
      },
      {
        sub: "4B",
        label: "Submission to LHIO / PhilHealth Regional Office",
        detail:
          "Submit complete package to PRO/LHIO for DLSUMC's catchment area. Pay ₱1,000 accreditation fee and retain official receipt. Request formal acknowledgment and evaluation timeline.",
        unit: "YAKAP Coordinator",
        icon: <ArrowRight size={14} />,
      },
      {
        sub: "4C",
        label: "On-Site Validation Preparation",
        detail:
          "Brief all front-line staff on YAKAP workflows. Post mandatory signage. Conduct mock inspection with Quality Management as internal surveyors. Designate YAKAP Coordinator as PRO escort.",
        unit: "YAKAP Coordinator / QMD",
        icon: <Building2 size={14} />,
      },
      {
        sub: "4D",
        label: "Post-Accreditation: Empanelment Activation",
        detail:
          "Activate YAKAP empanelment module in PhilHealth portal. Commence empanelment using YES/MCA (Circular No. 2025-0017). Submit GAMOT Authorized Physicians list per PA 2026-0009.",
        unit: "YAKAP Coordinator / Medical Staff",
        icon: <BadgeCheck size={14} />,
      },
    ],
  },
];

const emrMatrix = [
  {
    category: "EMR CERTIFICATION",
    items: [
      { label: "YAKAP API v1.1 Certification", status: "critical", note: "Must be PhilHealth-certified; verify current certification validity." },
      { label: "eKonsulta Migration (Jul 2026)", status: "critical", note: "Legacy system shutdown is non-negotiable; no fallback available." },
      { label: "EMR Declaration to PhilHealth", status: "critical", note: "Hard deadline April 1, 2026. Internal deadline March 25, 2026." },
    ],
  },
  {
    category: "API & DATA INTEGRATION",
    items: [
      { label: "PhilHealth Backend Submission (Encounters)", status: "critical", note: "Electronic submission of FPE, ongoing encounters, ICD-10 codes." },
      { label: "GAMOT Application Integration", status: "high", note: "Prescription encoding linked to Annex B.2 drug list via certified EMR." },
      { label: "Laboratory Result Submission", status: "high", note: "Electronic result submission per Annex B.3 diagnostic checklist." },
      { label: "Staging Environment API Testing", status: "high", note: "Full API test in staging before operational go-live." },
    ],
  },
  {
    category: "DATA PRIVACY & SECURITY",
    items: [
      { label: "NPC Registration (Data Privacy Act 2012)", status: "high", note: "Register data processing system with National Privacy Commission." },
      { label: "Role-Based Access Controls (RBAC)", status: "high", note: "Restrict beneficiary data to authorized clinical/admin personnel." },
      { label: "Audit Trails & Patient Consent Documentation", status: "high", note: "Required under Annex E NDA and PhilHealth compliance standards." },
      { label: "NDA Execution (Annex E)", status: "high", note: "All staff accessing PhilHealth data must sign prior to go-live." },
    ],
  },
  {
    category: "INFRASTRUCTURE",
    items: [
      { label: "Dedicated Internet (25–100 Mbps)", status: "high", note: "Dedicated line for YAKAP primary care unit. Shared lines are insufficient." },
      { label: "Workstation/Tablet Provisioning", status: "medium", note: "Consultation room and pharmacy require real-time EMR encoding hardware." },
      { label: "UPS / Generator Backup", status: "medium", note: "Prevent data loss and submission failures during power interruptions." },
    ],
  },
  {
    category: "GAMOT PHYSICIAN NOMINATION",
    items: [
      { label: "Nominate ≤4 Authorized Physicians (PA 2026-0009)", status: "high", note: "All nominees must be PhilHealth-accredited and affiliated with YAKAP clinic." },
      { label: "GAMOT Application Access Setup", status: "high", note: "Enable physician access for electronic prescription under GAMOT benefit." },
    ],
  },
];

const risks = [
  {
    id: "R1",
    severity: "critical",
    title: "Expired or Lapsed DOH / FDA Licenses & LTOs",
    description:
      "Submission of expired hospital licenses, pharmacy FDA LTO, laboratory DOH license, or x-ray unit license is the most frequent cause of outright application rejection. PhilHealth will not process any application with an expired license at time of submission.",
    source: "Annex C; PA 2025-0055",
    mitigation:
      "Immediately audit expiration dates for all required licenses and LTOs. Initiate renewal proceedings at least eight (8) weeks before the target submission date to accommodate DOH and FDA processing times.",
    owner: "Compliance Officer / Legal Office",
  },
  {
    id: "R2",
    severity: "critical",
    title: "Non-Compliant or Incorrectly Signed Performance Commitment",
    description:
      "The Performance Commitment (PC) must be notarized and co-signed by both (a) the Head of Facility or designated YAKAP lead and (b) the Hospital Director. A single signature, unauthorized signatory, or absent notarization results in automatic rejection with no exception.",
    source: "Annex C",
    mitigation:
      "Route the PC through the Legal Office and Hospital Director's Office for review, dual signature, and notarization at least two (2) weeks before submission. The Hospital Director's signature is mandatory — delegate authority for this cannot be applied.",
    owner: "Hospital Director / Legal Office",
  },
  {
    id: "R3",
    severity: "critical",
    title: "Failure to Meet the April 1, 2026 EMR Declaration Deadline",
    description:
      "All YAKAP clinics must formally declare a PhilHealth-certified EMR provider by April 1, 2026. Missed declaration disrupts YAKAP data submission and delays or suspends capitation payments. The legacy eKonsulta system ceases all operations in July 2026, with no fallback available.",
    source: "PA 2025-0077; YAKAP 2026 EMR Mandate",
    mitigation:
      "Treat EMR vendor selection and PhilHealth declaration as a standalone critical-path initiative. Internal hard-close deadline: March 25, 2026. Assign the CIO and YAKAP Coordinator as joint accountable officers for this deliverable.",
    owner: "CIO / YAKAP Coordinator",
  },
  {
    id: "R4",
    severity: "high",
    title: "SAT YAKAP / Facility Discrepancy at On-Site Validation",
    description:
      "If submitted SAT YAKAP scores are inconsistent with the actual physical facility at time of PRO on-site validation, PhilHealth may deny accreditation and require full remediation before re-application. Most common discrepancies: separate consultation vs. examination area, and fire safety certification status.",
    source: "SAT YAKAP; Annex A Physical Standards",
    mitigation:
      "Conduct an internal mock inspection using the SAT YAKAP as the primary audit checklist, with the Quality Management Department acting as internal surveyors, before finalizing and submitting the accreditation package. Ensure all declared facility conditions are physically verifiable.",
    owner: "YAKAP Coordinator / QMD",
  },
];

const docReqs = [
  { doc: "Provider Data Record (PDR)", note: "Completely filled; covers all primary care physicians", annex: "Annex C" },
  { doc: "Performance Commitment (Notarized)", note: "Dual signature: Head of Facility + Hospital Director", annex: "Annex C" },
  { doc: "DOH / FDA License / LTO (CTC)", note: "Certified true copy; must be current", annex: "Annex C" },
  { doc: "List of Affiliated Physicians", note: "Names, PRC numbers, specializations", annex: "Annex C" },
  { doc: "Business Permit / Mayor's Permit", note: "Current; per DILG MC 2016-170", annex: "Annex C" },
  { doc: "SDS — Laboratory & Diagnostics", note: "Annex D.1 from DOH-licensed lab and Level 1 X-ray", annex: "Annex D.1" },
  { doc: "SDS — Medicines", note: "Annex D.2 from FDA-licensed drug outlet", annex: "Annex D.2" },
  { doc: "Non-Disclosure Agreement (NDA)", note: "Signed by all staff accessing PhilHealth data", annex: "Annex E" },
  { doc: "SAT YAKAP (Self-Assessment Tool)", note: "Signed by Facility Head", annex: "SAT YAKAP" },
  { doc: "Accreditation Fee Receipt (₱1,000)", note: "Official receipt from PhilHealth PRO cashier", annex: "Annex C" },
];

const pillars = [
  { code: "KONSULTA", label: "Primary Care Consultations", icon: <Stethoscope size={18} />, desc: "Physical examinations, preventive care, ongoing consultations" },
  { code: "GAMOT", label: "Essential Medicines", icon: <Pill size={18} />, desc: "Electronic prescription via GAMOT App; Annex B.2 drug list" },
  { code: "LABORATORYO", label: "Lab & Diagnostic Services", icon: <Microscope size={18} />, desc: "In-house or accredited partner; Annex B.3 checklist" },
  { code: "SCREEN", label: "Preventive Cancer Screenings", icon: <FlaskConical size={18} />, desc: "Qualified beneficiaries; DOH-licensed services" },
];

const immediateActions = [
  { week: "Week 1", action: "Approve appointment of YAKAP Accreditation Coordinator", owner: "Hospital Director" },
  { week: "Week 1", action: "Direct IT to initiate EMR vendor evaluation; internal decision ", owner: "Director + CIO" },
  { week: "Weeks 1–2", action: "Audit all license and LTO expiration dates", owner: "Compliance Officer" },
  { week: "Weeks 2–3", action: "Approve budget line for EMR, facility upgrades, staff training", owner: "Director + CFO" },
  { week: "Week 3", action: "Sign and notarize Performance Commitment after Legal Office review", owner: "Hospital Director" },
  { week: "Week 4", action: "Formally declare EMR provider to PhilHealth prior to April 1 deadline", owner: "YAKAP Coord. + IT" },
  { week: "Weeks 4–6", action: "Complete all Annex documents; submit accreditation package", owner: "YAKAP Coordinator" },
  { week: "Weeks 9–14", action: "On-site validation preparation; staff training; mock inspection", owner: "YAKAP Coord. + QMD" },
  { week: "Post-approval", action: "Activate empanelment; submit GAMOT physician nominations (PA 2026-0009)", owner: "YAKAP Coordinator" },
];

// ── CO-PAY & SUPPLEMENTAL DATA ────────────────────────────────────────────────

const copayRules = [
  {
    rule: "Maximum Annual Co-pay",
    value: "₱900 per member per year",
    note: "This is an absolute ceiling — not per service, per consultation, or per visit. Once a member has paid ₱900 in co-pay for the calendar year, no further co-pay may be collected for any YAKAP service.",
    source: "PA 2025-0057",
    critical: true,
  },
  {
    rule: "Co-pay Basis",
    value: "Annual (per calendar year), NOT per service",
    note: "A patient who visits DLSUMC YAKAP three times in a year may be charged co-pay only up to the ₱900 annual cap across all visits combined — not ₱900 per visit.",
    source: "PA 2025-0057",
    critical: true,
  },
  {
    rule: "Public vs. Private Facility",
    value: "Private facilities may collect co-pay; public facilities may NOT",
    note: "As a private hospital, DLSUMC is eligible to collect co-pay under PA 2025-0057. Public YAKAP clinics (LGU, government hospitals) are prohibited from collecting any out-of-pocket payment from YAKAP beneficiaries.",
    source: "PA 2025-0057; PA 2026-0003",
    critical: true,
  },
  {
    rule: "Capitation Rate (Context)",
    value: "₱1,700 per empaneled patient per year",
    note: "PhilHealth provides ₱1,700 per enrolled patient per year as the capitation fund. For private facilities, this ₱1,700 capitation from PhilHealth plus the up-to-₱900 co-pay from the patient constitutes the total maximum YAKAP revenue per patient annually.",
    source: "PhilHealth YAKAP 2025; PIA NCR",
    critical: false,
  },
  {
    rule: "Prohibited Co-pay Practices",
    value: "Cannot charge for services within the covered YAKAP package",
    note: "Additional charges may only apply if the member requests a service explicitly not covered by the YAKAP benefit package. Charging co-pay for covered services above the ₱900 annual cap is a compliance violation subject to sanctions.",
    source: "PA 2025-0057; PA 2026-0003",
    critical: true,
  },
  {
    rule: "Transparency Requirement",
    value: "Co-pay policy must be disclosed to patients before service",
    note: "Patients must be informed of the co-pay amount before availing services. The facility's co-pay policy should be posted visibly and included in the patient benefit flow signage per PA 2026-0020.",
    source: "PA 2025-0057; PA 2026-0020",
    critical: false,
  },
];

const copayImplementation = [
  {
    step: "01",
    action: "Establish a YAKAP Co-pay Registry",
    detail: "Create a per-patient annual co-pay tracking record (either within the EMR or a separate ledger) to monitor cumulative co-pay collected per member per calendar year. This registry is critical to prevent exceeding the ₱900 annual cap.",
    unit: "Billing / Medical Records / EMR Administrator",
  },
  {
    step: "02",
    action: "Configure the Certified EMR for Co-pay Tracking",
    detail: "Work with the PhilHealth-certified EMR vendor to embed the ₱900 annual co-pay ceiling as a hard limit in the billing module. The system should alert staff when a patient approaches or reaches the annual cap and block further collection.",
    unit: "Health Informatics / EMR Vendor",
  },
  {
    step: "03",
    action: "Draft and Post the Co-pay Policy Notice",
    detail: "Prepare a bilingual (Filipino/English) co-pay disclosure notice stating the ₱900 annual cap and the breakdown of when co-pay applies. Post at the YAKAP reception area alongside mandatory YAKAP signage per PA 2026-0020.",
    unit: "Administration / YAKAP Coordinator",
  },
  {
    step: "04",
    action: "Train Billing and Reception Staff",
    detail: "Conduct a focused training session for all billing clerks and reception staff on: (a) the annual cap rule, (b) how to check the patient's cumulative co-pay balance before collection, and (c) the prohibited practice of charging co-pay for covered YAKAP services.",
    unit: "YAKAP Coordinator / Finance",
  },
  {
    step: "05",
    action: "Issue Official Receipts for Co-pay Collection",
    detail: "All co-pay collected must be receipted with an official OR that specifies the amount, the service date, and the patient's remaining annual cap balance. Retain receipts as part of the patient's YAKAP record for compliance verification.",
    unit: "Billing / Cashier",
  },
  {
    step: "06",
    action: "Perform Monthly Co-pay Compliance Audit",
    detail: "Assign the YAKAP Coordinator or internal audit to monthly review all co-pay transactions against the per-patient annual registry. Flag any patient whose cumulative co-pay exceeds ₱900 and initiate corrective action (refund if applicable) before PhilHealth monitoring or on-site validation.",
    unit: "YAKAP Coordinator / Internal Audit",
  },
];

const supplementalConsiderations = [
  {
    category: "CAPITATION PAYMENT MECHANICS",
    icon: <Receipt size={16} />,
    items: [
      {
        title: "Two-Tranche Payment Structure",
        detail: "YAKAP capitation is paid in two tranches. The first tranche (approx. 40%) is released upon submission of the First Patient Encounter (FPE) data. The second tranche (approx. 60%) requires complete annual submission of encounter data, lab results, and GAMOT prescriptions. Incomplete submission = first tranche only.",
        source: "PC 2025-0017; SeriousMD 2026",
        priority: "critical",
      },
      {
        title: "SAP 2 Data Deadline: March 31 (Annual)",
        detail: "The second tranche submission (SAP 2) for the preceding calendar year has a hard annual deadline of March 31. There is no grace period. Missing this deadline means forfeiting the second-tranche payment for all affected patients. Encoding backlogs are the leading operational cause of missed SAP 2 deadlines.",
        source: "PA 2026-0005; PA 2026-0008",
        priority: "critical",
      },
      {
        title: "FPE Required in Year 1 Only",
        detail: "In the patient's first year at DLSUMC YAKAP, a completed FPE is mandatory. From Year 2 onward, the FPE is no longer required — at least one (1) consultation per year is sufficient to qualify the patient for continued capitation.",
        source: "PC 2025-0017",
        priority: "high",
      },
      {
        title: "PCU Liveness Check Required After Every Encounter",
        detail: "Per PA 2025-0077 and PA 2025-0072, the PhilHealth Check Utility (PCU) Liveness Check must be performed after every patient encounter and is required for SAP 1 payment processing. The YES/MCA must also be completed after the FPE for new and rolled-over members.",
        source: "PA 2025-0077; PA 2025-0072",
        priority: "critical",
      },
    ],
  },
  {
    category: "GAMOT BENEFIT — OPERATIONAL DETAILS",
    icon: <Pill size={16} />,
    items: [
      {
        title: "GAMOT Covers 75 Medicine Types, Up to ₱20,000/Year",
        detail: "PhilHealth GAMOT (PC 2025-0013, supplemented by PC 2026-0002) covers 75 types of essential medicines per beneficiary per year, with a combined ceiling of ₱20,000. This expands on the original 21 medicines under Konsulta. The complete formulary is in Annex B.2 (GAMOT.xlsx).",
        source: "PC 2025-0013; PC 2026-0002",
        priority: "high",
      },
      {
        title: "Prescriptions Must Use Generic Names (RA 6675)",
        detail: "GAMOT prescriptions must use the generic name of medicines in compliance with RA 6675 (Generics Act). The GAMOT Application auto-generates a Unique Prescription Security Code (UPSC) for each prescription, which is required for dispensing at partner GAMOT facilities.",
        source: "PC 2025-0013",
        priority: "high",
      },
      {
        title: "Pharmacist Compliance: Medication Safety Required",
        detail: "PA 2025-0069 (Strict Adherence to Medication Safety and Pharmacist Responsibilities under GAMOT) mandates that licensed pharmacists must dispense GAMOT medicines and ensure patient counseling. Delegation to non-licensed personnel is non-compliant and may result in sanctions.",
        source: "PA 2025-0069",
        priority: "critical",
      },
      {
        title: "21 Essential Medicines Continuously Available (PA 2026-0007)",
        detail: "PA 2026-0007 confirms that the original 21 YAKAP essential medicines remain continuously available even as the full 75-medicine GAMOT formulary rolls out regionally. DLSUMC pharmacy must maintain stock of all 21 core medicines at all times as a baseline requirement.",
        source: "PA 2026-0007",
        priority: "high",
      },
      {
        title: "GAMOT App Access — Physician Nomination Before Launch",
        detail: "Authorized Physicians must be nominated and their GAMOT App accounts must be active before DLSUMC can begin dispensing under the GAMOT benefit. Per PA 2026-0017, YAKAP clinic readiness for GAMOT — including physician nomination and EMR integration — must be confirmed before the regional GAMOT rollout date.",
        source: "PA 2026-0017; PA 2026-0009",
        priority: "critical",
      },
    ],
  },
  {
    category: "FACILITY & EMPANELMENT REQUIREMENTS",
    icon: <Building2 size={16} />,
    items: [
      {
        title: "Fixed & Permanent Physical Clinic Required (PA 2026-0023)",
        detail: "PA 2026-0023 explicitly prohibits YAKAP empanelment activities by Mobile Health Units and Telemedicine Providers unless operating under a formal partnership with an accredited fixed YAKAP clinic. DLSUMC's YAKAP unit must be a fixed, permanent physical facility — temporary or mobile setups cannot serve as the primary empanelment location.",
        source: "PA 2026-0023",
        priority: "critical",
      },
      {
        title: "Sanctions for Empanelment Violations (Three-Strike Rule)",
        detail: "PA 2026-0023 imposes a three-strike sanction regime: (1) first violation = written warning; (2) second violation = final warning; (3) third violation = suspension of YAKAP accreditation. Violations include unauthorized mobile empanelment, telemedicine-based empanelment without a partnership, and empanelment not following PC 2025-0017 protocols.",
        source: "PA 2026-0023",
        priority: "high",
      },
      {
        title: "YAKAP Signage Specifications (PA 2026-0020)",
        detail: "PA 2026-0020 provides supplemental, specific signage specifications for YAKAP facilities. Level 1–3 hospitals operating a YAKAP unit (as DLSUMC does) must display both the standard PhilHealth signage (per Circular 0013, s. 2009) AND the YAKAP-specific signage. Stand-alone YAKAP clinics need only the YAKAP signage. Non-compliance is monitored and reflected in accreditation status.",
        source: "PA 2026-0020; PA 2025-0061",
        priority: "high",
      },
      {
        title: "Settings-Based & Community Empanelment (PA 2026-0014)",
        detail: "PA 2026-0014 clarifies the rules for settings-based (e.g., workplace) and community-based YAKAP empanelment activities. Both modes are permitted but require coordination with the LHIO. DLSUMC should explore settings-based empanelment with partner organizations to accelerate patient panel growth.",
        source: "PA 2026-0014",
        priority: "medium",
      },
    ],
  },
  {
    category: "PATIENT RIGHTS & TRANSPARENCY",
    icon: <Scale size={16} />,
    items: [
      {
        title: "Member Rights Under YAKAP (PA 2026-0003)",
        detail: "PA 2026-0003 enumerates patient rights: (1) right to free YAKAP services at public facilities; (2) right to be informed of co-pay before service at private facilities; (3) right to continuous and appropriate primary care per PhilHealth guidelines; (4) right to sign the YAKAP Empanelment Slip. DLSUMC staff must be briefed on these rights as a patient relations requirement.",
        source: "PA 2026-0003",
        priority: "high",
      },
      {
        title: "Annual Empanelment Slip (YES) Renewal Required",
        detail: "PA 2025-0071 requires enrolled members to sign a YAKAP Empanelment Slip (YES/MCA) for continuous benefit access. Per PA 2025-0072, both the PCU Liveness Check and the YES are required for new and rolled-over members to qualify for SAP 1 payment. Missing YES = payment disruption.",
        source: "PA 2025-0071; PA 2025-0072",
        priority: "critical",
      },
    ],
  },
];

// ── CO-PAY & SUPPLEMENTAL DATA ────────────────────────────────────────────────



const StatusBadge = ({ status }) => {
  const map = {
    critical: { label: "CRITICAL", bg: "#000", color: "#fff" },
    high: { label: "HIGH", bg: "#333", color: "#fff" },
    medium: { label: "MEDIUM", bg: "#888", color: "#fff" },
    low: { label: "LOW", bg: "#ccc", color: "#000" },
  };
  const s = map[status] || map.medium;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.12em",
        padding: "2px 7px",
        borderRadius: 2,
        fontFamily: "monospace",
      }}
    >
      {s.label}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === "critical") return <XCircle size={15} color="#000" />;
  if (status === "high") return <AlertTriangle size={15} color="#444" />;
  return <CheckCircle size={15} color="#888" />;
};

// ── VIEWS ─────────────────────────────────────────────────────────────────────

function ExecutiveDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Header block */}
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 20 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.18em", color: T.inkMuted, marginBottom: 6, textTransform: "uppercase" }}>
          Executive Discussion Brief  ·  March 2026  ·  Confidential
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: T.black, lineHeight: 1.2, margin: 0 }}>
          PhilHealth YAKAP Accreditation
        </h1>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: T.inkMuted, marginTop: 4 }}>
          Yaman ng Kalusugan Program  ·  De La Salle University Medical Center
        </div>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span style={{ border: `1px solid ${T.black}`, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.06em" }}>
            RA 11223 – Universal Health Care Act
          </span>
          <span style={{ border: `1px solid ${T.black}`, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.06em" }}>
            Supersedes Konsulta Program (July 2025)
          </span>
          <span style={{ background: T.black, color: T.bg, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.06em" }}>
            ⚠ EMR Deadline: Apr 1, 2026
          </span>
        </div>
      </div>

      {/* YAKAP Benefit Pillars */}
      <div>
        <SectionLabel>YAKAP Benefit Pillars</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {pillars.map((p) => (
            <div key={p.code} style={{ border: `1px solid ${T.border}`, padding: 16, display: "flex", flexDirection: "column", gap: 8, background: T.surface }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {p.icon}
                <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>{p.code}</span>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600, color: T.black }}>{p.label}</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 11, color: T.inkMuted, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Focus Areas */}
      <div>
        <SectionLabel>Resource & Budget Focus Areas</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { icon: <Building2 size={20} />, label: "Infrastructure & Equipment", items: ["YAKAP consultation room (enclosed)", "Separate examination bay", "Fire safety certification", "Mandatory facility signage (PA 2026-0020)"], priority: "Critical" },
            { icon: <Cpu size={20} />, label: "Information Systems & EMR", items: ["PhilHealth-certified EMR (API v1.1)", "eKonsulta migration (Jul 2026)", "25–100 Mbps dedicated internet", "Workstations / tablets"], priority: "Critical — Apr 1" },
            { icon: <Users size={20} />, label: "Human Resources & Training", items: ["YAKAP Accreditation Coordinator", "Physician YAKAP orientation", "Pharmacy GAMOT App training", "Data Privacy orientation + NDAs"], priority: "High" },
          ].map((c) => (
            <div key={c.label} style={{ border: `1px solid ${T.border}`, padding: 18, background: T.bg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                {c.icon}
                <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}>{c.label}</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <StatusBadge status={c.priority === "Critical — Apr 1" ? "critical" : c.priority === "Critical" ? "critical" : "high"} />
              </div>
              <ul style={{ margin: 0, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                {c.items.map((it) => (
                  <li key={it} style={{ fontFamily: "sans-serif", fontSize: 11, color: T.inkMuted, lineHeight: 1.5 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Capitation Model Note */}
      <div style={{ border: `1px solid ${T.black}`, padding: 20, background: T.black, color: T.bg }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", marginBottom: 8, color: "#aaa" }}>STRATEGIC RATIONALE</div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
          YAKAP accreditation establishes DLSUMC as an empanelment-eligible facility, authorizing receipt of PhilHealth-enrolled beneficiaries as a primary care home. The capitation payment model provides predictable, per-patient annual income decoupled from individual claim submissions — stabilizing primary care revenue while incentivizing preventive health and continuity of care over episodic treatment.
        </p>
      </div>

      {/* Immediate Actions */}
      <div>
        <SectionLabel>Immediate Next Steps for the Hospital Director</SectionLabel>
        <div style={{ border: `1px solid ${T.border}` }}>
          {immediateActions.map((a, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 160px", borderBottom: i < immediateActions.length - 1 ? `1px solid ${T.border}` : "none", padding: "10px 14px", alignItems: "center", gap: 12, background: i % 2 === 0 ? T.bg : T.surface }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: a.week === "By Week 4" || a.week === "This week" ? T.black : T.inkMuted, letterSpacing: "0.06em" }}>{a.week}</span>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: T.ink, lineHeight: 1.4 }}>{a.action}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: T.inkMuted, textAlign: "right" }}>{a.owner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationRoadmap() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 16 }}>
        <SectionLabel noMargin>Application Roadmap</SectionLabel>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.inkMuted, marginTop: 8, lineHeight: 1.6 }}>
          Four sequential phases. Estimated total lead time: 10–14 weeks from initiation to Certificate of Accreditation.
          Phases 2 and 3 may be executed in parallel from Week 4 onward.
        </p>
      </div>

      {/* Documentary Requirements Table (collapsed by default) */}
      <details style={{ border: `1px solid ${T.border}`, padding: 0 }}>
        <summary style={{ cursor: "pointer", padding: "10px 16px", fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", background: T.surface, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>ANNEX C — MANDATORY DOCUMENTARY REQUIREMENTS (10 items)</span>
          <ChevronDown size={14} />
        </summary>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: 11 }}>
            <thead>
              <tr style={{ background: T.black, color: T.bg }}>
                <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, letterSpacing: "0.05em" }}>Document</th>
                <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, letterSpacing: "0.05em" }}>Requirement</th>
                <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, letterSpacing: "0.05em" }}>Source</th>
              </tr>
            </thead>
            <tbody>
              {docReqs.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? T.bg : T.surface, borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600, color: T.ink }}>{r.doc}</td>
                  <td style={{ padding: "8px 12px", color: T.inkMuted }}>{r.note}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 10, color: T.inkFaint }}>{r.annex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* Phase stepper */}
      <div style={{ position: "relative" }}>
        {/* Vertical rail */}
        <div style={{ position: "absolute", left: 23, top: 28, bottom: 28, width: 1, background: T.border, zIndex: 0 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {phases.map((phase, idx) => {
            const isOpen = expanded === phase.id;
            return (
              <div key={phase.id} style={{ position: "relative", zIndex: 1, marginBottom: 16 }}>
                {/* Phase header button */}
                <button
                  onClick={() => toggle(phase.id)}
                  style={{
                    width: "100%",
                    background: isOpen ? T.black : T.bg,
                    color: isOpen ? T.bg : T.ink,
                    border: `1px solid ${isOpen ? T.black : T.border}`,
                    cursor: "pointer",
                    padding: "14px 16px 14px 52px",
                    textAlign: "left",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s",
                  }}
                >
                  {/* Phase number circle */}
                  <div style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: isOpen ? T.bg : T.black,
                    color: isOpen ? T.black : T.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    border: `1px solid ${T.black}`,
                    flexShrink: 0,
                  }}>
                    {phase.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", opacity: 0.7 }}>{phase.code}</span>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700 }}>{phase.title}</span>
                      <StatusBadge status={phase.status} />
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, marginTop: 3, opacity: 0.65, letterSpacing: "0.06em" }}>
                      {phase.duration}  ·  {phase.lead}
                    </div>
                  </div>
                  <div style={{ marginLeft: 12, flexShrink: 0 }}>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>

                {/* Phase detail panel */}
                {isOpen && (
                  <div style={{ border: `1px solid ${T.black}`, borderTop: "none", background: T.surface, padding: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {phase.steps.map((step) => (
                        <div key={step.sub} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 12, borderBottom: `1px solid ${T.border}`, paddingBottom: 12 }}>
                          <div style={{ textAlign: "center", paddingTop: 2 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: T.inkMuted, letterSpacing: "0.06em" }}>{step.sub}</span>
                            <div style={{ marginTop: 6, display: "flex", justifyContent: "center" }}>{step.icon}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: T.black, marginBottom: 4 }}>{step.label}</div>
                            <div style={{ fontFamily: "sans-serif", fontSize: 12, color: T.inkMuted, lineHeight: 1.6, marginBottom: 6 }}>{step.detail}</div>
                            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.inkFaint, letterSpacing: "0.05em" }}>Lead Unit: {step.unit}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EMRMatrix() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 16 }}>
        <SectionLabel noMargin>Health IT & EMR Integration Matrix</SectionLabel>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.inkMuted, marginTop: 8, lineHeight: 1.6 }}>
          2026 YAKAP technical compliance requirements. EMR declaration to PhilHealth is mandatory by April 1, 2026. The legacy eKonsulta system ceases all operations in July 2026 with no available fallback.
        </p>
      </div>

      {/* Critical deadline banner */}
      <div style={{ background: T.black, color: T.bg, padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 4 }}>CRITICAL DEADLINE — APRIL 1, 2026</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, lineHeight: 1.6, color: "#ddd" }}>
            All YAKAP clinics must formally declare their chosen PhilHealth-certified EMR provider to PhilHealth by April 1, 2026. Internal hard-close deadline: <strong style={{ color: "#fff" }}>March 25, 2026</strong> to allow internal approval lead time. Failure to declare will disrupt YAKAP data submission workflows and delay capitation payment processing.
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, fontFamily: "monospace", fontSize: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><XCircle size={13} /><span>CRITICAL</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><AlertTriangle size={13} /><span>HIGH</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><CheckCircle size={13} style={{ color: T.inkMuted }} /><span>MEDIUM</span></div>
      </div>

      {/* Matrix categories */}
      {emrMatrix.map((cat) => (
        <div key={cat.category} style={{ border: `1px solid ${T.border}` }}>
          <div style={{ background: T.black, color: T.bg, padding: "8px 14px", fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em" }}>
            {cat.category}
          </div>
          {cat.items.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr auto", gap: 12, padding: "11px 14px", borderBottom: i < cat.items.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start", background: i % 2 === 0 ? T.bg : T.surface }}>
              <div style={{ paddingTop: 1 }}>
                <StatusIcon status={item.status} />
              </div>
              <div>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, color: T.black, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: T.inkMuted, lineHeight: 1.5 }}>{item.note}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* GAMOT Application detail */}
      <div style={{ border: `1px solid ${T.border}`, padding: 20 }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, marginBottom: 10 }}>GAMOT APPLICATION — KEY PARAMETERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontFamily: "sans-serif", fontSize: 12 }}>
          {[
            ["Advisory", "PA 2026-0009"],
            ["Max Authorized Physicians", "4 per YAKAP clinic unit"],
            ["Eligibility", "Must be PhilHealth-accredited"],
            ["Drug Reference", "Annex B.2 (GAMOT.xlsx)"],
            ["Prescription Mode", "Electronic via certified EMR"],
            ["Nomination Required", "Before post-accreditation activation"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", gap: 2, borderLeft: `2px solid ${T.black}`, paddingLeft: 10 }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: T.inkFaint, letterSpacing: "0.06em" }}>{k}</span>
              <span style={{ fontWeight: 600, color: T.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskTracker() {
  const [openRisk, setOpenRisk] = useState(null);
  const toggle = (id) => setOpenRisk(openRisk === id ? null : id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 16 }}>
        <SectionLabel noMargin>Risk & Mitigation Tracker</SectionLabel>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.inkMuted, marginTop: 8, lineHeight: 1.6 }}>
          Four primary risk areas identified from Annex C, PhilHealth advisory issuances, and the 2026 EMR mandate.
          These represent the most commonly observed points of failure in the YAKAP accreditation process.
        </p>
      </div>

      {/* Summary grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 1, border: `1px solid ${T.border}`, background: T.border }}>
        {[
          { label: "Critical Risks", value: 3, sub: "R1, R2, R3" },
          { label: "High Risks", value: 1, sub: "R4" },
          { label: "Open Mitigations", value: 4, sub: "All require action" },
          { label: "Days to EMR Deadline", value: "≤8", sub: "Apr 1, 2026" },
        ].map((s) => (
          <div key={s.label} style={{ padding: 16, background: T.bg, textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: T.black }}>{s.value}</div>
            <div style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 600, color: T.ink, marginTop: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.inkFaint, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Risk accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {risks.map((risk) => {
          const isOpen = openRisk === risk.id;
          return (
            <div key={risk.id} style={{ border: `1px solid ${isOpen ? T.black : T.border}` }}>
              <button
                onClick={() => toggle(risk.id)}
                style={{
                  width: "100%",
                  background: isOpen ? T.black : T.bg,
                  color: isOpen ? T.bg : T.ink,
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 16px",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", flexShrink: 0 }}>{risk.id}</span>
                <span style={{ flex: 1, fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600 }}>{risk.title}</span>
                <StatusBadge status={risk.severity} />
                <div style={{ marginLeft: 8, flexShrink: 0 }}>
                  {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: 20, borderTop: `1px solid ${T.black}`, background: T.surface, display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Risk description */}
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.14em", color: T.inkFaint, marginBottom: 6 }}>RISK DESCRIPTION</div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.ink, lineHeight: 1.7, margin: 0 }}>{risk.description}</p>
                  </div>

                  {/* Source */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.14em", color: T.inkFaint }}>SOURCE:</span>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: T.inkMuted }}>{risk.source}</span>
                  </div>

                  {/* Mitigation */}
                  <div style={{ background: T.bg, border: `1px solid ${T.black}`, padding: 14 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.14em", color: T.inkFaint, marginBottom: 8 }}>MITIGATION STRATEGY</div>
                    <p style={{ fontFamily: "sans-serif", fontSize: 12, color: T.ink, lineHeight: 1.7, margin: 0 }}>{risk.mitigation}</p>
                  </div>

                  {/* Owner */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.14em", color: T.inkFaint }}>ACCOUNTABLE OFFICER:</span>
                    <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: T.black }}>{risk.owner}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12, fontFamily: "Georgia, serif", fontSize: 11, color: T.inkFaint, fontStyle: "italic" }}>
        Risk assessment based on Annex C documentary requirements, PhilHealth Advisory issuances (PA 2025-0055, PA 2025-0077, PA 2026-0009), and the 2026 EMR mandate. Verify current guidelines at philhealth.gov.ph or with the PhilHealth Regional Office.
      </div>
    </div>
  );
}

// ── LAYOUT HELPERS ────────────────────────────────────────────────────────────

function SectionLabel({ children, noMargin }) {
  return (
    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", fontWeight: 700, color: T.inkMuted, marginBottom: noMargin ? 0 : 12, textTransform: "uppercase" }}>
      {children}
    </div>
  );
}

function PrivateCopay() {
  const [openStep, setOpenStep] = useState(null);
  const toggle = (i) => setOpenStep(openStep === i ? null : i);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 16 }}>
        <SectionLabel noMargin>Co-pay Guidelines for Private YAKAP Providers</SectionLabel>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.inkMuted, marginTop: 8, lineHeight: 1.6 }}>
          As a private hospital, DLSUMC is eligible to collect a co-payment from YAKAP beneficiaries under PhilHealth Advisory No. 2025-0057.
          All co-pay practices must strictly comply with the rules below.
        </p>
      </div>

      {/* Key rule banner */}
      <div style={{ background: T.black, color: T.bg, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <Receipt size={22} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 6 }}>
            MAXIMUM CO-PAY: ₱900 PER MEMBER PER CALENDAR YEAR — NOT PER SERVICE
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, lineHeight: 1.7, color: "#ddd" }}>
            Private YAKAP clinics may charge up to <strong style={{ color: "#fff" }}>₱900 per member per year</strong> as a supplement to the ₱1,700 PhilHealth capitation. This cap is absolute — it cannot be charged per visit, per consultation, or per medicine. Public YAKAP clinics are prohibited from charging any co-pay.
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10, marginTop: 8, color: "#888" }}>Source: PA 2025-0057 | PIA NCR, Oct 2025</div>
        </div>
      </div>

      {/* Revenue model summary */}
      <div>
        <SectionLabel>Private Facility Revenue Model Under YAKAP</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1, background: T.border, border: `1px solid ${T.border}` }}>
          {[
            { label: "PhilHealth Capitation", value: "₱1,700", sub: "Per empaneled patient/year" },
            { label: "Max Co-pay (Private)", value: "₱900", sub: "Per member/year · PA 2025-0057" },
            { label: "Max Total Revenue", value: "₱2,600", sub: "Capitation + co-pay ceiling" },
            { label: "GAMOT Drug Benefit", value: "₱20,000", sub: "Per member/year · 75 medicines" },
          ].map((m) => (
            <div key={m.label} style={{ padding: 18, background: T.bg, textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: T.black }}>{m.value}</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: T.ink, marginTop: 4 }}>{m.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: T.inkFaint, marginTop: 3, letterSpacing: "0.04em" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules table */}
      <div>
        <SectionLabel>Co-pay Rules — Quick Reference (PA 2025-0057)</SectionLabel>
        <div style={{ border: `1px solid ${T.border}` }}>
          {copayRules.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr 120px", gap: 12, padding: "12px 14px", borderBottom: i < copayRules.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "flex-start", background: i % 2 === 0 ? T.bg : T.surface }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: T.ink, letterSpacing: "0.04em" }}>{r.rule}</div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: T.inkFaint, marginTop: 3 }}>{r.source}</div>
              </div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, color: T.black, marginBottom: 4 }}>{r.value}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: T.inkMuted, lineHeight: 1.55 }}>{r.note}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <StatusBadge status={r.critical ? "critical" : "medium"} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation steps accordion */}
      <div>
        <SectionLabel>Implementation Checklist for Co-pay Compliance at DLSUMC</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {copayImplementation.map((s, i) => {
            const isOpen = openStep === i;
            return (
              <div key={i} style={{ border: `1px solid ${isOpen ? T.black : T.border}` }}>
                <button
                  onClick={() => toggle(i)}
                  style={{ width: "100%", background: isOpen ? T.black : T.bg, color: isOpen ? T.bg : T.ink, border: "none", cursor: "pointer", padding: "12px 14px", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", flexShrink: 0, opacity: 0.7 }}>{s.step}</span>
                  <span style={{ flex: 1, fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600 }}>{s.action}</span>
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isOpen && (
                  <div style={{ padding: "12px 14px 14px 40px", borderTop: `1px solid ${T.black}`, background: T.surface }}>
                    <p style={{ fontFamily: "sans-serif", fontSize: 12, color: T.ink, lineHeight: 1.7, margin: "0 0 8px 0" }}>{s.detail}</p>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: T.inkFaint, letterSpacing: "0.05em" }}>Responsible Unit: {s.unit}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12, fontFamily: "Georgia, serif", fontSize: 11, color: T.inkFaint, fontStyle: "italic" }}>
        Co-pay guidelines are governed by PhilHealth Advisory No. 2025-0057. Member rights under YAKAP are detailed in PA 2026-0003. Verify current rates and rules with the PhilHealth Regional Office or at philhealth.gov.ph.
      </div>
    </div>
  );
}

function SupplementalConsiderations() {
  const [openItem, setOpenItem] = useState(null);
  const toggleItem = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ borderBottom: `2px solid ${T.black}`, paddingBottom: 16 }}>
        <SectionLabel noMargin>Supplemental Considerations — YAKAP & GAMOT</SectionLabel>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: T.inkMuted, marginTop: 8, lineHeight: 1.6 }}>
          Additional regulatory requirements and operational details drawn from PhilHealth Circulars 2025-0013 and 2026-0002, and Advisories PA 2025-0069, PA 2025-0071–0072, PA 2026-0003, PA 2026-0007, PA 2026-0014, PA 2026-0017, PA 2026-0020, and PA 2026-0023.
        </p>
      </div>

      {supplementalConsiderations.map((cat) => (
        <div key={cat.category} style={{ border: `1px solid ${T.border}` }}>
          {/* Category header */}
          <div style={{ background: T.black, color: T.bg, padding: "9px 14px", fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", display: "flex", alignItems: "center", gap: 10 }}>
            {cat.icon}
            <span>{cat.category}</span>
          </div>

          {cat.items.map((item, i) => {
            const key = `${cat.category}-${i}`;
            const isOpen = openItem === key;
            return (
              <div key={i} style={{ borderBottom: i < cat.items.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <button
                  onClick={() => toggleItem(key)}
                  style={{ width: "100%", background: isOpen ? T.surface : T.bg, color: T.ink, border: "none", cursor: "pointer", padding: "12px 14px", textAlign: "left", display: "flex", alignItems: "center", gap: 12, borderLeft: isOpen ? `3px solid ${T.black}` : "3px solid transparent" }}
                >
                  <StatusIcon status={item.priority} />
                  <span style={{ flex: 1, fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600 }}>{item.title}</span>
                  <StatusBadge status={item.priority} />
                  <div style={{ marginLeft: 8, flexShrink: 0 }}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </button>
                {isOpen && (
                  <div style={{ padding: "12px 14px 14px 44px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
                    <p style={{ fontFamily: "sans-serif", fontSize: 12, color: T.ink, lineHeight: 1.75, margin: "0 0 8px 0" }}>{item.detail}</p>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: T.inkFaint, letterSpacing: "0.05em" }}>Source: {item.source}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12, fontFamily: "Georgia, serif", fontSize: 11, color: T.inkFaint, fontStyle: "italic" }}>
        All items in this section are grounded in PhilHealth Circulars and Advisory issuances referenced in GAMOT.xlsx and Advisories.xlsx. Verify current guidelines at philhealth.gov.ph or the YAKAP Providers Viber Community (bit.ly/YAKAPProvidersChannel).
      </div>
    </div>
  );
}



const NAV = [
  { id: "dashboard", label: "Executive Dashboard", short: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { id: "roadmap", label: "Application Roadmap", short: "Roadmap", icon: <Map size={16} /> },
  { id: "emr", label: "Health IT & EMR Matrix", short: "EMR Matrix", icon: <Cpu size={16} /> },
  { id: "risk", label: "Risk & Mitigation", short: "Risk", icon: <ShieldAlert size={16} /> },
  { id: "copay", label: "Co-pay: Private Facilities", short: "Co-pay", icon: <Receipt size={16} /> },
  { id: "supplemental", label: "Supplemental Considerations", short: "Supplemental", icon: <BookOpen size={16} /> },
];

// ── ROOT COMPONENT ────────────────────────────────────────────────────────────

export default function YakapDashboard() {
  const [active, setActive] = useState("dashboard");

  const view = {
    dashboard: <ExecutiveDashboard />,
    roadmap: <ApplicationRoadmap />,
    emr: <EMRMatrix />,
    risk: <RiskTracker />,
    copay: <PrivateCopay />,
    supplemental: <SupplementalConsiderations />,
  }[active];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: T.bg, color: T.ink, overflow: "hidden" }}>
      {/* Sidebar */}
      <nav style={{ width: 220, flexShrink: 0, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", background: T.bg, overflowY: "auto" }}>
        {/* Logo area */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, lineHeight: 1.3, color: T.black }}>DLSUMC</div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.12em", color: T.inkFaint, marginTop: 2 }}>YAKAP / GAMOT 2026</div>
        </div>

        {/* Nav items */}
        <div style={{ padding: "12px 0", flex: 1 }}>
          {NAV.map((item) => {
            const isCurrent = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: isCurrent ? T.black : "transparent",
                  color: isCurrent ? T.bg : T.inkMuted,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  borderLeft: isCurrent ? `3px solid ${T.black}` : "3px solid transparent",
                  transition: "all 0.12s",
                }}
              >
                {item.icon}
                <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: isCurrent ? 700 : 500 }}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom metadata */}
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 16px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: T.inkFaint, lineHeight: 1.8, letterSpacing: "0.05em" }}>
            <div>Prepared by:</div>
            <div style={{ fontWeight: 700, color: T.inkMuted }}>Jeriel R. De Silos, MD</div>
            <div style={{ marginTop: 4 }}>Department of Family and Community Medicine</div>
            <div style={{ marginTop: 6, color: T.inkFaint }}>March 2026</div>
            <div style={{ marginTop: 2, color: T.inkFaint, fontStyle: "italic" }}>Confidential</div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", items: "center", gap: 10 }}>
            {NAV.find((n) => n.id === active)?.icon}
            <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginLeft: 8, color: T.inkMuted }}>
              {NAV.find((n) => n.id === active)?.label?.toUpperCase()}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: T.black, color: T.bg, padding: "3px 10px", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={11} />
              <span>EMR DEADLINE: APR 1, 2026</span>
            </div>
          </div>
        </div>

        {view}
      </main>
    </div>
  );
}
