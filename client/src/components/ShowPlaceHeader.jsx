/* eslint-disable react/prop-types */

import { FaLocationDot } from "react-icons/fa6"

function ShowPlaceHeader({place}) {
  return (
    <div className="mb-4 flex flex-col gap-2">
    <h1 className="text-4xl font-semibold">{place.title}</h1>
    <a
      className=" underline font-semibold  text-gray-700 flex items-center gap-2"
      target="_blank"
      href={`https:maps.google.com/?q=${place.address}`}
    >
      <FaLocationDot />
      {place.address}
    </a>
  </div>
  )
}

export default ShowPlaceHeader