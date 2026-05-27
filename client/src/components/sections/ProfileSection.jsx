import { useEffect, useState } from "react";

function AdminProfileSection() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {

        const data = JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

        if (data) {

            setUser({
                name: data.name || "",
                email: data.email || "",
                role: data.role || ""
            });

        }

    }, []);


    const handlePasswordSave = async () => {

        if (
            passwords.newPassword
            !==
            passwords.confirmPassword
        ) {

            alert(
                "Passwords do not match"
            );

            return;

        }

        const token =
            localStorage.getItem(
                "token"
            );

        const res =
            await fetch(

                "http://localhost:5000/api/tasks/change-password",

                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify({

                            currentPassword:
                                passwords.currentPassword,

                            newPassword:
                                passwords.newPassword

                        })

                }

            );

        const data =
            await res.json();

        alert(
            data.message
        );

    };

    const handleArchiveAccount = async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const res =
            await fetch(

                "http://localhost:5000/api/tasks/archive-account",

                {

                    method: "PUT",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }

                }

            );

        const data =
            await res.json();

        alert(
            data.message
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href = "/";

    };

    const handleProfileSave =

        async () => {

            const token =

                localStorage.getItem(
                    "token"
                );

            const res =

                await fetch(

                    "http://localhost:5000/api/tasks/update-profile",

                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body:

                            JSON.stringify(user)

                    }

                );

            const data =

                await res.json();

            alert(
                data.message
            );

            localStorage.setItem(

                "user",

                JSON.stringify(user)

            );

            window.location.reload();

        };

    return (

        <div className="employee-profile-page">

            <div className="profile-header">

                <p className="profile-breadcrumb">

                    Dashboard / Profile

                </p>

                <h1>

                    Profile

                </h1>

                <p className="profile-description">

                    Update your account details and security preferences.

                </p>

            </div>

            <div className="profile-card">

                <h2>

                    Profile Information

                </h2>

                <p>

                    Update your account's profile information and email address.

                </p>

                <div className="profile-form">

                    <div className="profile-field">

                        <label>

                            Name

                        </label>

                        <input
                            type="text"
                            value={user.name || ""}
                            onChange={(e) =>

                                setUser({

                                    ...user,

                                    name: e.target.value

                                })

                            }
                        />

                    </div>

                    <div className="profile-field">

                        <label>

                            Email

                        </label>

                        <input
                            type="email"
                            value={user.email || ""}
                            onChange={(e) =>

                                setUser({

                                    ...user,

                                    email: e.target.value

                                })

                            }
                        />

                    </div>

                    <button
                        className="profile-save-btn"
                        onClick={
                            handleProfileSave
                        }
                    >

                        Save

                    </button>

                </div>

            </div>

            <div className="profile-card">

                <h2>

                    Update Password

                </h2>

                <p>

                    Ensure your account is using a long, random password to stay secure.

                </p>

                <div className="profile-form">

                    <div className="profile-field">

                        <label>

                            Current Password

                        </label>

                        <input
                            type="password"
                            value={
                                passwords.currentPassword
                            }
                            onChange={(e) =>

                                setPasswords({

                                    ...passwords,

                                    currentPassword:
                                        e.target.value

                                })

                            }
                        />

                    </div>

                    <div className="profile-field">

                        <label>

                            New Password

                        </label>

                        <input
                            type="password"
                            value={
                                passwords.newPassword
                            }
                            onChange={(e) =>

                                setPasswords({

                                    ...passwords,

                                    newPassword:
                                        e.target.value

                                })

                            }
                        />

                    </div>

                    <div className="profile-field">

                        <label>

                            Confirm Password

                        </label>

                        <input
                            type="password"
                            value={
                                passwords.confirmPassword
                            }
                            onChange={(e) =>

                                setPasswords({

                                    ...passwords,

                                    confirmPassword:
                                        e.target.value

                                })

                            }
                        />

                    </div>

                    <button
                        className="profile-save-btn"
                        onClick={
                            handlePasswordSave
                        }
                    >

                        Save

                    </button>

                </div>

            </div>

            <div className="delete-card">

                <h2>

                    Delete Account

                </h2>

                <p>

                    Archive your account and logout.

                </p>

                <button
                    className="delete-btn"
                    onClick={
                        handleArchiveAccount
                    }
                >

                    Delete Account

                </button>

            </div>

        </div>

    );

}

export default AdminProfileSection;