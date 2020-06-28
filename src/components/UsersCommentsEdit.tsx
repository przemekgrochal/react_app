import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";

const UsersCommentsEdit = (props: any): JSX.Element => {
    const urlApiComments: string = `https://gorest.co.in/public-api/comments`;
    const [editUserComment, setEditUserComment] = useState<any>({
        post_id: props.postID,
        name: "",
        email: "",
        body: "",
    });

    const handleChangeInput = (e: any) => {
        setEditUserComment({
            ...editUserComment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log(editUserComment);

        let userObject = {
            post_id: editUserComment.post_id,
            name: editUserComment.name,
            email: editUserComment.email,
            body: editUserComment.body,
        };

        new FetchData().fetch(urlApiComments, "POST", userObject);
    };

    return (
        <div>
            UPDATE COMMENT
            <form onSubmit={handleSubmit}>
                <div>
                    <b>Name:</b>
                    <input
                        type="text"
                        name="name"
                        value={editUserComment.name}
                        onChange={handleChangeInput}
                    />
                </div>
                <div>
                    <b>Email:</b>
                    <input
                        type="text"
                        name="email"
                        value={editUserComment.email}
                        onChange={handleChangeInput}
                    />
                </div>
                <div>
                    <b>Body:</b>
                    <textarea
                        name="body"
                        value={editUserComment.body}
                        onChange={handleChangeInput}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Send"
                    onClick={props.setEdit(true)}
                />
            </form>
        </div>
    );
};

export default UsersCommentsEdit;
