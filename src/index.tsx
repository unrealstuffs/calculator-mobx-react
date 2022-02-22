import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Store from './store'

const store = new Store()

ReactDOM.render(
	<React.StrictMode>
		<App store={store} />
	</React.StrictMode>,
	document.getElementById('root')
)
