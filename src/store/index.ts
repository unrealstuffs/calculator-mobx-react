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
		if (digit === '.' && this.currentOperand!.includes('.')) {
			return
		}
		this.currentOperand = `${this.currentOperand || ''}${digit}`
	}

	chooseOperation(operation: string) {
		if (this.currentOperand == null && this.previousOperand == null) {
			return
		}

		if (this.currentOperand == null) {
			this.operation = operation
			return
		}

		if (this.previousOperand == null) {
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
		if (this.currentOperand == null && this.previousOperand == null) {
			return
		}

		if (this.previousOperand === null) {
			this.currentOperand = `${
				// @ts-ignore: Object is possibly 'null'.
				parseFloat(this.currentOperand) / 100 || ''
			}`
			return
		}

		this.currentOperand = `${
			(parseFloat(this.previousOperand) / 100) *
				// @ts-ignore: Object is possibly 'null'.
				parseFloat(this.currentOperand) || ''
		}`

		this.overwrite = true
	}

	clear() {
		this.currentOperand = null
		this.previousOperand = null
	}

	deleteDigit() {
		if (this.overwrite) {
			this.overwrite = false
			this.currentOperand = null
		}
		if (this.currentOperand == null) return
		if (this.currentOperand.length === 1) {
			this.currentOperand = null
		}
		// @ts-ignore: Object is possibly 'null'.
		this.currentOperand = this.currentOperand.slice(0, -1)
	}

	evaluate() {
		if (
			this.operation == null ||
			this.currentOperand == null ||
			this.previousOperand == null
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

		return computation.toString()
	}
}

export default Store
