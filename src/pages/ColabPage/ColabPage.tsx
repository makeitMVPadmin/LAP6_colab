import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import Layout from '@/components/Layout/Layout'

export default function ColabPage() {
  return (
    <main>
      <DummyNavBar />

      <div className="flex justify-center">
        <GoalBuddyCard />
      </div>
      <Layout></Layout>
    </main>
  )
}
