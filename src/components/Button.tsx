import React, { FC } from 'react'

interface IButton {
	children: React.ReactNode
	className?: string
	onClick: () => any
}

const Button: FC<IButton> = ({ children, className, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`text-3xl text-gray-600 border-2 border-white outline-none bg-white hover:bg-opacity-80 focus:bg-opacity-80 bg-opacity-75 ${className}`}
		>
			{children}
		</button>
	)
}

export default Button
