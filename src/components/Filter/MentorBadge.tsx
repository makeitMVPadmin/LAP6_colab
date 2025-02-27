interface SizeProps {
  width: string
  stroke: string
  yOffset: number
  height?: string
}

const  MentorBadge: React.FC<SizeProps> = ({ width, stroke, yOffset = 30, height }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox={`0 3 30 ${yOffset}`} fill="none" className={`inline ${width} ${height}`}>
      <path d="M27.5 12.5V20M27.5 12.5L15 6.25L2.5 12.5L15 18.75L27.5 12.5Z" stroke="#0264D4" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 15V21.25C11.25 25 18.75 25 22.5 21.25V15" stroke="#0264D4" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default MentorBadge;