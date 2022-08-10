import classNames from "classnames";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import styles from "./Reader.module.scss";

type Props = {
    setData: React.Dispatch<React.SetStateAction<never[]>>,
    setHeader: React.Dispatch<React.SetStateAction<never[]>>
}

export default function Reader({ setData, setHeader }: Props) {
    const { CSVReader } = useCSVReader();
    const [accepted, setAccepted] = useState(false);

    return (
        <>
            <CSVReader
                onUploadAccepted={(results: any) => {
                    setData(() => (
                        results.data.filter(function (x: Number) {
                            return results.data.indexOf(x) != 0;
                        }
                        )));
                    setHeader(results.data[0]);
                    setAccepted(true);
                }}
            >
                {({
                    getRootProps,
                    acceptedFile,
                    getRemoveFileProps,
                }: any) => (
                    <>
                        <div className={styles.btnsContainer}>
                            <button
                                type='button' {...getRootProps()}
                                className={styles.btnsContainer__upload}
                            >
                                Encontrar arquivo...
                            </button>
                            <div 
                                className={classNames({
                                    [styles.btnsContainer__filename]: true,
                                    [styles.visible]: accepted
                                })}
                            >
                                <h3>{acceptedFile && "Seu arquivo:"}</h3>
                                <p>{acceptedFile && acceptedFile.name}</p>
                            </div>
                            <button 
                                {...getRemoveFileProps()}
                                onClick={() => {
                                    setData([]),
                                    setHeader([]),
                                    setAccepted(false);
                                }}
                                className={styles.btnsContainer__clear}
                            >
                                Limpar
                            </button>
                        </div>
                    </>
                )}
            </CSVReader>
        </>
    );
}