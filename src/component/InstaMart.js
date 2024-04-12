import { useState } from "react";

// In this file we learned about props lifiting (how parent component can manage state of child componenet)

// In this Section we are taking props (we are directly destructuring it on the go)
const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    <div className="border-2 p-4 m-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      {isVisible ? (
        <button onClick={() => setIsVisible(false)}  className="underline text-red-900">Hide</button>
      ) : (
        <button onClick={() => setIsVisible(true)}  className="underline text-green-900">Show</button>
      )}
      {isVisible && <h1>{description}</h1>}
    </div>
  );
};

const InstaMart = () => {

  // no component will be visible initialy 
  const [visibleSection, setVisibleSection] = useState("");

  return (
    <div>
      <h1 className="text-3xl p-2 m-2 font-bold">InstaMart</h1>
      <Section
        title={"About Instamart"}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection == "about"}
        setIsVisible={ visibleSection=="about" ? () => setVisibleSection("") : () => setVisibleSection("about")}
      />

      <Section
        title={"Instamart Team"}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection == "team"}
        setIsVisible={visibleSection=="team" ? () => setVisibleSection("") : () => setVisibleSection("team")}
      />

      <Section
        title={"Instamart Career"}
        description={
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        }
        isVisible={visibleSection == "career"}
        setIsVisible={ visibleSection=="career" ? () => setVisibleSection("") : () => setVisibleSection("career")}
      />

    </div>
  );
};

export default InstaMart;
