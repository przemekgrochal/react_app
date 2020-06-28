import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";
import UsersList from "./UsersList";
import Loader from "react-loader-spinner";

interface IUsers {
    _meta: {};
    result: [];
}

const Users = () => {
    const [data, setData] = useState<IUsers>();
    const urlApi: string =
        "https://gorest.co.in/public-api/users?access-token=HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak";

    useEffect(() => {
        new FetchData().fetch(urlApi, "GET", null).then((res) => {
            setData(res);
        });
    }, []);

    return (
        <>
            <section>
                <div className="container">
                    <h1 className="plans-heading">Users</h1>
                    <div className="price-table-wrapper"></div>
                </div>
            </section>
            {data?.result ? (
                <UsersList users={data} />
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "40px",
                    }}
                >
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            )}
        </>
    );
};

export default Users;
