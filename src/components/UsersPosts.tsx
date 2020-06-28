import React, { useState, useEffect } from "react";
import { FetchData } from "../utilities/FetchData";
import Loader from "react-loader-spinner";
import UsersComments from "./UsersComments";
import { Link } from "react-router-dom";
import UsersCommentsEdit from "./UsersCommentsEdit";

interface IUserPosts {
    result: [
        {
            id: string;
            user_id: string;
            title: string;
            body: string;
        }
    ];
}

const UsersPosts = (props: any): JSX.Element => {
    const [userPosts, setUserPosts] = useState<IUserPosts>();
    const [morePosts, setMorePosts] = useState<boolean>(false);
    const urlApiPosts: string = `https://gorest.co.in/public-api/posts?user_id=${props.params}&access-token=HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak`;

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

    const handleSubmit = (e: any, itemID: any) => {
        e.preventDefault();

        let userObject = {
            post_id: itemID,
            name: editUserComment.name,
            email: editUserComment.email,
            body: editUserComment.body,
        };

        new FetchData()
            .fetch(urlApiComments, "POST", userObject)
            .then((res) => {
                window.location.reload();
            });
    };

    useEffect(() => {
        new FetchData().fetch(urlApiPosts, "GET", null).then((res) => {
            setUserPosts(res);
        });
    }, []);

    const checkData = () => {
        if (userPosts) {
            if (morePosts) {
                return userPosts?.result.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            style={{
                                marginBottom: "20px",
                            }}
                        >
                            <div>
                                <b>POSTID</b>
                                {item.id}
                            </div>
                            <div>
                                <b>TITLE</b>
                                {item.title}
                            </div>
                            <div>
                                <b>BODY</b>
                                {item.body}
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <UsersComments postId={item.id} />
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                Add new comment
                                <form
                                    onSubmit={(e) => handleSubmit(e, item.id)}
                                >
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
                                    />
                                </form>
                            </div>
                        </div>
                    );
                });
            } else {
                return userPosts?.result
                    .slice(0, 1)
                    .map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "20px",
                                }}
                            >
                                <div>
                                    <b>POSTID</b>
                                    {item.id}
                                </div>
                                <div>
                                    <b>TITLE</b>
                                    {item.title}
                                </div>
                                <div>
                                    <b>BODY</b>
                                    {item.body}
                                </div>
                                <div style={{ marginLeft: "30px" }}>
                                    <UsersComments postId={item.id} />
                                </div>
                            </div>
                        );
                    });
            }
        } else {
            return (
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            );
        }
    };

    return (
        <section>
            <div className="container">
                <div>
                    USER POSTS
                    {checkData()}
                    <p>
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => setMorePosts(true)}
                        >
                            See more comments
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default UsersPosts;
