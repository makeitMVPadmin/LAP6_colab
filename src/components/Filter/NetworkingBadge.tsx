interface SizeProps {
  width: string
  stroke: string
  yOffset?: number
  height?: string
}

const NetworkingBadge: React.FC<SizeProps> = ({ width, stroke, yOffset = 26, height }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox={`0 1 26 ${yOffset}`} fill="none" className={`inline ${width} ${height} -mt-1`}>
      <path d="M16.25 2.16406H9.75V8.66406H16.25V2.16406Z" stroke="#4CAF50" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.832 17.3359H17.332V23.8359H23.832V17.3359Z" stroke="#4CAF50" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.66797 17.3359H2.16797V23.8359H8.66797V17.3359Z" stroke="#4CAF50" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.41797 17.3333V13H20.5846V17.3333" stroke="#4CAF50" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 12.9974V8.66406" stroke="#4CAF50" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default NetworkingBadge