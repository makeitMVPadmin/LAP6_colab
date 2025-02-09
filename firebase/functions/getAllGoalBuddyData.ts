import { getAllGoalBuddies } from "./goalBuddies"
import { getAllUsers } from "./users";

export const getAllGoalBuddyData = async () => {
  try {
    const goalBuddiesList = await getAllGoalBuddies()
    const usersList = await getAllUsers()

    const filteredList = goalBuddiesList.map((goalBuddy) => {
      const user = usersList.find((user) => goalBuddy.userId === user.id)
      if (user) {
        return {
          ...goalBuddy,
          ...user,
          createdAt: {
            goalBuddy: goalBuddy.createdAt,
            user: user.createdAt,
          },
          updatedAt: {goalBuddy: goalBuddy.updatedAt, user: user.updatedAt}
        }
      }
      return null
    })
    .filter( item => item !== null)
    console.log(filteredList)
    return filteredList

  } catch (error) {
    console.error("Error in getting all Goal Buddy Data", error)
    throw error
  }
}