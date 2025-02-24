interface ColourProps {
  colour: string
}

const RoleBadge: React.FC<ColourProps> = ({ colour }) => {
  return (
    <span className={`h-3 w-3 mr-1 p-0 inline-block align-center text-xs text-center ${colour}`} />
  )
}

export default RoleBadge
