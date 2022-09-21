import React from 'react';
import { slice, length } from 'ramda'

interface IProps {
	content: string,
	className?: string,
	min?: number,
	readmoreBtn?: boolean,
}

interface IState {
	isOpen: boolean
}

class ReadmoreText extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { isOpen } = this.state
		this.setState({ isOpen: !isOpen });
	}

	render() {
		const { isOpen } = this.state,
			{ min, className, readmoreBtn } = this.props;
		let content = this.props.content ? this.props.content : ""
		const minLength = min || 150,
			hasReadmore = length(content) > minLength,
			shortContent = slice(0, minLength, content)

		return (
			<>
				{!isOpen && shortContent}
				{hasReadmore && !isOpen && <span id="dots">...</span>}
				{isOpen && <span id="more" className="display-linebreak" dangerouslySetInnerHTML={{ __html: content }} />}
				{readmoreBtn && hasReadmore && <button type="button" className="btn btn-link p-0" onClick={this.handleChange} id="myBtn">{isOpen ? 'Read less' : 'Read more'}</button>}
			</>
		);
	}
}

export { ReadmoreText };