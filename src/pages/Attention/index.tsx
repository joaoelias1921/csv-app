import { FileDataContext } from "common/context/FileData";
import { Key, useContext } from "react";
import styles from "./Attention.module.scss";

export default function Attention() {
    const { fileData } = useContext(FileDataContext);
    const { header } = useContext(FileDataContext);

	function showItems(item: Array<string>, index: Key) {
		return (
			<tr key={index}>
				{item.map((info, index) => (
					<td key={index}>{info}</td>
				))}
			</tr>
		)
	}

    return(
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
    );
}