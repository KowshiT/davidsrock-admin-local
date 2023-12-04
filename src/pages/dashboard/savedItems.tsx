import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import React from "react";
import SavedItemsListView from "../../components/Card/features/savedItems/SavedItemsViewCard";

export interface HomeProps { }

const SavedItemsView: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <SavedItemsListView />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default SavedItemsView;
