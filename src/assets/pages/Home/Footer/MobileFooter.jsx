import GetToKnow from "./GetToKnow";
import PopularCategories from "./PopularCategories";

export default function MobileFooter() {
  return (
    <div className="main-footer">
      <div className="top-section">
        <div className="footer-items">
          <PopularCategories />
          <GetToKnow />
        </div>
      </div>
    </div>
  );
}
