import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";
import { Link } from "react-router-dom";
import Select from "react-select";

const UsersList = (props: any): JSX.Element => {
    let users: [] = props.users.result;

    const createNodeSelect = () => {
        return users?.map((item: any, index: number) => {
            return {
                value: `${item.first_name} ${item.last_name}`,
                label: (
                    <Link
                        className="dropdown-item"
                        key={index}
                        to={`/edit/${item.id}`}
                    >
                        {item.first_name} {item.last_name}
                    </Link>
                ),
            };
        });
    };

    return (
        <section>
            <div className="container">
                <Select options={createNodeSelect()} />
            </div>
        </section>
    );
};

export default UsersList;
