import classNames from "classnames";
import { FileDataContext } from "common/context/FileData";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavButton.module.scss";

type Props = {
    children: string,
    pathname: string
}

export default function NavButton({children, pathname}: Props) {
    const { fileData } = useContext(FileDataContext);
    const navigate = useNavigate();

    return(
        <button
            disabled={fileData.length == 0}
            className={classNames({
                [styles.navButton]: true,
                [styles.disabled]: fileData.length == 0,
                [styles.selected]: location.pathname == pathname
            })}
            onClick={() => navigate(pathname)}
        >
            {children}
        </button>
    );
}