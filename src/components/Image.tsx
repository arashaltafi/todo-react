import React from 'react'
import placeholder from '/assets/placeholder.png'

interface ImageProp {
    url: string,
    placeholder?: string
    alt?: string,
    className?: string,
    style?: {
        [key: string]: string
    },
    width?: string,
    height?: string,
    onClick?: () => void
}

const Image = (props: ImageProp) => {

    const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (props.placeholder) {
            e.currentTarget.src = props.placeholder
        } else {
            e.currentTarget.src = placeholder
        }
        e.currentTarget.onerror = null
    }

    return (
        <img
            src={props.url}
            alt={props.alt}
            onError={(e) => handleOnError(e)}
            width={props?.width}
            height={props?.height}
            className={props?.className}
            style={props?.style}
            onClick={props?.onClick}
        />
    )
}

export default Image