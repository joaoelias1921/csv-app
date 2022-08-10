import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./StandardPage.module.scss";
import { useEffect } from "react";

export default function StandardPage() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		location.pathname == "/" && navigate("/home");
	});

	return (
		<section className={styles.mainContainer}>
			<Outlet />
		</section>
	);
}