import React from "react";
import "./style/ErrorPage.scss";

const ErrorPage = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>Oops!</h1>
                            <h2>404 Page not found</h2>
                            <div className="error-details">
                                The page you requested was not found !
                            </div>
                            <div className="error-actions">
                                <a href="/" className="btn btn-primary btn-lg">
                                    <span className="glyphicon glyphicon-home"></span>
                                    Come back
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
