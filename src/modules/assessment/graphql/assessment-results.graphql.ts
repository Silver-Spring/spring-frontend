import { graphql } from '@/gql';

const GetAssessmentResultDoc = graphql(`
  query GetAssessmentResult($id: UUID!) {
    assessmentResult(id: $id) {
      id
      assessmentTypeCode
      totalReadinessIndex
      interpretationLabel
      interpretationNarrative
      interpretationKeyMindset
      recommendedActions
      pdfPath
      createdAt

      assessmentSectionResultsByResultId {
        nodes {
          sectionType
          score
          interpretationLabel
          interpretationNarrative
          interpretationBandId
        }
      }
      
      cohortComparison {
        userAge
        userGender
        
        ageCohort {
          ageRange
          cohortSize
          totalScore {
            userScore
            cohortAverage
          }
          sectionScores {
            sectionType
            sectionName
            userScore
            cohortAverage
          }
        }
        
        genderCohort {
          gender
          cohortSize
          totalScore {
            userScore
            cohortAverage
          }
          sectionScores {
            sectionType
            sectionName
            userScore
            cohortAverage
          }
        }
        
        overallCohort {
          cohortSize
          totalScore {
            userScore
            cohortAverage
          }
          sectionScores {
            sectionType
            sectionName
            userScore
            cohortAverage
          }
        }
      }
    }
  }
`);

export { GetAssessmentResultDoc };
