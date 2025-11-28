import { useState } from 'react';
import styles from './App.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const handleNext = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else {
			setActiveIndex(0);
		}
	};

	const handlePrev = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const handleStepClick = (index) => {
		setActiveIndex(index);
	}

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							const isActive = index === activeIndex;
							const isDone = index <= activeIndex;

							const itemClass = `${styles['steps-item']} ${
								isActive ? styles.active : ''
							} ${isDone ? styles.done : ''}`;

							return (
								<li key={index} className={itemClass}>
									<button
										className={styles['steps-item-button']}
										onClick={() => handleStepClick(index)} 
									>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handlePrev}
							disabled={isFirstStep}
						>
								Назад
						</button>
						<button
							className={styles.button}
							onClick={handleNext}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
