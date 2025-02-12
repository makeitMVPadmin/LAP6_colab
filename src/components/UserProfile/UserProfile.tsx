import { useState } from 'react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'

export const UserProfile: React.FC = () => {
  const interests = ['Mentor', 'GoalBuddy', 'NetWorking']
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleChange = (interest: string) => {
    setSelectedInterests((prev: string[]) => {
      if (prev.includes(interest)) return prev.filter((i) => i !== interest)
      else return [...prev, interest]
    })
  }
  return (
    <div>
      <div className="relative mt-4">
        <hr className="bg-gray-600" />
        <Avatar className="w-[65px] h-[65px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <section className="flex justify-between text-[15px]">
          <p>
            <label>LastName :</label>
            <span className="text-[13px]">&nbsp;Dhara</span>
          </p>
          <p>
            <label htmlFor="">FirstName :</label>
            <span className="text-[13px]">&nbsp;Aparna</span>
          </p>
        </section>
        <section className="text-[15px]">
          <label htmlFor="">Address :</label>
          <span className="text-[13px]">
            &nbsp;&nbsp;62th Street,Perkins Ave
          </span>

          <section className="flex md:gap-3">
            <p>
              City : <span className="text-[13px]">Chenchester</span>
            </p>
            <p>
              State : <span className="text-[13px]"> Illinois </span>
            </p>
            <p>
              Country : <span className="text-[13px]">USA</span>
            </p>
          </section>
        </section>

        <section className="text-[15px]">
          <p>
            <label htmlFor="">Discipline : </label>
            <span className="text-[13px]">Design</span>
          </p>
          <p>
            <label htmlFor="">Email : </label>
            <span className="text-[13px]"> aparna@example.com</span>
          </p>
          <p>
            <label htmlFor="">Skills : </label>
            <span className="text-[13px]">AI &nbsp;WebDev</span>
          </p>
        </section>
      </div>
      <div className="mt-6">
        <h2 className='text-lg  font-semibold'>Area of Interest </h2>
        <section className='mt-2'>
          {interests.map((interest, _index) => {
            return (
              <div key={_index} className="flex gap-20">
                <span className='w-[150px] text-[15px]'>{interest}</span>
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(interest)}
                  onChange={() => handleChange(interest)}
                />
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
