import ClothesSection from './ClothesSection/ClothesSection';
import './Profile.css';
import Sidebar from './Sidebar/Sidebar';

export default function Profile () {
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <Sidebar/>
            </section>
            <section className="profile__clothesSection">
                <ClothesSection/>
            </section>
        </div>
    );
};

Profile;