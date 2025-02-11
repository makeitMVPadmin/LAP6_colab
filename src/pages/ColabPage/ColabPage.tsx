import NavBar from '@/components/NavBar/NavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'

export default function ColabPage() {
  return (
    <main>
      <NavBar />
      <div className="flex justify-center">
        <GoalBuddyCard goalBuddyList={[]} />
      </div>
    </main>
  )
}
