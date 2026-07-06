import profile from "../../assets/Default_pfp.jpg";

export default function ProfilePage() {
    return <>
        <img src={profile} alt="Profile picture" />
        <div>
            <label htmlFor="">Followers </label>
            <p>120</p>
        </div>
        <div>
            <label htmlFor="">Following </label>
            <p>100</p>
        </div>
        <div>
            <label htmlFor="">Activity</label>
            <label htmlFor="">Dashboard</label>
            <label htmlFor="">Open your images...</label>
        </div>
    </>
}