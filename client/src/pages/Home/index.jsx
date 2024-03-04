import { useEffect, useState } from "react";
import styles from "../../style.js";
import HomePageLayout from "./HomePageLayout.jsx";
import PastPerformance from "./PastPerformance.jsx";
import About from "./AboutUs.jsx";
import Index from "./Video.jsx";
import Sponsors from "./Sponsors.jsx";
import AvishkarCard from "./AvishkarCard.jsx";
import EventTimeLine from "./EventTimeline.jsx";
import Footer from "./Footer.jsx";
import Gallery from "./Gallery.jsx";
import { toast } from "react-toastify";
const App = () => {
  return (
    <>
      <Index />
      {/* <AvishkarCard /> */}
      <HomePageLayout>
        {/* <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
         
        </div>
      </div> */}
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <AvishkarCard />
            <About />
          </div>
        </div>

        <EventTimeLine />

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}> {/* <Gallery /> */}</div>
        </div>
        <PastPerformance />
        <Sponsors />
      </HomePageLayout>
    </>
  );
};

export default App;
