import { useState } from 'react';
import styles from './App.module.css';

const BUTTONS = [
	'7', '8', '9', '+',
	'4', '5', '6', '-',
	'1', '2', '3', '=',
	'0', 'C'
];

function App() {

	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState(null);
	const [isResultDisplayed, setIsResultDisplayed] = useState(false);

	const handleNumberClick = (num) => {
		if (isResultDisplayed) {
			setOperand1(num);
			setOperand2('');
			setOperator('');
			setResult(null);
			setIsResultDisplayed(false);
		} else if (!operator) {
			setOperand1(prev => prev + num);
		} else {
			setOperand2(prev => prev + num);
		}
	};

	const handleOperatorClick = (op) => {
		if (operand1 && !operand2) {
			setOperator(op);
			setIsResultDisplayed(false);
		}
	};

	const handleEquals = () => {
		if (operand1 && operator && operand2) {
			const num1 = parseInt(operand1);
			const num2 = parseInt(operand2);
			let calcResult;

			if (operator === '+') {
				calcResult = num1 + num2;
			} else if (operator === '-') {
				calcResult = num1 - num2;
			}

			setResult(calcResult);
			setIsResultDisplayed(true);
		}
	};

	const handleClear = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setResult(null);
		setIsResultDisplayed(false);
	};

	const handleButtonClick = (value) => {
		if (value === 'C') {
			handleClear();
		} else if (value === '=') {
			handleEquals();
		} else if (value === '+' || value === '-') {
			handleOperatorClick(value);
		} else {
			handleNumberClick(value);
		}
	}

	const displayValue = isResultDisplayed
		? result
		: `${operand1}${operator}${operand2}`;

	return (
		<div className={styles.calculator}>
			<div className={`${styles.display} ${isResultDisplayed ? styles.result : ''}`}>
				{displayValue || '0'}
			</div>

			<div className={styles.buttons}>
				<div className={styles.row}>
					{BUTTONS.slice(0, 4).map((button) => (
					<button
						key={button}
						className={styles.button}
						onClick={() => handleButtonClick(button)}
					>
						{button}
					</button>
					))}
				</div>

				<div className={styles.row}>
					{BUTTONS.slice(4, 8).map((button) => (
					<button
						key={button}
						className={styles.button}
						onClick={() => handleButtonClick(button)}
					>
						{button}
					</button>
					))}
				</div>

				<div className={styles.row}>
					{BUTTONS.slice(8, 12).map((button) => (
					<button
						key={button}
						className={styles.button}
						onClick={() => handleButtonClick(button)}
					>
						{button}
					</button>
					))}
				</div>

				<div className={styles.row}>
					{BUTTONS.slice(12, 14).map((button) => (
					<button
						key={button}
						className={styles.button}
						onClick={() => handleButtonClick(button)}
					>
						{button}
					</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
