import { useState } from 'react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'

export const UserProfile: React.FC = () => {
  const interests = ['Mentor', 'GoalBuddy', 'NetWorking']
  const initialBio = `Hi, I'm Aparna.`
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [bio, setBio] = useState<string>(initialBio)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Edit')

  const handleChange = (interest: string) => {
    setSelectedInterests((prev: string[]) => {
      if (prev.includes(interest)) return prev.filter((i) => i !== interest)
      else return [...prev, interest]
    })
  }
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }
  const handleBioClick = () => {
    if (isEditing === false) {
      setIsEditing(true)
      setButtonText('Save Changes')
    } else {
      setIsEditing(false)
      setButtonText('Saved')
    }
  }
  const handleSubmit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (buttonText === 'Saved') {
      alert('Bio has been saved successfully.')
    }
  }
  return (
    <div className="h-full">
      <div className="relative mt-4">
        <hr className="bg-gray-600" />
        <Avatar className="w-[65px] h-[65px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <section className="flex gap-20 text-[15px]">
          <p>
            <label>Lastname :</label>
            <span className="text-[13px]">&nbsp;Dhara</span>
          </p>
          <p>
            <label htmlFor="">Firstname :</label>
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
          <p className="flex">
            <label className=' w-[30%]'>Discipline : </label>
            <span className="text-[13px]">Design</span>
          </p>
          <p className="flex">
            <label className='w-[30%]'>Email : </label>
            <span className="text-[13px]"> aparna@example.com</span>
          </p>
          <p className="flex">
            <label className='w-[30%]'>Skills : </label>
            <span className="text-[13px]">AI &nbsp;WebDev</span>
          </p>
        </section>
      </div>
      <div className="mt-6">
        <h2 className="text-lg  font-semibold">Area of Interest </h2>
        <section className="mt-2">
          {interests.map((interest, _index) => {
            return (
              <div key={_index} className="flex gap-20">
                <span className="w-[150px] text-[15px]">{interest}</span>
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
      <div className="h-[38%] w-[90%] mt-5">
        <section className=" border border-gray-600 p-4 shadow-md rounded h-[100%]">
          <h2 className='mb-2 font-semibold'>My Bio</h2>
          <form onSubmit={handleSubmit} className="flex flex-col h-[90%] gap-2">
            <textarea
              value={bio}
              onChange={(e) => handleBioChange(e)}
              className="w-full h-full p-2 text-sm border border-gray-300 shadow-lg"
            />
            <article className='flex justify-end'>
            <button
              className="border bg-blue-600 w-[20%] p-1 rounded text-sm text-white"
              type="button"
              onClick={handleBioClick}
            >
              {buttonText}
            </button>
            </article>
            
          </form>
        </section>
      </div>
    </div>
  )
}
