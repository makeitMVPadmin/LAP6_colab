import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { GoalBuddy, BaseGoalBuddy } from '../../src/types/types'
import getAllGoalBuddies from './goalBuddies';

/*
 * Description: This function fetch all goal buddies in the collection.
 * @author [Kevin]
 *
 */
export default async function getFilteredGoalBuddies() {
  const goalBuddiesArray = await getAllGoalBuddies();
  console.log('goal buddies', goalBuddiesArray);

  const filterMentors = () => {
    goalBuddiesArray.filter(goalBuddy => {
        goalBuddy.isMentor
    })
  }

  const filterAccountabilityPartners = () => {
      goalBuddiesArray.filter(goalBuddy => {
          goalBuddy.isAccountabilityPartner
      })
  }

  const filterNetworking = () => {
      goalBuddiesArray.filter(goalBuddy => {
          goalBuddy.isNetworking
      })
  }
  return goalBuddiesArray;
}
