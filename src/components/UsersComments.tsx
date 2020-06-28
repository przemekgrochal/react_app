import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";

interface IUserComments {
    result: [
        {
            id: string;
            post_id: string;
            name: string;
            email: string;
            body: string;
        }
    ];
}

const UsersComments = ({ postId }: any): JSX.Element => {
    const [userComments, setUserComments] = useState<IUserComments>();
    const urlApiComments: string = `https://gorest.co.in/public-api/comments?post_id=${
        postId ? postId : null
    }&access-token=HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak`;

    useEffect(() => {
        new FetchData().fetch(urlApiComments, "GET", null).then((res) => {
            setUserComments(res);
        });
    }, []);

    const comments = () => {
        return userComments?.result.map((item: any, index: number) => {
            return (
                <div
                    key={index}
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    <div>
                        <b>COMMENTS ID</b>
                        {item.id}
                    </div>
                    <div>
                        <b>POST ID</b>
                        {item.post_id}
                    </div>
                    <div>
                        <b>NAME</b>
                        {item.name}
                    </div>
                    <div>
                        <b>E-MAIL</b>
                        {item.email}
                    </div>
                    <div>
                        <b>BODY</b>
                        {item.body}
                    </div>
                </div>
            );
        });
    };

    return <div>POSTS COMMENTS{comments()}</div>;
};

export default UsersComments;
