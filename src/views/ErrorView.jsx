import { Link } from "react-router";
import "./ErrorView.css";

function ErrorView() {
    return (
        <div className="error-container">
            <nav className="logo-nav">
                <Link to="/"><img src="../src/imgs/logo.png" /></Link>
            </nav>
            <h1 className="error-title">This page does not exist</h1>
        </div>
    )
}

export default ErrorView;