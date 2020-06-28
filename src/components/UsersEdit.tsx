import React, {
    useState,
    useEffect,
    SyntheticEvent,
    ReactEventHandler,
} from "react";
import { FetchData } from "../utilities/FetchData";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import UsersPosts from "./UsersPosts";

interface IUsersEdit {
    result: {
        id: number;
        first_name: string;
        last_name: string;
        gender: string;
        dob: string | number;
        email: string;
        phone: string | number;
        website: string;
        address: string;
        status: string;
        _links: {
            self: {
                href: string;
            };
            edit: {
                href: string;
            };
            avatar: {
                href: string;
            };
        };
    };
}

interface IEditUserData {
    firstName: string | undefined;
    lastName: string | undefined;
}
const UsersEdit = (props: any): JSX.Element => {
    const urlApi: string = `https://gorest.co.in/public-api/users/${props.match.params.id}?access-token=HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak`;
    const [userData, setUserData] = useState<IUsersEdit>();
    const [editUserData, setEditUserData] = useState<IEditUserData>({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        new FetchData().fetch(urlApi, "GET", null).then((res) => {
            setUserData(res);
            setEditUserData({
                firstName: res?.result.first_name,
                lastName: res?.result.last_name,
            });
        });
    }, []);

    const handleChangeInput = (e: any) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let userObject = {
            first_name: editUserData.firstName,
            last_name: editUserData.lastName,
        };
        new FetchData().fetch(urlApi, "PUT", userObject).then((res) => {
            setUserData(res);
            setEditUserData({
                firstName: res.result.first_name,
                lastName: res.result.last_name,
            });
        });
    };

    return (
        <>
            <section>
                <div className="container">
                    {userData ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <b>Name:</b>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editUserData?.firstName}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div>
                                <b>Surname:</b>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editUserData?.lastName}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div>
                                <b>Gender:</b> {userData?.result.gender}
                            </div>
                            <div>
                                <b>Address:</b> {userData?.result.address}
                            </div>
                            <div>
                                <b>Status:</b> {userData?.result.status}
                            </div>
                            <div>
                                <b>Date of birth:</b> {userData?.result.dob}
                            </div>
                            <div>
                                <b>E-mail:</b> {userData?.result.email}
                            </div>
                            <div>
                                <b>Phone:</b> {userData?.result.phone}
                            </div>
                            <div>
                                <b>www:</b>
                                <a href={userData?.result.website}>
                                    {userData?.result.website}
                                </a>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Edit user"
                            />
                        </form>
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

                    <Link to="/">
                        <button type="button" className="btn btn-secondary">
                            Back
                        </button>
                    </Link>
                </div>
            </section>

            <UsersPosts params={props.match.params.id} />
        </>
    );
};

export default UsersEdit;
