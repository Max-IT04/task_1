import styles from "./App.module.css";
import React, { useState } from "react";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");

	const onInputButtonClick = () => {
		let promptValue = prompt("Введите значение");

		if (!promptValue) {
			setError("Ввод отменён или пустое значение");
			return;
		}

		if (promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа");
		} else {
			setValue(promptValue);
			setError("");
		}
	};

	const isValueVaild = value.length >= 3;

	const onAddButtonClick = () => {
		if (value.length < 3) return;

		setList((prevList) => [
			...prevList,
			{
				id: Date.now(),
				value: value,
				date: new Date().toLocaleString("ru-RU"),
			},
		]);

		setValue("");
		setError("");
	};

	return (
		<div className="app">
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "
				<output className={styles["current-value"]}>{value}</output>"
			</p>

			<div className="error">{error && <span>{error}</span>}</div>
			<div className={styles["buttons-container"]}>
				<button className="button" onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className="button"
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>

			<div className={styles["list-container"]}>
				<h2 className={styles["list-heading"]}>Список:</h2>

				{list.length === 0 ? (
					<p className={styles["no-margin-text"]}>
						Нет добавленных элементов
					</p>
				) : (
					<ul className="list">
						{list.map((item) => (
							<li key={item.id} className={styles["list-item"]}>
								{item.value}{" "}
								<small>(добавлено: {item.date})</small>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
