interface ColourProps {
  colour: string
}

const RoleBadge: React.FC<ColourProps> = ({ colour }) => {
  return(
    <span className={`h-3 w-3 mr-1 inline-block align-center ${colour}`}></span>
  )
}

export default RoleBadge