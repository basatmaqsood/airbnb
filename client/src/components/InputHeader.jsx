/* eslint-disable react/prop-types */

function InputHeader({heading,description}) {
  return (
    <>
    <h2 className="text-2xl mt-4">{heading}</h2>
        <p className="text-gray-500 text-sm">
            {description}
        </p>
    </>
  )
}

export default InputHeader