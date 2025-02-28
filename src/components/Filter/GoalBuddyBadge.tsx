interface SizeProps {
  width: string
  stroke: string
  yOffset?: number
  height?: string
}

const GoalBuddyBadge: React.FC<SizeProps> = ({ width, height, yOffset = 23 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox={`0 0 23 ${yOffset}`} fill="none" className={`inline ${width} ${height} -mt-1`}>
      <g clipPath="url(#clip0_3097_13590)">
      <path d="M21.0845 10.5402V11.4986C21.0748 13.4328 20.4801 15.3188 19.3784 16.9087C18.2768 18.4985 16.7198 19.7179 14.9122 20.4063C13.1047 21.0947 11.1311 21.2201 9.25089 20.7659C7.37073 20.3117 5.67202 19.2992 4.37807 17.8614C3.08413 16.4237 2.25552 14.6281 2.00119 12.7107C1.74685 10.7932 2.07869 8.84366 2.95307 7.11833C3.82746 5.393 5.20347 3.97264 6.9002 3.04398C8.59693 2.11532 10.535 1.72182 12.4595 1.91522" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.66797 13.4141C7.66797 13.4141 9.10547 15.3307 11.5013 15.3307C13.8971 15.3307 15.3346 13.4141 15.3346 13.4141" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.625 8.625H8.63458" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.375 8.625H14.3846" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.332 4.78906H21.082" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.207 1.91406V7.66406" stroke="#FFA629" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_3097_13590">
      <rect width="23" height="23" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}

export default GoalBuddyBadge