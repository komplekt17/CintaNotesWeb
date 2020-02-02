import * as React from "react"
import Slider from "react-slick"
import "../styles/slick.sass"
import "../styles/slick-theme.sass"
// import "slick-carousel/slick/slick.scss"
// import "slick-carousel/slick/slick-theme.scss"

interface ISectionSliderProps {
	infinite: boolean;
	slidesToShow: number;
	slidesToScroll: number;
	listSections: any;
}

export const SectionSlider: React.FC<ISectionSliderProps> = props => {
	const { infinite, slidesToShow, slidesToScroll, listSections } = props

	const settings = {
		// className: "slider variable-width",
		dots: false,
		speed: 1000,
		infinite,
		slidesToShow,
		slidesToScroll,
		variableWidth: true,
	}
	return <Slider {...settings}>{listSections}</Slider>
}
