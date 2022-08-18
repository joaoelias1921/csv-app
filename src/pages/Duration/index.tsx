import { FileDataContext } from "common/context/FileData";
import { Key, useContext, useEffect, useState } from "react";
import styles from "./Duration.module.scss";

export default function Duration() {
    const { fileData, header } = useContext(FileDataContext);
    const [totalTime, setTotalTime] = useState("");
    const [filteredData, setFilteredData] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
    
    useEffect(() => {
        showFilteredItems();
        setTotalTime(getTotalTimeInSeconds());
    }, [totalTime]);

	function showFilteredItems() {
        let allNames: string[] = [];
        let allTimes: string[] = [];

        fileData.map((item: Array<string>) => {
            if(item[3] == undefined) return;
            allNames.push(item[0], item[3]);
        });

        if (allNames.length !== new Set(allNames).size) {
            const filteredNames = new Set(allNames);
            setFilteredData(Array.from(filteredNames));

            allNames = [];

            filteredData.forEach((item: string, index: Key) => {
                Number(index) % 2 == 0 
                    ? allNames.push(item)
                    : allTimes.push(item);
            });

            setFilteredNames(allNames);
            setFilteredTimes(allTimes);
        }

        return false;
    }

    function getTotalTimeInSeconds() {
        let minutesAndSeconds: string[] = [];
        let hoursMinsAndSeconds: string[] = [];

        fileData.map((item: Array<string>) => {
            if(item[3] == undefined) return;
            !item[3].includes("h") 
                ? minutesAndSeconds.push(item[3])
                : hoursMinsAndSeconds.push(item[3]);
        });

        // xxh xxm xxs format expected
        let hoursInSeconds = 0;
        let minutesInSeconds = 0;
        let seconds = 0;

        hoursMinsAndSeconds.forEach((time: string) => {
            hoursInSeconds += Number(time.split("h")[0])*3600;
            minutesInSeconds += Number(time.split("m")[0].split(" ")[1])*60;
            seconds += Number(time.split("m")[1].split("s")[0]);
        });
        
        minutesAndSeconds.forEach((time: string) => {
            if(time.includes("m")) {
                minutesInSeconds += Number(time.split(" ")[0].split("m")[0])*60;
                seconds += Number(time.split(" ")[1].split("s")[0]);
            } else {
                seconds += Number(time.split("s")[0]);
            }            
        });

        return convertHMS(hoursInSeconds + minutesInSeconds + seconds);
    }

    function convertHMS(value: number) {
        const sec = value; // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds

        // add 0 if value < 10; Example: 2 => 02
        if(hours < 10) hours = Number(`0${hours}`);
        if(minutes < 10) minutes = Number(`0${minutes}`);
        if(seconds < 10) seconds = Number(`0${seconds}`);

        return `${hours}h ${minutes}m ${seconds}s`; // Return is HH : MM : SS
    }

    return(
        <table className={styles.duration}>
            <thead>
                <tr>
                    <th>{header[0]}</th>
                    <th>Tempo em Reunião (Total)</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredNames.map((item: string, index: Key) => {
                        return(
                            <tr key={index}>
                                <td>{item}</td>
                                <td>{filteredTimes[Number(index)]}</td>
                            </tr>
                        )                        
                    })
                }
                <tr>
                    <td><strong>Total:</strong></td>
                    <td>{totalTime}</td>
                </tr>
            </tbody>
        </table>
    );
}