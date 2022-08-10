import { FileDataProvider } from "common/context/FileData";
import Home from "pages/Home";
import StandardPage from "pages/StandardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
	return (
		<main className="container">
			<Router>
				<FileDataProvider>				
					<Routes>
						<Route path="/" element={<StandardPage />}>
							<Route path="/home" element={<Home />} />
						</Route>
					</Routes>
				</FileDataProvider>
			</Router>
		</main>
	);
}