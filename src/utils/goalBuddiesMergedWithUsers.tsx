import { AllGoalBuddyData, GoalBuddy, User } from '../types/types'

export const goalBuddiesMergedWithUsers = (
  goalBuddies: GoalBuddy[],
  users: User[],
): AllGoalBuddyData[] =>
  goalBuddies
    .map((goalBuddy) => {
      const user = users.find((user) => goalBuddy.userId === user.id)
      if (user) {
        return {
          ...goalBuddy,
          ...user,
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
