/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ActivateCouponInput = {
  id: string;
};

export type AdminDeleteUserInput = {
  userId: string;
};

export type AdminPaymentsFilterInput = {
  count?: number | null | undefined;
  from?: number | null | undefined;
  skip?: number | null | undefined;
  to?: number | null | undefined;
};

export type AdminWorkbookPurchasesFilterInput = {
  count?: number | null | undefined;
  /** Unix timestamp (seconds). Only purchases created at or after this moment. */
  from?: number | null | undefined;
  /** Matches buyer name, email, Razorpay order id or payment id. */
  search?: string | null | undefined;
  skip?: number | null | undefined;
  /** Filter by purchase status: created, captured or failed. */
  status?: string | null | undefined;
  /** Unix timestamp (seconds). Only purchases created at or before this moment. */
  to?: number | null | undefined;
};

/** Status of the assessment session: in_progress - ongoing test, completed - finished test, expired - session timeout */
export const AssessmentStatus = {
  Completed: 'COMPLETED',
  Expired: 'EXPIRED',
  InProgress: 'IN_PROGRESS'
} as const;

export type AssessmentStatus = typeof AssessmentStatus[keyof typeof AssessmentStatus];
export type AssessmentTypeStageLabelInput = {
  description?: string | null | undefined;
  displayOrder: number;
  label?: string | null | undefined;
  overallRangeEnd?: number | null | undefined;
  overallRangeStart?: number | null | undefined;
  sectionRangeEnd?: number | null | undefined;
  sectionRangeStart?: number | null | undefined;
};

export type BulkCreateQuestionsInput = {
  questions: Array<BulkQuestionInput>;
  sectionId: string;
};

export type BulkQuestionInput = {
  answerOptions?: any;
  questionCategory?: string | null | undefined;
  questionText: string;
};

export type CreateAssessmentSectionInput = {
  aboutDescription?: string | null | undefined;
  assessmentTypeCode: string;
  /** Clone 5 stage bands for this section from template (default: ssri). Pass null to create empty bands. */
  cloneBandsFromTemplate?: string | null | undefined;
  description?: string | null | undefined;
  displayColor?: string | null | undefined;
  displayOrder?: number | null | undefined;
  emoji?: string | null | undefined;
  name: string;
  /** scored (default) = contributes to score. profile = all questions shown first, excluded from scoring. */
  sectionCategory?: string | null | undefined;
  subtitle?: string | null | undefined;
  type?: string | null | undefined;
};

export type CreateAssessmentTypeInput = {
  /**
   * Clone interpretation bands and PDF template content from this type (default: ssri).
   * Pass null to skip cloning. Questions are never cloned — add those separately.
   */
  cloneFromTemplate?: string | null | undefined;
  code: string;
  description?: string | null | undefined;
  displayOrder?: number | null | undefined;
  isDyadic?: boolean | null | undefined;
  maxScore?: number | null | undefined;
  minScore?: number | null | undefined;
  name: string;
  priceAmount: number;
  profileQuestionsCount?: number | null | undefined;
  questionsPerSection?: number | null | undefined;
  responseScaleMax?: number | null | undefined;
  responseScaleMin?: number | null | undefined;
  scoringFormula?: string | null | undefined;
  sectionCount?: number | null | undefined;
  /** When true (default), creates the 5 standard dimension sections for this type. */
  seedSections?: boolean | null | undefined;
};

export type CreateCouponInput = {
  code: string;
  description?: string | null | undefined;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number | null | undefined;
  maxTotalUses?: number | null | undefined;
  validFrom?: string | null | undefined;
  validUntil?: string | null | undefined;
};

/** bandScope: "section" for per-dimension scores (10-100), "overall" for total readiness index */
export type CreateInterpretationBandInput = {
  assessmentType?: string | null | undefined;
  bandScope?: string | null | undefined;
  displayOrder?: number | null | undefined;
  displayRangeLabel?: string | null | undefined;
  keyMindset?: string | null | undefined;
  label: string;
  narrative: string;
  rangeEnd: number;
  rangeStart: number;
  sectionType?: string | null | undefined;
};

export type CreatePaymentOrderInput = {
  assessmentType?: string | null | undefined;
  clientInfo?: string | null | undefined;
  couponCode?: string | null | undefined;
};

export type CreateQuestionInput = {
  /** Optional labeled choices: [{value: Int, label: String}]. Null for numeric scale questions. */
  answerOptions?: any;
  questionCategory?: string | null | undefined;
  questionText: string;
  sectionId: string;
};

export type CreateRecommendedActionInput = {
  actionText: string;
  interpretationBandId: string;
  priority: number;
};

export type CreateWorkbookOrderInput = {
  couponCode?: string | null | undefined;
};

export type DeactivateAssessmentSectionInput = {
  id: string;
};

export type DeactivateCouponInput = {
  id: string;
};

export type DeleteAssessmentSectionInput = {
  force?: boolean | null | undefined;
  id: string;
};

export type DeleteCouponInput = {
  id: string;
};

export type DeleteInterpretationBandInput = {
  id: string;
};

export type DeleteQuestionInput = {
  id: string;
};

export type DeleteRecommendedActionInput = {
  id: string;
};

export const DiscountType = {
  Flat: 'FLAT',
  Percentage: 'PERCENTAGE'
} as const;

export type DiscountType = typeof DiscountType[keyof typeof DiscountType];
/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  email: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  age: number;
  email: string;
  gender: string;
  name?: string | null | undefined;
  password: string;
  phoneNumber?: string | null | undefined;
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  newPassword: string;
  resetToken: string;
  userId: string;
};

export type SeedAssessmentTypeContentInput = {
  assessmentTypeCode: string;
  cloneBands?: boolean | null | undefined;
  cloneTemplateContent?: boolean | null | undefined;
  templateCode?: string | null | undefined;
};

export type SeedAssessmentTypeSectionsInput = {
  assessmentTypeCode: string;
};

export type SendReminderEmailsInput = {
  customMessage?: string | null | undefined;
  reminderType: string;
  userIds: Array<string>;
};

export type StartAssessmentInput = {
  assessmentType?: string | null | undefined;
  paymentId?: string | null | undefined;
};

export type SubmitOrUpdateResponseInput = {
  isNavigatingForward?: boolean | null | undefined;
  questionId: string;
  questionNumber: number;
  responseValue: number;
  sessionId: string;
  timeTakenSeconds?: number | null | undefined;
};

export type UpdateAssessmentTypeInput = {
  code: string;
  description?: string | null | undefined;
  displayOrder?: number | null | undefined;
  isActive?: boolean | null | undefined;
  isDyadic?: boolean | null | undefined;
  maxScore?: number | null | undefined;
  minScore?: number | null | undefined;
  name?: string | null | undefined;
  priceAmount?: number | null | undefined;
  profileQuestionsCount?: number | null | undefined;
  questionsPerSection?: number | null | undefined;
  responseScaleMax?: number | null | undefined;
  responseScaleMin?: number | null | undefined;
  scoringFormula?: string | null | undefined;
  sectionCount?: number | null | undefined;
};

export type UpdateAssessmentTypeStagesInput = {
  assessmentTypeCode: string;
  stages: Array<AssessmentTypeStageLabelInput>;
};

export type UpdateCouponInput = {
  description?: string | null | undefined;
  id: string;
  isActive?: boolean | null | undefined;
  maxTotalUses?: number | null | undefined;
  validUntil?: string | null | undefined;
};

export type UpdateInterpretationBandInput = {
  displayOrder?: number | null | undefined;
  displayRangeLabel?: string | null | undefined;
  id: string;
  isActive?: boolean | null | undefined;
  keyMindset?: string | null | undefined;
  label?: string | null | undefined;
  narrative?: string | null | undefined;
  rangeEnd?: number | null | undefined;
  rangeStart?: number | null | undefined;
};

export type UpdateQuestionInput = {
  answerOptions?: any;
  displayOrder?: number | null | undefined;
  id: string;
  isActive?: boolean | null | undefined;
  questionCategory?: string | null | undefined;
  questionText?: string | null | undefined;
};

export type UpdateRecommendedActionInput = {
  actionText?: string | null | undefined;
  id: string;
  isActive?: boolean | null | undefined;
  priority?: number | null | undefined;
};

export type UpdateSectionInput = {
  aboutDescription?: string | null | undefined;
  description?: string | null | undefined;
  displayColor?: string | null | undefined;
  displayOrder?: number | null | undefined;
  emoji?: string | null | undefined;
  id: string;
  isActive?: boolean | null | undefined;
  name?: string | null | undefined;
  subtitle?: string | null | undefined;
};

export type UpdateTemplateContentInput = {
  assessmentType: string;
  contentKey: string;
  contentValue: any;
};

export type ValidateCouponInput = {
  code: string;
};

export type VerifyWorkbookPaymentInput = {
  orderId: string;
  paymentId: string;
  signature: string;
};

export type ActivateAssessmentTypeMutationVariables = Exact<{
  code: string;
}>;


export type ActivateAssessmentTypeMutation = { activateAssessmentType: { success: boolean, message: string | null, assessmentType: { code: string, isActive: boolean } | null } | null };

export type AdminActivateCouponMutationVariables = Exact<{
  input: ActivateCouponInput;
}>;


export type AdminActivateCouponMutation = { adminActivateCoupon: { success: boolean, message: string | null } | null };

export type AdminAssessmentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAssessmentTypesQuery = { adminAssessmentTypes: Array<{ id: string, code: string, name: string, description: string | null, priceAmount: number, isActive: boolean, totalQuestions: number, sectionCount: number, questionsPerSection: number, minScore: number, maxScore: number, scoringFormula: string, displayOrder: number, isDyadic: boolean, responseScaleMin: number, responseScaleMax: number, profileQuestionsCount: number }> };

export type AdminCouponAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCouponAnalyticsQuery = { adminCouponAnalytics: { totalCoupons: number, activeCoupons: number, totalRedemptions: number, totalDiscountGiven: number } | null };

export type AdminCouponByIdQueryVariables = Exact<{
  id: string;
}>;


export type AdminCouponByIdQuery = { adminCouponById: { id: string, code: string, description: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount: number | null, validFrom: string, validUntil: string | null, isActive: boolean, maxTotalUses: number | null, currentUses: number, createdBy: string | null, createdAt: string, updatedAt: string } | null };

export type AdminCouponUsageQueryVariables = Exact<{
  couponId: string;
}>;


export type AdminCouponUsageQuery = { adminCouponUsage: { totalCount: number, usageRecords: Array<{ id: string, userName: string | null, userEmail: string | null, discountAmount: number, usedAt: string }> } | null };

export type AdminCreateCouponMutationVariables = Exact<{
  input: CreateCouponInput;
}>;


export type AdminCreateCouponMutation = { adminCreateCoupon: { success: boolean, message: string | null, coupon: { id: string, code: string, description: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount: number | null, validFrom: string, validUntil: string | null, isActive: boolean, maxTotalUses: number | null, currentUses: number, createdAt: string, updatedAt: string } | null } | null };

export type AdminDeactivateCouponMutationVariables = Exact<{
  input: DeactivateCouponInput;
}>;


export type AdminDeactivateCouponMutation = { adminDeactivateCoupon: { success: boolean, message: string | null } | null };

export type AdminDeleteCouponMutationVariables = Exact<{
  input: DeleteCouponInput;
}>;


export type AdminDeleteCouponMutation = { adminDeleteCoupon: { success: boolean, message: string | null, deletedId: string | null } | null };

export type AdminListCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminListCouponsQuery = { adminListCoupons: { totalCount: number, coupons: Array<{ id: string, code: string, description: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount: number | null, validFrom: string, validUntil: string | null, isActive: boolean, maxTotalUses: number | null, currentUses: number, createdAt: string, updatedAt: string }> } | null };

export type AdminPaymentAnalyticsQueryVariables = Exact<{
  input?: AdminPaymentsFilterInput | null | undefined;
}>;


export type AdminPaymentAnalyticsQuery = { adminPaymentAnalytics: { totalPayments: number, totalAmount: number, capturedPayments: number, capturedAmount: number, failedPayments: number, failedAmount: number, refundedPayments: number, refundedAmount: number, averagePaymentAmount: number, successRate: number, recentPayments: number, paymentMethodBreakdown: Array<{ method: string, count: number, totalAmount: number, successCount: number, failedCount: number }> } | null };

export type AdminPaymentDetailsQueryVariables = Exact<{
  paymentId: string;
}>;


export type AdminPaymentDetailsQuery = { adminPaymentDetails: { razorpayData: string, dbData: string | null } | null };

export type AdminPaymentsListQueryVariables = Exact<{
  input?: AdminPaymentsFilterInput | null | undefined;
}>;


export type AdminPaymentsListQuery = { adminPaymentsList: { entity: string, count: number, items: Array<{ id: string, entity: string, amount: number, currency: string, status: string, orderId: string | null, method: string | null, email: string | null, contact: string | null, fee: number | null, tax: number | null, errorCode: string | null, errorDescription: string | null, errorSource: string | null, errorStep: string | null, errorReason: string | null, captured: boolean, refundStatus: string | null, amountRefunded: number | null, createdAt: number, notes: string | null }> } | null };

export type AdminRefundsListQueryVariables = Exact<{
  input?: AdminPaymentsFilterInput | null | undefined;
}>;


export type AdminRefundsListQuery = { adminRefundsList: { entity: string, count: number, items: Array<{ id: string, entity: string, amount: number, currency: string, paymentId: string, status: string, speedRequested: string | null, speedProcessed: string | null, createdAt: number }> } | null };

export type AdminSettlementsListQueryVariables = Exact<{
  input?: AdminPaymentsFilterInput | null | undefined;
}>;


export type AdminSettlementsListQuery = { adminSettlementsList: { entity: string, count: number, items: Array<{ id: string, entity: string, amount: number, status: string, fees: number | null, tax: number | null, utr: string | null, createdAt: number }> } | null };

export type AdminUpdateCouponMutationVariables = Exact<{
  input: UpdateCouponInput;
}>;


export type AdminUpdateCouponMutation = { adminUpdateCoupon: { success: boolean, message: string | null, coupon: { id: string, code: string, description: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount: number | null, validFrom: string, validUntil: string | null, isActive: boolean, maxTotalUses: number | null, currentUses: number, updatedAt: string } | null } | null };

export type AdminWorkbookPurchasesQueryVariables = Exact<{
  input?: AdminWorkbookPurchasesFilterInput | null | undefined;
}>;


export type AdminWorkbookPurchasesQuery = { adminWorkbookPurchases: { totalCount: number, items: Array<{ id: string, userId: string, userName: string | null, userEmail: string, userPhone: string | null, amountInr: number, originalAmountInr: number | null, discountAmountInr: number, status: string, paymentMethod: string | null, razorpayOrderId: string | null, razorpayPaymentId: string | null, couponCode: string | null, errorCode: string | null, errorDescription: string | null, isFree: boolean, createdAt: string, updatedAt: string }> } | null };

export type AdminWorkbookStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminWorkbookStatsQuery = { adminWorkbookStats: { totalPurchases: number, totalRevenue: number, recentPurchases: number, pendingPurchases: number, failedPurchases: number, couponPurchases: number, freePurchases: number, uniqueBuyers: number, averageOrderValue: number, totalDiscountGiven: number, last7DaysPurchases: number, last7DaysRevenue: number } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { allUsers: { totalCount: number, adminCount: number, usersWithoutAssessmentCount: number, users: Array<{ id: string, email: string, name: string | null, phoneNumber: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string }> } | null };

export type AssessmentSectionPresetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssessmentSectionPresetsQuery = { assessmentSectionPresets: Array<{ type: string, name: string, description: string, emoji: string | null, displayColor: string | null, displayOrder: number }> };

export type AssessmentTemplateContentsQueryVariables = Exact<{
  assessmentTypeCode: string;
}>;


export type AssessmentTemplateContentsQuery = { assessmentTemplateContents: { nodes: Array<{ id: string, assessmentTypeCode: string, contentKey: string, contentValue: any, updatedAt: string }> } | null };

export type GetAssessmentTrendsQueryVariables = Exact<{
  startDate: string;
  endDate: string;
  assessmentType?: string | null | undefined;
}>;


export type GetAssessmentTrendsQuery = { assessmentTrends: { totalCompleted: number, totalStarted: number, totalInProgress: number, trends: Array<{ date: string, completedCount: number, startedCount: number, inProgressCount: number }> } | null };

export type AssessmentTypeReadinessQueryVariables = Exact<{
  type: string;
}>;


export type AssessmentTypeReadinessQuery = { assessmentTypeReadiness: { code: string, ready: boolean, sectionCount: number, requiredSectionBands: number, stagesPerSection: number, checks: Array<{ key: string, label: string, passed: boolean, detail: string }> } };

export type AssessmentTypeStagesQueryVariables = Exact<{
  assessmentTypeCode: string;
}>;


export type AssessmentTypeStagesQuery = { assessmentTypeStages: Array<{ id: string, assessmentTypeCode: string, displayOrder: number, label: string, description: string | null, sectionRangeStart: number, sectionRangeEnd: number, overallRangeStart: number, overallRangeEnd: number }> };

export type CreateAssessmentSectionMutationVariables = Exact<{
  input: CreateAssessmentSectionInput;
}>;


export type CreateAssessmentSectionMutation = { createAssessmentSection: { success: boolean, message: string | null, section: { id: string, type: string, name: string, description: string | null, aboutDescription: string | null, subtitle: string | null, emoji: string | null, displayColor: string | null, displayOrder: number, isActive: boolean, assessmentTypeCode: string } | null } | null };

export type CreateAssessmentTypeMutationVariables = Exact<{
  input: CreateAssessmentTypeInput;
}>;


export type CreateAssessmentTypeMutation = { createAssessmentType: { success: boolean, message: string | null, assessmentType: { code: string, name: string, isActive: boolean, totalQuestions: number, sectionCount: number, questionsPerSection: number, minScore: number, maxScore: number, scoringFormula: string, displayOrder: number } | null } | null };

export type CreateInterpretationBandMutationVariables = Exact<{
  input: CreateInterpretationBandInput;
}>;


export type CreateInterpretationBandMutation = { createInterpretationBand: { success: boolean, message: string | null, band: { id: string, assessmentTypeCode: string, bandScope: string, sectionType: string | null, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel: string | null, narrative: string, keyMindset: string | null, displayOrder: number, isActive: boolean } | null } | null };

export type DeactivateAssessmentSectionMutationVariables = Exact<{
  input: DeactivateAssessmentSectionInput;
}>;


export type DeactivateAssessmentSectionMutation = { deactivateAssessmentSection: { success: boolean, message: string | null, section: { id: string, type: string, isActive: boolean } | null } | null };

export type DeactivateAssessmentTypeMutationVariables = Exact<{
  code: string;
}>;


export type DeactivateAssessmentTypeMutation = { deactivateAssessmentType: { success: boolean, message: string | null } | null };

export type DeleteAssessmentSectionMutationVariables = Exact<{
  input: DeleteAssessmentSectionInput;
}>;


export type DeleteAssessmentSectionMutation = { deleteAssessmentSection: { success: boolean, message: string | null } | null };

export type DeleteInterpretationBandMutationVariables = Exact<{
  input: DeleteInterpretationBandInput;
}>;


export type DeleteInterpretationBandMutation = { deleteInterpretationBand: { success: boolean, message: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  input: AdminDeleteUserInput;
}>;


export type DeleteUserMutation = { adminDeleteUser: { deletedUserId: string | null, success: boolean, message: string | null } | null };

export type GrantAdminMutationVariables = Exact<{
  userId: string;
}>;


export type GrantAdminMutation = { grantAdminAccess: { success: boolean, message: string | null, user: { id: string, email: string, name: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string } | null } | null };

export type GrantInternalAccessMutationVariables = Exact<{
  userId: string;
}>;


export type GrantInternalAccessMutation = { grantInternalAccess: { success: boolean, message: string | null, user: { id: string, email: string, name: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string } | null } | null };

export type SectionInterpretationBandsQueryVariables = Exact<{
  type: string;
}>;


export type SectionInterpretationBandsQuery = { assessmentInterpretationBands: { nodes: Array<{ id: string, sectionType: string | null, label: string, rangeStart: number, rangeEnd: number, narrative: string, displayOrder: number, isActive: boolean, bandScope: string, assessmentRecommendedActionsByInterpretationBandId: { nodes: Array<{ id: string, actionText: string, priority: number, isActive: boolean }> } }> } | null };

export type OverallInterpretationBandsQueryVariables = Exact<{
  type: string;
}>;


export type OverallInterpretationBandsQuery = { assessmentInterpretationBands: { nodes: Array<{ id: string, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel: string | null, narrative: string, keyMindset: string | null, displayOrder: number, isActive: boolean, bandScope: string, assessmentRecommendedActionsByInterpretationBandId: { nodes: Array<{ id: string, actionText: string, priority: number, isActive: boolean }> } }> } | null };

export type CreateRecommendedActionMutationVariables = Exact<{
  input: CreateRecommendedActionInput;
}>;


export type CreateRecommendedActionMutation = { createRecommendedAction: { success: boolean, message: string | null, action: { id: string, actionText: string, priority: number, isActive: boolean } | null } | null };

export type UpdateRecommendedActionMutationVariables = Exact<{
  input: UpdateRecommendedActionInput;
}>;


export type UpdateRecommendedActionMutation = { updateRecommendedAction: { success: boolean, message: string | null, action: { id: string, actionText: string, priority: number, isActive: boolean } | null } | null };

export type DeleteRecommendedActionMutationVariables = Exact<{
  input: DeleteRecommendedActionInput;
}>;


export type DeleteRecommendedActionMutation = { deleteRecommendedAction: { success: boolean, message: string | null } | null };

export type RecomputeAutoStageRangesMutationVariables = Exact<{
  assessmentTypeCode: string;
}>;


export type RecomputeAutoStageRangesMutation = { recomputeAutoStageRanges: { success: boolean, message: string | null, stages: Array<{ displayOrder: number, label: string, sectionRangeStart: number, sectionRangeEnd: number, overallRangeStart: number, overallRangeEnd: number }> } | null };

export type ReminderCandidatesQueryVariables = Exact<{
  reminderType: string;
}>;


export type ReminderCandidatesQuery = { adminReminderCandidates: { totalCount: number, users: Array<{ userId: string, email: string, name: string | null, daysSinceSignup: number, reminderCount: number, lastReminder: string | null }> } | null };

export type ResetTemplateContentMutationVariables = Exact<{
  assessmentType: string;
  contentKey: string;
}>;


export type ResetTemplateContentMutation = { resetTemplateContent: { success: boolean, message: string | null } | null };

export type RevokeAdminMutationVariables = Exact<{
  userId: string;
}>;


export type RevokeAdminMutation = { revokeAdminAccess: { success: boolean, message: string | null, user: { id: string, email: string, name: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string } | null } | null };

export type RevokeInternalAccessMutationVariables = Exact<{
  userId: string;
}>;


export type RevokeInternalAccessMutation = { revokeInternalAccess: { success: boolean, message: string | null, user: { id: string, email: string, name: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string } | null } | null };

export type GetScoreDistributionQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type GetScoreDistributionQuery = { scoreDistribution: { totalAssessments: number, averageScore: number, distribution: Array<{ range: string, count: number, percentage: number, label: string }> } | null };

export type SeedAssessmentTypeContentMutationVariables = Exact<{
  input: SeedAssessmentTypeContentInput;
}>;


export type SeedAssessmentTypeContentMutation = { seedAssessmentTypeContent: { success: boolean, message: string | null, assessmentType: { code: string, name: string, isActive: boolean } | null } | null };

export type SeedAssessmentTypeSectionsMutationVariables = Exact<{
  input: SeedAssessmentTypeSectionsInput;
}>;


export type SeedAssessmentTypeSectionsMutation = { seedAssessmentTypeSections: { success: boolean, message: string | null, sectionsCreated: number } | null };

export type SendReminderEmailsMutationVariables = Exact<{
  input: SendReminderEmailsInput;
}>;


export type SendReminderEmailsMutation = { adminSendReminderEmails: { success: boolean, queuedCount: number, message: string | null } | null };

export type UpdateAssessmentTypeStagesMutationVariables = Exact<{
  input: UpdateAssessmentTypeStagesInput;
}>;


export type UpdateAssessmentTypeStagesMutation = { updateAssessmentTypeStages: { success: boolean, message: string | null, stages: Array<{ displayOrder: number, label: string, description: string | null, sectionRangeStart: number, sectionRangeEnd: number, overallRangeStart: number, overallRangeEnd: number }> } | null };

export type UpdateAssessmentTypeMutationVariables = Exact<{
  input: UpdateAssessmentTypeInput;
}>;


export type UpdateAssessmentTypeMutation = { updateAssessmentType: { success: boolean, message: string | null, assessmentType: { code: string, name: string } | null } | null };

export type UpdateInterpretationBandMutationVariables = Exact<{
  input: UpdateInterpretationBandInput;
}>;


export type UpdateInterpretationBandMutation = { updateInterpretationBand: { success: boolean, message: string | null, band: { id: string, sectionType: string | null, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel: string | null, narrative: string, keyMindset: string | null, displayOrder: number, isActive: boolean } | null } | null };

export type UpdateTemplateContentMutationVariables = Exact<{
  input: UpdateTemplateContentInput;
}>;


export type UpdateTemplateContentMutation = { updateTemplateContent: { success: boolean, message: string | null } | null };

export type GetUsersWithoutAssessmentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithoutAssessmentQuery = { usersWithoutAssessment: { totalCount: number, users: Array<{ id: string, email: string, name: string | null, phoneNumber: string | null, isAdmin: boolean, isInternal: boolean, createdAt: string, updatedAt: string }> } | null };

export type AdminAssessmentStatsQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type AdminAssessmentStatsQuery = { adminAssessmentStats: { totalSections: number, totalQuestions: number, totalInterpretationBands: number, totalRecommendedActions: number, activeQuestions: number, inactiveQuestions: number, questionsBySectionType: any } | null };

export type AssessmentProgressQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type AssessmentProgressQuery = { assessmentProgress: { totalQuestions: number, answeredQuestions: number, progressPercentage: number, session: { id: string, currentQuestionNumber: number, assessmentTypeCode: string } | null } | null };

export type AssessmentQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssessmentQuestionsQuery = { assessmentQuestions: { nodes: Array<{ id: string, questionText: string, sectionId: string, displayOrder: number, isActive: boolean }> } | null };

export type GetAssessmentResultQueryVariables = Exact<{
  id: string;
}>;


export type GetAssessmentResultQuery = { assessmentResult: { id: string, assessmentTypeCode: string, totalReadinessIndex: number, interpretationLabel: string | null, interpretationNarrative: string | null, interpretationKeyMindset: string | null, recommendedActions: Array<string | null> | null, pdfPath: string | null, createdAt: string, assessmentTypeByAssessmentTypeCode: { name: string, minScore: number, maxScore: number, scoringFormula: string } | null, assessmentSectionResultsByResultId: { nodes: Array<{ sectionType: string, sectionName: string | null, sectionEmoji: string | null, sectionDisplayColor: string | null, score: number, interpretationLabel: string, interpretationNarrative: string, interpretationBandId: string, section: { name: string, emoji: string | null, displayColor: string | null, description: string | null, displayOrder: number } | null }> }, cohortComparison: { userAge: number, userGender: string, ageCohort: { ageRange: string, cohortSize: number, totalScore: { userScore: number, cohortAverage: number }, sectionScores: Array<{ sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null, genderCohort: { gender: string, cohortSize: number, totalScore: { userScore: number, cohortAverage: number }, sectionScores: Array<{ sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null, overallCohort: { cohortSize: number, totalScore: { userScore: number, cohortAverage: number }, sectionScores: Array<{ sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null } | null } | null };

export type AssessmentStatusQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type AssessmentStatusQuery = { assessmentStatus: { hasCompletedAssessment: boolean, hasActiveSession: boolean, completedAt: string | null, resultId: string | null, totalReadinessIndex: number | null, completedAssessments: Array<string>, availableAssessments: Array<{ code: string, name: string, priceAmount: number, totalQuestions: number, maxScore: number, isDyadic: boolean }> } | null };

export type AssessmentTypeByCodeQueryVariables = Exact<{
  code: string;
}>;


export type AssessmentTypeByCodeQuery = { assessmentTypeByCode: { code: string, name: string, priceAmount: number, totalQuestions: number | null, minScore: number, maxScore: number, isActive: boolean } | null };

export type AvailableAssessmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableAssessmentsQuery = { availableAssessments: Array<{ code: string, name: string, description: string | null, priceAmount: number, totalQuestions: number, displayOrder: number }> };

export type BulkCreateAssessmentQuestionsMutationVariables = Exact<{
  input: BulkCreateQuestionsInput;
}>;


export type BulkCreateAssessmentQuestionsMutation = { bulkCreateAssessmentQuestions: { count: number, success: boolean, message: string | null, questions: Array<{ id: string, questionText: string, displayOrder: number }> } | null };

export type CompleteAssessmentMutationVariables = Exact<{
  sessionId: string;
}>;


export type CompleteAssessmentMutation = { completeAssessment: { success: boolean, message: string | null, pdfPath: string | null, coupleComplete: boolean | null, waitingForPartner: boolean | null, result: { id: string, sessionId: string, userId: string, totalReadinessIndex: number, pdfPath: string | null, isEmailed: boolean, emailedAt: string | null, createdAt: string } | null } | null };

export type CreateAssessmentQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateAssessmentQuestionMutation = { createAssessmentQuestion: { success: boolean, message: string | null, question: { id: string, sectionId: string, questionText: string, displayOrder: number, isActive: boolean, createdAt: string, updatedAt: string } | null } | null };

export type CurrentAssessmentSessionQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type CurrentAssessmentSessionQuery = { currentAssessmentSession: { id: string, userId: string, paymentId: string | null, status: AssessmentStatus, currentQuestionNumber: number, assessmentTypeCode: string, startTime: string, lastActivityTime: string, expiresAt: string } | null };

export type DeleteMyAssessmentMutationVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type DeleteMyAssessmentMutation = { deleteMyAssessment: { success: boolean, message: string | null, deletedCount: number } | null };

export type DeleteAssessmentQuestionMutationVariables = Exact<{
  input: DeleteQuestionInput;
}>;


export type DeleteAssessmentQuestionMutation = { deleteAssessmentQuestion: { success: boolean, message: string | null } | null };

export type GetSectionQuestionsQueryVariables = Exact<{
  sectionId: string;
}>;


export type GetSectionQuestionsQuery = { assessmentQuestions: { totalCount: number, nodes: Array<{ id: string, sectionId: string, questionText: string, displayOrder: number, isActive: boolean, questionCategory: string, answerOptions: any, createdAt: string, updatedAt: string }> } | null };

export type GetAllSectionsQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type GetAllSectionsQuery = { assessmentSections: { nodes: Array<{ id: string, type: string, name: string, description: string | null, aboutDescription: string | null, subtitle: string | null, emoji: string | null, displayColor: string | null, displayOrder: number, isActive: boolean, sectionCategory: string, assessmentTypeCode: string }> } | null };

export type GetSessionQuestionQueryVariables = Exact<{
  sessionId: string;
  questionNumber: number;
}>;


export type GetSessionQuestionQuery = { getSessionQuestion: { question: { id: string, sessionId: string, questionId: string, displayOrder: number, questionText: string, sectionName: string, sectionType: string, isAnswered: boolean, questionCategory: string, answerOptions: any }, currentResponse: { id: string, responseValue: number, timeTakenSeconds: number | null, isUpdate: boolean, updatedAt: string } | null, navigation: { currentNumber: number, totalQuestions: number, hasPrevious: boolean, hasNext: boolean, previousNumber: number | null, nextNumber: number | null }, progress: { answeredCount: number, totalCount: number, percentComplete: number } } | null };

export type ResendReportMutationVariables = Exact<{
  resultId: string;
}>;


export type ResendReportMutation = { resendAssessmentReport: { success: boolean, message: string | null } | null };

export type SessionQuestionsQueryVariables = Exact<{
  sessionId: string;
}>;


export type SessionQuestionsQuery = { assessmentSession: { id: string, status: AssessmentStatus, currentQuestionNumber: number, startTime: string, lastActivityTime: string, expiresAt: string, assessmentSessionQuestionsBySessionId: { nodes: Array<{ id: string, sessionId: string, questionId: string, displayOrder: number, isAnswered: boolean, question: { id: string, questionText: string, sectionId: string } | null }> }, assessmentResponsesBySessionId: { nodes: Array<{ id: string, questionId: string, responseValue: number, timeTakenSeconds: number | null, createdAt: string, updatedAt: string }> } } | null };

export type StartAssessmentMutationVariables = Exact<{
  input: StartAssessmentInput;
}>;


export type StartAssessmentMutation = { startAssessment: { message: string | null, session: { id: string, userId: string, paymentId: string | null, status: AssessmentStatus, currentQuestionNumber: number, assessmentTypeCode: string, startTime: string, expiresAt: string } | null, assessmentType: { code: string, name: string, totalQuestions: number } | null } | null };

export type SubmitOrUpdateResponseMutationVariables = Exact<{
  input: SubmitOrUpdateResponseInput;
}>;


export type SubmitOrUpdateResponseMutation = { submitOrUpdateResponse: { success: boolean, message: string, response: { id: string, sessionId: string, questionId: string, responseValue: number, timeTakenSeconds: number | null, isUpdate: boolean, createdAt: string, updatedAt: string }, session: { id: string, currentQuestionNumber: number, lastAnsweredQuestion: number | null, lastActivityTime: string, expiresAt: string }, progress: { answeredCount: number, totalCount: number, percentComplete: number }, nextQuestion: { questionNumber: number | null, hasNext: boolean } } | null };

export type UpdateAssessmentQuestionMutationVariables = Exact<{
  input: UpdateQuestionInput;
}>;


export type UpdateAssessmentQuestionMutation = { updateAssessmentQuestion: { success: boolean, message: string | null, question: { id: string, questionText: string, displayOrder: number, isActive: boolean, updatedAt: string } | null } | null };

export type UpdateAssessmentSectionMutationVariables = Exact<{
  input: UpdateSectionInput;
}>;


export type UpdateAssessmentSectionMutation = { updateAssessmentSection: { success: boolean, message: string | null, section: { id: string, name: string, description: string | null, aboutDescription: string | null, subtitle: string | null, emoji: string | null, displayColor: string | null, displayOrder: number, isActive: boolean, updatedAt: string } | null } | null };

export type GetUsersWithAssessmentQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type GetUsersWithAssessmentQuery = { usersWithAssessment: { totalCount: number, completedCount: number, inProgressCount: number, users: Array<{ userId: string, userName: string | null, userEmail: string, sessionId: string, resultId: string | null, assessmentTypeCode: string, status: string, startedAt: string, completedAt: string | null, expiresAt: string, totalScore: number | null, interpretationLabel: string | null }> } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser: (
    { id: string }
    & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
  ) | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { forgotPassword: { success: boolean | null } | null };

export type Lite_UserFragment = { id: string, name: string | null, email: string, age: number, phoneNumber: string | null, gender: string, type: string, isAdmin: boolean, isInternal: boolean } & { ' $fragmentName'?: 'Lite_UserFragment' };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { token: string | null, user: { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: { success: boolean | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { resetPassword: { success: boolean | null } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { register: { token: string, user: (
      { id: string }
      & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
    ) } | null };

export type UpdatePhoneNumberMutationVariables = Exact<{
  userId: string;
  phoneNumber: string;
}>;


export type UpdatePhoneNumberMutation = { updateUser: { user: (
      { id: string }
      & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
    ) | null } | null };

export type CheckPaymentStatusQueryVariables = Exact<{
  assessmentType?: string | null | undefined;
}>;


export type CheckPaymentStatusQuery = { currentUserPaymentStatus: { __typename: 'UserPaymentStatusPayload', hasPaid: boolean, paymentId: string | null, status: string | null, amountInr: number | null, createdAt: string | null } | null };

export type CreatePaymentOrderMutationVariables = Exact<{
  input: CreatePaymentOrderInput;
}>;


export type CreatePaymentOrderMutation = { createPaymentOrder: { orderId: string | null, amount: number, originalAmount: number | null, discountAmount: number | null, currency: string, razorpayKeyId: string | null, couponApplied: boolean, couponMessage: string | null, isFree: boolean } | null };

export type ValidateCouponMutationVariables = Exact<{
  input: ValidateCouponInput;
}>;


export type ValidateCouponMutation = { validateCoupon: { valid: boolean, discountAmount: number, originalAmount: number, finalAmount: number, message: string, coupon: { code: string, description: string | null, discountType: DiscountType, discountValue: number } | null } | null };

export type VerifyPaymentMutationVariables = Exact<{
  orderId: string;
  paymentId: string;
  signature: string;
}>;


export type VerifyPaymentMutation = { verifyPayment: { success: boolean, paymentId: string | null, message: string | null } | null };

export type CreateWorkbookOrderMutationVariables = Exact<{
  input: CreateWorkbookOrderInput;
}>;


export type CreateWorkbookOrderMutation = { createWorkbookOrder: { orderId: string | null, amount: number, originalAmount: number | null, discountAmount: number | null, currency: string, razorpayKeyId: string | null, couponApplied: boolean, couponMessage: string | null, isFree: boolean } | null };

export type VerifyWorkbookPaymentMutationVariables = Exact<{
  input: VerifyWorkbookPaymentInput;
}>;


export type VerifyWorkbookPaymentMutation = { verifyWorkbookPayment: { success: boolean, purchaseId: string | null, message: string | null } | null };

export type WorkbookStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkbookStatusQuery = { currentUserWorkbookStatus: { hasPurchased: boolean, purchasedAt: string | null, purchaseId: string | null } | null };

export const Lite_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<Lite_UserFragment, unknown>;
export const ActivateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ActivateAssessmentTypeMutation, ActivateAssessmentTypeMutationVariables>;
export const AdminActivateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminActivateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminActivateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AdminActivateCouponMutation, AdminActivateCouponMutationVariables>;
export const AdminAssessmentTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAssessmentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssessmentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCount"}},{"kind":"Field","name":{"kind":"Name","value":"questionsPerSection"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"scoringFormula"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isDyadic"}},{"kind":"Field","name":{"kind":"Name","value":"responseScaleMin"}},{"kind":"Field","name":{"kind":"Name","value":"responseScaleMax"}},{"kind":"Field","name":{"kind":"Name","value":"profileQuestionsCount"}}]}}]}}]} as unknown as DocumentNode<AdminAssessmentTypesQuery, AdminAssessmentTypesQueryVariables>;
export const AdminCouponAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCouponAnalytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCouponAnalytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCoupons"}},{"kind":"Field","name":{"kind":"Name","value":"activeCoupons"}},{"kind":"Field","name":{"kind":"Name","value":"totalRedemptions"}},{"kind":"Field","name":{"kind":"Name","value":"totalDiscountGiven"}}]}}]}}]} as unknown as DocumentNode<AdminCouponAnalyticsQuery, AdminCouponAnalyticsQueryVariables>;
export const AdminCouponByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCouponById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCouponById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"maxTotalUses"}},{"kind":"Field","name":{"kind":"Name","value":"currentUses"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminCouponByIdQuery, AdminCouponByIdQueryVariables>;
export const AdminCouponUsageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCouponUsage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"couponId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCouponUsage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"couponId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"couponId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usageRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AdminCouponUsageQuery, AdminCouponUsageQueryVariables>;
export const AdminCreateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCreateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"maxTotalUses"}},{"kind":"Field","name":{"kind":"Name","value":"currentUses"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCreateCouponMutation, AdminCreateCouponMutationVariables>;
export const AdminDeactivateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeactivateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeactivateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDeactivateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AdminDeactivateCouponMutation, AdminDeactivateCouponMutationVariables>;
export const AdminDeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDeleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"deletedId"}}]}}]}}]} as unknown as DocumentNode<AdminDeleteCouponMutation, AdminDeleteCouponMutationVariables>;
export const AdminListCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminListCoupons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminListCoupons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coupons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"maxTotalUses"}},{"kind":"Field","name":{"kind":"Name","value":"currentUses"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AdminListCouponsQuery, AdminListCouponsQueryVariables>;
export const AdminPaymentAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPaymentAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminPaymentsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminPaymentAnalytics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPayments"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"capturedPayments"}},{"kind":"Field","name":{"kind":"Name","value":"capturedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"failedPayments"}},{"kind":"Field","name":{"kind":"Name","value":"failedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"refundedPayments"}},{"kind":"Field","name":{"kind":"Name","value":"refundedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"averagePaymentAmount"}},{"kind":"Field","name":{"kind":"Name","value":"successRate"}},{"kind":"Field","name":{"kind":"Name","value":"recentPayments"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethodBreakdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"successCount"}},{"kind":"Field","name":{"kind":"Name","value":"failedCount"}}]}}]}}]}}]} as unknown as DocumentNode<AdminPaymentAnalyticsQuery, AdminPaymentAnalyticsQueryVariables>;
export const AdminPaymentDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPaymentDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminPaymentDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"razorpayData"}},{"kind":"Field","name":{"kind":"Name","value":"dbData"}}]}}]}}]} as unknown as DocumentNode<AdminPaymentDetailsQuery, AdminPaymentDetailsQueryVariables>;
export const AdminPaymentsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPaymentsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminPaymentsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminPaymentsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorDescription"}},{"kind":"Field","name":{"kind":"Name","value":"errorSource"}},{"kind":"Field","name":{"kind":"Name","value":"errorStep"}},{"kind":"Field","name":{"kind":"Name","value":"errorReason"}},{"kind":"Field","name":{"kind":"Name","value":"captured"}},{"kind":"Field","name":{"kind":"Name","value":"refundStatus"}},{"kind":"Field","name":{"kind":"Name","value":"amountRefunded"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]} as unknown as DocumentNode<AdminPaymentsListQuery, AdminPaymentsListQueryVariables>;
export const AdminRefundsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminRefundsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminPaymentsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminRefundsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"speedRequested"}},{"kind":"Field","name":{"kind":"Name","value":"speedProcessed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminRefundsListQuery, AdminRefundsListQueryVariables>;
export const AdminSettlementsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSettlementsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminPaymentsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSettlementsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"utr"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminSettlementsListQuery, AdminSettlementsListQueryVariables>;
export const AdminUpdateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxDiscountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"maxTotalUses"}},{"kind":"Field","name":{"kind":"Name","value":"currentUses"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateCouponMutation, AdminUpdateCouponMutationVariables>;
export const AdminWorkbookPurchasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminWorkbookPurchases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminWorkbookPurchasesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminWorkbookPurchases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userPhone"}},{"kind":"Field","name":{"kind":"Name","value":"amountInr"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmountInr"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmountInr"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"razorpayOrderId"}},{"kind":"Field","name":{"kind":"Name","value":"razorpayPaymentId"}},{"kind":"Field","name":{"kind":"Name","value":"couponCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorDescription"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminWorkbookPurchasesQuery, AdminWorkbookPurchasesQueryVariables>;
export const AdminWorkbookStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminWorkbookStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminWorkbookStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"recentPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"pendingPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"failedPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"couponPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"freePurchases"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueBuyers"}},{"kind":"Field","name":{"kind":"Name","value":"averageOrderValue"}},{"kind":"Field","name":{"kind":"Name","value":"totalDiscountGiven"}},{"kind":"Field","name":{"kind":"Name","value":"last7DaysPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"last7DaysRevenue"}}]}}]}}]} as unknown as DocumentNode<AdminWorkbookStatsQuery, AdminWorkbookStatsQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"adminCount"}},{"kind":"Field","name":{"kind":"Name","value":"usersWithoutAssessmentCount"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const AssessmentSectionPresetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentSectionPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSectionPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"displayColor"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<AssessmentSectionPresetsQuery, AssessmentSectionPresetsQueryVariables>;
export const AssessmentTemplateContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTemplateContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTemplateContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"contentKey"}},{"kind":"Field","name":{"kind":"Name","value":"contentValue"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentTemplateContentsQuery, AssessmentTemplateContentsQueryVariables>;
export const GetAssessmentTrendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentTrends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTrends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"startedCount"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"totalStarted"}},{"kind":"Field","name":{"kind":"Name","value":"totalInProgress"}}]}}]}}]} as unknown as DocumentNode<GetAssessmentTrendsQuery, GetAssessmentTrendsQueryVariables>;
export const AssessmentTypeReadinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTypeReadiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeReadiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"ready"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCount"}},{"kind":"Field","name":{"kind":"Name","value":"requiredSectionBands"}},{"kind":"Field","name":{"kind":"Name","value":"stagesPerSection"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"passed"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentTypeReadinessQuery, AssessmentTypeReadinessQueryVariables>;
export const AssessmentTypeStagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTypeStages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeStages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeEnd"}}]}}]}}]} as unknown as DocumentNode<AssessmentTypeStagesQuery, AssessmentTypeStagesQueryVariables>;
export const CreateAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssessmentSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"aboutDescription"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"displayColor"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentSectionMutation, CreateAssessmentSectionMutationVariables>;
export const CreateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssessmentTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCount"}},{"kind":"Field","name":{"kind":"Name","value":"questionsPerSection"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"scoringFormula"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentTypeMutation, CreateAssessmentTypeMutationVariables>;
export const CreateInterpretationBandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInterpretationBand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInterpretationBandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInterpretationBand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"band"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"bandScope"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"rangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"rangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"displayRangeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"narrative"}},{"kind":"Field","name":{"kind":"Name","value":"keyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<CreateInterpretationBandMutation, CreateInterpretationBandMutationVariables>;
export const DeactivateAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeactivateAssessmentSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<DeactivateAssessmentSectionMutation, DeactivateAssessmentSectionMutationVariables>;
export const DeactivateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeactivateAssessmentTypeMutation, DeactivateAssessmentTypeMutationVariables>;
export const DeleteAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAssessmentSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteAssessmentSectionMutation, DeleteAssessmentSectionMutationVariables>;
export const DeleteInterpretationBandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteInterpretationBand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteInterpretationBandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInterpretationBand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteInterpretationBandMutation, DeleteInterpretationBandMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminDeleteUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedUserId"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GrantAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GrantAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grantAdminAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GrantAdminMutation, GrantAdminMutationVariables>;
export const GrantInternalAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GrantInternalAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grantInternalAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GrantInternalAccessMutation, GrantInternalAccessMutationVariables>;
export const SectionInterpretationBandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SectionInterpretationBands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentInterpretationBands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bandScope"},"value":{"kind":"StringValue","value":"section","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"SECTION_TYPE_ASC"},{"kind":"EnumValue","value":"DISPLAY_ORDER_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"rangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"rangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"narrative"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bandScope"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentRecommendedActionsByInterpretationBandId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"PRIORITY_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionText"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SectionInterpretationBandsQuery, SectionInterpretationBandsQueryVariables>;
export const OverallInterpretationBandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OverallInterpretationBands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentInterpretationBands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bandScope"},"value":{"kind":"StringValue","value":"overall","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"DISPLAY_ORDER_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"rangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"rangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"displayRangeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"narrative"}},{"kind":"Field","name":{"kind":"Name","value":"keyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bandScope"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentRecommendedActionsByInterpretationBandId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"PRIORITY_ASC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionText"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OverallInterpretationBandsQuery, OverallInterpretationBandsQueryVariables>;
export const CreateRecommendedActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecommendedAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecommendedActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecommendedAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionText"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRecommendedActionMutation, CreateRecommendedActionMutationVariables>;
export const UpdateRecommendedActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecommendedAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecommendedActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecommendedAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionText"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRecommendedActionMutation, UpdateRecommendedActionMutationVariables>;
export const DeleteRecommendedActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecommendedAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRecommendedActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecommendedAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteRecommendedActionMutation, DeleteRecommendedActionMutationVariables>;
export const RecomputeAutoStageRangesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecomputeAutoStageRanges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recomputeAutoStageRanges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentTypeCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeEnd"}}]}}]}}]}}]} as unknown as DocumentNode<RecomputeAutoStageRangesMutation, RecomputeAutoStageRangesMutationVariables>;
export const ReminderCandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReminderCandidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reminderType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminReminderCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reminderType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reminderType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"daysSinceSignup"}},{"kind":"Field","name":{"kind":"Name","value":"reminderCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastReminder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ReminderCandidatesQuery, ReminderCandidatesQueryVariables>;
export const ResetTemplateContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetTemplateContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetTemplateContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetTemplateContentMutation, ResetTemplateContentMutationVariables>;
export const RevokeAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeAdminAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RevokeAdminMutation, RevokeAdminMutationVariables>;
export const RevokeInternalAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeInternalAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeInternalAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RevokeInternalAccessMutation, RevokeInternalAccessMutationVariables>;
export const GetScoreDistributionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScoreDistribution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scoreDistribution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"range"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAssessments"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}}]}}]}}]} as unknown as DocumentNode<GetScoreDistributionQuery, GetScoreDistributionQueryVariables>;
export const SeedAssessmentTypeContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeedAssessmentTypeContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeedAssessmentTypeContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seedAssessmentTypeContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<SeedAssessmentTypeContentMutation, SeedAssessmentTypeContentMutationVariables>;
export const SeedAssessmentTypeSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeedAssessmentTypeSections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeedAssessmentTypeSectionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seedAssessmentTypeSections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sectionsCreated"}}]}}]}}]} as unknown as DocumentNode<SeedAssessmentTypeSectionsMutation, SeedAssessmentTypeSectionsMutationVariables>;
export const SendReminderEmailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendReminderEmails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendReminderEmailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSendReminderEmails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"queuedCount"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendReminderEmailsMutation, SendReminderEmailsMutationVariables>;
export const UpdateAssessmentTypeStagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentTypeStages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssessmentTypeStagesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentTypeStages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"sectionRangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"overallRangeEnd"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentTypeStagesMutation, UpdateAssessmentTypeStagesMutationVariables>;
export const UpdateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssessmentTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentTypeMutation, UpdateAssessmentTypeMutationVariables>;
export const UpdateInterpretationBandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInterpretationBand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInterpretationBandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInterpretationBand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"band"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"rangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"rangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"displayRangeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"narrative"}},{"kind":"Field","name":{"kind":"Name","value":"keyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInterpretationBandMutation, UpdateInterpretationBandMutationVariables>;
export const UpdateTemplateContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTemplateContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTemplateContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTemplateContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateTemplateContentMutation, UpdateTemplateContentMutationVariables>;
export const GetUsersWithoutAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithoutAssessment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersWithoutAssessment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetUsersWithoutAssessmentQuery, GetUsersWithoutAssessmentQueryVariables>;
export const AdminAssessmentStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAssessmentStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssessmentStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSections"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"totalInterpretationBands"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecommendedActions"}},{"kind":"Field","name":{"kind":"Name","value":"activeQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"inactiveQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"questionsBySectionType"}}]}}]}}]} as unknown as DocumentNode<AdminAssessmentStatsQuery, AdminAssessmentStatsQueryVariables>;
export const AssessmentProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"answeredQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}}]}}]}}]} as unknown as DocumentNode<AssessmentProgressQuery, AssessmentProgressQueryVariables>;
export const AssessmentQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentQuestionsQuery, AssessmentQuestionsQueryVariables>;
export const GetAssessmentResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeByAssessmentTypeCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"scoringFormula"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationNarrative"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationKeyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedActions"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentSectionResultsByResultId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"sectionEmoji"}},{"kind":"Field","name":{"kind":"Name","value":"sectionDisplayColor"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationNarrative"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationBandId"}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"displayColor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cohortComparison"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAge"}},{"kind":"Field","name":{"kind":"Name","value":"userGender"}},{"kind":"Field","name":{"kind":"Name","value":"ageCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ageRange"}},{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"genderCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"overallCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssessmentResultQuery, GetAssessmentResultQueryVariables>;
export const AssessmentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasCompletedAssessment"}},{"kind":"Field","name":{"kind":"Name","value":"hasActiveSession"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"completedAssessments"}},{"kind":"Field","name":{"kind":"Name","value":"availableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"isDyadic"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentStatusQuery, AssessmentStatusQueryVariables>;
export const AssessmentTypeByCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTypeByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<AssessmentTypeByCodeQuery, AssessmentTypeByCodeQueryVariables>;
export const AvailableAssessmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AvailableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<AvailableAssessmentsQuery, AvailableAssessmentsQueryVariables>;
export const BulkCreateAssessmentQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateAssessmentQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkCreateQuestionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateAssessmentQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<BulkCreateAssessmentQuestionsMutation, BulkCreateAssessmentQuestionsMutationVariables>;
export const CompleteAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailed"}},{"kind":"Field","name":{"kind":"Name","value":"emailedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}},{"kind":"Field","name":{"kind":"Name","value":"coupleComplete"}},{"kind":"Field","name":{"kind":"Name","value":"waitingForPartner"}}]}}]}}]} as unknown as DocumentNode<CompleteAssessmentMutation, CompleteAssessmentMutationVariables>;
export const CreateAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentQuestionMutation, CreateAssessmentQuestionMutationVariables>;
export const CurrentAssessmentSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentAssessmentSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAssessmentSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<CurrentAssessmentSessionQuery, CurrentAssessmentSessionQueryVariables>;
export const DeleteMyAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMyAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"confirmation"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"deletedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteMyAssessmentMutation, DeleteMyAssessmentMutationVariables>;
export const DeleteAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteAssessmentQuestionMutation, DeleteAssessmentQuestionMutationVariables>;
export const GetSectionQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSectionQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sectionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"questionCategory"}},{"kind":"Field","name":{"kind":"Name","value":"answerOptions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetSectionQuestionsQuery, GetSectionQuestionsQueryVariables>;
export const GetAllSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"DISPLAY_ORDER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"aboutDescription"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"displayColor"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCategory"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSectionsQuery, GetAllSectionsQueryVariables>;
export const GetSessionQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSessionQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSessionQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswered"}},{"kind":"Field","name":{"kind":"Name","value":"questionCategory"}},{"kind":"Field","name":{"kind":"Name","value":"answerOptions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"navigation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevious"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"previousNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nextNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answeredCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"percentComplete"}}]}}]}}]}}]} as unknown as DocumentNode<GetSessionQuestionQuery, GetSessionQuestionQueryVariables>;
export const ResendReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"resultId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResendReportMutation, ResendReportMutationVariables>;
export const SessionQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentSessionQuestionsBySessionId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswered"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assessmentResponsesBySessionId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SessionQuestionsQuery, SessionQuestionsQueryVariables>;
export const StartAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartAssessmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<StartAssessmentMutation, StartAssessmentMutationVariables>;
export const SubmitOrUpdateResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitOrUpdateResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitOrUpdateResponseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitOrUpdateResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastAnsweredQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answeredCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"percentComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SubmitOrUpdateResponseMutation, SubmitOrUpdateResponseMutationVariables>;
export const UpdateAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentQuestionMutation, UpdateAssessmentQuestionMutationVariables>;
export const UpdateAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"aboutDescription"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"displayColor"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentSectionMutation, UpdateAssessmentSectionMutationVariables>;
export const GetUsersWithAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersWithAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressCount"}}]}}]}}]} as unknown as DocumentNode<GetUsersWithAssessmentQuery, GetUsersWithAssessmentQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UpdatePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patch"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>;
export const CheckPaymentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckPaymentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserPaymentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"hasPaid"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amountInr"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CheckPaymentStatusQuery, CheckPaymentStatusQueryVariables>;
export const CreatePaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"razorpayKeyId"}},{"kind":"Field","name":{"kind":"Name","value":"couponApplied"}},{"kind":"Field","name":{"kind":"Name","value":"couponMessage"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}}]}}]}}]} as unknown as DocumentNode<CreatePaymentOrderMutation, CreatePaymentOrderMutationVariables>;
export const ValidateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"finalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ValidateCouponMutation, ValidateCouponMutationVariables>;
export const VerifyPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"paymentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyPaymentMutation, VerifyPaymentMutationVariables>;
export const CreateWorkbookOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkbookOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkbookOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkbookOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"razorpayKeyId"}},{"kind":"Field","name":{"kind":"Name","value":"couponApplied"}},{"kind":"Field","name":{"kind":"Name","value":"couponMessage"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}}]}}]}}]} as unknown as DocumentNode<CreateWorkbookOrderMutation, CreateWorkbookOrderMutationVariables>;
export const VerifyWorkbookPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyWorkbookPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyWorkbookPaymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyWorkbookPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyWorkbookPaymentMutation, VerifyWorkbookPaymentMutationVariables>;
export const WorkbookStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkbookStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserWorkbookStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"purchasedAt"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseId"}}]}}]}}]} as unknown as DocumentNode<WorkbookStatusQuery, WorkbookStatusQueryVariables>;