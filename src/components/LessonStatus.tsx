import { h } from 'preact'

type LessonStatusProps = {
  itemStatuses: (boolean | null)[]
}

export const LessonStatus = ({ itemStatuses }: LessonStatusProps) => (
  <div className="flex items-center ml-auto justify-center">
    {itemStatuses.map(status => (
      <div className={`${getColor(status)} ml-1 w-2 h-2 rounded-full`} />
    ))}
  </div>
)

const getColor = (status: boolean | null): string =>
  (status === true && 'bg-green') || (status === false && 'bg-red-light') || 'bg-grey'
