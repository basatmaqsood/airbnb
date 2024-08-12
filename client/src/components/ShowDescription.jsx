/* eslint-disable react/prop-types */

function ShowDescription({place}) {
  return (
    <div>
    <h2 className="text-2xl font-semibold">Description</h2>
    <p>{place.description}</p>
  </div>  )
}

export default ShowDescription