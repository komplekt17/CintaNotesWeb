import * as React from "react"

interface IGetBootsrapStyleProps {
	theme: string;
}

export const GetBootsrapStyle: React.FC<IGetBootsrapStyleProps> = props => {
	// console.log(props.theme)
	return (
		<>
			{props.theme === "night" ? (
				<link
					rel="stylesheet"
					type="text/css"
					href="./styles/bootstrap-superhero.min.css"
				/>
			) : (
				<link
					rel="stylesheet"
					type="text/css"
					href="./styles/bootstrap-spacelab.min.css"
				/>
			)}
		</>
	)
}
