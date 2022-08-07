import React from "react"
import Svg, { Path } from "react-native-svg"

export const LeftArrow = () => {
    return(
        <Svg
            fill="none"
            height={35}
            width={35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}

export const RightArrow = () => {
    return(
        <Svg
            fill="none"
            height={35}
            width={35}
            viewBox="0 0 24 24"
        >

            <Path
            d="M17 8l4 4m0 0l-4 4m4-4H3"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}