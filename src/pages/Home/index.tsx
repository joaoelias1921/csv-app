import { Key, useState } from "react";
import { useCSVReader } from "react-papaparse";
import styles from "./Home.module.scss";

export default function Home() {
	const { CSVReader } = useCSVReader();
	const [data, setData] = useState([]);
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
			<CSVReader
				onUploadAccepted={(results: any) => {
					setData(() => (
						results.data.filter(function(x: Number) { 
							return results.data.indexOf(x) != 0;
						}
					)));
					setHeader(results.data[0]);
				}}
			>
				{({
					getRootProps,
					acceptedFile,
					getRemoveFileProps,
				}: any) => (
					<>
						<div>
							<button type='button' {...getRootProps()}>
								Browse file
							</button>
							<div>
								{acceptedFile && acceptedFile.name}
							</div>
							<button {...getRemoveFileProps()}>
								Remove
							</button>
						</div>
					</>
				)}
			</CSVReader>
			<table>
				<thead>
					<tr>
						{header.map((item: Array<string>, index: Key) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item: Array<string>, index: Key) => (
						showItems(item, index)
					))}
				</tbody>
			</table>
		</>
	);
}