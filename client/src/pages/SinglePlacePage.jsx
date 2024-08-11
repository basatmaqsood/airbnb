import { useParams } from "react-router-dom"

function SinglePlacePage() {
    const { id } = useParams()
  return (
    <div>SinglePlacePage{id}</div>
  )
}

export default SinglePlacePage