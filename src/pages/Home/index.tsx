import { useContext } from "react";
import Reader from "./Reader";
import styles from "./Home.module.scss";
import { FileDataContext } from "common/context/FileData";
import { Outlet } from "react-router-dom";
import NavButton from "./NavButton";

export default function Home() {
	const { fileData, setFileData } = useContext(FileDataContext);
	const { setHeader } = useContext(FileDataContext);

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
					<NavButton pathname="/home/all">
						Todos
					</NavButton>
					<NavButton pathname="/home/duration">
						Tempo de Reunião
					</NavButton>
					<NavButton pathname="/home/attention">
						Pontos de Atenção
					</NavButton>
				</div>
				{fileData.length == 0 
					? 
						<div className={styles.noFile}>
							<h1>Envie um arquivo ao lado para começar!</h1>
						</div>
					: <Outlet />
				}
			</section>
		</>
	);
}