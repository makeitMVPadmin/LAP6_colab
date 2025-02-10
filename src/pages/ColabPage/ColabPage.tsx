export default function ColabPage() {
  return (
    <main>
      <DummyNavBar />
      <div className="flex justify-center">
        <GoalBuddyCard goalBuddyList={[]}/>
      </div>
    </main>
  )
}