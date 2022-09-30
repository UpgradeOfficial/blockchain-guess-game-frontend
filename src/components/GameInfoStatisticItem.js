import React from 'react'

const GameInfoStatisticItem = ({data, text}) => {
  return (
    <div className="flex flex-col justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {data}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                {text}
              </dd>
    </div>
  )
}

export default GameInfoStatisticItem