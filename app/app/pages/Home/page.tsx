import { HomePageFeature } from "@/app/feature/HomePageFeature";
import styles from "./css/styles.module.css";

const HomePage = () => {
    return (
        <div className={styles["home-page-container"]}>
           <HomePageFeature />
        </div>
    );
};

export default HomePage;