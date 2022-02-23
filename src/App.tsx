import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Button from './components/Button'
import Store from './store'
import formatOperand from './utils/formatOperand'

const App: FC<{ store: Store }> = observer(({ store }) => {
	return (
		<div className='grid grid-cols-[repeat(4,_6rem)] grid-rows-[minmax(7rem,_auto)_repeat(5,_6rem)]'>
			<div className='col-span-4 bg-black opacity-75 flex flex-col items-end justify-around p-3 break-all'>
				<div className='text-white opacity-75 text-2xl'>
					{store.previousOperand &&
						formatOperand(store.previousOperand)}{' '}
					{store.operation}
				</div>
				<div className='text-white text-4xl'>
					{store.currentOperand &&
						formatOperand(store.currentOperand)}
				</div>
			</div>

			<Button className='span-two' onClick={() => store.clear()}>
				AC
			</Button>
			<Button onClick={() => store.deleteDigit()}>DEL</Button>
			<Button onClick={() => store.countPercent()}>%</Button>
			<Button onClick={() => store.chooseOperation('÷')}>÷</Button>
			<Button onClick={() => store.addDigit('7')}>7</Button>
			<Button onClick={() => store.addDigit('8')}>8</Button>
			<Button onClick={() => store.addDigit('9')}>9</Button>
			<Button onClick={() => store.chooseOperation('*')}>*</Button>
			<Button onClick={() => store.addDigit('4')}>4</Button>
			<Button onClick={() => store.addDigit('5')}>5</Button>
			<Button onClick={() => store.addDigit('6')}>6</Button>
			<Button onClick={() => store.chooseOperation('+')}>+</Button>
			<Button onClick={() => store.addDigit('1')}>1</Button>
			<Button onClick={() => store.addDigit('2')}>2</Button>
			<Button onClick={() => store.addDigit('3')}>3</Button>
			<Button onClick={() => store.chooseOperation('-')}>-</Button>
			<Button onClick={() => store.addDigit('.')}>.</Button>
			<Button onClick={() => store.addDigit('0')}>0</Button>
			<Button className='col-span-2' onClick={() => store.evaluate()}>
				=
			</Button>
		</div>
	)
})

export default App
