import React from "react"
import Svg, { Path } from "react-native-svg"

interface ISvg {

    color?: string;
    size?: number;
}

export const CloseIcon = () => {

    return(
        <Svg
            fill="none"
            height={35}
            width={35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M6 18L18 6M6 6l12 12"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}

export const LogOutIcon = (props:ISvg) => {

    return(
        <Svg
            fill="none"
            height={35}
            width={35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            stroke={props.color || "#000"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}

export const PlusIcon = (props:ISvg) => {

    return(
        <Svg
            fill="none"
            height={35}
            width={35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            stroke={props.color || "#000"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}

export const TrashIcon = (props:ISvg) => {

    return(
        <Svg
            fill="none"
            height={props.size || 35}
            width={props.size || 35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            stroke={props.color || "#000"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}

