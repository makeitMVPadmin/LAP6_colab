import DummyNavBar from "@/components/DummyNavBar/DummyNavBar";
import GoalBuddyCard from "@/components/GoalBuddyCard/GoalBuddyCard";
import { useEffect, useState } from "react";
import { AllGoalBuddyData } from "@/types/types";

export default function ColabPage() {
  const [goalBuddyList, setGoalBuddyList] = useState<AllGoalBuddyData[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      setGoalBuddyList([
        {
          id: 'SjAJ7Kwpf0p1BhLN28uk',
          isMentor: true,
          isNetworking: true,
          yearsOfExperience: '3-5 years',
          createdAt: {
            goalBuddy: {
              seconds: 1716922360,
              nanoseconds: 650801000,
            },
            user: {
              seconds: 1712849842,
              nanoseconds: 581744000,
            },
          },
          userId: 'SjAJ7Kwpf0p1BhLN28uk',
          googleCalendarId: 'c360884e-f250-454c-b66a-f8d3f8d04ce9',
          timezone: 'Africa/Dar_es_Salaam',
          bio: 'Sign building whatever national field garden. Lot ground than child indicate rate mean. Shoulder college music step machine truth.',
          availabilities: [],
          skills: ['Data Science', 'Web Development'],
          updatedAt: {
            goalBuddy: {
              seconds: 1724438822,
              nanoseconds: 925478000,
            },
            user: {
              seconds: 1714392710,
              nanoseconds: 923456000,
            },
          },
          isAccountabilityPartner: false,
          discipline: 'Marketing',
          country: 'Antigua and Barbuda',
          lastName: 'Cooper',
          state: 'Delaware',
          email: 'kellymiller@example.org',
          city: 'Williamview',
          username: 'wjones',
          profilePhoto: 'https://placekitten.com/484/11',
          interests: ['Data Science', 'Web Development'],
          firstName: 'Brent',
          roleId: 'B6uruTU8oncKHaun5Gwg',
        }
      ])
    }

    fetchData()
  }, [])

  return (
    <main>
      <DummyNavBar />
      <div className='flex justify-center'>
        <GoalBuddyCard goalBuddyList={goalBuddyList} />
      </div>
    </main>
  )
}