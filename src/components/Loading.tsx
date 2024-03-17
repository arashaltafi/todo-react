import BounceLoader from 'react-spinners/BounceLoader'
import PropagateLoader from 'react-spinners/PropagateLoader'
import BeatLoader from 'react-spinners/BeatLoader'

interface LoadingProps {
  position: 'top' | 'bottom' | 'center'
}

const Loading = (props: LoadingProps) => {
  return (
    <div
      className={`
      ${props.position == 'top' && 'w-full h-screen flex items-start justify-center'}
      ${props.position == 'center' && 'w-full h-screen flex items-center justify-center'}
      ${props.position == 'bottom' && 'w-full h-[calc(100vh-150px)] flex items-end justify-center'}
    `}
    >
      {props.position == 'top' && <BeatLoader color="#FFEB3B" />}
      {props.position == 'center' && <BounceLoader color="#FFEB3B" />}
      {props.position == 'bottom' && <PropagateLoader color="#FFEB3B" />}
    </div>
  )
}

export default Loading