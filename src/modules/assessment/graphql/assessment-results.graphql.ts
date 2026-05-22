import { graphql } from '@/gql';

const GetAssessmentResultDoc = graphql(`
  query GetAssessmentResult($id: UUID!) {
    assessmentResult(id: $id) {
      id
      assessmentTypeCode
      assessmentTypeByAssessmentTypeCode {
        name
        minScore
        maxScore
        scoringFormula
      }
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
          sectionName
          sectionEmoji
          sectionDisplayColor
          score
          interpretationLabel
          interpretationNarrative
          interpretationBandId
          section {
            name
            emoji
            displayColor
            description
            displayOrder
          }
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
