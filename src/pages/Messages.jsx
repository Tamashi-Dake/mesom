import { SEO } from "../components/common/SEO";
import Header from "../components/layout/DefaultHeader";

const Messages = () => {
  return (
    <>
      <SEO title="Messages / Mesom" />
      <Header label="Messages" showBackArrow />
      <div>
        <h2>Messages</h2>
        <p>Messages information</p>
      </div>
    </>
  );
};

export default Messages;
