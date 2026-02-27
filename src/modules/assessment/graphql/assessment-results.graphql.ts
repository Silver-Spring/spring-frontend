import { graphql } from '@/gql';

const GetAssessmentResultDoc = graphql(`
  query GetAssessmentResult($id: UUID!) {
    assessmentResult(id: $id) {
      id
      totalReadinessIndex
      pdfPath
      createdAt
      
      assessmentSectionResultsByResultId {
        nodes {
          sectionType
          score
          interpretationLabel
          interpretationNarrative
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
