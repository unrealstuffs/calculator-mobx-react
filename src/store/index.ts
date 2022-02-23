import { makeAutoObservable } from 'mobx'

interface IEvaluate {
	currentOperand: string
	previousOperand: string
	operation: string
}

class Store {
	currentOperand: string | null = null
	previousOperand: string | null = null
	overwrite = false
	operation: string | null = null
	digit = ''

	constructor() {
		makeAutoObservable(this)
	}

	addDigit(digit: string) {
		if (this.overwrite) {
			this.currentOperand = digit
			this.overwrite = false
			return
		}
		if (digit === '0' && this.currentOperand === '0') {
			return
		}
		if (
			digit === '.' &&
			this.currentOperand &&
			this.currentOperand.includes('.')
		) {
			return
		}

		this.currentOperand = `${this.currentOperand || ''}${digit}`

		if (this.currentOperand.length > 15) {
			this.currentOperand = this.currentOperand.slice(0, -1)
		}
	}

	chooseOperation(operation: string) {
		if (this.currentOperand === null && this.previousOperand === null) {
			return
		}

		if (this.currentOperand === null) {
			this.operation = operation
			return
		}

		if (this.previousOperand === null) {
			this.operation = operation
			this.previousOperand = this.currentOperand
			this.currentOperand = null
			return
		}

		this.previousOperand = this._evaluate({
			currentOperand: this.currentOperand,
			previousOperand: this.previousOperand,
			operation,
		})
		this.operation = operation
		this.currentOperand = null
	}

	countPercent() {
		if (this.currentOperand === null && this.previousOperand === null) {
			return
		}

		if (this.previousOperand === null) {
			this.overwrite = true
			this.currentOperand = `${
				this.currentOperand ? parseFloat(this.currentOperand) / 100 : ''
			}`
			return
		}

		if (this.currentOperand && this.previousOperand) {
			this.currentOperand = `${
				(parseFloat(this.previousOperand) / 100) *
					parseFloat(this.currentOperand) || ''
			}`

			this.overwrite = true
		}
	}

	clear() {
		this.currentOperand = null
		this.previousOperand = null
		this.operation = null
	}

	deleteDigit() {
		if (this.currentOperand === null && this.previousOperand === null) {
			return
		}

		if (this.overwrite) {
			this.overwrite = false
			this.currentOperand = null
			this.previousOperand = null
			return
		}

		if (this.currentOperand === null && this.previousOperand) {
			this.currentOperand = this.previousOperand
			this.operation = null
			this.previousOperand = null
			return
		}

		if (this.currentOperand && this.currentOperand.length === 1) {
			this.currentOperand = null
			return
		}

		if (this.currentOperand) {
			this.currentOperand = this.currentOperand.slice(0, -1)
			return
		}
	}

	evaluate() {
		if (
			this.operation === null ||
			this.currentOperand === null ||
			this.previousOperand === null
		) {
			return
		}

		this.overwrite = true
		this.currentOperand = this._evaluate({
			currentOperand: this.currentOperand,
			previousOperand: this.previousOperand,
			operation: this.operation,
		})
		this.previousOperand = null
		this.operation = null
	}

	private _evaluate({
		currentOperand,
		previousOperand,
		operation,
	}: IEvaluate) {
		const prev = parseFloat(previousOperand)
		const current = parseFloat(currentOperand)

		if (isNaN(prev) || isNaN(current)) return ''

		let computation: number = 0

		switch (operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				break
		}

		return parseFloat(computation.toFixed(8).toString()).toString()
	}
}

export default Store
