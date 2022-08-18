import { FileDataProvider } from "common/context/FileData";
import Duration from "pages/Duration";
import Home from "pages/Home";
import StandardPage from "pages/StandardPage";
import ViewAll from "pages/ViewAll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
	return (
		<main className="container">
			<Router>
				<FileDataProvider>				
					<Routes>
						<Route path="/" element={<StandardPage />}>
							<Route path="/home" element={<Home />}>
								<Route path="/home/all" element={<ViewAll />}/>
								<Route path="/home/duration" element={<Duration />}/>
							</Route>
						</Route>
					</Routes>
				</FileDataProvider>
			</Router>
		</main>
	);
}