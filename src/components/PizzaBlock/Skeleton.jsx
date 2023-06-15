import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="116" r="116" />
        <rect x="26" y="247" rx="12" ry="12" width="226" height="25" />
        <rect x="27" y="302" rx="12" ry="12" width="228" height="69" />
        <rect x="27" y="390" rx="12" ry="12" width="92" height="34" />
        <rect x="150" y="386" rx="25" ry="25" width="108" height="42" />
    </ContentLoader>
)

export default Skeleton

