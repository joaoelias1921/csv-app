import { FileDataContext } from "common/context/FileData";
import { Key, useContext, useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import styles from "./Duration.module.scss";

type iUserInfo = {
    name: string,
    time: string
}

export default function Duration() {
    const { fileData, header } = useContext(FileDataContext);
    const [totalTime, setTotalTime] = useState("");
    const [filteredData, setFilteredData] = useState<any>([{}]);
    
    useEffect(() => {
        showFilteredItems();
        setTotalTime(getTotalTimeInSeconds());
    }, [totalTime]);

	function showFilteredItems() {
        let allNamesAndTimes: [{}] = [{}];

        fileData.map((item: Array<string>) => {
            if(item[3] == undefined) return;
            allNamesAndTimes.push({"name": item[0], "time": item[3]});
        });

        const uniqueArray = allNamesAndTimes.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === allNamesAndTimes.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
        });

        setFilteredData(uniqueArray);
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

    function checkTime(time: string) {
        if(time == undefined) return;
        if(time.includes("h")) {
            return <AiOutlineCheck color="lightgreen" />
        }else if(time.includes("m")){
            const splitTime = Number(time.split("m")[0]);
            if(splitTime > 15) {
                return <AiOutlineCheck color="lightgreen" />
            }else if(splitTime < 15 && splitTime >= 10) {
                return <CgDanger color="orange" />
            } else if(splitTime < 10){
                return <CgDanger color="red" />
            }
        }else {
            return <CgDanger color="red" />
        }
    }

    return(
        <>
            <section className={styles.legendContainer}>
                <h3>Legenda</h3>
                <div className={styles.legendContainer__item}>
                    <AiOutlineCheck
                        className={styles.icon}
                        color="lightgreen" 
                    />
                    <p>Tempo de reunião maior que 15 minutos</p>
                </div>
                <div className={styles.legendContainer__item}>
                    <CgDanger
                        className={styles.icon}
                        color="orange" 
                    />
                    <p>Tempo de reunião entre 10 e 15 minutos</p>
                </div>
                <div className={styles.legendContainer__item}>
                    <CgDanger
                        className={styles.icon}
                        color="red" 
                    />
                    <p>Tempo de reunião menor que 10 minutos</p>
                </div>
            </section>
            <table className={styles.duration}>
                <thead>
                    <tr>
                        <th>{header[0]}</th>
                        <th>Tempo em Reunião (Total)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((user: iUserInfo, index: Key) => {
                            return(
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.time}</td>
                                    <td>{checkTime(user.time)}</td>
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
        </>
    );
}