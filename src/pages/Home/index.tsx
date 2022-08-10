import { Key, useContext, useState } from "react";
import Reader from "./Reader";
import styles from "./Home.module.scss";
import { FileDataContext } from "common/context/FileData";

export default function Home() {
	const { fileData, setFileData } = useContext(FileDataContext);
	const [header, setHeader] = useState([]);

	function showItems(item: Array<string>, index: Key) {
		return (
			<tr key={index}>
				{item.map((info, index) => (
					<td key={index}>{info}</td>
				))}
			</tr>
		)
	}

	return (
		<>
			<section className={styles.readerContainer}>
				<h3 className={styles.readerContainer__title}>Envie seu arquivo aqui:</h3>
				<Reader
					setData={setFileData} 
					setHeader={setHeader} 
				/>
			</section>
			<section className={styles.dataContainer}>
				<div className={styles.dataHeader}>
					<button>Todos</button>
					<button></button>
				</div>
				<table>
					<thead>
						<tr>
							{header.map((item: Array<string>, index: Key) => (
								<th key={index}>{item}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{fileData.map((item: Array<string>, index: Key) => (
							showItems(item, index)
						))}
					</tbody>
				</table>
			</section>
		</>
	);
}