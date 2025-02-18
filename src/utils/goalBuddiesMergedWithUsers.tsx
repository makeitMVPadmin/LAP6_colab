import { AllGoalBuddyData, GoalBuddy, User } from '../types/types'

// Function to merge the data from arrays of User and GoalBuddy data to one array of combined AllGoalBuddyData when the User id matches the userID field from GoalBuddy
// @author[]
// @editor[Katrina]
// Edit: the GoalBuddy id was being overwritten with the User's id (having it stored twice and losing the GoalBuddy id). Swithed the order in which user and goalBuddy are loaded so that GoalBuddy id is not overwritten.
export const goalBuddiesMergedWithUsers = (
  goalBuddies: GoalBuddy[],
  users: User[],
): AllGoalBuddyData[] =>
  goalBuddies
    .map((goalBuddy) => {

      const user = users.find((user) => goalBuddy.userId === user.id)
      if (user) {
        return {
          ...user,
          ...goalBuddy,
          createdAt: {
            goalBuddy: goalBuddy.createdAt,
            user: user.createdAt,
          },
          updatedAt: {
            goalBuddy: goalBuddy.updatedAt,
            user: user.updatedAt,
          },
        }
      } else {
        return null
      }
    })
    .filter((item) => item != null)
