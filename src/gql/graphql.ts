/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any; }
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: any; output: any; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any; }
  /** The day, does not include a time. */
  Date: { input: any; output: any; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: { input: any; output: any; }
};

export type ActivateCouponInput = {
  id: Scalars['UUID']['input'];
};

export type ActivateCouponPayload = {
  __typename?: 'ActivateCouponPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminDeleteUserInput = {
  userId: Scalars['UUID']['input'];
};

export type AdminDeleteUserPayload = {
  __typename?: 'AdminDeleteUserPayload';
  deletedUserId?: Maybe<Scalars['UUID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminPaymentAnalyticsPayload = {
  __typename?: 'AdminPaymentAnalyticsPayload';
  averagePaymentAmount: Scalars['Float']['output'];
  capturedAmount: Scalars['Int']['output'];
  capturedPayments: Scalars['Int']['output'];
  failedAmount: Scalars['Int']['output'];
  failedPayments: Scalars['Int']['output'];
  paymentMethodBreakdown: Array<PaymentMethodStats>;
  recentPayments: Scalars['Int']['output'];
  refundedAmount: Scalars['Int']['output'];
  refundedPayments: Scalars['Int']['output'];
  successRate: Scalars['Float']['output'];
  totalAmount: Scalars['Int']['output'];
  totalPayments: Scalars['Int']['output'];
};

export type AdminPaymentDetailsPayload = {
  __typename?: 'AdminPaymentDetailsPayload';
  dbData?: Maybe<Scalars['String']['output']>;
  razorpayData: Scalars['String']['output'];
};

export type AdminPaymentsFilterInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Int']['input']>;
};

export type AdminPaymentsListPayload = {
  __typename?: 'AdminPaymentsListPayload';
  count: Scalars['Int']['output'];
  entity: Scalars['String']['output'];
  items: Array<RazorpayPaymentItem>;
};

export type AdminRefundsListPayload = {
  __typename?: 'AdminRefundsListPayload';
  count: Scalars['Int']['output'];
  entity: Scalars['String']['output'];
  items: Array<RazorpayRefundItem>;
};

export type AdminSettlementsListPayload = {
  __typename?: 'AdminSettlementsListPayload';
  count: Scalars['Int']['output'];
  entity: Scalars['String']['output'];
  items: Array<RazorpaySettlementItem>;
};

export type AdminStatsPayload = {
  __typename?: 'AdminStatsPayload';
  activeQuestions: Scalars['Int']['output'];
  inactiveQuestions: Scalars['Int']['output'];
  questionsBySectionType: Scalars['JSON']['output'];
  totalInterpretationBands: Scalars['Int']['output'];
  totalQuestions: Scalars['Int']['output'];
  totalRecommendedActions: Scalars['Int']['output'];
  totalSections: Scalars['Int']['output'];
};

/** Age cohort comparison (same age range, any gender) */
export type AgeCohort = {
  __typename?: 'AgeCohort';
  ageRange: Scalars['String']['output'];
  cohortSize: Scalars['Int']['output'];
  sectionScores: Array<CohortSectionScore>;
  totalScore: CohortTotalScore;
};

export type AllUsersPayload = {
  __typename?: 'AllUsersPayload';
  adminCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<UserInfo>;
  usersWithoutAssessmentCount: Scalars['Int']['output'];
};

/** Aggregated statistics for cohort comparison. Single row table updated after each assessment completion. */
export type AssessmentCohortStat = {
  __typename?: 'AssessmentCohortStat';
  /** Reads a single `AssessmentType` that is related to this `AssessmentCohortStat`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  /** Average lifestyle readiness score across all users */
  avgLifestyleScore: Scalars['BigFloat']['output'];
  /** Average mental readiness score across all users */
  avgMentalScore: Scalars['BigFloat']['output'];
  /** Average physical readiness score across all users */
  avgPhysicalScore: Scalars['BigFloat']['output'];
  /** Average psychological readiness score across all users */
  avgPsychologicalScore: Scalars['BigFloat']['output'];
  /** Average social readiness score across all users */
  avgSocialScore: Scalars['BigFloat']['output'];
  /** Average Total Readiness Index across all users */
  avgTotalReadinessIndex: Scalars['BigFloat']['output'];
  id: Scalars['UUID']['output'];
  /** Timestamp of the last statistics update */
  lastUpdatedAt: Scalars['Datetime']['output'];
  /** Total number of completed assessments */
  totalAssessments: Scalars['Int']['output'];
};

/** The fields on `assessmentCohortStat` to look up the row to connect. */
export type AssessmentCohortStatAssessmentCohortStatsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentCohortStat` to look up the row to connect. */
export type AssessmentCohortStatAssessmentCohortStatsTypeUniqueConnect = {
  assessmentTypeCode: Scalars['String']['input'];
};

/**
 * A condition to be used against `AssessmentCohortStat` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentCohortStatCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `lastUpdatedAt` field. */
  lastUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `AssessmentCohortStat` */
export type AssessmentCohortStatInput = {
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInput>;
  /** Average lifestyle readiness score across all users */
  avgLifestyleScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average mental readiness score across all users */
  avgMentalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average physical readiness score across all users */
  avgPhysicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average psychological readiness score across all users */
  avgPsychologicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average social readiness score across all users */
  avgSocialScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average Total Readiness Index across all users */
  avgTotalReadinessIndex?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Timestamp of the last statistics update */
  lastUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Total number of completed assessments */
  totalAssessments?: InputMaybe<Scalars['Int']['input']>;
};

/** The fields on `assessmentCohortStat` to look up the row to update. */
export type AssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentCohortStatsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentCohortStat` being updated. */
  patch: UpdateAssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentCohortStat` to look up the row to update. */
export type AssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentCohortStatsTypeUniqueUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentCohortStat` being updated. */
  patch: UpdateAssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch;
};

/** Represents an update to a `AssessmentCohortStat`. Fields that are set will be updated. */
export type AssessmentCohortStatPatch = {
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInput>;
  /** Average lifestyle readiness score across all users */
  avgLifestyleScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average mental readiness score across all users */
  avgMentalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average physical readiness score across all users */
  avgPhysicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average psychological readiness score across all users */
  avgPsychologicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average social readiness score across all users */
  avgSocialScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average Total Readiness Index across all users */
  avgTotalReadinessIndex?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Timestamp of the last statistics update */
  lastUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Total number of completed assessments */
  totalAssessments?: InputMaybe<Scalars['Int']['input']>;
};

/** The `assessmentCohortStat` to be created by this mutation. */
export type AssessmentCohortStatsAssessmentTypeCodeFkeyAssessmentCohortStatsCreateInput = {
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInput>;
  /** Average lifestyle readiness score across all users */
  avgLifestyleScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average mental readiness score across all users */
  avgMentalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average physical readiness score across all users */
  avgPhysicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average psychological readiness score across all users */
  avgPsychologicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average social readiness score across all users */
  avgSocialScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average Total Readiness Index across all users */
  avgTotalReadinessIndex?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Timestamp of the last statistics update */
  lastUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Total number of completed assessments */
  totalAssessments?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentCohortStatInput` mutation. */
export type AssessmentCohortStatsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentCohortStat` in the `AssessmentTypeInput` mutation. */
export type AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentCohortStat` for the far side of the relationship. */
  connectByAssessmentTypeCode?: InputMaybe<AssessmentCohortStatAssessmentCohortStatsTypeUniqueConnect>;
  /** The primary key(s) for `assessmentCohortStat` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentCohortStatAssessmentCohortStatsPkeyConnect>;
  /** A `AssessmentCohortStatInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<AssessmentCohortStatsAssessmentTypeCodeFkeyAssessmentCohortStatsCreateInput>>;
  /** The primary key(s) and patch data for `assessmentCohortStat` for the far side of the relationship. */
  updateByAssessmentTypeCode?: InputMaybe<AssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentCohortStatsTypeUniqueUpdate>;
  /** The primary key(s) and patch data for `assessmentCohortStat` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentCohortStatsPkeyUpdate>;
};

/** A connection to a list of `AssessmentCohortStat` values. */
export type AssessmentCohortStatsConnection = {
  __typename?: 'AssessmentCohortStatsConnection';
  /** A list of edges which contains the `AssessmentCohortStat` and cursor to aid in pagination. */
  edges: Array<AssessmentCohortStatsEdge>;
  /** A list of `AssessmentCohortStat` objects. */
  nodes: Array<AssessmentCohortStat>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentCohortStat` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentCohortStat` edge in the connection. */
export type AssessmentCohortStatsEdge = {
  __typename?: 'AssessmentCohortStatsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentCohortStat` at the end of the edge. */
  node: AssessmentCohortStat;
};

/** Methods to use when ordering `AssessmentCohortStat`. */
export enum AssessmentCohortStatsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastUpdatedAtAsc = 'LAST_UPDATED_AT_ASC',
  LastUpdatedAtDesc = 'LAST_UPDATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBand = {
  __typename?: 'AssessmentInterpretationBand';
  /** Reads and enables pagination through a set of `AssessmentRecommendedAction`. */
  assessmentRecommendedActionsByInterpretationBandId: AssessmentRecommendedActionsConnection;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultId: AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByInterpretationBandId: AssessmentResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsByInterpretationBandId: AssessmentSectionResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSection`. */
  assessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionId: AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyConnection;
  /** Reads a single `AssessmentType` that is related to this `AssessmentInterpretationBand`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCode: AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyConnection;
  /** section = per-dimension scores (10-100); overall = total readiness index */
  bandScope: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  /** Admin display order within scope (lower = shown first) */
  displayOrder: Scalars['Int']['output'];
  /** Optional display-only score range label (e.g. 50–149 for PDF overall page) */
  displayRangeLabel?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Optional short mindset quote (primarily for overall bands in reports) */
  keyMindset?: Maybe<Scalars['String']['output']>;
  /** Display label for the band (e.g., Vulnerable, Emerging, Developing, Proactive, Thriving) */
  label: Scalars['String']['output'];
  /** Descriptive text explaining this score band, shared across all sections */
  narrative: Scalars['String']['output'];
  /** Ending score of this interpretation band (inclusive, 10-100) */
  rangeEnd: Scalars['Int']['output'];
  /** Starting score of this interpretation band (inclusive, 10-100) */
  rangeStart: Scalars['Int']['output'];
  /** Dimension key for section bands (psychological, social, mental, physical, lifestyle). NULL for overall bands. */
  sectionType?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `User`. */
  usersByAssessmentResultInterpretationBandIdAndUserId: AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyConnection;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentRecommendedActionsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentRecommendedActionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentRecommendedActionsOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentSectionResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionsOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


/** Score interpretation bands for the assessment results. Narratives are shared across all sections. */
export type AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** The fields on `assessmentInterpretationBand` to look up the row to connect. */
export type AssessmentInterpretationBandAssessmentInterpretationBandsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** A connection to a list of `AssessmentResult` values, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyConnection = {
  __typename?: 'AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentResult`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyEdge>;
  /** A list of `AssessmentResult` objects. */
  nodes: Array<AssessmentResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentResult` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyEdge = {
  __typename?: 'AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsByResultId: AssessmentSectionResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentResult` at the end of the edge. */
  node: AssessmentResult;
};


/** A `AssessmentResult` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentResultsByAssessmentSectionResultInterpretationBandIdAndResultIdManyToManyEdgeAssessmentSectionResultsByResultIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};

/** A connection to a list of `AssessmentSection` values, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyConnection = {
  __typename?: 'AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentSection`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyEdge>;
  /** A list of `AssessmentSection` objects. */
  nodes: Array<AssessmentSection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSection` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSection` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyEdge = {
  __typename?: 'AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsBySectionId: AssessmentSectionResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentSection` at the end of the edge. */
  node: AssessmentSection;
};


/** A `AssessmentSection` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentInterpretationBandAssessmentSectionsByAssessmentSectionResultInterpretationBandIdAndSectionIdManyToManyEdgeAssessmentSectionResultsBySectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByAssessmentTypeCode: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
};


/** A `AssessmentType` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandAssessmentTypesByAssessmentResultInterpretationBandIdAndAssessmentTypeCodeManyToManyEdgeAssessmentResultsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/**
 * A condition to be used against `AssessmentInterpretationBand` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentInterpretationBandCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `bandScope` field. */
  bandScope?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayOrder` field. */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `label` field. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rangeStart` field. */
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `sectionType` field. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
};

/** The fields on `assessmentInterpretationBand` to look up the row to update. */
export type AssessmentInterpretationBandOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentInterpretationBandsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
  patch: UpdateAssessmentInterpretationBandOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentInterpretationBand` to look up the row to update. */
export type AssessmentInterpretationBandOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
  patch: UpdateAssessmentInterpretationBandOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyPatch;
};

/** The fields on `assessmentInterpretationBand` to look up the row to update. */
export type AssessmentInterpretationBandOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
  patch: UpdateAssessmentInterpretationBandOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyPatch;
};

/** The fields on `assessmentInterpretationBand` to look up the row to update. */
export type AssessmentInterpretationBandOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
  patch: UpdateAssessmentInterpretationBandOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch;
};

/** A connection to a list of `User` values, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyConnection = {
  __typename?: 'AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyEdge = {
  __typename?: 'AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResults: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};


/** A `User` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentInterpretationBandUsersByAssessmentResultInterpretationBandIdAndUserIdManyToManyEdgeAssessmentResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentInterpretationBandInput` mutation. */
export type AssessmentInterpretationBandsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentInterpretationBand` in the `AssessmentTypeInput` mutation. */
export type AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentInterpretationBand` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentInterpretationBandAssessmentInterpretationBandsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentInterpretationBand` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentInterpretationBandOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentInterpretationBandsPkeyUpdate>>;
};

/** A connection to a list of `AssessmentInterpretationBand` values. */
export type AssessmentInterpretationBandsConnection = {
  __typename?: 'AssessmentInterpretationBandsConnection';
  /** A list of edges which contains the `AssessmentInterpretationBand` and cursor to aid in pagination. */
  edges: Array<AssessmentInterpretationBandsEdge>;
  /** A list of `AssessmentInterpretationBand` objects. */
  nodes: Array<AssessmentInterpretationBand>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentInterpretationBand` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentInterpretationBand` edge in the connection. */
export type AssessmentInterpretationBandsEdge = {
  __typename?: 'AssessmentInterpretationBandsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentInterpretationBand` at the end of the edge. */
  node: AssessmentInterpretationBand;
};

/** Methods to use when ordering `AssessmentInterpretationBand`. */
export enum AssessmentInterpretationBandsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  BandScopeAsc = 'BAND_SCOPE_ASC',
  BandScopeDesc = 'BAND_SCOPE_DESC',
  DisplayOrderAsc = 'DISPLAY_ORDER_ASC',
  DisplayOrderDesc = 'DISPLAY_ORDER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  LabelAsc = 'LABEL_ASC',
  LabelDesc = 'LABEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RangeStartAsc = 'RANGE_START_ASC',
  RangeStartDesc = 'RANGE_START_DESC',
  SectionTypeAsc = 'SECTION_TYPE_ASC',
  SectionTypeDesc = 'SECTION_TYPE_DESC'
}

export type AssessmentProgressPayload = {
  __typename?: 'AssessmentProgressPayload';
  answeredQuestions: Scalars['Int']['output'];
  currentQuestionNumber: Scalars['Int']['output'];
  progressPercentage: Scalars['Float']['output'];
  session?: Maybe<AssessmentSession>;
  totalQuestions: Scalars['Int']['output'];
};

/** Questions for the psychometric assessment test. Default 50 questions (10 per section) are seeded from the Silver Spring Retirement Readiness Assessment. Admins can add additional questions to any section. */
export type AssessmentQuestion = {
  __typename?: 'AssessmentQuestion';
  /** Reads and enables pagination through a set of `AssessmentResponse`. */
  assessmentResponsesByQuestionId: AssessmentResponsesConnection;
  /** Reads and enables pagination through a set of `AssessmentSessionQuestion`. */
  assessmentSessionQuestionsByQuestionId: AssessmentSessionQuestionsConnection;
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessionsByAssessmentResponseQuestionIdAndSessionId: AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionId: AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyConnection;
  createdAt: Scalars['Datetime']['output'];
  /** Order in which questions should be displayed to admins within a section */
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** The actual question text to be displayed to the user */
  questionText: Scalars['String']['output'];
  /** Reads a single `AssessmentSection` that is related to this `AssessmentQuestion`. */
  section?: Maybe<AssessmentSection>;
  /** The section this question belongs to */
  sectionId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


/** Questions for the psychometric assessment test. Default 50 questions (10 per section) are seeded from the Silver Spring Retirement Readiness Assessment. Admins can add additional questions to any section. */
export type AssessmentQuestionAssessmentResponsesByQuestionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResponseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResponsesOrderBy>>;
};


/** Questions for the psychometric assessment test. Default 50 questions (10 per section) are seeded from the Silver Spring Retirement Readiness Assessment. Admins can add additional questions to any section. */
export type AssessmentQuestionAssessmentSessionQuestionsByQuestionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionQuestionsOrderBy>>;
};


/** Questions for the psychometric assessment test. Default 50 questions (10 per section) are seeded from the Silver Spring Retirement Readiness Assessment. Admins can add additional questions to any section. */
export type AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};


/** Questions for the psychometric assessment test. Default 50 questions (10 per section) are seeded from the Silver Spring Retirement Readiness Assessment. Admins can add additional questions to any section. */
export type AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** The fields on `assessmentQuestion` to look up the row to connect. */
export type AssessmentQuestionAssessmentQuestionsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** A connection to a list of `AssessmentSession` values, with data from `AssessmentResponse`. */
export type AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyConnection = {
  __typename?: 'AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentSession`, info from the `AssessmentResponse`, and the cursor to aid in pagination. */
  edges: Array<AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyEdge>;
  /** A list of `AssessmentSession` objects. */
  nodes: Array<AssessmentSession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSession` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSession` edge in the connection, with data from `AssessmentResponse`. */
export type AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyEdge = {
  __typename?: 'AssessmentQuestionAssessmentSessionsByAssessmentResponseQuestionIdAndSessionIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  id: Scalars['UUID']['output'];
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate: Scalars['Boolean']['output'];
  /** The `AssessmentSession` at the end of the edge. */
  node: AssessmentSession;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['output'];
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/** A connection to a list of `AssessmentSession` values, with data from `AssessmentSessionQuestion`. */
export type AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyConnection = {
  __typename?: 'AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentSession`, info from the `AssessmentSessionQuestion`, and the cursor to aid in pagination. */
  edges: Array<AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyEdge>;
  /** A list of `AssessmentSession` objects. */
  nodes: Array<AssessmentSession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSession` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSession` edge in the connection, with data from `AssessmentSessionQuestion`. */
export type AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyEdge = {
  __typename?: 'AssessmentQuestionAssessmentSessionsByAssessmentSessionQuestionQuestionIdAndSessionIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  /** Whether the user has answered this question (for resume capability) */
  isAnswered: Scalars['Boolean']['output'];
  /** The `AssessmentSession` at the end of the edge. */
  node: AssessmentSession;
};

/**
 * A condition to be used against `AssessmentQuestion` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `sectionId` field. */
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentQuestion` to look up the row to update. */
export type AssessmentQuestionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentQuestionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
  patch: UpdateAssessmentQuestionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyPatch;
};

/** The fields on `assessmentQuestion` to look up the row to update. */
export type AssessmentQuestionOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentQuestionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
  patch: UpdateAssessmentQuestionOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyPatch;
};

/** The fields on `assessmentQuestion` to look up the row to update. */
export type AssessmentQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentQuestionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
  patch: UpdateAssessmentQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch;
};

/** A connection to a list of `AssessmentQuestion` values. */
export type AssessmentQuestionsConnection = {
  __typename?: 'AssessmentQuestionsConnection';
  /** A list of edges which contains the `AssessmentQuestion` and cursor to aid in pagination. */
  edges: Array<AssessmentQuestionsEdge>;
  /** A list of `AssessmentQuestion` objects. */
  nodes: Array<AssessmentQuestion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentQuestion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentQuestion` edge in the connection. */
export type AssessmentQuestionsEdge = {
  __typename?: 'AssessmentQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentQuestion` at the end of the edge. */
  node: AssessmentQuestion;
};

/** Methods to use when ordering `AssessmentQuestion`. */
export enum AssessmentQuestionsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SectionIdAsc = 'SECTION_ID_ASC',
  SectionIdDesc = 'SECTION_ID_DESC'
}

/** Input for the nested mutation of `assessmentSection` in the `AssessmentQuestionInput` mutation. */
export type AssessmentQuestionsSectionIdFkeyInput = {
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectByAssessmentTypeCodeAndType?: InputMaybe<AssessmentSectionAssessmentSectionsTypeAssessmentTypeUniqueConnect>;
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentSectionAssessmentSectionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateByAssessmentTypeCodeAndType?: InputMaybe<AssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentSectionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentQuestion` in the `AssessmentSectionInput` mutation. */
export type AssessmentQuestionsSectionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentQuestion` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentQuestionAssessmentQuestionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentQuestion` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentQuestionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentQuestionsPkeyUpdate>>;
};

/** Pool of recommended actions mapped to interpretation bands. Actions are selected based on the user's lowest scoring sections. */
export type AssessmentRecommendedAction = {
  __typename?: 'AssessmentRecommendedAction';
  /** The recommended action text to display to users */
  actionText: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Reads a single `AssessmentInterpretationBand` that is related to this `AssessmentRecommendedAction`. */
  interpretationBand?: Maybe<AssessmentInterpretationBand>;
  /** The interpretation band this action is associated with */
  interpretationBandId: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Priority of this action (lower number = higher priority, used for selecting top 5) */
  priority: Scalars['Int']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/** The fields on `assessmentRecommendedAction` to look up the row to connect. */
export type AssessmentRecommendedActionAssessmentRecommendedActionsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentRecommendedAction` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentRecommendedActionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `interpretationBandId` field. */
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `priority` field. */
  priority?: InputMaybe<Scalars['Int']['input']>;
};

/** The fields on `assessmentRecommendedAction` to look up the row to update. */
export type AssessmentRecommendedActionOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyUsingAssessmentRecommendedActionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentRecommendedAction` being updated. */
  patch: UpdateAssessmentRecommendedActionOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyPatch;
};

/** A connection to a list of `AssessmentRecommendedAction` values. */
export type AssessmentRecommendedActionsConnection = {
  __typename?: 'AssessmentRecommendedActionsConnection';
  /** A list of edges which contains the `AssessmentRecommendedAction` and cursor to aid in pagination. */
  edges: Array<AssessmentRecommendedActionsEdge>;
  /** A list of `AssessmentRecommendedAction` objects. */
  nodes: Array<AssessmentRecommendedAction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentRecommendedAction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentRecommendedAction` edge in the connection. */
export type AssessmentRecommendedActionsEdge = {
  __typename?: 'AssessmentRecommendedActionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentRecommendedAction` at the end of the edge. */
  node: AssessmentRecommendedAction;
};

/** Input for the nested mutation of `assessmentInterpretationBand` in the `AssessmentRecommendedActionInput` mutation. */
export type AssessmentRecommendedActionsInterpretationBandIdFkeyInput = {
  /** The primary key(s) for `assessmentInterpretationBand` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentInterpretationBandAssessmentInterpretationBandsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentInterpretationBand` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentInterpretationBandOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentRecommendedAction` in the `AssessmentInterpretationBandInput` mutation. */
export type AssessmentRecommendedActionsInterpretationBandIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentRecommendedAction` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentRecommendedActionAssessmentRecommendedActionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentRecommendedAction` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentRecommendedActionOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyUsingAssessmentRecommendedActionsPkeyUpdate>>;
};

/** Methods to use when ordering `AssessmentRecommendedAction`. */
export enum AssessmentRecommendedActionsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InterpretationBandIdAsc = 'INTERPRETATION_BAND_ID_ASC',
  InterpretationBandIdDesc = 'INTERPRETATION_BAND_ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PriorityAsc = 'PRIORITY_ASC',
  PriorityDesc = 'PRIORITY_DESC'
}

/** User responses to assessment questions */
export type AssessmentResponse = {
  __typename?: 'AssessmentResponse';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate: Scalars['Boolean']['output'];
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentResponse`. */
  question?: Maybe<AssessmentQuestion>;
  questionId: Scalars['UUID']['output'];
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['output'];
  /** Reads a single `AssessmentSession` that is related to this `AssessmentResponse`. */
  session?: Maybe<AssessmentSession>;
  sessionId: Scalars['UUID']['output'];
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/** The fields on `assessmentResponse` to look up the row to connect. */
export type AssessmentResponseAssessmentResponsesPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentResponse` to look up the row to connect. */
export type AssessmentResponseAssessmentResponsesSessionIdQuestionIdKeyConnect = {
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentResponse` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentResponseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `questionId` field. */
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sessionId` field. */
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `AssessmentResponse` */
export type AssessmentResponseInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['input'];
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** The fields on `assessmentResponse` to look up the row to update. */
export type AssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentResponsesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResponse` being updated. */
  patch: UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyPatch;
};

/** The fields on `assessmentResponse` to look up the row to update. */
export type AssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentResponsesSessionIdQuestionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResponse` being updated. */
  patch: UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyPatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentResponse` to look up the row to update. */
export type AssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentResponsesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResponse` being updated. */
  patch: UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyPatch;
};

/** The fields on `assessmentResponse` to look up the row to update. */
export type AssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentResponsesSessionIdQuestionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResponse` being updated. */
  patch: UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyPatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** Represents an update to a `AssessmentResponse`. Fields that are set will be updated. */
export type AssessmentResponsePatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue?: InputMaybe<Scalars['Int']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `AssessmentResponse` values. */
export type AssessmentResponsesConnection = {
  __typename?: 'AssessmentResponsesConnection';
  /** A list of edges which contains the `AssessmentResponse` and cursor to aid in pagination. */
  edges: Array<AssessmentResponsesEdge>;
  /** A list of `AssessmentResponse` objects. */
  nodes: Array<AssessmentResponse>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentResponse` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentResponse` edge in the connection. */
export type AssessmentResponsesEdge = {
  __typename?: 'AssessmentResponsesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentResponse` at the end of the edge. */
  node: AssessmentResponse;
};

/** Methods to use when ordering `AssessmentResponse`. */
export enum AssessmentResponsesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QuestionIdAsc = 'QUESTION_ID_ASC',
  QuestionIdDesc = 'QUESTION_ID_DESC',
  SessionIdAsc = 'SESSION_ID_ASC',
  SessionIdDesc = 'SESSION_ID_DESC'
}

/** The `assessmentResponse` to be created by this mutation. */
export type AssessmentResponsesQuestionIdFkeyAssessmentResponsesCreateInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['input'];
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Input for the nested mutation of `assessmentQuestion` in the `AssessmentResponseInput` mutation. */
export type AssessmentResponsesQuestionIdFkeyInput = {
  /** The primary key(s) for `assessmentQuestion` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentQuestionAssessmentQuestionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentQuestion` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentQuestionOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentQuestionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResponse` in the `AssessmentQuestionInput` mutation. */
export type AssessmentResponsesQuestionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentResponse` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentResponseAssessmentResponsesPkeyConnect>>;
  /** The primary key(s) for `assessmentResponse` for the far side of the relationship. */
  connectBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentResponseAssessmentResponsesSessionIdQuestionIdKeyConnect>>;
  /** A `AssessmentResponseInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<AssessmentResponsesQuestionIdFkeyAssessmentResponsesCreateInput>>;
  /** The primary key(s) and patch data for `assessmentResponse` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentResponsesPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentResponse` for the far side of the relationship. */
  updateBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyUsingAssessmentResponsesSessionIdQuestionIdKeyUpdate>>;
};

/** The `assessmentResponse` to be created by this mutation. */
export type AssessmentResponsesSessionIdFkeyAssessmentResponsesCreateInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['input'];
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Input for the nested mutation of `assessmentSession` in the `AssessmentResponseInput` mutation. */
export type AssessmentResponsesSessionIdFkeyInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentSessionAssessmentSessionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentSessionOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentSessionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResponse` in the `AssessmentSessionInput` mutation. */
export type AssessmentResponsesSessionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentResponse` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentResponseAssessmentResponsesPkeyConnect>>;
  /** The primary key(s) for `assessmentResponse` for the far side of the relationship. */
  connectBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentResponseAssessmentResponsesSessionIdQuestionIdKeyConnect>>;
  /** A `AssessmentResponseInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<AssessmentResponsesSessionIdFkeyAssessmentResponsesCreateInput>>;
  /** The primary key(s) and patch data for `assessmentResponse` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentResponsesPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentResponse` for the far side of the relationship. */
  updateBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentResponsesSessionIdQuestionIdKeyUpdate>>;
};

/** Final results and analysis of completed assessments */
export type AssessmentResult = {
  __typename?: 'AssessmentResult';
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandId: AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsByResultId: AssessmentSectionResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSection`. */
  assessmentSectionsByAssessmentSectionResultResultIdAndSectionId: AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyConnection;
  /** Reads a single `AssessmentType` that is related to this `AssessmentResult`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  /**
   * Cohort comparison data with three INDEPENDENT dimensions:
   * 1. ageCohort: Same age range, regardless of gender
   * 2. genderCohort: Same gender, regardless of age
   * 3. overallCohort: All users
   *
   * Each cohort is calculated separately and can be null if < 5 users.
   * Frontend can display any combination of available cohorts.
   */
  cohortComparison?: Maybe<CohortComparison>;
  createdAt: Scalars['Datetime']['output'];
  /** Timestamp when the report was emailed */
  emailedAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Reads a single `AssessmentInterpretationBand` that is related to this `AssessmentResult`. */
  interpretationBand?: Maybe<AssessmentInterpretationBand>;
  interpretationBandId?: Maybe<Scalars['UUID']['output']>;
  /** Overall key mindset snapshot at completion */
  interpretationKeyMindset?: Maybe<Scalars['String']['output']>;
  /** Overall readiness stage label snapshot at completion (from overall band) */
  interpretationLabel?: Maybe<Scalars['String']['output']>;
  /** Overall readiness narrative snapshot at completion */
  interpretationNarrative?: Maybe<Scalars['String']['output']>;
  /** Whether the report has been emailed to the user */
  isEmailed: Scalars['Boolean']['output'];
  /** File path to the generated PDF report */
  pdfPath?: Maybe<Scalars['String']['output']>;
  /** Array of recommended actions based on assessment results */
  recommendedActions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Report content version at completion; compared to assessment_types.report_content_version on download */
  reportContentVersion?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `AssessmentSession` that is related to this `AssessmentResult`. */
  session?: Maybe<AssessmentSession>;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['output'];
  /** Template version used to generate the PDF report */
  templateVersion?: Maybe<Scalars['String']['output']>;
  /** Total Readiness Index (TRI) - sum of all section scores (50-500) */
  totalReadinessIndex: Scalars['Int']['output'];
  /** Reads a single `User` that is related to this `AssessmentResult`. */
  user?: Maybe<User>;
  /** User who completed the assessment (denormalized for faster queries) */
  userId: Scalars['UUID']['output'];
};


/** Final results and analysis of completed assessments */
export type AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


/** Final results and analysis of completed assessments */
export type AssessmentResultAssessmentSectionResultsByResultIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};


/** Final results and analysis of completed assessments */
export type AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionsOrderBy>>;
};

/** A connection to a list of `AssessmentInterpretationBand` values, with data from `AssessmentSectionResult`. */
export type AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyConnection = {
  __typename?: 'AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentInterpretationBand`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyEdge>;
  /** A list of `AssessmentInterpretationBand` objects. */
  nodes: Array<AssessmentInterpretationBand>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentInterpretationBand` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyEdge = {
  __typename?: 'AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsByInterpretationBandId: AssessmentSectionResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentInterpretationBand` at the end of the edge. */
  node: AssessmentInterpretationBand;
};


/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentResultAssessmentInterpretationBandsByAssessmentSectionResultResultIdAndInterpretationBandIdManyToManyEdgeAssessmentSectionResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};

/** The fields on `assessmentResult` to look up the row to connect. */
export type AssessmentResultAssessmentResultsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentResult` to look up the row to connect. */
export type AssessmentResultAssessmentResultsSessionIdKeyConnect = {
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** A connection to a list of `AssessmentSection` values, with data from `AssessmentSectionResult`. */
export type AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyConnection = {
  __typename?: 'AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentSection`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyEdge>;
  /** A list of `AssessmentSection` objects. */
  nodes: Array<AssessmentSection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSection` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSection` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyEdge = {
  __typename?: 'AssessmentResultAssessmentSectionsByAssessmentSectionResultResultIdAndSectionIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  id: Scalars['UUID']['output'];
  /** Reference to the interpretation band this score falls into */
  interpretationBandId: Scalars['UUID']['output'];
  /** Interpretation label (denormalized for reporting - e.g., Vulnerable, Thriving) */
  interpretationLabel: Scalars['String']['output'];
  /** Interpretation narrative (denormalized for reporting) */
  interpretationNarrative: Scalars['String']['output'];
  /** The `AssessmentSection` at the end of the edge. */
  node: AssessmentSection;
  /** Section score (10-100, calculated as average of 10 responses × 10) */
  score: Scalars['Int']['output'];
  sectionDisplayColor?: Maybe<Scalars['String']['output']>;
  sectionEmoji?: Maybe<Scalars['String']['output']>;
  sectionName?: Maybe<Scalars['String']['output']>;
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['output'];
};

/**
 * A condition to be used against `AssessmentResult` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentResultCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `interpretationBandId` field. */
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sessionId` field. */
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `templateVersion` field. */
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `totalReadinessIndex` field. */
  totalReadinessIndex?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentResultsSessionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyPatch;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentResultsSessionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyPatch;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyPatch;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentResultsSessionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyPatch;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyUsingAssessmentResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyPatch;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyUsingAssessmentResultsSessionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyPatch;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch;
};

/** The fields on `assessmentResult` to look up the row to update. */
export type AssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentResultsSessionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentResult` being updated. */
  patch: UpdateAssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch;
  /** Unique reference to the assessment session */
  sessionId: Scalars['UUID']['input'];
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentResultInput` mutation. */
export type AssessmentResultsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResult` in the `AssessmentTypeInput` mutation. */
export type AssessmentResultsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentResultAssessmentResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectBySessionId?: InputMaybe<Array<AssessmentResultAssessmentResultsSessionIdKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateBySessionId?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentResultsSessionIdKeyUpdate>>;
};

/** A connection to a list of `AssessmentResult` values. */
export type AssessmentResultsConnection = {
  __typename?: 'AssessmentResultsConnection';
  /** A list of edges which contains the `AssessmentResult` and cursor to aid in pagination. */
  edges: Array<AssessmentResultsEdge>;
  /** A list of `AssessmentResult` objects. */
  nodes: Array<AssessmentResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentResult` edge in the connection. */
export type AssessmentResultsEdge = {
  __typename?: 'AssessmentResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentResult` at the end of the edge. */
  node: AssessmentResult;
};

/** Input for the nested mutation of `assessmentInterpretationBand` in the `AssessmentResultInput` mutation. */
export type AssessmentResultsInterpretationBandIdFkeyInput = {
  /** The primary key(s) for `assessmentInterpretationBand` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentInterpretationBandAssessmentInterpretationBandsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentInterpretationBand` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentInterpretationBandOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResult` in the `AssessmentInterpretationBandInput` mutation. */
export type AssessmentResultsInterpretationBandIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentResultAssessmentResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectBySessionId?: InputMaybe<Array<AssessmentResultAssessmentResultsSessionIdKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateBySessionId?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyUsingAssessmentResultsSessionIdKeyUpdate>>;
};

/** Methods to use when ordering `AssessmentResult`. */
export enum AssessmentResultsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InterpretationBandIdAsc = 'INTERPRETATION_BAND_ID_ASC',
  InterpretationBandIdDesc = 'INTERPRETATION_BAND_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SessionIdAsc = 'SESSION_ID_ASC',
  SessionIdDesc = 'SESSION_ID_DESC',
  TemplateVersionAsc = 'TEMPLATE_VERSION_ASC',
  TemplateVersionDesc = 'TEMPLATE_VERSION_DESC',
  TotalReadinessIndexAsc = 'TOTAL_READINESS_INDEX_ASC',
  TotalReadinessIndexDesc = 'TOTAL_READINESS_INDEX_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `assessmentSession` in the `AssessmentResultInput` mutation. */
export type AssessmentResultsSessionIdFkeyInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentSessionAssessmentSessionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentSessionOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentSessionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResult` in the `AssessmentSessionInput` mutation. */
export type AssessmentResultsSessionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentResultAssessmentResultsPkeyConnect>;
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectBySessionId?: InputMaybe<AssessmentResultAssessmentResultsSessionIdKeyConnect>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentResultsPkeyUpdate>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateBySessionId?: InputMaybe<AssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentResultsSessionIdKeyUpdate>;
};

/** Input for the nested mutation of `user` in the `AssessmentResultInput` mutation. */
export type AssessmentResultsUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnAssessmentResultForAssessmentResultsUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentResult` in the `UserInput` mutation. */
export type AssessmentResultsUserIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentResultAssessmentResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectBySessionId?: InputMaybe<Array<AssessmentResultAssessmentResultsSessionIdKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyUsingAssessmentResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateBySessionId?: InputMaybe<Array<AssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyUsingAssessmentResultsSessionIdKeyUpdate>>;
};

/** Assessment sections scoped by assessment type. SSRI sections are fixed; new types can define their own sections. */
export type AssessmentSection = {
  __typename?: 'AssessmentSection';
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandId: AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentQuestion`. */
  assessmentQuestionsBySectionId: AssessmentQuestionsConnection;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByAssessmentSectionResultSectionIdAndResultId: AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsBySectionId: AssessmentSectionResultsConnection;
  /** Reads a single `AssessmentType` that is related to this `AssessmentSection`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  /** Detailed description of what this section assesses */
  description?: Maybe<Scalars['String']['output']>;
  /** Hex color (#RRGGBB) for charts and PDF dimension bars */
  displayColor?: Maybe<Scalars['String']['output']>;
  /** Order in which sections should be displayed to admins */
  displayOrder: Scalars['Int']['output'];
  /** Emoji displayed in PDF section headers and admin UI */
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Display name of the section */
  name: Scalars['String']['output'];
  /** Type of the assessment section (unique) */
  type: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


/** Assessment sections scoped by assessment type. SSRI sections are fixed; new types can define their own sections. */
export type AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


/** Assessment sections scoped by assessment type. SSRI sections are fixed; new types can define their own sections. */
export type AssessmentSectionAssessmentQuestionsBySectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentQuestionsOrderBy>>;
};


/** Assessment sections scoped by assessment type. SSRI sections are fixed; new types can define their own sections. */
export type AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** Assessment sections scoped by assessment type. SSRI sections are fixed; new types can define their own sections. */
export type AssessmentSectionAssessmentSectionResultsBySectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};

/** A connection to a list of `AssessmentInterpretationBand` values, with data from `AssessmentSectionResult`. */
export type AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyConnection = {
  __typename?: 'AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentInterpretationBand`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyEdge>;
  /** A list of `AssessmentInterpretationBand` objects. */
  nodes: Array<AssessmentInterpretationBand>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentInterpretationBand` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyEdge = {
  __typename?: 'AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResultsByInterpretationBandId: AssessmentSectionResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentInterpretationBand` at the end of the edge. */
  node: AssessmentInterpretationBand;
};


/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentSectionAssessmentInterpretationBandsByAssessmentSectionResultSectionIdAndInterpretationBandIdManyToManyEdgeAssessmentSectionResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};

/** A connection to a list of `AssessmentResult` values, with data from `AssessmentSectionResult`. */
export type AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyConnection = {
  __typename?: 'AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentResult`, info from the `AssessmentSectionResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyEdge>;
  /** A list of `AssessmentResult` objects. */
  nodes: Array<AssessmentResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentResult` edge in the connection, with data from `AssessmentSectionResult`. */
export type AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyEdge = {
  __typename?: 'AssessmentSectionAssessmentResultsByAssessmentSectionResultSectionIdAndResultIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  id: Scalars['UUID']['output'];
  /** Reference to the interpretation band this score falls into */
  interpretationBandId: Scalars['UUID']['output'];
  /** Interpretation label (denormalized for reporting - e.g., Vulnerable, Thriving) */
  interpretationLabel: Scalars['String']['output'];
  /** Interpretation narrative (denormalized for reporting) */
  interpretationNarrative: Scalars['String']['output'];
  /** The `AssessmentResult` at the end of the edge. */
  node: AssessmentResult;
  /** Section score (10-100, calculated as average of 10 responses × 10) */
  score: Scalars['Int']['output'];
  sectionDisplayColor?: Maybe<Scalars['String']['output']>;
  sectionEmoji?: Maybe<Scalars['String']['output']>;
  sectionName?: Maybe<Scalars['String']['output']>;
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['output'];
};

/** The fields on `assessmentSection` to look up the row to connect. */
export type AssessmentSectionAssessmentSectionsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentSection` to look up the row to connect. */
export type AssessmentSectionAssessmentSectionsTypeAssessmentTypeUniqueConnect = {
  assessmentTypeCode: Scalars['String']['input'];
  /** Type of the assessment section (unique) */
  type: Scalars['String']['input'];
};

/**
 * A condition to be used against `AssessmentSection` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentSectionCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayOrder` field. */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentSectionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyPatch;
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyPatch;
  /** Type of the assessment section (unique) */
  type: Scalars['String']['input'];
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentSectionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch;
  /** Type of the assessment section (unique) */
  type: Scalars['String']['input'];
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch;
};

/** The fields on `assessmentSection` to look up the row to update. */
export type AssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentSection` being updated. */
  patch: UpdateAssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch;
  /** Type of the assessment section (unique) */
  type: Scalars['String']['input'];
};

export type AssessmentSectionPreset = {
  __typename?: 'AssessmentSectionPreset';
  description: Scalars['String']['output'];
  displayColor?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  emoji?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

/** Detailed section-wise results with interpretations for each assessment */
export type AssessmentSectionResult = {
  __typename?: 'AssessmentSectionResult';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Reads a single `AssessmentInterpretationBand` that is related to this `AssessmentSectionResult`. */
  interpretationBand?: Maybe<AssessmentInterpretationBand>;
  /** Reference to the interpretation band this score falls into */
  interpretationBandId: Scalars['UUID']['output'];
  /** Interpretation label (denormalized for reporting - e.g., Vulnerable, Thriving) */
  interpretationLabel: Scalars['String']['output'];
  /** Interpretation narrative (denormalized for reporting) */
  interpretationNarrative: Scalars['String']['output'];
  /** Reads a single `AssessmentResult` that is related to this `AssessmentSectionResult`. */
  result?: Maybe<AssessmentResult>;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['output'];
  /** Section score (10-100, calculated as average of 10 responses × 10) */
  score: Scalars['Int']['output'];
  /** Reads a single `AssessmentSection` that is related to this `AssessmentSectionResult`. */
  section?: Maybe<AssessmentSection>;
  sectionDisplayColor?: Maybe<Scalars['String']['output']>;
  sectionEmoji?: Maybe<Scalars['String']['output']>;
  /** Reference to the section */
  sectionId: Scalars['UUID']['output'];
  sectionName?: Maybe<Scalars['String']['output']>;
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['output'];
};

/** The fields on `assessmentSectionResult` to look up the row to connect. */
export type AssessmentSectionResultAssessmentSectionResultsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to connect. */
export type AssessmentSectionResultAssessmentSectionResultsResultIdSectionIdKeyConnect = {
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Reference to the section */
  sectionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to connect. */
export type AssessmentSectionResultAssessmentSectionResultsResultIdSectionTypeKeyConnect = {
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['input'];
};

/**
 * A condition to be used against `AssessmentSectionResult` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentSectionResultCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `interpretationBandId` field. */
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `resultId` field. */
  resultId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `score` field. */
  score?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `sectionId` field. */
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sectionType` field. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch;
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Reference to the section */
  sectionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch;
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Reference to the section */
  sectionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch;
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Reference to the section */
  sectionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSectionResult` to look up the row to update. */
export type AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
  patch: UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch;
  /** Reference to the main assessment result */
  resultId: Scalars['UUID']['input'];
  /** Section type (denormalized for easier querying) */
  sectionType: Scalars['String']['input'];
};

/** A connection to a list of `AssessmentSectionResult` values. */
export type AssessmentSectionResultsConnection = {
  __typename?: 'AssessmentSectionResultsConnection';
  /** A list of edges which contains the `AssessmentSectionResult` and cursor to aid in pagination. */
  edges: Array<AssessmentSectionResultsEdge>;
  /** A list of `AssessmentSectionResult` objects. */
  nodes: Array<AssessmentSectionResult>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSectionResult` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSectionResult` edge in the connection. */
export type AssessmentSectionResultsEdge = {
  __typename?: 'AssessmentSectionResultsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentSectionResult` at the end of the edge. */
  node: AssessmentSectionResult;
};

/** Input for the nested mutation of `assessmentInterpretationBand` in the `AssessmentSectionResultInput` mutation. */
export type AssessmentSectionResultsInterpretationBandIdFkeyInput = {
  /** The primary key(s) for `assessmentInterpretationBand` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentInterpretationBandAssessmentInterpretationBandsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentInterpretationBand` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentInterpretationBandOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentInterpretationBandsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSectionResult` in the `AssessmentInterpretationBandInput` mutation. */
export type AssessmentSectionResultsInterpretationBandIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionIdKeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionTypeKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate>>;
};

/** Methods to use when ordering `AssessmentSectionResult`. */
export enum AssessmentSectionResultsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InterpretationBandIdAsc = 'INTERPRETATION_BAND_ID_ASC',
  InterpretationBandIdDesc = 'INTERPRETATION_BAND_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResultIdAsc = 'RESULT_ID_ASC',
  ResultIdDesc = 'RESULT_ID_DESC',
  ScoreAsc = 'SCORE_ASC',
  ScoreDesc = 'SCORE_DESC',
  SectionIdAsc = 'SECTION_ID_ASC',
  SectionIdDesc = 'SECTION_ID_DESC',
  SectionTypeAsc = 'SECTION_TYPE_ASC',
  SectionTypeDesc = 'SECTION_TYPE_DESC'
}

/** Input for the nested mutation of `assessmentResult` in the `AssessmentSectionResultInput` mutation. */
export type AssessmentSectionResultsResultIdFkeyInput = {
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentResultAssessmentResultsPkeyConnect>;
  /** The primary key(s) for `assessmentResult` for the far side of the relationship. */
  connectBySessionId?: InputMaybe<AssessmentResultAssessmentResultsSessionIdKeyConnect>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentResultsPkeyUpdate>;
  /** The primary key(s) and patch data for `assessmentResult` for the far side of the relationship. */
  updateBySessionId?: InputMaybe<AssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentResultsSessionIdKeyUpdate>;
};

/** Input for the nested mutation of `assessmentSectionResult` in the `AssessmentResultInput` mutation. */
export type AssessmentSectionResultsResultIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionIdKeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionTypeKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate>>;
};

/** Input for the nested mutation of `assessmentSection` in the `AssessmentSectionResultInput` mutation. */
export type AssessmentSectionResultsSectionIdFkeyInput = {
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectByAssessmentTypeCodeAndType?: InputMaybe<AssessmentSectionAssessmentSectionsTypeAssessmentTypeUniqueConnect>;
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentSectionAssessmentSectionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateByAssessmentTypeCodeAndType?: InputMaybe<AssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSectionResult` in the `AssessmentSectionInput` mutation. */
export type AssessmentSectionResultsSectionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsPkeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionIdKeyConnect>>;
  /** The primary key(s) for `assessmentSectionResult` for the far side of the relationship. */
  connectByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultAssessmentSectionResultsResultIdSectionTypeKeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionId?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsResultIdSectionIdKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSectionResult` for the far side of the relationship. */
  updateByResultIdAndSectionType?: InputMaybe<Array<AssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyUsingAssessmentSectionResultsResultIdSectionTypeKeyUpdate>>;
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentSectionInput` mutation. */
export type AssessmentSectionsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSection` in the `AssessmentTypeInput` mutation. */
export type AssessmentSectionsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectByAssessmentTypeCodeAndType?: InputMaybe<Array<AssessmentSectionAssessmentSectionsTypeAssessmentTypeUniqueConnect>>;
  /** The primary key(s) for `assessmentSection` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSectionAssessmentSectionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateByAssessmentTypeCodeAndType?: InputMaybe<Array<AssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentSectionsTypeAssessmentTypeUniqueUpdate>>;
  /** The primary key(s) and patch data for `assessmentSection` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentSectionsPkeyUpdate>>;
};

/** A connection to a list of `AssessmentSection` values. */
export type AssessmentSectionsConnection = {
  __typename?: 'AssessmentSectionsConnection';
  /** A list of edges which contains the `AssessmentSection` and cursor to aid in pagination. */
  edges: Array<AssessmentSectionsEdge>;
  /** A list of `AssessmentSection` objects. */
  nodes: Array<AssessmentSection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSection` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSection` edge in the connection. */
export type AssessmentSectionsEdge = {
  __typename?: 'AssessmentSectionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentSection` at the end of the edge. */
  node: AssessmentSection;
};

/** Methods to use when ordering `AssessmentSection`. */
export enum AssessmentSectionsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  DisplayOrderAsc = 'DISPLAY_ORDER_ASC',
  DisplayOrderDesc = 'DISPLAY_ORDER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSession = {
  __typename?: 'AssessmentSession';
  /** Reads and enables pagination through a set of `AssessmentQuestion`. */
  assessmentQuestionsByAssessmentResponseSessionIdAndQuestionId: AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentQuestion`. */
  assessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionId: AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentResponse`. */
  assessmentResponsesBySessionId: AssessmentResponsesConnection;
  /** Reads a single `AssessmentResult` that is related to this `AssessmentSession`. */
  assessmentResultBySessionId?: Maybe<AssessmentResult>;
  /**
   * Reads and enables pagination through a set of `AssessmentResult`.
   * @deprecated Please use assessmentResultBySessionId instead
   */
  assessmentResultsBySessionId: AssessmentResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSessionQuestion`. */
  assessmentSessionQuestionsBySessionId: AssessmentSessionQuestionsConnection;
  /** Reads a single `AssessmentType` that is related to this `AssessmentSession`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  completionTime?: Maybe<Scalars['Datetime']['output']>;
  createdAt: Scalars['Datetime']['output'];
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber: Scalars['Int']['output'];
  /** When this session expires (30 days from start) */
  expiresAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime: Scalars['Datetime']['output'];
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `Payment` that is related to this `AssessmentSession`. */
  payment?: Maybe<Payment>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: Maybe<Scalars['UUID']['output']>;
  startTime: Scalars['Datetime']['output'];
  /** Current status of the assessment session */
  status: AssessmentStatus;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `AssessmentSession`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};


/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentQuestionsOrderBy>>;
};


/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentQuestionsOrderBy>>;
};


/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSessionAssessmentResponsesBySessionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResponseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResponsesOrderBy>>;
};


/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSessionAssessmentResultsBySessionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** Assessment test sessions for users. Each user can only have one session per payment. */
export type AssessmentSessionAssessmentSessionQuestionsBySessionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionQuestionsOrderBy>>;
};

/** A connection to a list of `AssessmentQuestion` values, with data from `AssessmentResponse`. */
export type AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyConnection = {
  __typename?: 'AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentQuestion`, info from the `AssessmentResponse`, and the cursor to aid in pagination. */
  edges: Array<AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyEdge>;
  /** A list of `AssessmentQuestion` objects. */
  nodes: Array<AssessmentQuestion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentQuestion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentQuestion` edge in the connection, with data from `AssessmentResponse`. */
export type AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyEdge = {
  __typename?: 'AssessmentSessionAssessmentQuestionsByAssessmentResponseSessionIdAndQuestionIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  id: Scalars['UUID']['output'];
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate: Scalars['Boolean']['output'];
  /** The `AssessmentQuestion` at the end of the edge. */
  node: AssessmentQuestion;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue: Scalars['Int']['output'];
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/** A connection to a list of `AssessmentQuestion` values, with data from `AssessmentSessionQuestion`. */
export type AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyConnection = {
  __typename?: 'AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentQuestion`, info from the `AssessmentSessionQuestion`, and the cursor to aid in pagination. */
  edges: Array<AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyEdge>;
  /** A list of `AssessmentQuestion` objects. */
  nodes: Array<AssessmentQuestion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentQuestion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentQuestion` edge in the connection, with data from `AssessmentSessionQuestion`. */
export type AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyEdge = {
  __typename?: 'AssessmentSessionAssessmentQuestionsByAssessmentSessionQuestionSessionIdAndQuestionIdManyToManyEdge';
  createdAt: Scalars['Datetime']['output'];
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  /** Whether the user has answered this question (for resume capability) */
  isAnswered: Scalars['Boolean']['output'];
  /** The `AssessmentQuestion` at the end of the edge. */
  node: AssessmentQuestion;
};

/** The fields on `assessmentSession` to look up the row to connect. */
export type AssessmentSessionAssessmentSessionsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentSession` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentSessionCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `paymentId` field. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<AssessmentStatus>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentResponseForAssessmentResponsesSessionIdFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentResponseForAssessmentResponsesSessionIdFkeyPatch;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentResultForAssessmentResultsSessionIdFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentResultForAssessmentResultsSessionIdFkeyPatch;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentSessionForAssessmentSessionsUserIdFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsUserIdFkeyPatch;
};

/** The fields on `assessmentSession` to look up the row to update. */
export type AssessmentSessionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSession` being updated. */
  patch: UpdateAssessmentSessionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch;
};

/** Represents an update to a `AssessmentSession`. Fields that are set will be updated. */
export type AssessmentSessionPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** Tracks which questions are assigned to each session and their randomized order. Each session has exactly 50 questions (10 random from each of 5 sections), fully shuffled. */
export type AssessmentSessionQuestion = {
  __typename?: 'AssessmentSessionQuestion';
  createdAt: Scalars['Datetime']['output'];
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  /** Whether the user has answered this question (for resume capability) */
  isAnswered: Scalars['Boolean']['output'];
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentSessionQuestion`. */
  question?: Maybe<AssessmentQuestion>;
  questionId: Scalars['UUID']['output'];
  /** Reads a single `AssessmentSession` that is related to this `AssessmentSessionQuestion`. */
  session?: Maybe<AssessmentSession>;
  sessionId: Scalars['UUID']['output'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to connect. */
export type AssessmentSessionQuestionAssessmentSessionQuestionsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to connect. */
export type AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdDisplayOrderKeyConnect = {
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to connect. */
export type AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdQuestionIdKeyConnect = {
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentSessionQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentSessionQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `questionId` field. */
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sessionId` field. */
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `AssessmentSessionQuestion` */
export type AssessmentSessionQuestionInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch;
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsSessionIdDisplayOrderKeyUpdate = {
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch;
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsSessionIdQuestionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch;
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsSessionIdDisplayOrderKeyUpdate = {
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch;
  sessionId: Scalars['UUID']['input'];
};

/** The fields on `assessmentSessionQuestion` to look up the row to update. */
export type AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsSessionIdQuestionIdKeyUpdate = {
  /** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
  patch: UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** Represents an update to a `AssessmentSessionQuestion`. Fields that are set will be updated. */
export type AssessmentSessionQuestionPatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `AssessmentSessionQuestion` values. */
export type AssessmentSessionQuestionsConnection = {
  __typename?: 'AssessmentSessionQuestionsConnection';
  /** A list of edges which contains the `AssessmentSessionQuestion` and cursor to aid in pagination. */
  edges: Array<AssessmentSessionQuestionsEdge>;
  /** A list of `AssessmentSessionQuestion` objects. */
  nodes: Array<AssessmentSessionQuestion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSessionQuestion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSessionQuestion` edge in the connection. */
export type AssessmentSessionQuestionsEdge = {
  __typename?: 'AssessmentSessionQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentSessionQuestion` at the end of the edge. */
  node: AssessmentSessionQuestion;
};

/** Methods to use when ordering `AssessmentSessionQuestion`. */
export enum AssessmentSessionQuestionsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QuestionIdAsc = 'QUESTION_ID_ASC',
  QuestionIdDesc = 'QUESTION_ID_DESC',
  SessionIdAsc = 'SESSION_ID_ASC',
  SessionIdDesc = 'SESSION_ID_DESC'
}

/** The `assessmentSessionQuestion` to be created by this mutation. */
export type AssessmentSessionQuestionsQuestionIdFkeyAssessmentSessionQuestionsCreateInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Input for the nested mutation of `assessmentQuestion` in the `AssessmentSessionQuestionInput` mutation. */
export type AssessmentSessionQuestionsQuestionIdFkeyInput = {
  /** The primary key(s) for `assessmentQuestion` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentQuestionAssessmentQuestionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentQuestion` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentQuestionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSessionQuestion` in the `AssessmentQuestionInput` mutation. */
export type AssessmentSessionQuestionsQuestionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsPkeyConnect>>;
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectBySessionIdAndDisplayOrder?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdDisplayOrderKeyConnect>>;
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdQuestionIdKeyConnect>>;
  /** A `AssessmentSessionQuestionInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<AssessmentSessionQuestionsQuestionIdFkeyAssessmentSessionQuestionsCreateInput>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateBySessionIdAndDisplayOrder?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsSessionIdDisplayOrderKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyUsingAssessmentSessionQuestionsSessionIdQuestionIdKeyUpdate>>;
};

/** The `assessmentSessionQuestion` to be created by this mutation. */
export type AssessmentSessionQuestionsSessionIdFkeyAssessmentSessionQuestionsCreateInput = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Input for the nested mutation of `assessmentSession` in the `AssessmentSessionQuestionInput` mutation. */
export type AssessmentSessionQuestionsSessionIdFkeyInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentSessionAssessmentSessionsPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentSessionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionsPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSessionQuestion` in the `AssessmentSessionInput` mutation. */
export type AssessmentSessionQuestionsSessionIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsPkeyConnect>>;
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectBySessionIdAndDisplayOrder?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdDisplayOrderKeyConnect>>;
  /** The primary key(s) for `assessmentSessionQuestion` for the far side of the relationship. */
  connectBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentSessionQuestionAssessmentSessionQuestionsSessionIdQuestionIdKeyConnect>>;
  /** A `AssessmentSessionQuestionInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<AssessmentSessionQuestionsSessionIdFkeyAssessmentSessionQuestionsCreateInput>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsPkeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateBySessionIdAndDisplayOrder?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsSessionIdDisplayOrderKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentSessionQuestion` for the far side of the relationship. */
  updateBySessionIdAndQuestionId?: InputMaybe<Array<AssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyUsingAssessmentSessionQuestionsSessionIdQuestionIdKeyUpdate>>;
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentSessionInput` mutation. */
export type AssessmentSessionsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSession` in the `AssessmentTypeInput` mutation. */
export type AssessmentSessionsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSessionAssessmentSessionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSessionOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentSessionsPkeyUpdate>>;
};

/** A connection to a list of `AssessmentSession` values. */
export type AssessmentSessionsConnection = {
  __typename?: 'AssessmentSessionsConnection';
  /** A list of edges which contains the `AssessmentSession` and cursor to aid in pagination. */
  edges: Array<AssessmentSessionsEdge>;
  /** A list of `AssessmentSession` objects. */
  nodes: Array<AssessmentSession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentSession` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentSession` edge in the connection. */
export type AssessmentSessionsEdge = {
  __typename?: 'AssessmentSessionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentSession` at the end of the edge. */
  node: AssessmentSession;
};

/** Methods to use when ordering `AssessmentSession`. */
export enum AssessmentSessionsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PaymentIdAsc = 'PAYMENT_ID_ASC',
  PaymentIdDesc = 'PAYMENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `payment` in the `AssessmentSessionInput` mutation. */
export type AssessmentSessionsPaymentIdFkeyInput = {
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectById?: InputMaybe<PaymentPaymentsPkeyConnect>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayOrderId?: InputMaybe<PaymentPaymentsRazorpayOrderIdKeyConnect>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayPaymentId?: InputMaybe<PaymentPaymentsRazorpayPaymentIdKeyConnect>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateById?: InputMaybe<PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsPkeyUpdate>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayOrderId?: InputMaybe<PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayPaymentId?: InputMaybe<PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate>;
};

/** Input for the nested mutation of `assessmentSession` in the `PaymentInput` mutation. */
export type AssessmentSessionsPaymentIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSessionAssessmentSessionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSessionOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingAssessmentSessionsPkeyUpdate>>;
};

/** Input for the nested mutation of `user` in the `AssessmentSessionInput` mutation. */
export type AssessmentSessionsUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnAssessmentSessionForAssessmentSessionsUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentSession` in the `UserInput` mutation. */
export type AssessmentSessionsUserIdFkeyInverseInput = {
  /** The primary key(s) for `assessmentSession` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentSessionAssessmentSessionsPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentSession` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentSessionOnAssessmentSessionForAssessmentSessionsUserIdFkeyUsingAssessmentSessionsPkeyUpdate>>;
};

/** Status of the assessment session: in_progress - ongoing test, completed - finished test, expired - session timeout */
export enum AssessmentStatus {
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  InProgress = 'IN_PROGRESS'
}

export type AssessmentStatusPayload = {
  __typename?: 'AssessmentStatusPayload';
  availableAssessments: Array<AssessmentTypeInfo>;
  completedAssessments: Array<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  hasActiveSession: Scalars['Boolean']['output'];
  hasCompletedAssessment: Scalars['Boolean']['output'];
  resultId?: Maybe<Scalars['UUID']['output']>;
  totalReadinessIndex?: Maybe<Scalars['Int']['output']>;
};

/** Custom content overrides for PDF report templates per assessment type */
export type AssessmentTemplateContent = {
  __typename?: 'AssessmentTemplateContent';
  /** Reads a single `AssessmentType` that is related to this `AssessmentTemplateContent`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  contentKey: Scalars['String']['output'];
  contentValue: Scalars['JSON']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/** The fields on `assessmentTemplateContent` to look up the row to connect. */
export type AssessmentTemplateContentAssessmentTemplateContentAssessmentTypeCodeContentKeKeyConnect = {
  assessmentTypeCode: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
};

/** The fields on `assessmentTemplateContent` to look up the row to connect. */
export type AssessmentTemplateContentAssessmentTemplateContentPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** Input for the nested mutation of `assessmentType` in the `AssessmentTemplateContentInput` mutation. */
export type AssessmentTemplateContentAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentTemplateContent` in the `AssessmentTypeInput` mutation. */
export type AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentTemplateContent` for the far side of the relationship. */
  connectByAssessmentTypeCodeAndContentKey?: InputMaybe<Array<AssessmentTemplateContentAssessmentTemplateContentAssessmentTypeCodeContentKeKeyConnect>>;
  /** The primary key(s) for `assessmentTemplateContent` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentTemplateContentAssessmentTemplateContentPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentTemplateContent` for the far side of the relationship. */
  updateByAssessmentTypeCodeAndContentKey?: InputMaybe<Array<AssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTemplateContentAssessmentTypeCodeContentKeKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentTemplateContent` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTemplateContentPkeyUpdate>>;
};

/**
 * A condition to be used against `AssessmentTemplateContent` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentTemplateContentCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentTemplateContent` to look up the row to update. */
export type AssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTemplateContentAssessmentTypeCodeContentKeKeyUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentTemplateContent` being updated. */
  patch: UpdateAssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentTemplateContent` to look up the row to update. */
export type AssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTemplateContentPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentTemplateContent` being updated. */
  patch: UpdateAssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch;
};

/** A connection to a list of `AssessmentTemplateContent` values. */
export type AssessmentTemplateContentsConnection = {
  __typename?: 'AssessmentTemplateContentsConnection';
  /** A list of edges which contains the `AssessmentTemplateContent` and cursor to aid in pagination. */
  edges: Array<AssessmentTemplateContentsEdge>;
  /** A list of `AssessmentTemplateContent` objects. */
  nodes: Array<AssessmentTemplateContent>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentTemplateContent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentTemplateContent` edge in the connection. */
export type AssessmentTemplateContentsEdge = {
  __typename?: 'AssessmentTemplateContentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentTemplateContent` at the end of the edge. */
  node: AssessmentTemplateContent;
};

/** Methods to use when ordering `AssessmentTemplateContent`. */
export enum AssessmentTemplateContentsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AssessmentTrendData = {
  __typename?: 'AssessmentTrendData';
  completedCount: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  inProgressCount: Scalars['Int']['output'];
  startedCount: Scalars['Int']['output'];
};

export type AssessmentTrendsInput = {
  /** Optional filter by assessment type code (e.g. "ssri", "prai"). Omit to include all types. */
  assessmentType?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type AssessmentTrendsPayload = {
  __typename?: 'AssessmentTrendsPayload';
  totalCompleted: Scalars['Int']['output'];
  totalInProgress: Scalars['Int']['output'];
  totalStarted: Scalars['Int']['output'];
  trends: Array<AssessmentTrendData>;
};

/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentType = {
  __typename?: 'AssessmentType';
  /** Reads a single `AssessmentCohortStat` that is related to this `AssessmentType`. */
  assessmentCohortStatByAssessmentTypeCode?: Maybe<AssessmentCohortStat>;
  /**
   * Reads and enables pagination through a set of `AssessmentCohortStat`.
   * @deprecated Please use assessmentCohortStatByAssessmentTypeCode instead
   */
  assessmentCohortStatsByAssessmentTypeCode: AssessmentCohortStatsConnection;
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandId: AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBandsByAssessmentTypeCode: AssessmentInterpretationBandsConnection;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByAssessmentTypeCode: AssessmentResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSection`. */
  assessmentSectionsByAssessmentTypeCode: AssessmentSectionsConnection;
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessionsByAssessmentTypeCode: AssessmentSessionsConnection;
  /** Reads and enables pagination through a set of `AssessmentTemplateContent`. */
  assessmentTemplateContentsByAssessmentTypeCode: AssessmentTemplateContentsConnection;
  /** Reads and enables pagination through a set of `AssessmentTypeStageTable`. */
  assessmentTypeStageTablesByAssessmentTypeCode: AssessmentTypeStageTablesConnection;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `CouponTable`. */
  couponTablesByPaymentAssessmentTypeCodeAndCouponId: AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyConnection;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxScore: Scalars['Int']['output'];
  metadata: Scalars['JSON']['output'];
  minScore: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Payment`. */
  paymentsByAssessmentSessionAssessmentTypeCodeAndPaymentId: AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Payment`. */
  paymentsByAssessmentTypeCode: PaymentsConnection;
  priceAmount: Scalars['Int']['output'];
  questionsPerSection: Scalars['Int']['output'];
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion: Scalars['Int']['output'];
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula: Scalars['String']['output'];
  sectionCount: Scalars['Int']['output'];
  templateVersion?: Maybe<Scalars['String']['output']>;
  totalQuestions?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `User`. */
  usersByAssessmentResultAssessmentTypeCodeAndUserId: AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByAssessmentSessionAssessmentTypeCodeAndUserId: AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPaymentAssessmentTypeCodeAndUserId: AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyConnection;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentCohortStatsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentCohortStatCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentCohortStatsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentInterpretationBandsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentResultsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentSectionsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentSessionsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentTemplateContentsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTemplateContentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTemplateContentsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeAssessmentTypeStageTablesByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeStageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypeStageTablesOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypePaymentsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** Defines available assessment types (SSRI, PRAI, etc.) with scoring and pricing configuration */
export type AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A connection to a list of `AssessmentInterpretationBand` values, with data from `AssessmentResult`. */
export type AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyConnection = {
  __typename?: 'AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentInterpretationBand`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyEdge>;
  /** A list of `AssessmentInterpretationBand` objects. */
  nodes: Array<AssessmentInterpretationBand>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentInterpretationBand` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyEdge = {
  __typename?: 'AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByInterpretationBandId: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentInterpretationBand` at the end of the edge. */
  node: AssessmentInterpretationBand;
};


/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentTypeAssessmentInterpretationBandsByAssessmentResultAssessmentTypeCodeAndInterpretationBandIdManyToManyEdgeAssessmentResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/** The fields on `assessmentType` to look up the row to connect. */
export type AssessmentTypeAssessmentTypesCodeKeyConnect = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
};

/** The fields on `assessmentType` to look up the row to connect. */
export type AssessmentTypeAssessmentTypesPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentType` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AssessmentTypeCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A connection to a list of `CouponTable` values, with data from `Payment`. */
export type AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyConnection = {
  __typename?: 'AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyConnection';
  /** A list of edges which contains the `CouponTable`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyEdge>;
  /** A list of `CouponTable` objects. */
  nodes: Array<CouponTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CouponTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CouponTable` edge in the connection, with data from `Payment`. */
export type AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyEdge = {
  __typename?: 'AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CouponTable` at the end of the edge. */
  node: CouponTable;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
};


/** A `CouponTable` edge in the connection, with data from `Payment`. */
export type AssessmentTypeCouponTablesByPaymentAssessmentTypeCodeAndCouponIdManyToManyEdgePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

export type AssessmentTypeInfo = {
  __typename?: 'AssessmentTypeInfo';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxScore: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  minScore: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  priceAmount: Scalars['Int']['output'];
  questionsPerSection: Scalars['Int']['output'];
  scoringFormula: Scalars['String']['output'];
  sectionCount: Scalars['Int']['output'];
  templateVersion?: Maybe<Scalars['String']['output']>;
  totalQuestions: Scalars['Int']['output'];
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate = {
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentType` to look up the row to update. */
export type AssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentType` being updated. */
  patch: UpdateAssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch;
};

export type AssessmentTypePayload = {
  __typename?: 'AssessmentTypePayload';
  assessmentType?: Maybe<AssessmentTypeInfo>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** A connection to a list of `Payment` values, with data from `AssessmentSession`. */
export type AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyConnection = {
  __typename?: 'AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyConnection';
  /** A list of edges which contains the `Payment`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyEdge>;
  /** A list of `Payment` objects. */
  nodes: Array<Payment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Payment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Payment` edge in the connection, with data from `AssessmentSession`. */
export type AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyEdge = {
  __typename?: 'AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Payment` at the end of the edge. */
  node: Payment;
};


/** A `Payment` edge in the connection, with data from `AssessmentSession`. */
export type AssessmentTypePaymentsByAssessmentSessionAssessmentTypeCodeAndPaymentIdManyToManyEdgeAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

export type AssessmentTypeReadinessCheck = {
  __typename?: 'AssessmentTypeReadinessCheck';
  detail: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  passed: Scalars['Boolean']['output'];
};

export type AssessmentTypeReadinessPayload = {
  __typename?: 'AssessmentTypeReadinessPayload';
  checks: Array<AssessmentTypeReadinessCheck>;
  code: Scalars['String']['output'];
  ready: Scalars['Boolean']['output'];
  requiredSectionBands: Scalars['Int']['output'];
  sectionCount: Scalars['Int']['output'];
  stagesPerSection: Scalars['Int']['output'];
};

export type AssessmentTypeStage = {
  __typename?: 'AssessmentTypeStage';
  assessmentTypeCode: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  label: Scalars['String']['output'];
  overallRangeEnd: Scalars['Int']['output'];
  overallRangeStart: Scalars['Int']['output'];
  sectionRangeEnd: Scalars['Int']['output'];
  sectionRangeStart: Scalars['Int']['output'];
};

export type AssessmentTypeStageLabelInput = {
  displayOrder: Scalars['Int']['input'];
  label: Scalars['String']['input'];
};

/** Global stage labels and score ranges per assessment type (5 stages shared across all sections) */
export type AssessmentTypeStageTable = {
  __typename?: 'AssessmentTypeStageTable';
  /** Reads a single `AssessmentType` that is related to this `AssessmentTypeStageTable`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  label: Scalars['String']['output'];
  overallRangeEnd: Scalars['Int']['output'];
  overallRangeStart: Scalars['Int']['output'];
  sectionRangeEnd: Scalars['Int']['output'];
  sectionRangeStart: Scalars['Int']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

/** The fields on `assessmentTypeStageTable` to look up the row to connect. */
export type AssessmentTypeStageTableAssessmentTypeStagesAssessmentTypeCodeDisplayOrderKeyConnect = {
  assessmentTypeCode: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
};

/** The fields on `assessmentTypeStageTable` to look up the row to connect. */
export type AssessmentTypeStageTableAssessmentTypeStagesPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/**
 * A condition to be used against `AssessmentTypeStageTable` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AssessmentTypeStageTableCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `assessmentTypeStageTable` to look up the row to update. */
export type AssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypeStagesAssessmentTypeCodeDisplayOrderKeyUpdate = {
  assessmentTypeCode: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `assessmentTypeStageTable` being updated. */
  patch: UpdateAssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch;
};

/** The fields on `assessmentTypeStageTable` to look up the row to update. */
export type AssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypeStagesPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `assessmentTypeStageTable` being updated. */
  patch: UpdateAssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch;
};

/** A connection to a list of `AssessmentTypeStageTable` values. */
export type AssessmentTypeStageTablesConnection = {
  __typename?: 'AssessmentTypeStageTablesConnection';
  /** A list of edges which contains the `AssessmentTypeStageTable` and cursor to aid in pagination. */
  edges: Array<AssessmentTypeStageTablesEdge>;
  /** A list of `AssessmentTypeStageTable` objects. */
  nodes: Array<AssessmentTypeStageTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentTypeStageTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentTypeStageTable` edge in the connection. */
export type AssessmentTypeStageTablesEdge = {
  __typename?: 'AssessmentTypeStageTablesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentTypeStageTable` at the end of the edge. */
  node: AssessmentTypeStageTable;
};

/** Methods to use when ordering `AssessmentTypeStageTable`. */
export enum AssessmentTypeStageTablesOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Input for the nested mutation of `assessmentType` in the `AssessmentTypeStageTableInput` mutation. */
export type AssessmentTypeStagesAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `assessmentTypeStageTable` in the `AssessmentTypeInput` mutation. */
export type AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `assessmentTypeStageTable` for the far side of the relationship. */
  connectByAssessmentTypeCodeAndDisplayOrder?: InputMaybe<Array<AssessmentTypeStageTableAssessmentTypeStagesAssessmentTypeCodeDisplayOrderKeyConnect>>;
  /** The primary key(s) for `assessmentTypeStageTable` for the far side of the relationship. */
  connectById?: InputMaybe<Array<AssessmentTypeStageTableAssessmentTypeStagesPkeyConnect>>;
  /** The primary key(s) and patch data for `assessmentTypeStageTable` for the far side of the relationship. */
  updateByAssessmentTypeCodeAndDisplayOrder?: InputMaybe<Array<AssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypeStagesAssessmentTypeCodeDisplayOrderKeyUpdate>>;
  /** The primary key(s) and patch data for `assessmentTypeStageTable` for the far side of the relationship. */
  updateById?: InputMaybe<Array<AssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyUsingAssessmentTypeStagesPkeyUpdate>>;
};

/** A connection to a list of `User` values, with data from `AssessmentResult`. */
export type AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyConnection = {
  __typename?: 'AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyEdge = {
  __typename?: 'AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResults: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};


/** A `User` edge in the connection, with data from `AssessmentResult`. */
export type AssessmentTypeUsersByAssessmentResultAssessmentTypeCodeAndUserIdManyToManyEdgeAssessmentResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/** A connection to a list of `User` values, with data from `AssessmentSession`. */
export type AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyConnection = {
  __typename?: 'AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `AssessmentSession`. */
export type AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyEdge = {
  __typename?: 'AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};


/** A `User` edge in the connection, with data from `AssessmentSession`. */
export type AssessmentTypeUsersByAssessmentSessionAssessmentTypeCodeAndUserIdManyToManyEdgeAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** A connection to a list of `User` values, with data from `Payment`. */
export type AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyConnection = {
  __typename?: 'AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `Payment`. */
export type AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyEdge = {
  __typename?: 'AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
};


/** A `User` edge in the connection, with data from `Payment`. */
export type AssessmentTypeUsersByPaymentAssessmentTypeCodeAndUserIdManyToManyEdgePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

/** A connection to a list of `AssessmentType` values. */
export type AssessmentTypesConnection = {
  __typename?: 'AssessmentTypesConnection';
  /** A list of edges which contains the `AssessmentType` and cursor to aid in pagination. */
  edges: Array<AssessmentTypesEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection. */
export type AssessmentTypesEdge = {
  __typename?: 'AssessmentTypesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
};

/** Methods to use when ordering `AssessmentType`. */
export enum AssessmentTypesOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type BulkCreateQuestionsInput = {
  questions: Array<BulkQuestionInput>;
  sectionId: Scalars['UUID']['input'];
};

export type BulkCreateQuestionsPayload = {
  __typename?: 'BulkCreateQuestionsPayload';
  count: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  questions: Array<AssessmentQuestion>;
  success: Scalars['Boolean']['output'];
};

export type BulkQuestionInput = {
  questionText: Scalars['String']['input'];
};

/**
 * Combined cohort comparison data with three INDEPENDENT dimensions.
 * Each cohort type is calculated separately and can be null if insufficient data.
 * - ageCohort: Same age range, any gender
 * - genderCohort: Same gender, any age range
 * - overallCohort: All users
 */
export type CohortComparison = {
  __typename?: 'CohortComparison';
  ageCohort?: Maybe<AgeCohort>;
  genderCohort?: Maybe<GenderCohort>;
  overallCohort?: Maybe<OverallCohort>;
  userAge: Scalars['Int']['output'];
  userGender: Scalars['String']['output'];
};

export type CohortSectionScore = {
  __typename?: 'CohortSectionScore';
  cohortAverage: Scalars['Float']['output'];
  sectionName: Scalars['String']['output'];
  sectionType: Scalars['String']['output'];
  userScore: Scalars['Int']['output'];
};

export type CohortTotalScore = {
  __typename?: 'CohortTotalScore';
  cohortAverage: Scalars['Float']['output'];
  userScore: Scalars['Int']['output'];
};

export type CompleteAssessmentInput = {
  sessionId: Scalars['UUID']['input'];
};

export type CompleteAssessmentPayload = {
  __typename?: 'CompleteAssessmentPayload';
  message?: Maybe<Scalars['String']['output']>;
  pdfPath?: Maybe<Scalars['String']['output']>;
  result?: Maybe<AssessmentResult>;
  success: Scalars['Boolean']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  code: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  createdBy?: Maybe<Scalars['UUID']['output']>;
  currentUses: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: DiscountType;
  discountValue: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxDiscountAmount?: Maybe<Scalars['Int']['output']>;
  maxTotalUses?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  validFrom: Scalars['Datetime']['output'];
  validUntil?: Maybe<Scalars['Datetime']['output']>;
};

export type CouponAnalytics = {
  __typename?: 'CouponAnalytics';
  activeCoupons: Scalars['Int']['output'];
  totalCoupons: Scalars['Int']['output'];
  totalDiscountGiven: Scalars['Int']['output'];
  totalRedemptions: Scalars['Int']['output'];
};

export type CouponInfo = {
  __typename?: 'CouponInfo';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: DiscountType;
  discountValue: Scalars['Int']['output'];
};

/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTable = {
  __typename?: 'CouponTable';
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByPaymentCouponIdAndAssessmentTypeCode: CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyConnection;
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `CouponUsageTable`. */
  couponUsageTables: CouponUsageTablesConnection;
  createdAt: Scalars['Datetime']['output'];
  createdBy?: Maybe<Scalars['UUID']['output']>;
  /** Running count of how many times this coupon has been used. */
  currentUses: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType: Scalars['String']['output'];
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: Maybe<Scalars['Int']['output']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `CouponTable`. */
  userByCreatedBy?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  usersByCouponUsageTableCouponIdAndUserId: CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPaymentCouponIdAndUserId: CouponTableUsersByPaymentCouponIdAndUserIdManyToManyConnection;
  validFrom: Scalars['Datetime']['output'];
  validUntil?: Maybe<Scalars['Datetime']['output']>;
};


/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTableCouponUsageTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponUsageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};


/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTablePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTableUsersByCouponUsageTableCouponIdAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** Promo codes for one-time assessment payments. Simplified for single-purchase model. Managed via AdminCouponPlugin. */
export type CouponTableUsersByPaymentCouponIdAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `Payment`. */
export type CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `Payment`. */
export type CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
  /** Reads and enables pagination through a set of `Payment`. */
  paymentsByAssessmentTypeCode: PaymentsConnection;
};


/** A `AssessmentType` edge in the connection, with data from `Payment`. */
export type CouponTableAssessmentTypesByPaymentCouponIdAndAssessmentTypeCodeManyToManyEdgePaymentsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

/**
 * A condition to be used against `CouponTable` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CouponTableCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The fields on `couponTable` to look up the row to connect. */
export type CouponTableCouponsCodeKeyConnect = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
};

/** The fields on `couponTable` to look up the row to delete. */
export type CouponTableCouponsCodeKeyDelete = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
};

/** The fields on `couponTable` to look up the row to connect. */
export type CouponTableCouponsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `couponTable` to look up the row to delete. */
export type CouponTableCouponsPkeyDelete = {
  id: Scalars['UUID']['input'];
};

/** An input for mutations affecting `CouponTable` */
export type CouponTableInput = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType: Scalars['String']['input'];
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnCouponTableForCouponsCreatedByFkeyUsingCouponsCodeKeyUpdate = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnCouponTableForCouponsCreatedByFkeyPatch;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnCouponTableForCouponsCreatedByFkeyUsingCouponsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnCouponTableForCouponsCreatedByFkeyPatch;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponsCodeKeyUpdate = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnPaymentForPaymentsCouponIdFkeyUsingCouponsCodeKeyUpdate = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnPaymentForPaymentsCouponIdFkeyPatch;
};

/** The fields on `couponTable` to look up the row to update. */
export type CouponTableOnPaymentForPaymentsCouponIdFkeyUsingCouponsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponTable` being updated. */
  patch: UpdateCouponTableOnPaymentForPaymentsCouponIdFkeyPatch;
};

/** Represents an update to a `CouponTable`. Fields that are set will be updated. */
export type CouponTablePatch = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code?: InputMaybe<Scalars['String']['input']>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType?: InputMaybe<Scalars['String']['input']>;
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `User` values, with data from `CouponUsageTable`. */
export type CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyConnection = {
  __typename?: 'CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `CouponUsageTable`, and the cursor to aid in pagination. */
  edges: Array<CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `CouponUsageTable`. */
export type CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyEdge = {
  __typename?: 'CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyEdge';
  /** Reads and enables pagination through a set of `CouponUsageTable`. */
  couponUsageTables: CouponUsageTablesConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};


/** A `User` edge in the connection, with data from `CouponUsageTable`. */
export type CouponTableUsersByCouponUsageTableCouponIdAndUserIdManyToManyEdgeCouponUsageTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponUsageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};

/** A connection to a list of `User` values, with data from `Payment`. */
export type CouponTableUsersByPaymentCouponIdAndUserIdManyToManyConnection = {
  __typename?: 'CouponTableUsersByPaymentCouponIdAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<CouponTableUsersByPaymentCouponIdAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `Payment`. */
export type CouponTableUsersByPaymentCouponIdAndUserIdManyToManyEdge = {
  __typename?: 'CouponTableUsersByPaymentCouponIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
};


/** A `User` edge in the connection, with data from `Payment`. */
export type CouponTableUsersByPaymentCouponIdAndUserIdManyToManyEdgePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

/** A connection to a list of `CouponTable` values. */
export type CouponTablesConnection = {
  __typename?: 'CouponTablesConnection';
  /** A list of edges which contains the `CouponTable` and cursor to aid in pagination. */
  edges: Array<CouponTablesEdge>;
  /** A list of `CouponTable` objects. */
  nodes: Array<CouponTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CouponTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CouponTable` edge in the connection. */
export type CouponTablesEdge = {
  __typename?: 'CouponTablesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CouponTable` at the end of the edge. */
  node: CouponTable;
};

/** Methods to use when ordering `CouponTable`. */
export enum CouponTablesOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The `couponUsageTable` to be created by this mutation. */
export type CouponUsageCouponIdFkeyCouponUsageCreateInput = {
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** The `couponTable` to be created by this mutation. */
export type CouponUsageCouponIdFkeyCouponsCreateInput = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType: Scalars['String']['input'];
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Input for the nested mutation of `couponTable` in the `CouponUsageTableInput` mutation. */
export type CouponUsageCouponIdFkeyInput = {
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectByCode?: InputMaybe<CouponTableCouponsCodeKeyConnect>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectById?: InputMaybe<CouponTableCouponsPkeyConnect>;
  /** A `CouponTableInput` object that will be created and connected to this object. */
  create?: InputMaybe<CouponUsageCouponIdFkeyCouponsCreateInput>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteByCode?: InputMaybe<CouponTableCouponsCodeKeyDelete>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteById?: InputMaybe<CouponTableCouponsPkeyDelete>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateByCode?: InputMaybe<CouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponsCodeKeyUpdate>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateById?: InputMaybe<CouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponsPkeyUpdate>;
};

/** Input for the nested mutation of `couponUsageTable` in the `CouponTableInput` mutation. */
export type CouponUsageCouponIdFkeyInverseInput = {
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectById?: InputMaybe<Array<CouponUsageTableCouponUsagePkeyConnect>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectByPaymentId?: InputMaybe<Array<CouponUsageTableUniqueCouponPerPaymentConnect>>;
  /** A `CouponUsageTableInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<CouponUsageCouponIdFkeyCouponUsageCreateInput>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<CouponUsageTableCouponUsagePkeyDelete>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteByPaymentId?: InputMaybe<Array<CouponUsageTableUniqueCouponPerPaymentDelete>>;
  /** Flag indicating whether all other `couponUsageTable` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']['input']>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateById?: InputMaybe<Array<CouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponUsagePkeyUpdate>>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateByPaymentId?: InputMaybe<Array<CouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingUniqueCouponPerPaymentUpdate>>;
};

export type CouponUsageListPayload = {
  __typename?: 'CouponUsageListPayload';
  totalCount: Scalars['Int']['output'];
  usageRecords: Array<CouponUsageRecord>;
};

/** The `couponUsageTable` to be created by this mutation. */
export type CouponUsagePaymentIdFkeyCouponUsageCreateInput = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** Input for the nested mutation of `payment` in the `CouponUsageTableInput` mutation. */
export type CouponUsagePaymentIdFkeyInput = {
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectById?: InputMaybe<PaymentPaymentsPkeyConnect>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayOrderId?: InputMaybe<PaymentPaymentsRazorpayOrderIdKeyConnect>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayPaymentId?: InputMaybe<PaymentPaymentsRazorpayPaymentIdKeyConnect>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateById?: InputMaybe<PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsPkeyUpdate>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayOrderId?: InputMaybe<PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayPaymentId?: InputMaybe<PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate>;
};

/** Input for the nested mutation of `couponUsageTable` in the `PaymentInput` mutation. */
export type CouponUsagePaymentIdFkeyInverseInput = {
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectById?: InputMaybe<CouponUsageTableCouponUsagePkeyConnect>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectByPaymentId?: InputMaybe<CouponUsageTableUniqueCouponPerPaymentConnect>;
  /** A `CouponUsageTableInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<CouponUsagePaymentIdFkeyCouponUsageCreateInput>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteById?: InputMaybe<CouponUsageTableCouponUsagePkeyDelete>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteByPaymentId?: InputMaybe<CouponUsageTableUniqueCouponPerPaymentDelete>;
  /** Flag indicating whether all other `couponUsageTable` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']['input']>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateById?: InputMaybe<CouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingCouponUsagePkeyUpdate>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateByPaymentId?: InputMaybe<CouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingUniqueCouponPerPaymentUpdate>;
};

export type CouponUsageRecord = {
  __typename?: 'CouponUsageRecord';
  couponId: Scalars['UUID']['output'];
  discountAmount: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  paymentId: Scalars['UUID']['output'];
  usedAt: Scalars['Datetime']['output'];
  userEmail?: Maybe<Scalars['String']['output']>;
  userId: Scalars['UUID']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

/** Tracks coupon redemptions for analytics. One-to-one with payments since users pay only once. */
export type CouponUsageTable = {
  __typename?: 'CouponUsageTable';
  /** Reads a single `CouponTable` that is related to this `CouponUsageTable`. */
  coupon?: Maybe<CouponTable>;
  couponId: Scalars['UUID']['output'];
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  /** Reads a single `Payment` that is related to this `CouponUsageTable`. */
  payment?: Maybe<Payment>;
  paymentId: Scalars['UUID']['output'];
  usedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `CouponUsageTable`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `CouponUsageTable` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CouponUsageTableCondition = {
  /** Checks for equality with the object’s `couponId` field. */
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `paymentId` field. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `usedAt` field. */
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `couponUsageTable` to look up the row to connect. */
export type CouponUsageTableCouponUsagePkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `couponUsageTable` to look up the row to delete. */
export type CouponUsageTableCouponUsagePkeyDelete = {
  id: Scalars['UUID']['input'];
};

/** An input for mutations affecting `CouponUsageTable` */
export type CouponUsageTableInput = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingCouponUsagePkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch;
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyUsingUniqueCouponPerPaymentUpdate = {
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch;
  paymentId: Scalars['UUID']['input'];
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingCouponUsagePkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch;
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingUniqueCouponPerPaymentUpdate = {
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch;
  paymentId: Scalars['UUID']['input'];
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyUsingCouponUsagePkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyPatch;
};

/** The fields on `couponUsageTable` to look up the row to update. */
export type CouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyUsingUniqueCouponPerPaymentUpdate = {
  /** An object where the defined keys will be set on the `couponUsageTable` being updated. */
  patch: UpdateCouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyPatch;
  paymentId: Scalars['UUID']['input'];
};

/** Represents an update to a `CouponUsageTable`. Fields that are set will be updated. */
export type CouponUsageTablePatch = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** The fields on `couponUsageTable` to look up the row to connect. */
export type CouponUsageTableUniqueCouponPerPaymentConnect = {
  paymentId: Scalars['UUID']['input'];
};

/** The fields on `couponUsageTable` to look up the row to delete. */
export type CouponUsageTableUniqueCouponPerPaymentDelete = {
  paymentId: Scalars['UUID']['input'];
};

/** A connection to a list of `CouponUsageTable` values. */
export type CouponUsageTablesConnection = {
  __typename?: 'CouponUsageTablesConnection';
  /** A list of edges which contains the `CouponUsageTable` and cursor to aid in pagination. */
  edges: Array<CouponUsageTablesEdge>;
  /** A list of `CouponUsageTable` objects. */
  nodes: Array<CouponUsageTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CouponUsageTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CouponUsageTable` edge in the connection. */
export type CouponUsageTablesEdge = {
  __typename?: 'CouponUsageTablesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CouponUsageTable` at the end of the edge. */
  node: CouponUsageTable;
};

/** Methods to use when ordering `CouponUsageTable`. */
export enum CouponUsageTablesOrderBy {
  CouponIdAsc = 'COUPON_ID_ASC',
  CouponIdDesc = 'COUPON_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PaymentIdAsc = 'PAYMENT_ID_ASC',
  PaymentIdDesc = 'PAYMENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UsedAtAsc = 'USED_AT_ASC',
  UsedAtDesc = 'USED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** The `couponUsageTable` to be created by this mutation. */
export type CouponUsageUserIdFkeyCouponUsageCreateInput = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** Input for the nested mutation of `user` in the `CouponUsageTableInput` mutation. */
export type CouponUsageUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** A `UserInput` object that will be created and connected to this object. */
  create?: InputMaybe<CouponUsageUserIdFkeyUsersCreateInput>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnCouponUsageTableForCouponUsageUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `couponUsageTable` in the `UserInput` mutation. */
export type CouponUsageUserIdFkeyInverseInput = {
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectById?: InputMaybe<Array<CouponUsageTableCouponUsagePkeyConnect>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  connectByPaymentId?: InputMaybe<Array<CouponUsageTableUniqueCouponPerPaymentConnect>>;
  /** A `CouponUsageTableInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<CouponUsageUserIdFkeyCouponUsageCreateInput>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<CouponUsageTableCouponUsagePkeyDelete>>;
  /** The primary key(s) for `couponUsageTable` for the far side of the relationship. */
  deleteByPaymentId?: InputMaybe<Array<CouponUsageTableUniqueCouponPerPaymentDelete>>;
  /** Flag indicating whether all other `couponUsageTable` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']['input']>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateById?: InputMaybe<Array<CouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyUsingCouponUsagePkeyUpdate>>;
  /** The primary key(s) and patch data for `couponUsageTable` for the far side of the relationship. */
  updateByPaymentId?: InputMaybe<Array<CouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyUsingUniqueCouponPerPaymentUpdate>>;
};

/** The `user` to be created by this mutation. */
export type CouponUsageUserIdFkeyUsersCreateInput = {
  age: Scalars['Int']['input'];
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** The `couponTable` to be created by this mutation. */
export type CouponsCreatedByFkeyCouponsCreateInput = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType: Scalars['String']['input'];
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Input for the nested mutation of `user` in the `CouponTableInput` mutation. */
export type CouponsCreatedByFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** A `UserInput` object that will be created and connected to this object. */
  create?: InputMaybe<CouponsCreatedByFkeyUsersCreateInput>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnCouponTableForCouponsCreatedByFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `couponTable` in the `UserInput` mutation. */
export type CouponsCreatedByFkeyInverseInput = {
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectByCode?: InputMaybe<Array<CouponTableCouponsCodeKeyConnect>>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectById?: InputMaybe<Array<CouponTableCouponsPkeyConnect>>;
  /** A `CouponTableInput` object that will be created and connected to this object. */
  create?: InputMaybe<Array<CouponsCreatedByFkeyCouponsCreateInput>>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteByCode?: InputMaybe<Array<CouponTableCouponsCodeKeyDelete>>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteById?: InputMaybe<Array<CouponTableCouponsPkeyDelete>>;
  /** Flag indicating whether all other `couponTable` records that match this relationship should be removed. */
  deleteOthers?: InputMaybe<Scalars['Boolean']['input']>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateByCode?: InputMaybe<Array<CouponTableOnCouponTableForCouponsCreatedByFkeyUsingCouponsCodeKeyUpdate>>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateById?: InputMaybe<Array<CouponTableOnCouponTableForCouponsCreatedByFkeyUsingCouponsPkeyUpdate>>;
};

/** The `user` to be created by this mutation. */
export type CouponsCreatedByFkeyUsersCreateInput = {
  age: Scalars['Int']['input'];
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CouponsListPayload = {
  __typename?: 'CouponsListPayload';
  coupons: Array<Coupon>;
  totalCount: Scalars['Int']['output'];
};

/** All input for the create `AssessmentCohortStat` mutation. */
export type CreateAssessmentCohortStatInput = {
  /** The `AssessmentCohortStat` to be created by this mutation. */
  assessmentCohortStat: AssessmentCohortStatInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AssessmentCohortStat` mutation. */
export type CreateAssessmentCohortStatPayload = {
  __typename?: 'CreateAssessmentCohortStatPayload';
  /** The `AssessmentCohortStat` that was created by this mutation. */
  assessmentCohortStat?: Maybe<AssessmentCohortStat>;
  /** An edge for our `AssessmentCohortStat`. May be used by Relay 1. */
  assessmentCohortStatEdge?: Maybe<AssessmentCohortStatsEdge>;
  /** Reads a single `AssessmentType` that is related to this `AssessmentCohortStat`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AssessmentCohortStat` mutation. */
export type CreateAssessmentCohortStatPayloadAssessmentCohortStatEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentCohortStatsOrderBy>>;
};

/** All input for the create `AssessmentResponse` mutation. */
export type CreateAssessmentResponseInput = {
  /** The `AssessmentResponse` to be created by this mutation. */
  assessmentResponse: AssessmentResponseInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AssessmentResponse` mutation. */
export type CreateAssessmentResponsePayload = {
  __typename?: 'CreateAssessmentResponsePayload';
  /** The `AssessmentResponse` that was created by this mutation. */
  assessmentResponse?: Maybe<AssessmentResponse>;
  /** An edge for our `AssessmentResponse`. May be used by Relay 1. */
  assessmentResponseEdge?: Maybe<AssessmentResponsesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentResponse`. */
  question?: Maybe<AssessmentQuestion>;
  /** Reads a single `AssessmentSession` that is related to this `AssessmentResponse`. */
  session?: Maybe<AssessmentSession>;
};


/** The output of our create `AssessmentResponse` mutation. */
export type CreateAssessmentResponsePayloadAssessmentResponseEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentResponsesOrderBy>>;
};

export type CreateAssessmentSectionInput = {
  assessmentTypeCode: Scalars['String']['input'];
  /** Clone 5 stage bands for this section from template (default: ssri). Pass null to create empty bands. */
  cloneBandsFromTemplate?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayColor?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAssessmentSectionPayload = {
  __typename?: 'CreateAssessmentSectionPayload';
  message?: Maybe<Scalars['String']['output']>;
  section?: Maybe<AssessmentSection>;
  success: Scalars['Boolean']['output'];
};

/** All input for the create `AssessmentSessionQuestion` mutation. */
export type CreateAssessmentSessionQuestionInput = {
  /** The `AssessmentSessionQuestion` to be created by this mutation. */
  assessmentSessionQuestion: AssessmentSessionQuestionInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `AssessmentSessionQuestion` mutation. */
export type CreateAssessmentSessionQuestionPayload = {
  __typename?: 'CreateAssessmentSessionQuestionPayload';
  /** The `AssessmentSessionQuestion` that was created by this mutation. */
  assessmentSessionQuestion?: Maybe<AssessmentSessionQuestion>;
  /** An edge for our `AssessmentSessionQuestion`. May be used by Relay 1. */
  assessmentSessionQuestionEdge?: Maybe<AssessmentSessionQuestionsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentSessionQuestion`. */
  question?: Maybe<AssessmentQuestion>;
  /** Reads a single `AssessmentSession` that is related to this `AssessmentSessionQuestion`. */
  session?: Maybe<AssessmentSession>;
};


/** The output of our create `AssessmentSessionQuestion` mutation. */
export type CreateAssessmentSessionQuestionPayloadAssessmentSessionQuestionEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentSessionQuestionsOrderBy>>;
};

export type CreateAssessmentTypeInput = {
  /**
   * Clone interpretation bands and PDF template content from this type (default: ssri).
   * Pass null to skip cloning. Questions are never cloned — add those separately.
   */
  cloneFromTemplate?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  priceAmount: Scalars['Int']['input'];
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  /** When true (default), creates the 5 standard dimension sections for this type. */
  seedSections?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateCouponInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountType: DiscountType;
  discountValue: Scalars['Int']['input'];
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CreateCouponPayload = {
  __typename?: 'CreateCouponPayload';
  coupon?: Maybe<Coupon>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the create `CouponTable` mutation. */
export type CreateCouponTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CouponTable` to be created by this mutation. */
  couponTable: CouponTableInput;
};

/** The output of our create `CouponTable` mutation. */
export type CreateCouponTablePayload = {
  __typename?: 'CreateCouponTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CouponTable` that was created by this mutation. */
  couponTable?: Maybe<CouponTable>;
  /** An edge for our `CouponTable`. May be used by Relay 1. */
  couponTableEdge?: Maybe<CouponTablesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponTable`. */
  userByCreatedBy?: Maybe<User>;
};


/** The output of our create `CouponTable` mutation. */
export type CreateCouponTablePayloadCouponTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};

/** All input for the create `CouponUsageTable` mutation. */
export type CreateCouponUsageTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `CouponUsageTable` to be created by this mutation. */
  couponUsageTable: CouponUsageTableInput;
};

/** The output of our create `CouponUsageTable` mutation. */
export type CreateCouponUsageTablePayload = {
  __typename?: 'CreateCouponUsageTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `CouponTable` that is related to this `CouponUsageTable`. */
  coupon?: Maybe<CouponTable>;
  /** The `CouponUsageTable` that was created by this mutation. */
  couponUsageTable?: Maybe<CouponUsageTable>;
  /** An edge for our `CouponUsageTable`. May be used by Relay 1. */
  couponUsageTableEdge?: Maybe<CouponUsageTablesEdge>;
  /** Reads a single `Payment` that is related to this `CouponUsageTable`. */
  payment?: Maybe<Payment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponUsageTable`. */
  user?: Maybe<User>;
};


/** The output of our create `CouponUsageTable` mutation. */
export type CreateCouponUsageTablePayloadCouponUsageTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};

/** bandScope: "section" for per-dimension scores (10-100), "overall" for total readiness index */
export type CreateInterpretationBandInput = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
  bandScope?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  narrative: Scalars['String']['input'];
  rangeEnd: Scalars['Int']['input'];
  rangeStart: Scalars['Int']['input'];
  sectionType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInterpretationBandPayload = {
  __typename?: 'CreateInterpretationBandPayload';
  band?: Maybe<AssessmentInterpretationBand>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePaymentOrderInput = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
  clientInfo?: InputMaybe<Scalars['String']['input']>;
  couponCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePaymentOrderPayload = {
  __typename?: 'CreatePaymentOrderPayload';
  amount: Scalars['Int']['output'];
  couponApplied: Scalars['Boolean']['output'];
  couponMessage?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Int']['output']>;
  isFree: Scalars['Boolean']['output'];
  orderId?: Maybe<Scalars['String']['output']>;
  originalAmount?: Maybe<Scalars['Int']['output']>;
  razorpayKeyId?: Maybe<Scalars['String']['output']>;
};

export type CreateQuestionInput = {
  questionText: Scalars['String']['input'];
  sectionId: Scalars['UUID']['input'];
};

export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  message?: Maybe<Scalars['String']['output']>;
  question?: Maybe<AssessmentQuestion>;
  success: Scalars['Boolean']['output'];
};

export type CreateRecommendedActionInput = {
  actionText: Scalars['String']['input'];
  interpretationBandId: Scalars['UUID']['input'];
  priority: Scalars['Int']['input'];
};

export type CreateRecommendedActionPayload = {
  __typename?: 'CreateRecommendedActionPayload';
  action?: Maybe<AssessmentRecommendedAction>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type CurrentResponseDetail = {
  __typename?: 'CurrentResponseDetail';
  id: Scalars['UUID']['output'];
  isUpdate: Scalars['Boolean']['output'];
  responseValue: Scalars['Int']['output'];
  timeTakenSeconds?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

export type DeactivateAssessmentSectionInput = {
  id: Scalars['UUID']['input'];
};

export type DeactivateAssessmentSectionPayload = {
  __typename?: 'DeactivateAssessmentSectionPayload';
  message?: Maybe<Scalars['String']['output']>;
  section?: Maybe<AssessmentSection>;
  success: Scalars['Boolean']['output'];
};

export type DeactivateCouponInput = {
  id: Scalars['UUID']['input'];
};

export type DeactivateCouponPayload = {
  __typename?: 'DeactivateCouponPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteAssessmentSectionInput = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['UUID']['input'];
};

export type DeleteAssessmentSectionPayload = {
  __typename?: 'DeleteAssessmentSectionPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteCouponInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteCouponPayload = {
  __typename?: 'DeleteCouponPayload';
  deletedId?: Maybe<Scalars['UUID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the `deleteCouponTableByCode` mutation. */
export type DeleteCouponTableByCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
};

/** All input for the `deleteCouponTable` mutation. */
export type DeleteCouponTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `CouponTable` mutation. */
export type DeleteCouponTablePayload = {
  __typename?: 'DeleteCouponTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CouponTable` that was deleted by this mutation. */
  couponTable?: Maybe<CouponTable>;
  /** An edge for our `CouponTable`. May be used by Relay 1. */
  couponTableEdge?: Maybe<CouponTablesEdge>;
  deletedCouponNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponTable`. */
  userByCreatedBy?: Maybe<User>;
};


/** The output of our delete `CouponTable` mutation. */
export type DeleteCouponTablePayloadCouponTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};

/** All input for the `deleteCouponUsageTableByPaymentId` mutation. */
export type DeleteCouponUsageTableByPaymentIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  paymentId: Scalars['UUID']['input'];
};

/** All input for the `deleteCouponUsageTable` mutation. */
export type DeleteCouponUsageTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `CouponUsageTable` mutation. */
export type DeleteCouponUsageTablePayload = {
  __typename?: 'DeleteCouponUsageTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `CouponTable` that is related to this `CouponUsageTable`. */
  coupon?: Maybe<CouponTable>;
  /** The `CouponUsageTable` that was deleted by this mutation. */
  couponUsageTable?: Maybe<CouponUsageTable>;
  /** An edge for our `CouponUsageTable`. May be used by Relay 1. */
  couponUsageTableEdge?: Maybe<CouponUsageTablesEdge>;
  deletedCouponUsageNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Payment` that is related to this `CouponUsageTable`. */
  payment?: Maybe<Payment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponUsageTable`. */
  user?: Maybe<User>;
};


/** The output of our delete `CouponUsageTable` mutation. */
export type DeleteCouponUsageTablePayloadCouponUsageTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};

export type DeleteInterpretationBandInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteInterpretationBandPayload = {
  __typename?: 'DeleteInterpretationBandPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteMyAssessmentInput = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
  confirmation: Scalars['Boolean']['input'];
};

export type DeleteMyAssessmentPayload = {
  __typename?: 'DeleteMyAssessmentPayload';
  deletedCount: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteQuestionInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteQuestionPayload = {
  __typename?: 'DeleteQuestionPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteRecommendedActionInput = {
  id: Scalars['UUID']['input'];
};

export type DeleteRecommendedActionPayload = {
  __typename?: 'DeleteRecommendedActionPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export enum DiscountType {
  Flat = 'FLAT',
  Percentage = 'PERCENTAGE'
}

export type EnhancedResponseDetail = {
  __typename?: 'EnhancedResponseDetail';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  isUpdate: Scalars['Boolean']['output'];
  questionId: Scalars['UUID']['output'];
  responseValue: Scalars['Int']['output'];
  sessionId: Scalars['UUID']['output'];
  timeTakenSeconds?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

/** The output of our `forgotPassword` mutation. */
export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /**
   * Whether the request was successful. Note: for security reasons, this will always return true
   * even if the email doesn't exist, to prevent email enumeration attacks.
   */
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Gender cohort comparison (same gender, any age) */
export type GenderCohort = {
  __typename?: 'GenderCohort';
  cohortSize: Scalars['Int']['output'];
  gender: Scalars['String']['output'];
  sectionScores: Array<CohortSectionScore>;
  totalScore: CohortTotalScore;
};

/** A `GetDemographicCohortStatsRecord` edge in the connection. */
export type GetDemographicCohortStatEdge = {
  __typename?: 'GetDemographicCohortStatEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GetDemographicCohortStatsRecord` at the end of the edge. */
  node: GetDemographicCohortStatsRecord;
};

/** A connection to a list of `GetDemographicCohortStatsRecord` values. */
export type GetDemographicCohortStatsConnection = {
  __typename?: 'GetDemographicCohortStatsConnection';
  /** A list of edges which contains the `GetDemographicCohortStatsRecord` and cursor to aid in pagination. */
  edges: Array<GetDemographicCohortStatEdge>;
  /** A list of `GetDemographicCohortStatsRecord` objects. */
  nodes: Array<GetDemographicCohortStatsRecord>;
  /** The count of *all* `GetDemographicCohortStatsRecord` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** The return type of our `getDemographicCohortStats` query. */
export type GetDemographicCohortStatsRecord = {
  __typename?: 'GetDemographicCohortStatsRecord';
  avgLifestyleScore?: Maybe<Scalars['BigFloat']['output']>;
  avgMentalScore?: Maybe<Scalars['BigFloat']['output']>;
  avgPhysicalScore?: Maybe<Scalars['BigFloat']['output']>;
  avgPsychologicalScore?: Maybe<Scalars['BigFloat']['output']>;
  avgSocialScore?: Maybe<Scalars['BigFloat']['output']>;
  avgTotalReadinessIndex?: Maybe<Scalars['BigFloat']['output']>;
  cohortType?: Maybe<Scalars['String']['output']>;
  totalAssessments?: Maybe<Scalars['Int']['output']>;
};

export type GrantAdminAccessInput = {
  userId: Scalars['UUID']['input'];
};

export type GrantAdminAccessPayload = {
  __typename?: 'GrantAdminAccessPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type GrantInternalAccessInput = {
  userId: Scalars['UUID']['input'];
};

export type GrantInternalAccessPayload = {
  __typename?: 'GrantInternalAccessPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

/** All input for the `incrementCouponUsage` mutation. */
export type IncrementCouponUsageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pCouponId: Scalars['UUID']['input'];
  pDiscountAmount: Scalars['Int']['input'];
  pPaymentId: Scalars['UUID']['input'];
  pUserId: Scalars['UUID']['input'];
};

/** The output of our `incrementCouponUsage` mutation. */
export type IncrementCouponUsagePayload = {
  __typename?: 'IncrementCouponUsagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  activateAssessmentType?: Maybe<AssessmentTypePayload>;
  adminActivateCoupon?: Maybe<ActivateCouponPayload>;
  adminCreateCoupon?: Maybe<CreateCouponPayload>;
  adminDeactivateCoupon?: Maybe<DeactivateCouponPayload>;
  adminDeleteCoupon?: Maybe<DeleteCouponPayload>;
  /**
   * Delete a user from the system (admin only)
   * Permanently removes a user and all associated data including sessions, responses, and results.
   * This action cannot be undone. Only administrators can delete users.
   */
  adminDeleteUser?: Maybe<AdminDeleteUserPayload>;
  adminUpdateCoupon?: Maybe<UpdateCouponPayload>;
  /**
   * Bulk create multiple questions for a section (admin only)
   * Useful for importing questions from CSV/JSON
   */
  bulkCreateAssessmentQuestions?: Maybe<BulkCreateQuestionsPayload>;
  /**
   * Complete the assessment and generate results.
   * All 50 questions must be answered.
   */
  completeAssessment?: Maybe<CompleteAssessmentPayload>;
  /** Creates a single `AssessmentCohortStat`. */
  createAssessmentCohortStat?: Maybe<CreateAssessmentCohortStatPayload>;
  /**
   * Create a new assessment question (admin only)
   * Display order is automatically assigned as the next available number in the section.
   */
  createAssessmentQuestion?: Maybe<CreateQuestionPayload>;
  /** Creates a single `AssessmentResponse`. */
  createAssessmentResponse?: Maybe<CreateAssessmentResponsePayload>;
  /** Create a section for a draft assessment type from the preset dimension list (admin only). */
  createAssessmentSection?: Maybe<CreateAssessmentSectionPayload>;
  /** Creates a single `AssessmentSessionQuestion`. */
  createAssessmentSessionQuestion?: Maybe<CreateAssessmentSessionQuestionPayload>;
  createAssessmentType?: Maybe<AssessmentTypePayload>;
  /** Creates a single `CouponTable`. */
  createCouponTable?: Maybe<CreateCouponTablePayload>;
  /** Creates a single `CouponUsageTable`. */
  createCouponUsageTable?: Maybe<CreateCouponUsageTablePayload>;
  /** Create a new interpretation band (admin only) */
  createInterpretationBand?: Maybe<CreateInterpretationBandPayload>;
  createPaymentOrder?: Maybe<CreatePaymentOrderPayload>;
  /** Create a new recommended action (admin only) */
  createRecommendedAction?: Maybe<CreateRecommendedActionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Soft-deactivate a section on a draft assessment type (admin only). */
  deactivateAssessmentSection?: Maybe<DeactivateAssessmentSectionPayload>;
  deactivateAssessmentType?: Maybe<AssessmentTypePayload>;
  /** Delete an assessment question (admin only) */
  deleteAssessmentQuestion?: Maybe<DeleteQuestionPayload>;
  /**
   * Hard-delete a section on a draft assessment type (admin only).
   * Blocked when active questions or historical results exist unless force rules apply.
   */
  deleteAssessmentSection?: Maybe<DeleteAssessmentSectionPayload>;
  /** Deletes a single `CouponTable` using a unique key. */
  deleteCouponTable?: Maybe<DeleteCouponTablePayload>;
  /** Deletes a single `CouponTable` using a unique key. */
  deleteCouponTableByCode?: Maybe<DeleteCouponTablePayload>;
  /** Deletes a single `CouponUsageTable` using a unique key. */
  deleteCouponUsageTable?: Maybe<DeleteCouponUsageTablePayload>;
  /** Deletes a single `CouponUsageTable` using a unique key. */
  deleteCouponUsageTableByPaymentId?: Maybe<DeleteCouponUsageTablePayload>;
  /** Delete an interpretation band (admin only) */
  deleteInterpretationBand?: Maybe<DeleteInterpretationBandPayload>;
  /**
   * Delete all assessment data for the current user (internal users only).
   * Allows internal users to retake the assessment for testing purposes.
   * Deletes sessions, responses, and results.
   */
  deleteMyAssessment?: Maybe<DeleteMyAssessmentPayload>;
  /** Delete a recommended action (admin only) */
  deleteRecommendedAction?: Maybe<DeleteRecommendedActionPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /**
   * If you've forgotten your password, use this mutation to request a password reset.
   * If the email is registered, you'll receive an email with a reset token.
   * For security, this mutation always returns success regardless of whether the email exists.
   */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  /**
   * Grant admin access to a user (admin only)
   * Only existing admins can grant admin access to other users
   */
  grantAdminAccess?: Maybe<GrantAdminAccessPayload>;
  /**
   * Grant internal access to a user (admin only)
   * Internal users can test without payment and delete assessments.
   * Note: Admins are always internal and cannot have internal access revoked.
   */
  grantInternalAccess?: Maybe<GrantInternalAccessPayload>;
  /** Increments coupon usage counter and records the usage for analytics. Called after successful payment. */
  incrementCouponUsage?: Maybe<IncrementCouponUsagePayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  /** Resend assessment report email (admin only) */
  resendAssessmentReport?: Maybe<ResendReportPayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  resetTemplateContent?: Maybe<TemplateContentPayload>;
  /**
   * Revoke admin access from a user (admin only)
   * Only existing admins can revoke admin access from other users
   */
  revokeAdminAccess?: Maybe<RevokeAdminAccessPayload>;
  /**
   * Revoke internal access from a user (admin only)
   * Cannot revoke internal access from admin users.
   * Internal users will lose testing privileges and must pay like regular users.
   */
  revokeInternalAccess?: Maybe<RevokeInternalAccessPayload>;
  seedAssessmentTypeContent?: Maybe<AssessmentTypePayload>;
  /** Seed preset sections for a draft type using its configured sectionCount (idempotent). */
  seedAssessmentTypeSections?: Maybe<SeedAssessmentTypeSectionsPayload>;
  /**
   * Start a new assessment session.
   * - Regular users: Must provide paymentId and can only take test once
   * - Internal users (admins and is_internal=true): Can start without payment and retake multiple times
   */
  startAssessment?: Maybe<StartAssessmentPayload>;
  /**
   * Submit or update a response for a question with enhanced state management.
   * Automatically handles both new submissions and updates to previous answers.
   * Intelligently advances session state when navigating forward.
   */
  submitOrUpdateResponse?: Maybe<SubmitOrUpdateResponsePayload>;
  /** Updates a single `AssessmentCohortStat` using a unique key and a patch. */
  updateAssessmentCohortStat?: Maybe<UpdateAssessmentCohortStatPayload>;
  /** Updates a single `AssessmentCohortStat` using a unique key and a patch. */
  updateAssessmentCohortStatByAssessmentTypeCode?: Maybe<UpdateAssessmentCohortStatPayload>;
  /** Update an existing assessment question (admin only) */
  updateAssessmentQuestion?: Maybe<UpdateQuestionPayload>;
  /** Updates a single `AssessmentResponse` using a unique key and a patch. */
  updateAssessmentResponse?: Maybe<UpdateAssessmentResponsePayload>;
  /** Updates a single `AssessmentResponse` using a unique key and a patch. */
  updateAssessmentResponseBySessionIdAndQuestionId?: Maybe<UpdateAssessmentResponsePayload>;
  /**
   * Update an existing assessment section (admin only)
   * Only allows updating name, description, and is_active status.
   * Section type and display order cannot be changed as they are fixed.
   */
  updateAssessmentSection?: Maybe<UpdateSectionPayload>;
  /** Updates a single `AssessmentSession` using a unique key and a patch. */
  updateAssessmentSession?: Maybe<UpdateAssessmentSessionPayload>;
  /** Updates a single `AssessmentSessionQuestion` using a unique key and a patch. */
  updateAssessmentSessionQuestion?: Maybe<UpdateAssessmentSessionQuestionPayload>;
  /** Updates a single `AssessmentSessionQuestion` using a unique key and a patch. */
  updateAssessmentSessionQuestionBySessionIdAndDisplayOrder?: Maybe<UpdateAssessmentSessionQuestionPayload>;
  /** Updates a single `AssessmentSessionQuestion` using a unique key and a patch. */
  updateAssessmentSessionQuestionBySessionIdAndQuestionId?: Maybe<UpdateAssessmentSessionQuestionPayload>;
  updateAssessmentType?: Maybe<AssessmentTypePayload>;
  /** Update global stage labels for an assessment type (admin only). */
  updateAssessmentTypeStages?: Maybe<UpdateAssessmentTypeStagesPayload>;
  /** Updates a single `CouponTable` using a unique key and a patch. */
  updateCouponTable?: Maybe<UpdateCouponTablePayload>;
  /** Updates a single `CouponTable` using a unique key and a patch. */
  updateCouponTableByCode?: Maybe<UpdateCouponTablePayload>;
  /** Updates a single `CouponUsageTable` using a unique key and a patch. */
  updateCouponUsageTable?: Maybe<UpdateCouponUsageTablePayload>;
  /** Updates a single `CouponUsageTable` using a unique key and a patch. */
  updateCouponUsageTableByPaymentId?: Maybe<UpdateCouponUsageTablePayload>;
  /** Update an existing interpretation band (admin only) */
  updateInterpretationBand?: Maybe<UpdateInterpretationBandPayload>;
  /** Update an existing recommended action (admin only) */
  updateRecommendedAction?: Maybe<UpdateRecommendedActionPayload>;
  updateTemplateContent?: Maybe<TemplateContentPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  validateCoupon?: Maybe<ValidateCouponPayload>;
  verifyPayment?: Maybe<VerifyPaymentPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationActivateAssessmentTypeArgs = {
  code: Scalars['String']['input'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminActivateCouponArgs = {
  input: ActivateCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminCreateCouponArgs = {
  input: CreateCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminDeactivateCouponArgs = {
  input: DeactivateCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminDeleteCouponArgs = {
  input: DeleteCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminDeleteUserArgs = {
  input: AdminDeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAdminUpdateCouponArgs = {
  input: UpdateCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationBulkCreateAssessmentQuestionsArgs = {
  input: BulkCreateQuestionsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCompleteAssessmentArgs = {
  input: CompleteAssessmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentCohortStatArgs = {
  input: CreateAssessmentCohortStatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentQuestionArgs = {
  input: CreateQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentResponseArgs = {
  input: CreateAssessmentResponseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentSectionArgs = {
  input: CreateAssessmentSectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentSessionQuestionArgs = {
  input: CreateAssessmentSessionQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAssessmentTypeArgs = {
  input: CreateAssessmentTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCouponTableArgs = {
  input: CreateCouponTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCouponUsageTableArgs = {
  input: CreateCouponUsageTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInterpretationBandArgs = {
  input: CreateInterpretationBandInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePaymentOrderArgs = {
  input: CreatePaymentOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRecommendedActionArgs = {
  input: CreateRecommendedActionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeactivateAssessmentSectionArgs = {
  input: DeactivateAssessmentSectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeactivateAssessmentTypeArgs = {
  code: Scalars['String']['input'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAssessmentQuestionArgs = {
  input: DeleteQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAssessmentSectionArgs = {
  input: DeleteAssessmentSectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCouponTableArgs = {
  input: DeleteCouponTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCouponTableByCodeArgs = {
  input: DeleteCouponTableByCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCouponUsageTableArgs = {
  input: DeleteCouponUsageTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCouponUsageTableByPaymentIdArgs = {
  input: DeleteCouponUsageTableByPaymentIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInterpretationBandArgs = {
  input: DeleteInterpretationBandInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMyAssessmentArgs = {
  input: DeleteMyAssessmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecommendedActionArgs = {
  input: DeleteRecommendedActionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGrantAdminAccessArgs = {
  input: GrantAdminAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGrantInternalAccessArgs = {
  input: GrantInternalAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationIncrementCouponUsageArgs = {
  input: IncrementCouponUsageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResendAssessmentReportArgs = {
  input: ResendReportInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetTemplateContentArgs = {
  assessmentType: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRevokeAdminAccessArgs = {
  input: RevokeAdminAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRevokeInternalAccessArgs = {
  input: RevokeInternalAccessInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSeedAssessmentTypeContentArgs = {
  input: SeedAssessmentTypeContentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSeedAssessmentTypeSectionsArgs = {
  input: SeedAssessmentTypeSectionsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationStartAssessmentArgs = {
  input: StartAssessmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSubmitOrUpdateResponseArgs = {
  input: SubmitOrUpdateResponseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentCohortStatArgs = {
  input: UpdateAssessmentCohortStatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentCohortStatByAssessmentTypeCodeArgs = {
  input: UpdateAssessmentCohortStatByAssessmentTypeCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentQuestionArgs = {
  input: UpdateQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentResponseArgs = {
  input: UpdateAssessmentResponseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentResponseBySessionIdAndQuestionIdArgs = {
  input: UpdateAssessmentResponseBySessionIdAndQuestionIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentSectionArgs = {
  input: UpdateSectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentSessionArgs = {
  input: UpdateAssessmentSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentSessionQuestionArgs = {
  input: UpdateAssessmentSessionQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentSessionQuestionBySessionIdAndDisplayOrderArgs = {
  input: UpdateAssessmentSessionQuestionBySessionIdAndDisplayOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentSessionQuestionBySessionIdAndQuestionIdArgs = {
  input: UpdateAssessmentSessionQuestionBySessionIdAndQuestionIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentTypeArgs = {
  input: UpdateAssessmentTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAssessmentTypeStagesArgs = {
  input: UpdateAssessmentTypeStagesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCouponTableArgs = {
  input: UpdateCouponTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCouponTableByCodeArgs = {
  input: UpdateCouponTableByCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCouponUsageTableArgs = {
  input: UpdateCouponUsageTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCouponUsageTableByPaymentIdArgs = {
  input: UpdateCouponUsageTableByPaymentIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInterpretationBandArgs = {
  input: UpdateInterpretationBandInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecommendedActionArgs = {
  input: UpdateRecommendedActionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTemplateContentArgs = {
  input: UpdateTemplateContentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationValidateCouponArgs = {
  input: ValidateCouponInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyPaymentArgs = {
  input: VerifyPaymentInput;
};

export type NavigationMetadata = {
  __typename?: 'NavigationMetadata';
  currentNumber: Scalars['Int']['output'];
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  nextNumber?: Maybe<Scalars['Int']['output']>;
  previousNumber?: Maybe<Scalars['Int']['output']>;
  totalQuestions: Scalars['Int']['output'];
};

export type NextQuestionHint = {
  __typename?: 'NextQuestionHint';
  hasNext: Scalars['Boolean']['output'];
  questionNumber?: Maybe<Scalars['Int']['output']>;
};

/** Overall cohort comparison (all users) */
export type OverallCohort = {
  __typename?: 'OverallCohort';
  cohortSize: Scalars['Int']['output'];
  sectionScores: Array<CohortSectionScore>;
  totalScore: CohortTotalScore;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** Payment records for audit trail and reconciliation. Amounts are in INR paise. Used for one-time test purchases. */
export type Payment = {
  __typename?: 'Payment';
  amountInr: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** Reads a single `AssessmentType` that is related to this `Payment`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  assessmentTypeCode: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCode: PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyConnection;
  /** Reads a single `CouponTable` that is related to this `Payment`. */
  coupon?: Maybe<CouponTable>;
  /** Reference to coupon used for this payment, if any. */
  couponId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `CouponUsageTable` that is related to this `Payment`. */
  couponUsageTable?: Maybe<CouponUsageTable>;
  /**
   * Reads and enables pagination through a set of `CouponUsageTable`.
   * @deprecated Please use couponUsageTable instead
   */
  couponUsageTables: CouponUsageTablesConnection;
  createdAt: Scalars['Datetime']['output'];
  currency: Scalars['String']['output'];
  /** Discount amount applied in paise (e.g., 50000 for ₹500 off). Defaults to 0. */
  discountAmountInr?: Maybe<Scalars['Int']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorDescription?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  /** Original assessment price before discount in paise (e.g., 99900 for ₹999). NULL if no coupon was used. */
  originalAmountInr?: Maybe<Scalars['Int']['output']>;
  /** Payment method used (card, upi, netbanking, wallet, etc.). Populated from Razorpay on payment capture. */
  paymentMethod?: Maybe<Scalars['String']['output']>;
  razorpayOrderId?: Maybe<Scalars['String']['output']>;
  razorpayPaymentId?: Maybe<Scalars['String']['output']>;
  razorpaySignature?: Maybe<Scalars['String']['output']>;
  status: PaymentStatus;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Payment`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `User`. */
  usersByAssessmentSessionPaymentIdAndUserId: PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyConnection;
};


/** Payment records for audit trail and reconciliation. Amounts are in INR paise. Used for one-time test purchases. */
export type PaymentAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};


/** Payment records for audit trail and reconciliation. Amounts are in INR paise. Used for one-time test purchases. */
export type PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


/** Payment records for audit trail and reconciliation. Amounts are in INR paise. Used for one-time test purchases. */
export type PaymentCouponUsageTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponUsageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};


/** Payment records for audit trail and reconciliation. Amounts are in INR paise. Used for one-time test purchases. */
export type PaymentUsersByAssessmentSessionPaymentIdAndUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `AssessmentSession`. */
export type PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `AssessmentSession`. */
export type PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessionsByAssessmentTypeCode: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
};


/** A `AssessmentType` edge in the connection, with data from `AssessmentSession`. */
export type PaymentAssessmentTypesByAssessmentSessionPaymentIdAndAssessmentTypeCodeManyToManyEdgeAssessmentSessionsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** A condition to be used against `Payment` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PaymentCondition = {
  /** Checks for equality with the object’s `assessmentTypeCode` field. */
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `couponId` field. */
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `razorpayOrderId` field. */
  razorpayOrderId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `razorpayPaymentId` field. */
  razorpayPaymentId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<PaymentStatus>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type PaymentMethodStats = {
  __typename?: 'PaymentMethodStats';
  count: Scalars['Int']['output'];
  failedCount: Scalars['Int']['output'];
  method: Scalars['String']['output'];
  successCount: Scalars['Int']['output'];
  totalAmount: Scalars['Int']['output'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch;
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch;
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch;
  razorpayPaymentId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch;
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch;
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch;
  razorpayPaymentId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch;
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsRazorpayOrderIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch;
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch;
  razorpayPaymentId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsCouponIdFkeyPatch;
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsCouponIdFkeyPatch;
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsCouponIdFkeyPatch;
  razorpayPaymentId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsUserIdFkeyPatch;
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsUserIdFkeyPatch;
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to update. */
export type PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate = {
  /** An object where the defined keys will be set on the `payment` being updated. */
  patch: UpdatePaymentOnPaymentForPaymentsUserIdFkeyPatch;
  razorpayPaymentId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to connect. */
export type PaymentPaymentsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `payment` to look up the row to connect. */
export type PaymentPaymentsRazorpayOrderIdKeyConnect = {
  razorpayOrderId: Scalars['String']['input'];
};

/** The fields on `payment` to look up the row to connect. */
export type PaymentPaymentsRazorpayPaymentIdKeyConnect = {
  razorpayPaymentId: Scalars['String']['input'];
};

export enum PaymentStatus {
  Authorized = 'AUTHORIZED',
  Captured = 'CAPTURED',
  Created = 'CREATED',
  Failed = 'FAILED',
  Refunded = 'REFUNDED'
}

/** A connection to a list of `User` values, with data from `AssessmentSession`. */
export type PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyConnection = {
  __typename?: 'PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyConnection';
  /** A list of edges which contains the `User`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection, with data from `AssessmentSession`. */
export type PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyEdge = {
  __typename?: 'PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};


/** A `User` edge in the connection, with data from `AssessmentSession`. */
export type PaymentUsersByAssessmentSessionPaymentIdAndUserIdManyToManyEdgeAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** Input for the nested mutation of `assessmentType` in the `PaymentInput` mutation. */
export type PaymentsAssessmentTypeCodeFkeyInput = {
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectByCode?: InputMaybe<AssessmentTypeAssessmentTypesCodeKeyConnect>;
  /** The primary key(s) for `assessmentType` for the far side of the relationship. */
  connectById?: InputMaybe<AssessmentTypeAssessmentTypesPkeyConnect>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateByCode?: InputMaybe<AssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingAssessmentTypesCodeKeyUpdate>;
  /** The primary key(s) and patch data for `assessmentType` for the far side of the relationship. */
  updateById?: InputMaybe<AssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingAssessmentTypesPkeyUpdate>;
};

/** Input for the nested mutation of `payment` in the `AssessmentTypeInput` mutation. */
export type PaymentsAssessmentTypeCodeFkeyInverseInput = {
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectById?: InputMaybe<Array<PaymentPaymentsPkeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayOrderId?: InputMaybe<Array<PaymentPaymentsRazorpayOrderIdKeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayPaymentId?: InputMaybe<Array<PaymentPaymentsRazorpayPaymentIdKeyConnect>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateById?: InputMaybe<Array<PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsPkeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayOrderId?: InputMaybe<Array<PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsRazorpayOrderIdKeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayPaymentId?: InputMaybe<Array<PaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate>>;
};

/** A connection to a list of `Payment` values. */
export type PaymentsConnection = {
  __typename?: 'PaymentsConnection';
  /** A list of edges which contains the `Payment` and cursor to aid in pagination. */
  edges: Array<PaymentsEdge>;
  /** A list of `Payment` objects. */
  nodes: Array<Payment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Payment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** Input for the nested mutation of `couponTable` in the `PaymentInput` mutation. */
export type PaymentsCouponIdFkeyInput = {
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectByCode?: InputMaybe<CouponTableCouponsCodeKeyConnect>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  connectById?: InputMaybe<CouponTableCouponsPkeyConnect>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteByCode?: InputMaybe<CouponTableCouponsCodeKeyDelete>;
  /** The primary key(s) for `couponTable` for the far side of the relationship. */
  deleteById?: InputMaybe<CouponTableCouponsPkeyDelete>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateByCode?: InputMaybe<CouponTableOnPaymentForPaymentsCouponIdFkeyUsingCouponsCodeKeyUpdate>;
  /** The primary key(s) and patch data for `couponTable` for the far side of the relationship. */
  updateById?: InputMaybe<CouponTableOnPaymentForPaymentsCouponIdFkeyUsingCouponsPkeyUpdate>;
};

/** Input for the nested mutation of `payment` in the `CouponTableInput` mutation. */
export type PaymentsCouponIdFkeyInverseInput = {
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectById?: InputMaybe<Array<PaymentPaymentsPkeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayOrderId?: InputMaybe<Array<PaymentPaymentsRazorpayOrderIdKeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayPaymentId?: InputMaybe<Array<PaymentPaymentsRazorpayPaymentIdKeyConnect>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateById?: InputMaybe<Array<PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsPkeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayOrderId?: InputMaybe<Array<PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayPaymentId?: InputMaybe<Array<PaymentOnPaymentForPaymentsCouponIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate>>;
};

/** A `Payment` edge in the connection. */
export type PaymentsEdge = {
  __typename?: 'PaymentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Payment` at the end of the edge. */
  node: Payment;
};

/** Methods to use when ordering `Payment`. */
export enum PaymentsOrderBy {
  AssessmentTypeCodeAsc = 'ASSESSMENT_TYPE_CODE_ASC',
  AssessmentTypeCodeDesc = 'ASSESSMENT_TYPE_CODE_DESC',
  CouponIdAsc = 'COUPON_ID_ASC',
  CouponIdDesc = 'COUPON_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RazorpayOrderIdAsc = 'RAZORPAY_ORDER_ID_ASC',
  RazorpayOrderIdDesc = 'RAZORPAY_ORDER_ID_DESC',
  RazorpayPaymentIdAsc = 'RAZORPAY_PAYMENT_ID_ASC',
  RazorpayPaymentIdDesc = 'RAZORPAY_PAYMENT_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `user` in the `PaymentInput` mutation. */
export type PaymentsUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnPaymentForPaymentsUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `payment` in the `UserInput` mutation. */
export type PaymentsUserIdFkeyInverseInput = {
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectById?: InputMaybe<Array<PaymentPaymentsPkeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayOrderId?: InputMaybe<Array<PaymentPaymentsRazorpayOrderIdKeyConnect>>;
  /** The primary key(s) for `payment` for the far side of the relationship. */
  connectByRazorpayPaymentId?: InputMaybe<Array<PaymentPaymentsRazorpayPaymentIdKeyConnect>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateById?: InputMaybe<Array<PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsPkeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayOrderId?: InputMaybe<Array<PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsRazorpayOrderIdKeyUpdate>>;
  /** The primary key(s) and patch data for `payment` for the far side of the relationship. */
  updateByRazorpayPaymentId?: InputMaybe<Array<PaymentOnPaymentForPaymentsUserIdFkeyUsingPaymentsRazorpayPaymentIdKeyUpdate>>;
};

export type ProgressMetadata = {
  __typename?: 'ProgressMetadata';
  answeredCount: Scalars['Int']['output'];
  percentComplete: Scalars['Float']['output'];
  totalCount: Scalars['Int']['output'];
};

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /** Get admin statistics about assessment content (admin only) */
  adminAssessmentStats?: Maybe<AdminStatsPayload>;
  adminAssessmentTypes: Array<AssessmentTypeInfo>;
  adminCouponAnalytics?: Maybe<CouponAnalytics>;
  adminCouponById?: Maybe<Coupon>;
  adminCouponUsage?: Maybe<CouponUsageListPayload>;
  adminListCoupons?: Maybe<CouponsListPayload>;
  /**
   * Admin only: Get payment analytics and statistics from local database.
   * Optionally filter by date range.
   * Requires admin privileges.
   */
  adminPaymentAnalytics?: Maybe<AdminPaymentAnalyticsPayload>;
  /**
   * Admin only: Fetch detailed payment information by Razorpay payment ID.
   * Returns both Razorpay data and local database data.
   * Requires admin privileges.
   */
  adminPaymentDetails?: Maybe<AdminPaymentDetailsPayload>;
  /**
   * Admin only: Fetch all payments from Razorpay with filters.
   * Requires admin privileges.
   */
  adminPaymentsList?: Maybe<AdminPaymentsListPayload>;
  /**
   * Admin only: Fetch all refunds from Razorpay.
   * Requires admin privileges.
   */
  adminRefundsList?: Maybe<AdminRefundsListPayload>;
  /**
   * Admin only: Fetch all settlements from Razorpay.
   * Requires admin privileges.
   */
  adminSettlementsList?: Maybe<AdminSettlementsListPayload>;
  /**
   * Get list of all users in the system (admin only)
   * Includes user details and admin status for role management
   */
  allUsers?: Maybe<AllUsersPayload>;
  assessmentCohortStat?: Maybe<AssessmentCohortStat>;
  assessmentCohortStatByAssessmentTypeCode?: Maybe<AssessmentCohortStat>;
  /** Reads and enables pagination through a set of `AssessmentCohortStat`. */
  assessmentCohortStats?: Maybe<AssessmentCohortStatsConnection>;
  assessmentInterpretationBand?: Maybe<AssessmentInterpretationBand>;
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBands?: Maybe<AssessmentInterpretationBandsConnection>;
  /** Get progress information for the current assessment session */
  assessmentProgress?: Maybe<AssessmentProgressPayload>;
  assessmentQuestion?: Maybe<AssessmentQuestion>;
  /** Reads and enables pagination through a set of `AssessmentQuestion`. */
  assessmentQuestions?: Maybe<AssessmentQuestionsConnection>;
  assessmentRecommendedAction?: Maybe<AssessmentRecommendedAction>;
  /** Reads and enables pagination through a set of `AssessmentRecommendedAction`. */
  assessmentRecommendedActions?: Maybe<AssessmentRecommendedActionsConnection>;
  assessmentResponse?: Maybe<AssessmentResponse>;
  assessmentResponseBySessionIdAndQuestionId?: Maybe<AssessmentResponse>;
  /** Reads and enables pagination through a set of `AssessmentResponse`. */
  assessmentResponses?: Maybe<AssessmentResponsesConnection>;
  assessmentResult?: Maybe<AssessmentResult>;
  assessmentResultBySessionId?: Maybe<AssessmentResult>;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResults?: Maybe<AssessmentResultsConnection>;
  assessmentSection?: Maybe<AssessmentSection>;
  assessmentSectionByAssessmentTypeCodeAndType?: Maybe<AssessmentSection>;
  /** Preset dimension list for section create/seed UIs (admin only). */
  assessmentSectionPresets: Array<AssessmentSectionPreset>;
  assessmentSectionResult?: Maybe<AssessmentSectionResult>;
  assessmentSectionResultByResultIdAndSectionId?: Maybe<AssessmentSectionResult>;
  assessmentSectionResultByResultIdAndSectionType?: Maybe<AssessmentSectionResult>;
  /** Reads and enables pagination through a set of `AssessmentSectionResult`. */
  assessmentSectionResults?: Maybe<AssessmentSectionResultsConnection>;
  /** Reads and enables pagination through a set of `AssessmentSection`. */
  assessmentSections?: Maybe<AssessmentSectionsConnection>;
  assessmentSession?: Maybe<AssessmentSession>;
  assessmentSessionQuestion?: Maybe<AssessmentSessionQuestion>;
  assessmentSessionQuestionBySessionIdAndDisplayOrder?: Maybe<AssessmentSessionQuestion>;
  assessmentSessionQuestionBySessionIdAndQuestionId?: Maybe<AssessmentSessionQuestion>;
  /** Reads and enables pagination through a set of `AssessmentSessionQuestion`. */
  assessmentSessionQuestions?: Maybe<AssessmentSessionQuestionsConnection>;
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions?: Maybe<AssessmentSessionsConnection>;
  /**
   * Check if the current user has completed the assessment and get basic result info.
   * Optionally scoped to a specific assessment type (defaults to SSRI for backward compatibility).
   */
  assessmentStatus?: Maybe<AssessmentStatusPayload>;
  assessmentTemplateContent?: Maybe<AssessmentTemplateContent>;
  assessmentTemplateContentByAssessmentTypeCodeAndContentKey?: Maybe<AssessmentTemplateContent>;
  /** Reads and enables pagination through a set of `AssessmentTemplateContent`. */
  assessmentTemplateContents?: Maybe<AssessmentTemplateContentsConnection>;
  /**
   * Get assessment completion trends over time (admin only)
   * Returns daily statistics for completed, started, and in-progress assessments
   */
  assessmentTrends?: Maybe<AssessmentTrendsPayload>;
  assessmentType?: Maybe<AssessmentType>;
  assessmentTypeByCode?: Maybe<AssessmentType>;
  /** Readiness checklist for activating an assessment type (admin only). */
  assessmentTypeReadiness: AssessmentTypeReadinessPayload;
  assessmentTypeStageTable?: Maybe<AssessmentTypeStageTable>;
  assessmentTypeStageTableByAssessmentTypeCodeAndDisplayOrder?: Maybe<AssessmentTypeStageTable>;
  /** Global stage labels and score ranges for an assessment type (admin only). */
  assessmentTypeStages: Array<AssessmentTypeStage>;
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypes?: Maybe<AssessmentTypesConnection>;
  /** List all active assessment types available to users */
  availableAssessments: Array<AssessmentTypeInfo>;
  couponTable?: Maybe<CouponTable>;
  couponTableByCode?: Maybe<CouponTable>;
  couponUsageTable?: Maybe<CouponUsageTable>;
  couponUsageTableByPaymentId?: Maybe<CouponUsageTable>;
  /** Get the current in-progress assessment session for the logged-in user */
  currentAssessmentSession?: Maybe<AssessmentSession>;
  currentSessionId?: Maybe<Scalars['UUID']['output']>;
  currentUser?: Maybe<User>;
  currentUserId?: Maybe<Scalars['UUID']['output']>;
  currentUserIsAdmin?: Maybe<Scalars['Boolean']['output']>;
  /** Returns true if the current user is internal (admin or explicitly marked as internal) */
  currentUserIsInternal?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Check if the current user has a successful payment for the assessment test.
   * Returns the most recent captured payment if it exists.
   * Internal users (admins and is_internal=true) don't need payment.
   */
  currentUserPaymentStatus?: Maybe<UserPaymentStatusPayload>;
  /** Retrieves an active, valid, and available coupon by code. Returns NULL if not found or invalid. */
  getActiveCouponByCode?: Maybe<CouponTable>;
  /** Returns three INDEPENDENT cohort comparisons: age-based (age range, any gender), gender-based (same gender, any age), and overall (all users). When a cohort has fewer than 5 users, returns the user's own score as the cohortAverage (cohortSize = 0) so the UI always has meaningful data to display. */
  getCohortComparisonForResult?: Maybe<Scalars['JSON']['output']>;
  getDemographicCohortStats?: Maybe<GetDemographicCohortStatsConnection>;
  getInterpretationBand?: Maybe<AssessmentInterpretationBand>;
  /** Returns the interpretation band for a given score */
  getInterpretationBandForScore?: Maybe<AssessmentInterpretationBand>;
  /**
   * Get a lightweight summary of all questions and their answer status.
   * Useful for overview/navigation UI or "jump to question" features.
   */
  getQuestionsSummary?: Maybe<QuestionsSummaryPayload>;
  /**
   * Get a single question with all necessary context including navigation and progress.
   * Designed for single-question-at-a-time UX flow.
   */
  getSessionQuestion?: Maybe<SessionQuestionPayload>;
  payment?: Maybe<Payment>;
  paymentByRazorpayOrderId?: Maybe<Payment>;
  paymentByRazorpayPaymentId?: Maybe<Payment>;
  /** Reads and enables pagination through a set of `Payment`. */
  payments?: Maybe<PaymentsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  reminderEmail?: Maybe<ReminderEmail>;
  /** Reads and enables pagination through a set of `ReminderEmail`. */
  reminderEmails?: Maybe<ReminderEmailsConnection>;
  /**
   * Get score distribution across ranges (admin only)
   * Returns count and percentage for each score range: 0-20, 21-40, 41-60, 61-80, 81-100
   */
  scoreDistribution?: Maybe<ScoreDistributionPayload>;
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserReminderStat`. */
  userReminderStats?: Maybe<UserReminderStatsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  /**
   * Get list of all users who have started or completed the assessment (admin only)
   * Includes their session details, completion status, and results if completed
   */
  usersWithAssessment?: Maybe<UsersWithAssessmentPayload>;
  /**
   * Get list of users who have NOT started any assessment (admin only)
   * Includes registered users who haven't taken the assessment yet
   */
  usersWithoutAssessment?: Maybe<UsersWithoutAssessmentPayload>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminAssessmentStatsArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminCouponByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminCouponUsageArgs = {
  couponId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminPaymentAnalyticsArgs = {
  input?: InputMaybe<AdminPaymentsFilterInput>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminPaymentDetailsArgs = {
  paymentId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminPaymentsListArgs = {
  input?: InputMaybe<AdminPaymentsFilterInput>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminRefundsListArgs = {
  input?: InputMaybe<AdminPaymentsFilterInput>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminSettlementsListArgs = {
  input?: InputMaybe<AdminPaymentsFilterInput>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentCohortStatArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentCohortStatByAssessmentTypeCodeArgs = {
  assessmentTypeCode: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentCohortStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentCohortStatCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentCohortStatsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentInterpretationBandArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentInterpretationBandsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentProgressArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentQuestionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentQuestionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentQuestionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentRecommendedActionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentRecommendedActionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentRecommendedActionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentRecommendedActionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResponseArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResponseBySessionIdAndQuestionIdArgs = {
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResponsesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResponseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResponsesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResultArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResultBySessionIdArgs = {
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionByAssessmentTypeCodeAndTypeArgs = {
  assessmentTypeCode: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionResultArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionResultByResultIdAndSectionIdArgs = {
  resultId: Scalars['UUID']['input'];
  sectionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionResultByResultIdAndSectionTypeArgs = {
  resultId: Scalars['UUID']['input'];
  sectionType: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionResultsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSectionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSectionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSectionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionQuestionArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionQuestionBySessionIdAndDisplayOrderArgs = {
  displayOrder: Scalars['Int']['input'];
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionQuestionBySessionIdAndQuestionIdArgs = {
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionQuestionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionQuestionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionQuestionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentStatusArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTemplateContentArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTemplateContentByAssessmentTypeCodeAndContentKeyArgs = {
  assessmentTypeCode: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTemplateContentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTemplateContentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTemplateContentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTrendsArgs = {
  input: AssessmentTrendsInput;
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeByCodeArgs = {
  code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeReadinessArgs = {
  assessmentType: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeStageTableArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeStageTableByAssessmentTypeCodeAndDisplayOrderArgs = {
  assessmentTypeCode: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypeStagesArgs = {
  assessmentTypeCode: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAssessmentTypesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCouponTableArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCouponTableByCodeArgs = {
  code: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCouponUsageTableArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCouponUsageTableByPaymentIdArgs = {
  paymentId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentAssessmentSessionArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentUserPaymentStatusArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetActiveCouponByCodeArgs = {
  pCode: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCohortComparisonForResultArgs = {
  pResultId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetDemographicCohortStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pAssessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  pUserAge?: InputMaybe<Scalars['Int']['input']>;
  pUserGender?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetInterpretationBandArgs = {
  pAssessmentTypeCode: Scalars['String']['input'];
  pBandScope: Scalars['String']['input'];
  pScore: Scalars['Int']['input'];
  pSectionType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetInterpretationBandForScoreArgs = {
  pScore: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetQuestionsSummaryArgs = {
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetSessionQuestionArgs = {
  questionNumber: Scalars['Int']['input'];
  sessionId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPaymentArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPaymentByRazorpayOrderIdArgs = {
  razorpayOrderId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPaymentByRazorpayPaymentIdArgs = {
  razorpayPaymentId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReminderEmailArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReminderEmailsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReminderEmailCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReminderEmailsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryScoreDistributionArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserReminderStatsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserReminderStatsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersWithAssessmentArgs = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionSummaryItem = {
  __typename?: 'QuestionSummaryItem';
  displayOrder: Scalars['Int']['output'];
  isAnswered: Scalars['Boolean']['output'];
  questionId: Scalars['UUID']['output'];
  questionNumber: Scalars['Int']['output'];
  responseValue?: Maybe<Scalars['Int']['output']>;
  sectionName: Scalars['String']['output'];
};

export type QuestionsSummaryPayload = {
  __typename?: 'QuestionsSummaryPayload';
  progress: ProgressMetadata;
  questions: Array<QuestionSummaryItem>;
};

export type RazorpayPaymentItem = {
  __typename?: 'RazorpayPaymentItem';
  amount: Scalars['Int']['output'];
  amountRefunded?: Maybe<Scalars['Int']['output']>;
  captured: Scalars['Boolean']['output'];
  contact?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  entity: Scalars['String']['output'];
  errorCode?: Maybe<Scalars['String']['output']>;
  errorDescription?: Maybe<Scalars['String']['output']>;
  errorReason?: Maybe<Scalars['String']['output']>;
  errorSource?: Maybe<Scalars['String']['output']>;
  errorStep?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  method?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  refundStatus?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  tax?: Maybe<Scalars['Int']['output']>;
};

export type RazorpayRefundItem = {
  __typename?: 'RazorpayRefundItem';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  entity: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  speedProcessed?: Maybe<Scalars['String']['output']>;
  speedRequested?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type RazorpaySettlementItem = {
  __typename?: 'RazorpaySettlementItem';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  entity: Scalars['String']['output'];
  fees?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tax?: Maybe<Scalars['Int']['output']>;
  utr?: Maybe<Scalars['String']['output']>;
};

export type RegisterInput = {
  age: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  token: Scalars['String']['output'];
  user: User;
};

/** Tracks reminder emails sent to users who haven't completed payment or assessment */
export type ReminderEmail = {
  __typename?: 'ReminderEmail';
  createdAt: Scalars['Datetime']['output'];
  emailSentAt: Scalars['Datetime']['output'];
  emailSubject: Scalars['String']['output'];
  emailTemplate: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Additional data like email open status, click tracking, etc. */
  metadata?: Maybe<Scalars['JSON']['output']>;
  /** Type of reminder: no_payment_attempt, payment_abandoned, payment_failed, paid_no_test, test_incomplete */
  reminderType: ReminderType;
  /** Reads a single `User` that is related to this `ReminderEmail`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `ReminderEmail` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ReminderEmailCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `reminderType` field. */
  reminderType?: InputMaybe<ReminderType>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The fields on `reminderEmail` to look up the row to update. */
export type ReminderEmailOnReminderEmailForReminderEmailsUserIdFkeyUsingReminderEmailsPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `reminderEmail` being updated. */
  patch: UpdateReminderEmailOnReminderEmailForReminderEmailsUserIdFkeyPatch;
};

/** The fields on `reminderEmail` to look up the row to connect. */
export type ReminderEmailReminderEmailsPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** A connection to a list of `ReminderEmail` values. */
export type ReminderEmailsConnection = {
  __typename?: 'ReminderEmailsConnection';
  /** A list of edges which contains the `ReminderEmail` and cursor to aid in pagination. */
  edges: Array<ReminderEmailsEdge>;
  /** A list of `ReminderEmail` objects. */
  nodes: Array<ReminderEmail>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReminderEmail` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ReminderEmail` edge in the connection. */
export type ReminderEmailsEdge = {
  __typename?: 'ReminderEmailsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ReminderEmail` at the end of the edge. */
  node: ReminderEmail;
};

/** Methods to use when ordering `ReminderEmail`. */
export enum ReminderEmailsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReminderTypeAsc = 'REMINDER_TYPE_ASC',
  ReminderTypeDesc = 'REMINDER_TYPE_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Input for the nested mutation of `user` in the `ReminderEmailInput` mutation. */
export type ReminderEmailsUserIdFkeyInput = {
  /** The primary key(s) for `user` for the far side of the relationship. */
  connectById?: InputMaybe<UserUsersPkeyConnect>;
  /** The primary key(s) for `user` for the far side of the relationship. */
  deleteById?: InputMaybe<UserUsersPkeyDelete>;
  /** The primary key(s) and patch data for `user` for the far side of the relationship. */
  updateById?: InputMaybe<UserOnReminderEmailForReminderEmailsUserIdFkeyUsingUsersPkeyUpdate>;
};

/** Input for the nested mutation of `reminderEmail` in the `UserInput` mutation. */
export type ReminderEmailsUserIdFkeyInverseInput = {
  /** The primary key(s) for `reminderEmail` for the far side of the relationship. */
  connectById?: InputMaybe<Array<ReminderEmailReminderEmailsPkeyConnect>>;
  /** The primary key(s) and patch data for `reminderEmail` for the far side of the relationship. */
  updateById?: InputMaybe<Array<ReminderEmailOnReminderEmailForReminderEmailsUserIdFkeyUsingReminderEmailsPkeyUpdate>>;
};

export enum ReminderType {
  NoPaymentAttempt = 'NO_PAYMENT_ATTEMPT',
  PaidNoTest = 'PAID_NO_TEST',
  PaymentAbandoned = 'PAYMENT_ABANDONED',
  PaymentFailed = 'PAYMENT_FAILED',
  TestIncomplete = 'TEST_INCOMPLETE'
}

export type ResendReportInput = {
  resultId: Scalars['UUID']['input'];
};

export type ResendReportPayload = {
  __typename?: 'ResendReportPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RevokeAdminAccessInput = {
  userId: Scalars['UUID']['input'];
};

export type RevokeAdminAccessPayload = {
  __typename?: 'RevokeAdminAccessPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type RevokeInternalAccessInput = {
  userId: Scalars['UUID']['input'];
};

export type RevokeInternalAccessPayload = {
  __typename?: 'RevokeInternalAccessPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type ScoreDistributionData = {
  __typename?: 'ScoreDistributionData';
  count: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  percentage: Scalars['Float']['output'];
  range: Scalars['String']['output'];
};

export type ScoreDistributionPayload = {
  __typename?: 'ScoreDistributionPayload';
  averageScore: Scalars['Float']['output'];
  distribution: Array<ScoreDistributionData>;
  totalAssessments: Scalars['Int']['output'];
};

export type SeedAssessmentTypeContentInput = {
  assessmentTypeCode: Scalars['String']['input'];
  cloneBands?: InputMaybe<Scalars['Boolean']['input']>;
  cloneTemplateContent?: InputMaybe<Scalars['Boolean']['input']>;
  templateCode?: InputMaybe<Scalars['String']['input']>;
};

export type SeedAssessmentTypeSectionsInput = {
  assessmentTypeCode: Scalars['String']['input'];
};

export type SeedAssessmentTypeSectionsPayload = {
  __typename?: 'SeedAssessmentTypeSectionsPayload';
  message?: Maybe<Scalars['String']['output']>;
  sectionsCreated: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type SessionQuestionDetail = {
  __typename?: 'SessionQuestionDetail';
  displayOrder: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  isAnswered: Scalars['Boolean']['output'];
  questionId: Scalars['UUID']['output'];
  questionText: Scalars['String']['output'];
  sectionName: Scalars['String']['output'];
  sectionType: Scalars['String']['output'];
  sessionId: Scalars['UUID']['output'];
};

export type SessionQuestionPayload = {
  __typename?: 'SessionQuestionPayload';
  currentResponse?: Maybe<CurrentResponseDetail>;
  navigation: NavigationMetadata;
  progress: ProgressMetadata;
  question: SessionQuestionDetail;
};

export type SessionStateDetail = {
  __typename?: 'SessionStateDetail';
  currentQuestionNumber: Scalars['Int']['output'];
  expiresAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  lastActivityTime: Scalars['Datetime']['output'];
  lastAnsweredQuestion?: Maybe<Scalars['Int']['output']>;
};

export type StartAssessmentInput = {
  assessmentType?: InputMaybe<Scalars['String']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StartAssessmentPayload = {
  __typename?: 'StartAssessmentPayload';
  assessmentType?: Maybe<AssessmentTypeInfo>;
  message?: Maybe<Scalars['String']['output']>;
  session?: Maybe<AssessmentSession>;
};

export type SubmitOrUpdateResponseInput = {
  isNavigatingForward?: InputMaybe<Scalars['Boolean']['input']>;
  questionId: Scalars['UUID']['input'];
  questionNumber: Scalars['Int']['input'];
  responseValue: Scalars['Int']['input'];
  sessionId: Scalars['UUID']['input'];
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
};

export type SubmitOrUpdateResponsePayload = {
  __typename?: 'SubmitOrUpdateResponsePayload';
  message: Scalars['String']['output'];
  nextQuestion: NextQuestionHint;
  progress: ProgressMetadata;
  response: EnhancedResponseDetail;
  session: SessionStateDetail;
  success: Scalars['Boolean']['output'];
};

export type TemplateContentPayload = {
  __typename?: 'TemplateContentPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the `updateAssessmentCohortStatByAssessmentTypeCode` mutation. */
export type UpdateAssessmentCohortStatByAssessmentTypeCodeInput = {
  assessmentTypeCode: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AssessmentCohortStat` being updated. */
  patch: AssessmentCohortStatPatch;
};

/** All input for the `updateAssessmentCohortStat` mutation. */
export type UpdateAssessmentCohortStatInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `AssessmentCohortStat` being updated. */
  patch: AssessmentCohortStatPatch;
};

/** The output of our update `AssessmentCohortStat` mutation. */
export type UpdateAssessmentCohortStatPayload = {
  __typename?: 'UpdateAssessmentCohortStatPayload';
  /** The `AssessmentCohortStat` that was updated by this mutation. */
  assessmentCohortStat?: Maybe<AssessmentCohortStat>;
  /** An edge for our `AssessmentCohortStat`. May be used by Relay 1. */
  assessmentCohortStatEdge?: Maybe<AssessmentCohortStatsEdge>;
  /** Reads a single `AssessmentType` that is related to this `AssessmentCohortStat`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AssessmentCohortStat` mutation. */
export type UpdateAssessmentCohortStatPayloadAssessmentCohortStatEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentCohortStatsOrderBy>>;
};

/** All input for the `updateAssessmentResponseBySessionIdAndQuestionId` mutation. */
export type UpdateAssessmentResponseBySessionIdAndQuestionIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AssessmentResponse` being updated. */
  patch: AssessmentResponsePatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** All input for the `updateAssessmentResponse` mutation. */
export type UpdateAssessmentResponseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `AssessmentResponse` being updated. */
  patch: AssessmentResponsePatch;
};

/** The output of our update `AssessmentResponse` mutation. */
export type UpdateAssessmentResponsePayload = {
  __typename?: 'UpdateAssessmentResponsePayload';
  /** The `AssessmentResponse` that was updated by this mutation. */
  assessmentResponse?: Maybe<AssessmentResponse>;
  /** An edge for our `AssessmentResponse`. May be used by Relay 1. */
  assessmentResponseEdge?: Maybe<AssessmentResponsesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentResponse`. */
  question?: Maybe<AssessmentQuestion>;
  /** Reads a single `AssessmentSession` that is related to this `AssessmentResponse`. */
  session?: Maybe<AssessmentSession>;
};


/** The output of our update `AssessmentResponse` mutation. */
export type UpdateAssessmentResponsePayloadAssessmentResponseEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentResponsesOrderBy>>;
};

/** All input for the `updateAssessmentSession` mutation. */
export type UpdateAssessmentSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `AssessmentSession` being updated. */
  patch: AssessmentSessionPatch;
};

/** The output of our update `AssessmentSession` mutation. */
export type UpdateAssessmentSessionPayload = {
  __typename?: 'UpdateAssessmentSessionPayload';
  /** The `AssessmentSession` that was updated by this mutation. */
  assessmentSession?: Maybe<AssessmentSession>;
  /** An edge for our `AssessmentSession`. May be used by Relay 1. */
  assessmentSessionEdge?: Maybe<AssessmentSessionsEdge>;
  /** Reads a single `AssessmentType` that is related to this `AssessmentSession`. */
  assessmentTypeByAssessmentTypeCode?: Maybe<AssessmentType>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Payment` that is related to this `AssessmentSession`. */
  payment?: Maybe<Payment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `AssessmentSession`. */
  user?: Maybe<User>;
};


/** The output of our update `AssessmentSession` mutation. */
export type UpdateAssessmentSessionPayloadAssessmentSessionEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** All input for the `updateAssessmentSessionQuestionBySessionIdAndDisplayOrder` mutation. */
export type UpdateAssessmentSessionQuestionBySessionIdAndDisplayOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `AssessmentSessionQuestion` being updated. */
  patch: AssessmentSessionQuestionPatch;
  sessionId: Scalars['UUID']['input'];
};

/** All input for the `updateAssessmentSessionQuestionBySessionIdAndQuestionId` mutation. */
export type UpdateAssessmentSessionQuestionBySessionIdAndQuestionIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `AssessmentSessionQuestion` being updated. */
  patch: AssessmentSessionQuestionPatch;
  questionId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

/** All input for the `updateAssessmentSessionQuestion` mutation. */
export type UpdateAssessmentSessionQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `AssessmentSessionQuestion` being updated. */
  patch: AssessmentSessionQuestionPatch;
};

/** The output of our update `AssessmentSessionQuestion` mutation. */
export type UpdateAssessmentSessionQuestionPayload = {
  __typename?: 'UpdateAssessmentSessionQuestionPayload';
  /** The `AssessmentSessionQuestion` that was updated by this mutation. */
  assessmentSessionQuestion?: Maybe<AssessmentSessionQuestion>;
  /** An edge for our `AssessmentSessionQuestion`. May be used by Relay 1. */
  assessmentSessionQuestionEdge?: Maybe<AssessmentSessionQuestionsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AssessmentQuestion` that is related to this `AssessmentSessionQuestion`. */
  question?: Maybe<AssessmentQuestion>;
  /** Reads a single `AssessmentSession` that is related to this `AssessmentSessionQuestion`. */
  session?: Maybe<AssessmentSession>;
};


/** The output of our update `AssessmentSessionQuestion` mutation. */
export type UpdateAssessmentSessionQuestionPayloadAssessmentSessionQuestionEdgeArgs = {
  orderBy?: InputMaybe<Array<AssessmentSessionQuestionsOrderBy>>;
};

export type UpdateAssessmentTypeInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAssessmentTypeStagesInput = {
  assessmentTypeCode: Scalars['String']['input'];
  stages: Array<AssessmentTypeStageLabelInput>;
};

export type UpdateAssessmentTypeStagesPayload = {
  __typename?: 'UpdateAssessmentTypeStagesPayload';
  message?: Maybe<Scalars['String']['output']>;
  stages: Array<AssessmentTypeStage>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCouponInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

export type UpdateCouponPayload = {
  __typename?: 'UpdateCouponPayload';
  coupon?: Maybe<Coupon>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** All input for the `updateCouponTableByCode` mutation. */
export type UpdateCouponTableByCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `CouponTable` being updated. */
  patch: CouponTablePatch;
};

/** All input for the `updateCouponTable` mutation. */
export type UpdateCouponTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `CouponTable` being updated. */
  patch: CouponTablePatch;
};

/** The output of our update `CouponTable` mutation. */
export type UpdateCouponTablePayload = {
  __typename?: 'UpdateCouponTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `CouponTable` that was updated by this mutation. */
  couponTable?: Maybe<CouponTable>;
  /** An edge for our `CouponTable`. May be used by Relay 1. */
  couponTableEdge?: Maybe<CouponTablesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponTable`. */
  userByCreatedBy?: Maybe<User>;
};


/** The output of our update `CouponTable` mutation. */
export type UpdateCouponTablePayloadCouponTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};

/** All input for the `updateCouponUsageTableByPaymentId` mutation. */
export type UpdateCouponUsageTableByPaymentIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `CouponUsageTable` being updated. */
  patch: CouponUsageTablePatch;
  paymentId: Scalars['UUID']['input'];
};

/** All input for the `updateCouponUsageTable` mutation. */
export type UpdateCouponUsageTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `CouponUsageTable` being updated. */
  patch: CouponUsageTablePatch;
};

/** The output of our update `CouponUsageTable` mutation. */
export type UpdateCouponUsageTablePayload = {
  __typename?: 'UpdateCouponUsageTablePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `CouponTable` that is related to this `CouponUsageTable`. */
  coupon?: Maybe<CouponTable>;
  /** The `CouponUsageTable` that was updated by this mutation. */
  couponUsageTable?: Maybe<CouponUsageTable>;
  /** An edge for our `CouponUsageTable`. May be used by Relay 1. */
  couponUsageTableEdge?: Maybe<CouponUsageTablesEdge>;
  /** Reads a single `Payment` that is related to this `CouponUsageTable`. */
  payment?: Maybe<Payment>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `CouponUsageTable`. */
  user?: Maybe<User>;
};


/** The output of our update `CouponUsageTable` mutation. */
export type UpdateCouponUsageTablePayloadCouponUsageTableEdgeArgs = {
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};

export type UpdateInterpretationBandInput = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  narrative?: InputMaybe<Scalars['String']['input']>;
  rangeEnd?: InputMaybe<Scalars['Int']['input']>;
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInterpretationBandPayload = {
  __typename?: 'UpdateInterpretationBandPayload';
  band?: Maybe<AssessmentInterpretationBand>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateQuestionInput = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  questionText?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionPayload = {
  __typename?: 'UpdateQuestionPayload';
  message?: Maybe<Scalars['String']['output']>;
  question?: Maybe<AssessmentQuestion>;
  success: Scalars['Boolean']['output'];
};

export type UpdateRecommendedActionInput = {
  actionText?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRecommendedActionPayload = {
  __typename?: 'UpdateRecommendedActionPayload';
  action?: Maybe<AssessmentRecommendedAction>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayColor?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSectionPayload = {
  __typename?: 'UpdateSectionPayload';
  message?: Maybe<Scalars['String']['output']>;
  section?: Maybe<AssessmentSection>;
  success: Scalars['Boolean']['output'];
};

export type UpdateTemplateContentInput = {
  assessmentType: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
  contentValue: Scalars['JSON']['input'];
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `AssessmentInterpretationBand`. */
  assessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandId: UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResults: AssessmentResultsConnection;
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByAssessmentResultUserIdAndAssessmentTypeCode: UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCode: UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyConnection;
  /** Reads and enables pagination through a set of `AssessmentType`. */
  assessmentTypesByPaymentUserIdAndAssessmentTypeCode: UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyConnection;
  /** Reads and enables pagination through a set of `CouponTable`. */
  couponTablesByCouponUsageTableUserIdAndCouponId: UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CouponTable`. */
  couponTablesByCreatedBy: CouponTablesConnection;
  /** Reads and enables pagination through a set of `CouponTable`. */
  couponTablesByPaymentUserIdAndCouponId: UserCouponTablesByPaymentUserIdAndCouponIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CouponUsageTable`. */
  couponUsageTables: CouponUsageTablesConnection;
  createdAt: Scalars['Datetime']['output'];
  email: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal: Scalars['Boolean']['output'];
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
  /** Reads and enables pagination through a set of `Payment`. */
  paymentsByAssessmentSessionUserIdAndPaymentId: UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyConnection;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `ReminderEmail`. */
  reminderEmails: ReminderEmailsConnection;
  type: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentInterpretationBandCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentInterpretationBandsOrderBy>>;
};


export type UserAssessmentResultsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};


export type UserAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};


export type UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


export type UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


export type UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentTypeCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentTypesOrderBy>>;
};


export type UserCouponTablesByCouponUsageTableUserIdAndCouponIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};


export type UserCouponTablesByCreatedByArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};


export type UserCouponTablesByPaymentUserIdAndCouponIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponTablesOrderBy>>;
};


export type UserCouponUsageTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponUsageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};


export type UserPaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


export type UserPaymentsByAssessmentSessionUserIdAndPaymentIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};


export type UserReminderEmailsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReminderEmailCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReminderEmailsOrderBy>>;
};

export type UserAssessmentInfo = {
  __typename?: 'UserAssessmentInfo';
  assessmentTypeCode: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  expiresAt: Scalars['Datetime']['output'];
  interpretationLabel?: Maybe<Scalars['String']['output']>;
  resultId?: Maybe<Scalars['UUID']['output']>;
  sessionId: Scalars['UUID']['output'];
  startedAt: Scalars['Datetime']['output'];
  status: Scalars['String']['output'];
  totalScore?: Maybe<Scalars['Int']['output']>;
  userEmail: Scalars['String']['output'];
  userId: Scalars['UUID']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `AssessmentInterpretationBand` values, with data from `AssessmentResult`. */
export type UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyConnection = {
  __typename?: 'UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyConnection';
  /** A list of edges which contains the `AssessmentInterpretationBand`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyEdge>;
  /** A list of `AssessmentInterpretationBand` objects. */
  nodes: Array<AssessmentInterpretationBand>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentInterpretationBand` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentResult`. */
export type UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyEdge = {
  __typename?: 'UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByInterpretationBandId: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentInterpretationBand` at the end of the edge. */
  node: AssessmentInterpretationBand;
};


/** A `AssessmentInterpretationBand` edge in the connection, with data from `AssessmentResult`. */
export type UserAssessmentInterpretationBandsByAssessmentResultUserIdAndInterpretationBandIdManyToManyEdgeAssessmentResultsByInterpretationBandIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `AssessmentResult`. */
export type UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `AssessmentResult`, and the cursor to aid in pagination. */
  edges: Array<UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `AssessmentResult`. */
export type UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentResult`. */
  assessmentResultsByAssessmentTypeCode: AssessmentResultsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
};


/** A `AssessmentType` edge in the connection, with data from `AssessmentResult`. */
export type UserAssessmentTypesByAssessmentResultUserIdAndAssessmentTypeCodeManyToManyEdgeAssessmentResultsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentResultCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentResultsOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `AssessmentSession`. */
export type UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `AssessmentSession`. */
export type UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessionsByAssessmentTypeCode: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
};


/** A `AssessmentType` edge in the connection, with data from `AssessmentSession`. */
export type UserAssessmentTypesByAssessmentSessionUserIdAndAssessmentTypeCodeManyToManyEdgeAssessmentSessionsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** A connection to a list of `AssessmentType` values, with data from `Payment`. */
export type UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyConnection = {
  __typename?: 'UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyConnection';
  /** A list of edges which contains the `AssessmentType`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyEdge>;
  /** A list of `AssessmentType` objects. */
  nodes: Array<AssessmentType>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AssessmentType` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `AssessmentType` edge in the connection, with data from `Payment`. */
export type UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyEdge = {
  __typename?: 'UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `AssessmentType` at the end of the edge. */
  node: AssessmentType;
  /** Reads and enables pagination through a set of `Payment`. */
  paymentsByAssessmentTypeCode: PaymentsConnection;
};


/** A `AssessmentType` edge in the connection, with data from `Payment`. */
export type UserAssessmentTypesByPaymentUserIdAndAssessmentTypeCodeManyToManyEdgePaymentsByAssessmentTypeCodeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `isInternal` field. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A connection to a list of `CouponTable` values, with data from `CouponUsageTable`. */
export type UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyConnection = {
  __typename?: 'UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyConnection';
  /** A list of edges which contains the `CouponTable`, info from the `CouponUsageTable`, and the cursor to aid in pagination. */
  edges: Array<UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyEdge>;
  /** A list of `CouponTable` objects. */
  nodes: Array<CouponTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CouponTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CouponTable` edge in the connection, with data from `CouponUsageTable`. */
export type UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyEdge = {
  __typename?: 'UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyEdge';
  /** Reads and enables pagination through a set of `CouponUsageTable`. */
  couponUsageTables: CouponUsageTablesConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CouponTable` at the end of the edge. */
  node: CouponTable;
};


/** A `CouponTable` edge in the connection, with data from `CouponUsageTable`. */
export type UserCouponTablesByCouponUsageTableUserIdAndCouponIdManyToManyEdgeCouponUsageTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CouponUsageTableCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CouponUsageTablesOrderBy>>;
};

/** A connection to a list of `CouponTable` values, with data from `Payment`. */
export type UserCouponTablesByPaymentUserIdAndCouponIdManyToManyConnection = {
  __typename?: 'UserCouponTablesByPaymentUserIdAndCouponIdManyToManyConnection';
  /** A list of edges which contains the `CouponTable`, info from the `Payment`, and the cursor to aid in pagination. */
  edges: Array<UserCouponTablesByPaymentUserIdAndCouponIdManyToManyEdge>;
  /** A list of `CouponTable` objects. */
  nodes: Array<CouponTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CouponTable` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `CouponTable` edge in the connection, with data from `Payment`. */
export type UserCouponTablesByPaymentUserIdAndCouponIdManyToManyEdge = {
  __typename?: 'UserCouponTablesByPaymentUserIdAndCouponIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `CouponTable` at the end of the edge. */
  node: CouponTable;
  /** Reads and enables pagination through a set of `Payment`. */
  payments: PaymentsConnection;
};


/** A `CouponTable` edge in the connection, with data from `Payment`. */
export type UserCouponTablesByPaymentUserIdAndCouponIdManyToManyEdgePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PaymentCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  createdAt: Scalars['Datetime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isInternal: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

/** An input for mutations affecting `User` */
export type UserInput = {
  age: Scalars['Int']['input'];
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** The fields on `user` to look up the row to update. */
export type UserOnAssessmentResultForAssessmentResultsUserIdFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnAssessmentResultForAssessmentResultsUserIdFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnAssessmentSessionForAssessmentSessionsUserIdFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnAssessmentSessionForAssessmentSessionsUserIdFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnCouponTableForCouponsCreatedByFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnCouponTableForCouponsCreatedByFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnCouponUsageTableForCouponUsageUserIdFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnCouponUsageTableForCouponUsageUserIdFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnPaymentForPaymentsUserIdFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnPaymentForPaymentsUserIdFkeyPatch;
};

/** The fields on `user` to look up the row to update. */
export type UserOnReminderEmailForReminderEmailsUserIdFkeyUsingUsersPkeyUpdate = {
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `user` being updated. */
  patch: UpdateUserOnReminderEmailForReminderEmailsUserIdFkeyPatch;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type UserPaymentStatusPayload = {
  __typename?: 'UserPaymentStatusPayload';
  amountInr?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  hasPaid: Scalars['Boolean']['output'];
  paymentId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of `Payment` values, with data from `AssessmentSession`. */
export type UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyConnection = {
  __typename?: 'UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyConnection';
  /** A list of edges which contains the `Payment`, info from the `AssessmentSession`, and the cursor to aid in pagination. */
  edges: Array<UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyEdge>;
  /** A list of `Payment` objects. */
  nodes: Array<Payment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Payment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Payment` edge in the connection, with data from `AssessmentSession`. */
export type UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyEdge = {
  __typename?: 'UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyEdge';
  /** Reads and enables pagination through a set of `AssessmentSession`. */
  assessmentSessions: AssessmentSessionsConnection;
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Payment` at the end of the edge. */
  node: Payment;
};


/** A `Payment` edge in the connection, with data from `AssessmentSession`. */
export type UserPaymentsByAssessmentSessionUserIdAndPaymentIdManyToManyEdgeAssessmentSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AssessmentSessionCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AssessmentSessionsOrderBy>>;
};

/** Aggregated reminder statistics per user and reminder type */
export type UserReminderStat = {
  __typename?: 'UserReminderStat';
  firstReminderSent?: Maybe<Scalars['Datetime']['output']>;
  lastReminderSent?: Maybe<Scalars['Datetime']['output']>;
  reminderCount?: Maybe<Scalars['BigInt']['output']>;
  reminderType?: Maybe<ReminderType>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

/** A connection to a list of `UserReminderStat` values. */
export type UserReminderStatsConnection = {
  __typename?: 'UserReminderStatsConnection';
  /** A list of edges which contains the `UserReminderStat` and cursor to aid in pagination. */
  edges: Array<UserReminderStatsEdge>;
  /** A list of `UserReminderStat` objects. */
  nodes: Array<UserReminderStat>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserReminderStat` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `UserReminderStat` edge in the connection. */
export type UserReminderStatsEdge = {
  __typename?: 'UserReminderStatsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UserReminderStat` at the end of the edge. */
  node: UserReminderStat;
};

/** Methods to use when ordering `UserReminderStat`. */
export enum UserReminderStatsOrderBy {
  Natural = 'NATURAL'
}

/** The fields on `user` to look up the row to connect. */
export type UserUsersPkeyConnect = {
  id: Scalars['UUID']['input'];
};

/** The fields on `user` to look up the row to delete. */
export type UserUsersPkeyDelete = {
  id: Scalars['UUID']['input'];
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsInternalAsc = 'IS_INTERNAL_ASC',
  IsInternalDesc = 'IS_INTERNAL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type UsersWithAssessmentPayload = {
  __typename?: 'UsersWithAssessmentPayload';
  completedCount: Scalars['Int']['output'];
  inProgressCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<UserAssessmentInfo>;
};

export type UsersWithoutAssessmentPayload = {
  __typename?: 'UsersWithoutAssessmentPayload';
  totalCount: Scalars['Int']['output'];
  users: Array<UserInfo>;
};

export type ValidateCouponInput = {
  code: Scalars['String']['input'];
};

export type ValidateCouponPayload = {
  __typename?: 'ValidateCouponPayload';
  coupon?: Maybe<CouponInfo>;
  discountAmount: Scalars['Int']['output'];
  finalAmount: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  originalAmount: Scalars['Int']['output'];
  valid: Scalars['Boolean']['output'];
};

export type VerifyPaymentInput = {
  orderId: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};

export type VerifyPaymentPayload = {
  __typename?: 'VerifyPaymentPayload';
  message?: Maybe<Scalars['String']['output']>;
  paymentId?: Maybe<Scalars['UUID']['output']>;
  success: Scalars['Boolean']['output'];
};

/** An object where the defined keys will be set on the `assessmentCohortStat` being updated. */
export type UpdateAssessmentCohortStatOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch = {
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInput>;
  /** Average lifestyle readiness score across all users */
  avgLifestyleScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average mental readiness score across all users */
  avgMentalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average physical readiness score across all users */
  avgPhysicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average psychological readiness score across all users */
  avgPsychologicalScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average social readiness score across all users */
  avgSocialScore?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Average Total Readiness Index across all users */
  avgTotalReadinessIndex?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Timestamp of the last statistics update */
  lastUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Total number of completed assessments */
  totalAssessments?: InputMaybe<Scalars['Int']['input']>;
};

/** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
export type UpdateAssessmentInterpretationBandOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyPatch = {
  assessmentRecommendedActionsUsingId?: InputMaybe<AssessmentRecommendedActionsInterpretationBandIdFkeyInverseInput>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInverseInput>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInput>;
  /** section = per-dimension scores (10-100); overall = total readiness index */
  bandScope?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Admin display order within scope (lower = shown first) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Optional display-only score range label (e.g. 50–149 for PDF overall page) */
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional short mindset quote (primarily for overall bands in reports) */
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  /** Display label for the band (e.g., Vulnerable, Emerging, Developing, Proactive, Thriving) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Descriptive text explaining this score band, shared across all sections */
  narrative?: InputMaybe<Scalars['String']['input']>;
  /** Ending score of this interpretation band (inclusive, 10-100) */
  rangeEnd?: InputMaybe<Scalars['Int']['input']>;
  /** Starting score of this interpretation band (inclusive, 10-100) */
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
  /** Dimension key for section bands (psychological, social, mental, physical, lifestyle). NULL for overall bands. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
export type UpdateAssessmentInterpretationBandOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyPatch = {
  assessmentRecommendedActionsUsingId?: InputMaybe<AssessmentRecommendedActionsInterpretationBandIdFkeyInverseInput>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInput>;
  /** section = per-dimension scores (10-100); overall = total readiness index */
  bandScope?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Admin display order within scope (lower = shown first) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Optional display-only score range label (e.g. 50–149 for PDF overall page) */
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional short mindset quote (primarily for overall bands in reports) */
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  /** Display label for the band (e.g., Vulnerable, Emerging, Developing, Proactive, Thriving) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Descriptive text explaining this score band, shared across all sections */
  narrative?: InputMaybe<Scalars['String']['input']>;
  /** Ending score of this interpretation band (inclusive, 10-100) */
  rangeEnd?: InputMaybe<Scalars['Int']['input']>;
  /** Starting score of this interpretation band (inclusive, 10-100) */
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
  /** Dimension key for section bands (psychological, social, mental, physical, lifestyle). NULL for overall bands. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
export type UpdateAssessmentInterpretationBandOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyPatch = {
  assessmentRecommendedActionsUsingId?: InputMaybe<AssessmentRecommendedActionsInterpretationBandIdFkeyInverseInput>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInput>;
  /** section = per-dimension scores (10-100); overall = total readiness index */
  bandScope?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Admin display order within scope (lower = shown first) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Optional display-only score range label (e.g. 50–149 for PDF overall page) */
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional short mindset quote (primarily for overall bands in reports) */
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  /** Display label for the band (e.g., Vulnerable, Emerging, Developing, Proactive, Thriving) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Descriptive text explaining this score band, shared across all sections */
  narrative?: InputMaybe<Scalars['String']['input']>;
  /** Ending score of this interpretation band (inclusive, 10-100) */
  rangeEnd?: InputMaybe<Scalars['Int']['input']>;
  /** Starting score of this interpretation band (inclusive, 10-100) */
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
  /** Dimension key for section bands (psychological, social, mental, physical, lifestyle). NULL for overall bands. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentInterpretationBand` being updated. */
export type UpdateAssessmentInterpretationBandOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch = {
  assessmentRecommendedActionsUsingId?: InputMaybe<AssessmentRecommendedActionsInterpretationBandIdFkeyInverseInput>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInput>;
  /** section = per-dimension scores (10-100); overall = total readiness index */
  bandScope?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Admin display order within scope (lower = shown first) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Optional display-only score range label (e.g. 50–149 for PDF overall page) */
  displayRangeLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional short mindset quote (primarily for overall bands in reports) */
  keyMindset?: InputMaybe<Scalars['String']['input']>;
  /** Display label for the band (e.g., Vulnerable, Emerging, Developing, Proactive, Thriving) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Descriptive text explaining this score band, shared across all sections */
  narrative?: InputMaybe<Scalars['String']['input']>;
  /** Ending score of this interpretation band (inclusive, 10-100) */
  rangeEnd?: InputMaybe<Scalars['Int']['input']>;
  /** Starting score of this interpretation band (inclusive, 10-100) */
  rangeStart?: InputMaybe<Scalars['Int']['input']>;
  /** Dimension key for section bands (psychological, social, mental, physical, lifestyle). NULL for overall bands. */
  sectionType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
export type UpdateAssessmentQuestionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInverseInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Order in which questions should be displayed to admins within a section */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** The actual question text to be displayed to the user */
  questionText?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
export type UpdateAssessmentQuestionOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInverseInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Order in which questions should be displayed to admins within a section */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** The actual question text to be displayed to the user */
  questionText?: InputMaybe<Scalars['String']['input']>;
  /** The section this question belongs to */
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentQuestion` being updated. */
export type UpdateAssessmentQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInverseInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Order in which questions should be displayed to admins within a section */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** The actual question text to be displayed to the user */
  questionText?: InputMaybe<Scalars['String']['input']>;
  /** The section this question belongs to */
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentRecommendedAction` being updated. */
export type UpdateAssessmentRecommendedActionOnAssessmentRecommendedActionForAssessmentRecommendedActionsInterpretationBandIdFkeyPatch = {
  /** The recommended action text to display to users */
  actionText?: InputMaybe<Scalars['String']['input']>;
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentRecommendedActionsInterpretationBandIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Priority of this action (lower number = higher priority, used for selecting top 5) */
  priority?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentResponse` being updated. */
export type UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesQuestionIdFkeyPatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue?: InputMaybe<Scalars['Int']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentResponse` being updated. */
export type UpdateAssessmentResponseOnAssessmentResponseForAssessmentResponsesSessionIdFkeyPatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentResponsesQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResponsesSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Tracks whether this response is an update (true) or initial submission (false) */
  isUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
  /** User response value on scale of 1-10 (1 = Not at all, 10 = Very much) */
  responseValue?: InputMaybe<Scalars['Int']['input']>;
  /** Time taken to answer this question in seconds */
  timeTakenSeconds?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentResult` being updated. */
export type UpdateAssessmentResultOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInverseInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResultsSessionIdFkeyInput>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentResultsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentResult` being updated. */
export type UpdateAssessmentResultOnAssessmentResultForAssessmentResultsInterpretationBandIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInverseInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResultsSessionIdFkeyInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInput>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentResultsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentResult` being updated. */
export type UpdateAssessmentResultOnAssessmentResultForAssessmentResultsSessionIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInverseInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResultsSessionIdFkeyInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentResultsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentResult` being updated. */
export type UpdateAssessmentResultOnAssessmentResultForAssessmentResultsUserIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInverseInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResultsSessionIdFkeyInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentResultsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentResult` being updated. */
export type UpdateAssessmentResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentResultsInterpretationBandIdFkeyInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInverseInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentResultsSessionIdFkeyInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentResultsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSection` being updated. */
export type UpdateAssessmentSectionOnAssessmentQuestionForAssessmentQuestionsSectionIdFkeyPatch = {
  assessmentQuestionsUsingId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Detailed description of what this section assesses */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Hex color (#RRGGBB) for charts and PDF dimension bars */
  displayColor?: InputMaybe<Scalars['String']['input']>;
  /** Order in which sections should be displayed to admins */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Emoji displayed in PDF section headers and admin UI */
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Display name of the section */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Type of the assessment section (unique) */
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSection` being updated. */
export type UpdateAssessmentSectionOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch = {
  assessmentQuestionsUsingId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInverseInput>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Detailed description of what this section assesses */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Hex color (#RRGGBB) for charts and PDF dimension bars */
  displayColor?: InputMaybe<Scalars['String']['input']>;
  /** Order in which sections should be displayed to admins */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Emoji displayed in PDF section headers and admin UI */
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Display name of the section */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Type of the assessment section (unique) */
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSection` being updated. */
export type UpdateAssessmentSectionOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch = {
  assessmentQuestionsUsingId?: InputMaybe<AssessmentQuestionsSectionIdFkeyInverseInput>;
  assessmentSectionResultsUsingId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Detailed description of what this section assesses */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Hex color (#RRGGBB) for charts and PDF dimension bars */
  displayColor?: InputMaybe<Scalars['String']['input']>;
  /** Order in which sections should be displayed to admins */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Emoji displayed in PDF section headers and admin UI */
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Display name of the section */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Type of the assessment section (unique) */
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
export type UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsInterpretationBandIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInput>;
  assessmentResultToResultId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInput>;
  resultId?: InputMaybe<Scalars['UUID']['input']>;
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
export type UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsResultIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInput>;
  assessmentResultToResultId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  sectionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSectionResult` being updated. */
export type UpdateAssessmentSectionResultOnAssessmentSectionResultForAssessmentSectionResultsSectionIdFkeyPatch = {
  assessmentInterpretationBandToInterpretationBandId?: InputMaybe<AssessmentSectionResultsInterpretationBandIdFkeyInput>;
  assessmentResultToResultId?: InputMaybe<AssessmentSectionResultsResultIdFkeyInput>;
  assessmentSectionToSectionId?: InputMaybe<AssessmentSectionResultsSectionIdFkeyInput>;
  interpretationBandId?: InputMaybe<Scalars['UUID']['input']>;
  resultId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentResponseForAssessmentResponsesSessionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentResultForAssessmentResultsSessionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentSessionForAssessmentSessionsUserIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSession` being updated. */
export type UpdateAssessmentSessionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch = {
  assessmentResponsesUsingId?: InputMaybe<AssessmentResponsesSessionIdFkeyInverseInput>;
  assessmentResultUsingId?: InputMaybe<AssessmentResultsSessionIdFkeyInverseInput>;
  assessmentSessionQuestionsUsingId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInput>;
  completionTime?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current question number (1-50) for resume capability */
  currentQuestionNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When this session expires (30 days from start) */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Last time the user interacted with this session (for timeout tracking) */
  lastActivityTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** The last question number that the user actually answered (separate from current_question_number which tracks navigation) */
  lastAnsweredQuestion?: InputMaybe<Scalars['Int']['input']>;
  /** Reference to the payment made for this assessment. Nullable for internal users who can test without payment. Payment validation is enforced in start_assessment_session function. */
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInput>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Current status of the assessment session */
  status?: InputMaybe<AssessmentStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<AssessmentSessionsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
export type UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsQuestionIdFkeyPatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  sessionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An object where the defined keys will be set on the `assessmentSessionQuestion` being updated. */
export type UpdateAssessmentSessionQuestionOnAssessmentSessionQuestionForAssessmentSessionQuestionsSessionIdFkeyPatch = {
  assessmentQuestionToQuestionId?: InputMaybe<AssessmentSessionQuestionsQuestionIdFkeyInput>;
  assessmentSessionToSessionId?: InputMaybe<AssessmentSessionQuestionsSessionIdFkeyInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Randomized order in which questions should be displayed to the user (1-50) */
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Whether the user has answered this question (for resume capability) */
  isAnswered?: InputMaybe<Scalars['Boolean']['input']>;
  questionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An object where the defined keys will be set on the `assessmentTemplateContent` being updated. */
export type UpdateAssessmentTemplateContentOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch = {
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInput>;
  contentKey?: InputMaybe<Scalars['String']['input']>;
  contentValue?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentCohortStatForAssessmentCohortStatsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentInterpretationBandForAssessmentInterpretationBandsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentResultForAssessmentResultsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentSectionForAssessmentSectionsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentSessionForAssessmentSessionsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentTemplateContentForAssessmentTemplateContentAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentType` being updated. */
export type UpdateAssessmentTypeOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch = {
  assessmentCohortStatUsingCode?: InputMaybe<AssessmentCohortStatsAssessmentTypeCodeFkeyInverseInput>;
  assessmentInterpretationBandsUsingCode?: InputMaybe<AssessmentInterpretationBandsAssessmentTypeCodeFkeyInverseInput>;
  assessmentResultsUsingCode?: InputMaybe<AssessmentResultsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSectionsUsingCode?: InputMaybe<AssessmentSectionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentSessionsUsingCode?: InputMaybe<AssessmentSessionsAssessmentTypeCodeFkeyInverseInput>;
  assessmentTemplateContentsUsingCode?: InputMaybe<AssessmentTemplateContentAssessmentTypeCodeFkeyInverseInput>;
  assessmentTypeStageTablesUsingCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInverseInput>;
  /** Unique identifier for the assessment type (e.g., ssri, prai) */
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInverseInput>;
  priceAmount?: InputMaybe<Scalars['Int']['input']>;
  questionsPerSection?: InputMaybe<Scalars['Int']['input']>;
  /** Incremented when report display content changes; PDFs regen lazily on download when stale */
  reportContentVersion?: InputMaybe<Scalars['Int']['input']>;
  /** Formula type: sum (add section scores) or average (mean of section scores scaled to min/max) */
  scoringFormula?: InputMaybe<Scalars['String']['input']>;
  sectionCount?: InputMaybe<Scalars['Int']['input']>;
  templateVersion?: InputMaybe<Scalars['String']['input']>;
  totalQuestions?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `assessmentTypeStageTable` being updated. */
export type UpdateAssessmentTypeStageTableOnAssessmentTypeStageTableForAssessmentTypeStagesAssessmentTypeCodeFkeyPatch = {
  assessmentTypeToAssessmentTypeCode?: InputMaybe<AssessmentTypeStagesAssessmentTypeCodeFkeyInput>;
};

/** An object where the defined keys will be set on the `couponTable` being updated. */
export type UpdateCouponTableOnCouponTableForCouponsCreatedByFkeyPatch = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code?: InputMaybe<Scalars['String']['input']>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType?: InputMaybe<Scalars['String']['input']>;
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `couponTable` being updated. */
export type UpdateCouponTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code?: InputMaybe<Scalars['String']['input']>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType?: InputMaybe<Scalars['String']['input']>;
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `couponTable` being updated. */
export type UpdateCouponTableOnPaymentForPaymentsCouponIdFkeyPatch = {
  /** Unique coupon code (e.g., "LAUNCH50"). Case-insensitive. */
  code?: InputMaybe<Scalars['String']['input']>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageCouponIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Running count of how many times this coupon has been used. */
  currentUses?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Type of discount: "percentage" (e.g., 20% off) or "flat" (e.g., ₹500 off) */
  discountType?: InputMaybe<Scalars['String']['input']>;
  /** Discount amount: percentage value (20 for 20%) or paise (50000 for ₹500) */
  discountValue?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** For percentage discounts only: maximum discount cap in paise (e.g., 100000 for max ₹1000 off) */
  maxDiscountAmount?: InputMaybe<Scalars['Int']['input']>;
  /** Total times this coupon can be used across all users. NULL = unlimited. */
  maxTotalUses?: InputMaybe<Scalars['Int']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsCouponIdFkeyInverseInput>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToCreatedBy?: InputMaybe<CouponsCreatedByFkeyInput>;
  validFrom?: InputMaybe<Scalars['Datetime']['input']>;
  validUntil?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `couponUsageTable` being updated. */
export type UpdateCouponUsageTableOnCouponUsageTableForCouponUsageCouponIdFkeyPatch = {
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `couponUsageTable` being updated. */
export type UpdateCouponUsageTableOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `couponUsageTable` being updated. */
export type UpdateCouponUsageTableOnCouponUsageTableForCouponUsageUserIdFkeyPatch = {
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<CouponUsageCouponIdFkeyInput>;
  /** Amount user saved in paise (e.g., 50000 for ₹500 discount) */
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  paymentId?: InputMaybe<Scalars['UUID']['input']>;
  paymentToPaymentId?: InputMaybe<CouponUsagePaymentIdFkeyInput>;
  usedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userToUserId?: InputMaybe<CouponUsageUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `payment` being updated. */
export type UpdatePaymentOnAssessmentSessionForAssessmentSessionsPaymentIdFkeyPatch = {
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInput>;
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<PaymentsCouponIdFkeyInput>;
  couponUsageTableUsingId?: InputMaybe<CouponUsagePaymentIdFkeyInverseInput>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<PaymentsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `payment` being updated. */
export type UpdatePaymentOnCouponUsageTableForCouponUsagePaymentIdFkeyPatch = {
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInput>;
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<PaymentsCouponIdFkeyInput>;
  couponUsageTableUsingId?: InputMaybe<CouponUsagePaymentIdFkeyInverseInput>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<PaymentsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `payment` being updated. */
export type UpdatePaymentOnPaymentForPaymentsAssessmentTypeCodeFkeyPatch = {
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInverseInput>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInput>;
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<PaymentsCouponIdFkeyInput>;
  couponUsageTableUsingId?: InputMaybe<CouponUsagePaymentIdFkeyInverseInput>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<PaymentsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `payment` being updated. */
export type UpdatePaymentOnPaymentForPaymentsCouponIdFkeyPatch = {
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInput>;
  couponTableToCouponId?: InputMaybe<PaymentsCouponIdFkeyInput>;
  couponUsageTableUsingId?: InputMaybe<CouponUsagePaymentIdFkeyInverseInput>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  userToUserId?: InputMaybe<PaymentsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `payment` being updated. */
export type UpdatePaymentOnPaymentForPaymentsUserIdFkeyPatch = {
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsPaymentIdFkeyInverseInput>;
  assessmentTypeCode?: InputMaybe<Scalars['String']['input']>;
  assessmentTypeToAssessmentTypeCode?: InputMaybe<PaymentsAssessmentTypeCodeFkeyInput>;
  couponId?: InputMaybe<Scalars['UUID']['input']>;
  couponTableToCouponId?: InputMaybe<PaymentsCouponIdFkeyInput>;
  couponUsageTableUsingId?: InputMaybe<CouponUsagePaymentIdFkeyInverseInput>;
  userToUserId?: InputMaybe<PaymentsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `reminderEmail` being updated. */
export type UpdateReminderEmailOnReminderEmailForReminderEmailsUserIdFkeyPatch = {
  userToUserId?: InputMaybe<ReminderEmailsUserIdFkeyInput>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnAssessmentResultForAssessmentResultsUserIdFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnAssessmentSessionForAssessmentSessionsUserIdFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnCouponTableForCouponsCreatedByFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnCouponUsageTableForCouponUsageUserIdFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnPaymentForPaymentsUserIdFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An object where the defined keys will be set on the `user` being updated. */
export type UpdateUserOnReminderEmailForReminderEmailsUserIdFkeyPatch = {
  age?: InputMaybe<Scalars['Int']['input']>;
  assessmentResultsUsingId?: InputMaybe<AssessmentResultsUserIdFkeyInverseInput>;
  assessmentSessionsUsingId?: InputMaybe<AssessmentSessionsUserIdFkeyInverseInput>;
  couponTablesUsingId?: InputMaybe<CouponsCreatedByFkeyInverseInput>;
  couponUsageTablesUsingId?: InputMaybe<CouponUsageUserIdFkeyInverseInput>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates if user is internal (can test without payment and delete assessments). Admins are always internal. */
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  /** User email verification status. Defaults to true until email verification is implemented. Set to false when two-factor authentication or email verification is added. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  paymentsUsingId?: InputMaybe<PaymentsUserIdFkeyInverseInput>;
  /** User phone number. Optional field that can be added by user after registration. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  reminderEmailsUsingId?: InputMaybe<ReminderEmailsUserIdFkeyInverseInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ActivateAssessmentTypeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ActivateAssessmentTypeMutation = { __typename?: 'Mutation', activateAssessmentType?: { __typename?: 'AssessmentTypePayload', success: boolean, message?: string | null, assessmentType?: { __typename?: 'AssessmentTypeInfo', code: string, isActive: boolean } | null } | null };

export type AdminActivateCouponMutationVariables = Exact<{
  input: ActivateCouponInput;
}>;


export type AdminActivateCouponMutation = { __typename?: 'Mutation', adminActivateCoupon?: { __typename?: 'ActivateCouponPayload', success: boolean, message?: string | null } | null };

export type AdminAssessmentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAssessmentTypesQuery = { __typename?: 'Query', adminAssessmentTypes: Array<{ __typename?: 'AssessmentTypeInfo', id: any, code: string, name: string, description?: string | null, priceAmount: number, isActive: boolean, totalQuestions: number, sectionCount: number, questionsPerSection: number, minScore: number, maxScore: number, scoringFormula: string, displayOrder: number }> };

export type AdminCouponAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCouponAnalyticsQuery = { __typename?: 'Query', adminCouponAnalytics?: { __typename?: 'CouponAnalytics', totalCoupons: number, activeCoupons: number, totalRedemptions: number, totalDiscountGiven: number } | null };

export type AdminCouponByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type AdminCouponByIdQuery = { __typename?: 'Query', adminCouponById?: { __typename?: 'Coupon', id: any, code: string, description?: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount?: number | null, validFrom: any, validUntil?: any | null, isActive: boolean, maxTotalUses?: number | null, currentUses: number, createdBy?: any | null, createdAt: any, updatedAt: any } | null };

export type AdminCouponUsageQueryVariables = Exact<{
  couponId: Scalars['UUID']['input'];
}>;


export type AdminCouponUsageQuery = { __typename?: 'Query', adminCouponUsage?: { __typename?: 'CouponUsageListPayload', totalCount: number, usageRecords: Array<{ __typename?: 'CouponUsageRecord', id: any, userName?: string | null, userEmail?: string | null, discountAmount: number, usedAt: any }> } | null };

export type AdminCreateCouponMutationVariables = Exact<{
  input: CreateCouponInput;
}>;


export type AdminCreateCouponMutation = { __typename?: 'Mutation', adminCreateCoupon?: { __typename?: 'CreateCouponPayload', success: boolean, message?: string | null, coupon?: { __typename?: 'Coupon', id: any, code: string, description?: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount?: number | null, validFrom: any, validUntil?: any | null, isActive: boolean, maxTotalUses?: number | null, currentUses: number, createdAt: any, updatedAt: any } | null } | null };

export type AdminDeactivateCouponMutationVariables = Exact<{
  input: DeactivateCouponInput;
}>;


export type AdminDeactivateCouponMutation = { __typename?: 'Mutation', adminDeactivateCoupon?: { __typename?: 'DeactivateCouponPayload', success: boolean, message?: string | null } | null };

export type AdminDeleteCouponMutationVariables = Exact<{
  input: DeleteCouponInput;
}>;


export type AdminDeleteCouponMutation = { __typename?: 'Mutation', adminDeleteCoupon?: { __typename?: 'DeleteCouponPayload', success: boolean, message?: string | null, deletedId?: any | null } | null };

export type AdminListCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminListCouponsQuery = { __typename?: 'Query', adminListCoupons?: { __typename?: 'CouponsListPayload', totalCount: number, coupons: Array<{ __typename?: 'Coupon', id: any, code: string, description?: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount?: number | null, validFrom: any, validUntil?: any | null, isActive: boolean, maxTotalUses?: number | null, currentUses: number, createdAt: any, updatedAt: any }> } | null };

export type AdminPaymentAnalyticsQueryVariables = Exact<{
  input?: InputMaybe<AdminPaymentsFilterInput>;
}>;


export type AdminPaymentAnalyticsQuery = { __typename?: 'Query', adminPaymentAnalytics?: { __typename?: 'AdminPaymentAnalyticsPayload', totalPayments: number, totalAmount: number, capturedPayments: number, capturedAmount: number, failedPayments: number, failedAmount: number, refundedPayments: number, refundedAmount: number, averagePaymentAmount: number, successRate: number, recentPayments: number, paymentMethodBreakdown: Array<{ __typename?: 'PaymentMethodStats', method: string, count: number, totalAmount: number, successCount: number, failedCount: number }> } | null };

export type AdminPaymentDetailsQueryVariables = Exact<{
  paymentId: Scalars['String']['input'];
}>;


export type AdminPaymentDetailsQuery = { __typename?: 'Query', adminPaymentDetails?: { __typename?: 'AdminPaymentDetailsPayload', razorpayData: string, dbData?: string | null } | null };

export type AdminPaymentsListQueryVariables = Exact<{
  input?: InputMaybe<AdminPaymentsFilterInput>;
}>;


export type AdminPaymentsListQuery = { __typename?: 'Query', adminPaymentsList?: { __typename?: 'AdminPaymentsListPayload', entity: string, count: number, items: Array<{ __typename?: 'RazorpayPaymentItem', id: string, entity: string, amount: number, currency: string, status: string, orderId?: string | null, method?: string | null, email?: string | null, contact?: string | null, fee?: number | null, tax?: number | null, errorCode?: string | null, errorDescription?: string | null, errorSource?: string | null, errorStep?: string | null, errorReason?: string | null, captured: boolean, refundStatus?: string | null, amountRefunded?: number | null, createdAt: number, notes?: string | null }> } | null };

export type AdminRefundsListQueryVariables = Exact<{
  input?: InputMaybe<AdminPaymentsFilterInput>;
}>;


export type AdminRefundsListQuery = { __typename?: 'Query', adminRefundsList?: { __typename?: 'AdminRefundsListPayload', entity: string, count: number, items: Array<{ __typename?: 'RazorpayRefundItem', id: string, entity: string, amount: number, currency: string, paymentId: string, status: string, speedRequested?: string | null, speedProcessed?: string | null, createdAt: number }> } | null };

export type AdminSettlementsListQueryVariables = Exact<{
  input?: InputMaybe<AdminPaymentsFilterInput>;
}>;


export type AdminSettlementsListQuery = { __typename?: 'Query', adminSettlementsList?: { __typename?: 'AdminSettlementsListPayload', entity: string, count: number, items: Array<{ __typename?: 'RazorpaySettlementItem', id: string, entity: string, amount: number, status: string, fees?: number | null, tax?: number | null, utr?: string | null, createdAt: number }> } | null };

export type AdminUpdateCouponMutationVariables = Exact<{
  input: UpdateCouponInput;
}>;


export type AdminUpdateCouponMutation = { __typename?: 'Mutation', adminUpdateCoupon?: { __typename?: 'UpdateCouponPayload', success: boolean, message?: string | null, coupon?: { __typename?: 'Coupon', id: any, code: string, description?: string | null, discountType: DiscountType, discountValue: number, maxDiscountAmount?: number | null, validFrom: any, validUntil?: any | null, isActive: boolean, maxTotalUses?: number | null, currentUses: number, updatedAt: any } | null } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: { __typename?: 'AllUsersPayload', totalCount: number, adminCount: number, usersWithoutAssessmentCount: number, users: Array<{ __typename?: 'UserInfo', id: any, email: string, name?: string | null, phoneNumber?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any }> } | null };

export type AssessmentSectionPresetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssessmentSectionPresetsQuery = { __typename?: 'Query', assessmentSectionPresets: Array<{ __typename?: 'AssessmentSectionPreset', type: string, name: string, description: string, displayOrder: number }> };

export type GetAssessmentTrendsQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAssessmentTrendsQuery = { __typename?: 'Query', assessmentTrends?: { __typename?: 'AssessmentTrendsPayload', totalCompleted: number, totalStarted: number, totalInProgress: number, trends: Array<{ __typename?: 'AssessmentTrendData', date: any, completedCount: number, startedCount: number, inProgressCount: number }> } | null };

export type AssessmentTypeReadinessQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type AssessmentTypeReadinessQuery = { __typename?: 'Query', assessmentTypeReadiness: { __typename?: 'AssessmentTypeReadinessPayload', code: string, ready: boolean, sectionCount: number, requiredSectionBands: number, stagesPerSection: number, checks: Array<{ __typename?: 'AssessmentTypeReadinessCheck', key: string, label: string, passed: boolean, detail: string }> } };

export type CreateAssessmentSectionMutationVariables = Exact<{
  input: CreateAssessmentSectionInput;
}>;


export type CreateAssessmentSectionMutation = { __typename?: 'Mutation', createAssessmentSection?: { __typename?: 'CreateAssessmentSectionPayload', success: boolean, message?: string | null, section?: { __typename?: 'AssessmentSection', id: any, type: string, name: string, description?: string | null, displayOrder: number, isActive: boolean, assessmentTypeCode: string } | null } | null };

export type CreateAssessmentTypeMutationVariables = Exact<{
  input: CreateAssessmentTypeInput;
}>;


export type CreateAssessmentTypeMutation = { __typename?: 'Mutation', createAssessmentType?: { __typename?: 'AssessmentTypePayload', success: boolean, message?: string | null, assessmentType?: { __typename?: 'AssessmentTypeInfo', code: string, name: string, isActive: boolean, totalQuestions: number, sectionCount: number, questionsPerSection: number, minScore: number, maxScore: number, scoringFormula: string, displayOrder: number } | null } | null };

export type CreateInterpretationBandMutationVariables = Exact<{
  input: CreateInterpretationBandInput;
}>;


export type CreateInterpretationBandMutation = { __typename?: 'Mutation', createInterpretationBand?: { __typename?: 'CreateInterpretationBandPayload', success: boolean, message?: string | null, band?: { __typename?: 'AssessmentInterpretationBand', id: any, assessmentTypeCode: string, bandScope: string, sectionType?: string | null, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel?: string | null, narrative: string, keyMindset?: string | null, displayOrder: number, isActive: boolean } | null } | null };

export type DeactivateAssessmentSectionMutationVariables = Exact<{
  input: DeactivateAssessmentSectionInput;
}>;


export type DeactivateAssessmentSectionMutation = { __typename?: 'Mutation', deactivateAssessmentSection?: { __typename?: 'DeactivateAssessmentSectionPayload', success: boolean, message?: string | null, section?: { __typename?: 'AssessmentSection', id: any, type: string, isActive: boolean } | null } | null };

export type DeactivateAssessmentTypeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type DeactivateAssessmentTypeMutation = { __typename?: 'Mutation', deactivateAssessmentType?: { __typename?: 'AssessmentTypePayload', success: boolean, message?: string | null } | null };

export type DeleteAssessmentSectionMutationVariables = Exact<{
  input: DeleteAssessmentSectionInput;
}>;


export type DeleteAssessmentSectionMutation = { __typename?: 'Mutation', deleteAssessmentSection?: { __typename?: 'DeleteAssessmentSectionPayload', success: boolean, message?: string | null } | null };

export type DeleteInterpretationBandMutationVariables = Exact<{
  input: DeleteInterpretationBandInput;
}>;


export type DeleteInterpretationBandMutation = { __typename?: 'Mutation', deleteInterpretationBand?: { __typename?: 'DeleteInterpretationBandPayload', success: boolean, message?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  input: AdminDeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', adminDeleteUser?: { __typename?: 'AdminDeleteUserPayload', deletedUserId?: any | null, success: boolean, message?: string | null } | null };

export type GrantAdminMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GrantAdminMutation = { __typename?: 'Mutation', grantAdminAccess?: { __typename?: 'GrantAdminAccessPayload', success: boolean, message?: string | null, user?: { __typename?: 'User', id: any, email: string, name?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any } | null } | null };

export type GrantInternalAccessMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GrantInternalAccessMutation = { __typename?: 'Mutation', grantInternalAccess?: { __typename?: 'GrantInternalAccessPayload', success: boolean, message?: string | null, user?: { __typename?: 'User', id: any, email: string, name?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any } | null } | null };

export type SectionInterpretationBandsQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type SectionInterpretationBandsQuery = { __typename?: 'Query', assessmentInterpretationBands?: { __typename?: 'AssessmentInterpretationBandsConnection', nodes: Array<{ __typename?: 'AssessmentInterpretationBand', id: any, sectionType?: string | null, label: string, rangeStart: number, rangeEnd: number, narrative: string, displayOrder: number, isActive: boolean, bandScope: string, assessmentRecommendedActionsByInterpretationBandId: { __typename?: 'AssessmentRecommendedActionsConnection', nodes: Array<{ __typename?: 'AssessmentRecommendedAction', id: any, actionText: string, priority: number, isActive: boolean }> } }> } | null };

export type OverallInterpretationBandsQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type OverallInterpretationBandsQuery = { __typename?: 'Query', assessmentInterpretationBands?: { __typename?: 'AssessmentInterpretationBandsConnection', nodes: Array<{ __typename?: 'AssessmentInterpretationBand', id: any, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel?: string | null, narrative: string, keyMindset?: string | null, displayOrder: number, isActive: boolean, bandScope: string, assessmentRecommendedActionsByInterpretationBandId: { __typename?: 'AssessmentRecommendedActionsConnection', nodes: Array<{ __typename?: 'AssessmentRecommendedAction', id: any, actionText: string, priority: number, isActive: boolean }> } }> } | null };

export type CreateRecommendedActionMutationVariables = Exact<{
  input: CreateRecommendedActionInput;
}>;


export type CreateRecommendedActionMutation = { __typename?: 'Mutation', createRecommendedAction?: { __typename?: 'CreateRecommendedActionPayload', success: boolean, message?: string | null, action?: { __typename?: 'AssessmentRecommendedAction', id: any, actionText: string, priority: number, isActive: boolean } | null } | null };

export type UpdateRecommendedActionMutationVariables = Exact<{
  input: UpdateRecommendedActionInput;
}>;


export type UpdateRecommendedActionMutation = { __typename?: 'Mutation', updateRecommendedAction?: { __typename?: 'UpdateRecommendedActionPayload', success: boolean, message?: string | null, action?: { __typename?: 'AssessmentRecommendedAction', id: any, actionText: string, priority: number, isActive: boolean } | null } | null };

export type DeleteRecommendedActionMutationVariables = Exact<{
  input: DeleteRecommendedActionInput;
}>;


export type DeleteRecommendedActionMutation = { __typename?: 'Mutation', deleteRecommendedAction?: { __typename?: 'DeleteRecommendedActionPayload', success: boolean, message?: string | null } | null };

export type ResetTemplateContentMutationVariables = Exact<{
  assessmentType: Scalars['String']['input'];
  contentKey: Scalars['String']['input'];
}>;


export type ResetTemplateContentMutation = { __typename?: 'Mutation', resetTemplateContent?: { __typename?: 'TemplateContentPayload', success: boolean, message?: string | null } | null };

export type RevokeAdminMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type RevokeAdminMutation = { __typename?: 'Mutation', revokeAdminAccess?: { __typename?: 'RevokeAdminAccessPayload', success: boolean, message?: string | null, user?: { __typename?: 'User', id: any, email: string, name?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any } | null } | null };

export type RevokeInternalAccessMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type RevokeInternalAccessMutation = { __typename?: 'Mutation', revokeInternalAccess?: { __typename?: 'RevokeInternalAccessPayload', success: boolean, message?: string | null, user?: { __typename?: 'User', id: any, email: string, name?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any } | null } | null };

export type GetScoreDistributionQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetScoreDistributionQuery = { __typename?: 'Query', scoreDistribution?: { __typename?: 'ScoreDistributionPayload', totalAssessments: number, averageScore: number, distribution: Array<{ __typename?: 'ScoreDistributionData', range: string, count: number, percentage: number, label: string }> } | null };

export type SeedAssessmentTypeContentMutationVariables = Exact<{
  input: SeedAssessmentTypeContentInput;
}>;


export type SeedAssessmentTypeContentMutation = { __typename?: 'Mutation', seedAssessmentTypeContent?: { __typename?: 'AssessmentTypePayload', success: boolean, message?: string | null, assessmentType?: { __typename?: 'AssessmentTypeInfo', code: string, name: string, isActive: boolean } | null } | null };

export type SeedAssessmentTypeSectionsMutationVariables = Exact<{
  input: SeedAssessmentTypeSectionsInput;
}>;


export type SeedAssessmentTypeSectionsMutation = { __typename?: 'Mutation', seedAssessmentTypeSections?: { __typename?: 'SeedAssessmentTypeSectionsPayload', success: boolean, message?: string | null, sectionsCreated: number } | null };

export type UpdateAssessmentTypeMutationVariables = Exact<{
  input: UpdateAssessmentTypeInput;
}>;


export type UpdateAssessmentTypeMutation = { __typename?: 'Mutation', updateAssessmentType?: { __typename?: 'AssessmentTypePayload', success: boolean, message?: string | null, assessmentType?: { __typename?: 'AssessmentTypeInfo', code: string, name: string } | null } | null };

export type UpdateInterpretationBandMutationVariables = Exact<{
  input: UpdateInterpretationBandInput;
}>;


export type UpdateInterpretationBandMutation = { __typename?: 'Mutation', updateInterpretationBand?: { __typename?: 'UpdateInterpretationBandPayload', success: boolean, message?: string | null, band?: { __typename?: 'AssessmentInterpretationBand', id: any, sectionType?: string | null, label: string, rangeStart: number, rangeEnd: number, displayRangeLabel?: string | null, narrative: string, keyMindset?: string | null, displayOrder: number, isActive: boolean } | null } | null };

export type UpdateTemplateContentMutationVariables = Exact<{
  input: UpdateTemplateContentInput;
}>;


export type UpdateTemplateContentMutation = { __typename?: 'Mutation', updateTemplateContent?: { __typename?: 'TemplateContentPayload', success: boolean, message?: string | null } | null };

export type GetUsersWithoutAssessmentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithoutAssessmentQuery = { __typename?: 'Query', usersWithoutAssessment?: { __typename?: 'UsersWithoutAssessmentPayload', totalCount: number, users: Array<{ __typename?: 'UserInfo', id: any, email: string, name?: string | null, phoneNumber?: string | null, isAdmin: boolean, isInternal: boolean, createdAt: any, updatedAt: any }> } | null };

export type AdminAssessmentStatsQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type AdminAssessmentStatsQuery = { __typename?: 'Query', adminAssessmentStats?: { __typename?: 'AdminStatsPayload', totalSections: number, totalQuestions: number, totalInterpretationBands: number, totalRecommendedActions: number, activeQuestions: number, inactiveQuestions: number, questionsBySectionType: any } | null };

export type AssessmentProgressQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type AssessmentProgressQuery = { __typename?: 'Query', assessmentProgress?: { __typename?: 'AssessmentProgressPayload', totalQuestions: number, answeredQuestions: number, progressPercentage: number, session?: { __typename?: 'AssessmentSession', id: any, currentQuestionNumber: number, assessmentTypeCode: string } | null } | null };

export type AssessmentQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssessmentQuestionsQuery = { __typename?: 'Query', assessmentQuestions?: { __typename?: 'AssessmentQuestionsConnection', nodes: Array<{ __typename?: 'AssessmentQuestion', id: any, questionText: string, sectionId: any, displayOrder: number, isActive: boolean }> } | null };

export type GetAssessmentResultQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetAssessmentResultQuery = { __typename?: 'Query', assessmentResult?: { __typename?: 'AssessmentResult', id: any, assessmentTypeCode: string, totalReadinessIndex: number, interpretationLabel?: string | null, interpretationNarrative?: string | null, interpretationKeyMindset?: string | null, recommendedActions?: Array<string | null> | null, pdfPath?: string | null, createdAt: any, assessmentSectionResultsByResultId: { __typename?: 'AssessmentSectionResultsConnection', nodes: Array<{ __typename?: 'AssessmentSectionResult', sectionType: string, score: number, interpretationLabel: string, interpretationNarrative: string, interpretationBandId: any }> }, cohortComparison?: { __typename?: 'CohortComparison', userAge: number, userGender: string, ageCohort?: { __typename?: 'AgeCohort', ageRange: string, cohortSize: number, totalScore: { __typename?: 'CohortTotalScore', userScore: number, cohortAverage: number }, sectionScores: Array<{ __typename?: 'CohortSectionScore', sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null, genderCohort?: { __typename?: 'GenderCohort', gender: string, cohortSize: number, totalScore: { __typename?: 'CohortTotalScore', userScore: number, cohortAverage: number }, sectionScores: Array<{ __typename?: 'CohortSectionScore', sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null, overallCohort?: { __typename?: 'OverallCohort', cohortSize: number, totalScore: { __typename?: 'CohortTotalScore', userScore: number, cohortAverage: number }, sectionScores: Array<{ __typename?: 'CohortSectionScore', sectionType: string, sectionName: string, userScore: number, cohortAverage: number }> } | null } | null } | null };

export type AssessmentStatusQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type AssessmentStatusQuery = { __typename?: 'Query', assessmentStatus?: { __typename?: 'AssessmentStatusPayload', hasCompletedAssessment: boolean, hasActiveSession: boolean, completedAt?: any | null, resultId?: any | null, totalReadinessIndex?: number | null, completedAssessments: Array<string>, availableAssessments: Array<{ __typename?: 'AssessmentTypeInfo', code: string, name: string, priceAmount: number, totalQuestions: number }> } | null };

export type AssessmentTypeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type AssessmentTypeByCodeQuery = { __typename?: 'Query', assessmentTypeByCode?: { __typename?: 'AssessmentType', code: string, name: string, priceAmount: number, totalQuestions?: number | null, minScore: number, maxScore: number, isActive: boolean } | null };

export type AvailableAssessmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableAssessmentsQuery = { __typename?: 'Query', availableAssessments: Array<{ __typename?: 'AssessmentTypeInfo', code: string, name: string, description?: string | null, priceAmount: number, totalQuestions: number, displayOrder: number }> };

export type BulkCreateAssessmentQuestionsMutationVariables = Exact<{
  input: BulkCreateQuestionsInput;
}>;


export type BulkCreateAssessmentQuestionsMutation = { __typename?: 'Mutation', bulkCreateAssessmentQuestions?: { __typename?: 'BulkCreateQuestionsPayload', count: number, success: boolean, message?: string | null, questions: Array<{ __typename?: 'AssessmentQuestion', id: any, questionText: string, displayOrder: number }> } | null };

export type CompleteAssessmentMutationVariables = Exact<{
  sessionId: Scalars['UUID']['input'];
}>;


export type CompleteAssessmentMutation = { __typename?: 'Mutation', completeAssessment?: { __typename?: 'CompleteAssessmentPayload', success: boolean, message?: string | null, pdfPath?: string | null, result?: { __typename?: 'AssessmentResult', id: any, sessionId: any, userId: any, totalReadinessIndex: number, pdfPath?: string | null, isEmailed: boolean, emailedAt?: any | null, createdAt: any } | null } | null };

export type CreateAssessmentQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateAssessmentQuestionMutation = { __typename?: 'Mutation', createAssessmentQuestion?: { __typename?: 'CreateQuestionPayload', success: boolean, message?: string | null, question?: { __typename?: 'AssessmentQuestion', id: any, sectionId: any, questionText: string, displayOrder: number, isActive: boolean, createdAt: any, updatedAt: any } | null } | null };

export type CurrentAssessmentSessionQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CurrentAssessmentSessionQuery = { __typename?: 'Query', currentAssessmentSession?: { __typename?: 'AssessmentSession', id: any, userId: any, paymentId?: any | null, status: AssessmentStatus, currentQuestionNumber: number, assessmentTypeCode: string, startTime: any, lastActivityTime: any, expiresAt: any } | null };

export type DeleteMyAssessmentMutationVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteMyAssessmentMutation = { __typename?: 'Mutation', deleteMyAssessment?: { __typename?: 'DeleteMyAssessmentPayload', success: boolean, message?: string | null, deletedCount: number } | null };

export type DeleteAssessmentQuestionMutationVariables = Exact<{
  input: DeleteQuestionInput;
}>;


export type DeleteAssessmentQuestionMutation = { __typename?: 'Mutation', deleteAssessmentQuestion?: { __typename?: 'DeleteQuestionPayload', success: boolean, message?: string | null } | null };

export type GetSectionQuestionsQueryVariables = Exact<{
  sectionId: Scalars['UUID']['input'];
}>;


export type GetSectionQuestionsQuery = { __typename?: 'Query', assessmentQuestions?: { __typename?: 'AssessmentQuestionsConnection', totalCount: number, nodes: Array<{ __typename?: 'AssessmentQuestion', id: any, sectionId: any, questionText: string, displayOrder: number, isActive: boolean, createdAt: any, updatedAt: any }> } | null };

export type GetAllSectionsQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllSectionsQuery = { __typename?: 'Query', assessmentSections?: { __typename?: 'AssessmentSectionsConnection', nodes: Array<{ __typename?: 'AssessmentSection', id: any, type: string, name: string, description?: string | null, displayOrder: number, isActive: boolean, assessmentTypeCode: string }> } | null };

export type GetSessionQuestionQueryVariables = Exact<{
  sessionId: Scalars['UUID']['input'];
  questionNumber: Scalars['Int']['input'];
}>;


export type GetSessionQuestionQuery = { __typename?: 'Query', getSessionQuestion?: { __typename?: 'SessionQuestionPayload', question: { __typename?: 'SessionQuestionDetail', id: any, sessionId: any, questionId: any, displayOrder: number, questionText: string, sectionName: string, sectionType: string, isAnswered: boolean }, currentResponse?: { __typename?: 'CurrentResponseDetail', id: any, responseValue: number, timeTakenSeconds?: number | null, isUpdate: boolean, updatedAt: any } | null, navigation: { __typename?: 'NavigationMetadata', currentNumber: number, totalQuestions: number, hasPrevious: boolean, hasNext: boolean, previousNumber?: number | null, nextNumber?: number | null }, progress: { __typename?: 'ProgressMetadata', answeredCount: number, totalCount: number, percentComplete: number } } | null };

export type ResendReportMutationVariables = Exact<{
  resultId: Scalars['UUID']['input'];
}>;


export type ResendReportMutation = { __typename?: 'Mutation', resendAssessmentReport?: { __typename?: 'ResendReportPayload', success: boolean, message?: string | null } | null };

export type SessionQuestionsQueryVariables = Exact<{
  sessionId: Scalars['UUID']['input'];
}>;


export type SessionQuestionsQuery = { __typename?: 'Query', assessmentSession?: { __typename?: 'AssessmentSession', id: any, status: AssessmentStatus, currentQuestionNumber: number, startTime: any, lastActivityTime: any, expiresAt: any, assessmentSessionQuestionsBySessionId: { __typename?: 'AssessmentSessionQuestionsConnection', nodes: Array<{ __typename?: 'AssessmentSessionQuestion', id: any, sessionId: any, questionId: any, displayOrder: number, isAnswered: boolean, question?: { __typename?: 'AssessmentQuestion', id: any, questionText: string, sectionId: any } | null }> }, assessmentResponsesBySessionId: { __typename?: 'AssessmentResponsesConnection', nodes: Array<{ __typename?: 'AssessmentResponse', id: any, questionId: any, responseValue: number, timeTakenSeconds?: number | null, createdAt: any, updatedAt: any }> } } | null };

export type StartAssessmentMutationVariables = Exact<{
  input: StartAssessmentInput;
}>;


export type StartAssessmentMutation = { __typename?: 'Mutation', startAssessment?: { __typename?: 'StartAssessmentPayload', message?: string | null, session?: { __typename?: 'AssessmentSession', id: any, userId: any, paymentId?: any | null, status: AssessmentStatus, currentQuestionNumber: number, assessmentTypeCode: string, startTime: any, expiresAt: any } | null, assessmentType?: { __typename?: 'AssessmentTypeInfo', code: string, name: string, totalQuestions: number } | null } | null };

export type SubmitOrUpdateResponseMutationVariables = Exact<{
  input: SubmitOrUpdateResponseInput;
}>;


export type SubmitOrUpdateResponseMutation = { __typename?: 'Mutation', submitOrUpdateResponse?: { __typename?: 'SubmitOrUpdateResponsePayload', success: boolean, message: string, response: { __typename?: 'EnhancedResponseDetail', id: any, sessionId: any, questionId: any, responseValue: number, timeTakenSeconds?: number | null, isUpdate: boolean, createdAt: any, updatedAt: any }, session: { __typename?: 'SessionStateDetail', id: any, currentQuestionNumber: number, lastAnsweredQuestion?: number | null, lastActivityTime: any, expiresAt: any }, progress: { __typename?: 'ProgressMetadata', answeredCount: number, totalCount: number, percentComplete: number }, nextQuestion: { __typename?: 'NextQuestionHint', questionNumber?: number | null, hasNext: boolean } } | null };

export type UpdateAssessmentQuestionMutationVariables = Exact<{
  input: UpdateQuestionInput;
}>;


export type UpdateAssessmentQuestionMutation = { __typename?: 'Mutation', updateAssessmentQuestion?: { __typename?: 'UpdateQuestionPayload', success: boolean, message?: string | null, question?: { __typename?: 'AssessmentQuestion', id: any, questionText: string, displayOrder: number, isActive: boolean, updatedAt: any } | null } | null };

export type UpdateAssessmentSectionMutationVariables = Exact<{
  input: UpdateSectionInput;
}>;


export type UpdateAssessmentSectionMutation = { __typename?: 'Mutation', updateAssessmentSection?: { __typename?: 'UpdateSectionPayload', success: boolean, message?: string | null, section?: { __typename?: 'AssessmentSection', id: any, name: string, description?: string | null, displayOrder: number, isActive: boolean, updatedAt: any } | null } | null };

export type GetUsersWithAssessmentQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersWithAssessmentQuery = { __typename?: 'Query', usersWithAssessment?: { __typename?: 'UsersWithAssessmentPayload', totalCount: number, completedCount: number, inProgressCount: number, users: Array<{ __typename?: 'UserAssessmentInfo', userId: any, userName?: string | null, userEmail: string, sessionId: any, resultId?: any | null, assessmentTypeCode: string, status: string, startedAt: any, completedAt?: any | null, expiresAt: any, totalScore?: number | null, interpretationLabel?: string | null }> } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: (
    { __typename?: 'User', id: any }
    & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
  ) | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'ForgotPasswordPayload', success?: boolean | null } | null };

export type Lite_UserFragment = { __typename?: 'User', id: any, name?: string | null, email: string, age: number, phoneNumber?: string | null, gender: string, type: string, isAdmin: boolean, isInternal: boolean } & { ' $fragmentName'?: 'Lite_UserFragment' };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', token?: string | null, user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
    ) } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutPayload', success?: boolean | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ResetPasswordPayload', success?: boolean | null } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterPayload', token: string, user: (
      { __typename?: 'User', id: any }
      & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
    ) } | null };

export type UpdatePhoneNumberMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type UpdatePhoneNumberMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UpdateUserPayload', user?: (
      { __typename?: 'User', id: any }
      & { ' $fragmentRefs'?: { 'Lite_UserFragment': Lite_UserFragment } }
    ) | null } | null };

export type CheckPaymentStatusQueryVariables = Exact<{
  assessmentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CheckPaymentStatusQuery = { __typename?: 'Query', currentUserPaymentStatus?: { __typename?: 'UserPaymentStatusPayload', hasPaid: boolean, paymentId?: any | null, status?: string | null, amountInr?: number | null, createdAt?: string | null } | null };

export type CreatePaymentOrderMutationVariables = Exact<{
  input: CreatePaymentOrderInput;
}>;


export type CreatePaymentOrderMutation = { __typename?: 'Mutation', createPaymentOrder?: { __typename?: 'CreatePaymentOrderPayload', orderId?: string | null, amount: number, originalAmount?: number | null, discountAmount?: number | null, currency: string, razorpayKeyId?: string | null, couponApplied: boolean, couponMessage?: string | null, isFree: boolean } | null };

export type ValidateCouponMutationVariables = Exact<{
  input: ValidateCouponInput;
}>;


export type ValidateCouponMutation = { __typename?: 'Mutation', validateCoupon?: { __typename?: 'ValidateCouponPayload', valid: boolean, discountAmount: number, originalAmount: number, finalAmount: number, message: string, coupon?: { __typename?: 'CouponInfo', code: string, description?: string | null, discountType: DiscountType, discountValue: number } | null } | null };

export type VerifyPaymentMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  paymentId: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}>;


export type VerifyPaymentMutation = { __typename?: 'Mutation', verifyPayment?: { __typename?: 'VerifyPaymentPayload', success: boolean, paymentId?: any | null, message?: string | null } | null };

export const Lite_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<Lite_UserFragment, unknown>;
export const ActivateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ActivateAssessmentTypeMutation, ActivateAssessmentTypeMutationVariables>;
export const AdminActivateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminActivateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminActivateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AdminActivateCouponMutation, AdminActivateCouponMutationVariables>;
export const AdminAssessmentTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAssessmentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssessmentTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCount"}},{"kind":"Field","name":{"kind":"Name","value":"questionsPerSection"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"scoringFormula"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<AdminAssessmentTypesQuery, AdminAssessmentTypesQueryVariables>;
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
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"adminCount"}},{"kind":"Field","name":{"kind":"Name","value":"usersWithoutAssessmentCount"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const AssessmentSectionPresetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentSectionPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSectionPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<AssessmentSectionPresetsQuery, AssessmentSectionPresetsQueryVariables>;
export const GetAssessmentTrendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentTrends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTrends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"startedCount"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"totalStarted"}},{"kind":"Field","name":{"kind":"Name","value":"totalInProgress"}}]}}]}}]} as unknown as DocumentNode<GetAssessmentTrendsQuery, GetAssessmentTrendsQueryVariables>;
export const AssessmentTypeReadinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTypeReadiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeReadiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"ready"}},{"kind":"Field","name":{"kind":"Name","value":"sectionCount"}},{"kind":"Field","name":{"kind":"Name","value":"requiredSectionBands"}},{"kind":"Field","name":{"kind":"Name","value":"stagesPerSection"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"passed"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentTypeReadinessQuery, AssessmentTypeReadinessQueryVariables>;
export const CreateAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssessmentSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentSectionMutation, CreateAssessmentSectionMutationVariables>;
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
export const ResetTemplateContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetTemplateContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetTemplateContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetTemplateContentMutation, ResetTemplateContentMutationVariables>;
export const RevokeAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeAdminAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RevokeAdminMutation, RevokeAdminMutationVariables>;
export const RevokeInternalAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeInternalAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeInternalAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RevokeInternalAccessMutation, RevokeInternalAccessMutationVariables>;
export const GetScoreDistributionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScoreDistribution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scoreDistribution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"range"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAssessments"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}}]}}]}}]} as unknown as DocumentNode<GetScoreDistributionQuery, GetScoreDistributionQueryVariables>;
export const SeedAssessmentTypeContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeedAssessmentTypeContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeedAssessmentTypeContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seedAssessmentTypeContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<SeedAssessmentTypeContentMutation, SeedAssessmentTypeContentMutationVariables>;
export const SeedAssessmentTypeSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SeedAssessmentTypeSections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeedAssessmentTypeSectionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seedAssessmentTypeSections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sectionsCreated"}}]}}]}}]} as unknown as DocumentNode<SeedAssessmentTypeSectionsMutation, SeedAssessmentTypeSectionsMutationVariables>;
export const UpdateAssessmentTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssessmentTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentTypeMutation, UpdateAssessmentTypeMutationVariables>;
export const UpdateInterpretationBandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInterpretationBand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInterpretationBandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInterpretationBand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"band"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"rangeStart"}},{"kind":"Field","name":{"kind":"Name","value":"rangeEnd"}},{"kind":"Field","name":{"kind":"Name","value":"displayRangeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"narrative"}},{"kind":"Field","name":{"kind":"Name","value":"keyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInterpretationBandMutation, UpdateInterpretationBandMutationVariables>;
export const UpdateTemplateContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTemplateContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTemplateContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTemplateContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateTemplateContentMutation, UpdateTemplateContentMutationVariables>;
export const GetUsersWithoutAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithoutAssessment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersWithoutAssessment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetUsersWithoutAssessmentQuery, GetUsersWithoutAssessmentQueryVariables>;
export const AdminAssessmentStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAssessmentStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssessmentStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSections"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"totalInterpretationBands"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecommendedActions"}},{"kind":"Field","name":{"kind":"Name","value":"activeQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"inactiveQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"questionsBySectionType"}}]}}]}}]} as unknown as DocumentNode<AdminAssessmentStatsQuery, AdminAssessmentStatsQueryVariables>;
export const AssessmentProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"answeredQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}}]}}]}}]} as unknown as DocumentNode<AssessmentProgressQuery, AssessmentProgressQueryVariables>;
export const AssessmentQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentQuestionsQuery, AssessmentQuestionsQueryVariables>;
export const GetAssessmentResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationNarrative"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationKeyMindset"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedActions"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentSectionResultsByResultId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationNarrative"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationBandId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cohortComparison"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAge"}},{"kind":"Field","name":{"kind":"Name","value":"userGender"}},{"kind":"Field","name":{"kind":"Name","value":"ageCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ageRange"}},{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"genderCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"overallCohort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohortSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sectionScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"userScore"}},{"kind":"Field","name":{"kind":"Name","value":"cohortAverage"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssessmentResultQuery, GetAssessmentResultQueryVariables>;
export const AssessmentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasCompletedAssessment"}},{"kind":"Field","name":{"kind":"Name","value":"hasActiveSession"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"completedAssessments"}},{"kind":"Field","name":{"kind":"Name","value":"availableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}}]}}]}}]}}]} as unknown as DocumentNode<AssessmentStatusQuery, AssessmentStatusQueryVariables>;
export const AssessmentTypeByCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssessmentTypeByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<AssessmentTypeByCodeQuery, AssessmentTypeByCodeQueryVariables>;
export const AvailableAssessmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AvailableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<AvailableAssessmentsQuery, AvailableAssessmentsQueryVariables>;
export const BulkCreateAssessmentQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateAssessmentQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkCreateQuestionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateAssessmentQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<BulkCreateAssessmentQuestionsMutation, BulkCreateAssessmentQuestionsMutationVariables>;
export const CompleteAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"totalReadinessIndex"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailed"}},{"kind":"Field","name":{"kind":"Name","value":"emailedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"pdfPath"}}]}}]}}]} as unknown as DocumentNode<CompleteAssessmentMutation, CompleteAssessmentMutationVariables>;
export const CreateAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentQuestionMutation, CreateAssessmentQuestionMutationVariables>;
export const CurrentAssessmentSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentAssessmentSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAssessmentSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<CurrentAssessmentSessionQuery, CurrentAssessmentSessionQueryVariables>;
export const DeleteMyAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMyAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMyAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"confirmation"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"deletedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteMyAssessmentMutation, DeleteMyAssessmentMutationVariables>;
export const DeleteAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteAssessmentQuestionMutation, DeleteAssessmentQuestionMutationVariables>;
export const GetSectionQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSectionQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sectionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetSectionQuestionsQuery, GetSectionQuestionsQueryVariables>;
export const GetAllSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"assessmentTypeCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"DISPLAY_ORDER_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSectionsQuery, GetAllSectionsQueryVariables>;
export const GetSessionQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSessionQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSessionQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionName"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswered"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"navigation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevious"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"previousNumber"}},{"kind":"Field","name":{"kind":"Name","value":"nextNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answeredCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"percentComplete"}}]}}]}}]}}]} as unknown as DocumentNode<GetSessionQuestionQuery, GetSessionQuestionQueryVariables>;
export const ResendReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"resultId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResendReportMutation, ResendReportMutationVariables>;
export const SessionQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentSessionQuestionsBySessionId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isAnswered"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assessmentResponsesBySessionId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SessionQuestionsQuery, SessionQuestionsQueryVariables>;
export const StartAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartAssessmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuestions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<StartAssessmentMutation, StartAssessmentMutationVariables>;
export const SubmitOrUpdateResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitOrUpdateResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitOrUpdateResponseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitOrUpdateResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"responseValue"}},{"kind":"Field","name":{"kind":"Name","value":"timeTakenSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"isUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentQuestionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastAnsweredQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityTime"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answeredCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"percentComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SubmitOrUpdateResponseMutation, SubmitOrUpdateResponseMutationVariables>;
export const UpdateAssessmentQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questionText"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentQuestionMutation, UpdateAssessmentQuestionMutationVariables>;
export const UpdateAssessmentSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentSectionMutation, UpdateAssessmentSectionMutationVariables>;
export const GetUsersWithAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersWithAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"}},{"kind":"Field","name":{"kind":"Name","value":"interpretationLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"inProgressCount"}}]}}]}}]} as unknown as DocumentNode<GetUsersWithAssessmentQuery, GetUsersWithAssessmentQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UpdatePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patch"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Lite_User"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Lite_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]} as unknown as DocumentNode<UpdatePhoneNumberMutation, UpdatePhoneNumberMutationVariables>;
export const CheckPaymentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckPaymentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"ssri","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserPaymentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPaid"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amountInr"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CheckPaymentStatusQuery, CheckPaymentStatusQueryVariables>;
export const CreatePaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"razorpayKeyId"}},{"kind":"Field","name":{"kind":"Name","value":"couponApplied"}},{"kind":"Field","name":{"kind":"Name","value":"couponMessage"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}}]}}]}}]} as unknown as DocumentNode<CreatePaymentOrderMutation, CreatePaymentOrderMutationVariables>;
export const ValidateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateCouponInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"finalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ValidateCouponMutation, ValidateCouponMutationVariables>;
export const VerifyPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"paymentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyPaymentMutation, VerifyPaymentMutationVariables>;